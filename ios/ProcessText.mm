#import "ProcessText.h"

@implementation ProcessText
RCT_EXPORT_MODULE()

// Stub: always return false
- (BOOL)isProcessTextIntentEnabled
{
  return NO;
}

// Stub: no-op
- (void)setProcessTextIntentEnabled:(BOOL)enabled
{
  // no-op
}

// Stub: always return empty string
- (NSString *)getProcessTextIntent:(NSString *)text
{
  return @"";
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeProcessTextSpecJSI>(params);
}

@end
