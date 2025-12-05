#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PushwaveAttestation, NSObject)

RCT_EXTERN_METHOD(
  getDeviceCheckToken:(NSString *)nonce
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

@end
