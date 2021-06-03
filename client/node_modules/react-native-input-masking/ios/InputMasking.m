//
//  SimpleInputManager.m
//  inputMasking
//
//  Created by Macbook on 01/04/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTLog.h>
#import <React/RCTBridgeModule.h>



@interface RCT_EXTERN_MODULE(InputMasking, RCTViewManager)


RCT_EXTERN_METHOD(focus:(nonnull NSNumber *)node)
//RCT_EXTERN_METHOD(updateValueViaManager:(nonnull NSNumber *)node)


RCT_EXTERN_METHOD(
  updateFromManager:(nonnull NSNumber *)node
  count:(nonnull NSNumber *)count
)


RCT_EXPORT_VIEW_PROPERTY(value, NSString )
RCT_EXPORT_VIEW_PROPERTY(textSize, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(_textColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(disabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(_placeholder, NSString)
RCT_EXPORT_VIEW_PROPERTY(placeholderTextColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(maskFormat, NSString)
RCT_EXPORT_VIEW_PROPERTY(textAlign, NSString )
RCT_EXPORT_VIEW_PROPERTY(_keyboardType, NSString )
RCT_EXPORT_VIEW_PROPERTY(_returnKeyType, NSString )
RCT_EXPORT_VIEW_PROPERTY(onChangeText, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFocusText, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onErrorForMasking, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSubmitText, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(fontType, NSString)

@end

