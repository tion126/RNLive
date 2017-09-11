//
//  ViewController.m
//  LFLiveKitDemo
//
//  Created by admin on 16/8/30.
//  Copyright © 2016年 admin. All rights reserved.
//

#import "LFLiveViewController.h"
#import "LFLivePreview.h"
#import "UIControl+YYAdd.h"
#import "UIView+YYAdd.h"

@interface LFLiveViewController ()

@end

@implementation LFLiveViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = UIColor.whiteColor;
    
    LFLivePreview *liveView = [[LFLivePreview alloc] initWithFrame:self.view.bounds];
    
     [self.view addSubview:liveView];
    
    __weak typeof(self) weakSelf = self;
    [liveView.closeButton addBlockForControlEvents:UIControlEventTouchUpInside block:^(id sender) {
        
        [weakSelf dismissViewControllerAnimated:YES completion:nil];
    }];
}

//- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
//    return UIInterfaceOrientationLandscapeLeft;
//}
//
//- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation {
//    return YES;
//}

@end
