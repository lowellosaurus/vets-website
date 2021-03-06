import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { JSDOM } from 'jsdom';
// import sinon from 'sinon'

global.__BUILDTYPE__ = process.env.BUILDTYPE || 'development';
global.__ALL_CLAIMS_ENABLED__ = (global.__BUILDTYPE__ === 'development' || process.env.ALL_CLAIMS_ENABLED === 'true');
global.__SAMPLE_ENABLED__ = (process.env.SAMPLE_ENABLED === 'true');

chai.use(chaiAsPromised);

// Sets up JSDom in the testing environment. Allows testing of DOM functions without a browser.
function setupJSDom() {
  if (global.document || global.window) {
    throw new Error('Refusing to override existing document and window.');
  }

  // setup the simplest document possible
  const dom = new JSDOM('<!doctype html><html><body></body></html>');

  // get the window object out of the document
  const win = dom.window;

  global.document = win.document;
  global.window = win;

  win.VetsGov = {
    scroll: {
      duration: 0,
      delay: 0,
      smooth: false
    }
  };

  // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
  function propagateToGlobal(window) {
    /* eslint-disable */
    for (const key in window) {
      if (!window.hasOwnProperty(key)) continue;
      if (key in global) continue;

      global[key] = window[key];
    }
    /* eslint-enable */

    // Mock fetch
    // This was causing some tests to fail, so we'll have to loop back around to it later
    // global.fetch = sinon.stub();

    // Mock sessionStorage
    // global.sessionStorage = {};
  }

  propagateToGlobal(win);
}

setupJSDom();
