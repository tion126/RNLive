//
//  IJKLiveView.h
//  Pods
//
//  Created by tion126 on 17/9/5.
//
//

#import <UIKit/UIKit.h>

@interface IJKLiveView : UIView
@property (nonatomic, strong) UIImageView *placeHolderImgView;
@property (nonatomic, copy )  NSString    *URL;
@property (nonatomic, copy )  NSString    *placeHolder;
- (void)play;
- (void)shutdown;
- (void)downloadImage;
@end
