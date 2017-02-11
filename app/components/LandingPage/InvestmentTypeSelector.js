import React from 'react';

import theme, { color, alignment, font } from '../../theme';
import radium from '../../utility/Radium';

class InvestmentTypeSelector extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: 1
    };

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
          const itemStyle = this.state.selected === index ? { ...styles.option, ...styles.selectedOption } : styles.option;
          return (<div onClick={() => { this.setState({ selected: index }); }} style={itemStyle}>
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

export default radium(InvestmentTypeSelector);
