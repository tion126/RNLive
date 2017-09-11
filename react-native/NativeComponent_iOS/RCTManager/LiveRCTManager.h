//
//  EFunRCTManager.m
//  EFunShop
//
//  Created by Jaye on 2017/3/14.
//  Copyright © 2017年 软件开发部. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface LiveRCTManager : RCTEventEmitter<RCTBridgeModule>

+ (instancetype)share;

@end
