import DeviceCheck
import Foundation
import React

@objc(PushwaveAttestation)
class PushwaveAttestation: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func getDeviceCheckToken(
    _ nonce: NSString,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard DCDevice.current.isSupported else {
      resolve(NSNull())
      return
    }

    DCDevice.current.generateToken { data, error in
      if let error = error {
        reject("DEVICE_CHECK_ERROR", error.localizedDescription, error)
        return
      }

      guard let tokenData = data else {
        resolve(NSNull())
        return
      }

      resolve(tokenData.base64EncodedString())
    }
  }
}
