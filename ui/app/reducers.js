const extend = require('xtend')

//
// Sub-Reducers take in the complete state and return their sub-state
//
const reduceIdentities = require('./reducers/identities')
const reduceMetamask = require('./reducers/metamask')
const reduceApp = require('./reducers/app')

window.METAMASK_CACHED_LOG_STATE = null

module.exports = rootReducer

function rootReducer (state, action) {
  // clone
  state = extend(state)

  if (action.type === 'GLOBAL_FORCE_UPDATE') {
    return action.value
  }

  //
  // Identities
  //

  state.identities = reduceIdentities(state, action)

  //
  // MetaMask
  //

  state.metamask = reduceMetamask(state, action)

  //
  // AppState
  //

  state.appState = reduceApp(state, action)

  window.METAMASK_CACHED_LOG_STATE = state
  return state
}

window.logState = function () {
  let state = window.METAMASK_CACHED_LOG_STATE
  const version = global.platform.getVersion()
  state.version = version
  let stateString = JSON.stringify(state, removeSeedWords, 2)
  return stateString
}

function removeSeedWords (key, value) {
  return key === 'seedWords' ? undefined : value
}
