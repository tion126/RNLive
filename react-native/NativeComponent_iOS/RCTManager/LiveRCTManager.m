//
//  EFunRCTManager.m
//  EFunShop
//
//  Created by Jaye on 2017/3/14.
//  Copyright © 2017年 软件开发部. All rights reserved.
//

#import "LiveRCTManager.h"
#import "LFLiveViewController.h"

static LiveRCTManager *_manager;

@interface LiveRCTManager()

@end

@implementation LiveRCTManager

+ (instancetype)allocWithZone:(struct _NSZone *)zone{
    static dispatch_once_t predicate;
    dispatch_once(&predicate, ^{
        _manager = [super allocWithZone:zone];
    });
    return _manager;
}

+ (instancetype)share {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _manager = [[self alloc]init];
    });
    return _manager;
}

- (id)copyWithZone:(NSZone *)zone {
    return _manager;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(presentLFLiveViewController){
    
    dispatch_async(dispatch_get_main_queue(), ^{
       
        LFLiveViewController *liveVC = [LFLiveViewController new];
        UIViewController *rootVC     = [UIApplication sharedApplication].keyWindow.rootViewController;
        [rootVC presentViewController:liveVC animated:YES completion:nil];
    });
    
}

- (NSArray<NSString *> *)supportedEvents{
    return @[];
}

@end
