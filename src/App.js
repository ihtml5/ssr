import React, { Component } from 'react';
import './App.css';
import { initData } from '@/mock';
import Inspector from 'react-inspector';
import { MdebugHeader, MdebugApplication } from '@/modules';
import { __DEV__ } from '@/utils';
<<<<<<< HEAD
<<<<<<< HEAD
import { hot } from 'react-hot-loader';
// https://github.com/webpack-contrib/webpack-hot-middleware/issues/105
=======
// https://github.com/webpack-contrib/webpack-hot-middleware/issues/105
import { hot } from 'react-hot-loader';
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
=======
// https://github.com/webpack-contrib/webpack-hot-middleware/issues/105
import { hot } from 'react-hot-loader';
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDebug: __DEV__,
    };
    this._times = 1;
    this._lastTapTime = null;
  }
  componentDidMount() {
    // 三指连击唤起mdebug
    const context = this;
    window.addEventListener('touchend', e => {
      const { showDebug } = context.state;
      var nowTime = new Date();
      var touches = e.touches.length;
      if (context._times === 1) {
        context._times++;
        context._lastTapTime = nowTime;
        setTimeout(() => {
          context._times = 1;
        }, 1000);
        return;
      }
      if (
        touches === 2 &&
        context._times === 2 &&
        nowTime - context._lastTapTime < 1000
      ) {
        context._times = 1;
        context._lastTapTime = new Date();
        if (!showDebug) {
          this.setState({
            showDebug: true,
          });
        } else {
          this.setState({
            showDebug: false,
          });
        }
      }
    });
  }
  render() {
    const { showDebug } = this.state;
    return (
      <div
        className={'mdebug'}
        style={{
          display: showDebug ? 'block' : 'none',
        }}
      >
        <MdebugHeader />
        <MdebugApplication id={'mdebug-application'}>
<<<<<<< HEAD
<<<<<<< HEAD
          <h1>Mdebug</h1>
=======
          <h1>Mdebug11</h1>
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
=======
          <h1>Mdebug11</h1>
>>>>>>> 6dbd155f51f65cda4c55cab4ce85e0d17859fa52
          <Inspector data={initData} />
        </MdebugApplication>
        <MdebugApplication id={'mdebug-system'}>
          { process.browser && window.navigator.userAgent}
        </MdebugApplication>
        <MdebugApplication id={'mdebug-trategy'}>trategy</MdebugApplication>
        <MdebugApplication id={'mdebug-debug'}>debug</MdebugApplication>
        <MdebugApplication id={'mdebug-emonitor'}>emonitor</MdebugApplication>
      </div>
    );
  }
}

export default hot(module)(App);
