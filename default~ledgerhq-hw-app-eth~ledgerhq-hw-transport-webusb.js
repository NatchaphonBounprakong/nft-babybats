(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~ledgerhq-hw-app-eth~ledgerhq-hw-transport-webusb"],{

/***/ "9npr":
/*!*********************************************************!*\
  !*** ./node_modules/@ledgerhq/errors/lib-es/helpers.js ***!
  \*********************************************************/
/*! exports provided: addCustomErrorDeserializer, createCustomErrorClass, deserializeError, serializeError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCustomErrorDeserializer", function() { return addCustomErrorDeserializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCustomErrorClass", function() { return createCustomErrorClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeError", function() { return deserializeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeError", function() { return serializeError; });
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var errorClasses = {};
var deserializers = {};
var addCustomErrorDeserializer = function (name, deserializer) {
    deserializers[name] = deserializer;
};
var createCustomErrorClass = function (name) {
    var C = function CustomError(message, fields) {
        Object.assign(this, fields);
        this.name = name;
        this.message = message || name;
        this.stack = new Error().stack;
    };
    C.prototype = new Error();
    errorClasses[name] = C;
    return C;
};
// inspired from https://github.com/programble/errio/blob/master/index.js
var deserializeError = function (object) {
    if (typeof object === "object" && object) {
        try {
            // $FlowFixMe FIXME HACK
            var msg = JSON.parse(object.message);
            if (msg.message && msg.name) {
                object = msg;
            }
        }
        catch (e) {
            // nothing
        }
        var error = void 0;
        if (typeof object.name === "string") {
            var name_1 = object.name;
            var des = deserializers[name_1];
            if (des) {
                error = des(object);
            }
            else {
                var constructor = name_1 === "Error" ? Error : errorClasses[name_1];
                if (!constructor) {
                    console.warn("deserializing an unknown class '" + name_1 + "'");
                    constructor = createCustomErrorClass(name_1);
                }
                error = Object.create(constructor.prototype);
                try {
                    for (var prop in object) {
                        if (object.hasOwnProperty(prop)) {
                            error[prop] = object[prop];
                        }
                    }
                }
                catch (e) {
                    // sometimes setting a property can fail (e.g. .name)
                }
            }
        }
        else {
            error = new Error(object.message);
        }
        if (!error.stack && Error.captureStackTrace) {
            Error.captureStackTrace(error, deserializeError);
        }
        return error;
    }
    return new Error(String(object));
};
// inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js
var serializeError = function (value) {
    if (!value)
        return value;
    if (typeof value === "object") {
        return destroyCircular(value, []);
    }
    if (typeof value === "function") {
        return "[Function: " + (value.name || "anonymous") + "]";
    }
    return value;
};
// https://www.npmjs.com/package/destroy-circular
function destroyCircular(from, seen) {
    var e_1, _a;
    var to = {};
    seen.push(from);
    try {
        for (var _b = __values(Object.keys(from)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = from[key];
            if (typeof value === "function") {
                continue;
            }
            if (!value || typeof value !== "object") {
                to[key] = value;
                continue;
            }
            if (seen.indexOf(from[key]) === -1) {
                to[key] = destroyCircular(from[key], seen.slice(0));
                continue;
            }
            to[key] = "[Circular]";
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (typeof from.name === "string") {
        to.name = from.name;
    }
    if (typeof from.message === "string") {
        to.message = from.message;
    }
    if (typeof from.stack === "string") {
        to.stack = from.stack;
    }
    return to;
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "jq2n":
/*!*******************************************************!*\
  !*** ./node_modules/@ledgerhq/errors/lib-es/index.js ***!
  \*******************************************************/
/*! exports provided: serializeError, deserializeError, createCustomErrorClass, addCustomErrorDeserializer, AccountNameRequiredError, AccountNotSupported, AmountRequired, BluetoothRequired, BtcUnmatchedApp, CantOpenDevice, CashAddrNotSupported, CurrencyNotSupported, DeviceAppVerifyNotSupported, DeviceGenuineSocketEarlyClose, DeviceNotGenuineError, DeviceOnDashboardExpected, DeviceOnDashboardUnexpected, DeviceInOSUExpected, DeviceHalted, DeviceNameInvalid, DeviceSocketFail, DeviceSocketNoBulkStatus, DisconnectedDevice, DisconnectedDeviceDuringOperation, EnpointConfigError, EthAppPleaseEnableContractData, FeeEstimationFailed, FirmwareNotRecognized, HardResetFail, InvalidXRPTag, InvalidAddress, InvalidAddressBecauseDestinationIsAlsoSource, LatestMCUInstalledError, UnknownMCU, LedgerAPIError, LedgerAPIErrorWithMessage, LedgerAPINotAvailable, ManagerAppAlreadyInstalledError, ManagerAppRelyOnBTCError, ManagerAppDepInstallRequired, ManagerAppDepUninstallRequired, ManagerDeviceLockedError, ManagerFirmwareNotEnoughSpaceError, ManagerNotEnoughSpaceError, ManagerUninstallBTCDep, NetworkDown, NoAddressesFound, NotEnoughBalance, NotEnoughBalanceToDelegate, NotEnoughBalanceInParentAccount, NotEnoughSpendableBalance, NotEnoughBalanceBecauseDestinationNotCreated, NoAccessToCamera, NotEnoughGas, NotSupportedLegacyAddress, GasLessThanEstimate, PasswordsDontMatchError, PasswordIncorrectError, RecommendSubAccountsToEmpty, RecommendUndelegation, TimeoutTagged, UnexpectedBootloader, MCUNotGenuineToDashboard, RecipientRequired, UnavailableTezosOriginatedAccountReceive, UnavailableTezosOriginatedAccountSend, UpdateFetchFileFail, UpdateIncorrectHash, UpdateIncorrectSig, UpdateYourApp, UserRefusedDeviceNameChange, UserRefusedAddress, UserRefusedFirmwareUpdate, UserRefusedAllowManager, UserRefusedOnDevice, TransportOpenUserCancelled, TransportInterfaceNotAvailable, TransportRaceCondition, TransportWebUSBGestureRequired, DeviceShouldStayInApp, WebsocketConnectionError, WebsocketConnectionFailed, WrongDeviceForAccount, WrongAppForCurrency, ETHAddressNonEIP, CantScanQRCode, FeeNotLoaded, FeeRequired, FeeTooHigh, SyncError, PairingFailed, GenuineCheckFailed, LedgerAPI4xx, LedgerAPI5xx, FirmwareOrAppUpdateRequired, NoDBPathGiven, DBWrongPassword, DBNotReset, TransportError, StatusCodes, getAltStatusMessage, TransportStatusError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountNameRequiredError", function() { return AccountNameRequiredError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountNotSupported", function() { return AccountNotSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AmountRequired", function() { return AmountRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BluetoothRequired", function() { return BluetoothRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BtcUnmatchedApp", function() { return BtcUnmatchedApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CantOpenDevice", function() { return CantOpenDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CashAddrNotSupported", function() { return CashAddrNotSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyNotSupported", function() { return CurrencyNotSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceAppVerifyNotSupported", function() { return DeviceAppVerifyNotSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceGenuineSocketEarlyClose", function() { return DeviceGenuineSocketEarlyClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceNotGenuineError", function() { return DeviceNotGenuineError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceOnDashboardExpected", function() { return DeviceOnDashboardExpected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceOnDashboardUnexpected", function() { return DeviceOnDashboardUnexpected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceInOSUExpected", function() { return DeviceInOSUExpected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceHalted", function() { return DeviceHalted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceNameInvalid", function() { return DeviceNameInvalid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceSocketFail", function() { return DeviceSocketFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceSocketNoBulkStatus", function() { return DeviceSocketNoBulkStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisconnectedDevice", function() { return DisconnectedDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisconnectedDeviceDuringOperation", function() { return DisconnectedDeviceDuringOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnpointConfigError", function() { return EnpointConfigError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EthAppPleaseEnableContractData", function() { return EthAppPleaseEnableContractData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeeEstimationFailed", function() { return FeeEstimationFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirmwareNotRecognized", function() { return FirmwareNotRecognized; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardResetFail", function() { return HardResetFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidXRPTag", function() { return InvalidXRPTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidAddress", function() { return InvalidAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidAddressBecauseDestinationIsAlsoSource", function() { return InvalidAddressBecauseDestinationIsAlsoSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LatestMCUInstalledError", function() { return LatestMCUInstalledError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnknownMCU", function() { return UnknownMCU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LedgerAPIError", function() { return LedgerAPIError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LedgerAPIErrorWithMessage", function() { return LedgerAPIErrorWithMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LedgerAPINotAvailable", function() { return LedgerAPINotAvailable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerAppAlreadyInstalledError", function() { return ManagerAppAlreadyInstalledError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerAppRelyOnBTCError", function() { return ManagerAppRelyOnBTCError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerAppDepInstallRequired", function() { return ManagerAppDepInstallRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerAppDepUninstallRequired", function() { return ManagerAppDepUninstallRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerDeviceLockedError", function() { return ManagerDeviceLockedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerFirmwareNotEnoughSpaceError", function() { return ManagerFirmwareNotEnoughSpaceError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerNotEnoughSpaceError", function() { return ManagerNotEnoughSpaceError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerUninstallBTCDep", function() { return ManagerUninstallBTCDep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkDown", function() { return NetworkDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoAddressesFound", function() { return NoAddressesFound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotEnoughBalance", function() { return NotEnoughBalance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotEnoughBalanceToDelegate", function() { return NotEnoughBalanceToDelegate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotEnoughBalanceInParentAccount", function() { return NotEnoughBalanceInParentAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotEnoughSpendableBalance", function() { return NotEnoughSpendableBalance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotEnoughBalanceBecauseDestinationNotCreated", function() { return NotEnoughBalanceBecauseDestinationNotCreated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoAccessToCamera", function() { return NoAccessToCamera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotEnoughGas", function() { return NotEnoughGas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotSupportedLegacyAddress", function() { return NotSupportedLegacyAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GasLessThanEstimate", function() { return GasLessThanEstimate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordsDontMatchError", function() { return PasswordsDontMatchError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordIncorrectError", function() { return PasswordIncorrectError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecommendSubAccountsToEmpty", function() { return RecommendSubAccountsToEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecommendUndelegation", function() { return RecommendUndelegation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeoutTagged", function() { return TimeoutTagged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnexpectedBootloader", function() { return UnexpectedBootloader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MCUNotGenuineToDashboard", function() { return MCUNotGenuineToDashboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecipientRequired", function() { return RecipientRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnavailableTezosOriginatedAccountReceive", function() { return UnavailableTezosOriginatedAccountReceive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnavailableTezosOriginatedAccountSend", function() { return UnavailableTezosOriginatedAccountSend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateFetchFileFail", function() { return UpdateFetchFileFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateIncorrectHash", function() { return UpdateIncorrectHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateIncorrectSig", function() { return UpdateIncorrectSig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateYourApp", function() { return UpdateYourApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRefusedDeviceNameChange", function() { return UserRefusedDeviceNameChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRefusedAddress", function() { return UserRefusedAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRefusedFirmwareUpdate", function() { return UserRefusedFirmwareUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRefusedAllowManager", function() { return UserRefusedAllowManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRefusedOnDevice", function() { return UserRefusedOnDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportOpenUserCancelled", function() { return TransportOpenUserCancelled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportInterfaceNotAvailable", function() { return TransportInterfaceNotAvailable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportRaceCondition", function() { return TransportRaceCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportWebUSBGestureRequired", function() { return TransportWebUSBGestureRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceShouldStayInApp", function() { return DeviceShouldStayInApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketConnectionError", function() { return WebsocketConnectionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketConnectionFailed", function() { return WebsocketConnectionFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WrongDeviceForAccount", function() { return WrongDeviceForAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WrongAppForCurrency", function() { return WrongAppForCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ETHAddressNonEIP", function() { return ETHAddressNonEIP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CantScanQRCode", function() { return CantScanQRCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeeNotLoaded", function() { return FeeNotLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeeRequired", function() { return FeeRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeeTooHigh", function() { return FeeTooHigh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyncError", function() { return SyncError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PairingFailed", function() { return PairingFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenuineCheckFailed", function() { return GenuineCheckFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LedgerAPI4xx", function() { return LedgerAPI4xx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LedgerAPI5xx", function() { return LedgerAPI5xx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirmwareOrAppUpdateRequired", function() { return FirmwareOrAppUpdateRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoDBPathGiven", function() { return NoDBPathGiven; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DBWrongPassword", function() { return DBWrongPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DBNotReset", function() { return DBNotReset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportError", function() { return TransportError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusCodes", function() { return StatusCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAltStatusMessage", function() { return getAltStatusMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportStatusError", function() { return TransportStatusError; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "9npr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serializeError", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["serializeError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deserializeError", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["deserializeError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createCustomErrorClass", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addCustomErrorDeserializer", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["addCustomErrorDeserializer"]; });



var AccountNameRequiredError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("AccountNameRequired");
var AccountNotSupported = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("AccountNotSupported");
var AmountRequired = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("AmountRequired");
var BluetoothRequired = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("BluetoothRequired");
var BtcUnmatchedApp = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("BtcUnmatchedApp");
var CantOpenDevice = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("CantOpenDevice");
var CashAddrNotSupported = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("CashAddrNotSupported");
var CurrencyNotSupported = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("CurrencyNotSupported");
var DeviceAppVerifyNotSupported = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceAppVerifyNotSupported");
var DeviceGenuineSocketEarlyClose = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceGenuineSocketEarlyClose");
var DeviceNotGenuineError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceNotGenuine");
var DeviceOnDashboardExpected = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceOnDashboardExpected");
var DeviceOnDashboardUnexpected = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceOnDashboardUnexpected");
var DeviceInOSUExpected = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceInOSUExpected");
var DeviceHalted = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceHalted");
var DeviceNameInvalid = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceNameInvalid");
var DeviceSocketFail = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceSocketFail");
var DeviceSocketNoBulkStatus = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceSocketNoBulkStatus");
var DisconnectedDevice = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DisconnectedDevice");
var DisconnectedDeviceDuringOperation = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DisconnectedDeviceDuringOperation");
var EnpointConfigError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("EnpointConfig");
var EthAppPleaseEnableContractData = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("EthAppPleaseEnableContractData");
var FeeEstimationFailed = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("FeeEstimationFailed");
var FirmwareNotRecognized = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("FirmwareNotRecognized");
var HardResetFail = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("HardResetFail");
var InvalidXRPTag = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("InvalidXRPTag");
var InvalidAddress = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("InvalidAddress");
var InvalidAddressBecauseDestinationIsAlsoSource = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("InvalidAddressBecauseDestinationIsAlsoSource");
var LatestMCUInstalledError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("LatestMCUInstalledError");
var UnknownMCU = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UnknownMCU");
var LedgerAPIError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("LedgerAPIError");
var LedgerAPIErrorWithMessage = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("LedgerAPIErrorWithMessage");
var LedgerAPINotAvailable = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("LedgerAPINotAvailable");
var ManagerAppAlreadyInstalledError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ManagerAppAlreadyInstalled");
var ManagerAppRelyOnBTCError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ManagerAppRelyOnBTC");
var ManagerAppDepInstallRequired = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ManagerAppDepInstallRequired");
var ManagerAppDepUninstallRequired = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ManagerAppDepUninstallRequired");
var ManagerDeviceLockedError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ManagerDeviceLocked");
var ManagerFirmwareNotEnoughSpaceError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ManagerFirmwareNotEnoughSpace");
var ManagerNotEnoughSpaceError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ManagerNotEnoughSpace");
var ManagerUninstallBTCDep = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ManagerUninstallBTCDep");
var NetworkDown = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NetworkDown");
var NoAddressesFound = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NoAddressesFound");
var NotEnoughBalance = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NotEnoughBalance");
var NotEnoughBalanceToDelegate = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NotEnoughBalanceToDelegate");
var NotEnoughBalanceInParentAccount = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NotEnoughBalanceInParentAccount");
var NotEnoughSpendableBalance = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NotEnoughSpendableBalance");
var NotEnoughBalanceBecauseDestinationNotCreated = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NotEnoughBalanceBecauseDestinationNotCreated");
var NoAccessToCamera = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NoAccessToCamera");
var NotEnoughGas = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NotEnoughGas");
var NotSupportedLegacyAddress = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NotSupportedLegacyAddress");
var GasLessThanEstimate = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("GasLessThanEstimate");
var PasswordsDontMatchError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("PasswordsDontMatch");
var PasswordIncorrectError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("PasswordIncorrect");
var RecommendSubAccountsToEmpty = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("RecommendSubAccountsToEmpty");
var RecommendUndelegation = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("RecommendUndelegation");
var TimeoutTagged = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("TimeoutTagged");
var UnexpectedBootloader = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UnexpectedBootloader");
var MCUNotGenuineToDashboard = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("MCUNotGenuineToDashboard");
var RecipientRequired = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("RecipientRequired");
var UnavailableTezosOriginatedAccountReceive = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UnavailableTezosOriginatedAccountReceive");
var UnavailableTezosOriginatedAccountSend = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UnavailableTezosOriginatedAccountSend");
var UpdateFetchFileFail = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UpdateFetchFileFail");
var UpdateIncorrectHash = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UpdateIncorrectHash");
var UpdateIncorrectSig = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UpdateIncorrectSig");
var UpdateYourApp = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UpdateYourApp");
var UserRefusedDeviceNameChange = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UserRefusedDeviceNameChange");
var UserRefusedAddress = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UserRefusedAddress");
var UserRefusedFirmwareUpdate = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UserRefusedFirmwareUpdate");
var UserRefusedAllowManager = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UserRefusedAllowManager");
var UserRefusedOnDevice = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
var TransportOpenUserCancelled = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("TransportOpenUserCancelled");
var TransportInterfaceNotAvailable = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("TransportInterfaceNotAvailable");
var TransportRaceCondition = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("TransportRaceCondition");
var TransportWebUSBGestureRequired = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("TransportWebUSBGestureRequired");
var DeviceShouldStayInApp = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DeviceShouldStayInApp");
var WebsocketConnectionError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("WebsocketConnectionError");
var WebsocketConnectionFailed = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("WebsocketConnectionFailed");
var WrongDeviceForAccount = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("WrongDeviceForAccount");
var WrongAppForCurrency = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("WrongAppForCurrency");
var ETHAddressNonEIP = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("ETHAddressNonEIP");
var CantScanQRCode = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("CantScanQRCode");
var FeeNotLoaded = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("FeeNotLoaded");
var FeeRequired = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("FeeRequired");
var FeeTooHigh = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("FeeTooHigh");
var SyncError = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("SyncError");
var PairingFailed = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("PairingFailed");
var GenuineCheckFailed = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("GenuineCheckFailed");
var LedgerAPI4xx = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("LedgerAPI4xx");
var LedgerAPI5xx = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("LedgerAPI5xx");
var FirmwareOrAppUpdateRequired = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("FirmwareOrAppUpdateRequired");
// db stuff, no need to translate
var NoDBPathGiven = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("NoDBPathGiven");
var DBWrongPassword = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DBWrongPassword");
var DBNotReset = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createCustomErrorClass"])("DBNotReset");
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
function TransportError(message, id) {
    this.name = "TransportError";
    this.message = message;
    this.stack = new Error().stack;
    this.id = id;
}
TransportError.prototype = new Error();
Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addCustomErrorDeserializer"])("TransportError", function (e) { return new TransportError(e.message, e.id); });
var StatusCodes = {
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    INCORRECT_LENGTH: 0x6700,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    INCORRECT_DATA: 0x6a80,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    FILE_ALREADY_EXISTS: 0x6a89,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    CLA_NOT_SUPPORTED: 0x6e00,
    TECHNICAL_PROBLEM: 0x6f00,
    OK: 0x9000,
    MEMORY_PROBLEM: 0x9240,
    NO_EF_SELECTED: 0x9400,
    INVALID_OFFSET: 0x9402,
    FILE_NOT_FOUND: 0x9404,
    INCONSISTENT_FILE: 0x9408,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    INVALID_KCV: 0x9485,
    CODE_NOT_INITIALIZED: 0x9802,
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    CONTRADICTION_INVALIDATION: 0x9810,
    CODE_BLOCKED: 0x9840,
    MAX_VALUE_REACHED: 0x9850,
    GP_AUTH_FAILED: 0x6300,
    LICENSING: 0x6f42,
    HALTED: 0x6faa
};
function getAltStatusMessage(code) {
    switch (code) {
        // improve text of most common errors
        case 0x6700:
            return "Incorrect length";
        case 0x6800:
            return "Missing critical parameter";
        case 0x6982:
            return "Security not satisfied (dongle locked or have invalid access rights)";
        case 0x6985:
            return "Condition of use not satisfied (denied by the user?)";
        case 0x6a80:
            return "Invalid data received";
        case 0x6b00:
            return "Invalid parameter received";
    }
    if (0x6f00 <= code && code <= 0x6fff) {
        return "Internal error, please report";
    }
}
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
function TransportStatusError(statusCode) {
    this.name = "TransportStatusError";
    var statusText = Object.keys(StatusCodes).find(function (k) { return StatusCodes[k] === statusCode; }) ||
        "UNKNOWN_ERROR";
    var smsg = getAltStatusMessage(statusCode) || statusText;
    var statusCodeStr = statusCode.toString(16);
    this.message = "Ledger device: " + smsg + " (0x" + statusCodeStr + ")";
    this.stack = new Error().stack;
    this.statusCode = statusCode;
    this.statusText = statusText;
}
TransportStatusError.prototype = new Error();
Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addCustomErrorDeserializer"])("TransportStatusError", function (e) { return new TransportStatusError(e.statusCode); });
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "vULT":
/*!*****************************************************!*\
  !*** ./node_modules/@ledgerhq/logs/lib-es/index.js ***!
  \*****************************************************/
/*! exports provided: log, listen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return listen; });
var id = 0;
var subscribers = [];
/**
 * log something
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
var log = function (type, message, data) {
    var obj = {
        type: type,
        id: String(++id),
        date: new Date()
    };
    if (message)
        obj.message = message;
    if (data)
        obj.data = data;
    dispatch(obj);
};
/**
 * listen to logs.
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
var listen = function (cb) {
    subscribers.push(cb);
    return function () {
        var i = subscribers.indexOf(cb);
        if (i !== -1) {
            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
            subscribers[i] = subscribers[subscribers.length - 1];
            subscribers.pop();
        }
    };
};
function dispatch(log) {
    for (var i = 0; i < subscribers.length; i++) {
        try {
            subscribers[i](log);
        }
        catch (e) {
            console.error(e);
        }
    }
}
if (typeof window !== "undefined") {
    window.__ledgerLogsListen = listen;
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=default~ledgerhq-hw-app-eth~ledgerhq-hw-transport-webusb.js.map