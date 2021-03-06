import React from 'react';
import theme, { font, color, alignment } from '../../theme';
import config from '../../config';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.styles = {
      container: {
        width: '100%',
        height: this.props.height || 44,
        backgroundColor: color.secondary,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: alignment.smallSidePadding,
        paddingRight: alignment.smallSidePadding,
        borderRadius: theme.boxBorderRadius,
      }
    };
  }

  render() {
    return (
      <div style={{ ...this.styles.container, ...this.props.style }}>
        <img style={{ height: '130%' }} src={config.asset('images/logo2.png')} />
        {this.props.children}
      </div>
    );
  }
}

export default Header;
