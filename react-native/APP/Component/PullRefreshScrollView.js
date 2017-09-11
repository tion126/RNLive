'use strict';
import React, {Component,PureComponent} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    Animated,
    Easing,
    ScrollView,
    ListView,
    ActivityIndicator,
    AppRegistry,
} from 'react-native';

import CustomImage from './CustomImage'

export default class PullRefreshScrollView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            prState: 0,
            prLoading: false,
            lmState: 0,
        };

        this.dragFlag = false; //scrollview是否处于拖动状态的标志
    }

    shouldComponentUpdate( nextProps, nextState){

        if (nextProps.children.length > this.props.children.length) {

        return true;
        }

        return false;
    }


    // 滚动触发
    onScroll(e) {
        let target = e.nativeEvent;
        let y = target.contentOffset.y;
        let type = this.props.refreshType;

        if (this.dragFlag) {

            if (type === 'animation') {

                this.animationStatusChange(y)
            }
        }

        if (this.props.onScroll) {
            this.props.onScroll(e);
        }
    }


    animationStatusChange(y) {

        let index = Math.abs(Math.floor(y)) % 29;

        if (index > 29 || index <= 0) {

            index = 1;
        }

        let image;
        let prState;
        if (y <= -70) {
            prState = 1;
            image = require('../Image/refresh_gif.gif');
        } else {
            prState = 0;
            image = {uri: `refresh_fly_${index}`};
        }

        this.customImage.setNativeProps({source: image})

        console.log(prState + 'current pr')
        if (this.state.prState !== prState){

            this.setState({
                prState: prState,
            });
        }
    }

    // 手指离开
    onScrollEndDrag() {

        this.dragFlag = false;
        if (this.state.prState && this.state.prLoading) {

            // 回到待收起状态
            this.scrollView.scrollTo({x: 0, y: -70, animated: true});

            this.setState({
                prLoading: true,
            });

            // 触发外部的下拉刷新方法
            if (this.props.onRefresh) {
                this.props.onRefresh(this);
            }
        }

    }

    // 手指未离开
    onScrollBeginDrag() {

        if (!this.state.beginScroll){

            this.setState({
                beginScroll: true
            });
        }

        this.dragFlag = true;

        if (this.props.onScrollBeginDrag) {
            this.props.onScrollBeginDrag();
        }
    }


    onRefreshEnd() {
        this.setState({
            prLoading: false,
            beginScroll: false,
        });

        this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    }


    renderAnimationContent() {

        let jsxarr = [];

        jsxarr.push(<CustomImage
            ref={ref => this.customImage = ref}
            style={{marginBottom: 5, height: 50, width: 60}}
            source={{uri : 'refresh_fly_1'}}
            resizeMode={'contain'}/>)

        return jsxarr;
    }

    renderIndicatorContent() {

        let type = this.props.refreshType;
        let jsx;

        if (type == 'animation') {

            jsx = this.renderAnimationContent();
        }

        return (
            <View style={styles.pullRefresh}>

                {jsx.map((item, index) => {
                    return <View key={index}>{item}</View>
                })}
            </View>
        );
    }


    getScrollResponder() {
        return this.scrollView.getScrollResponder();
    }

    setNativeProps(props) {
        this.scrollView.setNativeProps(props);
    }

    fixSticky() {
        let stickyHeaderIndices = [];
        let propsStickHeader = this.props.stickyHeaderIndices || [];
        for (let i = 0; i < propsStickHeader.length; i++) {
            if (i > 0) {
                stickyHeaderIndices.push(propsStickHeader[i] + 1);
            }

        }
        return stickyHeaderIndices;
    }

    render() {

        console.log(this.state);

        return React.cloneElement(<ScrollView
            ref={(scrollView) => this.scrollView = scrollView}
            {...this.props}
            stickyHeaderIndices={this.fixSticky()}
            scrollEventThrottle={16}
            onScrollEndDrag={() => this.onScrollEndDrag()}
            onScrollBeginDrag={() => this.onScrollBeginDrag()}
            onScroll={(e) => this.onScroll(e)}

        >

            {this.renderIndicatorContent()}
            {this.props.children}
            {this.useLoadMore ? this.renderIndicatorContentBottom() : null}
        </ScrollView>, {
            ref: component => {
                this.scrollView = component;
            },
        });

    }

}

const dateFormat = function (dateTime, fmt) {
    let date = new Date(dateTime);
    fmt = fmt || 'yyyy-MM-dd';
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const styles = StyleSheet.create({
    pullRefresh: {
        position: 'absolute',
        top: -69,
        left: 0,
        backfaceVisibility: 'hidden',
        right: 0,
        height: 70,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    loadMore: {
        height: 35,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        height: 70,
        backgroundColor: 'transparent',
    },
    prText: {
        marginBottom: 4,
        color: '#000',
        fontSize: 12,
        backgroundColor: 'transparent',
    },

    prState: {
        marginBottom: 4,
        fontSize: 12,
    },
    lmState: {
        fontSize: 12,
    },
    indicatorContent: {
        flexDirection: 'row',
        marginBottom: 5
    },

});
