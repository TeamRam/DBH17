import Auth0Lock from 'auth0-lock';
import React from 'react';
import { connect } from 'react-redux';
import config from './config';
import { color } from './theme';
import { saveProfile } from './actions/user';
import { restGet } from './actions/rest';

class Auth0 extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.lock = new Auth0Lock('wdcdk4l1TN4AQyulvoZPoAtA6i1YqzvA', 'pancho111203.eu.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:3000/',
        responseType: 'token',
        redirect: false
      },
      theme: {
        logo: config.asset('images/logo3.png'),
        primaryColor: color.primary
      },
      languageDictionary: {
        title: 'Log in'
      }

    });

    this.lock.on('authenticated', this.doAuthentication.bind(this));
  }

  getChildContext() {
    return {
      auth0Login: () => {
        this.lock.show();
      }
    };
  }

  doAuthentication(authResult) {
    this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
      if (err) {
        console.log(err);
        return;
      }
      this.props.saveProfile(profile);
      this.props.getEthAddress(profile.clientID);
    });
  }

  render() {
    return this.props.children;
  }
}

Auth0.childContextTypes = {
  auth0Login: React.PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProfile: (profile) => { dispatch(saveProfile(profile)); },
    getEthAddress: (clientId) => { dispatch(restGet('ethAddress', `/v1/person/${clientId}`)); }
  };
};

export default connect(null, mapDispatchToProps)(Auth0);
