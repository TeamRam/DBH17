import React from 'react';
import { color } from '../../theme';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.styles = {
      container: {
        width: '100%',
        height: this.props.height || 88,
        backgroundColor: color.primary
      }
    };
  }

  render() {
    return (
      <div style={this.styles.container}>
        Test
      </div>
    );
  }
}



export default Header;
