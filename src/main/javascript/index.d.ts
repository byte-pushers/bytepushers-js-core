declare module MBytePushers {
    export interface PhoneNumberUtility {
        backSpacerDown(object: Object, event: Event): void;
        backSpacerUp(object: Object, event: Event): void;
    }

    export interface BytePushers {
        PhoneNumberUtility: PhoneNumberUtility;
    }

}

declare const BytePushers: MBytePushers.BytePushers;
export = BytePushers;
