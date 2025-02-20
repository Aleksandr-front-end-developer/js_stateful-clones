'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const temporaryState = { ...newState };

        addProperties(temporaryState, action.extraData);
        newState = {};
        newState = { ...temporaryState };
        arr.push(temporaryState);
        break;

      case 'removeProperties':
        const temporaryState2 = { ...newState };

        removeProperties(temporaryState2, action.keysToRemove);
        newState = {};
        newState = { ...temporaryState2 };
        arr.push(temporaryState2);
        break;

      case 'clear':
        const temporaryState3 = { ...newState };

        clearState(temporaryState3);
        newState = {};
        newState = { ...temporaryState3 };
        arr.push(temporaryState3);
        break;

      default:
        break;
    }
  }

  return arr;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);

  return state;
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return state;
}

function clearState(state) {
  for (const key in state) {
    delete state[key];
  }

  return state;
}

module.exports = transformStateWithClones;
