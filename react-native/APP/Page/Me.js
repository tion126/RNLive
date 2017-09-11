import React, {Component} from 'react'
import {connect} from 'react-redux';
import {
    View,
    Text,
    Button,
    Image,
    FlatList,
    ScrollView,
    SectionList,
    StyleSheet
} from 'react-native'
import Banner from '../Component/Banner'
import * as HomeActions from '../Actions/Home'
import constant from '../Utils/Constant'

const sectonDatas = {
    section1:[
        {title:'映票贡献榜',icon:require('../Image/home_contribute.png')}
    ],
    section2:[
        {title:'视频',icon:require('../Image/home_video_icon.png')},
        {title:'观看记录',icon:require('../Image/home_watch_record_icon.png')},
    ],
    section3:[
        {title:'收益',icon:require('../Image/home_harvest_icon.png')},
        {title:'账户',icon:require('../Image/home_account_icon.png')},
        {title:'等级',icon:require('../Image/home_level_icon.png')},
        {title:'实名认证',icon:require('../Image/home_certify_icon.png')},
        {title:'邀请好友',icon:require('../Image/home_invite_friend_icon.png')}
    ],
    section4:[
        {title:'设置',icon:require('../Image/home_setting_icon.png')}
    ],
}

export default class Me extends Component {


    static navigationOptions  = ({ navigation }) => ({
        headerTitleStyle:{color:'#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#1BD1BC'},
        title:'我'
    });

    componentDidMount() {


    }

    render() {
        return (

            <SectionList
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:'#f5f5f9'}}/>}
                SectionSeparatorComponent={()=><View style={{height:10,backgroundColor:'#f5f5f9'}}/>}
                ListHeaderComponent={this._renderHeaderComponent}
                renderItem={this._renderItemComponent}
                contentContainerStyle={{paddingBottom:20}}
                sections={[
                    {data: sectonDatas.section1, key:'s1'},
                    {data: sectonDatas.section2, key:'s2'},
                    {data: sectonDatas.section3, key:'s3'},
                    {data: sectonDatas.section4, key:'s4'},
                ]}
            />
        )
    }

    _keyExtractor = (item, index) => `${index}${item.id}`;

    _renderItemComponent = ({item}) => {

        return (
            <View style={{backgroundColor:'white',flexDirection:'row',alignItems:'center',height:44}}>
                <Image style={{height:20,width:20,marginLeft:15}} source={item.icon}/>
                <Text style={{marginLeft:5,color:'#333',fontSize:14}}>{item.title}</Text>
                <Image style={{position:'absolute',top:15,right:15,height:15,width:15}} source={require('../Image/gift_wall_lettle_white_arrow_msg.png')}/>
            </View>
        );
    };


    _renderHeaderComponent= () => {

        return (
            <View style={{backgroundColor:'white'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={styles.avatar} source={require('../Image/avatar.jpg')}/>
                    <Text style={styles.userName}>无聊盒子</Text>
                    <Image style={styles.male} source={require('../Image/global_male.png')}/>
                </View>
                <View style={{height:1,backgroundColor:'#f5f5f9'}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{alignItems:'center',flex:1}}>
                        <Text style={{color:'#333',fontSize:16,marginTop:10}}>9999</Text>
                        <Text style={{color:'#999',fontSize:14,marginTop:10,marginBottom:15}}>我的关注</Text>
                    </View>
                    <View style={{width:1,height:15,backgroundColor:'#f5f5f9'}}/>
                    <View style={{alignItems:'center',flex:1}}>
                        <Text style={{color:'#333',fontSize:16,marginTop:10}}>9999</Text>
                        <Text style={{color:'#999',fontSize:14,marginTop:10,marginBottom:15}}>我的粉丝</Text>
                    </View>
                </View>
                <View style={{height:10,backgroundColor:'#f5f5f9'}}/>
            </View>
        )
    };

}

const styles = StyleSheet.create({

    avatar:{
        marginLeft:15,
        marginTop:15,
        height:60,
        width:60,
        borderRadius:30,
        marginBottom:15
    },
    userName:{
        marginLeft:15,
        fontSize:20,
        color:'#333'
    },
    male:{
        marginLeft:5,
        height:15,
        width:15
    },
})