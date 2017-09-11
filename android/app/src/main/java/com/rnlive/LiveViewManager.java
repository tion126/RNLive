package com.rnlive;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.pili.pldroid.player.AVOptions;
import com.pili.pldroid.player.PLMediaPlayer;
import com.pili.pldroid.player.widget.PLVideoView;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by tion126 on 17/9/10.
 */

public class LiveViewManager extends SimpleViewManager implements ReactPackage {

    private PLVideoView mVideoView;
    public static final String REACT_CLASS = "LiveView";

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {

        return Arrays.<ViewManager>asList(new LiveViewManager());
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public PLVideoView createViewInstance(ThemedReactContext context) {

        mVideoView = new PLVideoView(context);

        AVOptions options = new AVOptions();

        mVideoView.setAVOptions(options);
        options.setInteger(AVOptions.KEY_PREPARE_TIMEOUT, 10 * 1000);
        options.setInteger(AVOptions.KEY_MEDIACODEC, 0);
        mVideoView.setDebugLoggingEnabled(true);
        mVideoView.setLooping(false);
        mVideoView.setOnPreparedListener(onPreparedListener);

        return mVideoView;
    }

    @ReactProp(name = "liveParameter")
    public void setliveParameter(PLVideoView view, ReadableMap para) {
        mVideoView.setVideoPath(para.getString("URL"));
    }

    @ReactProp(name = "livePagePop",defaultBoolean = false)
    public void livePagePop(PLVideoView view ,boolean stop) {

        mVideoView.stopPlayback();
    }

    private PLMediaPlayer.OnPreparedListener onPreparedListener = new PLMediaPlayer.OnPreparedListener() {
        @Override
        public void onPrepared(PLMediaPlayer mp, int errorCode) {

            mVideoView.start();
        }
    };
}

