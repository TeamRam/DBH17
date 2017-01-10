import React from 'react';
import { connect } from 'react-redux';

import { changeName } from '../../actions/landingPage';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.hello}>Hello</div>
        <div style={styles.world}>{this.props.name}</div>
        <button onClick={() => { this.props.changeName(); }}>Click</button>
      </div>
    );
  }
}

const styles = {
  hello: {
    fontSize: 11
  },
  world: {
    fontSize: 15
  }
};

const mapStateToProps = ({ landingPage }) => {
  return {
    name: landingPage.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeName: () => { dispatch(changeName()); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

