declare module MBytePushers {
    export interface PhoneNumberUtility {
        backSpacerDown(object:Object, event: Event):void;
        backSpacerUp(object:Object, event: Event):void;
    }
}

declare const BytePushersPhoneNumberUtility: MBytePushers.PhoneNumberUtility;
export = BytePushersPhoneNumberUtility;

