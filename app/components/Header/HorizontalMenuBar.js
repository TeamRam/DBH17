import React from 'react';
import { font, color } from '../../theme';

class Subheader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.menus = [
      {
        title: 'my plan'
      },
      {
        title: 'test'
      },
      {
        title: 'test'
      },
      {
        title: 'test'
      }
    ];
  }

  render() {
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        {this.menus.map((menuInfo) => {
          return (<div style={styles.menuItemContainer}>
            {menuInfo.title}
          </div>);
        })}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    height: 44,
    marginLeft: '-8',
    marginRight: '-8'
  },
  menuItemContainer: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: color.secondary,
    ...font.subtitle,
    textAlign: 'center',
    lineHeight: '44px'
  }
};

export default Subheader;
