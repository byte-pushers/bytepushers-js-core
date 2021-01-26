declare module MBytePushers {
    export interface PhoneNumberUtility {
        backSpacerDown(object: Object): void;
        backSpacerUp(object: Object, event: Event): void;
        formatPhoneNumber(object: Object): void;
    }

    export interface BytePushers {
        PhoneNumberUtility: PhoneNumberUtility;
    }

}

declare const BytePushers: MBytePushers.BytePushers;
export = BytePushers;
