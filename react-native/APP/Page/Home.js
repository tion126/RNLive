import React, {Component,PureComponent} from 'react'
import {connect} from 'react-redux';
import {
    View,
    Text,
    Button,
    Image,
    FlatList,
    ScrollView,
    VirtualizedList,
    TouchableWithoutFeedback
} from 'react-native'
import Banner from '../Component/Banner'
import * as HomeActions from '../Actions/Home'
import constant from '../Utils/Constant'
import PullRefreshScrollView from '../Component/PullRefreshScrollView'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabViewBar from '../Component/TabViewBar'

class Home extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    componentDidMount() {

        this.props.fetchBannerData()
        this.props.fetchHotLiveData()
        this.props.fetchGiftData()
    }

    componentWillReceiveProps(nextProps) {
        const {hotLiveFetched} = nextProps;

        if (hotLiveFetched) {

            let scrollRef = this._flatList._listRef._scrollRef;
            scrollRef && scrollRef.onRefreshEnd();
        }

    }


    render() {
        return (

            (
                <ScrollableTabView
                    removeClippedSubviews={false}
                    collapsable={false}
                    renderTabBar={this._renderTabViewBar}
                    initialPage={1}>
                    <View tabLabel="关注"/>
                    <FlatList
                        removeClippedSubviews={false}
                        collapsable={false}
                        getItemLayout={this._getItemLayout}
                        keyExtractor={this._keyExtractor}
                        tabLabel="热门"
                        ref={(ref) => this._flatList = ref}
                        ListHeaderComponent={this._renderHeaderComponent}
                        data={this.props.hotLiveData.lives}
                        renderItem={this._renderItemComponent}
                        renderScrollComponent={this._renderScrollComponent}
                    />
                    <View tabLabel="附近"/>
                    <View tabLabel="小视频"/>
                    <View tabLabel="游戏"/>
                    <View tabLabel="新人"/>
                </ScrollableTabView>
            )

        )
    }

    _renderTabViewBar = () => {

        return (

            <TabViewBar
                activeTextColor={'#fff'}
                inactiveTextColor={'#fff'}
                onLeftItem={this._onLeftItem}
                onRightItem={this._onRightItem}
            />
        )
    }

    _onLeftItem = () => {

        console.log('_onLeftItem')
    }

    _onRightItem = () => {

        console.log('_onRightItem')
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

        let layoutHeight = constant.deviceWidth * 1.1 + 70;

        let layoutOffset = layoutHeight * index + 160;

        return {length: layoutHeight, offset: layoutOffset, index: index}
    }
    _renderItemComponent = ({item}) => {

        let tags = item.extra.label.map((source, index) => {
            return (
                <View key={`${index}${item.id}`} style={{
                    borderRadius: 10,
                    borderColor: '#00D8C9',
                    borderWidth: 1,
                    padding: 3,
                    marginRight: 10,
                    height: 20,
                    justifyContent: 'center'
                }}>
                    <Text style={{color: '#00D8C9', fontSize: 14, textAlign: 'center'}}>{source.tab_name}</Text>
                </View>
            );
        })

        return (
            <TouchableWithoutFeedback onPress={()=>this._onItemPress(item)}>
                <View key={item.id}>
                    <View style={{padding: 10, backgroundColor: '#fff', width: constant.deviceWidth, height: 70}}>
                        <Image
                            style={{position: 'absolute', left: 10, top: 10, height: 50, width: 50, borderRadius: 25}}
                            source={{uri: item.creator.portrait}}/>
                        <Text style={{position: 'absolute', left: 70, top: 10, color: '#555555', fontSize: 15}}
                              numberOfLines={1}>{item.creator.nick}</Text>
                        <Text style={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                            textAlign: 'right',
                            color: '#FF7F00',
                            fontSize: 15
                        }}>{item.online_users + '在看'}</Text>
                        {/*<Text style={{marginTop:10,marginLeft:10,color:'#aaa',fontSize:15}}>{item.city}</Text>*/}
                        <ScrollView horizontal={true}
                                    style={{position: 'absolute', left: 70, bottom: 10, height: 20}}>{tags}</ScrollView>
                    </View>
                    <Image style={{height: constant.deviceWidth * 1.1, width: constant.deviceWidth}}
                           source={{uri: item.creator.portrait}}/>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    _onItemPress(item){

        let giftInfo = this.props.giftData.gifts
        this.props.navigation.navigate('LivePage', {item,giftInfo})
    }

    _renderHeaderComponent = () => {

        return (
            <View>
                <Banner style={{backgroundColor: '#f9f9f9', height: 160}}
                        sources={this.props.bannerData.ticker == null ? [] : this.props.bannerData.ticker}
                        defaultSource={require('../Image/global_web_default.png')}
                        onPage={(link) => this._onBannerPage(link)}/>
            </View>
        )
    };

    _onBannerPage(link) {

        this.props.navigation.navigate('MainWebView', {
            URL: link,
        })
    }

    _onRefresh() {

        this.props.fetchHotLiveData()
    }
}

function mapStateToProps(state) {
    return {
        bannerData: state.HomeReducer.bannerData,
        hotLiveData: state.HomeReducer.hotLiveData,
        hotLiveFetched: state.HomeReducer.hotLiveFetched,
        giftData: state.HomeReducer.giftData
    };
}


export default connect(mapStateToProps, HomeActions)(Home)