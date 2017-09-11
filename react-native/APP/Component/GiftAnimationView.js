'use strict';

import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    Animated,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Easing
} from 'react-native';

import constant from '../Utils/Constant'


export default class GiftAnimationView extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        return (
            <View style={[this.props.style, {overflow: 'hidden'}]}>
                <GiftItem
                    ref={(ref) => this.giftItem1 = ref}
                    giftInfo={this.props.giftInfo}
                />
                <GiftItem
                    ref={(ref) => this.giftItem2 = ref}
                    giftInfo={this.props.giftInfo}
                />
            </View>
        );
    }

    addGiftItem(giftItemEntity) {

        let datas1 = this.giftItem1.giftItemDatas;
        let datas2 = this.giftItem2.giftItemDatas;
        let isEmpty1 =  !this.giftItem1.isAnimating;
        let isEmpty2 =  !this.giftItem2.isAnimating;

        let index1 = datas1.findIndex((value) => {
            return value === `${giftItemEntity.name}_animation_pop`
        })
        let index2 = datas2.findIndex((value) => {
            return value === `${giftItemEntity.name}_animation_pop`
        })

        console.log(index1 + index2 + '_______')
        if (index1 >= 0) {

            console.log(giftItemEntity.name + '11111111index')
            datas1.splice(index1, 0, `${giftItemEntity.name}_combo`);
            return;
        } else if (index2 >= 0) {

            console.log(giftItemEntity.name + '22222222index')
            datas2.splice(index2, 0, `${giftItemEntity.name}_combo`);
            return;
        }

        if (datas1.length > datas2.length) {

            console.log(giftItemEntity.name + '2222222length')
            datas2.push(giftItemEntity.name, `${giftItemEntity.name}_combo`, `${giftItemEntity.name}_animation_pop`)

            if (isEmpty2) {
                console.log(giftItemEntity.name + 'start____2222222')
                this.giftItem2.startAnimation();
            }
        } else {

            datas1.push(giftItemEntity.name, `${giftItemEntity.name}_combo`, `${giftItemEntity.name}_animation_pop`)
            console.log(giftItemEntity.name + '11111111length')

            if (isEmpty1) {
                console.log(giftItemEntity.name + 'start____111111')
                this.giftItem1.startAnimation();
            }
        }

    }

}


class GiftItem extends Component {

    constructor(props) {
        super(props)

        this.isAnimating = false;
        this.giftItemDatas = [];
        this.leftMarginValue = new Animated.Value(0)
        this.scaleValue = new Animated.Value(0)
        this.state = {
            giftName: '',
            giftCount: 0,
            giftIcon: ''
        };
    }

    render() {

        const marginLeft = this.leftMarginValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-250, 0, constant.deviceWidth]
        })

        const scale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.5, 1]
        })

        return (

            <Animated.View style={[styles.giftItemView, {marginLeft}]}>
                <View style={styles.giftView}>
                    <Image style={styles.avatar} source={require('../Image/avatar.jpg')}/>
                    <Text style={styles.desc}>
                        {`无聊盒子\n`}
                        <Text style={styles.giftText}>{`送出礼物【${this.state.giftName}】`}</Text>
                    </Text>
                    <Image style={styles.giftIcon} source={{uri: this.state.giftIcon}}/>
                </View>
                <Animated.View style={[styles.giftCountView, {transform: [{scale: scale}]}]}>
                    <Text style={styles.giftCountText} >{`X${this.state.giftCount}`}</Text>
                </Animated.View>
            </Animated.View>
        )
    }


    startAnimation() {

        if (this.giftItemDatas.length === 0) {

            return;
        }
        this.isAnimating = true;
        let nextAnimation = this.giftItemDatas.shift();
        let giftInfo = this.props.giftInfo

        if (nextAnimation.indexOf('animation_pop') > 0) {

            this.leftMarginValue.setValue(0.5)
            Animated.timing(
                this.leftMarginValue,
                {
                    delay: 2000,
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear
                }
            ).start(() => {
                this.isAnimating = this.giftItemDatas.length !== 0;
                this.startAnimation()
            })

        } else if (nextAnimation.indexOf('combo') > 0) {

            this.setState({giftCount: this.state.giftCount + 1})

            this.scaleValue.setValue(0)
            Animated.timing(
                this.scaleValue,
                {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear
                }
            ).start(() => this.startAnimation())

        } else {

            let entity = giftInfo.find((entity) => entity.name === nextAnimation)
            this.setState({
                giftCount: 0,
                giftName: nextAnimation,
                giftIcon: entity.image
            })

            this.leftMarginValue.setValue(0)
            Animated.timing(
                this.leftMarginValue,
                {
                    toValue: 0.5,
                    duration: 300,
                    easing: Easing.linear
                }
            ).start(() => this.startAnimation())
        }


    }


}

const styles = StyleSheet.create({
    giftItemView: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    giftView: {
        marginLeft: 0,
        marginTop: 15,
        width: 200,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    desc: {
        fontSize: 10,
        color: '#fff',
        marginLeft: 7,
        lineHeight: 15,
    },
    giftText: {
        fontSize: 10,
        color: '#FF7F00',
    },
    giftIcon: {
        marginLeft: 5,
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    giftCountView: {
        marginTop: 15,
        marginLeft: 10,
        // backgroundColor:'red'
    },
    giftCountText: {
        color: '#00D8C9',
        fontSize: 20,
        fontWeight:'900',
        shadowColor:'yellow',
        shadowRadius:5,
        shadowOpacity:1,
    }
});