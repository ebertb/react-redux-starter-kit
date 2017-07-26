import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import './styles/main.scss'
import { setupI13n } from 'react-i13n'

// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__)

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

const testPlugin = {
  name: 'Test Plugin',
  eventHandlers: {
    click (payload, callback) {
      console.log('Click with react-i13n!', payload)
    },
    enterViewport (payload, callback) {
      console.log('Enter viewport with react-i13n!', payload)
    }
  }
}

let render = () => {
  const App = require('./components/App').default
  const I13nApp = setupI13n(App, {
    rootModelData: { site: 'test-app-router' },
    isViewportEnabled: true,
    handlerTimeout: 500
  }, [testPlugin])
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <I13nApp store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
