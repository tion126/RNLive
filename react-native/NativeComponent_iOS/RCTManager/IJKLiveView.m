//
//  IJKLiveView.m
//  Pods
//
//  Created by tion126 on 17/9/5.
//
//

#import "IJKLiveView.h"
#import <IJKMediaFramework/IJKMediaFramework.h>

#define ScreenWidth [UIScreen mainScreen].bounds.size.width
#define ScreenHeight [UIScreen mainScreen].bounds.size.height

@interface IJKLiveView()
/** 直播播放器*/
@property (nonatomic, strong) IJKFFMoviePlayerController *moviePlayer;
/** 播放器属性*/
@property (nonatomic, strong) IJKFFOptions *options;
@end

@implementation IJKLiveView

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.frame = CGRectMake(0, 0, ScreenWidth, ScreenHeight);
        [self addSubview:self.placeHolderImgView];
    }
    return self;
}

- (IJKFFMoviePlayerController *)moviePlayer {
    
    if (!_moviePlayer) {
        IJKFFMoviePlayerController *moviePlayer = [[IJKFFMoviePlayerController alloc] initWithContentURLString:self.URL withOptions:self.options];
        // 填充fill
        moviePlayer.scalingMode = IJKMPMovieScalingModeAspectFill;
        // 设置自动播放(必须设置为NO, 防止自动播放, 才能更好的控制直播的状态)
        moviePlayer.shouldAutoplay = NO;
        // 默认不显示
        moviePlayer.shouldShowHudView = NO;
        [moviePlayer prepareToPlay];
        
        moviePlayer.view.frame = CGRectMake(0, 0, ScreenWidth, ScreenHeight);
        moviePlayer.view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        
        _moviePlayer = moviePlayer;
    }
    return _moviePlayer;
}

- (IJKFFOptions *)options {
    if (!_options) {
        IJKFFOptions *options = [IJKFFOptions optionsByDefault];
        [options setPlayerOptionIntValue:1  forKey:@"videotoolbox"];
        // 帧速率(fps) 非标准桢率会导致音画不同步，所以只能设定为15或者29.97
        [options setPlayerOptionIntValue:29.97 forKey:@"r"];
        // 置音量大小，256为标准  要设置成两倍音量时则输入512，依此类推
        [options setPlayerOptionIntValue:256 forKey:@"vol"];
        _options = options;
    }
    return _options;
}

-(UIImageView *)placeHolderImgView{
    if (!_placeHolderImgView) {
        
        _placeHolderImgView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, ScreenWidth, ScreenHeight)];
        _placeHolderImgView.contentMode = UIViewContentModeScaleAspectFill;
        _placeHolderImgView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _placeHolderImgView.clipsToBounds = YES;
        
        UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
        UIVisualEffectView *effectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
        effectView.frame = CGRectMake(0, 0, ScreenWidth, ScreenHeight);
        //        effectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        
        [_placeHolderImgView addSubview:effectView];
    }
    return _placeHolderImgView;
}

- (void)play{
    
    if (_moviePlayer) {
        
        [self shutdown];
    }
    
    [self addSubview:self.moviePlayer.view];
    [self bringSubviewToFront:self.placeHolderImgView];
    self.placeHolderImgView.frame = CGRectMake(0, 0, ScreenWidth, ScreenHeight);
    
    //添加监听
    [self addObserveForMoviePlayer];
    
}


- (void)shutdown{
    
    [_moviePlayer shutdown];
    [_moviePlayer.view removeFromSuperview];
    _moviePlayer = nil;
    [self removeMovieNotificationObservers];
}

- (void)downloadImage{
    
    NSURL *url = [NSURL URLWithString:self.placeHolder];
    NSURLRequest *reque = [NSURLRequest requestWithURL:url];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration ephemeralSessionConfiguration]];
    
    __weak typeof(self) weakSelf = self;
    NSURLSessionDownloadTask *task = [session downloadTaskWithRequest:reque completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            
            weakSelf.placeHolderImgView.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:location]];
        });
    }];
    
    [task resume];
}

#pragma mark - Notification
- (void)addObserveForMoviePlayer {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(loadStateDidChange:)
                                                 name:IJKMPMoviePlayerLoadStateDidChangeNotification
                                               object:nil];
}


- (void)removeMovieNotificationObservers {
    
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)loadStateDidChange:(NSNotification*)notification {
    IJKMPMovieLoadState loadState = _moviePlayer.loadState;
    
    if ((loadState & IJKMPMovieLoadStatePlaythroughOK) != 0) { //shouldAutoplay 为yes 在这种状态下会自动开始播放
        if (!self.moviePlayer.isPlaying) {
            [self.moviePlayer play];
            [self bringSubviewToFront:self.moviePlayer.view];
        }
    }else if ((loadState & IJKMPMovieLoadStateStalled) != 0) { //如果正在播放,会在此状态下暂停
        NSLog(@"loadStateDidChange: IJKMPMovieLoadStateStalled: %d\n", (int)loadState);
    } else {
        NSLog(@"loadStateDidChange: ???: %d\n", (int)loadState);
    }
}

-(void)dealloc{
    
    [self removeMovieNotificationObservers];
}

@end
