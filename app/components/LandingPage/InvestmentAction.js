import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import radium from '../../utility/Radium';
import theme, { responsive, color, font } from '../../theme';
import { getBalance } from '../../actions/eth';

class InvestmentAction extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onClickInvest = this.onClickInvest.bind(this);
  }

  onClickInvest() {
    const inputValue = this.inputBox ? this.inputBox.value : '';

    this.props.getBalance(inputValue);
  }

  render() {
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <div style={styles.inputCont}>
          <input ref={(input) => { this.inputBox = input; }} type="text" style={styles.amountInput} />
          <div style={styles.currencyIndicator}>ETH</div>
        </div>
        <RaisedButton labelStyle={{ textTransform: 'initial', fontWeight: 800, fontSize: 30 }} label="Invest!" primary onClick={this.onClickInvest} />
      </div>
    );
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (address) => { dispatch(getBalance(address)); }
  };
};

export default connect(null, mapDispatchToProps)(radium(InvestmentAction));
