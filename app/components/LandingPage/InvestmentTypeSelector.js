import React from 'react';
import { connect } from 'react-redux';
import theme, { color, alignment, font } from '../../theme';
import radium from '../../utility/Radium';
import { selectType } from '../../actions/investment';

class InvestmentTypeSelector extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.options = [
      {
        title: 'Low risk'
      },
      {
        title: 'Medium risk'
      },
      {
        title: 'High risk'
      }
    ];
  }

  render() {
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        {this.options.map((optionInfo, index) => {
          const itemStyle = this.props.selectedType === index ? { ...styles.option, ...styles.selectedOption } : styles.option;
          return (<div key={index} onClick={() => { this.props.selectType(index); }} style={itemStyle}>
            {optionInfo.title}
          </div>);
        })}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '-1px',
    marginBottom: '-1px'
  },
  option: {
    marginTop: 1,
    marginBottom: 1,
    height: theme.barHeight,
    backgroundColor: color.secondary,
    paddingLeft: alignment.smallSidePadding,
    paddingRight: alignment.smallSidePadding,
    color: color.white,
    ...font.subtitle,
    lineHeight: `${theme.barHeight}px`,
    cursor: 'pointer',
    borderRadius: theme.boxBorderRadius,
  },
  selectedOption: {
    backgroundColor: color.primary
  }
};

const mapStateToProps = ({ investment }) => {
  return {
    selectedType: investment.selectedType
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectType: (index) => { dispatch(selectType(index)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(radium(InvestmentTypeSelector));
