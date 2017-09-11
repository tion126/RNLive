'use strict';

import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import Swiper from 'react-native-swiper'

const screenWidth = Dimensions.get('window').width;

export default class Banner extends Component {

    constructor(props) {
        super(props)

        this.state = {
            swiperShow: false,
        };
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0)
    }

    render() {
        let imageViews = this.props.sources.map((source, index) => {
            let image = source.image
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    key={'b_image_' + index}
                    onPress={
                        () => {
                            this.props.onPage && this.props.onPage(source.link);
                        }
                    }
                >
                    <Image style={[styles.image, this.props.imageStyle, {height: this.props.style.height}]}
                           source={typeof(image) == 'string' ? {uri: image} : image}
                           defaultSource={this.props.defaultSource}/>
                </TouchableOpacity>
            );
        })
        return (
            this.state.swiperShow ?
                    <Swiper
                        height={160}
                        showsPagination={true}
                        horizontal={true}
                        loop={true}
                        removeClippedSubviews={false}
                        collapsable={false}
                        overflow="visible"
                        autoplayTimeout={2}
                        autoplay={true}
                        dotStyle={{width: 6, height: 6, backgroundColor: 'rgba(255,255,255,.8)'}}
                        activeDotStyle={{width: 6, height: 6, backgroundColor: '#1BD1BC'}}
                        paginationStyle={{bottom: 10}}>
                        {imageViews}
                    </Swiper> : null
        )
    }

}


const styles = StyleSheet.create({
    titleView: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        height: 35,
        width: screenWidth,
    },
    titleBg: {
        backgroundColor: 'rgba(0,0,0,.4)',
        position: 'absolute',
        bottom: 0,
        height: 35,
        width: screenWidth,
    },
    titleStyle: {
        color: 'white',
        marginRight: 100,
        marginLeft: 10,
    },
    image: {
        width: screenWidth,
        resizeMode: 'cover'
    },
});