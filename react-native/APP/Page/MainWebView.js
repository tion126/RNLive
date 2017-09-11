import React, {Component} from 'react'
import {connect} from 'react-redux';
import {
    View,
    Text,
    Button,
    Image,
    FlatList,
    WebView
} from 'react-native'


export default class MainWebView extends Component{

    static navigationOptions  = ({ navigation }) => ({
        title:navigation.state.params.webTitle,
    });

    render(){

        return(
            <WebView
                automaticallyAdjustContentInsets={false}
                style={{backgroundColor:'#f5f5f9'}}
                source={{uri: this.props.navigation.state.params.URL}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                onNavigationStateChange={this.onNavigationStateChange}
                startInLoadingState={true}
                scalesPageToFit={true}
            />
        )

    }


    onNavigationStateChange = (navState) => {

        this.props.navigation.setParams({webTitle : navState.title})
    };


}