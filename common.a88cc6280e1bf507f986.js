(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"1jOq":function(e,n){e.exports=function e(n,r){if(n&&r)return e(n)(r);if("function"!=typeof n)throw new TypeError("need wrapper function");return Object.keys(n).forEach(function(e){t[e]=n[e]}),t;function t(){for(var e=new Array(arguments.length),r=0;r<e.length;r++)e[r]=arguments[r];var t=n.apply(this,e),o=e[e.length-1];return"function"==typeof t&&t!==o&&Object.keys(o).forEach(function(e){t[e]=o[e]}),t}}},"7W2i":function(e,n,r){var t=r("SksO");e.exports=function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&t(e,n)}},FpI4:function(e,n,r){"use strict";var t;r.r(n),r.d(n,"v1",function(){return v}),r.d(n,"v3",function(){return C}),r.d(n,"v4",function(){return D}),r.d(n,"v5",function(){return O}),r.d(n,"NIL",function(){return R}),r.d(n,"version",function(){return U}),r.d(n,"validate",function(){return u}),r.d(n,"stringify",function(){return l}),r.d(n,"parse",function(){return g});var o=new Uint8Array(16);function a(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(o)}for(var i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,u=function(e){return"string"==typeof e&&i.test(e)},c=[],s=0;s<256;++s)c.push((s+256).toString(16).substr(1));var d,f,l=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(c[e[n+0]]+c[e[n+1]]+c[e[n+2]]+c[e[n+3]]+"-"+c[e[n+4]]+c[e[n+5]]+"-"+c[e[n+6]]+c[e[n+7]]+"-"+c[e[n+8]]+c[e[n+9]]+"-"+c[e[n+10]]+c[e[n+11]]+c[e[n+12]]+c[e[n+13]]+c[e[n+14]]+c[e[n+15]]).toLowerCase();if(!u(r))throw TypeError("Stringified UUID is invalid");return r},p=0,h=0,v=function(e,n,r){var t=n&&r||0,o=n||new Array(16),i=(e=e||{}).node||d,u=void 0!==e.clockseq?e.clockseq:f;if(null==i||null==u){var c=e.random||(e.rng||a)();null==i&&(i=d=[1|c[0],c[1],c[2],c[3],c[4],c[5]]),null==u&&(u=f=16383&(c[6]<<8|c[7]))}var s=void 0!==e.msecs?e.msecs:Date.now(),v=void 0!==e.nsecs?e.nsecs:h+1,g=s-p+(v-h)/1e4;if(g<0&&void 0===e.clockseq&&(u=u+1&16383),(g<0||s>p)&&void 0===e.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");p=s,h=v,f=u;var y=(1e4*(268435455&(s+=122192928e5))+v)%4294967296;o[t++]=y>>>24&255,o[t++]=y>>>16&255,o[t++]=y>>>8&255,o[t++]=255&y;var E=s/4294967296*1e4&268435455;o[t++]=E>>>8&255,o[t++]=255&E,o[t++]=E>>>24&15|16,o[t++]=E>>>16&255,o[t++]=u>>>8|128,o[t++]=255&u;for(var A=0;A<6;++A)o[t+A]=i[A];return n||l(o)},g=function(e){if(!u(e))throw TypeError("Invalid UUID");var n,r=new Uint8Array(16);return r[0]=(n=parseInt(e.slice(0,8),16))>>>24,r[1]=n>>>16&255,r[2]=n>>>8&255,r[3]=255&n,r[4]=(n=parseInt(e.slice(9,13),16))>>>8,r[5]=255&n,r[6]=(n=parseInt(e.slice(14,18),16))>>>8,r[7]=255&n,r[8]=(n=parseInt(e.slice(19,23),16))>>>8,r[9]=255&n,r[10]=(n=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=n/4294967296&255,r[12]=n>>>24&255,r[13]=n>>>16&255,r[14]=n>>>8&255,r[15]=255&n,r},y=function(e,n,r){function t(e,t,o,a){if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));for(var n=[],r=0;r<e.length;++r)n.push(e.charCodeAt(r));return n}(e)),"string"==typeof t&&(t=g(t)),16!==t.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var i=new Uint8Array(16+e.length);if(i.set(t),i.set(e,t.length),(i=r(i))[6]=15&i[6]|n,i[8]=63&i[8]|128,o){a=a||0;for(var u=0;u<16;++u)o[a+u]=i[u];return o}return l(i)}try{t.name=e}catch(o){}return t.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",t.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",t};function E(e){return 14+(e+64>>>9<<4)+1}function A(e,n){var r=(65535&e)+(65535&n);return(e>>16)+(n>>16)+(r>>16)<<16|65535&r}function m(e,n,r,t,o,a){return A((i=A(A(n,e),A(t,a)))<<(u=o)|i>>>32-u,r);var i,u}function b(e,n,r,t,o,a,i){return m(n&r|~n&t,e,n,o,a,i)}function I(e,n,r,t,o,a,i){return m(n&t|r&~t,e,n,o,a,i)}function N(e,n,r,t,o,a,i){return m(n^r^t,e,n,o,a,i)}function w(e,n,r,t,o,a,i){return m(r^(n|~t),e,n,o,a,i)}var C=y("v3",48,function(e){if("string"==typeof e){var n=unescape(encodeURIComponent(e));e=new Uint8Array(n.length);for(var r=0;r<n.length;++r)e[r]=n.charCodeAt(r)}return function(e){for(var n=[],r=32*e.length,t="0123456789abcdef",o=0;o<r;o+=8){var a=e[o>>5]>>>o%32&255,i=parseInt(t.charAt(a>>>4&15)+t.charAt(15&a),16);n.push(i)}return n}(function(e,n){e[n>>5]|=128<<n%32,e[E(n)-1]=n;for(var r=1732584193,t=-271733879,o=-1732584194,a=271733878,i=0;i<e.length;i+=16){var u=r,c=t,s=o,d=a;r=b(r,t,o,a,e[i],7,-680876936),a=b(a,r,t,o,e[i+1],12,-389564586),o=b(o,a,r,t,e[i+2],17,606105819),t=b(t,o,a,r,e[i+3],22,-1044525330),r=b(r,t,o,a,e[i+4],7,-176418897),a=b(a,r,t,o,e[i+5],12,1200080426),o=b(o,a,r,t,e[i+6],17,-1473231341),t=b(t,o,a,r,e[i+7],22,-45705983),r=b(r,t,o,a,e[i+8],7,1770035416),a=b(a,r,t,o,e[i+9],12,-1958414417),o=b(o,a,r,t,e[i+10],17,-42063),t=b(t,o,a,r,e[i+11],22,-1990404162),r=b(r,t,o,a,e[i+12],7,1804603682),a=b(a,r,t,o,e[i+13],12,-40341101),o=b(o,a,r,t,e[i+14],17,-1502002290),r=I(r,t=b(t,o,a,r,e[i+15],22,1236535329),o,a,e[i+1],5,-165796510),a=I(a,r,t,o,e[i+6],9,-1069501632),o=I(o,a,r,t,e[i+11],14,643717713),t=I(t,o,a,r,e[i],20,-373897302),r=I(r,t,o,a,e[i+5],5,-701558691),a=I(a,r,t,o,e[i+10],9,38016083),o=I(o,a,r,t,e[i+15],14,-660478335),t=I(t,o,a,r,e[i+4],20,-405537848),r=I(r,t,o,a,e[i+9],5,568446438),a=I(a,r,t,o,e[i+14],9,-1019803690),o=I(o,a,r,t,e[i+3],14,-187363961),t=I(t,o,a,r,e[i+8],20,1163531501),r=I(r,t,o,a,e[i+13],5,-1444681467),a=I(a,r,t,o,e[i+2],9,-51403784),o=I(o,a,r,t,e[i+7],14,1735328473),r=N(r,t=I(t,o,a,r,e[i+12],20,-1926607734),o,a,e[i+5],4,-378558),a=N(a,r,t,o,e[i+8],11,-2022574463),o=N(o,a,r,t,e[i+11],16,1839030562),t=N(t,o,a,r,e[i+14],23,-35309556),r=N(r,t,o,a,e[i+1],4,-1530992060),a=N(a,r,t,o,e[i+4],11,1272893353),o=N(o,a,r,t,e[i+7],16,-155497632),t=N(t,o,a,r,e[i+10],23,-1094730640),r=N(r,t,o,a,e[i+13],4,681279174),a=N(a,r,t,o,e[i],11,-358537222),o=N(o,a,r,t,e[i+3],16,-722521979),t=N(t,o,a,r,e[i+6],23,76029189),r=N(r,t,o,a,e[i+9],4,-640364487),a=N(a,r,t,o,e[i+12],11,-421815835),o=N(o,a,r,t,e[i+15],16,530742520),r=w(r,t=N(t,o,a,r,e[i+2],23,-995338651),o,a,e[i],6,-198630844),a=w(a,r,t,o,e[i+7],10,1126891415),o=w(o,a,r,t,e[i+14],15,-1416354905),t=w(t,o,a,r,e[i+5],21,-57434055),r=w(r,t,o,a,e[i+12],6,1700485571),a=w(a,r,t,o,e[i+3],10,-1894986606),o=w(o,a,r,t,e[i+10],15,-1051523),t=w(t,o,a,r,e[i+1],21,-2054922799),r=w(r,t,o,a,e[i+8],6,1873313359),a=w(a,r,t,o,e[i+15],10,-30611744),o=w(o,a,r,t,e[i+6],15,-1560198380),t=w(t,o,a,r,e[i+13],21,1309151649),r=w(r,t,o,a,e[i+4],6,-145523070),a=w(a,r,t,o,e[i+11],10,-1120210379),o=w(o,a,r,t,e[i+2],15,718787259),t=w(t,o,a,r,e[i+9],21,-343485551),r=A(r,u),t=A(t,c),o=A(o,s),a=A(a,d)}return[r,t,o,a]}(function(e){if(0===e.length)return[];for(var n=8*e.length,r=new Uint32Array(E(n)),t=0;t<n;t+=8)r[t>>5]|=(255&e[t/8])<<t%32;return r}(e),8*e.length))}),D=function(e,n,r){var t=(e=e||{}).random||(e.rng||a)();if(t[6]=15&t[6]|64,t[8]=63&t[8]|128,n){r=r||0;for(var o=0;o<16;++o)n[r+o]=t[o];return n}return l(t)};function T(e,n,r,t){switch(e){case 0:return n&r^~n&t;case 1:return n^r^t;case 2:return n&r^n&t^r&t;case 3:return n^r^t}}function S(e,n){return e<<n|e>>>32-n}var O=y("v5",80,function(e){var n=[1518500249,1859775393,2400959708,3395469782],r=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){var t=unescape(encodeURIComponent(e));e=[];for(var o=0;o<t.length;++o)e.push(t.charCodeAt(o))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);for(var a=Math.ceil((e.length/4+2)/16),i=new Array(a),u=0;u<a;++u){for(var c=new Uint32Array(16),s=0;s<16;++s)c[s]=e[64*u+4*s]<<24|e[64*u+4*s+1]<<16|e[64*u+4*s+2]<<8|e[64*u+4*s+3];i[u]=c}i[a-1][14]=8*(e.length-1)/Math.pow(2,32),i[a-1][14]=Math.floor(i[a-1][14]),i[a-1][15]=8*(e.length-1)&4294967295;for(var d=0;d<a;++d){for(var f=new Uint32Array(80),l=0;l<16;++l)f[l]=i[d][l];for(var p=16;p<80;++p)f[p]=S(f[p-3]^f[p-8]^f[p-14]^f[p-16],1);for(var h=r[0],v=r[1],g=r[2],y=r[3],E=r[4],A=0;A<80;++A){var m=Math.floor(A/20),b=S(h,5)+T(m,v,g,y)+E+n[m]+f[A]>>>0;E=y,y=g,g=S(v,30)>>>0,v=h,h=b}r[0]=r[0]+h>>>0,r[1]=r[1]+v>>>0,r[2]=r[2]+g>>>0,r[3]=r[3]+y>>>0,r[4]=r[4]+E>>>0}return[r[0]>>24&255,r[0]>>16&255,r[0]>>8&255,255&r[0],r[1]>>24&255,r[1]>>16&255,r[1]>>8&255,255&r[1],r[2]>>24&255,r[2]>>16&255,r[2]>>8&255,255&r[2],r[3]>>24&255,r[3]>>16&255,r[3]>>8&255,255&r[3],r[4]>>24&255,r[4]>>16&255,r[4]>>8&255,255&r[4]]}),R="00000000-0000-0000-0000-000000000000",U=function(e){if(!u(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)}},Nsbk:function(e,n){function r(n){return e.exports=r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},r(n)}e.exports=r},PJYZ:function(e,n){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},Q0pZ:function(e,n,r){"use strict";r.d(n,"a",function(){return t});var t='\n\t<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t<path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#1652F0"/>\n\t\t<path fill-rule="evenodd" clip-rule="evenodd" d="M5.45508 20.0006C5.45508 28.0338 11.9673 34.546 20.0006 34.546C28.0338 34.546 34.546 28.0338 34.546 20.0006C34.546 11.9673 28.0338 5.45508 20.0006 5.45508C11.9673 5.45508 5.45508 11.9673 5.45508 20.0006ZM17.3137 15.3145C16.2091 15.3145 15.3137 16.2099 15.3137 17.3145V22.6882C15.3137 23.7928 16.2091 24.6882 17.3137 24.6882H22.6874C23.792 24.6882 24.6874 23.7928 24.6874 22.6882V17.3145C24.6874 16.2099 23.792 15.3145 22.6874 15.3145H17.3137Z" fill="white"/>\n\t</svg>\n'},SksO:function(e,n){function r(n,t){return e.exports=r=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},r(n,t)}e.exports=r},TqRt:function(e,n){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},VmuJ:function(e,n,r){var t=r("1jOq");function o(e){var n=function(){return n.called?n.value:(n.called=!0,n.value=e.apply(this,arguments))};return n.called=!1,n}function a(e){var n=function(){if(n.called)throw new Error(n.onceError);return n.called=!0,n.value=e.apply(this,arguments)};return n.onceError=(e.name||"Function wrapped with `once`")+" shouldn't be called more than once",n.called=!1,n}e.exports=t(o),e.exports.strict=t(a),o.proto=o(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return o(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return a(this)},configurable:!0})})},W8MJ:function(e,n){function r(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}e.exports=function(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}},WkPL:function(e,n){e.exports=function(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}},ZhPi:function(e,n,r){var t=r("WkPL");e.exports=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}},a1gu:function(e,n,r){var t=r("cDf5"),o=r("PJYZ");e.exports=function(e,n){return!n||"object"!==t(n)&&"function"!=typeof n?o(e):n}},cDf5:function(e,n){function r(n){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(n)}e.exports=r},jq2n:function(e,n,r){"use strict";r.r(n),r.d(n,"serializeError",function(){return c}),r.d(n,"deserializeError",function(){return u}),r.d(n,"createCustomErrorClass",function(){return i}),r.d(n,"addCustomErrorDeserializer",function(){return a}),r.d(n,"AccountNameRequiredError",function(){return d}),r.d(n,"AccountNotSupported",function(){return f}),r.d(n,"AmountRequired",function(){return l}),r.d(n,"BluetoothRequired",function(){return p}),r.d(n,"BtcUnmatchedApp",function(){return h}),r.d(n,"CantOpenDevice",function(){return v}),r.d(n,"CashAddrNotSupported",function(){return g}),r.d(n,"CurrencyNotSupported",function(){return y}),r.d(n,"DeviceAppVerifyNotSupported",function(){return E}),r.d(n,"DeviceGenuineSocketEarlyClose",function(){return A}),r.d(n,"DeviceNotGenuineError",function(){return m}),r.d(n,"DeviceOnDashboardExpected",function(){return b}),r.d(n,"DeviceOnDashboardUnexpected",function(){return I}),r.d(n,"DeviceInOSUExpected",function(){return N}),r.d(n,"DeviceHalted",function(){return w}),r.d(n,"DeviceNameInvalid",function(){return C}),r.d(n,"DeviceSocketFail",function(){return D}),r.d(n,"DeviceSocketNoBulkStatus",function(){return T}),r.d(n,"DisconnectedDevice",function(){return S}),r.d(n,"DisconnectedDeviceDuringOperation",function(){return O}),r.d(n,"EnpointConfigError",function(){return R}),r.d(n,"EthAppPleaseEnableContractData",function(){return U}),r.d(n,"FeeEstimationFailed",function(){return _}),r.d(n,"FirmwareNotRecognized",function(){return F}),r.d(n,"HardResetFail",function(){return P}),r.d(n,"InvalidXRPTag",function(){return k}),r.d(n,"InvalidAddress",function(){return M}),r.d(n,"InvalidAddressBecauseDestinationIsAlsoSource",function(){return L}),r.d(n,"LatestMCUInstalledError",function(){return x}),r.d(n,"UnknownMCU",function(){return B}),r.d(n,"LedgerAPIError",function(){return j}),r.d(n,"LedgerAPIErrorWithMessage",function(){return q}),r.d(n,"LedgerAPINotAvailable",function(){return G}),r.d(n,"ManagerAppAlreadyInstalledError",function(){return W}),r.d(n,"ManagerAppRelyOnBTCError",function(){return H}),r.d(n,"ManagerAppDepInstallRequired",function(){return z}),r.d(n,"ManagerAppDepUninstallRequired",function(){return V}),r.d(n,"ManagerDeviceLockedError",function(){return Y}),r.d(n,"ManagerFirmwareNotEnoughSpaceError",function(){return J}),r.d(n,"ManagerNotEnoughSpaceError",function(){return Z}),r.d(n,"ManagerUninstallBTCDep",function(){return X}),r.d(n,"NetworkDown",function(){return K}),r.d(n,"NoAddressesFound",function(){return Q}),r.d(n,"NotEnoughBalance",function(){return $}),r.d(n,"NotEnoughBalanceToDelegate",function(){return ee}),r.d(n,"NotEnoughBalanceInParentAccount",function(){return ne}),r.d(n,"NotEnoughSpendableBalance",function(){return re}),r.d(n,"NotEnoughBalanceBecauseDestinationNotCreated",function(){return te}),r.d(n,"NoAccessToCamera",function(){return oe}),r.d(n,"NotEnoughGas",function(){return ae}),r.d(n,"NotSupportedLegacyAddress",function(){return ie}),r.d(n,"GasLessThanEstimate",function(){return ue}),r.d(n,"PasswordsDontMatchError",function(){return ce}),r.d(n,"PasswordIncorrectError",function(){return se}),r.d(n,"RecommendSubAccountsToEmpty",function(){return de}),r.d(n,"RecommendUndelegation",function(){return fe}),r.d(n,"TimeoutTagged",function(){return le}),r.d(n,"UnexpectedBootloader",function(){return pe}),r.d(n,"MCUNotGenuineToDashboard",function(){return he}),r.d(n,"RecipientRequired",function(){return ve}),r.d(n,"UnavailableTezosOriginatedAccountReceive",function(){return ge}),r.d(n,"UnavailableTezosOriginatedAccountSend",function(){return ye}),r.d(n,"UpdateFetchFileFail",function(){return Ee}),r.d(n,"UpdateIncorrectHash",function(){return Ae}),r.d(n,"UpdateIncorrectSig",function(){return me}),r.d(n,"UpdateYourApp",function(){return be}),r.d(n,"UserRefusedDeviceNameChange",function(){return Ie}),r.d(n,"UserRefusedAddress",function(){return Ne}),r.d(n,"UserRefusedFirmwareUpdate",function(){return we}),r.d(n,"UserRefusedAllowManager",function(){return Ce}),r.d(n,"UserRefusedOnDevice",function(){return De}),r.d(n,"TransportOpenUserCancelled",function(){return Te}),r.d(n,"TransportInterfaceNotAvailable",function(){return Se}),r.d(n,"TransportRaceCondition",function(){return Oe}),r.d(n,"TransportWebUSBGestureRequired",function(){return Re}),r.d(n,"DeviceShouldStayInApp",function(){return Ue}),r.d(n,"WebsocketConnectionError",function(){return _e}),r.d(n,"WebsocketConnectionFailed",function(){return Fe}),r.d(n,"WrongDeviceForAccount",function(){return Pe}),r.d(n,"WrongAppForCurrency",function(){return ke}),r.d(n,"ETHAddressNonEIP",function(){return Me}),r.d(n,"CantScanQRCode",function(){return Le}),r.d(n,"FeeNotLoaded",function(){return xe}),r.d(n,"FeeRequired",function(){return Be}),r.d(n,"FeeTooHigh",function(){return je}),r.d(n,"SyncError",function(){return qe}),r.d(n,"PairingFailed",function(){return Ge}),r.d(n,"GenuineCheckFailed",function(){return We}),r.d(n,"LedgerAPI4xx",function(){return He}),r.d(n,"LedgerAPI5xx",function(){return ze}),r.d(n,"FirmwareOrAppUpdateRequired",function(){return Ve}),r.d(n,"NoDBPathGiven",function(){return Ye}),r.d(n,"DBWrongPassword",function(){return Je}),r.d(n,"DBNotReset",function(){return Ze}),r.d(n,"TransportError",function(){return Xe}),r.d(n,"StatusCodes",function(){return Ke}),r.d(n,"getAltStatusMessage",function(){return Qe}),r.d(n,"TransportStatusError",function(){return $e});var t={},o={},a=function(e,n){o[e]=n},i=function(e){var n=function(n,r){Object.assign(this,r),this.name=e,this.message=n||e,this.stack=(new Error).stack};return n.prototype=new Error,t[e]=n,n},u=function(e){if("object"==typeof e&&e){try{var n=JSON.parse(e.message);n.message&&n.name&&(e=n)}catch(f){}var r=void 0;if("string"==typeof e.name){var a=e.name,c=o[a];if(c)r=c(e);else{var s="Error"===a?Error:t[a];s||(console.warn("deserializing an unknown class '"+a+"'"),s=i(a)),r=Object.create(s.prototype);try{for(var d in e)e.hasOwnProperty(d)&&(r[d]=e[d])}catch(f){}}}else r=new Error(e.message);return!r.stack&&Error.captureStackTrace&&Error.captureStackTrace(r,u),r}return new Error(String(e))},c=function(e){return e?"object"==typeof e?s(e,[]):"function"==typeof e?"[Function: "+(e.name||"anonymous")+"]":e:e};function s(e,n){var r,t,o={};n.push(e);try{for(var a=function(e){var n="function"==typeof Symbol&&Symbol.iterator,r=n&&e[n],t=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&t>=e.length&&(e=void 0),{value:e&&e[t++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}(Object.keys(e)),i=a.next();!i.done;i=a.next()){var u=i.value,c=e[u];"function"!=typeof c&&(o[u]=c&&"object"==typeof c?-1!==n.indexOf(e[u])?"[Circular]":s(e[u],n.slice(0)):c)}}catch(d){r={error:d}}finally{try{i&&!i.done&&(t=a.return)&&t.call(a)}finally{if(r)throw r.error}}return"string"==typeof e.name&&(o.name=e.name),"string"==typeof e.message&&(o.message=e.message),"string"==typeof e.stack&&(o.stack=e.stack),o}var d=i("AccountNameRequired"),f=i("AccountNotSupported"),l=i("AmountRequired"),p=i("BluetoothRequired"),h=i("BtcUnmatchedApp"),v=i("CantOpenDevice"),g=i("CashAddrNotSupported"),y=i("CurrencyNotSupported"),E=i("DeviceAppVerifyNotSupported"),A=i("DeviceGenuineSocketEarlyClose"),m=i("DeviceNotGenuine"),b=i("DeviceOnDashboardExpected"),I=i("DeviceOnDashboardUnexpected"),N=i("DeviceInOSUExpected"),w=i("DeviceHalted"),C=i("DeviceNameInvalid"),D=i("DeviceSocketFail"),T=i("DeviceSocketNoBulkStatus"),S=i("DisconnectedDevice"),O=i("DisconnectedDeviceDuringOperation"),R=i("EnpointConfig"),U=i("EthAppPleaseEnableContractData"),_=i("FeeEstimationFailed"),F=i("FirmwareNotRecognized"),P=i("HardResetFail"),k=i("InvalidXRPTag"),M=i("InvalidAddress"),L=i("InvalidAddressBecauseDestinationIsAlsoSource"),x=i("LatestMCUInstalledError"),B=i("UnknownMCU"),j=i("LedgerAPIError"),q=i("LedgerAPIErrorWithMessage"),G=i("LedgerAPINotAvailable"),W=i("ManagerAppAlreadyInstalled"),H=i("ManagerAppRelyOnBTC"),z=i("ManagerAppDepInstallRequired"),V=i("ManagerAppDepUninstallRequired"),Y=i("ManagerDeviceLocked"),J=i("ManagerFirmwareNotEnoughSpace"),Z=i("ManagerNotEnoughSpace"),X=i("ManagerUninstallBTCDep"),K=i("NetworkDown"),Q=i("NoAddressesFound"),$=i("NotEnoughBalance"),ee=i("NotEnoughBalanceToDelegate"),ne=i("NotEnoughBalanceInParentAccount"),re=i("NotEnoughSpendableBalance"),te=i("NotEnoughBalanceBecauseDestinationNotCreated"),oe=i("NoAccessToCamera"),ae=i("NotEnoughGas"),ie=i("NotSupportedLegacyAddress"),ue=i("GasLessThanEstimate"),ce=i("PasswordsDontMatch"),se=i("PasswordIncorrect"),de=i("RecommendSubAccountsToEmpty"),fe=i("RecommendUndelegation"),le=i("TimeoutTagged"),pe=i("UnexpectedBootloader"),he=i("MCUNotGenuineToDashboard"),ve=i("RecipientRequired"),ge=i("UnavailableTezosOriginatedAccountReceive"),ye=i("UnavailableTezosOriginatedAccountSend"),Ee=i("UpdateFetchFileFail"),Ae=i("UpdateIncorrectHash"),me=i("UpdateIncorrectSig"),be=i("UpdateYourApp"),Ie=i("UserRefusedDeviceNameChange"),Ne=i("UserRefusedAddress"),we=i("UserRefusedFirmwareUpdate"),Ce=i("UserRefusedAllowManager"),De=i("UserRefusedOnDevice"),Te=i("TransportOpenUserCancelled"),Se=i("TransportInterfaceNotAvailable"),Oe=i("TransportRaceCondition"),Re=i("TransportWebUSBGestureRequired"),Ue=i("DeviceShouldStayInApp"),_e=i("WebsocketConnectionError"),Fe=i("WebsocketConnectionFailed"),Pe=i("WrongDeviceForAccount"),ke=i("WrongAppForCurrency"),Me=i("ETHAddressNonEIP"),Le=i("CantScanQRCode"),xe=i("FeeNotLoaded"),Be=i("FeeRequired"),je=i("FeeTooHigh"),qe=i("SyncError"),Ge=i("PairingFailed"),We=i("GenuineCheckFailed"),He=i("LedgerAPI4xx"),ze=i("LedgerAPI5xx"),Ve=i("FirmwareOrAppUpdateRequired"),Ye=i("NoDBPathGiven"),Je=i("DBWrongPassword"),Ze=i("DBNotReset");function Xe(e,n){this.name="TransportError",this.message=e,this.stack=(new Error).stack,this.id=n}Xe.prototype=new Error,a("TransportError",function(e){return new Xe(e.message,e.id)});var Ke={PIN_REMAINING_ATTEMPTS:25536,INCORRECT_LENGTH:26368,MISSING_CRITICAL_PARAMETER:26624,COMMAND_INCOMPATIBLE_FILE_STRUCTURE:27009,SECURITY_STATUS_NOT_SATISFIED:27010,CONDITIONS_OF_USE_NOT_SATISFIED:27013,INCORRECT_DATA:27264,NOT_ENOUGH_MEMORY_SPACE:27268,REFERENCED_DATA_NOT_FOUND:27272,FILE_ALREADY_EXISTS:27273,INCORRECT_P1_P2:27392,INS_NOT_SUPPORTED:27904,CLA_NOT_SUPPORTED:28160,TECHNICAL_PROBLEM:28416,OK:36864,MEMORY_PROBLEM:37440,NO_EF_SELECTED:37888,INVALID_OFFSET:37890,FILE_NOT_FOUND:37892,INCONSISTENT_FILE:37896,ALGORITHM_NOT_SUPPORTED:38020,INVALID_KCV:38021,CODE_NOT_INITIALIZED:38914,ACCESS_CONDITION_NOT_FULFILLED:38916,CONTRADICTION_SECRET_CODE_STATUS:38920,CONTRADICTION_INVALIDATION:38928,CODE_BLOCKED:38976,MAX_VALUE_REACHED:38992,GP_AUTH_FAILED:25344,LICENSING:28482,HALTED:28586};function Qe(e){switch(e){case 26368:return"Incorrect length";case 26624:return"Missing critical parameter";case 27010:return"Security not satisfied (dongle locked or have invalid access rights)";case 27013:return"Condition of use not satisfied (denied by the user?)";case 27264:return"Invalid data received";case 27392:return"Invalid parameter received"}if(28416<=e&&e<=28671)return"Internal error, please report"}function $e(e){this.name="TransportStatusError";var n=Object.keys(Ke).find(function(n){return Ke[n]===e})||"UNKNOWN_ERROR",r=Qe(e)||n,t=e.toString(16);this.message="Ledger device: "+r+" (0x"+t+")",this.stack=(new Error).stack,this.statusCode=e,this.statusText=n}$e.prototype=new Error,a("TransportStatusError",function(e){return new $e(e.statusCode)})},lSNA:function(e,n){e.exports=function(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}},lwsE:function(e,n){e.exports=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}},o0o1:function(e,n,r){e.exports=r("ls82")},vULT:function(e,n,r){"use strict";r.d(n,"a",function(){return a});var t=0,o=[],a=function(e,n,r){var a={type:e,id:String(++t),date:new Date};n&&(a.message=n),r&&(a.data=r),function(e){for(var n=0;n<o.length;n++)try{o[n](e)}catch(r){console.error(r)}}(a)};"undefined"!=typeof window&&(window.__ledgerLogsListen=function(e){return o.push(e),function(){var n=o.indexOf(e);-1!==n&&(o[n]=o[o.length-1],o.pop())}})},yXPU:function(e,n){function r(e,n,r,t,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void r(s)}u.done?n(c):Promise.resolve(c).then(t,o)}e.exports=function(e){return function(){var n=this,t=arguments;return new Promise(function(o,a){var i=e.apply(n,t);function u(e){r(i,o,a,u,c,"next",e)}function c(e){r(i,o,a,u,c,"throw",e)}u(void 0)})}}},zfVJ:function(e,n,r){"use strict";r.d(n,"a",function(){return t}),r.d(n,"b",function(){return o});var t=function(e){var n=e.currentWallet,r=e.selectedWallet;return n?'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    We have detected that you already have\n    <b>'.concat(n,"</b>\n    installed. If you would prefer to use\n    <b>").concat(r,'</b>\n    instead, then click below to install.\n    </p>\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    <b>Tip:</b>\n    If you already have ').concat(r,' installed, check your\n    browser extension settings to make sure that you have it enabled\n    and that you have disabled any other browser extension wallets.\n    <span\n      class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick="window.location.reload();">\n      Then refresh the page.\n    </span>\n    </p>\n    '):'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    You\'ll need to install <b>'.concat(r,'</b> to continue. Once you have it installed, go ahead and\n    <span\n    class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick={window.location.reload();}>\n      refresh the page.\n    </span>\n    ').concat("Opera"===r?'<br><br><i>Hint: If you already have Opera installed, make sure that your web3 wallet is <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://help.opera.com/en/touch/crypto-wallet/" rel="noreferrer noopener" target="_blank">enabled</a></i>':"","\n    </p>\n    ")},o=function(e){var n=e.selectedWallet;return'\n  <p style="font-size: 0.889rem;">\n  Tap the button below to <b>Open '.concat(n,"</b>. Please access this site on ").concat(n,"'s in-app browser for a seamless experience.\n  </p>\n  ")}}}]);