import React, {Component} from 'react'
import {connect} from 'react-redux';
import {
    View,
    Text,
    Button,
    Image,
    FlatList,
    ScrollView,
    VirtualizedList,
    StyleSheet,
    requireNativeComponent,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native'
import GiftAnimationView from '../Component/GiftAnimationView'
import GiftView from '../Component/GiftView'
import constant from '../Utils/Constant'

const LiveView = requireNativeComponent('LiveView', null);

export default class LivePage extends Component {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props);

        this.state = {modalVisible: false};
        this.giftInfo = this.props.navigation.state.params.giftInfo
    }

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {


    }

    componentWillUnmount(){


        if(constant.iOS){

            constant.LiveViewManager.livePagePop()
        }else{

            this.liveView && this.liveView.setNativeProps({livePagePop:true});
        }
    }

    render() {

        let item = this.props.navigation.state.params.item
        let image = item.creator.portrait;
        let URL = item.stream_addr;

        if (image && (image.indexOf("http://") === -1)) {

            image = `http://img.meelive.cn/${image}`
        }

        return (
            <View>
                <LiveView
                    ref={ref=>this.liveView = ref}
                    liveParameter={{
                        URL: URL,
                        holder: image
                    }}
                    style={styles.liveView}
                />
                {this._renderHeaderView()}
                {this._renderBottomView()}
                {this._renderModalView()}
                {this._renderGiftView()}
            </View>
        )
    }

    _renderHeaderView() {

        let item = this.props.navigation.state.params.item
        let image = item.creator.portrait;
        let cnt = item.online_users ? item.online_users : 9999;
        let date = getNowFormatDate()

        return (
            <View style={styles.headerView}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.avatarView}>
                        <Image style={styles.avatar} source={{uri: image}}/>
                        <Text style={styles.countText}>{`直播\n${cnt}`}</Text>
                        <View style={styles.attentionView}>
                            <Text style={styles.attentionText}>关注</Text>
                        </View>
                    </View>
                    <Text style={styles.dateText}>{`映客号:${item.creator.id}\n${date}`}</Text>
                </View>
            </View>
        )
    }

    _renderBottomView() {

        return (
            <View style={styles.bottomView}>
                <TouchableWithoutFeedback onPress={() => this._onGift()}>
                    <Image style={{height: 40, width: 40, resizeMode: 'contain'}}
                           source={require('../Image/mg_room_btn_liwu_h.png')}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this._onPop()}>
                    <Image style={{height: 40, width: 40, resizeMode: 'contain', marginRight: 20, marginLeft: 15}}
                           source={require('../Image/mg_room_btn_guan_h.png')}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    _renderModalView() {

        return (

            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false);
                }}
            >
                <TouchableWithoutFeedback onPress={() => this._setModalVisible(false)}>
                    <View style={{backgroundColor: 'transparent', flex: 1}}>
                        <GiftView
                            style={styles.modalView}
                            sources={this.giftInfo === null ? [] : this.giftInfo}
                            defaultSource={require('../Image/global_web_default.png')}
                            onGiftItem={(giftItemEntity) => this._onGiftItem(giftItemEntity)}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )

    }

    _renderGiftView() {
        return (
            <GiftAnimationView
                ref={(ref)=>this.giftAnimationView = ref}
                style={styles.giftView}
                giftInfo={this.giftInfo}
            />
        )
    }

    _onGiftItem(giftItemEntity) {

        this.giftAnimationView.addGiftItem(giftItemEntity);
    }

    _onPop() {
        this.props.navigation.goBack()
    }

    _onGift() {

        this._setModalVisible(true);
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

}

function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // width:constant.deviceWidth,
        height: 70
    },
    avatarView: {
        marginLeft: 15,
        marginTop: 30,
        height: 35,
        width: 130,
        borderRadius: 17.5,
        marginBottom: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
    },
    countText: {
        fontSize: 10,
        color: '#999',
        marginLeft: 7,
        lineHeight: 15,
    },
    attentionView: {
        marginLeft: 7,
        height: 25,
        width: 40,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1BD1BC'
    },
    attentionText: {
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
    },
    dateText: {
        marginTop: 30,
        marginRight: 15,
        fontSize: 14,
        color: '#999',
        textAlign: 'right',
        lineHeight: 20,
    },
    bottomView: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: constant.iOS ? 0 : 40,
        right: 0,
        width: constant.deviceWidth,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    liveView: {
        height: constant.deviceHeight,
        width: constant.deviceWidth,
    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: constant.deviceWidth * 2 / 3,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    giftView:{
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        height: 120
    }
})
