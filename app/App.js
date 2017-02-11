import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { StyleRoot } from 'radium';
import config from './config';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet
          base={{ href: config.base }}
          title="React Connect Boilerplate"
          titleTemplate="%s"

          link={[{ rel: 'stylesheet', type: 'text/css', href: config.asset('css/style.css') }]}
          meta={[
            { 'char-set': 'utf-8' },
            { name: 'description', content: 'React Connect Boilerplate' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ]}
        />
        <StyleRoot>
          <div style={styles.container}>
            {this.props.children}
          </div>
        </StyleRoot>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    boxSizing: 'border-box',
    padding: 32,
    maxWidth: 600,
    margin: '0 auto'
  }
};

export default App;
