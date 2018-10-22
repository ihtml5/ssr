import React, { Component } from 'react';
<<<<<<< HEAD
import '@/App.css';
=======
import './App.css';
>>>>>>> ff43ded2f0e2ab51f86341c9b3710cadb99d6c30
import { initData } from '@/mock';
import Inspector from 'react-inspector';
import { MdebugHeader, MdebugApplication } from '@/modules';
import { __DEV__ } from '@/utils';
<<<<<<< HEAD
=======
// https://github.com/webpack-contrib/webpack-hot-middleware/issues/105
import { hot } from 'react-hot-loader';
>>>>>>> ff43ded2f0e2ab51f86341c9b3710cadb99d6c30

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
          <h1>Mdebug</h1>
          <Inspector data={initData} />
        </MdebugApplication>
<<<<<<< HEAD
        <MdebugApplication id={'mdebug-system'}>{navigator.userAgent}</MdebugApplication>
=======
        <MdebugApplication id={'mdebug-system'}>
          {navigator.userAgent}
        </MdebugApplication>
>>>>>>> ff43ded2f0e2ab51f86341c9b3710cadb99d6c30
        <MdebugApplication id={'mdebug-trategy'}>trategy</MdebugApplication>
        <MdebugApplication id={'mdebug-debug'}>debug</MdebugApplication>
        <MdebugApplication id={'mdebug-emonitor'}>emonitor</MdebugApplication>
      </div>
    );
  }
}

<<<<<<< HEAD
export default App;
=======
export default hot(module)(App);
>>>>>>> ff43ded2f0e2ab51f86341c9b3710cadb99d6c30
