#!/bin/bash -l

sed -i '' 's/\#import \<RCTAnimation\/RCTValueAnimatedNode.h\>/\#import \"RCTValueAnimatedNode.h\"/' ./node_modules/react-native/Libraries/NativeAnimation/RCTNativeAnimatedNodesManager.h 

sed -i '' 's/return \<List {...this.props} \/\>;/return \<List {...this.props} ref={(virtualizedSectionList) =\>{this._virtualizedSectionList = virtualizedSectionList}} \/\>;/' ./node_modules/react-native/Libraries/Lists/SectionList.js

sed -i '' 's/return \<VirtualizedList {...this.state.childProps} \/\>;/return \<VirtualizedList {...this.state.childProps} ref={(virtualizedList) =\>{this._virtualizedList = virtualizedList}} \/\>;/' ./node_modules/react-native/Libraries/Lists/VirtualizedSectionList.js

sed -i '' "s/react\-navigation\/src\/views\/CardStack\'/react\-navigation\/src\/views\/CardStack\/CardStack\'/" ./node_modules/shimo-navigation/src/views/CardStack.js

sed -i '' "s/react\-navigation\/src\/views\/TransitionConfigs\'/react\-navigation\/src\/views\/CardStack\/TransitionConfigs\'/" ./node_modules/shimo-navigation/src/views/CardStack.js

sed -i '' "s/react\-navigation\/src\/views\/Header\'/react\-navigation\/src\/views\/Header\/Header\'/" ./node_modules/shimo-navigation/src/views/Header.js

sed -i '' "s/react\-navigation\/src\/views\/HeaderStyleInterpolator\'/react\-navigation\/src\/views\/Header\/HeaderStyleInterpolator\'/" ./node_modules/shimo-navigation/src/views/Header.js

sed -i '' "s/react\-navigation\/src\/views\/CardStackTransitioner\'/react\-navigation\/src\/views\/CardStack\/CardStackTransitioner\'/" ./node_modules/shimo-navigation/src/views/CardStackTransitioner.js
