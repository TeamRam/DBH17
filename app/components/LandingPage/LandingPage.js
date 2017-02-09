import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { responsive, color } from '../../theme';

import { changeName } from '../../actions/landingPage';
import radium from '../../utility/Radium';
import MediaQuery from '../../utility/MediaQuery';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query={responsive.q.sm}>
          <p>This only appears on big screens!</p>
        </MediaQuery>
        <RaisedButton
          label={'Hello mom'}
          primary
        />
        <div style={styles.hello}>Hello</div>
        <div style={styles.world}>{this.props.name}</div>
        <button onClick={() => { this.props.changeName(); }}>Click</button>
      </div>
    );
  }
}

const styles = {
  hello: {
    width: 500,
    height: 500,
    fontSize: 11,
    backgroundColor: color.primary,
    [responsive.mq.sm]: {
      backgroundColor: color.secondary
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(radium(LandingPage));

