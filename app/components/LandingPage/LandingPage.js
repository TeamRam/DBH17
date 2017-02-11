import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import config from '../../config';
import theme, { responsive, color, font } from '../../theme';
import radium from '../../utility/Radium';
import { ProfileSection, Header, Subheader } from '../Header';
import InvestmentTypeSelector from './InvestmentTypeSelector';
import InvestmentAction from './InvestmentAction';

import { restGet } from '../../actions/rest';


class LandingPage extends React.Component {
  componentWillMount() {
    if (!this.props.profile) {
      if (this.context.auth0Login) this.context.auth0Login();
    }

    this.connectWithEthereum = this.connectWithEthereum.bind(this);
  }

  connectWithEthereum() {
    this.props.getEthAddress(this.props.profile.clientID);
  }

  render() {
    const profile = this.props.profile;

    const renderContent = () => {
      if (profile) {
        return (
          <div>
            <Subheader style={styles.subheaderStyle}>
              <div style={{ ...font.subtitle, color: color.white }}>My balance</div>
              {this.props.ethAddress ? <div style={{ ...font.subtitle, color: color.white }}>{this.props.ethBalance} ETH</div>
                : <RaisedButton label="Connect with Ethereum" primary labelStyle={{ textTransform: 'initial' }} onClick={this.connectWithEthereum} />}
            </Subheader>
            <div style={styles.investmentContainer}>
              <InvestmentTypeSelector style={styles.investmentPanelType} />
              <InvestmentAction style={styles.investmentPanelAction} />
            </div>
          </div>
        );
      }

      return (
        <div style={styles.coverImage} />
      );
    };

    return (
      <div style={{ height: '100%' }}>
        <Header>
          {profile && profile.picture && profile.name ?
            <ProfileSection profilePictureUrl={profile.picture} profileName={profile.name} />
            : <RaisedButton labelStyle={{ textTransform: 'initial', fontWeight: 800, fontSize: 22 }} label="Log in" primary onClick={() => { if (this.context.auth0Login) this.context.auth0Login(); }} />}
        </Header>
        {renderContent()}
      </div>
    );
  }
}

LandingPage.contextTypes = {
  auth0Login: React.PropTypes.func
};

const styles = {
  subheaderStyle: {
    marginTop: 2
  },
  investmentContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    [responsive.mq.sm]: {
      flexDirection: 'row'
    }
  },
  investmentPanelType: {
    flex: 1,
    marginRight: 0,
    [responsive.mq.sm]: {
      marginRight: 4
    }
  },
  investmentPanelAction: {
    flex: 1,
    marginLeft: 0,
    marginTop: 8,
    [responsive.mq.sm]: {
      marginLeft: 4,
      marginTop: 0
    }
  },
  coverImage: {
    height: '100%',
    width: '100%',
    backgroundImage: "url('images/cover_old_man_2.jpg')",
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    marginTop: 8
  }
};

const mapStateToProps = ({ user, eth }) => {
  return {
    profile: user.profile,
    ethAddress: eth.ethAddress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEthAddress: (clientId) => { dispatch(restGet('ethAddress', `/v1/person/${clientId}`)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(radium(LandingPage));

