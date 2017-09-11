'use strict';

import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import constant from '../Utils/Constant'
import Swiper from 'react-native-swiper'
export default class GiftView extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let giftItemViews = this.props.sources.map((source, index) => {
            let image = source.image
            let name = source.name;
            return (
                <TouchableWithoutFeedback
                    key={'b_image_'+index}
                    onPress={
                        () => {
                            this.props.onGiftItem && this.props.onGiftItem(source);
                        }
                    }
                >
                    <View style={styles.giftItem}>
                        <Image style={{height: 40, width: 40, resizeMode: 'contain', marginTop:25}}
                               source={{uri : image}}
                               defaultSource={require('../Image/global_web_default.png')}/>
                        <Text style={{color:'white',fontSize:13,marginTop:15}}>{name}</Text>
                    </View>

                </TouchableWithoutFeedback>
            );
        })

        let giftViews = [];

        for (let index = 0 ; index < giftItemViews.length ; index+=8){

                let sliceGitfItems = giftItemViews.slice(index,index+8);

                let giftView = (
                    <View key={'giftView_' + index} style={styles.giftView}>
                        {sliceGitfItems}
                    </View>
                )

                giftViews.push(giftView);
        }

        return (
            <View style={this.props.style}>
                <Swiper
                    height={constant.deviceWidth*2/3}
                    showsPagination={false}
                    horizontal={true}
                    dotStyle={{width: 6, height: 6, backgroundColor:'rgba(255,255,255,.8)'}}
                    activeDotStyle={{width: 6, height: 6, backgroundColor:'#1BD1BC'}}
                    paginationStyle={{bottom: 10}}>
                    {giftViews}
                </Swiper>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    giftItem:{
        width:constant.deviceWidth/4,
        height:constant.deviceWidth/3,
        alignItems:'center',
        backgroundColor:'transparent',
        borderBottomWidth:0.5,
        borderRightWidth:0.5,
        borderColor:'rgba(255,255,255,.3)'
    },
    giftView:{
        width:constant.deviceWidth,
        height:constant.deviceWidth*2/3,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        backgroundColor:'transparent'
    }
});