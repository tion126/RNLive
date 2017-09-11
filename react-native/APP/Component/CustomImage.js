
import {
    Image,
} from 'react-native'

const resolveAssetSource = require('resolveAssetSource');

import constant from '../Utils/Constant'

export default class CustomImage extends Image {

    viewConfig = Object.assign({} , this.viewConfig, {
        validAttributes: Object.assign(
            {},
            this.viewConfig.validAttributes,
            {[constant.iOS ? 'source' : 'src']: true})
    });

    constructor() {
        super();
        this.setNativeProps = (props = {}) => {

            if (props.source) {
                const source = resolveAssetSource(props.source);
                let sourceAttr = constant.iOS ? 'source' : 'src';
                let sources;
                if (Array.isArray(source)) {
                    sources = source;
                } else {
                    sources = [source];
                }
                Object.assign(props, {[sourceAttr]: sources});
            }

            return super.setNativeProps(props);
        }
    }
}
