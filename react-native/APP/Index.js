
import { AppRegistry } from 'react-native';
import React, { Component } from 'react'
import {Provider}from 'react-redux'
import consfigureStore from './Store/ConfigureStore.js'
import NavigatorComponent from './Component/NavigatorComponent.js'

const store = consfigureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store = {store}>
                <NavigatorComponent/>
            </Provider>
        )
    }
}

console.disableYellowBox = true;

AppRegistry.registerComponent('RNLive', () => Root);