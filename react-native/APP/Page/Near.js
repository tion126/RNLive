import React, {Component,PureComponent} from 'react'
import {connect} from 'react-redux';
import {
    View,
    Text,
    Button,
    Image,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

import constant from '../Utils/Constant'
import PullRefreshScrollView from '../Component/PullRefreshScrollView'
import * as NearAction from '../Actions/Near'

const layoutWidth = (constant.deviceWidth - 40) / 3
const layoutHeight = layoutWidth + 30;

const imageEditor = require('ImageEditor')

class Near extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        title: '附近',
    });

    componentDidMount() {

        this.props.fetchNearData()
    }

    componentWillReceiveProps(nextProps) {
        const {nearFetched} = nextProps;

        if (nearFetched) {

            let scrollRef = this._flatList._listRef._scrollRef;
            scrollRef && scrollRef.onRefreshEnd();
        }

    }

    render() {

        return (
            this.props.nearData ? <FlatList
                initialNumToRender={15}
                numColumns={3}
                contentContainerStyle={styles.flatListStyle}
                columnWrapperStyle={{backgroundColor: '#fff'}}
                collapsable={false}
                getItemLayout={this._getItemLayout}
                keyExtractor={this._keyExtractor}
                ref={(ref) => this._flatList = ref}
                data={this.props.nearData}
                renderItem={this._renderItemComponent}
                renderScrollComponent={this._renderScrollComponent}
            /> : null
        )
    }

    _renderScrollComponent = ({props}) => {

        return (
            <PullRefreshScrollView
                {...props}
                onRefresh={(ref) => {
                    this._onRefresh(ref)
                }}
                refreshType='animation'
            />
        )
    }

    _keyExtractor = (item, index) => `${index}${item.id}`;

    _getItemLayout = (data, index) => {

        return {length: layoutHeight, offset: layoutHeight * index / 3, index: index}
    }

    _renderItemComponent = ({item}) => {

        let avatar = item.info.creator.portrait ? {uri: item.info.creator.portrait} : require('../Image/global_web_default.png');
        let rank = item.info.creator.level;
        let distance = item.info.distance;

        return (
            <TouchableWithoutFeedback key={item.id} onPress={() => this._onItemPress(item)}>
                <View style={{backgroundColor: '#fff', marginLeft: 10, marginTop: 10}}>

                    <Image style={{height: layoutWidth, width: layoutWidth, resizeMode: 'contain'}}
                           source={avatar}>
                        <Image source={require('../Image/bg_near_avatar.png')}
                               style={{
                                   position: 'absolute',
                                   top: 0,
                                   left: 0,
                                   height: layoutWidth, width: layoutWidth,
                                   resizeMode: 'contain'
                               }}/>
                    </Image>

                    <View style={{flexDirection: 'row', height: 30, alignItems: 'center'}}>
                        <Image source={require('../Image/bg_rank.png')}
                               style={{width: 32, height: 20}}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 10,
                                position: 'absolute',
                                right: 3,
                                top: 0,
                                lineHeight: 18,
                                backgroundColor: 'transparent',
                                textAlign: 'center'
                            }}>{rank}</Text>
                        </Image>
                        <Text style={{
                            marginLeft: 5,
                            color: '#333',
                            fontSize: 12,
                            fontWeight: 'bold'
                        }}>{distance}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    _onItemPress(item) {

        let giftInfo = this.props.giftData.gifts
        this.props.navigation.navigate('LivePage', {item: item.info, giftInfo: giftInfo})
    }

    _onRefresh() {

        this.props.fetchNearData()
    }

}

const styles = StyleSheet.create({
    flatListStyle: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
});


function mapStateToProps(state) {
    return {
        nearData: state.NearReducer.nearData,
        nearFetched: state.NearReducer.nearFetched,
        giftData: state.HomeReducer.giftData
    };
}


export default connect(mapStateToProps, NearAction)(Near)