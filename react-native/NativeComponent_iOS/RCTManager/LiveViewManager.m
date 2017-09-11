//
//  LiveViewManager.m
//  Pods
//
//  Created by tion126 on 2017/9/2.
//
//

#import "LiveViewManager.h"
#import "IJKLiveView.h"

@interface LiveViewManager()

@property (strong,nonatomic) IJKLiveView  *liveView;
@end

@implementation LiveViewManager

//RCT_EXPORT_MODULE()

RCT_EXTERN void RCTRegisterModule(LiveViewManager*);

+ (void)load {RCTRegisterModule(self);}

+ (NSString *)moduleName{return @"LiveView";}


- (UIView *)view
{
    return self.liveView;
}

RCT_CUSTOM_VIEW_PROPERTY(liveParameter, NSDictionary, LiveViewManager){
    NSDictionary *para = [RCTConvert NSDictionary:json];
    
    self.liveView.URL = para[@"URL"];
    self.liveView.placeHolder = para[@"holder"];
    [self.liveView downloadImage];
    [self.liveView play];
}

RCT_EXPORT_METHOD(livePagePop){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.liveView shutdown];;
    });
}

-(IJKLiveView *)liveView{
    
    if (!_liveView) {
        
        _liveView = [IJKLiveView new];
    }
    return _liveView;
}

- (void)dealloc
{
    [self.liveView shutdown];
}

@end
