import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import config from '../../config';
import theme, { responsive, color, font } from '../../theme';
import radium from '../../utility/Radium';
import { ProfileSection, Header, Subheader } from '../Header';
import InvestmentTypeSelector from './InvestmentTypeSelector';
import InvestmentAction from './InvestmentAction';

import { getBalance, getBalancesPerRisk } from '../../actions/eth';
import { restGet } from '../../actions/rest';


class LandingPage extends React.Component {
  componentWillMount() {
    if (this.props.ethAddress && this.props.ethAddress.response && this.props.ethAddress.response.blockchainAddress && this.props.ethStore && !this.props.ethStore[this.props.ethAddress.response.blockchainAddress]) {
      this.props.getBalance(this.props.ethAddress.response.blockchainAddress);
    }
    this.props.getBalancesPerRisk();
    this.connectWithEthereum = this.connectWithEthereum.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ethAddress && nextProps.ethAddress.response && nextProps.ethAddress.response.blockchainAddress && nextProps.ethStore && !nextProps.ethStore[nextProps.ethAddress.response.blockchainAddress]) {
      nextProps.getBalance(nextProps.ethAddress.response.blockchainAddress);
      this.props.getBalancesPerRisk();
    }
  }

  connectWithEthereum() {
    this.props.getEthAddress(this.props.profile.user_id);
  }

  render() {
    const profile = this.props.profile;
  
    const renderBalances = () => {
      const balances = this.props.balances;
      const balancesTotal = balances.reduce((prev, tot) => {
        return tot + prev;
      });
      const balancesPercentage = balances.map((val) => {
        return val / balancesTotal;
      });

      console.log(balancesPercentage);
      return null;
    };

    const renderContent = () => {
      const ethStore = this.props.ethStore;
      const address = this.props.ethAddress && !this.props.ethAddress.loading && !this.props.ethAddress.error ? this.props.ethAddress.response.blockchainAddress : null;
      const balance = address && ethStore[address] && !ethStore[address].loading && !ethStore[address].error ? ethStore[address].response : null;
      const dividedBalance = parseInt(balance, 10) / 1000000000000000000;

      if (profile) {
        return (
          <div>
            <Subheader style={styles.subheaderStyle}>
              <div style={{ ...font.subtitle, color: color.white }}>My balance</div>
              {dividedBalance || dividedBalance === 0 ?
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <img onClick={() => { this.props.getBalance(this.props.ethAddress.response.blockchainAddress); }} style={{ width: 32, height: 32, cursor: 'pointer', marginRight: 8 }} src={config.asset('images/icon-refresh.svg')} />
                  <div style={{ ...font.subtitle, color: color.white }}>{dividedBalance} ETH</div>
                </div>
                : <RaisedButton label="Connect with Ethereum" primary labelStyle={{ textTransform: 'initial' }} onClick={this.connectWithEthereum} />}
            </Subheader>
            <div style={styles.investmentContainer}>
              <InvestmentTypeSelector style={styles.investmentPanelType} />
              <InvestmentAction style={styles.investmentPanelAction} />
            </div>
            <div style={styles.statusBar}>Testing</div>
          </div>
        );
      }

      return (
        <div style={styles.coverImage} />
      );
    };

    return (
      <div style={{ backgroundColor: 'white', padding: 5, borderRadius: 4, border: '1px solid grey' }}>
        <Header>
          {profile && profile.picture && profile.name ?
            <ProfileSection profilePictureUrl={profile.picture} profileName={profile.name} />
            : <RaisedButton labelStyle={{ textTransform: 'initial', fontWeight: 800, fontSize: 22, ...font.subtitle }} label="Log in" primary onClick={() => { if (this.context.auth0Login) this.context.auth0Login(); }} />}
        </Header>
        {renderContent()}
        {this.props.ethStore.balances ? renderBalances() : null}
      </div>
    );
  }
}

LandingPage.contextTypes = {
  auth0Login: React.PropTypes.func
};

const styles = {
  statusBar: {
    color: color.primary,
    ...font.body
  },
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
    height: 296,
    width: '100%',
    backgroundImage: "url('images/cover_old_man_2.jpg')",
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    marginTop: 8
  }
};

const mapStateToProps = ({ user, rest, eth }) => {
  return {
    profile: user.profile,
    ethAddress: rest.ethAddress,
    ethStore: eth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEthAddress: (userId) => { dispatch(restGet('ethAddress', `/v1/person/${userId}`)); },
    getBalance: (address) => { dispatch(getBalance(address)); },
    getBalancesPerRisk: () => { dispatch(getBalancesPerRisk()); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(radium(LandingPage));

