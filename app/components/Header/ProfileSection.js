import React from 'react';
import { connect } from 'react-redux';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { color, font } from '../../theme';

import { logout } from '../../actions/user';

class ProfileSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  openMenu = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  closeMenu = () => {
    this.setState({
      open: false,
    });
  };

  logout = () => {
    this.props.logout();
    this.closeMenu();
  }

  render() {
    const { showText = true, profilePictureUrl, profileName } = this.props;

    if (!profilePictureUrl || !profileName) {
      return null;
    }

    return (
      <div>
        <div style={styles.container} onClick={this.openMenu}>
          {showText ? <div style={styles.name}>{profileName}</div> : null}
          <img style={styles.avatar} src={profilePictureUrl} />
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.closeMenu}
        >
          <Menu>
            <MenuItem primaryText="Logout" onClick={this.logout} onTouchTap={this.logout} />
          </Menu>
        </Popover>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '240px',
    cursor: 'pointer',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%'
  },
  name: {
    marginRight: 8,
    ...font.subtitle,
    fontSize: 20,
    color: color.white,
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(ProfileSection);


