/**
 * Created by efun on 2017/8/19.
 */
import {TouchableWithoutFeedback,Image} from 'react-native';
import React, { Component } from 'react'

export default class BackItem extends Component {

    render() {

        let image   = this.props.backImage
        let onPress = this.props.onPress

        return(
            <TouchableWithoutFeedback onPress={onPress}>
                <Image
                    source={image ? image : require('../Image/title_button_back.png')}
                    style={{width:22,height:22,marginLeft:9}}/>
            </TouchableWithoutFeedback>
            )

    }
}
