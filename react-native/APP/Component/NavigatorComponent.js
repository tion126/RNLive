import React from 'react'
import {StyleSheet} from 'react-native';
import {StackNavigator, addNavigationHelpers, TabNavigator} from 'shimo-navigation';
import {connect} from 'react-redux'
import Home from '../Page/Home.js'
import Profile from '../Page/Me'
import MainWebView from '../Page/MainWebView'
import BackItem from './BackItem'
import LivePage from '../Page/LivePage'
import AdvertisementPage from '../Page/AdvertisementPage'
import CustomTabs from './CustomTabs'
import NearPage from '../Page/Near'
import FollowingPage from '../Page/Following'

const tabNavigator = new TabNavigator({
        Home: {
            screen: Home,
        },

        Near: {
            screen: NearPage,
        },

        Launch: {
            screen: AdvertisementPage,
        },

        Following: {
            screen: FollowingPage,
        },

        Me: {
            screen: Profile,
        }

    },

    {
        tabBarComponent:CustomTabs,
        animationEnabled: false,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        lazy: true,
    }
);


export const MainNavigator = new StackNavigator({

        MainHome: {
            screen: tabNavigator,

            navigationOptions: {
                headerBackTitle: null,
                headerTitleStyle: {color: '#fff'},
                headerStyle: {backgroundColor: '#1BD1BC'},
            }
        },
        MainWebView: {

            screen: MainWebView,
            navigationOptions: ({navigation, goBack}) => ({
                headerTitleStyle: {color: '#fff'},
                headerBackTitle: null,
                headerStyle: {backgroundColor: '#1BD1BC'},
                headerLeft: <BackItem onPress={() => navigation.goBack(null)}/>,
            })
        },

        LivePage: {
            screen: LivePage,
        },

    },

    {
        headerMode: 'screen'
    }
);

const MainWithNavigationState = ({dispatch, Navigation}) => (
    <MainNavigator navigation={addNavigationHelpers({dispatch, state: Navigation})}/>
);


export default connect((state) => {
    return {
        Navigation: state.Navigation
    }
})(MainWithNavigationState);