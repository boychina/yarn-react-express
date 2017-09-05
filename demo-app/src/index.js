import {
    createStore, applyMiddleware, combineReducers, compose
} from "redux";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import RootApp from "./ne_monitor/component/UI-state/RootApp.js";
import './index.css';
import "./utils/auto.js";

import {
    AlarmTrendData,
    // topLineEchartsGetTime,
    // AlarmTabelGetData,
    // AlarmOpenCardGetData,
    // AlarmOpenCardHide,
    // AlarmTopologyGetData,
    // getGROUPID,
    // getTimeLength,
    // AlarmDataExport,
    // goToKQIByTime,
    // ResetCurrent,
    // saveSortCondition,
    // saveFilterCondition,
    // clearTable
    } from "./ne_monitor/reducer/reducer.js";

const newReducer = combineReducers({
    AlarmTrendData,
    // topLineEchartsGetTime,
    // AlarmTabelGetData,
    // AlarmOpenCardGetData,
    // AlarmOpenCardHide,
    // AlarmTopologyGetData,
    // getGROUPID,
    // getTimeLength,
    // AlarmDataExport,
    // goToKQIByTime,
    // ResetCurrent,
    // saveSortCondition,
    // saveFilterCondition,
    // clearTable
});

const logger = createLogger();
const initialState = {};

var configureStore = function() {
    let store;
    if (module.hot) {
        store = createStore(newReducer, initialState, compose(
            applyMiddleware(thunkMiddleware, logger),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ));
    } else {
        store = createStore(newReducer, initialState, compose(
            applyMiddleware(thunkMiddleware, logger), f => f
        ));
    }
    return store;
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}><RootApp/></Provider>,
  document.getElementById('root')
);