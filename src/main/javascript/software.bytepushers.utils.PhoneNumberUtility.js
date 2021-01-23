/*global BytePushers*/
(function (BytePushers) {
    'use strict';


    // main.js
    /*
        This script is based on the javascript code of Roman Feldblum (web.developer@programmer.net)
        Original script : http://javascript.internet.com/forms/format-phone-number.html
        Original script is revised by Eralper Yilmaz (http://www.eralper.com)
        Revised script : http://www.kodyaz.com
    */

    var zChar = [' ', '(', ')', '-', '.'];
    var maxphonelength = 13;
    var phonevalue1;
    var phonevalue2;
    var cursorposition;

    function doPhoneNumberFormat(phoneNumber, specialCharacters) {
        var phoneNumberArray = phoneNumber.replace(/\D/g,'').split("");
        var formatPhoneNumber;

        if (phoneNumberArray.length == 10) {
            formatPhoneNumber = "(" + phoneNumberArray[0] + phoneNumberArray[1] + phoneNumberArray[2] + ") " + phoneNumberArray[3] + phoneNumberArray[4] + phoneNumberArray[5] + "-" + phoneNumberArray[6] + phoneNumberArray[7] + phoneNumberArray[8] + phoneNumberArray[9];
        }

        return formatPhoneNumber;
    }

    function parseChar(sStr, sChar) {
        var sNewStr;
        var i = 0;
        var iStart;
        var iEnd;
        var zChar;

        if (sChar.length === null) {
            zChar = [sChar];
        } else {
            zChar = sChar;
        }

        while (i < zChar.length) {
            sNewStr = "";

            iStart = 0;
            iEnd = sStr.indexOf(sChar[i]);

            while (iEnd !== -1) {
                sNewStr += sStr.substring(iStart, iEnd);
                iStart = iEnd + 1;
                iEnd = sStr.indexOf(sChar[i], iStart);
            }
            sNewStr += sStr.substring(sStr.lastIndexOf(sChar[i]) + 1, sStr.length);

            sStr = sNewStr;
            i = i + 1;
        }

        return sNewStr;
    }

    function parseForNumber1(object) {
        return parseChar(object.value, zChar);
    }

    function formatPhoneNumber(object) {
        return doPhoneNumberFormat(object.value, zChar);
    }

    function getCursorPosition() {
        var t1 = phonevalue1;
        var t2 = phonevalue2;
        var bool = false;
        var i = 0;

        while (i < t1.length) {
            if (t1.substring(i, 1) !== t2.substring(i, 1)) {
                if (!bool) {
                    cursorposition = i;
                    bool = true;
                }
            }

            i = i + 1;
        }
    }

    function validatePhone(phoneNumber, object) {
        var p = phoneNumber;
        var pp;
        var l30;
        var p30;
        var p31;

        p = p.replace(/[^\d]*/gi, "");

        if (p.length < 3) {
            object.value = p;
        } else if (p.length === 3) {
            pp = p;
            var d4 = p.indexOf('(');
            var d5 = p.indexOf(')');
            if (d4 === -1) {
                pp = "(" + pp;
            }
            if (d5 === -1) {
                pp = pp + ")";
            }
            object.value = pp;
        } else if (p.length > 3 && p.length < 7) {
            p = "(" + p;
            l30 = p.length;
            p30 = p.substring(0, 4);
            p30 = p30 + ")";

            p31 = p.substring(4, l30);
            pp = p30 + p31;

            object.value = pp;

        } else if (p.length >= 7) {
            p = "(" + p;
            l30 = p.length;
            p30 = p.substring(0, 4);
            p30 = p30 + ")";

            p31 = p.substring(4, l30);
            pp = p30 + p31;

            var l40 = pp.length;
            var p40 = pp.substring(0, 8);
            p40 = p40 + "-";

            var p41 = pp.substring(8, l40);
            var ppp = p40 + p41;

            object.value = ppp.substring(0, maxphonelength);
        }

        getCursorPosition();

        if (cursorposition >= 0) {
            if (cursorposition === 0) {
                cursorposition = 2;
            } else if (cursorposition <= 2) {
                cursorposition = cursorposition + 1;
            } else if (cursorposition <= 5) {
                cursorposition = cursorposition + 2;
            } else if (cursorposition === 6) {
                cursorposition = cursorposition + 2;
            } else if (cursorposition === 7) {
                cursorposition = cursorposition + 4;
                var e1 = object.value.indexOf(')');
                var e2 = object.value.indexOf('-');
                if (e1 > -1 && e2 > -1) {
                    if (e2 - e1 === 4) {
                        cursorposition = cursorposition - 1;
                    }
                }
            } else if (cursorposition < 11) {
                cursorposition = cursorposition + 3;
            } else if (cursorposition === 11) {
                cursorposition = cursorposition + 1;
            } else if (cursorposition >= 12) {
                cursorposition = cursorposition;
            }

            var txtRange = object.createTextRange();
            txtRange.moveStart("character", cursorposition);
            txtRange.moveEnd("character", cursorposition - object.value.length);
            txtRange.select();
        }

    }

    function backSpacerUp(object, e) {
        var keycode;
        var phoneNumber;

        if (e) {
            e = e;
        } else {
            e = window.event;
        }
        if (e.which) {
            keycode = e.which;
        } else {
            keycode = e.keyCode;
        }

        phoneNumber = parseForNumber1(object);

        if (keycode >= 48) {
            validatePhone(phoneNumber, object);
        }
    }

    function backSpacerDown(object) {
        return {value: formatPhoneNumber(object)};
    }

    BytePushers = BytePushers || {};
    BytePushers.PhoneNumberUtility = BytePushers.namespace("software.bytepushers.utils.PhoneNumberUtility");
    BytePushers.PhoneNumberUtility.backSpacerDown = function backSpacerDownFunc(object) {
        return backSpacerDown(object);
    };
    BytePushers.PhoneNumberUtility.backSpacerUp = function backSpacerUpFunc(object, e) {
        return backSpacerUp(object, e);
    };
}(BytePushers));

