import constant from '../Utils/Constant'
const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    TouchableOpacity,
    ScrollView,
} = ReactNative;

const DefaultTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
        renderTab: React.PropTypes.func,
        underlineStyle: View.propTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: '#a6ce37',
            inactiveTextColor: '#333333',
            backgroundColor: "#fff",
        };
    },

    renderTabOption(name, page) {
    },

    _renderButton(onPress, image){

        return (
            <TouchableOpacity style={{width: 44, height: 44, marginTop: 20, alignItems: 'center'}} onPress={onPress}>
                <Image source={image} style={{width: 20, height: 20, marginTop: 14}} resizeMode={'contain'}/>
            </TouchableOpacity>
        )
    },

    renderTab(name, page, isTabActive, onPressHandler) {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        return <TouchableOpacity
            style={{flex: 1,}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab, this.props.tabStyle,]}>
                <Text style={[{color: textColor, fontWeight, fontSize: 14,textAlign: 'center'}, textStyle,]}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>;
    },

    render() {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const containerWidth = constant.deviceWidth - 108;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: 60,
            bottom: 5,
            justifyContent: "center",
            alignItems: "center"
        };

        const left = {
            transform: [
                {
                    translateX: this.props.scrollValue.interpolate({
                        inputRange: [0, 1,],
                        outputRange: [0, 60,],
                    })
                }
            ]
        }
        return (
            <View style={{flexDirection: 'row', backgroundColor: '#06c1ae'}}>
                {this._renderButton(this.props.onLeftItem, require('../Image/title_button_search.png'))}
                <ScrollView iosalwaysBounceVertical={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{height: 64, marginLeft: 10, marginRight: 10}}
                            contentContainerStyle={styles.tabs}>
                    {this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        const renderTab = this.props.renderTab || this.renderTab;
                        return renderTab(name, page, isTabActive, this.props.goToPage);
                    })}
                    <Animated.View style={[tabUnderlineStyle, left, this.props.underlineStyle]}>
                        <View style={{height: 2, width: 35, backgroundColor: activeTextColor}}/>
                    </Animated.View>
                </ScrollView>
                {this._renderButton(this.props.onRightItem, require('../Image/title_button_more.png'))}
            </View>
        );
    },
});

const styles = StyleSheet.create({
    tab: {
        width:60,
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        backgroundColor: '#06c1ae',
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});

module.exports = DefaultTabBar;
