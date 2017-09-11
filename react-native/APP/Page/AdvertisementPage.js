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
        header:null,
    });

    render(){

        return(
            <Image>

            </Image>
        )

    }


    onNavigationStateChange = (navState) => {

        this.props.navigation.setParams({webTitle : navState.title})
    };


}