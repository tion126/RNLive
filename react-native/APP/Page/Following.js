import React, {Component} from 'react'
import {connect} from 'react-redux';
import {
    View,
    Text,
    Button,
    Image,
    FlatList,
} from 'react-native'


export default class Following extends Component {

    static navigationOptions = ({navigation}) => ({
        title: '关注',
    });

    render() {

        return (
            <View style={{alignItems: 'center',justifyContent:'center',flex:1}}>
                <Image source={require('../Image/follow_live_empty.png')}
                       style={{width: 100, height: 100}}/>
                <Text style={{marginTop: 15, marginBottom: 10, color: '#333', fontSize: 14}}>
                    关注的人竟然不在直播
                </Text>
                <Text style={{
                    color: '#fff',
                    fontSize: 14,
                    backgroundColor: '#1BD1BC',
                    borderRadius:17.5,
                    lineHeight:35,
                    width:100,
                    overflow:'hidden',
                    textAlign:'center',
                }}
                      onPress={()=>{this.props.navigation.navigate('Home')}}
                      suppressHighlighting={true}
                >
                    去热门转转
                </Text>
            </View>
        )

    }

}