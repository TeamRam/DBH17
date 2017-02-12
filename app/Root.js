import React, { Component } from 'react';

import config from './config';

class Root extends Component {
  renderInitialState() {
    if (this.props.initialState) {
      const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
      return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
    }
    return null;
  }

  render() {
    const head = this.props.head;

    return (
      <html>
        <head>
          {head.title.toComponent() }
          {head.meta.toComponent() }
          {head.link.toComponent() }
          {head.base.toComponent() }
        </head>
        <body style={styles.body}>
          <div id="root" dangerouslySetInnerHTML={{ __html: this.props.content }} />
          {this.renderInitialState() }
          {head.script.toComponent() }
          <script src={config.bundle} />
        </body>
      </html>
    );
  }
}

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Roboto',
    backgroundColor: '#E2E2E2'
  }
};

export default Root;
