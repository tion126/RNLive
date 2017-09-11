import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    Image,
    Animated,
    Easing
} from 'react-native';

import constant from '../Utils/Constant'

const tabItems = [
    {
        title: '首页',
        activeIcon: require('../Image/tab_live_p.png'),
        inactiveIcon: require('../Image/tab_live.png')
    },
    {
        title: '附近',
        activeIcon: require('../Image/tab_near_p.png'),
        inactiveIcon: require('../Image/tab_near.png')
    },
    {
        title: '',
        activeIcon: require('../Image/tab_launch.png'),
        inactiveIcon: require('../Image/tab_launch.png')
    },
    {
        title: '关注',
        activeIcon: require('../Image/tab_following_p.png'),
        inactiveIcon: require('../Image/tab_following.png')
    },
    {
        title: '我',
        activeIcon: require('../Image/tab_me_p.png'),
        inactiveIcon: require('../Image/tab_me.png')
    },
]


export default class TabBar extends Component {


    render() {
        const {
            navigation,
            jumpToIndex
        } = this.props;

        const {
            routes
        } = navigation.state;

        return (
            <View style={styles.container}>
                {routes && routes.map((route, index) => {
                    const focused = index === navigation.state.index;
                    return (
                        <TabBarItem
                            key={index}
                            route={route}
                            index={index}
                            focused={focused}
                            jumpToIndex={jumpToIndex}
                        />
                    );
                })}

            </View>
        );
    }

};

class TabBarItem extends Component{

    constructor(props) {
        super(props)

        this.scaleValue = new Animated.Value(0)
    }

    render(){

        let { index, focused, jumpToIndex} = this.props;
        let item = tabItems[index];
        let image = focused ? item.activeIcon : item.inactiveIcon;
        let color = focused ? '#06c1ae' : '#979797';
        let isLiveItem = index === 2;
        let func = isLiveItem ? this._presentLiveCameraView : jumpToIndex;
        let iconWidth = isLiveItem ? 70 : 25;
        iconWidth = isLiveItem && constant.android ? 50 : iconWidth;

        const scale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.2, 1]
        })

        if (focused) { this._startAnimation(); }

        return (

            <TouchableWithoutFeedback
                onPress={() => func(index)}>
                <View style={styles.iconView}>
                    <Animated.Image source={image}
                                    style={{
                                        width: iconWidth,
                                        height: iconWidth,
                                        resizeMode: 'stretch',
                                        marginBottom:constant.iOS && isLiveItem ? 10 : 0,
                                        transform: [{scale: scale}],
                                    }}
                    />

                    {isLiveItem ? null : <Text style={[styles.iconText, {color}]}>{item.title}</Text>}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _presentLiveCameraView() {

        if(constant.iOS){
            constant.LiveRCTmanager.presentLFLiveViewController()
        }else{

        }
    }

    _startAnimation(){

        this.scaleValue.setValue(0)
        Animated.spring(
            this.scaleValue,
            {
                toValue: 1,
            }
        ).start()
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        // backgroundColor: 'transparent',
        backgroundColor: '#fff',
    },
    iconView: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        marginTop: 5,
    }
});
