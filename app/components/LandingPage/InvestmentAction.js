import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import radium from '../../utility/Radium';
import config from '../../config';
import theme, { responsive, color, font } from '../../theme';
import { getBalance, web3, contract } from '../../actions/eth';

const EXPOSED_TIME = 60;

const CONTRACT_STATES = {
  WAITING: 'WAITING',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  DONE: 'DONE'
};

class InvestmentAction extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      state: CONTRACT_STATES.WAITING,
      error: null
    };

    this.onClickInvest = this.onClickInvest.bind(this);
  }

  onClickInvest() {
    this.setState({
      state: CONTRACT_STATES.LOADING
    });
    const inputValue = this.inputBox ? this.inputBox.value : null;
    const inputInt = parseInt(inputValue, 10);
    const selectedType = this.props.selectedType;

    if (inputInt) {
      web3.personal.unlockAccount(this.props.ethData.blockchainAddress, this.props.ethData.password, EXPOSED_TIME);
      contract.invest.sendTransaction(selectedType, { from: this.props.ethData.blockchainAddress, value: inputInt }, (err, res) => {
        setTimeout(() => {
          if (err) {
            this.setState({
              state: CONTRACT_STATES.ERROR,
              error: err
            });
          } else {
            if (this.props.ethData && this.props.ethData.blockchainAddress) this.props.getBalance(this.props.ethData.blockchainAddress);
            this.setState({
              state: CONTRACT_STATES.DONE
            });
          }
        }, 1500);
      }); //0,1 or 2 for low, medium or high risk, value in WEI
    }
  }

  render() {
    switch (this.state.state) {
      case CONTRACT_STATES.WAITING:
        return (
          <div style={{ ...styles.container, ...this.props.style }}>
            <div style={styles.inputCont}>
              <input ref={(input) => { this.inputBox = input; }} type="text" style={styles.amountInput} />
              <div style={styles.currencyIndicator}>ETH</div>
            </div>
            <RaisedButton labelStyle={{ textTransform: 'initial', fontWeight: 800, fontSize: 30, ...font.subtitle }} label="Invest!" primary onClick={this.onClickInvest} />
          </div>
        );
      case CONTRACT_STATES.LOADING:
        return (
          <div style={{ ...styles.container, ...this.props.style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        );
      case CONTRACT_STATES.ERROR:
        return (
          <div style={{ ...styles.container, ...this.props.style, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 32, color: 'white', ...font.subtitle, position: 'relative' }}>
            <img onClick={() => { this.setState({ state: CONTRACT_STATES.WAITING }); }} style={styles.arrowBack} src={config.asset('images/icon-arrow-back.svg')} />
            There was an error processing your investment, try again later.
          </div>
        );
      case CONTRACT_STATES.DONE:
        return (
          <div style={{ ...styles.container, ...this.props.style, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 32, color: 'white', ...font.subtitle, position: 'relative' }}>
            <img onClick={() => { this.setState({ state: CONTRACT_STATES.WAITING }); }} style={styles.arrowBack} src={config.asset('images/icon-arrow-back.svg')} />
            Invested Successfully!
          </div>
        );
      default: return null;
    }
  }
}

const styles = {
  container: {
    borderRadius: theme.boxBorderRadius,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
    backgroundColor: color.secondary
  },
  amountInput: {
    height: 32,
    width: '75%',
  },
  currencyIndicator: {
    ...font.subtitle,
    color: 'white',
    width: '25%',
    textAlign: 'center'
  },
  inputCont: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    [responsive.mq.sm]: {
      marginBottom: 0
    }
  },
  arrowBack: {
    position: 'absolute',
    top: 8,
    left: 8,
    cursor: 'pointer'
  }
};

const mapStateToProps = ({ investment, rest }) => {
  return {
    selectedType: investment.selectedType,
    ethData: rest.ethAddress ? rest.ethAddress.response : null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (address) => { dispatch(getBalance(address)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(radium(InvestmentAction));
