# RNLive

GitHub:https://github.com/tion126/RNLive
简书 :http://www.jianshu.com/p/e2cc066a957d

没错，就是低仿~
![](http://upload-images.jianshu.io/upload_images/1857365-fee6703d58393b35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上几张图先：

![](http://upload-images.jianshu.io/upload_images/1857365-80035958e82bc8e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![这张脸太多就不码了，要是不小心截到哪位老铁的女票我马上删](http://upload-images.jianshu.io/upload_images/1857365-0f59bd2303314965.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](http://upload-images.jianshu.io/upload_images/1857365-d168c423109d9c22.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](http://upload-images.jianshu.io/upload_images/1857365-583357d902a87096.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](http://upload-images.jianshu.io/upload_images/1857365-fa16285ed6603645.gif?imageMogr2/auto-orient/strip)


![](http://upload-images.jianshu.io/upload_images/1857365-89f6a13fbc4338b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

基于0.44.3版本，还算是比较稳定。目前公司的项目也是基于这个版本。
使用的框架有这些
```
"react-native-scrollable-tab-view": "^0.6.7",
"react-native-swiper": "^1.5.10",
"react-redux": "^5.0.6",
"redux": "^3.6.0",
"redux-logger": "^3.0.6",
"redux-thunk": "^2.2.0",
"shimo-navigation": "0.0.12"
```
其他框架大家应该都用过了，最后那个shimo-navigation是对石墨文档公司开源的一个基于react-navigation 的导航系统，还是挺好用的。

这个是react-native 的目录结构
![](http://upload-images.jianshu.io/upload_images/1857365-45a17caa08da6b5f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个是项目的目录结构
![](http://upload-images.jianshu.io/upload_images/1857365-60823d0fa9f49ff9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里说说我个人对RN的看法：
     RN性能说句实话还是和原生有差距，但是性能不是特别敏感的情况下RN还是很犀利的。比如可以代替一些以前用H5实现的页面，还有频繁更新的业务也可以用他来构建，纯RN项目就不太可行了，除非是非常轻量级的APP。so，对于大多数项目还是混合比较好，就比如这个低仿demo，直播页面播放的画面使用原生实现，但是礼物是用RN实现。还有一点，RN在老旧低端机上表现只能说是差强人意，但是老旧机型迟早是会淘汰的，在较新的机型上RN的表现还是比较出色，比如用iPhone7大多数页面我已经感觉不出和原生有啥区别了，而iPhone7也不是新🐔，毕竟明天iPhone8(x edition 7s ?...)就要发布了。

iOS这边是手动建的工程，然后通过cocoapods把RN框架集成到项目中，也算是模拟老项目集成RN了。毕竟现在新项目比较少，大多数老铁都是维护老项目，推翻重写也不太现实。推流用的LFLiveKit  播放用的IJK。Android这边只写了播放，用的是7牛的框架，手头没安卓的设备，推流就没搞了，不过这些去年都被别人写烂了，也没啥好说的了。安卓这边和iOS还有一些区别，模拟器不是很好用就没完善了。

推荐使用WebStorm运行，VSCode也可以。
![](http://upload-images.jianshu.io/upload_images/1857365-d2d66da2e051967b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

运行方式
cd到 react-native目录
```
npm install
```
iOS
因为github传不了100m以上的文件，ijk已经100多m了，需要另外下载
下载解压后放置在图中目录即可
链接: https://pan.baidu.com/s/1miedota 密码: af6i
![](http://upload-images.jianshu.io/upload_images/1857365-7cc7ead29526535f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


工程目录
```
pod install
```

运行
Android
直接运行
![](http://upload-images.jianshu.io/upload_images/1857365-a2c8c0260e5b3e18.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果你喜欢我的项目/或者我的文章可以给我个star！

