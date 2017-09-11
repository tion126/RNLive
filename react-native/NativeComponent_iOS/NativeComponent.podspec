Pod::Spec.new do |s|

s.name         = "NativeComponent"

s.version      = "0.0.1"

s.summary      = "NativeComponent"

s.description  = <<-DESC

NativeComponent

DESC

s.homepage     = "https://github.com/tion126"

s.license      = "MIT"

s.author       = { "tion126" => "tion126@126.com" }

s.platform     = :ios, "8.0"

s.source       = {:svn => ""}

s.subspec 'RCTManager' do |ss|
    ss.source_files   = "RCTManager/*.{h,m,c}"
end

s.subspec 'LFLiveKit' do |ss|
    ss.source_files   = "LFLiveKit/**/*.{h,m,mm,cpp,c}"
    ss.public_header_files = ['LFLiveKit/*.h', 'LFLiveKit/objects/*.h', 'LFLiveKit/configuration/*.h']
    ss.frameworks = "VideoToolbox", "AudioToolbox","AVFoundation","Foundation","UIKit"
    ss.libraries = "c++", "z"
    ss.resources  =  "LFLiveKit/*.{bundle}"
end

s.subspec 'ijkplayer' do |ss|
	ss.vendored_frameworks = 'ijkplayer/IJKMediaFramework.framework'
    ss.frameworks = "QuartzCore","OpenGLES","VideoToolbox", "AudioToolbox","AVFoundation","Foundation","UIKit","CoreGraphics","CoreMedia","CoreVideo","MediaPlayer","MobileCoreServices"
    ss.libraries = "bz2", "z"
end

end