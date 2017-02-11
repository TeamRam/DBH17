import React from 'react';

import theme, { font, color, alignment } from '../../theme';

class Subheader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.styles = {
      container: {
        borderRadius: theme.boxBorderRadius,
        width: '100%',
        height: this.props.height || 44,
        backgroundColor: color.secondary,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: alignment.smallSidePadding,
        paddingRight: alignment.smallSidePadding
      }
    };
  }

  render() {
    return (
      <div style={{ ...this.styles.container, ...this.props.style }}>
        {this.props.children}
      </div>
    );
  }
}

export default Subheader;
