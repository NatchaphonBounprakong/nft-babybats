(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~ensdomains-ensjs~eth-lattice-keyring~ledgerhq-hw-app-eth"],{

/***/ "/m0q":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/utils.js ***!
  \*******************************************************************/
/*! exports provided: looseArrayify, zpad, getPassword, searchPath, uuidV4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "looseArrayify", function() { return looseArrayify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zpad", function() { return zpad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPassword", function() { return getPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPath", function() { return searchPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uuidV4", function() { return uuidV4; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");



function looseArrayify(hexString) {
    if (typeof (hexString) === 'string' && hexString.substring(0, 2) !== '0x') {
        hexString = '0x' + hexString;
    }
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(hexString);
}
function zpad(value, length) {
    value = String(value);
    while (value.length < length) {
        value = '0' + value;
    }
    return value;
}
function getPassword(password) {
    if (typeof (password) === 'string') {
        return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8Bytes"])(password, _ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["UnicodeNormalizationForm"].NFKC);
    }
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(password);
}
function searchPath(object, path) {
    let currentChild = object;
    const comps = path.toLowerCase().split('/');
    for (let i = 0; i < comps.length; i++) {
        // Search for a child object with a case-insensitive matching key
        let matchingChild = null;
        for (const key in currentChild) {
            if (key.toLowerCase() === comps[i]) {
                matchingChild = currentChild[key];
                break;
            }
        }
        // Didn't find one. :'(
        if (matchingChild === null) {
            return null;
        }
        // Now check this child...
        currentChild = matchingChild;
    }
    return currentChild;
}
// See: https://www.ietf.org/rfc/rfc4122.txt (Section 4.4)
function uuidV4(randomBytes) {
    const bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(randomBytes);
    // Section: 4.1.3:
    // - time_hi_and_version[12:16] = 0b0100
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    // Section 4.4
    // - clock_seq_hi_and_reserved[6] = 0b0
    // - clock_seq_hi_and_reserved[7] = 0b1
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const value = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexlify"])(bytes);
    return [
        value.substring(2, 10),
        value.substring(10, 14),
        value.substring(14, 18),
        value.substring(18, 22),
        value.substring(22, 34),
    ].join("-");
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "/wnW":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/random/lib.esm/_version.js ***!
  \****************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "random/5.4.0";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "1Few":
/*!***********************************************************!*\
  !*** ./node_modules/@ethersproject/sha2/lib.esm/types.js ***!
  \***********************************************************/
/*! exports provided: SupportedAlgorithm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportedAlgorithm", function() { return SupportedAlgorithm; });
var SupportedAlgorithm;
(function (SupportedAlgorithm) {
    SupportedAlgorithm["sha256"] = "sha256";
    SupportedAlgorithm["sha512"] = "sha512";
})(SupportedAlgorithm || (SupportedAlgorithm = {}));
;
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "1n0N":
/*!*****************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/bytes.js ***!
  \*****************************************************************/
/*! exports provided: DynamicBytesCoder, BytesCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicBytesCoder", function() { return DynamicBytesCoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BytesCoder", function() { return BytesCoder; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");



class DynamicBytesCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_1__["Coder"] {
    constructor(type, localName) {
        super(type, type, localName, true);
    }
    defaultValue() {
        return "0x";
    }
    encode(writer, value) {
        value = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(value);
        let length = writer.writeValue(value.length);
        length += writer.writeBytes(value);
        return length;
    }
    decode(reader) {
        return reader.readBytes(reader.readValue().toNumber(), true);
    }
}
class BytesCoder extends DynamicBytesCoder {
    constructor(localName) {
        super("bytes", localName);
    }
    decode(reader) {
        return reader.coerce(this.name, Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexlify"])(super.decode(reader)));
    }
}
//# sourceMappingURL=bytes.js.map

/***/ }),

/***/ "23j5":
/*!***************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/alchemy-provider.js ***!
  \***************************************************************************/
/*! exports provided: AlchemyWebSocketProvider, AlchemyProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlchemyWebSocketProvider", function() { return AlchemyWebSocketProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlchemyProvider", function() { return AlchemyProvider; });
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatter */ "fwYn");
/* harmony import */ var _websocket_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./websocket-provider */ "e2Sn");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version */ "SkWp");
/* harmony import */ var _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url-json-rpc-provider */ "vzeg");






const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"](_version__WEBPACK_IMPORTED_MODULE_4__["version"]);

// This key was provided to ethers.js by Alchemy to be used by the
// default provider, but it is recommended that for your own
// production environments, that you acquire your own API key at:
//   https://dashboard.alchemyapi.io
const defaultApiKey = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";
class AlchemyWebSocketProvider extends _websocket_provider__WEBPACK_IMPORTED_MODULE_2__["WebSocketProvider"] {
    constructor(network, apiKey) {
        const provider = new AlchemyProvider(network, apiKey);
        const url = provider.connection.url.replace(/^http/i, "ws")
            .replace(".alchemyapi.", ".ws.alchemyapi.");
        super(url, provider.network);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "apiKey", provider.apiKey);
    }
    isCommunityResource() {
        return (this.apiKey === defaultApiKey);
    }
}
class AlchemyProvider extends _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_5__["UrlJsonRpcProvider"] {
    static getWebSocketProvider(network, apiKey) {
        return new AlchemyWebSocketProvider(network, apiKey);
    }
    static getApiKey(apiKey) {
        if (apiKey == null) {
            return defaultApiKey;
        }
        if (apiKey && typeof (apiKey) !== "string") {
            logger.throwArgumentError("invalid apiKey", "apiKey", apiKey);
        }
        return apiKey;
    }
    static getUrl(network, apiKey) {
        let host = null;
        switch (network.name) {
            case "homestead":
                host = "eth-mainnet.alchemyapi.io/v2/";
                break;
            case "ropsten":
                host = "eth-ropsten.alchemyapi.io/v2/";
                break;
            case "rinkeby":
                host = "eth-rinkeby.alchemyapi.io/v2/";
                break;
            case "goerli":
                host = "eth-goerli.alchemyapi.io/v2/";
                break;
            case "kovan":
                host = "eth-kovan.alchemyapi.io/v2/";
                break;
            case "matic":
                host = "polygon-mainnet.g.alchemy.com/v2/";
                break;
            case "maticmum":
                host = "polygon-mumbai.g.alchemy.com/v2/";
                break;
            default:
                logger.throwArgumentError("unsupported network", "network", arguments[0]);
        }
        return {
            allowGzip: true,
            url: ("https:/" + "/" + host + apiKey),
            throttleCallback: (attempt, url) => {
                if (apiKey === defaultApiKey) {
                    Object(_formatter__WEBPACK_IMPORTED_MODULE_1__["showThrottleMessage"])();
                }
                return Promise.resolve(true);
            }
        };
    }
    isCommunityResource() {
        return (this.apiKey === defaultApiKey);
    }
}
//# sourceMappingURL=alchemy-provider.js.map

/***/ }),

/***/ "2k0X":
/*!************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/web3-provider.js ***!
  \************************************************************************/
/*! exports provided: Web3Provider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Web3Provider", function() { return Web3Provider; });
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "SkWp");
/* harmony import */ var _json_rpc_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./json-rpc-provider */ "PoCP");




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"](_version__WEBPACK_IMPORTED_MODULE_2__["version"]);

let _nextId = 1;
function buildWeb3LegacyFetcher(provider, sendFunc) {
    const fetcher = "Web3LegacyFetcher";
    return function (method, params) {
        // Metamask complains about eth_sign (and on some versions hangs)
        if (method == "eth_sign" && (provider.isMetaMask || provider.isStatus)) {
            // https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign
            method = "personal_sign";
            params = [params[1], params[0]];
        }
        const request = {
            method: method,
            params: params,
            id: (_nextId++),
            jsonrpc: "2.0"
        };
        return new Promise((resolve, reject) => {
            this.emit("debug", {
                action: "request",
                fetcher,
                request: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(request),
                provider: this
            });
            sendFunc(request, (error, response) => {
                if (error) {
                    this.emit("debug", {
                        action: "response",
                        fetcher,
                        error,
                        request,
                        provider: this
                    });
                    return reject(error);
                }
                this.emit("debug", {
                    action: "response",
                    fetcher,
                    request,
                    response,
                    provider: this
                });
                if (response.error) {
                    const error = new Error(response.error.message);
                    error.code = response.error.code;
                    error.data = response.error.data;
                    return reject(error);
                }
                resolve(response.result);
            });
        });
    };
}
function buildEip1193Fetcher(provider) {
    return function (method, params) {
        if (params == null) {
            params = [];
        }
        // Metamask complains about eth_sign (and on some versions hangs)
        if (method == "eth_sign" && (provider.isMetaMask || provider.isStatus)) {
            // https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign
            method = "personal_sign";
            params = [params[1], params[0]];
        }
        const request = { method, params };
        this.emit("debug", {
            action: "request",
            fetcher: "Eip1193Fetcher",
            request: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(request),
            provider: this
        });
        return provider.request(request).then((response) => {
            this.emit("debug", {
                action: "response",
                fetcher: "Eip1193Fetcher",
                request,
                response,
                provider: this
            });
            return response;
        }, (error) => {
            this.emit("debug", {
                action: "response",
                fetcher: "Eip1193Fetcher",
                request,
                error,
                provider: this
            });
            throw error;
        });
    };
}
class Web3Provider extends _json_rpc_provider__WEBPACK_IMPORTED_MODULE_3__["JsonRpcProvider"] {
    constructor(provider, network) {
        logger.checkNew(new.target, Web3Provider);
        if (provider == null) {
            logger.throwArgumentError("missing provider", "provider", provider);
        }
        let path = null;
        let jsonRpcFetchFunc = null;
        let subprovider = null;
        if (typeof (provider) === "function") {
            path = "unknown:";
            jsonRpcFetchFunc = provider;
        }
        else {
            path = provider.host || provider.path || "";
            if (!path && provider.isMetaMask) {
                path = "metamask";
            }
            subprovider = provider;
            if (provider.request) {
                if (path === "") {
                    path = "eip-1193:";
                }
                jsonRpcFetchFunc = buildEip1193Fetcher(provider);
            }
            else if (provider.sendAsync) {
                jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
            }
            else if (provider.send) {
                jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
            }
            else {
                logger.throwArgumentError("unsupported provider", "provider", provider);
            }
            if (!path) {
                path = "unknown:";
            }
        }
        super(path, network);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "provider", subprovider);
    }
    send(method, params) {
        return this.jsonRpcFetchFunc(method, params);
    }
}
//# sourceMappingURL=web3-provider.js.map

/***/ }),

/***/ "4j6N":
/*!*************************************************!*\
  !*** ./node_modules/ethers/lib.esm/_version.js ***!
  \*************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "ethers/5.4.7";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "4wOL":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/web/lib.esm/_version.js ***!
  \*************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "web/5.4.0";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "5kpQ":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/sha2/lib.esm/_version.js ***!
  \**************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "sha2/5.4.0";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "62yz":
/*!***************************************************************************!*\
  !*** ./node_modules/@ethersproject/abstract-provider/lib.esm/_version.js ***!
  \***************************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "abstract-provider/5.4.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "7FBX":
/*!***********************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js ***!
  \***********************************************************************/
/*! exports provided: CrowdsaleAccount, decrypt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrowdsaleAccount", function() { return CrowdsaleAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decrypt", function() { return decrypt; });
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aes-js */ "cke4");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/keccak256 */ "b1pR");
/* harmony import */ var _ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/pbkdf2 */ "Uvg9");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_version */ "Ub8o");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "/m0q");










const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_7__["Logger"](_version__WEBPACK_IMPORTED_MODULE_8__["version"]);

class CrowdsaleAccount extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["Description"] {
    isCrowdsaleAccount(value) {
        return !!(value && value._isCrowdsaleAccount);
    }
}
// See: https://github.com/ethereum/pyethsaletool
function decrypt(json, password) {
    const data = JSON.parse(json);
    password = Object(_utils__WEBPACK_IMPORTED_MODULE_9__["getPassword"])(password);
    // Ethereum Address
    const ethaddr = Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_1__["getAddress"])(Object(_utils__WEBPACK_IMPORTED_MODULE_9__["searchPath"])(data, "ethaddr"));
    // Encrypted Seed
    const encseed = Object(_utils__WEBPACK_IMPORTED_MODULE_9__["looseArrayify"])(Object(_utils__WEBPACK_IMPORTED_MODULE_9__["searchPath"])(data, "encseed"));
    if (!encseed || (encseed.length % 16) !== 0) {
        logger.throwArgumentError("invalid encseed", "json", json);
    }
    const key = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["arrayify"])(Object(_ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_4__["pbkdf2"])(password, password, 2000, 32, "sha256")).slice(0, 16);
    const iv = encseed.slice(0, 16);
    const encryptedSeed = encseed.slice(16);
    // Decrypt the seed
    const aesCbc = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.ModeOfOperation.cbc(key, iv);
    const seed = aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.padding.pkcs7.strip(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["arrayify"])(aesCbc.decrypt(encryptedSeed)));
    // This wallet format is weird... Convert the binary encoded hex to a string.
    let seedHex = "";
    for (let i = 0; i < seed.length; i++) {
        seedHex += String.fromCharCode(seed[i]);
    }
    const seedHexBytes = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_5__["toUtf8Bytes"])(seedHex);
    const privateKey = Object(_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_3__["keccak256"])(seedHexBytes);
    return new CrowdsaleAccount({
        _isCrowdsaleAccount: true,
        address: ethaddr,
        privateKey: privateKey
    });
}
//# sourceMappingURL=crowdsale.js.map

/***/ }),

/***/ "7WLq":
/*!***************************************************************!*\
  !*** ./node_modules/@ethersproject/solidity/lib.esm/index.js ***!
  \***************************************************************/
/*! exports provided: pack, keccak256, sha256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pack", function() { return pack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keccak256", function() { return keccak256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return sha256; });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/keccak256 */ "b1pR");
/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/sha2 */ "ggob");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");






const regexBytes = new RegExp("^bytes([0-9]+)$");
const regexNumber = new RegExp("^(u?int)([0-9]*)$");
const regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
const Zeros = "0000000000000000000000000000000000000000000000000000000000000000";
function _pack(type, value, isArray) {
    switch (type) {
        case "address":
            if (isArray) {
                return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["zeroPad"])(value, 32);
            }
            return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(value);
        case "string":
            return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_4__["toUtf8Bytes"])(value);
        case "bytes":
            return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(value);
        case "bool":
            value = (value ? "0x01" : "0x00");
            if (isArray) {
                return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["zeroPad"])(value, 32);
            }
            return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(value);
    }
    let match = type.match(regexNumber);
    if (match) {
        //let signed = (match[1] === "int")
        let size = parseInt(match[2] || "256");
        if ((match[2] && String(size) !== match[2]) || (size % 8 !== 0) || size === 0 || size > 256) {
            throw new Error("invalid number type - " + type);
        }
        if (isArray) {
            size = 256;
        }
        value = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(value).toTwos(size);
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["zeroPad"])(value, size / 8);
    }
    match = type.match(regexBytes);
    if (match) {
        const size = parseInt(match[1]);
        if (String(size) !== match[1] || size === 0 || size > 32) {
            throw new Error("invalid bytes type - " + type);
        }
        if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(value).byteLength !== size) {
            throw new Error("invalid value for " + type);
        }
        if (isArray) {
            return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])((value + Zeros).substring(0, 66));
        }
        return value;
    }
    match = type.match(regexArray);
    if (match && Array.isArray(value)) {
        const baseType = match[1];
        const count = parseInt(match[2] || String(value.length));
        if (count != value.length) {
            throw new Error("invalid value for " + type);
        }
        const result = [];
        value.forEach(function (value) {
            result.push(_pack(baseType, value, true));
        });
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["concat"])(result);
    }
    throw new Error("invalid type - " + type);
}
// @TODO: Array Enum
function pack(types, values) {
    if (types.length != values.length) {
        throw new Error("type/value count mismatch");
    }
    const tight = [];
    types.forEach(function (type, index) {
        tight.push(_pack(type, values[index]));
    });
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["concat"])(tight));
}
function keccak256(types, values) {
    return Object(_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_2__["keccak256"])(pack(types, values));
}
function sha256(types, values) {
    return Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_3__["sha256"])(pack(types, values));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "7aoe":
/*!************************************************************************!*\
  !*** ./node_modules/@ethersproject/abstract-provider/lib.esm/index.js ***!
  \************************************************************************/
/*! exports provided: ForkEvent, BlockForkEvent, TransactionForkEvent, TransactionOrderForkEvent, Provider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForkEvent", function() { return ForkEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockForkEvent", function() { return BlockForkEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionForkEvent", function() { return TransactionForkEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionOrderForkEvent", function() { return TransactionOrderForkEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return Provider; });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version */ "62yz");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"](_version__WEBPACK_IMPORTED_MODULE_4__["version"]);
;
;
//export type CallTransactionable = {
//    call(transaction: TransactionRequest): Promise<TransactionResponse>;
//};
class ForkEvent extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["Description"] {
    static isForkEvent(value) {
        return !!(value && value._isForkEvent);
    }
}
class BlockForkEvent extends ForkEvent {
    constructor(blockHash, expiry) {
        if (!Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["isHexString"])(blockHash, 32)) {
            logger.throwArgumentError("invalid blockHash", "blockHash", blockHash);
        }
        super({
            _isForkEvent: true,
            _isBlockForkEvent: true,
            expiry: (expiry || 0),
            blockHash: blockHash
        });
    }
}
class TransactionForkEvent extends ForkEvent {
    constructor(hash, expiry) {
        if (!Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["isHexString"])(hash, 32)) {
            logger.throwArgumentError("invalid transaction hash", "hash", hash);
        }
        super({
            _isForkEvent: true,
            _isTransactionForkEvent: true,
            expiry: (expiry || 0),
            hash: hash
        });
    }
}
class TransactionOrderForkEvent extends ForkEvent {
    constructor(beforeHash, afterHash, expiry) {
        if (!Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["isHexString"])(beforeHash, 32)) {
            logger.throwArgumentError("invalid transaction hash", "beforeHash", beforeHash);
        }
        if (!Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["isHexString"])(afterHash, 32)) {
            logger.throwArgumentError("invalid transaction hash", "afterHash", afterHash);
        }
        super({
            _isForkEvent: true,
            _isTransactionOrderForkEvent: true,
            expiry: (expiry || 0),
            beforeHash: beforeHash,
            afterHash: afterHash
        });
    }
}
///////////////////////////////
// Exported Abstracts
class Provider {
    constructor() {
        logger.checkAbstract(new.target, Provider);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["defineReadOnly"])(this, "_isProvider", true);
    }
    getFeeData() {
        return __awaiter(this, void 0, void 0, function* () {
            const { block, gasPrice } = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["resolveProperties"])({
                block: this.getBlock("latest"),
                gasPrice: this.getGasPrice().catch((error) => {
                    // @TODO: Why is this now failing on Calaveras?
                    //console.log(error);
                    return null;
                })
            });
            let maxFeePerGas = null, maxPriorityFeePerGas = null;
            if (block && block.baseFeePerGas) {
                // We may want to compute this more accurately in the future,
                // using the formula "check if the base fee is correct".
                // See: https://eips.ethereum.org/EIPS/eip-1559
                maxPriorityFeePerGas = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from("2500000000");
                maxFeePerGas = block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas);
            }
            return { maxFeePerGas, maxPriorityFeePerGas, gasPrice };
        });
    }
    // Alias for "on"
    addListener(eventName, listener) {
        return this.on(eventName, listener);
    }
    // Alias for "off"
    removeListener(eventName, listener) {
        return this.off(eventName, listener);
    }
    static isProvider(value) {
        return !!(value && value._isProvider);
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "8AIR":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/hdnode/lib.esm/index.js ***!
  \*************************************************************/
/*! exports provided: defaultPath, HDNode, mnemonicToSeed, mnemonicToEntropy, entropyToMnemonic, isValidMnemonic, getAccountPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultPath", function() { return defaultPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HDNode", function() { return HDNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mnemonicToSeed", function() { return mnemonicToSeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mnemonicToEntropy", function() { return mnemonicToEntropy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entropyToMnemonic", function() { return entropyToMnemonic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMnemonic", function() { return isValidMnemonic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccountPath", function() { return getAccountPath; });
/* harmony import */ var _ethersproject_basex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/basex */ "LPIR");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/pbkdf2 */ "Uvg9");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/signing-key */ "rhxT");
/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/sha2 */ "ggob");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/transactions */ "WsP5");
/* harmony import */ var _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/wordlists */ "ewK1");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_version */ "Vpoo");













const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_10__["Logger"](_version__WEBPACK_IMPORTED_MODULE_11__["version"]);
const N = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
// "Bitcoin seed"
const MasterSecret = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["toUtf8Bytes"])("Bitcoin seed");
const HardenedBit = 0x80000000;
// Returns a byte with the MSB bits set
function getUpperMask(bits) {
    return ((1 << bits) - 1) << (8 - bits);
}
// Returns a byte with the LSB bits set
function getLowerMask(bits) {
    return (1 << bits) - 1;
}
function bytes32(value) {
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexZeroPad"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(value), 32);
}
function base58check(data) {
    return _ethersproject_basex__WEBPACK_IMPORTED_MODULE_0__["Base58"].encode(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["concat"])([data, Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexDataSlice"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["sha256"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["sha256"])(data)), 0, 4)]));
}
function getWordlist(wordlist) {
    if (wordlist == null) {
        return _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_9__["wordlists"]["en"];
    }
    if (typeof (wordlist) === "string") {
        const words = _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_9__["wordlists"][wordlist];
        if (words == null) {
            logger.throwArgumentError("unknown locale", "wordlist", wordlist);
        }
        return words;
    }
    return wordlist;
}
const _constructorGuard = {};
const defaultPath = "m/44'/60'/0'/0/0";
;
class HDNode {
    /**
     *  This constructor should not be called directly.
     *
     *  Please use:
     *   - fromMnemonic
     *   - fromSeed
     */
    constructor(constructorGuard, privateKey, publicKey, parentFingerprint, chainCode, index, depth, mnemonicOrPath) {
        logger.checkNew(new.target, HDNode);
        /* istanbul ignore if */
        if (constructorGuard !== _constructorGuard) {
            throw new Error("HDNode constructor cannot be called directly");
        }
        if (privateKey) {
            const signingKey = new _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_6__["SigningKey"](privateKey);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "privateKey", signingKey.privateKey);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "publicKey", signingKey.compressedPublicKey);
        }
        else {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "privateKey", null);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "publicKey", Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(publicKey));
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "parentFingerprint", parentFingerprint);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "fingerprint", Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexDataSlice"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["ripemd160"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["sha256"])(this.publicKey)), 0, 4));
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "address", Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_8__["computeAddress"])(this.publicKey));
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "chainCode", chainCode);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "index", index);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "depth", depth);
        if (mnemonicOrPath == null) {
            // From a source that does not preserve the path (e.g. extended keys)
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "mnemonic", null);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "path", null);
        }
        else if (typeof (mnemonicOrPath) === "string") {
            // From a source that does not preserve the mnemonic (e.g. neutered)
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "mnemonic", null);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "path", mnemonicOrPath);
        }
        else {
            // From a fully qualified source
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "mnemonic", mnemonicOrPath);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "path", mnemonicOrPath.path);
        }
    }
    get extendedKey() {
        // We only support the mainnet values for now, but if anyone needs
        // testnet values, let me know. I believe current senitment is that
        // we should always use mainnet, and use BIP-44 to derive the network
        //   - Mainnet: public=0x0488B21E, private=0x0488ADE4
        //   - Testnet: public=0x043587CF, private=0x04358394
        if (this.depth >= 256) {
            throw new Error("Depth too large!");
        }
        return base58check(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["concat"])([
            ((this.privateKey != null) ? "0x0488ADE4" : "0x0488B21E"),
            Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(this.depth),
            this.parentFingerprint,
            Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexZeroPad"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(this.index), 4),
            this.chainCode,
            ((this.privateKey != null) ? Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["concat"])(["0x00", this.privateKey]) : this.publicKey),
        ]));
    }
    neuter() {
        return new HDNode(_constructorGuard, null, this.publicKey, this.parentFingerprint, this.chainCode, this.index, this.depth, this.path);
    }
    _derive(index) {
        if (index > 0xffffffff) {
            throw new Error("invalid index - " + String(index));
        }
        // Base path
        let path = this.path;
        if (path) {
            path += "/" + (index & ~HardenedBit);
        }
        const data = new Uint8Array(37);
        if (index & HardenedBit) {
            if (!this.privateKey) {
                throw new Error("cannot derive child of neutered node");
            }
            // Data = 0x00 || ser_256(k_par)
            data.set(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(this.privateKey), 1);
            // Hardened path
            if (path) {
                path += "'";
            }
        }
        else {
            // Data = ser_p(point(k_par))
            data.set(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(this.publicKey));
        }
        // Data += ser_32(i)
        for (let i = 24; i >= 0; i -= 8) {
            data[33 + (i >> 3)] = ((index >> (24 - i)) & 0xff);
        }
        const I = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["computeHmac"])(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["SupportedAlgorithm"].sha512, this.chainCode, data));
        const IL = I.slice(0, 32);
        const IR = I.slice(32);
        // The private key
        let ki = null;
        // The public key
        let Ki = null;
        if (this.privateKey) {
            ki = bytes32(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(IL).add(this.privateKey).mod(N));
        }
        else {
            const ek = new _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_6__["SigningKey"](Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(IL));
            Ki = ek._addPoint(this.publicKey);
        }
        let mnemonicOrPath = path;
        const srcMnemonic = this.mnemonic;
        if (srcMnemonic) {
            mnemonicOrPath = Object.freeze({
                phrase: srcMnemonic.phrase,
                path: path,
                locale: (srcMnemonic.locale || "en")
            });
        }
        return new HDNode(_constructorGuard, ki, Ki, this.fingerprint, bytes32(IR), index, this.depth + 1, mnemonicOrPath);
    }
    derivePath(path) {
        const components = path.split("/");
        if (components.length === 0 || (components[0] === "m" && this.depth !== 0)) {
            throw new Error("invalid path - " + path);
        }
        if (components[0] === "m") {
            components.shift();
        }
        let result = this;
        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            if (component.match(/^[0-9]+'$/)) {
                const index = parseInt(component.substring(0, component.length - 1));
                if (index >= HardenedBit) {
                    throw new Error("invalid path index - " + component);
                }
                result = result._derive(HardenedBit + index);
            }
            else if (component.match(/^[0-9]+$/)) {
                const index = parseInt(component);
                if (index >= HardenedBit) {
                    throw new Error("invalid path index - " + component);
                }
                result = result._derive(index);
            }
            else {
                throw new Error("invalid path component - " + component);
            }
        }
        return result;
    }
    static _fromSeed(seed, mnemonic) {
        const seedArray = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(seed);
        if (seedArray.length < 16 || seedArray.length > 64) {
            throw new Error("invalid seed");
        }
        const I = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["computeHmac"])(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["SupportedAlgorithm"].sha512, MasterSecret, seedArray));
        return new HDNode(_constructorGuard, bytes32(I.slice(0, 32)), null, "0x00000000", bytes32(I.slice(32)), 0, 0, mnemonic);
    }
    static fromMnemonic(mnemonic, password, wordlist) {
        // If a locale name was passed in, find the associated wordlist
        wordlist = getWordlist(wordlist);
        // Normalize the case and spacing in the mnemonic (throws if the mnemonic is invalid)
        mnemonic = entropyToMnemonic(mnemonicToEntropy(mnemonic, wordlist), wordlist);
        return HDNode._fromSeed(mnemonicToSeed(mnemonic, password), {
            phrase: mnemonic,
            path: "m",
            locale: wordlist.locale
        });
    }
    static fromSeed(seed) {
        return HDNode._fromSeed(seed, null);
    }
    static fromExtendedKey(extendedKey) {
        const bytes = _ethersproject_basex__WEBPACK_IMPORTED_MODULE_0__["Base58"].decode(extendedKey);
        if (bytes.length !== 82 || base58check(bytes.slice(0, 78)) !== extendedKey) {
            logger.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
        }
        const depth = bytes[4];
        const parentFingerprint = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(bytes.slice(5, 9));
        const index = parseInt(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(bytes.slice(9, 13)).substring(2), 16);
        const chainCode = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(bytes.slice(13, 45));
        const key = bytes.slice(45, 78);
        switch (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(bytes.slice(0, 4))) {
            // Public Key
            case "0x0488b21e":
            case "0x043587cf":
                return new HDNode(_constructorGuard, null, Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(key), parentFingerprint, chainCode, index, depth, null);
            // Private Key
            case "0x0488ade4":
            case "0x04358394 ":
                if (key[0] !== 0) {
                    break;
                }
                return new HDNode(_constructorGuard, Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(key.slice(1)), null, parentFingerprint, chainCode, index, depth, null);
        }
        return logger.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
    }
}
function mnemonicToSeed(mnemonic, password) {
    if (!password) {
        password = "";
    }
    const salt = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["toUtf8Bytes"])("mnemonic" + password, _ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["UnicodeNormalizationForm"].NFKD);
    return Object(_ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_4__["pbkdf2"])(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["toUtf8Bytes"])(mnemonic, _ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["UnicodeNormalizationForm"].NFKD), salt, 2048, 64, "sha512");
}
function mnemonicToEntropy(mnemonic, wordlist) {
    wordlist = getWordlist(wordlist);
    logger.checkNormalize();
    const words = wordlist.split(mnemonic);
    if ((words.length % 3) !== 0) {
        throw new Error("invalid mnemonic");
    }
    const entropy = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(new Uint8Array(Math.ceil(11 * words.length / 8)));
    let offset = 0;
    for (let i = 0; i < words.length; i++) {
        let index = wordlist.getWordIndex(words[i].normalize("NFKD"));
        if (index === -1) {
            throw new Error("invalid mnemonic");
        }
        for (let bit = 0; bit < 11; bit++) {
            if (index & (1 << (10 - bit))) {
                entropy[offset >> 3] |= (1 << (7 - (offset % 8)));
            }
            offset++;
        }
    }
    const entropyBits = 32 * words.length / 3;
    const checksumBits = words.length / 3;
    const checksumMask = getUpperMask(checksumBits);
    const checksum = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["sha256"])(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;
    if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
        throw new Error("invalid checksum");
    }
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(entropy.slice(0, entropyBits / 8));
}
function entropyToMnemonic(entropy, wordlist) {
    wordlist = getWordlist(wordlist);
    entropy = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(entropy);
    if ((entropy.length % 4) !== 0 || entropy.length < 16 || entropy.length > 32) {
        throw new Error("invalid entropy");
    }
    const indices = [0];
    let remainingBits = 11;
    for (let i = 0; i < entropy.length; i++) {
        // Consume the whole byte (with still more to go)
        if (remainingBits > 8) {
            indices[indices.length - 1] <<= 8;
            indices[indices.length - 1] |= entropy[i];
            remainingBits -= 8;
            // This byte will complete an 11-bit index
        }
        else {
            indices[indices.length - 1] <<= remainingBits;
            indices[indices.length - 1] |= entropy[i] >> (8 - remainingBits);
            // Start the next word
            indices.push(entropy[i] & getLowerMask(8 - remainingBits));
            remainingBits += 3;
        }
    }
    // Compute the checksum bits
    const checksumBits = entropy.length / 4;
    const checksum = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_7__["sha256"])(entropy))[0] & getUpperMask(checksumBits);
    // Shift the checksum into the word indices
    indices[indices.length - 1] <<= checksumBits;
    indices[indices.length - 1] |= (checksum >> (8 - checksumBits));
    return wordlist.join(indices.map((index) => wordlist.getWord(index)));
}
function isValidMnemonic(mnemonic, wordlist) {
    try {
        mnemonicToEntropy(mnemonic, wordlist);
        return true;
    }
    catch (error) { }
    return false;
}
function getAccountPath(index) {
    if (typeof (index) !== "number" || index < 0 || index >= HardenedBit || index % 1) {
        logger.throwArgumentError("invalid account index", "index", index);
    }
    return `m/44'/60'/${index}'/0/0`;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "8XlW":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/contracts/lib.esm/index.js ***!
  \****************************************************************/
/*! exports provided: BaseContract, Contract, ContractFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseContract", function() { return BaseContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contract", function() { return Contract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractFactory", function() { return ContractFactory; });
/* harmony import */ var _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/abi */ "SoSZ");
/* harmony import */ var _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/abstract-provider */ "7aoe");
/* harmony import */ var _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/abstract-signer */ "fKWB");
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/transactions */ "WsP5");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_version */ "OM6g");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"](_version__WEBPACK_IMPORTED_MODULE_9__["version"]);
;
;
///////////////////////////////
const allowedTransactionKeys = {
    chainId: true, data: true, from: true, gasLimit: true, gasPrice: true, nonce: true, to: true, value: true,
    type: true, accessList: true,
    maxFeePerGas: true, maxPriorityFeePerGas: true
};
function resolveName(resolver, nameOrPromise) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield nameOrPromise;
        // If it is already an address, just use it (after adding checksum)
        try {
            return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_3__["getAddress"])(name);
        }
        catch (error) { }
        if (!resolver) {
            logger.throwError("a provider or signer is needed to resolve ENS names", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "resolveName"
            });
        }
        const address = yield resolver.resolveName(name);
        if (address == null) {
            logger.throwArgumentError("resolver or addr is not configured for ENS name", "name", name);
        }
        return address;
    });
}
// Recursively replaces ENS names with promises to resolve the name and resolves all properties
function resolveAddresses(resolver, value, paramType) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(paramType)) {
            return yield Promise.all(paramType.map((paramType, index) => {
                return resolveAddresses(resolver, ((Array.isArray(value)) ? value[index] : value[paramType.name]), paramType);
            }));
        }
        if (paramType.type === "address") {
            return yield resolveName(resolver, value);
        }
        if (paramType.type === "tuple") {
            return yield resolveAddresses(resolver, value, paramType.components);
        }
        if (paramType.baseType === "array") {
            if (!Array.isArray(value)) {
                return Promise.reject(new Error("invalid value for array"));
            }
            return yield Promise.all(value.map((v) => resolveAddresses(resolver, v, paramType.arrayChildren)));
        }
        return value;
    });
}
function populateTransaction(contract, fragment, args) {
    return __awaiter(this, void 0, void 0, function* () {
        // If an extra argument is given, it is overrides
        let overrides = {};
        if (args.length === fragment.inputs.length + 1 && typeof (args[args.length - 1]) === "object") {
            overrides = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["shallowCopy"])(args.pop());
        }
        // Make sure the parameter count matches
        logger.checkArgumentCount(args.length, fragment.inputs.length, "passed to contract");
        // Populate "from" override (allow promises)
        if (contract.signer) {
            if (overrides.from) {
                // Contracts with a Signer are from the Signer's frame-of-reference;
                // but we allow overriding "from" if it matches the signer
                overrides.from = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["resolveProperties"])({
                    override: resolveName(contract.signer, overrides.from),
                    signer: contract.signer.getAddress()
                }).then((check) => __awaiter(this, void 0, void 0, function* () {
                    if (Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_3__["getAddress"])(check.signer) !== check.override) {
                        logger.throwError("Contract with a Signer cannot override from", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                            operation: "overrides.from"
                        });
                    }
                    return check.override;
                }));
            }
            else {
                overrides.from = contract.signer.getAddress();
            }
        }
        else if (overrides.from) {
            overrides.from = resolveName(contract.provider, overrides.from);
            //} else {
            // Contracts without a signer can override "from", and if
            // unspecified the zero address is used
            //overrides.from = AddressZero;
        }
        // Wait for all dependencies to be resolved (prefer the signer over the provider)
        const resolved = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["resolveProperties"])({
            args: resolveAddresses(contract.signer || contract.provider, args, fragment.inputs),
            address: contract.resolvedAddress,
            overrides: (Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["resolveProperties"])(overrides) || {})
        });
        // The ABI coded transaction
        const data = contract.interface.encodeFunctionData(fragment, resolved.args);
        const tx = {
            data: data,
            to: resolved.address
        };
        // Resolved Overrides
        const ro = resolved.overrides;
        // Populate simple overrides
        if (ro.nonce != null) {
            tx.nonce = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__["BigNumber"].from(ro.nonce).toNumber();
        }
        if (ro.gasLimit != null) {
            tx.gasLimit = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__["BigNumber"].from(ro.gasLimit);
        }
        if (ro.gasPrice != null) {
            tx.gasPrice = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__["BigNumber"].from(ro.gasPrice);
        }
        if (ro.maxFeePerGas != null) {
            tx.maxFeePerGas = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__["BigNumber"].from(ro.maxFeePerGas);
        }
        if (ro.maxPriorityFeePerGas != null) {
            tx.maxPriorityFeePerGas = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__["BigNumber"].from(ro.maxPriorityFeePerGas);
        }
        if (ro.from != null) {
            tx.from = ro.from;
        }
        if (ro.type != null) {
            tx.type = ro.type;
        }
        if (ro.accessList != null) {
            tx.accessList = Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_7__["accessListify"])(ro.accessList);
        }
        // If there was no "gasLimit" override, but the ABI specifies a default, use it
        if (tx.gasLimit == null && fragment.gas != null) {
            // Conmpute the intrinisic gas cost for this transaction
            // @TODO: This is based on the yellow paper as of Petersburg; this is something
            // we may wish to parameterize in v6 as part of the Network object. Since this
            // is always a non-nil to address, we can ignore G_create, but may wish to add
            // similar logic to the ContractFactory.
            let intrinsic = 21000;
            const bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_5__["arrayify"])(data);
            for (let i = 0; i < bytes.length; i++) {
                intrinsic += 4;
                if (bytes[i]) {
                    intrinsic += 64;
                }
            }
            tx.gasLimit = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__["BigNumber"].from(fragment.gas).add(intrinsic);
        }
        // Populate "value" override
        if (ro.value) {
            const roValue = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__["BigNumber"].from(ro.value);
            if (!roValue.isZero() && !fragment.payable) {
                logger.throwError("non-payable method cannot override value", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                    operation: "overrides.value",
                    value: overrides.value
                });
            }
            tx.value = roValue;
        }
        // Remvoe the overrides
        delete overrides.nonce;
        delete overrides.gasLimit;
        delete overrides.gasPrice;
        delete overrides.from;
        delete overrides.value;
        delete overrides.type;
        delete overrides.accessList;
        delete overrides.maxFeePerGas;
        delete overrides.maxPriorityFeePerGas;
        // Make sure there are no stray overrides, which may indicate a
        // typo or using an unsupported key.
        const leftovers = Object.keys(overrides).filter((key) => (overrides[key] != null));
        if (leftovers.length) {
            logger.throwError(`cannot override ${leftovers.map((l) => JSON.stringify(l)).join(",")}`, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "overrides",
                overrides: leftovers
            });
        }
        return tx;
    });
}
function buildPopulate(contract, fragment) {
    return function (...args) {
        return populateTransaction(contract, fragment, args);
    };
}
function buildEstimate(contract, fragment) {
    const signerOrProvider = (contract.signer || contract.provider);
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!signerOrProvider) {
                logger.throwError("estimate require a provider or signer", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                    operation: "estimateGas"
                });
            }
            const tx = yield populateTransaction(contract, fragment, args);
            return yield signerOrProvider.estimateGas(tx);
        });
    };
}
function buildCall(contract, fragment, collapseSimple) {
    const signerOrProvider = (contract.signer || contract.provider);
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract the "blockTag" override if present
            let blockTag = undefined;
            if (args.length === fragment.inputs.length + 1 && typeof (args[args.length - 1]) === "object") {
                const overrides = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["shallowCopy"])(args.pop());
                if (overrides.blockTag != null) {
                    blockTag = yield overrides.blockTag;
                }
                delete overrides.blockTag;
                args.push(overrides);
            }
            // If the contract was just deployed, wait until it is mined
            if (contract.deployTransaction != null) {
                yield contract._deployed(blockTag);
            }
            // Call a node and get the result
            const tx = yield populateTransaction(contract, fragment, args);
            const result = yield signerOrProvider.call(tx, blockTag);
            try {
                let value = contract.interface.decodeFunctionResult(fragment, result);
                if (collapseSimple && fragment.outputs.length === 1) {
                    value = value[0];
                }
                return value;
            }
            catch (error) {
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.CALL_EXCEPTION) {
                    error.address = contract.address;
                    error.args = args;
                    error.transaction = tx;
                }
                throw error;
            }
        });
    };
}
function buildSend(contract, fragment) {
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract.signer) {
                logger.throwError("sending a transaction requires a signer", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                    operation: "sendTransaction"
                });
            }
            // If the contract was just deployed, wait until it is minded
            if (contract.deployTransaction != null) {
                yield contract._deployed();
            }
            const txRequest = yield populateTransaction(contract, fragment, args);
            const tx = yield contract.signer.sendTransaction(txRequest);
            // Tweak the tw.wait so the receipt has extra properties
            const wait = tx.wait.bind(tx);
            tx.wait = (confirmations) => {
                return wait(confirmations).then((receipt) => {
                    receipt.events = receipt.logs.map((log) => {
                        let event = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["deepCopy"])(log);
                        let parsed = null;
                        try {
                            parsed = contract.interface.parseLog(log);
                        }
                        catch (e) { }
                        // Successfully parsed the event log; include it
                        if (parsed) {
                            event.args = parsed.args;
                            event.decode = (data, topics) => {
                                return contract.interface.decodeEventLog(parsed.eventFragment, data, topics);
                            };
                            event.event = parsed.name;
                            event.eventSignature = parsed.signature;
                        }
                        // Useful operations
                        event.removeListener = () => { return contract.provider; };
                        event.getBlock = () => {
                            return contract.provider.getBlock(receipt.blockHash);
                        };
                        event.getTransaction = () => {
                            return contract.provider.getTransaction(receipt.transactionHash);
                        };
                        event.getTransactionReceipt = () => {
                            return Promise.resolve(receipt);
                        };
                        return event;
                    });
                    return receipt;
                });
            };
            return tx;
        });
    };
}
function buildDefault(contract, fragment, collapseSimple) {
    if (fragment.constant) {
        return buildCall(contract, fragment, collapseSimple);
    }
    return buildSend(contract, fragment);
}
function getEventTag(filter) {
    if (filter.address && (filter.topics == null || filter.topics.length === 0)) {
        return "*";
    }
    return (filter.address || "*") + "@" + (filter.topics ? filter.topics.map((topic) => {
        if (Array.isArray(topic)) {
            return topic.join("|");
        }
        return topic;
    }).join(":") : "");
}
class RunningEvent {
    constructor(tag, filter) {
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "tag", tag);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "filter", filter);
        this._listeners = [];
    }
    addListener(listener, once) {
        this._listeners.push({ listener: listener, once: once });
    }
    removeListener(listener) {
        let done = false;
        this._listeners = this._listeners.filter((item) => {
            if (done || item.listener !== listener) {
                return true;
            }
            done = true;
            return false;
        });
    }
    removeAllListeners() {
        this._listeners = [];
    }
    listeners() {
        return this._listeners.map((i) => i.listener);
    }
    listenerCount() {
        return this._listeners.length;
    }
    run(args) {
        const listenerCount = this.listenerCount();
        this._listeners = this._listeners.filter((item) => {
            const argsCopy = args.slice();
            // Call the callback in the next event loop
            setTimeout(() => {
                item.listener.apply(this, argsCopy);
            }, 0);
            // Reschedule it if it not "once"
            return !(item.once);
        });
        return listenerCount;
    }
    prepareEvent(event) {
    }
    // Returns the array that will be applied to an emit
    getEmit(event) {
        return [event];
    }
}
class ErrorRunningEvent extends RunningEvent {
    constructor() {
        super("error", null);
    }
}
// @TODO Fragment should inherit Wildcard? and just override getEmit?
//       or have a common abstract super class, with enough constructor
//       options to configure both.
// A Fragment Event will populate all the properties that Wildcard
// will, and additioanlly dereference the arguments when emitting
class FragmentRunningEvent extends RunningEvent {
    constructor(address, contractInterface, fragment, topics) {
        const filter = {
            address: address
        };
        let topic = contractInterface.getEventTopic(fragment);
        if (topics) {
            if (topic !== topics[0]) {
                logger.throwArgumentError("topic mismatch", "topics", topics);
            }
            filter.topics = topics.slice();
        }
        else {
            filter.topics = [topic];
        }
        super(getEventTag(filter), filter);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "address", address);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "interface", contractInterface);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "fragment", fragment);
    }
    prepareEvent(event) {
        super.prepareEvent(event);
        event.event = this.fragment.name;
        event.eventSignature = this.fragment.format();
        event.decode = (data, topics) => {
            return this.interface.decodeEventLog(this.fragment, data, topics);
        };
        try {
            event.args = this.interface.decodeEventLog(this.fragment, event.data, event.topics);
        }
        catch (error) {
            event.args = null;
            event.decodeError = error;
        }
    }
    getEmit(event) {
        const errors = Object(_ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["checkResultErrors"])(event.args);
        if (errors.length) {
            throw errors[0].error;
        }
        const args = (event.args || []).slice();
        args.push(event);
        return args;
    }
}
// A Wildard Event will attempt to populate:
//  - event            The name of the event name
//  - eventSignature   The full signature of the event
//  - decode           A function to decode data and topics
//  - args             The decoded data and topics
class WildcardRunningEvent extends RunningEvent {
    constructor(address, contractInterface) {
        super("*", { address: address });
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "address", address);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "interface", contractInterface);
    }
    prepareEvent(event) {
        super.prepareEvent(event);
        try {
            const parsed = this.interface.parseLog(event);
            event.event = parsed.name;
            event.eventSignature = parsed.signature;
            event.decode = (data, topics) => {
                return this.interface.decodeEventLog(parsed.eventFragment, data, topics);
            };
            event.args = parsed.args;
        }
        catch (error) {
            // No matching event
        }
    }
}
class BaseContract {
    constructor(addressOrName, contractInterface, signerOrProvider) {
        logger.checkNew(new.target, Contract);
        // @TODO: Maybe still check the addressOrName looks like a valid address or name?
        //address = getAddress(address);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "interface", Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["getStatic"])((new.target), "getInterface")(contractInterface));
        if (signerOrProvider == null) {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "provider", null);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "signer", null);
        }
        else if (_ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__["Signer"].isSigner(signerOrProvider)) {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "provider", signerOrProvider.provider || null);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "signer", signerOrProvider);
        }
        else if (_ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_1__["Provider"].isProvider(signerOrProvider)) {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "provider", signerOrProvider);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "signer", null);
        }
        else {
            logger.throwArgumentError("invalid signer or provider", "signerOrProvider", signerOrProvider);
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "callStatic", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "estimateGas", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "functions", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "populateTransaction", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "filters", {});
        {
            const uniqueFilters = {};
            Object.keys(this.interface.events).forEach((eventSignature) => {
                const event = this.interface.events[eventSignature];
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.filters, eventSignature, (...args) => {
                    return {
                        address: this.address,
                        topics: this.interface.encodeFilterTopics(event, args)
                    };
                });
                if (!uniqueFilters[event.name]) {
                    uniqueFilters[event.name] = [];
                }
                uniqueFilters[event.name].push(eventSignature);
            });
            Object.keys(uniqueFilters).forEach((name) => {
                const filters = uniqueFilters[name];
                if (filters.length === 1) {
                    Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.filters, name, this.filters[filters[0]]);
                }
                else {
                    logger.warn(`Duplicate definition of ${name} (${filters.join(", ")})`);
                }
            });
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "_runningEvents", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "_wrappedEmits", {});
        if (addressOrName == null) {
            logger.throwArgumentError("invalid contract address or ENS name", "addressOrName", addressOrName);
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "address", addressOrName);
        if (this.provider) {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "resolvedAddress", resolveName(this.provider, addressOrName));
        }
        else {
            try {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "resolvedAddress", Promise.resolve(Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_3__["getAddress"])(addressOrName)));
            }
            catch (error) {
                // Without a provider, we cannot use ENS names
                logger.throwError("provider is required to use ENS name as contract address", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                    operation: "new Contract"
                });
            }
        }
        const uniqueNames = {};
        const uniqueSignatures = {};
        Object.keys(this.interface.functions).forEach((signature) => {
            const fragment = this.interface.functions[signature];
            // Check that the signature is unique; if not the ABI generation has
            // not been cleaned or may be incorrectly generated
            if (uniqueSignatures[signature]) {
                logger.warn(`Duplicate ABI entry for ${JSON.stringify(signature)}`);
                return;
            }
            uniqueSignatures[signature] = true;
            // Track unique names; we only expose bare named functions if they
            // are ambiguous
            {
                const name = fragment.name;
                if (!uniqueNames[name]) {
                    uniqueNames[name] = [];
                }
                uniqueNames[name].push(signature);
            }
            if (this[signature] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, signature, buildDefault(this, fragment, true));
            }
            // We do not collapse simple calls on this bucket, which allows
            // frameworks to safely use this without introspection as well as
            // allows decoding error recovery.
            if (this.functions[signature] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.functions, signature, buildDefault(this, fragment, false));
            }
            if (this.callStatic[signature] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.callStatic, signature, buildCall(this, fragment, true));
            }
            if (this.populateTransaction[signature] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.populateTransaction, signature, buildPopulate(this, fragment));
            }
            if (this.estimateGas[signature] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.estimateGas, signature, buildEstimate(this, fragment));
            }
        });
        Object.keys(uniqueNames).forEach((name) => {
            // Ambiguous names to not get attached as bare names
            const signatures = uniqueNames[name];
            if (signatures.length > 1) {
                return;
            }
            const signature = signatures[0];
            // If overwriting a member property that is null, swallow the error
            try {
                if (this[name] == null) {
                    Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, name, this[signature]);
                }
            }
            catch (e) { }
            if (this.functions[name] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.functions, name, this.functions[signature]);
            }
            if (this.callStatic[name] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.callStatic, name, this.callStatic[signature]);
            }
            if (this.populateTransaction[name] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.populateTransaction, name, this.populateTransaction[signature]);
            }
            if (this.estimateGas[name] == null) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this.estimateGas, name, this.estimateGas[signature]);
            }
        });
    }
    static getContractAddress(transaction) {
        return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_3__["getContractAddress"])(transaction);
    }
    static getInterface(contractInterface) {
        if (_ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["Interface"].isInterface(contractInterface)) {
            return contractInterface;
        }
        return new _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["Interface"](contractInterface);
    }
    // @TODO: Allow timeout?
    deployed() {
        return this._deployed();
    }
    _deployed(blockTag) {
        if (!this._deployedPromise) {
            // If we were just deployed, we know the transaction we should occur in
            if (this.deployTransaction) {
                this._deployedPromise = this.deployTransaction.wait().then(() => {
                    return this;
                });
            }
            else {
                // @TODO: Once we allow a timeout to be passed in, we will wait
                // up to that many blocks for getCode
                // Otherwise, poll for our code to be deployed
                this._deployedPromise = this.provider.getCode(this.address, blockTag).then((code) => {
                    if (code === "0x") {
                        logger.throwError("contract not deployed", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                            contractAddress: this.address,
                            operation: "getDeployed"
                        });
                    }
                    return this;
                });
            }
        }
        return this._deployedPromise;
    }
    // @TODO:
    // estimateFallback(overrides?: TransactionRequest): Promise<BigNumber>
    // @TODO:
    // estimateDeploy(bytecode: string, ...args): Promise<BigNumber>
    fallback(overrides) {
        if (!this.signer) {
            logger.throwError("sending a transactions require a signer", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, { operation: "sendTransaction(fallback)" });
        }
        const tx = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["shallowCopy"])(overrides || {});
        ["from", "to"].forEach(function (key) {
            if (tx[key] == null) {
                return;
            }
            logger.throwError("cannot override " + key, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, { operation: key });
        });
        tx.to = this.resolvedAddress;
        return this.deployed().then(() => {
            return this.signer.sendTransaction(tx);
        });
    }
    // Reconnect to a different signer or provider
    connect(signerOrProvider) {
        if (typeof (signerOrProvider) === "string") {
            signerOrProvider = new _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__["VoidSigner"](signerOrProvider, this.provider);
        }
        const contract = new (this.constructor)(this.address, this.interface, signerOrProvider);
        if (this.deployTransaction) {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(contract, "deployTransaction", this.deployTransaction);
        }
        return contract;
    }
    // Re-attach to a different on-chain instance of this contract
    attach(addressOrName) {
        return new (this.constructor)(addressOrName, this.interface, this.signer || this.provider);
    }
    static isIndexed(value) {
        return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["Indexed"].isIndexed(value);
    }
    _normalizeRunningEvent(runningEvent) {
        // Already have an instance of this event running; we can re-use it
        if (this._runningEvents[runningEvent.tag]) {
            return this._runningEvents[runningEvent.tag];
        }
        return runningEvent;
    }
    _getRunningEvent(eventName) {
        if (typeof (eventName) === "string") {
            // Listen for "error" events (if your contract has an error event, include
            // the full signature to bypass this special event keyword)
            if (eventName === "error") {
                return this._normalizeRunningEvent(new ErrorRunningEvent());
            }
            // Listen for any event that is registered
            if (eventName === "event") {
                return this._normalizeRunningEvent(new RunningEvent("event", null));
            }
            // Listen for any event
            if (eventName === "*") {
                return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
            }
            // Get the event Fragment (throws if ambiguous/unknown event)
            const fragment = this.interface.getEvent(eventName);
            return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment));
        }
        // We have topics to filter by...
        if (eventName.topics && eventName.topics.length > 0) {
            // Is it a known topichash? (throws if no matching topichash)
            try {
                const topic = eventName.topics[0];
                if (typeof (topic) !== "string") {
                    throw new Error("invalid topic"); // @TODO: May happen for anonymous events
                }
                const fragment = this.interface.getEvent(topic);
                return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment, eventName.topics));
            }
            catch (error) { }
            // Filter by the unknown topichash
            const filter = {
                address: this.address,
                topics: eventName.topics
            };
            return this._normalizeRunningEvent(new RunningEvent(getEventTag(filter), filter));
        }
        return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
    }
    _checkRunningEvents(runningEvent) {
        if (runningEvent.listenerCount() === 0) {
            delete this._runningEvents[runningEvent.tag];
            // If we have a poller for this, remove it
            const emit = this._wrappedEmits[runningEvent.tag];
            if (emit && runningEvent.filter) {
                this.provider.off(runningEvent.filter, emit);
                delete this._wrappedEmits[runningEvent.tag];
            }
        }
    }
    // Subclasses can override this to gracefully recover
    // from parse errors if they wish
    _wrapEvent(runningEvent, log, listener) {
        const event = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["deepCopy"])(log);
        event.removeListener = () => {
            if (!listener) {
                return;
            }
            runningEvent.removeListener(listener);
            this._checkRunningEvents(runningEvent);
        };
        event.getBlock = () => { return this.provider.getBlock(log.blockHash); };
        event.getTransaction = () => { return this.provider.getTransaction(log.transactionHash); };
        event.getTransactionReceipt = () => { return this.provider.getTransactionReceipt(log.transactionHash); };
        // This may throw if the topics and data mismatch the signature
        runningEvent.prepareEvent(event);
        return event;
    }
    _addEventListener(runningEvent, listener, once) {
        if (!this.provider) {
            logger.throwError("events require a provider or a signer with a provider", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, { operation: "once" });
        }
        runningEvent.addListener(listener, once);
        // Track this running event and its listeners (may already be there; but no hard in updating)
        this._runningEvents[runningEvent.tag] = runningEvent;
        // If we are not polling the provider, start polling
        if (!this._wrappedEmits[runningEvent.tag]) {
            const wrappedEmit = (log) => {
                let event = this._wrapEvent(runningEvent, log, listener);
                // Try to emit the result for the parameterized event...
                if (event.decodeError == null) {
                    try {
                        const args = runningEvent.getEmit(event);
                        this.emit(runningEvent.filter, ...args);
                    }
                    catch (error) {
                        event.decodeError = error.error;
                    }
                }
                // Always emit "event" for fragment-base events
                if (runningEvent.filter != null) {
                    this.emit("event", event);
                }
                // Emit "error" if there was an error
                if (event.decodeError != null) {
                    this.emit("error", event.decodeError, event);
                }
            };
            this._wrappedEmits[runningEvent.tag] = wrappedEmit;
            // Special events, like "error" do not have a filter
            if (runningEvent.filter != null) {
                this.provider.on(runningEvent.filter, wrappedEmit);
            }
        }
    }
    queryFilter(event, fromBlockOrBlockhash, toBlock) {
        const runningEvent = this._getRunningEvent(event);
        const filter = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["shallowCopy"])(runningEvent.filter);
        if (typeof (fromBlockOrBlockhash) === "string" && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_5__["isHexString"])(fromBlockOrBlockhash, 32)) {
            if (toBlock != null) {
                logger.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", toBlock);
            }
            filter.blockHash = fromBlockOrBlockhash;
        }
        else {
            filter.fromBlock = ((fromBlockOrBlockhash != null) ? fromBlockOrBlockhash : 0);
            filter.toBlock = ((toBlock != null) ? toBlock : "latest");
        }
        return this.provider.getLogs(filter).then((logs) => {
            return logs.map((log) => this._wrapEvent(runningEvent, log, null));
        });
    }
    on(event, listener) {
        this._addEventListener(this._getRunningEvent(event), listener, false);
        return this;
    }
    once(event, listener) {
        this._addEventListener(this._getRunningEvent(event), listener, true);
        return this;
    }
    emit(eventName, ...args) {
        if (!this.provider) {
            return false;
        }
        const runningEvent = this._getRunningEvent(eventName);
        const result = (runningEvent.run(args) > 0);
        // May have drained all the "once" events; check for living events
        this._checkRunningEvents(runningEvent);
        return result;
    }
    listenerCount(eventName) {
        if (!this.provider) {
            return 0;
        }
        if (eventName == null) {
            return Object.keys(this._runningEvents).reduce((accum, key) => {
                return accum + this._runningEvents[key].listenerCount();
            }, 0);
        }
        return this._getRunningEvent(eventName).listenerCount();
    }
    listeners(eventName) {
        if (!this.provider) {
            return [];
        }
        if (eventName == null) {
            const result = [];
            for (let tag in this._runningEvents) {
                this._runningEvents[tag].listeners().forEach((listener) => {
                    result.push(listener);
                });
            }
            return result;
        }
        return this._getRunningEvent(eventName).listeners();
    }
    removeAllListeners(eventName) {
        if (!this.provider) {
            return this;
        }
        if (eventName == null) {
            for (const tag in this._runningEvents) {
                const runningEvent = this._runningEvents[tag];
                runningEvent.removeAllListeners();
                this._checkRunningEvents(runningEvent);
            }
            return this;
        }
        // Delete any listeners
        const runningEvent = this._getRunningEvent(eventName);
        runningEvent.removeAllListeners();
        this._checkRunningEvents(runningEvent);
        return this;
    }
    off(eventName, listener) {
        if (!this.provider) {
            return this;
        }
        const runningEvent = this._getRunningEvent(eventName);
        runningEvent.removeListener(listener);
        this._checkRunningEvents(runningEvent);
        return this;
    }
    removeListener(eventName, listener) {
        return this.off(eventName, listener);
    }
}
class Contract extends BaseContract {
}
class ContractFactory {
    constructor(contractInterface, bytecode, signer) {
        let bytecodeHex = null;
        if (typeof (bytecode) === "string") {
            bytecodeHex = bytecode;
        }
        else if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_5__["isBytes"])(bytecode)) {
            bytecodeHex = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_5__["hexlify"])(bytecode);
        }
        else if (bytecode && typeof (bytecode.object) === "string") {
            // Allow the bytecode object from the Solidity compiler
            bytecodeHex = bytecode.object;
        }
        else {
            // Crash in the next verification step
            bytecodeHex = "!";
        }
        // Make sure it is 0x prefixed
        if (bytecodeHex.substring(0, 2) !== "0x") {
            bytecodeHex = "0x" + bytecodeHex;
        }
        // Make sure the final result is valid bytecode
        if (!Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_5__["isHexString"])(bytecodeHex) || (bytecodeHex.length % 2)) {
            logger.throwArgumentError("invalid bytecode", "bytecode", bytecode);
        }
        // If we have a signer, make sure it is valid
        if (signer && !_ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__["Signer"].isSigner(signer)) {
            logger.throwArgumentError("invalid signer", "signer", signer);
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "bytecode", bytecodeHex);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "interface", Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["getStatic"])((new.target), "getInterface")(contractInterface));
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(this, "signer", signer || null);
    }
    // @TODO: Future; rename to populteTransaction?
    getDeployTransaction(...args) {
        let tx = {};
        // If we have 1 additional argument, we allow transaction overrides
        if (args.length === this.interface.deploy.inputs.length + 1 && typeof (args[args.length - 1]) === "object") {
            tx = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["shallowCopy"])(args.pop());
            for (const key in tx) {
                if (!allowedTransactionKeys[key]) {
                    throw new Error("unknown transaction override " + key);
                }
            }
        }
        // Do not allow these to be overridden in a deployment transaction
        ["data", "from", "to"].forEach((key) => {
            if (tx[key] == null) {
                return;
            }
            logger.throwError("cannot override " + key, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, { operation: key });
        });
        if (tx.value) {
            const value = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__["BigNumber"].from(tx.value);
            if (!value.isZero() && !this.interface.deploy.payable) {
                logger.throwError("non-payable constructor cannot override value", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                    operation: "overrides.value",
                    value: tx.value
                });
            }
        }
        // Make sure the call matches the constructor signature
        logger.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
        // Set the data to the bytecode + the encoded constructor arguments
        tx.data = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_5__["hexlify"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_5__["concat"])([
            this.bytecode,
            this.interface.encodeDeploy(args)
        ]));
        return tx;
    }
    deploy(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let overrides = {};
            // If 1 extra parameter was passed in, it contains overrides
            if (args.length === this.interface.deploy.inputs.length + 1) {
                overrides = args.pop();
            }
            // Make sure the call matches the constructor signature
            logger.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
            // Resolve ENS names and promises in the arguments
            const params = yield resolveAddresses(this.signer, args, this.interface.deploy.inputs);
            params.push(overrides);
            // Get the deployment transaction (with optional overrides)
            const unsignedTx = this.getDeployTransaction(...params);
            // Send the deployment transaction
            const tx = yield this.signer.sendTransaction(unsignedTx);
            const address = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["getStatic"])(this.constructor, "getContractAddress")(tx);
            const contract = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["getStatic"])(this.constructor, "getContract")(address, this.interface, this.signer);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_6__["defineReadOnly"])(contract, "deployTransaction", tx);
            return contract;
        });
    }
    attach(address) {
        return (this.constructor).getContract(address, this.interface, this.signer);
    }
    connect(signer) {
        return new (this.constructor)(this.interface, this.bytecode, signer);
    }
    static fromSolidity(compilerOutput, signer) {
        if (compilerOutput == null) {
            logger.throwError("missing compiler output", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.MISSING_ARGUMENT, { argument: "compilerOutput" });
        }
        if (typeof (compilerOutput) === "string") {
            compilerOutput = JSON.parse(compilerOutput);
        }
        const abi = compilerOutput.abi;
        let bytecode = null;
        if (compilerOutput.bytecode) {
            bytecode = compilerOutput.bytecode;
        }
        else if (compilerOutput.evm && compilerOutput.evm.bytecode) {
            bytecode = compilerOutput.evm.bytecode;
        }
        return new this(abi, bytecode, signer);
    }
    static getInterface(contractInterface) {
        return Contract.getInterface(contractInterface);
    }
    static getContractAddress(tx) {
        return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_3__["getContractAddress"])(tx);
    }
    static getContract(address, contractInterface, signer) {
        return new Contract(address, contractInterface, signer);
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "8lrh":
/*!*********************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js ***!
  \*********************************************************************/
/*! exports provided: AnonymousCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnonymousCoder", function() { return AnonymousCoder; });
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");


// Clones the functionality of an existing Coder, but without a localName
class AnonymousCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__["Coder"] {
    constructor(coder) {
        super(coder.name, coder.type, undefined, coder.dynamic);
        this.coder = coder;
    }
    defaultValue() {
        return this.coder.defaultValue();
    }
    encode(writer, value) {
        return this.coder.encode(writer, value);
    }
    decode(reader) {
        return this.coder.decode(reader);
    }
}
//# sourceMappingURL=anonymous.js.map

/***/ }),

/***/ "AQnt":
/*!***************************************************************!*\
  !*** ./node_modules/@ethersproject/networks/lib.esm/index.js ***!
  \***************************************************************/
/*! exports provided: getNetwork */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNetwork", function() { return getNetwork; });
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "P7fB");



const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"](_version__WEBPACK_IMPORTED_MODULE_1__["version"]);
;
function isRenetworkable(value) {
    return (value && typeof (value.renetwork) === "function");
}
function ethDefaultProvider(network) {
    const func = function (providers, options) {
        if (options == null) {
            options = {};
        }
        const providerList = [];
        if (providers.InfuraProvider) {
            try {
                providerList.push(new providers.InfuraProvider(network, options.infura));
            }
            catch (error) { }
        }
        if (providers.EtherscanProvider) {
            try {
                providerList.push(new providers.EtherscanProvider(network, options.etherscan));
            }
            catch (error) { }
        }
        if (providers.AlchemyProvider) {
            try {
                providerList.push(new providers.AlchemyProvider(network, options.alchemy));
            }
            catch (error) { }
        }
        if (providers.PocketProvider) {
            // These networks are currently faulty on Pocket as their
            // network does not handle the Berlin hardfork, which is
            // live on these ones.
            // @TODO: This goes away once Pocket has upgraded their nodes
            const skip = ["goerli", "ropsten", "rinkeby"];
            try {
                const provider = new providers.PocketProvider(network);
                if (provider.network && skip.indexOf(provider.network.name) === -1) {
                    providerList.push(provider);
                }
            }
            catch (error) { }
        }
        if (providers.CloudflareProvider) {
            try {
                providerList.push(new providers.CloudflareProvider(network));
            }
            catch (error) { }
        }
        if (providerList.length === 0) {
            return null;
        }
        if (providers.FallbackProvider) {
            let quorum = 1;
            if (options.quorum != null) {
                quorum = options.quorum;
            }
            else if (network === "homestead") {
                quorum = 2;
            }
            return new providers.FallbackProvider(providerList, quorum);
        }
        return providerList[0];
    };
    func.renetwork = function (network) {
        return ethDefaultProvider(network);
    };
    return func;
}
function etcDefaultProvider(url, network) {
    const func = function (providers, options) {
        if (providers.JsonRpcProvider) {
            return new providers.JsonRpcProvider(url, network);
        }
        return null;
    };
    func.renetwork = function (network) {
        return etcDefaultProvider(url, network);
    };
    return func;
}
const homestead = {
    chainId: 1,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "homestead",
    _defaultProvider: ethDefaultProvider("homestead")
};
const ropsten = {
    chainId: 3,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "ropsten",
    _defaultProvider: ethDefaultProvider("ropsten")
};
const classicMordor = {
    chainId: 63,
    name: "classicMordor",
    _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/mordor", "classicMordor")
};
const networks = {
    unspecified: { chainId: 0, name: "unspecified" },
    homestead: homestead,
    mainnet: homestead,
    morden: { chainId: 2, name: "morden" },
    ropsten: ropsten,
    testnet: ropsten,
    rinkeby: {
        chainId: 4,
        ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
        name: "rinkeby",
        _defaultProvider: ethDefaultProvider("rinkeby")
    },
    kovan: {
        chainId: 42,
        name: "kovan",
        _defaultProvider: ethDefaultProvider("kovan")
    },
    goerli: {
        chainId: 5,
        ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
        name: "goerli",
        _defaultProvider: ethDefaultProvider("goerli")
    },
    // ETC (See: #351)
    classic: {
        chainId: 61,
        name: "classic",
        _defaultProvider: etcDefaultProvider("https:/\/www.ethercluster.com/etc", "classic")
    },
    classicMorden: { chainId: 62, name: "classicMorden" },
    classicMordor: classicMordor,
    classicTestnet: classicMordor,
    classicKotti: {
        chainId: 6,
        name: "classicKotti",
        _defaultProvider: etcDefaultProvider("https:/\/www.ethercluster.com/kotti", "classicKotti")
    },
    xdai: { chainId: 100, name: "xdai" },
    matic: { chainId: 137, name: "matic" },
    maticmum: { chainId: 80001, name: "maticmum" },
    bnb: { chainId: 56, name: "bnb" },
    bnbt: { chainId: 97, name: "bnbt" },
};
/**
 *  getNetwork
 *
 *  Converts a named common networks or chain ID (network ID) to a Network
 *  and verifies a network is a valid Network..
 */
function getNetwork(network) {
    // No network (null)
    if (network == null) {
        return null;
    }
    if (typeof (network) === "number") {
        for (const name in networks) {
            const standard = networks[name];
            if (standard.chainId === network) {
                return {
                    name: standard.name,
                    chainId: standard.chainId,
                    ensAddress: (standard.ensAddress || null),
                    _defaultProvider: (standard._defaultProvider || null)
                };
            }
        }
        return {
            chainId: network,
            name: "unknown"
        };
    }
    if (typeof (network) === "string") {
        const standard = networks[network];
        if (standard == null) {
            return null;
        }
        return {
            name: standard.name,
            chainId: standard.chainId,
            ensAddress: standard.ensAddress,
            _defaultProvider: (standard._defaultProvider || null)
        };
    }
    const standard = networks[network.name];
    // Not a standard network; check that it is a valid network in general
    if (!standard) {
        if (typeof (network.chainId) !== "number") {
            logger.throwArgumentError("invalid network chainId", "network", network);
        }
        return network;
    }
    // Make sure the chainId matches the expected network chainId (or is 0; disable EIP-155)
    if (network.chainId !== 0 && network.chainId !== standard.chainId) {
        logger.throwArgumentError("network chainId mismatch", "network", network);
    }
    // @TODO: In the next major version add an attach function to a defaultProvider
    // class and move the _defaultProvider internal to this file (extend Network)
    let defaultProvider = network._defaultProvider || null;
    if (defaultProvider == null && standard._defaultProvider) {
        if (isRenetworkable(standard._defaultProvider)) {
            defaultProvider = standard._defaultProvider.renetwork(network);
        }
        else {
            defaultProvider = standard._defaultProvider;
        }
    }
    // Standard Network (allow overriding the ENS address)
    return {
        name: network.name,
        chainId: standard.chainId,
        ensAddress: (network.ensAddress || standard.ensAddress || null),
        _defaultProvider: defaultProvider
    };
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "BEEm":
/*!*****************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/array.js ***!
  \*****************************************************************/
/*! exports provided: pack, unpack, ArrayCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pack", function() { return pack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpack", function() { return unpack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayCoder", function() { return ArrayCoder; });
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version */ "EKg+");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");
/* harmony import */ var _anonymous__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./anonymous */ "8lrh");



const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"](_version__WEBPACK_IMPORTED_MODULE_1__["version"]);


function pack(writer, coders, values) {
    let arrayValues = null;
    if (Array.isArray(values)) {
        arrayValues = values;
    }
    else if (values && typeof (values) === "object") {
        let unique = {};
        arrayValues = coders.map((coder) => {
            const name = coder.localName;
            if (!name) {
                logger.throwError("cannot encode object for signature with missing names", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].errors.INVALID_ARGUMENT, {
                    argument: "values",
                    coder: coder,
                    value: values
                });
            }
            if (unique[name]) {
                logger.throwError("cannot encode object for signature with duplicate names", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].errors.INVALID_ARGUMENT, {
                    argument: "values",
                    coder: coder,
                    value: values
                });
            }
            unique[name] = true;
            return values[name];
        });
    }
    else {
        logger.throwArgumentError("invalid tuple value", "tuple", values);
    }
    if (coders.length !== arrayValues.length) {
        logger.throwArgumentError("types/value length mismatch", "tuple", values);
    }
    let staticWriter = new _abstract_coder__WEBPACK_IMPORTED_MODULE_2__["Writer"](writer.wordSize);
    let dynamicWriter = new _abstract_coder__WEBPACK_IMPORTED_MODULE_2__["Writer"](writer.wordSize);
    let updateFuncs = [];
    coders.forEach((coder, index) => {
        let value = arrayValues[index];
        if (coder.dynamic) {
            // Get current dynamic offset (for the future pointer)
            let dynamicOffset = dynamicWriter.length;
            // Encode the dynamic value into the dynamicWriter
            coder.encode(dynamicWriter, value);
            // Prepare to populate the correct offset once we are done
            let updateFunc = staticWriter.writeUpdatableValue();
            updateFuncs.push((baseOffset) => {
                updateFunc(baseOffset + dynamicOffset);
            });
        }
        else {
            coder.encode(staticWriter, value);
        }
    });
    // Backfill all the dynamic offsets, now that we know the static length
    updateFuncs.forEach((func) => { func(staticWriter.length); });
    let length = writer.appendWriter(staticWriter);
    length += writer.appendWriter(dynamicWriter);
    return length;
}
function unpack(reader, coders) {
    let values = [];
    // A reader anchored to this base
    let baseReader = reader.subReader(0);
    coders.forEach((coder) => {
        let value = null;
        if (coder.dynamic) {
            let offset = reader.readValue();
            let offsetReader = baseReader.subReader(offset.toNumber());
            try {
                value = coder.decode(offsetReader);
            }
            catch (error) {
                // Cannot recover from this
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].errors.BUFFER_OVERRUN) {
                    throw error;
                }
                value = error;
                value.baseType = coder.name;
                value.name = coder.localName;
                value.type = coder.type;
            }
        }
        else {
            try {
                value = coder.decode(reader);
            }
            catch (error) {
                // Cannot recover from this
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].errors.BUFFER_OVERRUN) {
                    throw error;
                }
                value = error;
                value.baseType = coder.name;
                value.name = coder.localName;
                value.type = coder.type;
            }
        }
        if (value != undefined) {
            values.push(value);
        }
    });
    // We only output named properties for uniquely named coders
    const uniqueNames = coders.reduce((accum, coder) => {
        const name = coder.localName;
        if (name) {
            if (!accum[name]) {
                accum[name] = 0;
            }
            accum[name]++;
        }
        return accum;
    }, {});
    // Add any named parameters (i.e. tuples)
    coders.forEach((coder, index) => {
        let name = coder.localName;
        if (!name || uniqueNames[name] !== 1) {
            return;
        }
        if (name === "length") {
            name = "_length";
        }
        if (values[name] != null) {
            return;
        }
        const value = values[index];
        if (value instanceof Error) {
            Object.defineProperty(values, name, {
                enumerable: true,
                get: () => { throw value; }
            });
        }
        else {
            values[name] = value;
        }
    });
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value instanceof Error) {
            Object.defineProperty(values, i, {
                enumerable: true,
                get: () => { throw value; }
            });
        }
    }
    return Object.freeze(values);
}
class ArrayCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_2__["Coder"] {
    constructor(coder, length, localName) {
        const type = (coder.type + "[" + (length >= 0 ? length : "") + "]");
        const dynamic = (length === -1 || coder.dynamic);
        super("array", type, localName, dynamic);
        this.coder = coder;
        this.length = length;
    }
    defaultValue() {
        // Verifies the child coder is valid (even if the array is dynamic or 0-length)
        const defaultChild = this.coder.defaultValue();
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(defaultChild);
        }
        return result;
    }
    encode(writer, value) {
        if (!Array.isArray(value)) {
            this._throwError("expected array value", value);
        }
        let count = this.length;
        if (count === -1) {
            count = value.length;
            writer.writeValue(value.length);
        }
        logger.checkArgumentCount(value.length, count, "coder array" + (this.localName ? (" " + this.localName) : ""));
        let coders = [];
        for (let i = 0; i < value.length; i++) {
            coders.push(this.coder);
        }
        return pack(writer, coders, value);
    }
    decode(reader) {
        let count = this.length;
        if (count === -1) {
            count = reader.readValue().toNumber();
            // Check that there is *roughly* enough data to ensure
            // stray random data is not being read as a length. Each
            // slot requires at least 32 bytes for their value (or 32
            // bytes as a link to the data). This could use a much
            // tighter bound, but we are erroring on the side of safety.
            if (count * 32 > reader._data.length) {
                logger.throwError("insufficient data length", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].errors.BUFFER_OVERRUN, {
                    length: reader._data.length,
                    count: count
                });
            }
        }
        let coders = [];
        for (let i = 0; i < count; i++) {
            coders.push(new _anonymous__WEBPACK_IMPORTED_MODULE_3__["AnonymousCoder"](this.coder));
        }
        return reader.coerce(this.name, unpack(reader, coders));
    }
}
//# sourceMappingURL=array.js.map

/***/ }),

/***/ "BOVM":
/*!**************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/pocket-provider.js ***!
  \**************************************************************************/
/*! exports provided: PocketProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PocketProvider", function() { return PocketProvider; });
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "SkWp");
/* harmony import */ var _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./url-json-rpc-provider */ "vzeg");




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"](_version__WEBPACK_IMPORTED_MODULE_2__["version"]);

// These are load-balancer-based applicatoin IDs
const defaultApplicationIds = {
    homestead: "6004bcd10040261633ade990",
    ropsten: "6004bd4d0040261633ade991",
    rinkeby: "6004bda20040261633ade994",
    goerli: "6004bd860040261633ade992",
};
class PocketProvider extends _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_3__["UrlJsonRpcProvider"] {
    constructor(network, apiKey) {
        // We need a bit of creativity in the constructor because
        // Pocket uses different default API keys based on the network
        if (apiKey == null) {
            const n = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["getStatic"])((new.target), "getNetwork")(network);
            if (n) {
                const applicationId = defaultApplicationIds[n.name];
                if (applicationId) {
                    apiKey = {
                        applicationId: applicationId,
                        loadBalancer: true
                    };
                }
            }
            // If there was any issue above, we don't know this network
            if (apiKey == null) {
                logger.throwError("unsupported network", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
            }
        }
        super(network, apiKey);
    }
    static getApiKey(apiKey) {
        // Most API Providers allow null to get the default configuration, but
        // Pocket requires the network to decide the default provider, so we
        // rely on hijacking the constructor to add a sensible default for us
        if (apiKey == null) {
            logger.throwArgumentError("PocketProvider.getApiKey does not support null apiKey", "apiKey", apiKey);
        }
        const apiKeyObj = {
            applicationId: null,
            loadBalancer: false,
            applicationSecretKey: null
        };
        // Parse applicationId and applicationSecretKey
        if (typeof (apiKey) === "string") {
            apiKeyObj.applicationId = apiKey;
        }
        else if (apiKey.applicationSecretKey != null) {
            logger.assertArgument((typeof (apiKey.applicationId) === "string"), "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
            logger.assertArgument((typeof (apiKey.applicationSecretKey) === "string"), "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");
            apiKeyObj.applicationId = apiKey.applicationId;
            apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
            apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
        }
        else if (apiKey.applicationId) {
            logger.assertArgument((typeof (apiKey.applicationId) === "string"), "apiKey.applicationId must be a string", "apiKey.applicationId", apiKey.applicationId);
            apiKeyObj.applicationId = apiKey.applicationId;
            apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
        }
        else {
            logger.throwArgumentError("unsupported PocketProvider apiKey", "apiKey", apiKey);
        }
        return apiKeyObj;
    }
    static getUrl(network, apiKey) {
        let host = null;
        switch (network ? network.name : "unknown") {
            case "homestead":
                host = "eth-mainnet.gateway.pokt.network";
                break;
            case "ropsten":
                host = "eth-ropsten.gateway.pokt.network";
                break;
            case "rinkeby":
                host = "eth-rinkeby.gateway.pokt.network";
                break;
            case "goerli":
                host = "eth-goerli.gateway.pokt.network";
                break;
            default:
                logger.throwError("unsupported network", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }
        let url = null;
        if (apiKey.loadBalancer) {
            url = `https:/\/${host}/v1/lb/${apiKey.applicationId}`;
        }
        else {
            url = `https:/\/${host}/v1/${apiKey.applicationId}`;
        }
        const connection = { url };
        // Initialize empty headers
        connection.headers = {};
        // Apply application secret key
        if (apiKey.applicationSecretKey != null) {
            connection.user = "";
            connection.password = apiKey.applicationSecretKey;
        }
        return connection;
    }
    isCommunityResource() {
        return (this.applicationId === defaultApplicationIds[this.network.name]);
    }
}
//# sourceMappingURL=pocket-provider.js.map

/***/ }),

/***/ "CxN6":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/random/lib.esm/index.js ***!
  \*************************************************************/
/*! exports provided: randomBytes, shuffled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random */ "bkUu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomBytes", function() { return _random__WEBPACK_IMPORTED_MODULE_0__["randomBytes"]; });

/* harmony import */ var _shuffle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shuffle */ "VVP+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shuffled", function() { return _shuffle__WEBPACK_IMPORTED_MODULE_1__["shuffled"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "DC0/":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-en.js ***!
  \******************************************************************/
/*! exports provided: langEn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langEn", function() { return langEn; });
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wordlist */ "vZu+");


const words = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo";
let wordlist = null;
function loadWords(lang) {
    if (wordlist != null) {
        return;
    }
    wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"].check(lang) !== "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60") {
        wordlist = null;
        throw new Error("BIP39 Wordlist for en (English) FAILED");
    }
}
class LangEn extends _wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"] {
    constructor() {
        super("en");
    }
    getWord(index) {
        loadWords(this);
        return wordlist[index];
    }
    getWordIndex(word) {
        loadWords(this);
        return wordlist.indexOf(word);
    }
}
const langEn = new LangEn();
_wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"].register(langEn);

//# sourceMappingURL=lang-en.js.map

/***/ }),

/***/ "EKg+":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/_version.js ***!
  \*************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "abi/5.4.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "EjwI":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/nodesmith-provider.js ***!
  \*****************************************************************************/
/*! exports provided: NodesmithProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodesmithProvider", function() { return NodesmithProvider; });
/* harmony import */ var _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-json-rpc-provider */ "vzeg");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "SkWp");
/* istanbul ignore file */




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"](_version__WEBPACK_IMPORTED_MODULE_2__["version"]);
// Special API key provided by Nodesmith for ethers.js
const defaultApiKey = "ETHERS_JS_SHARED";
class NodesmithProvider extends _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_0__["UrlJsonRpcProvider"] {
    static getApiKey(apiKey) {
        if (apiKey && typeof (apiKey) !== "string") {
            logger.throwArgumentError("invalid apiKey", "apiKey", apiKey);
        }
        return apiKey || defaultApiKey;
    }
    static getUrl(network, apiKey) {
        logger.warn("NodeSmith will be discontinued on 2019-12-20; please migrate to another platform.");
        let host = null;
        switch (network.name) {
            case "homestead":
                host = "https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc";
                break;
            case "ropsten":
                host = "https://ethereum.api.nodesmith.io/v1/ropsten/jsonrpc";
                break;
            case "rinkeby":
                host = "https://ethereum.api.nodesmith.io/v1/rinkeby/jsonrpc";
                break;
            case "goerli":
                host = "https://ethereum.api.nodesmith.io/v1/goerli/jsonrpc";
                break;
            case "kovan":
                host = "https://ethereum.api.nodesmith.io/v1/kovan/jsonrpc";
                break;
            default:
                logger.throwArgumentError("unsupported network", "network", arguments[0]);
        }
        return (host + "?apiKey=" + apiKey);
    }
}
//# sourceMappingURL=nodesmith-provider.js.map

/***/ }),

/***/ "Fc/w":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-cz.js ***!
  \******************************************************************/
/*! exports provided: langCz */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langCz", function() { return langCz; });
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wordlist */ "vZu+");


const words = "AbdikaceAbecedaAdresaAgreseAkceAktovkaAlejAlkoholAmputaceAnanasAndulkaAnekdotaAnketaAntikaAnulovatArchaAroganceAsfaltAsistentAspiraceAstmaAstronomAtlasAtletikaAtolAutobusAzylBabkaBachorBacilBaculkaBadatelBagetaBagrBahnoBakterieBaladaBaletkaBalkonBalonekBalvanBalzaBambusBankomatBarbarBaretBarmanBarokoBarvaBaterkaBatohBavlnaBazalkaBazilikaBazukaBednaBeranBesedaBestieBetonBezinkaBezmocBeztakBicyklBidloBiftekBikinyBilanceBiografBiologBitvaBizonBlahobytBlatouchBlechaBleduleBleskBlikatBliznaBlokovatBlouditBludBobekBobrBodlinaBodnoutBohatostBojkotBojovatBokorysBolestBorecBoroviceBotaBoubelBouchatBoudaBouleBouratBoxerBradavkaBramboraBrankaBratrBreptaBriketaBrkoBrlohBronzBroskevBrunetkaBrusinkaBrzdaBrzyBublinaBubnovatBuchtaBuditelBudkaBudovaBufetBujarostBukviceBuldokBulvaBundaBunkrBurzaButikBuvolBuzolaBydletBylinaBytovkaBzukotCapartCarevnaCedrCeduleCejchCejnCelaCelerCelkemCelniceCeninaCennostCenovkaCentrumCenzorCestopisCetkaChalupaChapadloCharitaChataChechtatChemieChichotChirurgChladChlebaChlubitChmelChmuraChobotChocholChodbaCholeraChomoutChopitChorobaChovChrapotChrlitChrtChrupChtivostChudinaChutnatChvatChvilkaChvostChybaChystatChytitCibuleCigaretaCihelnaCihlaCinkotCirkusCisternaCitaceCitrusCizinecCizostClonaCokolivCouvatCtitelCtnostCudnostCuketaCukrCupotCvaknoutCvalCvikCvrkotCyklistaDalekoDarebaDatelDatumDceraDebataDechovkaDecibelDeficitDeflaceDeklDekretDemokratDepreseDerbyDeskaDetektivDikobrazDiktovatDiodaDiplomDiskDisplejDivadloDivochDlahaDlouhoDluhopisDnesDobroDobytekDocentDochutitDodnesDohledDohodaDohraDojemDojniceDokladDokolaDoktorDokumentDolarDolevaDolinaDomaDominantDomluvitDomovDonutitDopadDopisDoplnitDoposudDoprovodDopustitDorazitDorostDortDosahDoslovDostatekDosudDosytaDotazDotekDotknoutDoufatDoutnatDovozceDozaduDoznatDozorceDrahotaDrakDramatikDravecDrazeDrdolDrobnostDrogerieDrozdDrsnostDrtitDrzostDubenDuchovnoDudekDuhaDuhovkaDusitDusnoDutostDvojiceDvorecDynamitEkologEkonomieElektronElipsaEmailEmiseEmoceEmpatieEpizodaEpochaEpopejEposEsejEsenceEskortaEskymoEtiketaEuforieEvoluceExekuceExkurzeExpediceExplozeExportExtraktFackaFajfkaFakultaFanatikFantazieFarmacieFavoritFazoleFederaceFejetonFenkaFialkaFigurantFilozofFiltrFinanceFintaFixaceFjordFlanelFlirtFlotilaFondFosforFotbalFotkaFotonFrakceFreskaFrontaFukarFunkceFyzikaGalejeGarantGenetikaGeologGilotinaGlazuraGlejtGolemGolfistaGotikaGrafGramofonGranuleGrepGrilGrogGroteskaGumaHadiceHadrHalaHalenkaHanbaHanopisHarfaHarpunaHavranHebkostHejkalHejnoHejtmanHektarHelmaHematomHerecHernaHesloHezkyHistorikHladovkaHlasivkyHlavaHledatHlenHlodavecHlohHloupostHltatHlubinaHluchotaHmatHmotaHmyzHnisHnojivoHnoutHoblinaHobojHochHodinyHodlatHodnotaHodovatHojnostHokejHolinkaHolkaHolubHomoleHonitbaHonoraceHoralHordaHorizontHorkoHorlivecHormonHorninaHoroskopHorstvoHospodaHostinaHotovostHoubaHoufHoupatHouskaHovorHradbaHraniceHravostHrazdaHrbolekHrdinaHrdloHrdostHrnekHrobkaHromadaHrotHroudaHrozenHrstkaHrubostHryzatHubenostHubnoutHudbaHukotHumrHusitaHustotaHvozdHybnostHydrantHygienaHymnaHysterikIdylkaIhnedIkonaIluzeImunitaInfekceInflaceInkasoInovaceInspekceInternetInvalidaInvestorInzerceIronieJablkoJachtaJahodaJakmileJakostJalovecJantarJarmarkJaroJasanJasnoJatkaJavorJazykJedinecJedleJednatelJehlanJekotJelenJelitoJemnostJenomJepiceJeseterJevitJezdecJezeroJinakJindyJinochJiskraJistotaJitrniceJizvaJmenovatJogurtJurtaKabaretKabelKabinetKachnaKadetKadidloKahanKajakKajutaKakaoKaktusKalamitaKalhotyKalibrKalnostKameraKamkolivKamnaKanibalKanoeKantorKapalinaKapelaKapitolaKapkaKapleKapotaKaprKapustaKapybaraKaramelKarotkaKartonKasaKatalogKatedraKauceKauzaKavalecKazajkaKazetaKazivostKdekolivKdesiKedlubenKempKeramikaKinoKlacekKladivoKlamKlapotKlasikaKlaunKlecKlenbaKlepatKlesnoutKlidKlimaKlisnaKloboukKlokanKlopaKloubKlubovnaKlusatKluzkostKmenKmitatKmotrKnihaKnotKoaliceKoberecKobkaKoblihaKobylaKocourKohoutKojenecKokosKoktejlKolapsKoledaKolizeKoloKomandoKometaKomikKomnataKomoraKompasKomunitaKonatKonceptKondiceKonecKonfeseKongresKoninaKonkursKontaktKonzervaKopanecKopieKopnoutKoprovkaKorbelKorektorKormidloKoroptevKorpusKorunaKorytoKorzetKosatecKostkaKotelKotletaKotoulKoukatKoupelnaKousekKouzloKovbojKozaKozorohKrabiceKrachKrajinaKralovatKrasopisKravataKreditKrejcarKresbaKrevetaKriketKritikKrizeKrkavecKrmelecKrmivoKrocanKrokKronikaKropitKroupaKrovkaKrtekKruhadloKrupiceKrutostKrvinkaKrychleKryptaKrystalKrytKudlankaKufrKujnostKuklaKulajdaKulichKulkaKulometKulturaKunaKupodivuKurtKurzorKutilKvalitaKvasinkaKvestorKynologKyselinaKytaraKyticeKytkaKytovecKyvadloLabradorLachtanLadnostLaikLakomecLamelaLampaLanovkaLasiceLasoLasturaLatinkaLavinaLebkaLeckdyLedenLedniceLedovkaLedvinaLegendaLegieLegraceLehceLehkostLehnoutLektvarLenochodLentilkaLepenkaLepidloLetadloLetecLetmoLetokruhLevhartLevitaceLevobokLibraLichotkaLidojedLidskostLihovinaLijavecLilekLimetkaLinieLinkaLinoleumListopadLitinaLitovatLobistaLodivodLogikaLogopedLokalitaLoketLomcovatLopataLopuchLordLososLotrLoudalLouhLoukaLouskatLovecLstivostLucernaLuciferLumpLuskLustraceLviceLyraLyrikaLysinaMadamMadloMagistrMahagonMajetekMajitelMajoritaMakakMakoviceMakrelaMalbaMalinaMalovatMalviceMaminkaMandleMankoMarnostMasakrMaskotMasopustMaticeMatrikaMaturitaMazanecMazivoMazlitMazurkaMdlobaMechanikMeditaceMedovinaMelasaMelounMentolkaMetlaMetodaMetrMezeraMigraceMihnoutMihuleMikinaMikrofonMilenecMilimetrMilostMimikaMincovnaMinibarMinometMinulostMiskaMistrMixovatMladostMlhaMlhovinaMlokMlsatMluvitMnichMnohemMobilMocnostModelkaModlitbaMohylaMokroMolekulaMomentkaMonarchaMonoklMonstrumMontovatMonzunMosazMoskytMostMotivaceMotorkaMotykaMouchaMoudrostMozaikaMozekMozolMramorMravenecMrkevMrtvolaMrzetMrzutostMstitelMudrcMuflonMulatMumieMuniceMusetMutaceMuzeumMuzikantMyslivecMzdaNabouratNachytatNadaceNadbytekNadhozNadobroNadpisNahlasNahnatNahodileNahraditNaivitaNajednouNajistoNajmoutNaklonitNakonecNakrmitNalevoNamazatNamluvitNanometrNaokoNaopakNaostroNapadatNapevnoNaplnitNapnoutNaposledNaprostoNaroditNarubyNarychloNasaditNasekatNaslepoNastatNatolikNavenekNavrchNavzdoryNazvatNebeNechatNeckyNedalekoNedbatNeduhNegaceNehetNehodaNejenNejprveNeklidNelibostNemilostNemocNeochotaNeonkaNepokojNerostNervNesmyslNesouladNetvorNeuronNevinaNezvykleNicotaNijakNikamNikdyNiklNikterakNitroNoclehNohaviceNominaceNoraNorekNositelNosnostNouzeNovinyNovotaNozdraNudaNudleNugetNutitNutnostNutrieNymfaObalObarvitObavaObdivObecObehnatObejmoutObezitaObhajobaObilniceObjasnitObjektObklopitOblastOblekOblibaOblohaObludaObnosObohatitObojekOboutObrazecObrnaObrubaObrysObsahObsluhaObstaratObuvObvazObvinitObvodObvykleObyvatelObzorOcasOcelOcenitOchladitOchotaOchranaOcitnoutOdbojOdbytOdchodOdcizitOdebratOdeslatOdevzdatOdezvaOdhadceOdhoditOdjetOdjinudOdkazOdkoupitOdlivOdlukaOdmlkaOdolnostOdpadOdpisOdploutOdporOdpustitOdpykatOdrazkaOdsouditOdstupOdsunOdtokOdtudOdvahaOdvetaOdvolatOdvracetOdznakOfinaOfsajdOhlasOhniskoOhradaOhrozitOhryzekOkapOkeniceOklikaOknoOkouzlitOkovyOkrasaOkresOkrsekOkruhOkupantOkurkaOkusitOlejninaOlizovatOmakOmeletaOmezitOmladinaOmlouvatOmluvaOmylOnehdyOpakovatOpasekOperaceOpiceOpilostOpisovatOporaOpoziceOpravduOprotiOrbitalOrchestrOrgieOrliceOrlojOrtelOsadaOschnoutOsikaOsivoOslavaOslepitOslnitOslovitOsnovaOsobaOsolitOspalecOstenOstrahaOstudaOstychOsvojitOteplitOtiskOtopOtrhatOtrlostOtrokOtrubyOtvorOvanoutOvarOvesOvlivnitOvoceOxidOzdobaPachatelPacientPadouchPahorekPaktPalandaPalecPalivoPalubaPamfletPamlsekPanenkaPanikaPannaPanovatPanstvoPantoflePaprikaParketaParodiePartaParukaParybaPasekaPasivitaPastelkaPatentPatronaPavoukPaznehtPazourekPeckaPedagogPejsekPekloPelotonPenaltaPendrekPenzePeriskopPeroPestrostPetardaPeticePetrolejPevninaPexesoPianistaPihaPijavicePiklePiknikPilinaPilnostPilulkaPinzetaPipetaPisatelPistolePitevnaPivnicePivovarPlacentaPlakatPlamenPlanetaPlastikaPlatitPlavidloPlazPlechPlemenoPlentaPlesPletivoPlevelPlivatPlnitPlnoPlochaPlodinaPlombaPloutPlukPlynPobavitPobytPochodPocitPoctivecPodatPodcenitPodepsatPodhledPodivitPodkladPodmanitPodnikPodobaPodporaPodrazPodstataPodvodPodzimPoeziePohankaPohnutkaPohovorPohromaPohybPointaPojistkaPojmoutPokazitPoklesPokojPokrokPokutaPokynPolednePolibekPolknoutPolohaPolynomPomaluPominoutPomlkaPomocPomstaPomysletPonechatPonorkaPonurostPopadatPopelPopisekPoplachPoprositPopsatPopudPoradcePorcePorodPoruchaPoryvPosaditPosedPosilaPoskokPoslanecPosouditPospoluPostavaPosudekPosypPotahPotkanPotleskPotomekPotravaPotupaPotvoraPoukazPoutoPouzdroPovahaPovidlaPovlakPovozPovrchPovstatPovykPovzdechPozdravPozemekPoznatekPozorPozvatPracovatPrahoryPraktikaPralesPraotecPraporekPrasePravdaPrincipPrknoProbuditProcentoProdejProfeseProhraProjektProlomitPromilePronikatPropadProrokProsbaProtonProutekProvazPrskavkaPrstenPrudkostPrutPrvekPrvohoryPsanecPsovodPstruhPtactvoPubertaPuchPudlPukavecPuklinaPukrlePultPumpaPuncPupenPusaPusinkaPustinaPutovatPutykaPyramidaPyskPytelRacekRachotRadiaceRadniceRadonRaftRagbyRaketaRakovinaRamenoRampouchRandeRarachRaritaRasovnaRastrRatolestRazanceRazidloReagovatReakceReceptRedaktorReferentReflexRejnokReklamaRekordRekrutRektorReputaceRevizeRevmaRevolverRezervaRiskovatRizikoRobotikaRodokmenRohovkaRokleRokokoRomanetoRopovodRopuchaRorejsRosolRostlinaRotmistrRotopedRotundaRoubenkaRouchoRoupRouraRovinaRovniceRozborRozchodRozdatRozeznatRozhodceRozinkaRozjezdRozkazRozlohaRozmarRozpadRozruchRozsahRoztokRozumRozvodRubrikaRuchadloRukaviceRukopisRybaRybolovRychlostRydloRypadloRytinaRyzostSadistaSahatSakoSamecSamizdatSamotaSanitkaSardinkaSasankaSatelitSazbaSazeniceSborSchovatSebrankaSeceseSedadloSedimentSedloSehnatSejmoutSekeraSektaSekundaSekvojeSemenoSenoServisSesaditSeshoraSeskokSeslatSestraSesuvSesypatSetbaSetinaSetkatSetnoutSetrvatSeverSeznamShodaShrnoutSifonSilniceSirkaSirotekSirupSituaceSkafandrSkaliskoSkanzenSkautSkeptikSkicaSkladbaSkleniceSkloSkluzSkobaSkokanSkoroSkriptaSkrzSkupinaSkvostSkvrnaSlabikaSladidloSlaninaSlastSlavnostSledovatSlepecSlevaSlezinaSlibSlinaSlizniceSlonSloupekSlovoSluchSluhaSlunceSlupkaSlzaSmaragdSmetanaSmilstvoSmlouvaSmogSmradSmrkSmrtkaSmutekSmyslSnadSnahaSnobSobotaSochaSodovkaSokolSopkaSotvaSoubojSoucitSoudceSouhlasSouladSoumrakSoupravaSousedSoutokSouvisetSpalovnaSpasitelSpisSplavSpodekSpojenecSpoluSponzorSpornostSpoustaSprchaSpustitSrandaSrazSrdceSrnaSrnecSrovnatSrpenSrstSrubStaniceStarostaStatikaStavbaStehnoStezkaStodolaStolekStopaStornoStoupatStrachStresStrhnoutStromStrunaStudnaStupniceStvolStykSubjektSubtropySucharSudostSuknoSundatSunoutSurikataSurovinaSvahSvalstvoSvetrSvatbaSvazekSvisleSvitekSvobodaSvodidloSvorkaSvrabSykavkaSykotSynekSynovecSypatSypkostSyrovostSyselSytostTabletkaTabuleTahounTajemnoTajfunTajgaTajitTajnostTaktikaTamhleTamponTancovatTanecTankerTapetaTaveninaTazatelTechnikaTehdyTekutinaTelefonTemnotaTendenceTenistaTenorTeplotaTepnaTeprveTerapieTermoskaTextilTichoTiskopisTitulekTkadlecTkaninaTlapkaTleskatTlukotTlupaTmelToaletaTopinkaTopolTorzoTouhaToulecTradiceTraktorTrampTrasaTraverzaTrefitTrestTrezorTrhavinaTrhlinaTrochuTrojiceTroskaTroubaTrpceTrpitelTrpkostTrubecTruchlitTruhliceTrusTrvatTudyTuhnoutTuhostTundraTuristaTurnajTuzemskoTvarohTvorbaTvrdostTvrzTygrTykevUbohostUbozeUbratUbrousekUbrusUbytovnaUchoUctivostUdivitUhraditUjednatUjistitUjmoutUkazatelUklidnitUklonitUkotvitUkrojitUliceUlitaUlovitUmyvadloUnavitUniformaUniknoutUpadnoutUplatnitUplynoutUpoutatUpravitUranUrazitUsednoutUsilovatUsmrtitUsnadnitUsnoutUsouditUstlatUstrnoutUtahovatUtkatUtlumitUtonoutUtopenecUtrousitUvalitUvolnitUvozovkaUzdravitUzelUzeninaUzlinaUznatVagonValchaValounVanaVandalVanilkaVaranVarhanyVarovatVcelkuVchodVdovaVedroVegetaceVejceVelbloudVeletrhVelitelVelmocVelrybaVenkovVerandaVerzeVeselkaVeskrzeVesniceVespoduVestaVeterinaVeverkaVibraceVichrVideohraVidinaVidleVilaViniceVisetVitalitaVizeVizitkaVjezdVkladVkusVlajkaVlakVlasecVlevoVlhkostVlivVlnovkaVloupatVnucovatVnukVodaVodivostVodoznakVodstvoVojenskyVojnaVojskoVolantVolbaVolitVolnoVoskovkaVozidloVozovnaVpravoVrabecVracetVrahVrataVrbaVrcholekVrhatVrstvaVrtuleVsaditVstoupitVstupVtipVybavitVybratVychovatVydatVydraVyfotitVyhledatVyhnoutVyhoditVyhraditVyhubitVyjasnitVyjetVyjmoutVyklopitVykonatVylekatVymazatVymezitVymizetVymysletVynechatVynikatVynutitVypadatVyplatitVypravitVypustitVyrazitVyrovnatVyrvatVyslovitVysokoVystavitVysunoutVysypatVytasitVytesatVytratitVyvinoutVyvolatVyvrhelVyzdobitVyznatVzaduVzbuditVzchopitVzdorVzduchVzdychatVzestupVzhledemVzkazVzlykatVznikVzorekVzpouraVztahVztekXylofonZabratZabydletZachovatZadarmoZadusitZafoukatZahltitZahoditZahradaZahynoutZajatecZajetZajistitZaklepatZakoupitZalepitZamezitZamotatZamysletZanechatZanikatZaplatitZapojitZapsatZarazitZastavitZasunoutZatajitZatemnitZatknoutZaujmoutZavalitZaveletZavinitZavolatZavrtatZazvonitZbavitZbrusuZbudovatZbytekZdalekaZdarmaZdatnostZdivoZdobitZdrojZdvihZdymadloZeleninaZemanZeminaZeptatZezaduZezdolaZhatitZhltnoutZhlubokaZhotovitZhrubaZimaZimniceZjemnitZklamatZkoumatZkratkaZkumavkaZlatoZlehkaZlobaZlomZlostZlozvykZmapovatZmarZmatekZmijeZmizetZmocnitZmodratZmrzlinaZmutovatZnakZnalostZnamenatZnovuZobrazitZotavitZoubekZoufaleZploditZpomalitZpravaZprostitZprudkaZprvuZradaZranitZrcadloZrnitostZrnoZrovnaZrychlitZrzavostZtichaZtratitZubovinaZubrZvednoutZvenkuZveselaZvonZvratZvukovodZvyk";
let wordlist = null;
function loadWords(lang) {
    if (wordlist != null) {
        return;
    }
    wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"].check(lang) !== "0x25f44555f4af25b51a711136e1c7d6e50ce9f8917d39d6b1f076b2bb4d2fac1a") {
        wordlist = null;
        throw new Error("BIP39 Wordlist for en (English) FAILED");
    }
}
class LangCz extends _wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"] {
    constructor() {
        super("cz");
    }
    getWord(index) {
        loadWords(this);
        return wordlist[index];
    }
    getWordIndex(word) {
        loadWords(this);
        return wordlist.indexOf(word);
    }
}
const langCz = new LangCz();
_wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"].register(langCz);

//# sourceMappingURL=lang-cz.js.map

/***/ }),

/***/ "GAgr":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/_version.js ***!
  \*******************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "wordlists/5.4.0";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "IHuh":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/base64/lib.esm/base64.js ***!
  \**************************************************************/
/*! exports provided: decode, encode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");


function decode(textData) {
    textData = atob(textData);
    const data = [];
    for (let i = 0; i < textData.length; i++) {
        data.push(textData.charCodeAt(i));
    }
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(data);
}
function encode(data) {
    data = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(data);
    let textData = "";
    for (let i = 0; i < data.length; i++) {
        textData += String.fromCharCode(data[i]);
    }
    return btoa(textData);
}
//# sourceMappingURL=base64.js.map

/***/ }),

/***/ "Id5K":
/*!***********************************************************!*\
  !*** ./node_modules/@ethersproject/web/lib.esm/geturl.js ***!
  \***********************************************************/
/*! exports provided: getUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUrl", function() { return getUrl; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function getUrl(href, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options == null) {
            options = {};
        }
        const request = {
            method: (options.method || "GET"),
            headers: (options.headers || {}),
            body: (options.body || undefined),
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            redirect: "follow",
            referrer: "client", // no-referrer, *client
        };
        const response = yield fetch(href, request);
        const body = yield response.arrayBuffer();
        const headers = {};
        if (response.headers.forEach) {
            response.headers.forEach((value, key) => {
                headers[key.toLowerCase()] = value;
            });
        }
        else {
            ((response.headers).keys)().forEach((key) => {
                headers[key.toLowerCase()] = response.headers.get(key);
            });
        }
        return {
            headers: headers,
            statusCode: response.status,
            statusMessage: response.statusText,
            body: Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(new Uint8Array(body)),
        };
    });
}
//# sourceMappingURL=geturl.js.map

/***/ }),

/***/ "JB2R":
/*!******************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/cloudflare-provider.js ***!
  \******************************************************************************/
/*! exports provided: CloudflareProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudflareProvider", function() { return CloudflareProvider; });
/* harmony import */ var _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-json-rpc-provider */ "vzeg");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "SkWp");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"](_version__WEBPACK_IMPORTED_MODULE_2__["version"]);
class CloudflareProvider extends _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_0__["UrlJsonRpcProvider"] {
    static getApiKey(apiKey) {
        if (apiKey != null) {
            logger.throwArgumentError("apiKey not supported for cloudflare", "apiKey", apiKey);
        }
        return null;
    }
    static getUrl(network, apiKey) {
        let host = null;
        switch (network.name) {
            case "homestead":
                host = "https://cloudflare-eth.com/";
                break;
            default:
                logger.throwArgumentError("unsupported network", "network", arguments[0]);
        }
        return host;
    }
    perform(method, params) {
        const _super = Object.create(null, {
            perform: { get: () => super.perform }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // The Cloudflare provider does not support eth_blockNumber,
            // so we get the latest block and pull it from that
            if (method === "getBlockNumber") {
                const block = yield _super.perform.call(this, "getBlock", { blockTag: "latest" });
                return block.number;
            }
            return _super.perform.call(this, method, params);
        });
    }
}
//# sourceMappingURL=cloudflare-provider.js.map

/***/ }),

/***/ "JgbS":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/index.js ***!
  \****************************************************************/
/*! exports provided: Provider, BaseProvider, Resolver, UrlJsonRpcProvider, FallbackProvider, AlchemyProvider, AlchemyWebSocketProvider, CloudflareProvider, EtherscanProvider, InfuraProvider, InfuraWebSocketProvider, JsonRpcProvider, JsonRpcBatchProvider, NodesmithProvider, PocketProvider, StaticJsonRpcProvider, Web3Provider, WebSocketProvider, IpcProvider, JsonRpcSigner, getDefaultProvider, getNetwork, isCommunityResource, isCommunityResourcable, showThrottleMessage, Formatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultProvider", function() { return getDefaultProvider; });
/* harmony import */ var _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/abstract-provider */ "7aoe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_0__["Provider"]; });

/* harmony import */ var _ethersproject_networks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/networks */ "AQnt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNetwork", function() { return _ethersproject_networks__WEBPACK_IMPORTED_MODULE_1__["getNetwork"]; });

/* harmony import */ var _base_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base-provider */ "vHmw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseProvider", function() { return _base_provider__WEBPACK_IMPORTED_MODULE_2__["BaseProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Resolver", function() { return _base_provider__WEBPACK_IMPORTED_MODULE_2__["Resolver"]; });

/* harmony import */ var _alchemy_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alchemy-provider */ "23j5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlchemyProvider", function() { return _alchemy_provider__WEBPACK_IMPORTED_MODULE_3__["AlchemyProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlchemyWebSocketProvider", function() { return _alchemy_provider__WEBPACK_IMPORTED_MODULE_3__["AlchemyWebSocketProvider"]; });

/* harmony import */ var _cloudflare_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cloudflare-provider */ "JB2R");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CloudflareProvider", function() { return _cloudflare_provider__WEBPACK_IMPORTED_MODULE_4__["CloudflareProvider"]; });

/* harmony import */ var _etherscan_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./etherscan-provider */ "isBc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EtherscanProvider", function() { return _etherscan_provider__WEBPACK_IMPORTED_MODULE_5__["EtherscanProvider"]; });

/* harmony import */ var _fallback_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fallback-provider */ "gey2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FallbackProvider", function() { return _fallback_provider__WEBPACK_IMPORTED_MODULE_6__["FallbackProvider"]; });

/* harmony import */ var _ipc_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ipc-provider */ "PWjy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IpcProvider", function() { return _ipc_provider__WEBPACK_IMPORTED_MODULE_7__["IpcProvider"]; });

/* harmony import */ var _infura_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./infura-provider */ "wfln");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfuraProvider", function() { return _infura_provider__WEBPACK_IMPORTED_MODULE_8__["InfuraProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfuraWebSocketProvider", function() { return _infura_provider__WEBPACK_IMPORTED_MODULE_8__["InfuraWebSocketProvider"]; });

/* harmony import */ var _json_rpc_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./json-rpc-provider */ "PoCP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonRpcProvider", function() { return _json_rpc_provider__WEBPACK_IMPORTED_MODULE_9__["JsonRpcProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonRpcSigner", function() { return _json_rpc_provider__WEBPACK_IMPORTED_MODULE_9__["JsonRpcSigner"]; });

/* harmony import */ var _json_rpc_batch_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./json-rpc-batch-provider */ "Twec");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonRpcBatchProvider", function() { return _json_rpc_batch_provider__WEBPACK_IMPORTED_MODULE_10__["JsonRpcBatchProvider"]; });

/* harmony import */ var _nodesmith_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./nodesmith-provider */ "EjwI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodesmithProvider", function() { return _nodesmith_provider__WEBPACK_IMPORTED_MODULE_11__["NodesmithProvider"]; });

/* harmony import */ var _pocket_provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pocket-provider */ "BOVM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PocketProvider", function() { return _pocket_provider__WEBPACK_IMPORTED_MODULE_12__["PocketProvider"]; });

/* harmony import */ var _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./url-json-rpc-provider */ "vzeg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UrlJsonRpcProvider", function() { return _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_13__["UrlJsonRpcProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticJsonRpcProvider", function() { return _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_13__["StaticJsonRpcProvider"]; });

/* harmony import */ var _web3_provider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./web3-provider */ "2k0X");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Web3Provider", function() { return _web3_provider__WEBPACK_IMPORTED_MODULE_14__["Web3Provider"]; });

/* harmony import */ var _websocket_provider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./websocket-provider */ "e2Sn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebSocketProvider", function() { return _websocket_provider__WEBPACK_IMPORTED_MODULE_15__["WebSocketProvider"]; });

/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./formatter */ "fwYn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isCommunityResource", function() { return _formatter__WEBPACK_IMPORTED_MODULE_16__["isCommunityResource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isCommunityResourcable", function() { return _formatter__WEBPACK_IMPORTED_MODULE_16__["isCommunityResourcable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "showThrottleMessage", function() { return _formatter__WEBPACK_IMPORTED_MODULE_16__["showThrottleMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Formatter", function() { return _formatter__WEBPACK_IMPORTED_MODULE_16__["Formatter"]; });

/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./_version */ "SkWp");




















const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_17__["Logger"](_version__WEBPACK_IMPORTED_MODULE_18__["version"]);
////////////////////////
// Helper Functions
function getDefaultProvider(network, options) {
    if (network == null) {
        network = "homestead";
    }
    // If passed a URL, figure out the right type of provider based on the scheme
    if (typeof (network) === "string") {
        // @TODO: Add support for IpcProvider; maybe if it ends in ".ipc"?
        // Handle http and ws (and their secure variants)
        const match = network.match(/^(ws|http)s?:/i);
        if (match) {
            switch (match[1]) {
                case "http":
                    return new _json_rpc_provider__WEBPACK_IMPORTED_MODULE_9__["JsonRpcProvider"](network);
                case "ws":
                    return new _websocket_provider__WEBPACK_IMPORTED_MODULE_15__["WebSocketProvider"](network);
                default:
                    logger.throwArgumentError("unsupported URL scheme", "network", network);
            }
        }
    }
    const n = Object(_ethersproject_networks__WEBPACK_IMPORTED_MODULE_1__["getNetwork"])(network);
    if (!n || !n._defaultProvider) {
        logger.throwError("unsupported getDefaultProvider network", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_17__["Logger"].errors.NETWORK_ERROR, {
            operation: "getDefaultProvider",
            network: network
        });
    }
    return n._defaultProvider({
        FallbackProvider: _fallback_provider__WEBPACK_IMPORTED_MODULE_6__["FallbackProvider"],
        AlchemyProvider: _alchemy_provider__WEBPACK_IMPORTED_MODULE_3__["AlchemyProvider"],
        CloudflareProvider: _cloudflare_provider__WEBPACK_IMPORTED_MODULE_4__["CloudflareProvider"],
        EtherscanProvider: _etherscan_provider__WEBPACK_IMPORTED_MODULE_5__["EtherscanProvider"],
        InfuraProvider: _infura_provider__WEBPACK_IMPORTED_MODULE_8__["InfuraProvider"],
        JsonRpcProvider: _json_rpc_provider__WEBPACK_IMPORTED_MODULE_9__["JsonRpcProvider"],
        NodesmithProvider: _nodesmith_provider__WEBPACK_IMPORTED_MODULE_11__["NodesmithProvider"],
        PocketProvider: _pocket_provider__WEBPACK_IMPORTED_MODULE_12__["PocketProvider"],
        Web3Provider: _web3_provider__WEBPACK_IMPORTED_MODULE_14__["Web3Provider"],
        IpcProvider: _ipc_provider__WEBPACK_IMPORTED_MODULE_7__["IpcProvider"],
    }, options);
}
////////////////////////
// Exports

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "KIrq":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/wallet/lib.esm/index.js ***!
  \*************************************************************/
/*! exports provided: Wallet, verifyMessage, verifyTypedData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return Wallet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyMessage", function() { return verifyMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyTypedData", function() { return verifyTypedData; });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");
/* harmony import */ var _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/abstract-provider */ "7aoe");
/* harmony import */ var _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/abstract-signer */ "fKWB");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/hash */ "fQvb");
/* harmony import */ var _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/hdnode */ "8AIR");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/keccak256 */ "b1pR");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_random__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/random */ "CxN6");
/* harmony import */ var _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/signing-key */ "rhxT");
/* harmony import */ var _ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/json-wallets */ "zkI0");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ethersproject/transactions */ "WsP5");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_version */ "NPlM");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"](_version__WEBPACK_IMPORTED_MODULE_13__["version"]);
function isAccount(value) {
    return (value != null && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["isHexString"])(value.privateKey, 32) && value.address != null);
}
function hasMnemonic(value) {
    const mnemonic = value.mnemonic;
    return (mnemonic && mnemonic.phrase);
}
class Wallet extends _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__["Signer"] {
    constructor(privateKey, provider) {
        logger.checkNew(new.target, Wallet);
        super();
        if (isAccount(privateKey)) {
            const signingKey = new _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_9__["SigningKey"](privateKey.privateKey);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "_signingKey", () => signingKey);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "address", Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_11__["computeAddress"])(this.publicKey));
            if (this.address !== Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(privateKey.address)) {
                logger.throwArgumentError("privateKey/address mismatch", "privateKey", "[REDACTED]");
            }
            if (hasMnemonic(privateKey)) {
                const srcMnemonic = privateKey.mnemonic;
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "_mnemonic", () => ({
                    phrase: srcMnemonic.phrase,
                    path: srcMnemonic.path || _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_5__["defaultPath"],
                    locale: srcMnemonic.locale || "en"
                }));
                const mnemonic = this.mnemonic;
                const node = _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_5__["HDNode"].fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path);
                if (Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_11__["computeAddress"])(node.privateKey) !== this.address) {
                    logger.throwArgumentError("mnemonic/address mismatch", "privateKey", "[REDACTED]");
                }
            }
            else {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "_mnemonic", () => null);
            }
        }
        else {
            if (_ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_9__["SigningKey"].isSigningKey(privateKey)) {
                /* istanbul ignore if */
                if (privateKey.curve !== "secp256k1") {
                    logger.throwArgumentError("unsupported curve; must be secp256k1", "privateKey", "[REDACTED]");
                }
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "_signingKey", () => privateKey);
            }
            else {
                // A lot of common tools do not prefix private keys with a 0x (see: #1166)
                if (typeof (privateKey) === "string") {
                    if (privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
                        privateKey = "0x" + privateKey;
                    }
                }
                const signingKey = new _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_9__["SigningKey"](privateKey);
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "_signingKey", () => signingKey);
            }
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "_mnemonic", () => null);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "address", Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_11__["computeAddress"])(this.publicKey));
        }
        /* istanbul ignore if */
        if (provider && !_ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_1__["Provider"].isProvider(provider)) {
            logger.throwArgumentError("invalid provider", "provider", provider);
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "provider", provider || null);
    }
    get mnemonic() { return this._mnemonic(); }
    get privateKey() { return this._signingKey().privateKey; }
    get publicKey() { return this._signingKey().publicKey; }
    getAddress() {
        return Promise.resolve(this.address);
    }
    connect(provider) {
        return new Wallet(this, provider);
    }
    signTransaction(transaction) {
        return Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])(transaction).then((tx) => {
            if (tx.from != null) {
                if (Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(tx.from) !== this.address) {
                    logger.throwArgumentError("transaction from address mismatch", "transaction.from", transaction.from);
                }
                delete tx.from;
            }
            const signature = this._signingKey().signDigest(Object(_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_6__["keccak256"])(Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_11__["serialize"])(tx)));
            return Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_11__["serialize"])(tx, signature);
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["joinSignature"])(this._signingKey().signDigest(Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_4__["hashMessage"])(message)));
        });
    }
    _signTypedData(domain, types, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // Populate any ENS names
            const populated = yield _ethersproject_hash__WEBPACK_IMPORTED_MODULE_4__["_TypedDataEncoder"].resolveNames(domain, types, value, (name) => {
                if (this.provider == null) {
                    logger.throwError("cannot resolve ENS names without a provider", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNSUPPORTED_OPERATION, {
                        operation: "resolveName",
                        value: name
                    });
                }
                return this.provider.resolveName(name);
            });
            return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["joinSignature"])(this._signingKey().signDigest(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_4__["_TypedDataEncoder"].hash(populated.domain, types, populated.value)));
        });
    }
    encrypt(password, options, progressCallback) {
        if (typeof (options) === "function" && !progressCallback) {
            progressCallback = options;
            options = {};
        }
        if (progressCallback && typeof (progressCallback) !== "function") {
            throw new Error("invalid callback");
        }
        if (!options) {
            options = {};
        }
        return Object(_ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_10__["encryptKeystore"])(this, password, options, progressCallback);
    }
    /**
     *  Static methods to create Wallet instances.
     */
    static createRandom(options) {
        let entropy = Object(_ethersproject_random__WEBPACK_IMPORTED_MODULE_8__["randomBytes"])(16);
        if (!options) {
            options = {};
        }
        if (options.extraEntropy) {
            entropy = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexDataSlice"])(Object(_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_6__["keccak256"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["concat"])([entropy, options.extraEntropy])), 0, 16));
        }
        const mnemonic = Object(_ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_5__["entropyToMnemonic"])(entropy, options.locale);
        return Wallet.fromMnemonic(mnemonic, options.path, options.locale);
    }
    static fromEncryptedJson(json, password, progressCallback) {
        return Object(_ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_10__["decryptJsonWallet"])(json, password, progressCallback).then((account) => {
            return new Wallet(account);
        });
    }
    static fromEncryptedJsonSync(json, password) {
        return new Wallet(Object(_ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_10__["decryptJsonWalletSync"])(json, password));
    }
    static fromMnemonic(mnemonic, path, wordlist) {
        if (!path) {
            path = _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_5__["defaultPath"];
        }
        return new Wallet(_ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_5__["HDNode"].fromMnemonic(mnemonic, null, wordlist).derivePath(path));
    }
}
function verifyMessage(message, signature) {
    return Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_11__["recoverAddress"])(Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_4__["hashMessage"])(message), signature);
}
function verifyTypedData(domain, types, value, signature) {
    return Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_11__["recoverAddress"])(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_4__["_TypedDataEncoder"].hash(domain, types, value), signature);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "LPIR":
/*!************************************************************!*\
  !*** ./node_modules/@ethersproject/basex/lib.esm/index.js ***!
  \************************************************************/
/*! exports provided: BaseX, Base32, Base58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseX", function() { return BaseX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base32", function() { return Base32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base58", function() { return Base58; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/**
 * var basex = require("base-x");
 *
 * This implementation is heavily based on base-x. The main reason to
 * deviate was to prevent the dependency of Buffer.
 *
 * Contributors:
 *
 * base-x encoding
 * Forked from https://github.com/cryptocoinjs/bs58
 * Originally written by Mike Hearn for BitcoinJ
 * Copyright (c) 2011 Google Inc
 * Ported to JavaScript by Stefan Thomas
 * Merged Buffer refactorings from base58-native by Stephen Pair
 * Copyright (c) 2013 BitPay Inc
 *
 * The MIT License (MIT)
 *
 * Copyright base-x contributors (c) 2016
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */


class BaseX {
    constructor(alphabet) {
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "alphabet", alphabet);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "base", alphabet.length);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "_alphabetMap", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "_leader", alphabet.charAt(0));
        // pre-compute lookup table
        for (let i = 0; i < alphabet.length; i++) {
            this._alphabetMap[alphabet.charAt(i)] = i;
        }
    }
    encode(value) {
        let source = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(value);
        if (source.length === 0) {
            return "";
        }
        let digits = [0];
        for (let i = 0; i < source.length; ++i) {
            let carry = source[i];
            for (let j = 0; j < digits.length; ++j) {
                carry += digits[j] << 8;
                digits[j] = carry % this.base;
                carry = (carry / this.base) | 0;
            }
            while (carry > 0) {
                digits.push(carry % this.base);
                carry = (carry / this.base) | 0;
            }
        }
        let string = "";
        // deal with leading zeros
        for (let k = 0; source[k] === 0 && k < source.length - 1; ++k) {
            string += this._leader;
        }
        // convert digits to a string
        for (let q = digits.length - 1; q >= 0; --q) {
            string += this.alphabet[digits[q]];
        }
        return string;
    }
    decode(value) {
        if (typeof (value) !== "string") {
            throw new TypeError("Expected String");
        }
        let bytes = [];
        if (value.length === 0) {
            return new Uint8Array(bytes);
        }
        bytes.push(0);
        for (let i = 0; i < value.length; i++) {
            let byte = this._alphabetMap[value[i]];
            if (byte === undefined) {
                throw new Error("Non-base" + this.base + " character");
            }
            let carry = byte;
            for (let j = 0; j < bytes.length; ++j) {
                carry += bytes[j] * this.base;
                bytes[j] = carry & 0xff;
                carry >>= 8;
            }
            while (carry > 0) {
                bytes.push(carry & 0xff);
                carry >>= 8;
            }
        }
        // deal with leading zeros
        for (let k = 0; value[k] === this._leader && k < value.length - 1; ++k) {
            bytes.push(0);
        }
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(new Uint8Array(bytes.reverse()));
    }
}
const Base32 = new BaseX("abcdefghijklmnopqrstuvwxyz234567");
const Base58 = new BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

//console.log(Base58.decode("Qmd2V777o5XvJbYMeMb8k2nU5f8d3ciUQ5YpYuWhzv8iDj"))
//console.log(Base58.encode(Base58.decode("Qmd2V777o5XvJbYMeMb8k2nU5f8d3ciUQ5YpYuWhzv8iDj")))
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Ls10":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-es.js ***!
  \******************************************************************/
/*! exports provided: langEs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langEs", function() { return langEs; });
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wordlist */ "vZu+");



const words = "A/bacoAbdomenAbejaAbiertoAbogadoAbonoAbortoAbrazoAbrirAbueloAbusoAcabarAcademiaAccesoAccio/nAceiteAcelgaAcentoAceptarA/cidoAclararAcne/AcogerAcosoActivoActoActrizActuarAcudirAcuerdoAcusarAdictoAdmitirAdoptarAdornoAduanaAdultoAe/reoAfectarAficio/nAfinarAfirmarA/gilAgitarAgoni/aAgostoAgotarAgregarAgrioAguaAgudoA/guilaAgujaAhogoAhorroAireAislarAjedrezAjenoAjusteAlacra/nAlambreAlarmaAlbaA/lbumAlcaldeAldeaAlegreAlejarAlertaAletaAlfilerAlgaAlgodo/nAliadoAlientoAlivioAlmaAlmejaAlmi/barAltarAltezaAltivoAltoAlturaAlumnoAlzarAmableAmanteAmapolaAmargoAmasarA/mbarA/mbitoAmenoAmigoAmistadAmorAmparoAmplioAnchoAncianoAnclaAndarAnde/nAnemiaA/nguloAnilloA/nimoAni/sAnotarAntenaAntiguoAntojoAnualAnularAnuncioA~adirA~ejoA~oApagarAparatoApetitoApioAplicarApodoAporteApoyoAprenderAprobarApuestaApuroAradoAra~aArarA/rbitroA/rbolArbustoArchivoArcoArderArdillaArduoA/reaA/ridoAriesArmoni/aArne/sAromaArpaArpo/nArregloArrozArrugaArteArtistaAsaAsadoAsaltoAscensoAsegurarAseoAsesorAsientoAsiloAsistirAsnoAsombroA/speroAstillaAstroAstutoAsumirAsuntoAtajoAtaqueAtarAtentoAteoA/ticoAtletaA/tomoAtraerAtrozAtu/nAudazAudioAugeAulaAumentoAusenteAutorAvalAvanceAvaroAveAvellanaAvenaAvestruzAvio/nAvisoAyerAyudaAyunoAzafra/nAzarAzoteAzu/carAzufreAzulBabaBaborBacheBahi/aBaileBajarBalanzaBalco/nBaldeBambu/BancoBandaBa~oBarbaBarcoBarnizBarroBa/sculaBasto/nBasuraBatallaBateri/aBatirBatutaBau/lBazarBebe/BebidaBelloBesarBesoBestiaBichoBienBingoBlancoBloqueBlusaBoaBobinaBoboBocaBocinaBodaBodegaBoinaBolaBoleroBolsaBombaBondadBonitoBonoBonsa/iBordeBorrarBosqueBoteBoti/nBo/vedaBozalBravoBrazoBrechaBreveBrilloBrincoBrisaBrocaBromaBronceBroteBrujaBruscoBrutoBuceoBucleBuenoBueyBufandaBufo/nBu/hoBuitreBultoBurbujaBurlaBurroBuscarButacaBuzo/nCaballoCabezaCabinaCabraCacaoCada/verCadenaCaerCafe/Cai/daCaima/nCajaCajo/nCalCalamarCalcioCaldoCalidadCalleCalmaCalorCalvoCamaCambioCamelloCaminoCampoCa/ncerCandilCanelaCanguroCanicaCantoCa~aCa~o/nCaobaCaosCapazCapita/nCapoteCaptarCapuchaCaraCarbo/nCa/rcelCaretaCargaCari~oCarneCarpetaCarroCartaCasaCascoCaseroCaspaCastorCatorceCatreCaudalCausaCazoCebollaCederCedroCeldaCe/lebreCelosoCe/lulaCementoCenizaCentroCercaCerdoCerezaCeroCerrarCertezaCe/spedCetroChacalChalecoChampu/ChanclaChapaCharlaChicoChisteChivoChoqueChozaChuletaChuparCiclo/nCiegoCieloCienCiertoCifraCigarroCimaCincoCineCintaCipre/sCircoCiruelaCisneCitaCiudadClamorClanClaroClaseClaveClienteClimaCli/nicaCobreCoccio/nCochinoCocinaCocoCo/digoCodoCofreCogerCoheteCoji/nCojoColaColchaColegioColgarColinaCollarColmoColumnaCombateComerComidaCo/modoCompraCondeConejoCongaConocerConsejoContarCopaCopiaCorazo/nCorbataCorchoCordo/nCoronaCorrerCoserCosmosCostaCra/neoCra/terCrearCrecerCrei/doCremaCri/aCrimenCriptaCrisisCromoCro/nicaCroquetaCrudoCruzCuadroCuartoCuatroCuboCubrirCucharaCuelloCuentoCuerdaCuestaCuevaCuidarCulebraCulpaCultoCumbreCumplirCunaCunetaCuotaCupo/nCu/pulaCurarCuriosoCursoCurvaCutisDamaDanzaDarDardoDa/tilDeberDe/bilDe/cadaDecirDedoDefensaDefinirDejarDelfi/nDelgadoDelitoDemoraDensoDentalDeporteDerechoDerrotaDesayunoDeseoDesfileDesnudoDestinoDesvi/oDetalleDetenerDeudaDi/aDiabloDiademaDiamanteDianaDiarioDibujoDictarDienteDietaDiezDifi/cilDignoDilemaDiluirDineroDirectoDirigirDiscoDise~oDisfrazDivaDivinoDobleDoceDolorDomingoDonDonarDoradoDormirDorsoDosDosisDrago/nDrogaDuchaDudaDueloDue~oDulceDu/oDuqueDurarDurezaDuroE/banoEbrioEcharEcoEcuadorEdadEdicio/nEdificioEditorEducarEfectoEficazEjeEjemploElefanteElegirElementoElevarElipseE/liteElixirElogioEludirEmbudoEmitirEmocio/nEmpateEmpe~oEmpleoEmpresaEnanoEncargoEnchufeEnci/aEnemigoEneroEnfadoEnfermoEnga~oEnigmaEnlaceEnormeEnredoEnsayoEnse~arEnteroEntrarEnvaseEnvi/oE/pocaEquipoErizoEscalaEscenaEscolarEscribirEscudoEsenciaEsferaEsfuerzoEspadaEspejoEspi/aEsposaEspumaEsqui/EstarEsteEstiloEstufaEtapaEternoE/ticaEtniaEvadirEvaluarEventoEvitarExactoExamenExcesoExcusaExentoExigirExilioExistirE/xitoExpertoExplicarExponerExtremoFa/bricaFa/bulaFachadaFa/cilFactorFaenaFajaFaldaFalloFalsoFaltarFamaFamiliaFamosoFarao/nFarmaciaFarolFarsaFaseFatigaFaunaFavorFaxFebreroFechaFelizFeoFeriaFerozFe/rtilFervorFesti/nFiableFianzaFiarFibraFiccio/nFichaFideoFiebreFielFieraFiestaFiguraFijarFijoFilaFileteFilialFiltroFinFincaFingirFinitoFirmaFlacoFlautaFlechaFlorFlotaFluirFlujoFlu/orFobiaFocaFogataFogo/nFolioFolletoFondoFormaForroFortunaForzarFosaFotoFracasoFra/gilFranjaFraseFraudeFrei/rFrenoFresaFri/oFritoFrutaFuegoFuenteFuerzaFugaFumarFuncio/nFundaFurgo/nFuriaFusilFu/tbolFuturoGacelaGafasGaitaGajoGalaGaleri/aGalloGambaGanarGanchoGangaGansoGarajeGarzaGasolinaGastarGatoGavila/nGemeloGemirGenGe/neroGenioGenteGeranioGerenteGermenGestoGiganteGimnasioGirarGiroGlaciarGloboGloriaGolGolfoGolosoGolpeGomaGordoGorilaGorraGotaGoteoGozarGradaGra/ficoGranoGrasaGratisGraveGrietaGrilloGripeGrisGritoGrosorGru/aGruesoGrumoGrupoGuanteGuapoGuardiaGuerraGui/aGui~oGuionGuisoGuitarraGusanoGustarHaberHa/bilHablarHacerHachaHadaHallarHamacaHarinaHazHaza~aHebillaHebraHechoHeladoHelioHembraHerirHermanoHe/roeHervirHieloHierroHi/gadoHigieneHijoHimnoHistoriaHocicoHogarHogueraHojaHombreHongoHonorHonraHoraHormigaHornoHostilHoyoHuecoHuelgaHuertaHuesoHuevoHuidaHuirHumanoHu/medoHumildeHumoHundirHuraca/nHurtoIconoIdealIdiomaI/doloIglesiaIglu/IgualIlegalIlusio/nImagenIma/nImitarImparImperioImponerImpulsoIncapazI/ndiceInerteInfielInformeIngenioInicioInmensoInmuneInnatoInsectoInstanteIntere/sI/ntimoIntuirInu/tilInviernoIraIrisIroni/aIslaIsloteJabali/Jabo/nJamo/nJarabeJardi/nJarraJaulaJazmi/nJefeJeringaJineteJornadaJorobaJovenJoyaJuergaJuevesJuezJugadorJugoJugueteJuicioJuncoJunglaJunioJuntarJu/piterJurarJustoJuvenilJuzgarKiloKoalaLabioLacioLacraLadoLadro/nLagartoLa/grimaLagunaLaicoLamerLa/minaLa/mparaLanaLanchaLangostaLanzaLa/pizLargoLarvaLa/stimaLataLa/texLatirLaurelLavarLazoLealLeccio/nLecheLectorLeerLegio/nLegumbreLejanoLenguaLentoLe~aLeo/nLeopardoLesio/nLetalLetraLeveLeyendaLibertadLibroLicorLi/derLidiarLienzoLigaLigeroLimaLi/miteLimo/nLimpioLinceLindoLi/neaLingoteLinoLinternaLi/quidoLisoListaLiteraLitioLitroLlagaLlamaLlantoLlaveLlegarLlenarLlevarLlorarLloverLluviaLoboLocio/nLocoLocuraLo/gicaLogroLombrizLomoLonjaLoteLuchaLucirLugarLujoLunaLunesLupaLustroLutoLuzMacetaMachoMaderaMadreMaduroMaestroMafiaMagiaMagoMai/zMaldadMaletaMallaMaloMama/MamboMamutMancoMandoManejarMangaManiqui/ManjarManoMansoMantaMa~anaMapaMa/quinaMarMarcoMareaMarfilMargenMaridoMa/rmolMarro/nMartesMarzoMasaMa/scaraMasivoMatarMateriaMatizMatrizMa/ximoMayorMazorcaMechaMedallaMedioMe/dulaMejillaMejorMelenaMelo/nMemoriaMenorMensajeMenteMenu/MercadoMerengueMe/ritoMesMeso/nMetaMeterMe/todoMetroMezclaMiedoMielMiembroMigaMilMilagroMilitarMillo/nMimoMinaMineroMi/nimoMinutoMiopeMirarMisaMiseriaMisilMismoMitadMitoMochilaMocio/nModaModeloMohoMojarMoldeMolerMolinoMomentoMomiaMonarcaMonedaMonjaMontoMo~oMoradaMorderMorenoMorirMorroMorsaMortalMoscaMostrarMotivoMoverMo/vilMozoMuchoMudarMuebleMuelaMuerteMuestraMugreMujerMulaMuletaMultaMundoMu~ecaMuralMuroMu/sculoMuseoMusgoMu/sicaMusloNa/carNacio/nNadarNaipeNaranjaNarizNarrarNasalNatalNativoNaturalNa/useaNavalNaveNavidadNecioNe/ctarNegarNegocioNegroNeo/nNervioNetoNeutroNevarNeveraNichoNidoNieblaNietoNi~ezNi~oNi/tidoNivelNoblezaNocheNo/minaNoriaNormaNorteNotaNoticiaNovatoNovelaNovioNubeNucaNu/cleoNudilloNudoNueraNueveNuezNuloNu/meroNutriaOasisObesoObispoObjetoObraObreroObservarObtenerObvioOcaOcasoOce/anoOchentaOchoOcioOcreOctavoOctubreOcultoOcuparOcurrirOdiarOdioOdiseaOesteOfensaOfertaOficioOfrecerOgroOi/doOi/rOjoOlaOleadaOlfatoOlivoOllaOlmoOlorOlvidoOmbligoOndaOnzaOpacoOpcio/nO/peraOpinarOponerOptarO/pticaOpuestoOracio/nOradorOralO/rbitaOrcaOrdenOrejaO/rganoOrgi/aOrgulloOrienteOrigenOrillaOroOrquestaOrugaOsadi/aOscuroOseznoOsoOstraOto~oOtroOvejaO/vuloO/xidoOxi/genoOyenteOzonoPactoPadrePaellaPa/ginaPagoPai/sPa/jaroPalabraPalcoPaletaPa/lidoPalmaPalomaPalparPanPanalPa/nicoPanteraPa~ueloPapa/PapelPapillaPaquetePararParcelaParedParirParoPa/rpadoParquePa/rrafoPartePasarPaseoPasio/nPasoPastaPataPatioPatriaPausaPautaPavoPayasoPeato/nPecadoPeceraPechoPedalPedirPegarPeinePelarPelda~oPeleaPeligroPellejoPeloPelucaPenaPensarPe~o/nPeo/nPeorPepinoPeque~oPeraPerchaPerderPerezaPerfilPericoPerlaPermisoPerroPersonaPesaPescaPe/simoPesta~aPe/taloPetro/leoPezPezu~aPicarPicho/nPiePiedraPiernaPiezaPijamaPilarPilotoPimientaPinoPintorPinzaPi~aPiojoPipaPirataPisarPiscinaPisoPistaPito/nPizcaPlacaPlanPlataPlayaPlazaPleitoPlenoPlomoPlumaPluralPobrePocoPoderPodioPoemaPoesi/aPoetaPolenPolici/aPolloPolvoPomadaPomeloPomoPompaPonerPorcio/nPortalPosadaPoseerPosiblePostePotenciaPotroPozoPradoPrecozPreguntaPremioPrensaPresoPrevioPrimoPri/ncipePrisio/nPrivarProaProbarProcesoProductoProezaProfesorProgramaProlePromesaProntoPropioPro/ximoPruebaPu/blicoPucheroPudorPuebloPuertaPuestoPulgaPulirPulmo/nPulpoPulsoPumaPuntoPu~alPu~oPupaPupilaPure/QuedarQuejaQuemarQuererQuesoQuietoQui/micaQuinceQuitarRa/banoRabiaRaboRacio/nRadicalRai/zRamaRampaRanchoRangoRapazRa/pidoRaptoRasgoRaspaRatoRayoRazaRazo/nReaccio/nRealidadReba~oReboteRecaerRecetaRechazoRecogerRecreoRectoRecursoRedRedondoReducirReflejoReformaRefra/nRefugioRegaloRegirReglaRegresoRehe/nReinoRei/rRejaRelatoRelevoRelieveRellenoRelojRemarRemedioRemoRencorRendirRentaRepartoRepetirReposoReptilResRescateResinaRespetoRestoResumenRetiroRetornoRetratoReunirReve/sRevistaReyRezarRicoRiegoRiendaRiesgoRifaRi/gidoRigorRinco/nRi~o/nRi/oRiquezaRisaRitmoRitoRizoRobleRoceRociarRodarRodeoRodillaRoerRojizoRojoRomeroRomperRonRoncoRondaRopaRoperoRosaRoscaRostroRotarRubi/RuborRudoRuedaRugirRuidoRuinaRuletaRuloRumboRumorRupturaRutaRutinaSa/badoSaberSabioSableSacarSagazSagradoSalaSaldoSaleroSalirSalmo/nSalo/nSalsaSaltoSaludSalvarSambaSancio/nSandi/aSanearSangreSanidadSanoSantoSapoSaqueSardinaSarte/nSastreSata/nSaunaSaxofo/nSeccio/nSecoSecretoSectaSedSeguirSeisSelloSelvaSemanaSemillaSendaSensorSe~alSe~orSepararSepiaSequi/aSerSerieSermo/nServirSesentaSesio/nSetaSetentaSeveroSexoSextoSidraSiestaSieteSigloSignoSi/labaSilbarSilencioSillaSi/mboloSimioSirenaSistemaSitioSituarSobreSocioSodioSolSolapaSoldadoSoledadSo/lidoSoltarSolucio/nSombraSondeoSonidoSonoroSonrisaSopaSoplarSoporteSordoSorpresaSorteoSoste/nSo/tanoSuaveSubirSucesoSudorSuegraSueloSue~oSuerteSufrirSujetoSulta/nSumarSuperarSuplirSuponerSupremoSurSurcoSure~oSurgirSustoSutilTabacoTabiqueTablaTabu/TacoTactoTajoTalarTalcoTalentoTallaTalo/nTama~oTamborTangoTanqueTapaTapeteTapiaTapo/nTaquillaTardeTareaTarifaTarjetaTarotTarroTartaTatuajeTauroTazaTazo/nTeatroTechoTeclaTe/cnicaTejadoTejerTejidoTelaTele/fonoTemaTemorTemploTenazTenderTenerTenisTensoTeori/aTerapiaTercoTe/rminoTernuraTerrorTesisTesoroTestigoTeteraTextoTezTibioTiburo/nTiempoTiendaTierraTiesoTigreTijeraTildeTimbreTi/midoTimoTintaTi/oTi/picoTipoTiraTiro/nTita/nTi/tereTi/tuloTizaToallaTobilloTocarTocinoTodoTogaToldoTomarTonoTontoToparTopeToqueTo/raxToreroTormentaTorneoToroTorpedoTorreTorsoTortugaTosToscoToserTo/xicoTrabajoTractorTraerTra/ficoTragoTrajeTramoTranceTratoTraumaTrazarTre/bolTreguaTreintaTrenTreparTresTribuTrigoTripaTristeTriunfoTrofeoTrompaTroncoTropaTroteTrozoTrucoTruenoTrufaTuberi/aTuboTuertoTumbaTumorTu/nelTu/nicaTurbinaTurismoTurnoTutorUbicarU/lceraUmbralUnidadUnirUniversoUnoUntarU~aUrbanoUrbeUrgenteUrnaUsarUsuarioU/tilUtopi/aUvaVacaVaci/oVacunaVagarVagoVainaVajillaValeVa/lidoValleValorVa/lvulaVampiroVaraVariarVaro/nVasoVecinoVectorVehi/culoVeinteVejezVelaVeleroVelozVenaVencerVendaVenenoVengarVenirVentaVenusVerVeranoVerboVerdeVeredaVerjaVersoVerterVi/aViajeVibrarVicioVi/ctimaVidaVi/deoVidrioViejoViernesVigorVilVillaVinagreVinoVi~edoVioli/nViralVirgoVirtudVisorVi/speraVistaVitaminaViudoVivazViveroVivirVivoVolca/nVolumenVolverVorazVotarVotoVozVueloVulgarYacerYateYeguaYemaYernoYesoYodoYogaYogurZafiroZanjaZapatoZarzaZonaZorroZumoZurdo";
const lookup = {};
let wordlist = null;
function dropDiacritic(word) {
    _wordlist__WEBPACK_IMPORTED_MODULE_1__["logger"].checkNormalize();
    return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8String"])(Array.prototype.filter.call(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8Bytes"])(word.normalize("NFD").toLowerCase()), (c) => {
        return ((c >= 65 && c <= 90) || (c >= 97 && c <= 123));
    }));
}
function expand(word) {
    const output = [];
    Array.prototype.forEach.call(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8Bytes"])(word), (c) => {
        // Acute accent
        if (c === 47) {
            output.push(204);
            output.push(129);
            // n-tilde
        }
        else if (c === 126) {
            output.push(110);
            output.push(204);
            output.push(131);
        }
        else {
            output.push(c);
        }
    });
    return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8String"])(output);
}
function loadWords(lang) {
    if (wordlist != null) {
        return;
    }
    wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ").map((w) => expand(w));
    wordlist.forEach((word, index) => {
        lookup[dropDiacritic(word)] = index;
    });
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].check(lang) !== "0xf74fb7092aeacdfbf8959557de22098da512207fb9f109cb526994938cf40300") {
        wordlist = null;
        throw new Error("BIP39 Wordlist for es (Spanish) FAILED");
    }
}
class LangEs extends _wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"] {
    constructor() {
        super("es");
    }
    getWord(index) {
        loadWords(this);
        return wordlist[index];
    }
    getWordIndex(word) {
        loadWords(this);
        return lookup[dropDiacritic(word)];
    }
}
const langEs = new LangEs();
_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].register(langEs);

//# sourceMappingURL=lang-es.js.map

/***/ }),

/***/ "N5aZ":
/*!**********************************************************!*\
  !*** ./node_modules/@ethersproject/sha2/lib.esm/sha2.js ***!
  \**********************************************************/
/*! exports provided: ripemd160, sha256, sha512, computeHmac */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ripemd160", function() { return ripemd160; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return sha256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha512", function() { return sha512; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeHmac", function() { return computeHmac; });
/* harmony import */ var hash_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hash.js */ "fZJM");
/* harmony import */ var hash_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hash_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "1Few");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version */ "5kpQ");


//const _ripemd160 = _hash.ripemd160;




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"](_version__WEBPACK_IMPORTED_MODULE_4__["version"]);
function ripemd160(data) {
    return "0x" + (hash_js__WEBPACK_IMPORTED_MODULE_0___default.a.ripemd160().update(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(data)).digest("hex"));
}
function sha256(data) {
    return "0x" + (hash_js__WEBPACK_IMPORTED_MODULE_0___default.a.sha256().update(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(data)).digest("hex"));
}
function sha512(data) {
    return "0x" + (hash_js__WEBPACK_IMPORTED_MODULE_0___default.a.sha512().update(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(data)).digest("hex"));
}
function computeHmac(algorithm, key, data) {
    if (!_types__WEBPACK_IMPORTED_MODULE_2__["SupportedAlgorithm"][algorithm]) {
        logger.throwError("unsupported algorithm " + algorithm, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].errors.UNSUPPORTED_OPERATION, {
            operation: "hmac",
            algorithm: algorithm
        });
    }
    return "0x" + hash_js__WEBPACK_IMPORTED_MODULE_0___default.a.hmac(hash_js__WEBPACK_IMPORTED_MODULE_0___default.a[algorithm], Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(key)).update(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["arrayify"])(data)).digest("hex");
}
//# sourceMappingURL=sha2.js.map

/***/ }),

/***/ "NPlM":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/wallet/lib.esm/_version.js ***!
  \****************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "wallet/5.4.0";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "O8dL":
/*!***************************************************************!*\
  !*** ./node_modules/@ethersproject/units/lib.esm/_version.js ***!
  \***************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "units/5.4.0";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "OM6g":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/contracts/lib.esm/_version.js ***!
  \*******************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "contracts/5.4.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "P7fB":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/networks/lib.esm/_version.js ***!
  \******************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "networks/5.4.2";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "PWjy":
/*!***********************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/ipc-provider.js ***!
  \***********************************************************************/
/*! exports provided: IpcProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IpcProvider", function() { return IpcProvider; });

const IpcProvider = null;

//# sourceMappingURL=ipc-provider.js.map

/***/ }),

/***/ "PoCP":
/*!****************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/json-rpc-provider.js ***!
  \****************************************************************************/
/*! exports provided: JsonRpcSigner, JsonRpcProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonRpcSigner", function() { return JsonRpcSigner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonRpcProvider", function() { return JsonRpcProvider; });
/* harmony import */ var _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/abstract-signer */ "fKWB");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/hash */ "fQvb");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/transactions */ "WsP5");
/* harmony import */ var _ethersproject_web__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/web */ "uvd5");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_version */ "SkWp");
/* harmony import */ var _base_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./base-provider */ "vHmw");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"](_version__WEBPACK_IMPORTED_MODULE_9__["version"]);

const errorGas = ["call", "estimateGas"];
function checkError(method, error, params) {
    // Undo the "convenience" some nodes are attempting to prevent backwards
    // incompatibility; maybe for v6 consider forwarding reverts as errors
    if (method === "call" && error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.SERVER_ERROR) {
        const e = error.error;
        if (e && e.message.match("reverted") && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(e.data)) {
            return e.data;
        }
        logger.throwError("missing revert data in call exception", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.CALL_EXCEPTION, {
            error, data: "0x"
        });
    }
    let message = error.message;
    if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.SERVER_ERROR && error.error && typeof (error.error.message) === "string") {
        message = error.error.message;
    }
    else if (typeof (error.body) === "string") {
        message = error.body;
    }
    else if (typeof (error.responseText) === "string") {
        message = error.responseText;
    }
    message = (message || "").toLowerCase();
    const transaction = params.transaction || params.signedTransaction;
    // "insufficient funds for gas * price + value + cost(data)"
    if (message.match(/insufficient funds|base fee exceeds gas limit/)) {
        logger.throwError("insufficient funds for intrinsic transaction cost", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.INSUFFICIENT_FUNDS, {
            error, method, transaction
        });
    }
    // "nonce too low"
    if (message.match(/nonce too low/)) {
        logger.throwError("nonce has already been used", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.NONCE_EXPIRED, {
            error, method, transaction
        });
    }
    // "replacement transaction underpriced"
    if (message.match(/replacement transaction underpriced/)) {
        logger.throwError("replacement fee too low", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.REPLACEMENT_UNDERPRICED, {
            error, method, transaction
        });
    }
    // "replacement transaction underpriced"
    if (message.match(/only replay-protected/)) {
        logger.throwError("legacy pre-eip-155 transactions not supported", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
            error, method, transaction
        });
    }
    if (errorGas.indexOf(method) >= 0 && message.match(/gas required exceeds allowance|always failing transaction|execution reverted/)) {
        logger.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNPREDICTABLE_GAS_LIMIT, {
            error, method, transaction
        });
    }
    throw error;
}
function timer(timeout) {
    return new Promise(function (resolve) {
        setTimeout(resolve, timeout);
    });
}
function getResult(payload) {
    if (payload.error) {
        // @TODO: not any
        const error = new Error(payload.error.message);
        error.code = payload.error.code;
        error.data = payload.error.data;
        throw error;
    }
    return payload.result;
}
function getLowerCase(value) {
    if (value) {
        return value.toLowerCase();
    }
    return value;
}
const _constructorGuard = {};
class JsonRpcSigner extends _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_0__["Signer"] {
    constructor(constructorGuard, provider, addressOrIndex) {
        logger.checkNew(new.target, JsonRpcSigner);
        super();
        if (constructorGuard !== _constructorGuard) {
            throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["defineReadOnly"])(this, "provider", provider);
        if (addressOrIndex == null) {
            addressOrIndex = 0;
        }
        if (typeof (addressOrIndex) === "string") {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["defineReadOnly"])(this, "_address", this.provider.formatter.address(addressOrIndex));
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["defineReadOnly"])(this, "_index", null);
        }
        else if (typeof (addressOrIndex) === "number") {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["defineReadOnly"])(this, "_index", addressOrIndex);
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["defineReadOnly"])(this, "_address", null);
        }
        else {
            logger.throwArgumentError("invalid address or index", "addressOrIndex", addressOrIndex);
        }
    }
    connect(provider) {
        return logger.throwError("cannot alter JSON-RPC Signer connection", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
            operation: "connect"
        });
    }
    connectUnchecked() {
        return new UncheckedJsonRpcSigner(_constructorGuard, this.provider, this._address || this._index);
    }
    getAddress() {
        if (this._address) {
            return Promise.resolve(this._address);
        }
        return this.provider.send("eth_accounts", []).then((accounts) => {
            if (accounts.length <= this._index) {
                logger.throwError("unknown account #" + this._index, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
                    operation: "getAddress"
                });
            }
            return this.provider.formatter.address(accounts[this._index]);
        });
    }
    sendUncheckedTransaction(transaction) {
        transaction = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["shallowCopy"])(transaction);
        const fromAddress = this.getAddress().then((address) => {
            if (address) {
                address = address.toLowerCase();
            }
            return address;
        });
        // The JSON-RPC for eth_sendTransaction uses 90000 gas; if the user
        // wishes to use this, it is easy to specify explicitly, otherwise
        // we look it up for them.
        if (transaction.gasLimit == null) {
            const estimate = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["shallowCopy"])(transaction);
            estimate.from = fromAddress;
            transaction.gasLimit = this.provider.estimateGas(estimate);
        }
        if (transaction.to != null) {
            transaction.to = Promise.resolve(transaction.to).then((to) => __awaiter(this, void 0, void 0, function* () {
                if (to == null) {
                    return null;
                }
                const address = yield this.provider.resolveName(to);
                if (address == null) {
                    logger.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
                }
                return address;
            }));
        }
        return Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["resolveProperties"])({
            tx: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["resolveProperties"])(transaction),
            sender: fromAddress
        }).then(({ tx, sender }) => {
            if (tx.from != null) {
                if (tx.from.toLowerCase() !== sender) {
                    logger.throwArgumentError("from address mismatch", "transaction", transaction);
                }
            }
            else {
                tx.from = sender;
            }
            const hexTx = this.provider.constructor.hexlifyTransaction(tx, { from: true });
            return this.provider.send("eth_sendTransaction", [hexTx]).then((hash) => {
                return hash;
            }, (error) => {
                return checkError("sendTransaction", error, hexTx);
            });
        });
    }
    signTransaction(transaction) {
        return logger.throwError("signing transactions is unsupported", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNSUPPORTED_OPERATION, {
            operation: "signTransaction"
        });
    }
    sendTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // This cannot be mined any earlier than any recent block
            const blockNumber = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval);
            // Send the transaction
            const hash = yield this.sendUncheckedTransaction(transaction);
            try {
                // Unfortunately, JSON-RPC only provides and opaque transaction hash
                // for a response, and we need the actual transaction, so we poll
                // for it; it should show up very quickly
                return yield Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_7__["poll"])(() => __awaiter(this, void 0, void 0, function* () {
                    const tx = yield this.provider.getTransaction(hash);
                    if (tx === null) {
                        return undefined;
                    }
                    return this.provider._wrapTransaction(tx, hash, blockNumber);
                }), { oncePoll: this.provider });
            }
            catch (error) {
                error.transactionHash = hash;
                throw error;
            }
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = ((typeof (message) === "string") ? Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_5__["toUtf8Bytes"])(message) : message);
            const address = yield this.getAddress();
            // https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
            return yield this.provider.send("eth_sign", [address.toLowerCase(), Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(data)]);
        });
    }
    _signTypedData(domain, types, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // Populate any ENS names (in-place)
            const populated = yield _ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__["_TypedDataEncoder"].resolveNames(domain, types, value, (name) => {
                return this.provider.resolveName(name);
            });
            const address = yield this.getAddress();
            return yield this.provider.send("eth_signTypedData_v4", [
                address.toLowerCase(),
                JSON.stringify(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__["_TypedDataEncoder"].getPayload(populated.domain, types, populated.value))
            ]);
        });
    }
    unlock(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = this.provider;
            const address = yield this.getAddress();
            return provider.send("personal_unlockAccount", [address.toLowerCase(), password, null]);
        });
    }
}
class UncheckedJsonRpcSigner extends JsonRpcSigner {
    sendTransaction(transaction) {
        return this.sendUncheckedTransaction(transaction).then((hash) => {
            return {
                hash: hash,
                nonce: null,
                gasLimit: null,
                gasPrice: null,
                data: null,
                value: null,
                chainId: null,
                confirmations: 0,
                from: null,
                wait: (confirmations) => { return this.provider.waitForTransaction(hash, confirmations); }
            };
        });
    }
}
const allowedTransactionKeys = {
    chainId: true, data: true, gasLimit: true, gasPrice: true, nonce: true, to: true, value: true,
    type: true, accessList: true,
    maxFeePerGas: true, maxPriorityFeePerGas: true
};
class JsonRpcProvider extends _base_provider__WEBPACK_IMPORTED_MODULE_10__["BaseProvider"] {
    constructor(url, network) {
        logger.checkNew(new.target, JsonRpcProvider);
        let networkOrReady = network;
        // The network is unknown, query the JSON-RPC for it
        if (networkOrReady == null) {
            networkOrReady = new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.detectNetwork().then((network) => {
                        resolve(network);
                    }, (error) => {
                        reject(error);
                    });
                }, 0);
            });
        }
        super(networkOrReady);
        // Default URL
        if (!url) {
            url = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["getStatic"])(this.constructor, "defaultUrl")();
        }
        if (typeof (url) === "string") {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["defineReadOnly"])(this, "connection", Object.freeze({
                url: url
            }));
        }
        else {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["defineReadOnly"])(this, "connection", Object.freeze(Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["shallowCopy"])(url)));
        }
        this._nextId = 42;
    }
    get _cache() {
        if (this._eventLoopCache == null) {
            this._eventLoopCache = {};
        }
        return this._eventLoopCache;
    }
    static defaultUrl() {
        return "http:/\/localhost:8545";
    }
    detectNetwork() {
        if (!this._cache["detectNetwork"]) {
            this._cache["detectNetwork"] = this._uncachedDetectNetwork();
            // Clear this cache at the beginning of the next event loop
            setTimeout(() => {
                this._cache["detectNetwork"] = null;
            }, 0);
        }
        return this._cache["detectNetwork"];
    }
    _uncachedDetectNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            yield timer(0);
            let chainId = null;
            try {
                chainId = yield this.send("eth_chainId", []);
            }
            catch (error) {
                try {
                    chainId = yield this.send("net_version", []);
                }
                catch (error) { }
            }
            if (chainId != null) {
                const getNetwork = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["getStatic"])(this.constructor, "getNetwork");
                try {
                    return getNetwork(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(chainId).toNumber());
                }
                catch (error) {
                    return logger.throwError("could not detect network", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.NETWORK_ERROR, {
                        chainId: chainId,
                        event: "invalidNetwork",
                        serverError: error
                    });
                }
            }
            return logger.throwError("could not detect network", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.NETWORK_ERROR, {
                event: "noNetwork"
            });
        });
    }
    getSigner(addressOrIndex) {
        return new JsonRpcSigner(_constructorGuard, this, addressOrIndex);
    }
    getUncheckedSigner(addressOrIndex) {
        return this.getSigner(addressOrIndex).connectUnchecked();
    }
    listAccounts() {
        return this.send("eth_accounts", []).then((accounts) => {
            return accounts.map((a) => this.formatter.address(a));
        });
    }
    send(method, params) {
        const request = {
            method: method,
            params: params,
            id: (this._nextId++),
            jsonrpc: "2.0"
        };
        this.emit("debug", {
            action: "request",
            request: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["deepCopy"])(request),
            provider: this
        });
        // We can expand this in the future to any call, but for now these
        // are the biggest wins and do not require any serializing parameters.
        const cache = (["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0);
        if (cache && this._cache[method]) {
            return this._cache[method];
        }
        const result = Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_7__["fetchJson"])(this.connection, JSON.stringify(request), getResult).then((result) => {
            this.emit("debug", {
                action: "response",
                request: request,
                response: result,
                provider: this
            });
            return result;
        }, (error) => {
            this.emit("debug", {
                action: "response",
                error: error,
                request: request,
                provider: this
            });
            throw error;
        });
        // Cache the fetch, but clear it on the next event loop
        if (cache) {
            this._cache[method] = result;
            setTimeout(() => {
                this._cache[method] = null;
            }, 0);
        }
        return result;
    }
    prepareRequest(method, params) {
        switch (method) {
            case "getBlockNumber":
                return ["eth_blockNumber", []];
            case "getGasPrice":
                return ["eth_gasPrice", []];
            case "getBalance":
                return ["eth_getBalance", [getLowerCase(params.address), params.blockTag]];
            case "getTransactionCount":
                return ["eth_getTransactionCount", [getLowerCase(params.address), params.blockTag]];
            case "getCode":
                return ["eth_getCode", [getLowerCase(params.address), params.blockTag]];
            case "getStorageAt":
                return ["eth_getStorageAt", [getLowerCase(params.address), params.position, params.blockTag]];
            case "sendTransaction":
                return ["eth_sendRawTransaction", [params.signedTransaction]];
            case "getBlock":
                if (params.blockTag) {
                    return ["eth_getBlockByNumber", [params.blockTag, !!params.includeTransactions]];
                }
                else if (params.blockHash) {
                    return ["eth_getBlockByHash", [params.blockHash, !!params.includeTransactions]];
                }
                return null;
            case "getTransaction":
                return ["eth_getTransactionByHash", [params.transactionHash]];
            case "getTransactionReceipt":
                return ["eth_getTransactionReceipt", [params.transactionHash]];
            case "call": {
                const hexlifyTransaction = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["getStatic"])(this.constructor, "hexlifyTransaction");
                return ["eth_call", [hexlifyTransaction(params.transaction, { from: true }), params.blockTag]];
            }
            case "estimateGas": {
                const hexlifyTransaction = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["getStatic"])(this.constructor, "hexlifyTransaction");
                return ["eth_estimateGas", [hexlifyTransaction(params.transaction, { from: true })]];
            }
            case "getLogs":
                if (params.filter && params.filter.address != null) {
                    params.filter.address = getLowerCase(params.filter.address);
                }
                return ["eth_getLogs", [params.filter]];
            default:
                break;
        }
        return null;
    }
    perform(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Legacy networks do not like the type field being passed along (which
            // is fair), so we delete type if it is 0 and a non-EIP-1559 network
            if (method === "call" || method === "estimateGas") {
                const tx = params.transaction;
                if (tx && tx.type != null && _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(tx.type).isZero()) {
                    // If there are no EIP-1559 properties, it might be non-EIP-a559
                    if (tx.maxFeePerGas == null && tx.maxPriorityFeePerGas == null) {
                        const feeData = yield this.getFeeData();
                        if (feeData.maxFeePerGas == null && feeData.maxPriorityFeePerGas == null) {
                            // Network doesn't know about EIP-1559 (and hence type)
                            params = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["shallowCopy"])(params);
                            params.transaction = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["shallowCopy"])(tx);
                            delete params.transaction.type;
                        }
                    }
                }
            }
            const args = this.prepareRequest(method, params);
            if (args == null) {
                logger.throwError(method + " not implemented", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.NOT_IMPLEMENTED, { operation: method });
            }
            try {
                return yield this.send(args[0], args[1]);
            }
            catch (error) {
                return checkError(method, error, params);
            }
        });
    }
    _startEvent(event) {
        if (event.tag === "pending") {
            this._startPending();
        }
        super._startEvent(event);
    }
    _startPending() {
        if (this._pendingFilter != null) {
            return;
        }
        const self = this;
        const pendingFilter = this.send("eth_newPendingTransactionFilter", []);
        this._pendingFilter = pendingFilter;
        pendingFilter.then(function (filterId) {
            function poll() {
                self.send("eth_getFilterChanges", [filterId]).then(function (hashes) {
                    if (self._pendingFilter != pendingFilter) {
                        return null;
                    }
                    let seq = Promise.resolve();
                    hashes.forEach(function (hash) {
                        // @TODO: This should be garbage collected at some point... How? When?
                        self._emitted["t:" + hash.toLowerCase()] = "pending";
                        seq = seq.then(function () {
                            return self.getTransaction(hash).then(function (tx) {
                                self.emit("pending", tx);
                                return null;
                            });
                        });
                    });
                    return seq.then(function () {
                        return timer(1000);
                    });
                }).then(function () {
                    if (self._pendingFilter != pendingFilter) {
                        self.send("eth_uninstallFilter", [filterId]);
                        return;
                    }
                    setTimeout(function () { poll(); }, 0);
                    return null;
                }).catch((error) => { });
            }
            poll();
            return filterId;
        }).catch((error) => { });
    }
    _stopEvent(event) {
        if (event.tag === "pending" && this.listenerCount("pending") === 0) {
            this._pendingFilter = null;
        }
        super._stopEvent(event);
    }
    // Convert an ethers.js transaction into a JSON-RPC transaction
    //  - gasLimit => gas
    //  - All values hexlified
    //  - All numeric values zero-striped
    //  - All addresses are lowercased
    // NOTE: This allows a TransactionRequest, but all values should be resolved
    //       before this is called
    // @TODO: This will likely be removed in future versions and prepareRequest
    //        will be the preferred method for this.
    static hexlifyTransaction(transaction, allowExtra) {
        // Check only allowed properties are given
        const allowed = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["shallowCopy"])(allowedTransactionKeys);
        if (allowExtra) {
            for (const key in allowExtra) {
                if (allowExtra[key]) {
                    allowed[key] = true;
                }
            }
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["checkProperties"])(transaction, allowed);
        const result = {};
        // Some nodes (INFURA ropsten; INFURA mainnet is fine) do not like leading zeros.
        ["gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach(function (key) {
            if (transaction[key] == null) {
                return;
            }
            const value = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexValue"])(transaction[key]);
            if (key === "gasLimit") {
                key = "gas";
            }
            result[key] = value;
        });
        ["from", "to", "data"].forEach(function (key) {
            if (transaction[key] == null) {
                return;
            }
            result[key] = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(transaction[key]);
        });
        if (transaction.accessList) {
            result["accessList"] = Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__["accessListify"])(transaction.accessList);
        }
        return result;
    }
}
//# sourceMappingURL=json-rpc-provider.js.map

/***/ }),

/***/ "QQWL":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js ***!
  \**************************************************************/
/*! exports provided: pbkdf2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pbkdf2", function() { return pbkdf2; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/sha2 */ "ggob");



function pbkdf2(password, salt, iterations, keylen, hashAlgorithm) {
    password = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(password);
    salt = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(salt);
    let hLen;
    let l = 1;
    const DK = new Uint8Array(keylen);
    const block1 = new Uint8Array(salt.length + 4);
    block1.set(salt);
    //salt.copy(block1, 0, 0, salt.length)
    let r;
    let T;
    for (let i = 1; i <= l; i++) {
        //block1.writeUInt32BE(i, salt.length)
        block1[salt.length] = (i >> 24) & 0xff;
        block1[salt.length + 1] = (i >> 16) & 0xff;
        block1[salt.length + 2] = (i >> 8) & 0xff;
        block1[salt.length + 3] = i & 0xff;
        //let U = createHmac(password).update(block1).digest();
        let U = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_1__["computeHmac"])(hashAlgorithm, password, block1));
        if (!hLen) {
            hLen = U.length;
            T = new Uint8Array(hLen);
            l = Math.ceil(keylen / hLen);
            r = keylen - (l - 1) * hLen;
        }
        //U.copy(T, 0, 0, hLen)
        T.set(U);
        for (let j = 1; j < iterations; j++) {
            //U = createHmac(password).update(U).digest();
            U = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_1__["computeHmac"])(hashAlgorithm, password, U));
            for (let k = 0; k < hLen; k++)
                T[k] ^= U[k];
        }
        const destPos = (i - 1) * hLen;
        const len = (i === l ? r : hLen);
        //T.copy(DK, destPos, 0, len)
        DK.set(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(T).slice(0, len), destPos);
    }
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexlify"])(DK);
}
//# sourceMappingURL=pbkdf2.js.map

/***/ }),

/***/ "SHrT":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/ws.js ***!
  \*************************************************************/
/*! exports provided: WebSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocket", function() { return WS; });
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "SkWp");



let WS = null;
try {
    WS = WebSocket;
    if (WS == null) {
        throw new Error("inject please");
    }
}
catch (error) {
    const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"](_version__WEBPACK_IMPORTED_MODULE_1__["version"]);
    WS = function () {
        logger.throwError("WebSockets not supported in this environment", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].errors.UNSUPPORTED_OPERATION, {
            operation: "new WebSocket()"
        });
    };
}
//export default WS;
//module.exports = WS;

//# sourceMappingURL=ws.js.map

/***/ }),

/***/ "SMV3":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/string.js ***!
  \******************************************************************/
/*! exports provided: StringCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringCoder", function() { return StringCoder; });
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytes */ "1n0N");



class StringCoder extends _bytes__WEBPACK_IMPORTED_MODULE_1__["DynamicBytesCoder"] {
    constructor(localName) {
        super("string", localName);
    }
    defaultValue() {
        return "";
    }
    encode(writer, value) {
        return super.encode(writer, Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8Bytes"])(value));
    }
    decode(reader) {
        return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8String"])(super.decode(reader));
    }
}
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "SkWp":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/_version.js ***!
  \*******************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "providers/5.4.5";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "SoSZ":
/*!**********************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/index.js ***!
  \**********************************************************/
/*! exports provided: ConstructorFragment, ErrorFragment, EventFragment, Fragment, FunctionFragment, ParamType, FormatTypes, AbiCoder, defaultAbiCoder, Interface, Indexed, checkResultErrors, LogDescription, TransactionDescription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fragments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fragments */ "wWf6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConstructorFragment", function() { return _fragments__WEBPACK_IMPORTED_MODULE_0__["ConstructorFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorFragment", function() { return _fragments__WEBPACK_IMPORTED_MODULE_0__["ErrorFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventFragment", function() { return _fragments__WEBPACK_IMPORTED_MODULE_0__["EventFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return _fragments__WEBPACK_IMPORTED_MODULE_0__["Fragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FunctionFragment", function() { return _fragments__WEBPACK_IMPORTED_MODULE_0__["FunctionFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParamType", function() { return _fragments__WEBPACK_IMPORTED_MODULE_0__["ParamType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormatTypes", function() { return _fragments__WEBPACK_IMPORTED_MODULE_0__["FormatTypes"]; });

/* harmony import */ var _abi_coder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abi-coder */ "V5Ee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbiCoder", function() { return _abi_coder__WEBPACK_IMPORTED_MODULE_1__["AbiCoder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultAbiCoder", function() { return _abi_coder__WEBPACK_IMPORTED_MODULE_1__["defaultAbiCoder"]; });

/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interface */ "qAdo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return _interface__WEBPACK_IMPORTED_MODULE_2__["Interface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Indexed", function() { return _interface__WEBPACK_IMPORTED_MODULE_2__["Indexed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkResultErrors", function() { return _interface__WEBPACK_IMPORTED_MODULE_2__["checkResultErrors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogDescription", function() { return _interface__WEBPACK_IMPORTED_MODULE_2__["LogDescription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionDescription", function() { return _interface__WEBPACK_IMPORTED_MODULE_2__["TransactionDescription"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Twec":
/*!**********************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/json-rpc-batch-provider.js ***!
  \**********************************************************************************/
/*! exports provided: JsonRpcBatchProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonRpcBatchProvider", function() { return JsonRpcBatchProvider; });
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/web */ "uvd5");
/* harmony import */ var _json_rpc_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./json-rpc-provider */ "PoCP");



// Experimental
class JsonRpcBatchProvider extends _json_rpc_provider__WEBPACK_IMPORTED_MODULE_2__["JsonRpcProvider"] {
    send(method, params) {
        const request = {
            method: method,
            params: params,
            id: (this._nextId++),
            jsonrpc: "2.0"
        };
        if (this._pendingBatch == null) {
            this._pendingBatch = [];
        }
        const inflightRequest = { request, resolve: null, reject: null };
        const promise = new Promise((resolve, reject) => {
            inflightRequest.resolve = resolve;
            inflightRequest.reject = reject;
        });
        this._pendingBatch.push(inflightRequest);
        if (!this._pendingBatchAggregator) {
            // Schedule batch for next event loop + short duration
            this._pendingBatchAggregator = setTimeout(() => {
                // Get teh current batch and clear it, so new requests
                // go into the next batch
                const batch = this._pendingBatch;
                this._pendingBatch = null;
                this._pendingBatchAggregator = null;
                // Get the request as an array of requests
                const request = batch.map((inflight) => inflight.request);
                this.emit("debug", {
                    action: "requestBatch",
                    request: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(request),
                    provider: this
                });
                return Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_1__["fetchJson"])(this.connection, JSON.stringify(request)).then((result) => {
                    this.emit("debug", {
                        action: "response",
                        request: request,
                        response: result,
                        provider: this
                    });
                    // For each result, feed it to the correct Promise, depending
                    // on whether it was a success or error
                    batch.forEach((inflightRequest, index) => {
                        const payload = result[index];
                        if (payload.error) {
                            const error = new Error(payload.error.message);
                            error.code = payload.error.code;
                            error.data = payload.error.data;
                            inflightRequest.reject(error);
                        }
                        else {
                            inflightRequest.resolve(payload.result);
                        }
                    });
                }, (error) => {
                    this.emit("debug", {
                        action: "response",
                        error: error,
                        request: request,
                        provider: this
                    });
                    batch.forEach((inflightRequest) => {
                        inflightRequest.reject(error);
                    });
                });
            }, 10);
        }
        return promise;
    }
}
//# sourceMappingURL=json-rpc-batch-provider.js.map

/***/ }),

/***/ "UTQg":
/*!**************************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js ***!
  \**************************************************************************/
/*! exports provided: checkResultErrors, Coder, Writer, Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkResultErrors", function() { return checkResultErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Coder", function() { return Coder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Writer", function() { return Writer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_version */ "EKg+");






const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"](_version__WEBPACK_IMPORTED_MODULE_4__["version"]);
function checkResultErrors(result) {
    // Find the first error (if any)
    const errors = [];
    const checkErrors = function (path, object) {
        if (!Array.isArray(object)) {
            return;
        }
        for (let key in object) {
            const childPath = path.slice();
            childPath.push(key);
            try {
                checkErrors(childPath, object[key]);
            }
            catch (error) {
                errors.push({ path: childPath, error: error });
            }
        }
    };
    checkErrors([], result);
    return errors;
}
class Coder {
    constructor(name, type, localName, dynamic) {
        // @TODO: defineReadOnly these
        this.name = name;
        this.type = type;
        this.localName = localName;
        this.dynamic = dynamic;
    }
    _throwError(message, value) {
        logger.throwArgumentError(message, this.localName, value);
    }
}
class Writer {
    constructor(wordSize) {
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["defineReadOnly"])(this, "wordSize", wordSize || 32);
        this._data = [];
        this._dataLength = 0;
        this._padding = new Uint8Array(wordSize);
    }
    get data() {
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexConcat"])(this._data);
    }
    get length() { return this._dataLength; }
    _writeData(data) {
        this._data.push(data);
        this._dataLength += data.length;
        return data.length;
    }
    appendWriter(writer) {
        return this._writeData(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["concat"])(writer._data));
    }
    // Arrayish items; padded on the right to wordSize
    writeBytes(value) {
        let bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(value);
        const paddingOffset = bytes.length % this.wordSize;
        if (paddingOffset) {
            bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["concat"])([bytes, this._padding.slice(paddingOffset)]);
        }
        return this._writeData(bytes);
    }
    _getValue(value) {
        let bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(value));
        if (bytes.length > this.wordSize) {
            logger.throwError("value out-of-bounds", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].errors.BUFFER_OVERRUN, {
                length: this.wordSize,
                offset: bytes.length
            });
        }
        if (bytes.length % this.wordSize) {
            bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["concat"])([this._padding.slice(bytes.length % this.wordSize), bytes]);
        }
        return bytes;
    }
    // BigNumberish items; padded on the left to wordSize
    writeValue(value) {
        return this._writeData(this._getValue(value));
    }
    writeUpdatableValue() {
        const offset = this._data.length;
        this._data.push(this._padding);
        this._dataLength += this.wordSize;
        return (value) => {
            this._data[offset] = this._getValue(value);
        };
    }
}
class Reader {
    constructor(data, wordSize, coerceFunc, allowLoose) {
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["defineReadOnly"])(this, "_data", Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(data));
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["defineReadOnly"])(this, "wordSize", wordSize || 32);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["defineReadOnly"])(this, "_coerceFunc", coerceFunc);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["defineReadOnly"])(this, "allowLoose", allowLoose);
        this._offset = 0;
    }
    get data() { return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexlify"])(this._data); }
    get consumed() { return this._offset; }
    // The default Coerce function
    static coerce(name, value) {
        let match = name.match("^u?int([0-9]+)$");
        if (match && parseInt(match[1]) <= 48) {
            value = value.toNumber();
        }
        return value;
    }
    coerce(name, value) {
        if (this._coerceFunc) {
            return this._coerceFunc(name, value);
        }
        return Reader.coerce(name, value);
    }
    _peekBytes(offset, length, loose) {
        let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;
        if (this._offset + alignedLength > this._data.length) {
            if (this.allowLoose && loose && this._offset + length <= this._data.length) {
                alignedLength = length;
            }
            else {
                logger.throwError("data out-of-bounds", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].errors.BUFFER_OVERRUN, {
                    length: this._data.length,
                    offset: this._offset + alignedLength
                });
            }
        }
        return this._data.slice(this._offset, this._offset + alignedLength);
    }
    subReader(offset) {
        return new Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
    }
    readBytes(length, loose) {
        let bytes = this._peekBytes(0, length, !!loose);
        this._offset += bytes.length;
        // @TODO: Make sure the length..end bytes are all 0?
        return bytes.slice(0, length);
    }
    readValue() {
        return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(this.readBytes(this.wordSize));
    }
}
//# sourceMappingURL=abstract-coder.js.map

/***/ }),

/***/ "Ub8o":
/*!**********************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/_version.js ***!
  \**********************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "json-wallets/5.4.0";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "Uvg9":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/pbkdf2/lib.esm/index.js ***!
  \*************************************************************/
/*! exports provided: pbkdf2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pbkdf2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pbkdf2 */ "QQWL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pbkdf2", function() { return _pbkdf2__WEBPACK_IMPORTED_MODULE_0__["pbkdf2"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "V5Ee":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/abi-coder.js ***!
  \**************************************************************/
/*! exports provided: AbiCoder, defaultAbiCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbiCoder", function() { return AbiCoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultAbiCoder", function() { return defaultAbiCoder; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version */ "EKg+");
/* harmony import */ var _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./coders/abstract-coder */ "UTQg");
/* harmony import */ var _coders_address__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./coders/address */ "vae8");
/* harmony import */ var _coders_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coders/array */ "BEEm");
/* harmony import */ var _coders_boolean__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./coders/boolean */ "VNhi");
/* harmony import */ var _coders_bytes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./coders/bytes */ "1n0N");
/* harmony import */ var _coders_fixed_bytes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./coders/fixed-bytes */ "yFKc");
/* harmony import */ var _coders_null__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./coders/null */ "wJhM");
/* harmony import */ var _coders_number__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./coders/number */ "kP66");
/* harmony import */ var _coders_string__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./coders/string */ "SMV3");
/* harmony import */ var _coders_tuple__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./coders/tuple */ "ssiG");
/* harmony import */ var _fragments__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fragments */ "wWf6");

// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__["Logger"](_version__WEBPACK_IMPORTED_MODULE_3__["version"]);











const paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
const paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
class AbiCoder {
    constructor(coerceFunc) {
        logger.checkNew(new.target, AbiCoder);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "coerceFunc", coerceFunc || null);
    }
    _getCoder(param) {
        switch (param.baseType) {
            case "address":
                return new _coders_address__WEBPACK_IMPORTED_MODULE_5__["AddressCoder"](param.name);
            case "bool":
                return new _coders_boolean__WEBPACK_IMPORTED_MODULE_7__["BooleanCoder"](param.name);
            case "string":
                return new _coders_string__WEBPACK_IMPORTED_MODULE_12__["StringCoder"](param.name);
            case "bytes":
                return new _coders_bytes__WEBPACK_IMPORTED_MODULE_8__["BytesCoder"](param.name);
            case "array":
                return new _coders_array__WEBPACK_IMPORTED_MODULE_6__["ArrayCoder"](this._getCoder(param.arrayChildren), param.arrayLength, param.name);
            case "tuple":
                return new _coders_tuple__WEBPACK_IMPORTED_MODULE_13__["TupleCoder"]((param.components || []).map((component) => {
                    return this._getCoder(component);
                }), param.name);
            case "":
                return new _coders_null__WEBPACK_IMPORTED_MODULE_10__["NullCoder"](param.name);
        }
        // u?int[0-9]*
        let match = param.type.match(paramTypeNumber);
        if (match) {
            let size = parseInt(match[2] || "256");
            if (size === 0 || size > 256 || (size % 8) !== 0) {
                logger.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
            }
            return new _coders_number__WEBPACK_IMPORTED_MODULE_11__["NumberCoder"](size / 8, (match[1] === "int"), param.name);
        }
        // bytes[0-9]+
        match = param.type.match(paramTypeBytes);
        if (match) {
            let size = parseInt(match[1]);
            if (size === 0 || size > 32) {
                logger.throwArgumentError("invalid bytes length", "param", param);
            }
            return new _coders_fixed_bytes__WEBPACK_IMPORTED_MODULE_9__["FixedBytesCoder"](size, param.name);
        }
        return logger.throwArgumentError("invalid type", "type", param.type);
    }
    _getWordSize() { return 32; }
    _getReader(data, allowLoose) {
        return new _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_4__["Reader"](data, this._getWordSize(), this.coerceFunc, allowLoose);
    }
    _getWriter() {
        return new _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_4__["Writer"](this._getWordSize());
    }
    getDefaultValue(types) {
        const coders = types.map((type) => this._getCoder(_fragments__WEBPACK_IMPORTED_MODULE_14__["ParamType"].from(type)));
        const coder = new _coders_tuple__WEBPACK_IMPORTED_MODULE_13__["TupleCoder"](coders, "_");
        return coder.defaultValue();
    }
    encode(types, values) {
        if (types.length !== values.length) {
            logger.throwError("types/values length mismatch", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].errors.INVALID_ARGUMENT, {
                count: { types: types.length, values: values.length },
                value: { types: types, values: values }
            });
        }
        const coders = types.map((type) => this._getCoder(_fragments__WEBPACK_IMPORTED_MODULE_14__["ParamType"].from(type)));
        const coder = (new _coders_tuple__WEBPACK_IMPORTED_MODULE_13__["TupleCoder"](coders, "_"));
        const writer = this._getWriter();
        coder.encode(writer, values);
        return writer.data;
    }
    decode(types, data, loose) {
        const coders = types.map((type) => this._getCoder(_fragments__WEBPACK_IMPORTED_MODULE_14__["ParamType"].from(type)));
        const coder = new _coders_tuple__WEBPACK_IMPORTED_MODULE_13__["TupleCoder"](coders, "_");
        return coder.decode(this._getReader(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(data), loose));
    }
}
const defaultAbiCoder = new AbiCoder();
//# sourceMappingURL=abi-coder.js.map

/***/ }),

/***/ "VNhi":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/boolean.js ***!
  \*******************************************************************/
/*! exports provided: BooleanCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanCoder", function() { return BooleanCoder; });
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");


class BooleanCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__["Coder"] {
    constructor(localName) {
        super("bool", "bool", localName, false);
    }
    defaultValue() {
        return false;
    }
    encode(writer, value) {
        return writer.writeValue(value ? 1 : 0);
    }
    decode(reader) {
        return reader.coerce(this.type, !reader.readValue().isZero());
    }
}
//# sourceMappingURL=boolean.js.map

/***/ }),

/***/ "VVP+":
/*!***************************************************************!*\
  !*** ./node_modules/@ethersproject/random/lib.esm/shuffle.js ***!
  \***************************************************************/
/*! exports provided: shuffled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffled", function() { return shuffled; });

function shuffled(array) {
    array = array.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}
//# sourceMappingURL=shuffle.js.map

/***/ }),

/***/ "VgU3":
/*!********************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/wordlists.js ***!
  \********************************************************************/
/*! exports provided: wordlists */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wordlists", function() { return wordlists; });
/* harmony import */ var _lang_cz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang-cz */ "Fc/w");
/* harmony import */ var _lang_en__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lang-en */ "DC0/");
/* harmony import */ var _lang_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lang-es */ "Ls10");
/* harmony import */ var _lang_fr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lang-fr */ "WNxC");
/* harmony import */ var _lang_ja__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lang-ja */ "yusA");
/* harmony import */ var _lang_ko__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lang-ko */ "jZRw");
/* harmony import */ var _lang_it__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lang-it */ "h+6H");
/* harmony import */ var _lang_zh__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lang-zh */ "fsgg");








const wordlists = {
    cz: _lang_cz__WEBPACK_IMPORTED_MODULE_0__["langCz"],
    en: _lang_en__WEBPACK_IMPORTED_MODULE_1__["langEn"],
    es: _lang_es__WEBPACK_IMPORTED_MODULE_2__["langEs"],
    fr: _lang_fr__WEBPACK_IMPORTED_MODULE_3__["langFr"],
    it: _lang_it__WEBPACK_IMPORTED_MODULE_6__["langIt"],
    ja: _lang_ja__WEBPACK_IMPORTED_MODULE_4__["langJa"],
    ko: _lang_ko__WEBPACK_IMPORTED_MODULE_5__["langKo"],
    zh: _lang_zh__WEBPACK_IMPORTED_MODULE_7__["langZhCn"],
    zh_cn: _lang_zh__WEBPACK_IMPORTED_MODULE_7__["langZhCn"],
    zh_tw: _lang_zh__WEBPACK_IMPORTED_MODULE_7__["langZhTw"]
};
//# sourceMappingURL=wordlists.js.map

/***/ }),

/***/ "Vpoo":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/hdnode/lib.esm/_version.js ***!
  \****************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "hdnode/5.4.0";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "WNxC":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-fr.js ***!
  \******************************************************************/
/*! exports provided: langFr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langFr", function() { return langFr; });
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wordlist */ "vZu+");



const words = "AbaisserAbandonAbdiquerAbeilleAbolirAborderAboutirAboyerAbrasifAbreuverAbriterAbrogerAbruptAbsenceAbsoluAbsurdeAbusifAbyssalAcade/mieAcajouAcarienAccablerAccepterAcclamerAccoladeAccrocheAccuserAcerbeAchatAcheterAcidulerAcierAcompteAcque/rirAcronymeActeurActifActuelAdepteAde/quatAdhe/sifAdjectifAdjugerAdmettreAdmirerAdopterAdorerAdoucirAdresseAdroitAdulteAdverbeAe/rerAe/ronefAffaireAffecterAfficheAffreuxAffublerAgacerAgencerAgileAgiterAgraferAgre/ableAgrumeAiderAiguilleAilierAimableAisanceAjouterAjusterAlarmerAlchimieAlerteAlge-breAlgueAlie/nerAlimentAlle/gerAlliageAllouerAllumerAlourdirAlpagaAltesseAlve/oleAmateurAmbiguAmbreAme/nagerAmertumeAmidonAmiralAmorcerAmourAmovibleAmphibieAmpleurAmusantAnalyseAnaphoreAnarchieAnatomieAncienAne/antirAngleAngoisseAnguleuxAnimalAnnexerAnnonceAnnuelAnodinAnomalieAnonymeAnormalAntenneAntidoteAnxieuxApaiserApe/ritifAplanirApologieAppareilAppelerApporterAppuyerAquariumAqueducArbitreArbusteArdeurArdoiseArgentArlequinArmatureArmementArmoireArmureArpenterArracherArriverArroserArsenicArte/rielArticleAspectAsphalteAspirerAssautAsservirAssietteAssocierAssurerAsticotAstreAstuceAtelierAtomeAtriumAtroceAttaqueAttentifAttirerAttraperAubaineAubergeAudaceAudibleAugurerAuroreAutomneAutrucheAvalerAvancerAvariceAvenirAverseAveugleAviateurAvideAvionAviserAvoineAvouerAvrilAxialAxiomeBadgeBafouerBagageBaguetteBaignadeBalancerBalconBaleineBalisageBambinBancaireBandageBanlieueBannie-reBanquierBarbierBarilBaronBarqueBarrageBassinBastionBatailleBateauBatterieBaudrierBavarderBeletteBe/lierBeloteBe/ne/ficeBerceauBergerBerlineBermudaBesaceBesogneBe/tailBeurreBiberonBicycleBiduleBijouBilanBilingueBillardBinaireBiologieBiopsieBiotypeBiscuitBisonBistouriBitumeBizarreBlafardBlagueBlanchirBlessantBlinderBlondBloquerBlousonBobardBobineBoireBoiserBolideBonbonBondirBonheurBonifierBonusBordureBorneBotteBoucleBoueuxBougieBoulonBouquinBourseBoussoleBoutiqueBoxeurBrancheBrasierBraveBrebisBre-cheBreuvageBricolerBrigadeBrillantBriocheBriqueBrochureBroderBronzerBrousseBroyeurBrumeBrusqueBrutalBruyantBuffleBuissonBulletinBureauBurinBustierButinerButoirBuvableBuvetteCabanonCabineCachetteCadeauCadreCafe/ineCaillouCaissonCalculerCalepinCalibreCalmerCalomnieCalvaireCamaradeCame/raCamionCampagneCanalCanetonCanonCantineCanularCapableCaporalCapriceCapsuleCapterCapucheCarabineCarboneCaresserCaribouCarnageCarotteCarreauCartonCascadeCasierCasqueCassureCauserCautionCavalierCaverneCaviarCe/dilleCeintureCe/lesteCelluleCendrierCensurerCentralCercleCe/re/bralCeriseCernerCerveauCesserChagrinChaiseChaleurChambreChanceChapitreCharbonChasseurChatonChaussonChavirerChemiseChenilleChe/quierChercherChevalChienChiffreChignonChime-reChiotChlorureChocolatChoisirChoseChouetteChromeChuteCigareCigogneCimenterCine/maCintrerCirculerCirerCirqueCiterneCitoyenCitronCivilClaironClameurClaquerClasseClavierClientClignerClimatClivageClocheClonageCloporteCobaltCobraCocasseCocotierCoderCodifierCoffreCognerCohe/sionCoifferCoincerCole-reColibriCollineColmaterColonelCombatCome/dieCommandeCompactConcertConduireConfierCongelerConnoterConsonneContactConvexeCopainCopieCorailCorbeauCordageCornicheCorpusCorrectCorte-geCosmiqueCostumeCotonCoudeCoupureCourageCouteauCouvrirCoyoteCrabeCrainteCravateCrayonCre/atureCre/diterCre/meuxCreuserCrevetteCriblerCrierCristalCrite-reCroireCroquerCrotaleCrucialCruelCrypterCubiqueCueillirCuille-reCuisineCuivreCulminerCultiverCumulerCupideCuratifCurseurCyanureCycleCylindreCyniqueDaignerDamierDangerDanseurDauphinDe/battreDe/biterDe/borderDe/briderDe/butantDe/calerDe/cembreDe/chirerDe/ciderDe/clarerDe/corerDe/crireDe/cuplerDe/daleDe/ductifDe/esseDe/fensifDe/filerDe/frayerDe/gagerDe/givrerDe/glutirDe/graferDe/jeunerDe/liceDe/logerDemanderDemeurerDe/molirDe/nicherDe/nouerDentelleDe/nuderDe/partDe/penserDe/phaserDe/placerDe/poserDe/rangerDe/roberDe/sastreDescenteDe/sertDe/signerDe/sobe/irDessinerDestrierDe/tacherDe/testerDe/tourerDe/tresseDevancerDevenirDevinerDevoirDiableDialogueDiamantDicterDiffe/rerDige/rerDigitalDigneDiluerDimancheDiminuerDioxydeDirectifDirigerDiscuterDisposerDissiperDistanceDivertirDiviserDocileDocteurDogmeDoigtDomaineDomicileDompterDonateurDonjonDonnerDopamineDortoirDorureDosageDoseurDossierDotationDouanierDoubleDouceurDouterDoyenDragonDraperDresserDribblerDroitureDuperieDuplexeDurableDurcirDynastieE/blouirE/carterE/charpeE/chelleE/clairerE/clipseE/cloreE/cluseE/coleE/conomieE/corceE/couterE/craserE/cre/merE/crivainE/crouE/cumeE/cureuilE/difierE/duquerEffacerEffectifEffigieEffortEffrayerEffusionE/galiserE/garerE/jecterE/laborerE/largirE/lectronE/le/gantE/le/phantE/le-veE/ligibleE/litismeE/logeE/luciderE/luderEmballerEmbellirEmbryonE/meraudeE/missionEmmenerE/motionE/mouvoirEmpereurEmployerEmporterEmpriseE/mulsionEncadrerEnche-reEnclaveEncocheEndiguerEndosserEndroitEnduireE/nergieEnfanceEnfermerEnfouirEngagerEnginEngloberE/nigmeEnjamberEnjeuEnleverEnnemiEnnuyeuxEnrichirEnrobageEnseigneEntasserEntendreEntierEntourerEntraverE/nume/rerEnvahirEnviableEnvoyerEnzymeE/olienE/paissirE/pargneE/patantE/pauleE/picerieE/pide/mieE/pierE/pilogueE/pineE/pisodeE/pitapheE/poqueE/preuveE/prouverE/puisantE/querreE/quipeE/rigerE/rosionErreurE/ruptionEscalierEspadonEspe-ceEspie-gleEspoirEspritEsquiverEssayerEssenceEssieuEssorerEstimeEstomacEstradeE/tage-reE/talerE/tancheE/tatiqueE/teindreE/tendoirE/ternelE/thanolE/thiqueEthnieE/tirerE/tofferE/toileE/tonnantE/tourdirE/trangeE/troitE/tudeEuphorieE/valuerE/vasionE/ventailE/videnceE/viterE/volutifE/voquerExactExage/rerExaucerExcellerExcitantExclusifExcuseExe/cuterExempleExercerExhalerExhorterExigenceExilerExisterExotiqueExpe/dierExplorerExposerExprimerExquisExtensifExtraireExulterFableFabuleuxFacetteFacileFactureFaiblirFalaiseFameuxFamilleFarceurFarfeluFarineFaroucheFascinerFatalFatigueFauconFautifFaveurFavoriFe/brileFe/conderFe/de/rerFe/linFemmeFe/murFendoirFe/odalFermerFe/roceFerveurFestivalFeuilleFeutreFe/vrierFiascoFicelerFictifFide-leFigureFilatureFiletageFilie-reFilleulFilmerFilouFiltrerFinancerFinirFioleFirmeFissureFixerFlairerFlammeFlasqueFlatteurFle/auFle-cheFleurFlexionFloconFloreFluctuerFluideFluvialFolieFonderieFongibleFontaineForcerForgeronFormulerFortuneFossileFoudreFouge-reFouillerFoulureFourmiFragileFraiseFranchirFrapperFrayeurFre/gateFreinerFrelonFre/mirFre/ne/sieFre-reFriableFrictionFrissonFrivoleFroidFromageFrontalFrotterFruitFugitifFuiteFureurFurieuxFurtifFusionFuturGagnerGalaxieGalerieGambaderGarantirGardienGarnirGarrigueGazelleGazonGe/antGe/latineGe/luleGendarmeGe/ne/ralGe/nieGenouGentilGe/ologieGe/ome-treGe/raniumGermeGestuelGeyserGibierGiclerGirafeGivreGlaceGlaiveGlisserGlobeGloireGlorieuxGolfeurGommeGonflerGorgeGorilleGoudronGouffreGoulotGoupilleGourmandGoutteGraduelGraffitiGraineGrandGrappinGratuitGravirGrenatGriffureGrillerGrimperGrognerGronderGrotteGroupeGrugerGrutierGruye-reGue/pardGuerrierGuideGuimauveGuitareGustatifGymnasteGyrostatHabitudeHachoirHalteHameauHangarHannetonHaricotHarmonieHarponHasardHe/liumHe/matomeHerbeHe/rissonHermineHe/ronHe/siterHeureuxHibernerHibouHilarantHistoireHiverHomardHommageHomoge-neHonneurHonorerHonteuxHordeHorizonHorlogeHormoneHorribleHouleuxHousseHublotHuileuxHumainHumbleHumideHumourHurlerHydromelHygie-neHymneHypnoseIdylleIgnorerIguaneIlliciteIllusionImageImbiberImiterImmenseImmobileImmuableImpactImpe/rialImplorerImposerImprimerImputerIncarnerIncendieIncidentInclinerIncoloreIndexerIndiceInductifIne/ditIneptieInexactInfiniInfligerInformerInfusionInge/rerInhalerInhiberInjecterInjureInnocentInoculerInonderInscrireInsecteInsigneInsoliteInspirerInstinctInsulterIntactIntenseIntimeIntrigueIntuitifInutileInvasionInventerInviterInvoquerIroniqueIrradierIrre/elIrriterIsolerIvoireIvresseJaguarJaillirJambeJanvierJardinJaugerJauneJavelotJetableJetonJeudiJeunesseJoindreJoncherJonglerJoueurJouissifJournalJovialJoyauJoyeuxJubilerJugementJuniorJuponJuristeJusticeJuteuxJuve/nileKayakKimonoKiosqueLabelLabialLabourerLace/rerLactoseLaguneLaineLaisserLaitierLambeauLamelleLampeLanceurLangageLanterneLapinLargeurLarmeLaurierLavaboLavoirLectureLe/galLe/gerLe/gumeLessiveLettreLevierLexiqueLe/zardLiasseLibe/rerLibreLicenceLicorneLie-geLie-vreLigatureLigoterLigueLimerLimiteLimonadeLimpideLine/aireLingotLionceauLiquideLisie-reListerLithiumLitigeLittoralLivreurLogiqueLointainLoisirLombricLoterieLouerLourdLoutreLouveLoyalLubieLucideLucratifLueurLugubreLuisantLumie-reLunaireLundiLuronLutterLuxueuxMachineMagasinMagentaMagiqueMaigreMaillonMaintienMairieMaisonMajorerMalaxerMale/ficeMalheurMaliceMalletteMammouthMandaterManiableManquantManteauManuelMarathonMarbreMarchandMardiMaritimeMarqueurMarronMartelerMascotteMassifMate/rielMatie-reMatraqueMaudireMaussadeMauveMaximalMe/chantMe/connuMe/dailleMe/decinMe/diterMe/duseMeilleurMe/langeMe/lodieMembreMe/moireMenacerMenerMenhirMensongeMentorMercrediMe/riteMerleMessagerMesureMe/talMe/te/oreMe/thodeMe/tierMeubleMiaulerMicrobeMietteMignonMigrerMilieuMillionMimiqueMinceMine/ralMinimalMinorerMinuteMiracleMiroiterMissileMixteMobileModerneMoelleuxMondialMoniteurMonnaieMonotoneMonstreMontagneMonumentMoqueurMorceauMorsureMortierMoteurMotifMoucheMoufleMoulinMoussonMoutonMouvantMultipleMunitionMurailleMure-neMurmureMuscleMuse/umMusicienMutationMuterMutuelMyriadeMyrtilleMyste-reMythiqueNageurNappeNarquoisNarrerNatationNationNatureNaufrageNautiqueNavireNe/buleuxNectarNe/fasteNe/gationNe/gligerNe/gocierNeigeNerveuxNettoyerNeuroneNeutronNeveuNicheNickelNitrateNiveauNobleNocifNocturneNoirceurNoisetteNomadeNombreuxNommerNormatifNotableNotifierNotoireNourrirNouveauNovateurNovembreNoviceNuageNuancerNuireNuisibleNume/roNuptialNuqueNutritifObe/irObjectifObligerObscurObserverObstacleObtenirObturerOccasionOccuperOce/anOctobreOctroyerOctuplerOculaireOdeurOdorantOffenserOfficierOffrirOgiveOiseauOisillonOlfactifOlivierOmbrageOmettreOnctueuxOndulerOne/reuxOniriqueOpaleOpaqueOpe/rerOpinionOpportunOpprimerOpterOptiqueOrageuxOrangeOrbiteOrdonnerOreilleOrganeOrgueilOrificeOrnementOrqueOrtieOscillerOsmoseOssatureOtarieOuraganOursonOutilOutragerOuvrageOvationOxydeOxyge-neOzonePaisiblePalacePalmare-sPalourdePalperPanachePandaPangolinPaniquerPanneauPanoramaPantalonPapayePapierPapoterPapyrusParadoxeParcelleParesseParfumerParlerParoleParrainParsemerPartagerParureParvenirPassionPaste-quePaternelPatiencePatronPavillonPavoiserPayerPaysagePeignePeintrePelagePe/licanPellePelousePeluchePendulePe/ne/trerPe/niblePensifPe/nuriePe/pitePe/plumPerdrixPerforerPe/riodePermuterPerplexePersilPertePeserPe/talePetitPe/trirPeuplePharaonPhobiePhoquePhotonPhrasePhysiquePianoPicturalPie-cePierrePieuvrePilotePinceauPipettePiquerPiroguePiscinePistonPivoterPixelPizzaPlacardPlafondPlaisirPlanerPlaquePlastronPlateauPleurerPlexusPliagePlombPlongerPluiePlumagePochettePoe/siePoe-tePointePoirierPoissonPoivrePolairePolicierPollenPolygonePommadePompierPonctuelPonde/rerPoneyPortiquePositionPosse/derPosturePotagerPoteauPotionPoucePoulainPoumonPourprePoussinPouvoirPrairiePratiquePre/cieuxPre/direPre/fixePre/ludePre/nomPre/sencePre/textePre/voirPrimitifPrincePrisonPriverProble-meProce/derProdigeProfondProgre-sProieProjeterProloguePromenerPropreProspe-reProte/gerProuesseProverbePrudencePruneauPsychosePublicPuceronPuiserPulpePulsarPunaisePunitifPupitrePurifierPuzzlePyramideQuasarQuerelleQuestionQuie/tudeQuitterQuotientRacineRaconterRadieuxRagondinRaideurRaisinRalentirRallongeRamasserRapideRasageRatisserRavagerRavinRayonnerRe/actifRe/agirRe/aliserRe/animerRecevoirRe/citerRe/clamerRe/colterRecruterReculerRecyclerRe/digerRedouterRefaireRe/flexeRe/formerRefrainRefugeRe/galienRe/gionRe/glageRe/gulierRe/ite/rerRejeterRejouerRelatifReleverReliefRemarqueReme-deRemiseRemonterRemplirRemuerRenardRenfortReniflerRenoncerRentrerRenvoiReplierReporterRepriseReptileRequinRe/serveRe/sineuxRe/soudreRespectResterRe/sultatRe/tablirRetenirRe/ticuleRetomberRetracerRe/unionRe/ussirRevancheRevivreRe/volteRe/vulsifRichesseRideauRieurRigideRigolerRincerRiposterRisibleRisqueRituelRivalRivie-reRocheuxRomanceRompreRonceRondinRoseauRosierRotatifRotorRotuleRougeRouilleRouleauRoutineRoyaumeRubanRubisRucheRuelleRugueuxRuinerRuisseauRuserRustiqueRythmeSablerSaboterSabreSacocheSafariSagesseSaisirSaladeSaliveSalonSaluerSamediSanctionSanglierSarcasmeSardineSaturerSaugrenuSaumonSauterSauvageSavantSavonnerScalpelScandaleSce/le/ratSce/narioSceptreSche/maScienceScinderScoreScrutinSculpterSe/anceSe/cableSe/cherSecouerSe/cre/terSe/datifSe/duireSeigneurSe/jourSe/lectifSemaineSemblerSemenceSe/minalSe/nateurSensibleSentenceSe/parerSe/quenceSereinSergentSe/rieuxSerrureSe/rumServiceSe/sameSe/virSevrageSextupleSide/ralSie-cleSie/gerSifflerSigleSignalSilenceSiliciumSimpleSince-reSinistreSiphonSiropSismiqueSituerSkierSocialSocleSodiumSoigneuxSoldatSoleilSolitudeSolubleSombreSommeilSomnolerSondeSongeurSonnetteSonoreSorcierSortirSosieSottiseSoucieuxSoudureSouffleSouleverSoupapeSourceSoutirerSouvenirSpacieuxSpatialSpe/cialSphe-reSpiralStableStationSternumStimulusStipulerStrictStudieuxStupeurStylisteSublimeSubstratSubtilSubvenirSucce-sSucreSuffixeSugge/rerSuiveurSulfateSuperbeSupplierSurfaceSuricateSurmenerSurpriseSursautSurvieSuspectSyllabeSymboleSyme/trieSynapseSyntaxeSyste-meTabacTablierTactileTaillerTalentTalismanTalonnerTambourTamiserTangibleTapisTaquinerTarderTarifTartineTasseTatamiTatouageTaupeTaureauTaxerTe/moinTemporelTenailleTendreTeneurTenirTensionTerminerTerneTerribleTe/tineTexteThe-meThe/orieThe/rapieThoraxTibiaTie-deTimideTirelireTiroirTissuTitaneTitreTituberTobogganTole/rantTomateToniqueTonneauToponymeTorcheTordreTornadeTorpilleTorrentTorseTortueTotemToucherTournageTousserToxineTractionTraficTragiqueTrahirTrainTrancherTravailTre-fleTremperTre/sorTreuilTriageTribunalTricoterTrilogieTriompheTriplerTriturerTrivialTromboneTroncTropicalTroupeauTuileTulipeTumulteTunnelTurbineTuteurTutoyerTuyauTympanTyphonTypiqueTyranUbuesqueUltimeUltrasonUnanimeUnifierUnionUniqueUnitaireUniversUraniumUrbainUrticantUsageUsineUsuelUsureUtileUtopieVacarmeVaccinVagabondVagueVaillantVaincreVaisseauValableValiseVallonValveVampireVanilleVapeurVarierVaseuxVassalVasteVecteurVedetteVe/ge/talVe/hiculeVeinardVe/loceVendrediVe/ne/rerVengerVenimeuxVentouseVerdureVe/rinVernirVerrouVerserVertuVestonVe/te/ranVe/tusteVexantVexerViaducViandeVictoireVidangeVide/oVignetteVigueurVilainVillageVinaigreViolonVipe-reVirementVirtuoseVirusVisageViseurVisionVisqueuxVisuelVitalVitesseViticoleVitrineVivaceVivipareVocationVoguerVoileVoisinVoitureVolailleVolcanVoltigerVolumeVoraceVortexVoterVouloirVoyageVoyelleWagonXe/nonYachtZe-breZe/nithZesteZoologie";
let wordlist = null;
const lookup = {};
function dropDiacritic(word) {
    _wordlist__WEBPACK_IMPORTED_MODULE_1__["logger"].checkNormalize();
    return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8String"])(Array.prototype.filter.call(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8Bytes"])(word.normalize("NFD").toLowerCase()), (c) => {
        return ((c >= 65 && c <= 90) || (c >= 97 && c <= 123));
    }));
}
function expand(word) {
    const output = [];
    Array.prototype.forEach.call(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8Bytes"])(word), (c) => {
        // Acute accent
        if (c === 47) {
            output.push(204);
            output.push(129);
            // Grave accent
        }
        else if (c === 45) {
            output.push(204);
            output.push(128);
        }
        else {
            output.push(c);
        }
    });
    return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8String"])(output);
}
function loadWords(lang) {
    if (wordlist != null) {
        return;
    }
    wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ").map((w) => expand(w));
    wordlist.forEach((word, index) => {
        lookup[dropDiacritic(word)] = index;
    });
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].check(lang) !== "0x51deb7ae009149dc61a6bd18a918eb7ac78d2775726c68e598b92d002519b045") {
        wordlist = null;
        throw new Error("BIP39 Wordlist for fr (French) FAILED");
    }
}
class LangFr extends _wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"] {
    constructor() {
        super("fr");
    }
    getWord(index) {
        loadWords(this);
        return wordlist[index];
    }
    getWordIndex(word) {
        loadWords(this);
        return lookup[dropDiacritic(word)];
    }
}
const langFr = new LangFr();
_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].register(langFr);

//# sourceMappingURL=lang-fr.js.map

/***/ }),

/***/ "Z3mj":
/*!***********************************************!*\
  !*** ./node_modules/ethers/lib.esm/ethers.js ***!
  \***********************************************/
/*! exports provided: Signer, Wallet, VoidSigner, getDefaultProvider, providers, BaseContract, Contract, ContractFactory, BigNumber, FixedNumber, constants, errors, logger, utils, wordlists, version, Wordlist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
/* harmony import */ var _ethersproject_contracts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/contracts */ "8XlW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseContract", function() { return _ethersproject_contracts__WEBPACK_IMPORTED_MODULE_0__["BaseContract"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Contract", function() { return _ethersproject_contracts__WEBPACK_IMPORTED_MODULE_0__["Contract"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContractFactory", function() { return _ethersproject_contracts__WEBPACK_IMPORTED_MODULE_0__["ContractFactory"]; });

/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BigNumber", function() { return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FixedNumber", function() { return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["FixedNumber"]; });

/* harmony import */ var _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/abstract-signer */ "fKWB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Signer", function() { return _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__["Signer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VoidSigner", function() { return _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_2__["VoidSigner"]; });

/* harmony import */ var _ethersproject_wallet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/wallet */ "KIrq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return _ethersproject_wallet__WEBPACK_IMPORTED_MODULE_3__["Wallet"]; });

/* harmony import */ var _ethersproject_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/constants */ "tGuN");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "constants", function() { return _ethersproject_constants__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _ethersproject_providers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/providers */ "JgbS");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "providers", function() { return _ethersproject_providers__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDefaultProvider", function() { return _ethersproject_providers__WEBPACK_IMPORTED_MODULE_5__["getDefaultProvider"]; });

/* harmony import */ var _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/wordlists */ "ewK1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wordlists", function() { return _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_6__["wordlists"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Wordlist", function() { return _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_6__["Wordlist"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "dT4A");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return _utils__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "errors", function() { return _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["ErrorCode"]; });

/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_version */ "4j6N");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _version__WEBPACK_IMPORTED_MODULE_9__["version"]; });












////////////////////////
// Compile-Time Constants
// This is generated by "npm run dist"

const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"](_version__WEBPACK_IMPORTED_MODULE_9__["version"]);
////////////////////////
// Exports

//# sourceMappingURL=ethers.js.map

/***/ }),

/***/ "a1v+":
/*!*********************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/inspect.js ***!
  \*********************************************************************/
/*! exports provided: isCrowdsaleWallet, isKeystoreWallet, getJsonWalletAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCrowdsaleWallet", function() { return isCrowdsaleWallet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeystoreWallet", function() { return isKeystoreWallet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJsonWalletAddress", function() { return getJsonWalletAddress; });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");


function isCrowdsaleWallet(json) {
    let data = null;
    try {
        data = JSON.parse(json);
    }
    catch (error) {
        return false;
    }
    return (data.encseed && data.ethaddr);
}
function isKeystoreWallet(json) {
    let data = null;
    try {
        data = JSON.parse(json);
    }
    catch (error) {
        return false;
    }
    if (!data.version || parseInt(data.version) !== data.version || parseInt(data.version) !== 3) {
        return false;
    }
    // @TODO: Put more checks to make sure it has kdf, iv and all that good stuff
    return true;
}
//export function isJsonWallet(json: string): boolean {
//    return (isSecretStorageWallet(json) || isCrowdsaleWallet(json));
//}
function getJsonWalletAddress(json) {
    if (isCrowdsaleWallet(json)) {
        try {
            return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(JSON.parse(json).ethaddr);
        }
        catch (error) {
            return null;
        }
    }
    if (isKeystoreWallet(json)) {
        try {
            return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(JSON.parse(json).address);
        }
        catch (error) {
            return null;
        }
    }
    return null;
}
//# sourceMappingURL=inspect.js.map

/***/ }),

/***/ "bkUu":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/random/lib.esm/random.js ***!
  \**************************************************************/
/*! exports provided: randomBytes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomBytes", function() { return randomBytes; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "/wnW");




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"](_version__WEBPACK_IMPORTED_MODULE_2__["version"]);
let anyGlobal = null;
try {
    anyGlobal = window;
    if (anyGlobal == null) {
        throw new Error("try next");
    }
}
catch (error) {
    try {
        anyGlobal = global;
        if (anyGlobal == null) {
            throw new Error("try next");
        }
    }
    catch (error) {
        anyGlobal = {};
    }
}
let crypto = anyGlobal.crypto || anyGlobal.msCrypto;
if (!crypto || !crypto.getRandomValues) {
    logger.warn("WARNING: Missing strong random number source");
    crypto = {
        getRandomValues: function (buffer) {
            return logger.throwError("no secure random source avaialble", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "crypto.getRandomValues"
            });
        }
    };
}
function randomBytes(length) {
    if (length <= 0 || length > 1024 || (length % 1)) {
        logger.throwArgumentError("invalid length", "length", length);
    }
    const result = new Uint8Array(length);
    crypto.getRandomValues(result);
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(result);
}
;
//# sourceMappingURL=random.js.map

/***/ }),

/***/ "cUlj":
/*!************************************************************!*\
  !*** ./node_modules/@ethersproject/units/lib.esm/index.js ***!
  \************************************************************/
/*! exports provided: commify, formatUnits, parseUnits, formatEther, parseEther */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commify", function() { return commify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatUnits", function() { return formatUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseUnits", function() { return parseUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatEther", function() { return formatEther; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseEther", function() { return parseEther; });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "O8dL");




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"](_version__WEBPACK_IMPORTED_MODULE_2__["version"]);
const names = [
    "wei",
    "kwei",
    "mwei",
    "gwei",
    "szabo",
    "finney",
    "ether",
];
// Some environments have issues with RegEx that contain back-tracking, so we cannot
// use them.
function commify(value) {
    const comps = String(value).split(".");
    if (comps.length > 2 || !comps[0].match(/^-?[0-9]*$/) || (comps[1] && !comps[1].match(/^[0-9]*$/)) || value === "." || value === "-.") {
        logger.throwArgumentError("invalid value", "value", value);
    }
    // Make sure we have at least one whole digit (0 if none)
    let whole = comps[0];
    let negative = "";
    if (whole.substring(0, 1) === "-") {
        negative = "-";
        whole = whole.substring(1);
    }
    // Make sure we have at least 1 whole digit with no leading zeros
    while (whole.substring(0, 1) === "0") {
        whole = whole.substring(1);
    }
    if (whole === "") {
        whole = "0";
    }
    let suffix = "";
    if (comps.length === 2) {
        suffix = "." + (comps[1] || "0");
    }
    while (suffix.length > 2 && suffix[suffix.length - 1] === "0") {
        suffix = suffix.substring(0, suffix.length - 1);
    }
    const formatted = [];
    while (whole.length) {
        if (whole.length <= 3) {
            formatted.unshift(whole);
            break;
        }
        else {
            const index = whole.length - 3;
            formatted.unshift(whole.substring(index));
            whole = whole.substring(0, index);
        }
    }
    return negative + formatted.join(",") + suffix;
}
function formatUnits(value, unitName) {
    if (typeof (unitName) === "string") {
        const index = names.indexOf(unitName);
        if (index !== -1) {
            unitName = 3 * index;
        }
    }
    return Object(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["formatFixed"])(value, (unitName != null) ? unitName : 18);
}
function parseUnits(value, unitName) {
    if (typeof (value) !== "string") {
        logger.throwArgumentError("value must be a string", "value", value);
    }
    if (typeof (unitName) === "string") {
        const index = names.indexOf(unitName);
        if (index !== -1) {
            unitName = 3 * index;
        }
    }
    return Object(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["parseFixed"])(value, (unitName != null) ? unitName : 18);
}
function formatEther(wei) {
    return formatUnits(wei, 18);
}
function parseEther(ether) {
    return parseUnits(ether, 18);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "cdpc":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/base64/lib.esm/index.js ***!
  \*************************************************************/
/*! exports provided: decode, encode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64 */ "IHuh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return _base64__WEBPACK_IMPORTED_MODULE_0__["decode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return _base64__WEBPACK_IMPORTED_MODULE_0__["encode"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "cke4":
/*!**************************************!*\
  !*** ./node_modules/aes-js/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function(root) {

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = value >> 8;
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (true) {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else {}


})(this);


/***/ }),

/***/ "dT4A":
/*!**********************************************!*\
  !*** ./node_modules/ethers/lib.esm/utils.js ***!
  \**********************************************/
/*! exports provided: AbiCoder, defaultAbiCoder, Fragment, ConstructorFragment, ErrorFragment, EventFragment, FunctionFragment, ParamType, FormatTypes, checkResultErrors, Logger, RLP, _fetchData, fetchJson, poll, checkProperties, deepCopy, defineReadOnly, getStatic, resolveProperties, shallowCopy, arrayify, concat, stripZeros, zeroPad, isBytes, isBytesLike, defaultPath, HDNode, SigningKey, Interface, LogDescription, TransactionDescription, base58, base64, hexlify, isHexString, hexConcat, hexStripZeros, hexValue, hexZeroPad, hexDataLength, hexDataSlice, nameprep, _toEscapedUtf8String, toUtf8Bytes, toUtf8CodePoints, toUtf8String, Utf8ErrorFuncs, formatBytes32String, parseBytes32String, hashMessage, namehash, isValidName, id, _TypedDataEncoder, getAddress, getIcapAddress, getContractAddress, getCreate2Address, isAddress, formatEther, parseEther, formatUnits, parseUnits, commify, computeHmac, keccak256, ripemd160, sha256, sha512, randomBytes, shuffled, solidityPack, solidityKeccak256, soliditySha256, splitSignature, joinSignature, accessListify, parseTransaction, serializeTransaction, TransactionTypes, getJsonWalletAddress, computeAddress, recoverAddress, computePublicKey, recoverPublicKey, verifyMessage, verifyTypedData, getAccountPath, mnemonicToEntropy, entropyToMnemonic, isValidMnemonic, mnemonicToSeed, SupportedAlgorithm, UnicodeNormalizationForm, Utf8ErrorReason, Indexed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/abi */ "SoSZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbiCoder", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["AbiCoder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultAbiCoder", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["defaultAbiCoder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["Fragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConstructorFragment", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["ConstructorFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorFragment", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["ErrorFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventFragment", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["EventFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FunctionFragment", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["FunctionFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParamType", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["ParamType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormatTypes", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["FormatTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkResultErrors", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["checkResultErrors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["Interface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogDescription", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["LogDescription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionDescription", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["TransactionDescription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Indexed", function() { return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_0__["Indexed"]; });

/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAddress", function() { return _ethersproject_address__WEBPACK_IMPORTED_MODULE_1__["getAddress"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIcapAddress", function() { return _ethersproject_address__WEBPACK_IMPORTED_MODULE_1__["getIcapAddress"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getContractAddress", function() { return _ethersproject_address__WEBPACK_IMPORTED_MODULE_1__["getContractAddress"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCreate2Address", function() { return _ethersproject_address__WEBPACK_IMPORTED_MODULE_1__["getCreate2Address"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isAddress", function() { return _ethersproject_address__WEBPACK_IMPORTED_MODULE_1__["isAddress"]; });

/* harmony import */ var _ethersproject_base64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/base64 */ "cdpc");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "base64", function() { return _ethersproject_base64__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _ethersproject_basex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/basex */ "LPIR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "base58", function() { return _ethersproject_basex__WEBPACK_IMPORTED_MODULE_3__["Base58"]; });

/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrayify", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["arrayify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["concat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripZeros", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["stripZeros"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zeroPad", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["zeroPad"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isBytes", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["isBytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isBytesLike", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["isBytesLike"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexlify", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["hexlify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isHexString", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["isHexString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexConcat", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["hexConcat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexStripZeros", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["hexStripZeros"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexValue", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["hexValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexZeroPad", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["hexZeroPad"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexDataLength", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["hexDataLength"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexDataSlice", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["hexDataSlice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "splitSignature", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["splitSignature"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "joinSignature", function() { return _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__["joinSignature"]; });

/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/hash */ "fQvb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hashMessage", function() { return _ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["hashMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "namehash", function() { return _ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["namehash"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isValidName", function() { return _ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["isValidName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "id", function() { return _ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["id"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_TypedDataEncoder", function() { return _ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["_TypedDataEncoder"]; });

/* harmony import */ var _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/hdnode */ "8AIR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultPath", function() { return _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_6__["defaultPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HDNode", function() { return _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_6__["HDNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAccountPath", function() { return _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_6__["getAccountPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mnemonicToEntropy", function() { return _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_6__["mnemonicToEntropy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entropyToMnemonic", function() { return _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_6__["entropyToMnemonic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isValidMnemonic", function() { return _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_6__["isValidMnemonic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mnemonicToSeed", function() { return _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_6__["mnemonicToSeed"]; });

/* harmony import */ var _ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/json-wallets */ "zkI0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getJsonWalletAddress", function() { return _ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_7__["getJsonWalletAddress"]; });

/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/keccak256 */ "b1pR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keccak256", function() { return _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_8__["keccak256"]; });

/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _ethersproject_logger__WEBPACK_IMPORTED_MODULE_9__["Logger"]; });

/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/sha2 */ "ggob");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeHmac", function() { return _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_10__["computeHmac"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ripemd160", function() { return _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_10__["ripemd160"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_10__["sha256"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sha512", function() { return _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_10__["sha512"]; });

/* harmony import */ var _ethersproject_solidity__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ethersproject/solidity */ "7WLq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "solidityPack", function() { return _ethersproject_solidity__WEBPACK_IMPORTED_MODULE_11__["pack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "solidityKeccak256", function() { return _ethersproject_solidity__WEBPACK_IMPORTED_MODULE_11__["keccak256"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "soliditySha256", function() { return _ethersproject_solidity__WEBPACK_IMPORTED_MODULE_11__["sha256"]; });

/* harmony import */ var _ethersproject_random__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ethersproject/random */ "CxN6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomBytes", function() { return _ethersproject_random__WEBPACK_IMPORTED_MODULE_12__["randomBytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shuffled", function() { return _ethersproject_random__WEBPACK_IMPORTED_MODULE_12__["shuffled"]; });

/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkProperties", function() { return _ethersproject_properties__WEBPACK_IMPORTED_MODULE_13__["checkProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepCopy", function() { return _ethersproject_properties__WEBPACK_IMPORTED_MODULE_13__["deepCopy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defineReadOnly", function() { return _ethersproject_properties__WEBPACK_IMPORTED_MODULE_13__["defineReadOnly"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStatic", function() { return _ethersproject_properties__WEBPACK_IMPORTED_MODULE_13__["getStatic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resolveProperties", function() { return _ethersproject_properties__WEBPACK_IMPORTED_MODULE_13__["resolveProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowCopy", function() { return _ethersproject_properties__WEBPACK_IMPORTED_MODULE_13__["shallowCopy"]; });

/* harmony import */ var _ethersproject_rlp__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ethersproject/rlp */ "4WVH");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "RLP", function() { return _ethersproject_rlp__WEBPACK_IMPORTED_MODULE_14__; });
/* harmony import */ var _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ethersproject/signing-key */ "rhxT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SigningKey", function() { return _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_15__["SigningKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computePublicKey", function() { return _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_15__["computePublicKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recoverPublicKey", function() { return _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_15__["recoverPublicKey"]; });

/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nameprep", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["nameprep"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_toEscapedUtf8String", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["_toEscapedUtf8String"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toUtf8Bytes", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["toUtf8Bytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toUtf8CodePoints", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["toUtf8CodePoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toUtf8String", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["toUtf8String"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utf8ErrorFuncs", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["Utf8ErrorFuncs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatBytes32String", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["formatBytes32String"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseBytes32String", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["parseBytes32String"]; });

/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ethersproject/transactions */ "WsP5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "accessListify", function() { return _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_17__["accessListify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTransaction", function() { return _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_17__["parse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serializeTransaction", function() { return _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_17__["serialize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionTypes", function() { return _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_17__["TransactionTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeAddress", function() { return _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_17__["computeAddress"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recoverAddress", function() { return _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_17__["recoverAddress"]; });

/* harmony import */ var _ethersproject_units__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ethersproject/units */ "cUlj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatEther", function() { return _ethersproject_units__WEBPACK_IMPORTED_MODULE_18__["formatEther"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseEther", function() { return _ethersproject_units__WEBPACK_IMPORTED_MODULE_18__["parseEther"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatUnits", function() { return _ethersproject_units__WEBPACK_IMPORTED_MODULE_18__["formatUnits"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseUnits", function() { return _ethersproject_units__WEBPACK_IMPORTED_MODULE_18__["parseUnits"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "commify", function() { return _ethersproject_units__WEBPACK_IMPORTED_MODULE_18__["commify"]; });

/* harmony import */ var _ethersproject_wallet__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ethersproject/wallet */ "KIrq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "verifyMessage", function() { return _ethersproject_wallet__WEBPACK_IMPORTED_MODULE_19__["verifyMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "verifyTypedData", function() { return _ethersproject_wallet__WEBPACK_IMPORTED_MODULE_19__["verifyTypedData"]; });

/* harmony import */ var _ethersproject_web__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ethersproject/web */ "uvd5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_fetchData", function() { return _ethersproject_web__WEBPACK_IMPORTED_MODULE_20__["_fetchData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchJson", function() { return _ethersproject_web__WEBPACK_IMPORTED_MODULE_20__["fetchJson"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "poll", function() { return _ethersproject_web__WEBPACK_IMPORTED_MODULE_20__["poll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SupportedAlgorithm", function() { return _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_10__["SupportedAlgorithm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnicodeNormalizationForm", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["UnicodeNormalizationForm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utf8ErrorReason", function() { return _ethersproject_strings__WEBPACK_IMPORTED_MODULE_16__["Utf8ErrorReason"]; });























////////////////////////
// Enums


////////////////////////
// Exports

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "e2Sn":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/websocket-provider.js ***!
  \*****************************************************************************/
/*! exports provided: WebSocketProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketProvider", function() { return WebSocketProvider; });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _json_rpc_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./json-rpc-provider */ "PoCP");
/* harmony import */ var _ws__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ws */ "SHrT");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version */ "SkWp");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"](_version__WEBPACK_IMPORTED_MODULE_5__["version"]);
/**
 *  Notes:
 *
 *  This provider differs a bit from the polling providers. One main
 *  difference is how it handles consistency. The polling providers
 *  will stall responses to ensure a consistent state, while this
 *  WebSocket provider assumes the connected backend will manage this.
 *
 *  For example, if a polling provider emits an event which indicats
 *  the event occurred in blockhash XXX, a call to fetch that block by
 *  its hash XXX, if not present will retry until it is present. This
 *  can occur when querying a pool of nodes that are mildly out of sync
 *  with each other.
 */
let NextId = 1;
// For more info about the Real-time Event API see:
//   https://geth.ethereum.org/docs/rpc/pubsub
class WebSocketProvider extends _json_rpc_provider__WEBPACK_IMPORTED_MODULE_2__["JsonRpcProvider"] {
    constructor(url, network) {
        // This will be added in the future; please open an issue to expedite
        if (network === "any") {
            logger.throwError("WebSocketProvider does not support 'any' network yet", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "network:any"
            });
        }
        super(url, network);
        this._pollingInterval = -1;
        this._wsReady = false;
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "_websocket", new _ws__WEBPACK_IMPORTED_MODULE_3__["WebSocket"](this.connection.url));
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "_requests", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "_subs", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "_subIds", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "_detectNetwork", super.detectNetwork());
        // Stall sending requests until the socket is open...
        this._websocket.onopen = () => {
            this._wsReady = true;
            Object.keys(this._requests).forEach((id) => {
                this._websocket.send(this._requests[id].payload);
            });
        };
        this._websocket.onmessage = (messageEvent) => {
            const data = messageEvent.data;
            const result = JSON.parse(data);
            if (result.id != null) {
                const id = String(result.id);
                const request = this._requests[id];
                delete this._requests[id];
                if (result.result !== undefined) {
                    request.callback(null, result.result);
                    this.emit("debug", {
                        action: "response",
                        request: JSON.parse(request.payload),
                        response: result.result,
                        provider: this
                    });
                }
                else {
                    let error = null;
                    if (result.error) {
                        error = new Error(result.error.message || "unknown error");
                        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(error, "code", result.error.code || null);
                        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(error, "response", data);
                    }
                    else {
                        error = new Error("unknown error");
                    }
                    request.callback(error, undefined);
                    this.emit("debug", {
                        action: "response",
                        error: error,
                        request: JSON.parse(request.payload),
                        provider: this
                    });
                }
            }
            else if (result.method === "eth_subscription") {
                // Subscription...
                const sub = this._subs[result.params.subscription];
                if (sub) {
                    //this.emit.apply(this,                  );
                    sub.processFunc(result.params.result);
                }
            }
            else {
                console.warn("this should not happen");
            }
        };
        // This Provider does not actually poll, but we want to trigger
        // poll events for things that depend on them (like stalling for
        // block and transaction lookups)
        const fauxPoll = setInterval(() => {
            this.emit("poll");
        }, 1000);
        if (fauxPoll.unref) {
            fauxPoll.unref();
        }
    }
    detectNetwork() {
        return this._detectNetwork;
    }
    get pollingInterval() {
        return 0;
    }
    resetEventsBlock(blockNumber) {
        logger.throwError("cannot reset events block on WebSocketProvider", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.UNSUPPORTED_OPERATION, {
            operation: "resetEventBlock"
        });
    }
    set pollingInterval(value) {
        logger.throwError("cannot set polling interval on WebSocketProvider", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.UNSUPPORTED_OPERATION, {
            operation: "setPollingInterval"
        });
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    set polling(value) {
        if (!value) {
            return;
        }
        logger.throwError("cannot set polling on WebSocketProvider", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.UNSUPPORTED_OPERATION, {
            operation: "setPolling"
        });
    }
    send(method, params) {
        const rid = NextId++;
        return new Promise((resolve, reject) => {
            function callback(error, result) {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            }
            const payload = JSON.stringify({
                method: method,
                params: params,
                id: rid,
                jsonrpc: "2.0"
            });
            this.emit("debug", {
                action: "request",
                request: JSON.parse(payload),
                provider: this
            });
            this._requests[String(rid)] = { callback, payload };
            if (this._wsReady) {
                this._websocket.send(payload);
            }
        });
    }
    static defaultUrl() {
        return "ws:/\/localhost:8546";
    }
    _subscribe(tag, param, processFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            let subIdPromise = this._subIds[tag];
            if (subIdPromise == null) {
                subIdPromise = Promise.all(param).then((param) => {
                    return this.send("eth_subscribe", param);
                });
                this._subIds[tag] = subIdPromise;
            }
            const subId = yield subIdPromise;
            this._subs[subId] = { tag, processFunc };
        });
    }
    _startEvent(event) {
        switch (event.type) {
            case "block":
                this._subscribe("block", ["newHeads"], (result) => {
                    const blockNumber = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(result.number).toNumber();
                    this._emitted.block = blockNumber;
                    this.emit("block", blockNumber);
                });
                break;
            case "pending":
                this._subscribe("pending", ["newPendingTransactions"], (result) => {
                    this.emit("pending", result);
                });
                break;
            case "filter":
                this._subscribe(event.tag, ["logs", this._getFilter(event.filter)], (result) => {
                    if (result.removed == null) {
                        result.removed = false;
                    }
                    this.emit(event.filter, this.formatter.filterLog(result));
                });
                break;
            case "tx": {
                const emitReceipt = (event) => {
                    const hash = event.hash;
                    this.getTransactionReceipt(hash).then((receipt) => {
                        if (!receipt) {
                            return;
                        }
                        this.emit(hash, receipt);
                    });
                };
                // In case it is already mined
                emitReceipt(event);
                // To keep things simple, we start up a single newHeads subscription
                // to keep an eye out for transactions we are watching for.
                // Starting a subscription for an event (i.e. "tx") that is already
                // running is (basically) a nop.
                this._subscribe("tx", ["newHeads"], (result) => {
                    this._events.filter((e) => (e.type === "tx")).forEach(emitReceipt);
                });
                break;
            }
            // Nothing is needed
            case "debug":
            case "poll":
            case "willPoll":
            case "didPoll":
            case "error":
                break;
            default:
                console.log("unhandled:", event);
                break;
        }
    }
    _stopEvent(event) {
        let tag = event.tag;
        if (event.type === "tx") {
            // There are remaining transaction event listeners
            if (this._events.filter((e) => (e.type === "tx")).length) {
                return;
            }
            tag = "tx";
        }
        else if (this.listenerCount(event.event)) {
            // There are remaining event listeners
            return;
        }
        const subId = this._subIds[tag];
        if (!subId) {
            return;
        }
        delete this._subIds[tag];
        subId.then((subId) => {
            if (!this._subs[subId]) {
                return;
            }
            delete this._subs[subId];
            this.send("eth_unsubscribe", [subId]);
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            // Wait until we have connected before trying to disconnect
            if (this._websocket.readyState === _ws__WEBPACK_IMPORTED_MODULE_3__["WebSocket"].CONNECTING) {
                yield (new Promise((resolve) => {
                    this._websocket.onopen = function () {
                        resolve(true);
                    };
                    this._websocket.onerror = function () {
                        resolve(false);
                    };
                }));
            }
            // Hangup
            // See: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
            this._websocket.close(1000);
        });
    }
}
//# sourceMappingURL=websocket-provider.js.map

/***/ }),

/***/ "ewK1":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/index.js ***!
  \****************************************************************/
/*! exports provided: logger, Wordlist, wordlists */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wordlist */ "vZu+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return _wordlist__WEBPACK_IMPORTED_MODULE_0__["logger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Wordlist", function() { return _wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"]; });

/* harmony import */ var _wordlists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wordlists */ "VgU3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wordlists", function() { return _wordlists__WEBPACK_IMPORTED_MODULE_1__["wordlists"]; });


// Wordlists
// See: https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "fKWB":
/*!**********************************************************************!*\
  !*** ./node_modules/@ethersproject/abstract-signer/lib.esm/index.js ***!
  \**********************************************************************/
/*! exports provided: Signer, VoidSigner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Signer", function() { return Signer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoidSigner", function() { return VoidSigner; });
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "wr5v");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"](_version__WEBPACK_IMPORTED_MODULE_2__["version"]);
const allowedTransactionKeys = [
    "accessList", "chainId", "data", "from", "gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "type", "value"
];
const forwardErrors = [
    _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.INSUFFICIENT_FUNDS,
    _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.NONCE_EXPIRED,
    _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.REPLACEMENT_UNDERPRICED,
];
;
;
class Signer {
    ///////////////////
    // Sub-classes MUST call super
    constructor() {
        logger.checkAbstract(new.target, Signer);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "_isSigner", true);
    }
    ///////////////////
    // Sub-classes MAY override these
    getBalance(blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("getBalance");
            return yield this.provider.getBalance(this.getAddress(), blockTag);
        });
    }
    getTransactionCount(blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("getTransactionCount");
            return yield this.provider.getTransactionCount(this.getAddress(), blockTag);
        });
    }
    // Populates "from" if unspecified, and estimates the gas for the transation
    estimateGas(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("estimateGas");
            const tx = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["resolveProperties"])(this.checkTransaction(transaction));
            return yield this.provider.estimateGas(tx);
        });
    }
    // Populates "from" if unspecified, and calls with the transation
    call(transaction, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("call");
            const tx = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["resolveProperties"])(this.checkTransaction(transaction));
            return yield this.provider.call(tx, blockTag);
        });
    }
    // Populates all fields in a transaction, signs it and sends it to the network
    sendTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("sendTransaction");
            const tx = yield this.populateTransaction(transaction);
            const signedTx = yield this.signTransaction(tx);
            return yield this.provider.sendTransaction(signedTx);
        });
    }
    getChainId() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("getChainId");
            const network = yield this.provider.getNetwork();
            return network.chainId;
        });
    }
    getGasPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("getGasPrice");
            return yield this.provider.getGasPrice();
        });
    }
    getFeeData() {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("getFeeData");
            return yield this.provider.getFeeData();
        });
    }
    resolveName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkProvider("resolveName");
            return yield this.provider.resolveName(name);
        });
    }
    // Checks a transaction does not contain invalid keys and if
    // no "from" is provided, populates it.
    // - does NOT require a provider
    // - adds "from" is not present
    // - returns a COPY (safe to mutate the result)
    // By default called from: (overriding these prevents it)
    //   - call
    //   - estimateGas
    //   - populateTransaction (and therefor sendTransaction)
    checkTransaction(transaction) {
        for (const key in transaction) {
            if (allowedTransactionKeys.indexOf(key) === -1) {
                logger.throwArgumentError("invalid transaction key: " + key, "transaction", transaction);
            }
        }
        const tx = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["shallowCopy"])(transaction);
        if (tx.from == null) {
            tx.from = this.getAddress();
        }
        else {
            // Make sure any provided address matches this signer
            tx.from = Promise.all([
                Promise.resolve(tx.from),
                this.getAddress()
            ]).then((result) => {
                if (result[0].toLowerCase() !== result[1].toLowerCase()) {
                    logger.throwArgumentError("from address mismatch", "transaction", transaction);
                }
                return result[0];
            });
        }
        return tx;
    }
    // Populates ALL keys for a transaction and checks that "from" matches
    // this Signer. Should be used by sendTransaction but NOT by signTransaction.
    // By default called from: (overriding these prevents it)
    //   - sendTransaction
    //
    // Notes:
    //  - We allow gasPrice for EIP-1559 as long as it matches maxFeePerGas
    populateTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["resolveProperties"])(this.checkTransaction(transaction));
            if (tx.to != null) {
                tx.to = Promise.resolve(tx.to).then((to) => __awaiter(this, void 0, void 0, function* () {
                    if (to == null) {
                        return null;
                    }
                    const address = yield this.resolveName(to);
                    if (address == null) {
                        logger.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
                    }
                    return address;
                }));
                // Prevent this error from causing an UnhandledPromiseException
                tx.to.catch((error) => { });
            }
            // Do not allow mixing pre-eip-1559 and eip-1559 proerties
            const hasEip1559 = (tx.maxFeePerGas != null || tx.maxPriorityFeePerGas != null);
            if (tx.gasPrice != null && (tx.type === 2 || hasEip1559)) {
                logger.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", transaction);
            }
            else if ((tx.type === 0 || tx.type === 1) && hasEip1559) {
                logger.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", transaction);
            }
            if ((tx.type === 2 || tx.type == null) && (tx.maxFeePerGas != null && tx.maxPriorityFeePerGas != null)) {
                // Fully-formed EIP-1559 transaction (skip getFeeData)
                tx.type = 2;
            }
            else if (tx.type === 0 || tx.type === 1) {
                // Explicit Legacy or EIP-2930 transaction
                // Populate missing gasPrice
                if (tx.gasPrice == null) {
                    tx.gasPrice = this.getGasPrice();
                }
            }
            else {
                // We need to get fee data to determine things
                const feeData = yield this.getFeeData();
                if (tx.type == null) {
                    // We need to auto-detect the intended type of this transaction...
                    if (feeData.maxFeePerGas != null && feeData.maxPriorityFeePerGas != null) {
                        // The network supports EIP-1559!
                        // Upgrade transaction from null to eip-1559
                        tx.type = 2;
                        if (tx.gasPrice != null) {
                            // Using legacy gasPrice property on an eip-1559 network,
                            // so use gasPrice as both fee properties
                            const gasPrice = tx.gasPrice;
                            delete tx.gasPrice;
                            tx.maxFeePerGas = gasPrice;
                            tx.maxPriorityFeePerGas = gasPrice;
                        }
                        else {
                            // Populate missing fee data
                            if (tx.maxFeePerGas == null) {
                                tx.maxFeePerGas = feeData.maxFeePerGas;
                            }
                            if (tx.maxPriorityFeePerGas == null) {
                                tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
                            }
                        }
                    }
                    else if (feeData.gasPrice != null) {
                        // Network doesn't support EIP-1559...
                        // ...but they are trying to use EIP-1559 properties
                        if (hasEip1559) {
                            logger.throwError("network does not support EIP-1559", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.UNSUPPORTED_OPERATION, {
                                operation: "populateTransaction"
                            });
                        }
                        // Populate missing fee data
                        if (tx.gasPrice == null) {
                            tx.gasPrice = feeData.gasPrice;
                        }
                        // Explicitly set untyped transaction to legacy
                        tx.type = 0;
                    }
                    else {
                        // getFeeData has failed us.
                        logger.throwError("failed to get consistent fee data", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.UNSUPPORTED_OPERATION, {
                            operation: "signer.getFeeData"
                        });
                    }
                }
                else if (tx.type === 2) {
                    // Explicitly using EIP-1559
                    // Populate missing fee data
                    if (tx.maxFeePerGas == null) {
                        tx.maxFeePerGas = feeData.maxFeePerGas;
                    }
                    if (tx.maxPriorityFeePerGas == null) {
                        tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
                    }
                }
            }
            if (tx.nonce == null) {
                tx.nonce = this.getTransactionCount("pending");
            }
            if (tx.gasLimit == null) {
                tx.gasLimit = this.estimateGas(tx).catch((error) => {
                    if (forwardErrors.indexOf(error.code) >= 0) {
                        throw error;
                    }
                    return logger.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.UNPREDICTABLE_GAS_LIMIT, {
                        error: error,
                        tx: tx
                    });
                });
            }
            if (tx.chainId == null) {
                tx.chainId = this.getChainId();
            }
            else {
                tx.chainId = Promise.all([
                    Promise.resolve(tx.chainId),
                    this.getChainId()
                ]).then((results) => {
                    if (results[1] !== 0 && results[0] !== results[1]) {
                        logger.throwArgumentError("chainId address mismatch", "transaction", transaction);
                    }
                    return results[0];
                });
            }
            return yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["resolveProperties"])(tx);
        });
    }
    ///////////////////
    // Sub-classes SHOULD leave these alone
    _checkProvider(operation) {
        if (!this.provider) {
            logger.throwError("missing provider", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: (operation || "_checkProvider")
            });
        }
    }
    static isSigner(value) {
        return !!(value && value._isSigner);
    }
}
class VoidSigner extends Signer {
    constructor(address, provider) {
        logger.checkNew(new.target, VoidSigner);
        super();
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "address", address);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "provider", provider || null);
    }
    getAddress() {
        return Promise.resolve(this.address);
    }
    _fail(message, operation) {
        return Promise.resolve().then(() => {
            logger.throwError(message, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.UNSUPPORTED_OPERATION, { operation: operation });
        });
    }
    signMessage(message) {
        return this._fail("VoidSigner cannot sign messages", "signMessage");
    }
    signTransaction(transaction) {
        return this._fail("VoidSigner cannot sign transactions", "signTransaction");
    }
    _signTypedData(domain, types, value) {
        return this._fail("VoidSigner cannot sign typed data", "signTypedData");
    }
    connect(provider) {
        return new VoidSigner(this.address, provider);
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "fsgg":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-zh.js ***!
  \******************************************************************/
/*! exports provided: langZhCn, langZhTw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langZhCn", function() { return langZhCn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langZhTw", function() { return langZhTw; });
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wordlist */ "vZu+");



const data = "}aE#4A=Yv&co#4N#6G=cJ&SM#66|/Z#4t&kn~46#4K~4q%b9=IR#7l,mB#7W_X2*dl}Uo~7s}Uf&Iw#9c&cw~6O&H6&wx&IG%v5=IQ~8a&Pv#47$PR&50%Ko&QM&3l#5f,D9#4L|/H&tQ;v0~6n]nN<di,AM=W5%QO&ka&ua,hM^tm=zV=JA=wR&+X]7P&NB#4J#5L|/b[dA}tJ<Do&6m&u2[U1&Kb.HM&mC=w0&MW<rY,Hq#6M}QG,13&wP}Jp]Ow%ue&Kg<HP<D9~4k~9T&I2_c6$9T#9/[C5~7O~4a=cs&O7=KK=An&l9$6U$8A&uD&QI|/Y&bg}Ux&F2#6b}E2&JN&kW&kp=U/&bb=Xl<Cj}k+~5J#6L&5z&9i}b4&Fo,ho(X0_g3~4O$Fz&QE<HN=Ww]6/%GF-Vw=tj&/D&PN#9g=YO}cL&Of&PI~5I&Ip=vU=IW#9G;0o-wU}ss&QR<BT&R9=tk$PY_dh&Pq-yh]7T,nj.Xu=EP&76=cI&Fs*Xg}z7$Gb&+I=DF,AF=cA}rL#7j=Dz&3y<Aa$52=PQ}b0(iY$Fa}oL&xV#6U=ec=WZ,xh%RY<dp#9N&Fl&44=WH*A7=sh&TB&8P=07;u+&PK}uh}J5#72)V/=xC,AB$k0&f6;1E|+5=1B,3v]6n&wR%b+&xx]7f=Ol}fl;+D^wG]7E;nB;uh^Ir&l5=JL,nS=cf=g5;u6|/Q$Gc=MH%Hg#5d%M6^86=U+$Gz,l/,ir^5y&Ba&/F-IY&FI&be%IZ#77&PW_Nu$kE(Yf&NX]7Z,Jy&FJ(Xo&Nz#/d=y7&MX<Ag}Z+;nE]Dt(iG#4D=13&Pj~4c%v8&Zo%OL&/X#4W<HR&ie~6J_1O(Y2=y5=Ad*cv_eB#6k&PX:BU#7A;uk&Ft&Fx_dD=U2;vB=U5=4F}+O&GN.HH:9s=b0%NV(jO&IH=JT}Z9=VZ<Af,Kx^4m&uJ%c6,6r;9m#+L}cf%Kh&F3~4H=vP}bu,Hz|++,1w]nv}k6;uu$jw*Kl*WX&uM[x7&Fr[m7$NO&QN]hu=JN}nR^8g#/h(ps|KC;vd}xz=V0}p6&FD$G1#7K<bG_4p~8g&cf;u4=tl}+k%5/}fz;uw<cA=u1}gU}VM=LJ=eX&+L&Pr#4U}p2:nC,2K]7H:jF&9x}uX#9O=MB<fz~8X~5m&4D&kN&u5%E/(h7(ZF&VG<de(qM|/e-Wt=3x(a+,/R]f/&ND$Ro&nU}0g=KA%kH&NK$Ke<dS}cB&IX~5g$TN]6m=Uv,Is&Py=Ef%Kz#+/%bi&+A<F4$OG&4C&FL#9V<Zk=2I_eE&6c]nw&kq$HG}y+&A8$P3}OH=XP]70%IS(AJ_gH%GZ&tY&AZ=vb~6y&/r=VI=Wv<Zi=fl=xf&eL}c8}OL=MJ=g8$F7=YT}9u=0+^xC}JH&nL^N0~4T]K2,Cy%OC#6s;vG(AC^xe^cG&MF}Br#9P;wD-7h$O/&xA}Fn^PC]6i]7G&8V$Qs;vl(TB~73~4l<mW&6V=2y&uY&+3)aP}XF;LP&kx$wU=t7;uy<FN&lz)7E=Oo*Y+;wI}9q}le;J6&Ri&4t&Qr#8B=cb&vG=J5|Ql(h5<Yy~4+}QD,Lx=wn%K/&RK=dO&Pw,Q9=co%4u;9u}g0@6a^4I%b0=zo|/c&tX=dQ=OS#+b=yz_AB&wB&Pm=W9$HP_gR=62=AO=ti=hI,oA&jr&dH=tm&b6$P2(x8=zi;nG~7F;05]0n[Ix&3m}rg=Xp=cd&uz]7t;97=cN;vV<jf&FF&F1=6Q&Ik*Kk&P4,2z=fQ]7D&3u,H0=d/}Uw<ZN<7R}Kv;0f$H7,MD]7n$F0#88~9Z%da=by;+T#/u=VF&fO&kr^kf<AB]sU,I5$Ng&Pz;0i&QD&vM=Yl:BM;nJ_xJ]U7&Kf&30,3f|Z9*dC)je_jA&Q4&Kp$NH(Yz#6S&Id%Ib=KX,AD=KV%dP}tW&Pk^+E_Ni=cq,3R}VZ(Si=b+}rv;0j}rZ]uA,/w(Sx&Jv$w9&4d&wE,NJ$Gy=J/]Ls#7k<ZQ<Y/&uj]Ov$PM;v3,2F&+u:up=On&3e,Jv;90=J+&Qm]6q}bK#+d~8Y(h2]hA;99&AS=I/}qB&dQ}yJ-VM}Vl&ui,iB&G3|Dc]7d=eQ%dX%JC_1L~4d^NP;vJ&/1)ZI#7N]9X[bQ&PL=0L(UZ,Lm&kc&IR}n7(iR<AQ<dg=33=vN}ft}au]7I,Ba=x9=dR~6R&Tq=Xi,3d$Nr&Bc}DI&ku&vf]Dn,/F&iD,Ll&Nw=0y&I7=Ls=/A&tU=Qe}Ua&uk&+F=g4=gh=Vj#+1&Qn}Uy*44#5F,Pc&Rz*Xn=oh=5W;0n_Nf(iE<Y7=vr=Zu]oz#5Z%mI=kN=Bv_Jp(T2;vt_Ml<FS&uI=L/&6P]64$M7}86<bo%QX(SI%IY&VK=Al&Ux;vv;ut*E/%uh<ZE|O3,M2(yc]yu=Wk&tp:Ex}hr,Cl&WE)+Z=8U}I2_4Q,hA_si=iw=OM=tM=yZ%Ia=U7;wT}b+;uo=Za}yS!5x}HD}fb#5O_dA;Nv%uB(yB;01(Sf}Fk;v7}Pt#8v<mZ#7L,/r&Pl~4w&f5=Ph$Fw_LF&8m,bL=yJ&BH}p/*Jn}tU~5Q;wB(h6]Df]8p^+B;E4&Wc=d+;Ea&bw$8C&FN,DM=Yf}mP~5w=fT#6V=mC=Fi=AV}jB&AN}lW}aH#/D)dZ;hl;vE}/7,CJ;31&w8,hj%u9_Js=jJ&4M~8k=TN&eC}nL&uc-wi&lX}dj=Mv=e2#6u=cr$uq$6G]8W}Jb:nm=Yg<b3(UA;vX&6n&xF=KT,jC,De&R8&oY=Zv&oB]7/=Z2&Oa}bf,hh(4h^tZ&72&Nx;D2&xL~5h~40)ZG)h+=OJ&RA]Bv$yB=Oq=df,AQ%Jn}OJ;11,3z&Tl&tj;v+^Hv,Dh(id=s+]7N&N3)9Q~8f,S4=uW=w4&uX,LX&3d]CJ&yp&8x<b2_do&lP=y/<cy_dG=Oi=7R(VH(lt_1T,Iq_AA;12^6T%k6#8K[B1{oO<AU[Bt;1b$9S&Ps<8T=St{bY,jB(Zp&63&Uv$9V,PM]6v&Af}zW[bW_oq}sm}nB&Kq&gC&ff_eq_2m&5F&TI}rf}Gf;Zr_z9;ER&jk}iz_sn<BN~+n&vo=Vi%97|ZR=Wc,WE&6t]6z%85(ly#84=KY)6m_5/=aX,N3}Tm&he&6K]tR_B2-I3;u/&hU&lH<AP=iB&IA=XL;/5&Nh=wv<BH#79=vS=zl<AA=0X_RG}Bw&9p$NW,AX&kP_Lp&/Z(Tc]Mu}hs#6I}5B&cI<bq&H9#6m=K9}vH(Y1(Y0#4B&w6,/9&gG<bE,/O=zb}I4_l8<B/;wL%Qo<HO[Mq=XX}0v&BP&F4(mG}0i}nm,EC=9u{I3,xG&/9=JY*DK&hR)BX=EI=cx=b/{6k}yX%A+&wa}Xb=la;wi^lL;0t}jo&Qb=xg=XB}iO<qo{bR=NV&8f=a0&Jy;0v=uK)HK;vN#6h&jB(h/%ud&NI%wY.X7=Pt}Cu-uL&Gs_hl%mH,tm]78=Lb^Q0#7Y=1u<Bt&+Q=Co_RH,w3;1e}ux<aU;ui}U3&Q5%bt]63&UQ|0l&uL}O7&3o,AV&dm|Nj(Xt*5+(Uu&Hh(p7(UF=VR=Bp^Jl&Hd[ix)9/=Iq]C8<67]66}mB%6f}bb}JI]8T$HA}db=YM&pa=2J}tS&Y0=PS&y4=cX$6E,hX,XP&nR;04,FQ&l0&Vm_Dv#5Y~8Z=Bi%MA]6x=JO:+p,Az&9q,Hj~6/}SD=K1:EJ}nA;Qo#/E]9R,Ie&6X%W3]61&v4=xX_MC=0q;06(Xq=fs}IG}Dv=0l}o7$iZ;9v&LH&DP-7a&OY,SZ,Kz,Cv&dh=fx|Nh,F/~7q=XF&w+;9n&Gw;0h}Z7<7O&JK(S7&LS<AD<ac=wo<Dt&zw%4B=4v#8P;9o~6p*vV=Tm,Or&I6=1q}nY=P0=gq&Bl&Uu,Ch%yb}UY=zh}dh}rl(T4_xk(YA#8R*xH,IN}Jn]7V}C4&Ty}j3]7p=cL=3h&wW%Qv<Z3=f0&RI&+S(ic_zq}oN&/Y=z1;Td=LW=0e=OI(Vc,+b^ju(UL;0r:Za%8v=Rp=zw&58&73&wK}qX]6y&8E)a2}WR=wP^ur&nQ<cH}Re=Aq&wk}Q0&+q=PP,Gc|/d^k5,Fw]8Y}Pg]p3=ju=ed}r5_yf&Cs]7z$/G<Cm&Jp&54_1G_gP_Ll}JZ;0u]k8_7k(Sg]65{9i=LN&Sx&WK,iW&fD&Lk{9a}Em-9c#8N&io=sy]8d&nT&IK(lx#7/$lW(Td<s8~49,3o<7Y=MW(T+_Jr&Wd,iL}Ct=xh&5V;v4&8n%Kx=iF&l2_0B{B+,If(J0,Lv;u8=Kx-vB=HC&vS=Z6&fU&vE^xK;3D=4h=MR#45:Jw;0d}iw=LU}I5=I0]gB*im,K9}GU,1k_4U&Tt=Vs(iX&lU(TF#7y,ZO}oA&m5#5P}PN}Uz=hM<B1&FB<aG,e6~7T<tP(UQ_ZT=wu&F8)aQ]iN,1r_Lo&/g:CD}84{J1_Ki&Na&3n$jz&FE=dc;uv;va}in}ll=fv(h1&3h}fp=Cy}BM(+E~8m}lo%v7=hC(T6$cj=BQ=Bw(DR,2j=Ks,NS|F+;00=fU=70}Mb(YU;+G&m7&hr=Sk%Co]t+(X5_Jw}0r}gC(AS-IP&QK<Z2#8Q$WC]WX}T2&pG_Ka,HC=R4&/N;Z+;ch(C7,D4$3p_Mk&B2$8D=n9%Ky#5z(CT&QJ#7B]DC]gW}nf~5M;Iw#80}Tc_1F#4Z-aC}Hl=ph=fz,/3=aW}JM}nn;DG;vm}wn,4P}T3;wx&RG$u+}zK=0b;+J_Ek{re<aZ=AS}yY#5D]7q,Cp}xN=VP*2C}GZ}aG~+m_Cs=OY#6r]6g<GS}LC(UB=3A=Bo}Jy<c4}Is;1P<AG}Op<Z1}ld}nS=1Z,yM&95&98=CJ(4t:2L$Hk=Zo}Vc;+I}np&N1}9y=iv}CO*7p=jL)px]tb^zh&GS&Vl%v/;vR=14=zJ&49|/f]hF}WG;03=8P}o/&Gg&rp;DB,Kv}Ji&Pb;aA^ll(4j%yt}+K$Ht#4y&hY]7Y<F1,eN}bG(Uh%6Z]t5%G7;+F_RE;it}tL=LS&Da=Xx(S+(4f=8G=yI}cJ}WP=37=jS}pX}hd)fp<A8=Jt~+o$HJ=M6}iX=g9}CS=dv=Cj(mP%Kd,xq|+9&LD(4/=Xm&QP=Lc}LX&fL;+K=Op(lu=Qs.qC:+e&L+=Jj#8w;SL]7S(b+#4I=c1&nG_Lf&uH;+R)ZV<bV%B/,TE&0H&Jq&Ah%OF&Ss(p2,Wv&I3=Wl}Vq;1L&lJ#9b_1H=8r=b8=JH(SZ=hD=J2#7U,/U#/X~6P,FU<eL=jx,mG=hG=CE&PU=Se(qX&LY=X6=y4&tk&QQ&tf=4g&xI}W+&mZ=Dc#7w}Lg;DA;wQ_Kb(cJ=hR%yX&Yb,hw{bX_4X;EP;1W_2M}Uc=b5(YF,CM&Tp^OJ{DD]6s=vF=Yo~8q}XH}Fu%P5(SJ=Qt;MO]s8<F3&B3&8T(Ul-BS*dw&dR<87}/8]62$PZ]Lx<Au}9Q]7c=ja=KR,Go,Us&v6(qk}pG&G2=ev^GM%w4&H4]7F&dv]J6}Ew:9w=sj-ZL}Ym$+h(Ut(Um~4n=Xs(U7%eE=Qc_JR<CA#6t<Fv|/I,IS,EG<F2(Xy$/n<Fa(h9}+9_2o&N4#7X<Zq|+f_Dp=dt&na,Ca=NJ)jY=8C=YG=s6&Q+<DO}D3=xB&R1(lw;Qn<bF(Cu|/B}HV=SS&n7,10&u0]Dm%A6^4Q=WR(TD=Xo<GH,Rj(l8)bP&n/=LM&CF,F5&ml=PJ;0k=LG=tq,Rh,D6@4i=1p&+9=YC%er_Mh;nI;0q=Fw]80=xq=FM$Gv;v6&nc;wK%H2&Kj;vs,AA=YP,66}bI(qR~5U=6q~4b$Ni=K5.X3$So&Iu(p+]8G=Cf=RY(TS_O3(iH&57=fE=Dg_Do#9z#7H;FK{qd_2k%JR}en&gh_z8;Rx}9p<cN_Ne,DO;LN_7o~/p=NF=5Y}gN<ce<C1,QE]Wv=3u<BC}GK]yq}DY&u/_hj=II(pz&rC,jV&+Z}ut=NQ;Cg-SR_ZS,+o=u/;Oy_RK_QF(Fx&xP}Wr&TA,Uh&g1=yr{ax[VF$Pg(YB;Ox=Vy;+W(Sp}XV%dd&33(l/]l4#4Y}OE=6c=bw(A7&9t%wd&N/&mo,JH&Qe)fm=Ao}fu=tH";
const deltaData = "FAZDC6BALcLZCA+GBARCW8wNCcDDZ8LVFBOqqDUiou+M42TFAyERXFb7EjhP+vmBFpFrUpfDV2F7eB+eCltCHJFWLFCED+pWTojEIHFXc3aFn4F68zqjEuKidS1QBVPDEhE7NA4mhMF7oThD49ot3FgtzHFCK0acW1x8DH1EmLoIlrWFBLE+y5+NA3Cx65wJHTaEZVaK1mWAmPGxgYCdxwOjTDIt/faOEhTl1vqNsKtJCOhJWuio2g07KLZEQsFBUpNtwEByBgxFslFheFbiEPvi61msDvApxCzB6rBCzox7joYA5UdDc+Cb4FSgIabpXFAj3bjkmFAxCZE+mD/SFf/0ELecYCt3nLoxC6WEZf2tKDB4oZvrEmqFkKk7BwILA7gtYBpsTq//D4jD0F0wEB9pyQ1BD5Ba0oYHDI+sbDFhvrHXdDHfgFEIJLi5r8qercNFBgFLC4bo5ERJtamWBDFy73KCEb6M8VpmEt330ygCTK58EIIFkYgF84gtGA9Uyh3m68iVrFbWFbcbqiCYHZ9J1jeRPbL8yswhMiDbhEhdNoSwFbZrLT740ABEqgCkO8J1BLd1VhKKR4sD1yUo0z+FF59Mvg71CFbyEhbHSFBKEIKyoQNgQppq9T0KAqePu0ZFGrXOHdKJqkoTFhYvpDNyuuznrN84thJbsCoO6Cu6Xlvntvy0QYuAExQEYtTUBf3CoCqwgGFZ4u1HJFzDVwEy3cjcpV4QvsPaBC3rCGyCF23o4K3pp2gberGgFEJEHo4nHICtyKH2ZqyxhN05KBBJIQlKh/Oujv/DH32VrlqFdIFC7Fz9Ct4kaqFME0UETLprnN9kfy+kFmtQBB0+5CFu0N9Ij8l/VvJDh2oq3hT6EzjTHKFN7ZjZwoTsAZ4Exsko6Fpa6WC+sduz8jyrLpegTv2h1EBeYpLpm2czQW0KoCcS0bCVXCmuWJDBjN1nQNLdF58SFJ0h7i3pC3oEOKy/FjBklL70XvBEEIWp2yZ04xObzAWDDJG7f+DbqBEA7LyiR95j7MDVdDViz2RE5vWlBMv5e4+VfhP3aXNPhvLSynb9O2x4uFBV+3jqu6d5pCG28/sETByvmu/+IJ0L3wb4rj9DNOLBF6XPIODr4L19U9RRofAG6Nxydi8Bki8BhGJbBAJKzbJxkZSlF9Q2Cu8oKqggB9hBArwLLqEBWEtFowy8XK8bEyw9snT+BeyFk1ZCSrdmgfEwFePTgCjELBEnIbjaDDPJm36rG9pztcEzT8dGk23SBhXBB1H4z+OWze0ooFzz8pDBYFvp9j9tvFByf9y4EFdVnz026CGR5qMr7fxMHN8UUdlyJAzlTBDRC28k+L4FB8078ljyD91tUj1ocnTs8vdEf7znbzm+GIjEZnoZE5rnLL700Xc7yHfz05nWxy03vBB9YGHYOWxgMQGBCR24CVYNE1hpfKxN0zKnfJDmmMgMmBWqNbjfSyFCBWSCGCgR8yFXiHyEj+VtD1FB3FpC1zI0kFbzifiKTLm9yq5zFmur+q8FHqjoOBWsBPiDbnCC2ErunV6cJ6TygXFYHYp7MKN9RUlSIS8/xBAGYLzeqUnBF4QbsTuUkUqGs6CaiDWKWjQK9EJkjpkTmNCPYXL";
// @TODO: Load lazily
const wordlist = {
    zh_cn: null,
    zh_tw: null
};
const Checks = {
    zh_cn: "0x17bcc4d8547e5a7135e365d1ab443aaae95e76d8230c2782c67305d4f21497a1",
    zh_tw: "0x51e720e90c7b87bec1d70eb6e74a21a449bd3ec9c020b01d3a40ed991b60ce5d"
};
const codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const style = "~!@#$%^&*_-=[]{}|;:,.()<>?";
function loadWords(lang) {
    if (wordlist[lang.locale] !== null) {
        return;
    }
    wordlist[lang.locale] = [];
    let deltaOffset = 0;
    for (let i = 0; i < 2048; i++) {
        const s = style.indexOf(data[i * 3]);
        const bytes = [
            228 + (s >> 2),
            128 + codes.indexOf(data[i * 3 + 1]),
            128 + codes.indexOf(data[i * 3 + 2]),
        ];
        if (lang.locale === "zh_tw") {
            const common = s % 4;
            for (let i = common; i < 3; i++) {
                bytes[i] = codes.indexOf(deltaData[deltaOffset++]) + ((i == 0) ? 228 : 128);
            }
        }
        wordlist[lang.locale].push(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8String"])(bytes));
    }
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].check(lang) !== Checks[lang.locale]) {
        wordlist[lang.locale] = null;
        throw new Error("BIP39 Wordlist for " + lang.locale + " (Chinese) FAILED");
    }
}
class LangZh extends _wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"] {
    constructor(country) {
        super("zh_" + country);
    }
    getWord(index) {
        loadWords(this);
        return wordlist[this.locale][index];
    }
    getWordIndex(word) {
        loadWords(this);
        return wordlist[this.locale].indexOf(word);
    }
    split(mnemonic) {
        mnemonic = mnemonic.replace(/(?:\u3000| )+/g, "");
        return mnemonic.split("");
    }
}
const langZhCn = new LangZh("cn");
_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].register(langZhCn);
_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].register(langZhCn, "zh");
const langZhTw = new LangZh("tw");
_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].register(langZhTw);

//# sourceMappingURL=lang-zh.js.map

/***/ }),

/***/ "fwYn":
/*!********************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/formatter.js ***!
  \********************************************************************/
/*! exports provided: Formatter, isCommunityResourcable, isCommunityResource, showThrottleMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Formatter", function() { return Formatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCommunityResourcable", function() { return isCommunityResourcable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCommunityResource", function() { return isCommunityResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showThrottleMessage", function() { return showThrottleMessage; });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/constants */ "tGuN");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/transactions */ "WsP5");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_version */ "SkWp");









const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_6__["Logger"](_version__WEBPACK_IMPORTED_MODULE_7__["version"]);
class Formatter {
    constructor() {
        logger.checkNew(new.target, Formatter);
        this.formats = this.getDefaultFormats();
    }
    getDefaultFormats() {
        const formats = ({});
        const address = this.address.bind(this);
        const bigNumber = this.bigNumber.bind(this);
        const blockTag = this.blockTag.bind(this);
        const data = this.data.bind(this);
        const hash = this.hash.bind(this);
        const hex = this.hex.bind(this);
        const number = this.number.bind(this);
        const type = this.type.bind(this);
        const strictData = (v) => { return this.data(v, true); };
        formats.transaction = {
            hash: hash,
            type: type,
            accessList: Formatter.allowNull(this.accessList.bind(this), null),
            blockHash: Formatter.allowNull(hash, null),
            blockNumber: Formatter.allowNull(number, null),
            transactionIndex: Formatter.allowNull(number, null),
            confirmations: Formatter.allowNull(number, null),
            from: address,
            // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas)
            // must be set
            gasPrice: Formatter.allowNull(bigNumber),
            maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
            maxFeePerGas: Formatter.allowNull(bigNumber),
            gasLimit: bigNumber,
            to: Formatter.allowNull(address, null),
            value: bigNumber,
            nonce: number,
            data: data,
            r: Formatter.allowNull(this.uint256),
            s: Formatter.allowNull(this.uint256),
            v: Formatter.allowNull(number),
            creates: Formatter.allowNull(address, null),
            raw: Formatter.allowNull(data),
        };
        formats.transactionRequest = {
            from: Formatter.allowNull(address),
            nonce: Formatter.allowNull(number),
            gasLimit: Formatter.allowNull(bigNumber),
            gasPrice: Formatter.allowNull(bigNumber),
            maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
            maxFeePerGas: Formatter.allowNull(bigNumber),
            to: Formatter.allowNull(address),
            value: Formatter.allowNull(bigNumber),
            data: Formatter.allowNull(strictData),
            type: Formatter.allowNull(number),
            accessList: Formatter.allowNull(this.accessList.bind(this), null),
        };
        formats.receiptLog = {
            transactionIndex: number,
            blockNumber: number,
            transactionHash: hash,
            address: address,
            topics: Formatter.arrayOf(hash),
            data: data,
            logIndex: number,
            blockHash: hash,
        };
        formats.receipt = {
            to: Formatter.allowNull(this.address, null),
            from: Formatter.allowNull(this.address, null),
            contractAddress: Formatter.allowNull(address, null),
            transactionIndex: number,
            // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
            root: Formatter.allowNull(hex),
            gasUsed: bigNumber,
            logsBloom: Formatter.allowNull(data),
            blockHash: hash,
            transactionHash: hash,
            logs: Formatter.arrayOf(this.receiptLog.bind(this)),
            blockNumber: number,
            confirmations: Formatter.allowNull(number, null),
            cumulativeGasUsed: bigNumber,
            effectiveGasPrice: Formatter.allowNull(bigNumber),
            status: Formatter.allowNull(number),
            type: type
        };
        formats.block = {
            hash: hash,
            parentHash: hash,
            number: number,
            timestamp: number,
            nonce: Formatter.allowNull(hex),
            difficulty: this.difficulty.bind(this),
            gasLimit: bigNumber,
            gasUsed: bigNumber,
            miner: address,
            extraData: data,
            transactions: Formatter.allowNull(Formatter.arrayOf(hash)),
            baseFeePerGas: Formatter.allowNull(bigNumber)
        };
        formats.blockWithTransactions = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__["shallowCopy"])(formats.block);
        formats.blockWithTransactions.transactions = Formatter.allowNull(Formatter.arrayOf(this.transactionResponse.bind(this)));
        formats.filter = {
            fromBlock: Formatter.allowNull(blockTag, undefined),
            toBlock: Formatter.allowNull(blockTag, undefined),
            blockHash: Formatter.allowNull(hash, undefined),
            address: Formatter.allowNull(address, undefined),
            topics: Formatter.allowNull(this.topics.bind(this), undefined),
        };
        formats.filterLog = {
            blockNumber: Formatter.allowNull(number),
            blockHash: Formatter.allowNull(hash),
            transactionIndex: number,
            removed: Formatter.allowNull(this.boolean.bind(this)),
            address: address,
            data: Formatter.allowFalsish(data, "0x"),
            topics: Formatter.arrayOf(hash),
            transactionHash: hash,
            logIndex: number,
        };
        return formats;
    }
    accessList(accessList) {
        return Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_5__["accessListify"])(accessList || []);
    }
    // Requires a BigNumberish that is within the IEEE754 safe integer range; returns a number
    // Strict! Used on input.
    number(number) {
        if (number === "0x") {
            return 0;
        }
        return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(number).toNumber();
    }
    type(number) {
        if (number === "0x" || number == null) {
            return 0;
        }
        return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(number).toNumber();
    }
    // Strict! Used on input.
    bigNumber(value) {
        return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(value);
    }
    // Requires a boolean, "true" or  "false"; returns a boolean
    boolean(value) {
        if (typeof (value) === "boolean") {
            return value;
        }
        if (typeof (value) === "string") {
            value = value.toLowerCase();
            if (value === "true") {
                return true;
            }
            if (value === "false") {
                return false;
            }
        }
        throw new Error("invalid boolean - " + value);
    }
    hex(value, strict) {
        if (typeof (value) === "string") {
            if (!strict && value.substring(0, 2) !== "0x") {
                value = "0x" + value;
            }
            if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(value)) {
                return value.toLowerCase();
            }
        }
        return logger.throwArgumentError("invalid hash", "value", value);
    }
    data(value, strict) {
        const result = this.hex(value, strict);
        if ((result.length % 2) !== 0) {
            throw new Error("invalid data; odd-length - " + value);
        }
        return result;
    }
    // Requires an address
    // Strict! Used on input.
    address(value) {
        return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(value);
    }
    callAddress(value) {
        if (!Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(value, 32)) {
            return null;
        }
        const address = Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexDataSlice"])(value, 12));
        return (address === _ethersproject_constants__WEBPACK_IMPORTED_MODULE_3__["AddressZero"]) ? null : address;
    }
    contractAddress(value) {
        return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getContractAddress"])(value);
    }
    // Strict! Used on input.
    blockTag(blockTag) {
        if (blockTag == null) {
            return "latest";
        }
        if (blockTag === "earliest") {
            return "0x0";
        }
        if (blockTag === "latest" || blockTag === "pending") {
            return blockTag;
        }
        if (typeof (blockTag) === "number" || Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(blockTag)) {
            return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexValue"])(blockTag);
        }
        throw new Error("invalid blockTag");
    }
    // Requires a hash, optionally requires 0x prefix; returns prefixed lowercase hash.
    hash(value, strict) {
        const result = this.hex(value, strict);
        if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexDataLength"])(result) !== 32) {
            return logger.throwArgumentError("invalid hash", "value", value);
        }
        return result;
    }
    // Returns the difficulty as a number, or if too large (i.e. PoA network) null
    difficulty(value) {
        if (value == null) {
            return null;
        }
        const v = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(value);
        try {
            return v.toNumber();
        }
        catch (error) { }
        return null;
    }
    uint256(value) {
        if (!Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(value)) {
            throw new Error("invalid uint256");
        }
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexZeroPad"])(value, 32);
    }
    _block(value, format) {
        if (value.author != null && value.miner == null) {
            value.miner = value.author;
        }
        return Formatter.check(format, value);
    }
    block(value) {
        return this._block(value, this.formats.block);
    }
    blockWithTransactions(value) {
        return this._block(value, this.formats.blockWithTransactions);
    }
    // Strict! Used on input.
    transactionRequest(value) {
        return Formatter.check(this.formats.transactionRequest, value);
    }
    transactionResponse(transaction) {
        // Rename gas to gasLimit
        if (transaction.gas != null && transaction.gasLimit == null) {
            transaction.gasLimit = transaction.gas;
        }
        // Some clients (TestRPC) do strange things like return 0x0 for the
        // 0 address; correct this to be a real address
        if (transaction.to && _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(transaction.to).isZero()) {
            transaction.to = "0x0000000000000000000000000000000000000000";
        }
        // Rename input to data
        if (transaction.input != null && transaction.data == null) {
            transaction.data = transaction.input;
        }
        // If to and creates are empty, populate the creates from the transaction
        if (transaction.to == null && transaction.creates == null) {
            transaction.creates = this.contractAddress(transaction);
        }
        if ((transaction.type === 1 || transaction.type === 2) && transaction.accessList == null) {
            transaction.accessList = [];
        }
        const result = Formatter.check(this.formats.transaction, transaction);
        if (transaction.chainId != null) {
            let chainId = transaction.chainId;
            if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(chainId)) {
                chainId = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(chainId).toNumber();
            }
            result.chainId = chainId;
        }
        else {
            let chainId = transaction.networkId;
            // geth-etc returns chainId
            if (chainId == null && result.v == null) {
                chainId = transaction.chainId;
            }
            if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(chainId)) {
                chainId = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(chainId).toNumber();
            }
            if (typeof (chainId) !== "number" && result.v != null) {
                chainId = (result.v - 35) / 2;
                if (chainId < 0) {
                    chainId = 0;
                }
                chainId = parseInt(chainId);
            }
            if (typeof (chainId) !== "number") {
                chainId = 0;
            }
            result.chainId = chainId;
        }
        // 0x0000... should actually be null
        if (result.blockHash && result.blockHash.replace(/0/g, "") === "x") {
            result.blockHash = null;
        }
        return result;
    }
    transaction(value) {
        return Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_5__["parse"])(value);
    }
    receiptLog(value) {
        return Formatter.check(this.formats.receiptLog, value);
    }
    receipt(value) {
        const result = Formatter.check(this.formats.receipt, value);
        // RSK incorrectly implemented EIP-658, so we munge things a bit here for it
        if (result.root != null) {
            if (result.root.length <= 4) {
                // Could be 0x00, 0x0, 0x01 or 0x1
                const value = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(result.root).toNumber();
                if (value === 0 || value === 1) {
                    // Make sure if both are specified, they match
                    if (result.status != null && (result.status !== value)) {
                        logger.throwArgumentError("alt-root-status/status mismatch", "value", { root: result.root, status: result.status });
                    }
                    result.status = value;
                    delete result.root;
                }
                else {
                    logger.throwArgumentError("invalid alt-root-status", "value.root", result.root);
                }
            }
            else if (result.root.length !== 66) {
                // Must be a valid bytes32
                logger.throwArgumentError("invalid root hash", "value.root", result.root);
            }
        }
        if (result.status != null) {
            result.byzantium = true;
        }
        return result;
    }
    topics(value) {
        if (Array.isArray(value)) {
            return value.map((v) => this.topics(v));
        }
        else if (value != null) {
            return this.hash(value, true);
        }
        return null;
    }
    filter(value) {
        return Formatter.check(this.formats.filter, value);
    }
    filterLog(value) {
        return Formatter.check(this.formats.filterLog, value);
    }
    static check(format, object) {
        const result = {};
        for (const key in format) {
            try {
                const value = format[key](object[key]);
                if (value !== undefined) {
                    result[key] = value;
                }
            }
            catch (error) {
                error.checkKey = key;
                error.checkValue = object[key];
                throw error;
            }
        }
        return result;
    }
    // if value is null-ish, nullValue is returned
    static allowNull(format, nullValue) {
        return (function (value) {
            if (value == null) {
                return nullValue;
            }
            return format(value);
        });
    }
    // If value is false-ish, replaceValue is returned
    static allowFalsish(format, replaceValue) {
        return (function (value) {
            if (!value) {
                return replaceValue;
            }
            return format(value);
        });
    }
    // Requires an Array satisfying check
    static arrayOf(format) {
        return (function (array) {
            if (!Array.isArray(array)) {
                throw new Error("not an array");
            }
            const result = [];
            array.forEach(function (value) {
                result.push(format(value));
            });
            return result;
        });
    }
}
function isCommunityResourcable(value) {
    return (value && typeof (value.isCommunityResource) === "function");
}
function isCommunityResource(value) {
    return (isCommunityResourcable(value) && value.isCommunityResource());
}
// Show the throttle message only once
let throttleMessage = false;
function showThrottleMessage() {
    if (throttleMessage) {
        return;
    }
    throttleMessage = true;
    console.log("========= NOTICE =========");
    console.log("Request-Rate Exceeded  (this message will not be repeated)");
    console.log("");
    console.log("The default API keys for each service are provided as a highly-throttled,");
    console.log("community resource for low-traffic projects and early prototyping.");
    console.log("");
    console.log("While your application will continue to function, we highly recommended");
    console.log("signing up for your own API keys to improve performance, increase your");
    console.log("request rate/limit and enable other perks, such as metrics and advanced APIs.");
    console.log("");
    console.log("For more details: https:/\/docs.ethers.io/api-keys/");
    console.log("==========================");
}
//# sourceMappingURL=formatter.js.map

/***/ }),

/***/ "gey2":
/*!****************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/fallback-provider.js ***!
  \****************************************************************************/
/*! exports provided: FallbackProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FallbackProvider", function() { return FallbackProvider; });
/* harmony import */ var _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/abstract-provider */ "7aoe");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_random__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/random */ "CxN6");
/* harmony import */ var _ethersproject_web__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/web */ "uvd5");
/* harmony import */ var _base_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base-provider */ "vHmw");
/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./formatter */ "fwYn");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_version */ "SkWp");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"](_version__WEBPACK_IMPORTED_MODULE_9__["version"]);
function now() { return (new Date()).getTime(); }
// Returns to network as long as all agree, or null if any is null.
// Throws an error if any two networks do not match.
function checkNetworks(networks) {
    let result = null;
    for (let i = 0; i < networks.length; i++) {
        const network = networks[i];
        // Null! We do not know our network; bail.
        if (network == null) {
            return null;
        }
        if (result) {
            // Make sure the network matches the previous networks
            if (!(result.name === network.name && result.chainId === network.chainId &&
                ((result.ensAddress === network.ensAddress) || (result.ensAddress == null && network.ensAddress == null)))) {
                logger.throwArgumentError("provider mismatch", "networks", networks);
            }
        }
        else {
            result = network;
        }
    }
    return result;
}
function median(values, maxDelta) {
    values = values.slice().sort();
    const middle = Math.floor(values.length / 2);
    // Odd length; take the middle
    if (values.length % 2) {
        return values[middle];
    }
    // Even length; take the average of the two middle
    const a = values[middle - 1], b = values[middle];
    if (maxDelta != null && Math.abs(a - b) > maxDelta) {
        return null;
    }
    return (a + b) / 2;
}
function serialize(value) {
    if (value === null) {
        return "null";
    }
    else if (typeof (value) === "number" || typeof (value) === "boolean") {
        return JSON.stringify(value);
    }
    else if (typeof (value) === "string") {
        return value;
    }
    else if (_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].isBigNumber(value)) {
        return value.toString();
    }
    else if (Array.isArray(value)) {
        return JSON.stringify(value.map((i) => serialize(i)));
    }
    else if (typeof (value) === "object") {
        const keys = Object.keys(value);
        keys.sort();
        return "{" + keys.map((key) => {
            let v = value[key];
            if (typeof (v) === "function") {
                v = "[function]";
            }
            else {
                v = serialize(v);
            }
            return JSON.stringify(key) + ":" + v;
        }).join(",") + "}";
    }
    throw new Error("unknown value type: " + typeof (value));
}
// Next request ID to use for emitting debug info
let nextRid = 1;
;
function stall(duration) {
    let cancel = null;
    let timer = null;
    let promise = (new Promise((resolve) => {
        cancel = function () {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            resolve();
        };
        timer = setTimeout(cancel, duration);
    }));
    const wait = (func) => {
        promise = promise.then(func);
        return promise;
    };
    function getPromise() {
        return promise;
    }
    return { cancel, getPromise, wait };
}
const ForwardErrors = [
    _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.CALL_EXCEPTION,
    _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.INSUFFICIENT_FUNDS,
    _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.NONCE_EXPIRED,
    _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.REPLACEMENT_UNDERPRICED,
    _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNPREDICTABLE_GAS_LIMIT
];
const ForwardProperties = [
    "address",
    "args",
    "errorArgs",
    "errorSignature",
    "method",
    "transaction",
];
;
function exposeDebugConfig(config, now) {
    const result = {
        weight: config.weight
    };
    Object.defineProperty(result, "provider", { get: () => config.provider });
    if (config.start) {
        result.start = config.start;
    }
    if (now) {
        result.duration = (now - config.start);
    }
    if (config.done) {
        if (config.error) {
            result.error = config.error;
        }
        else {
            result.result = config.result || null;
        }
    }
    return result;
}
function normalizedTally(normalize, quorum) {
    return function (configs) {
        // Count the votes for each result
        const tally = {};
        configs.forEach((c) => {
            const value = normalize(c.result);
            if (!tally[value]) {
                tally[value] = { count: 0, result: c.result };
            }
            tally[value].count++;
        });
        // Check for a quorum on any given result
        const keys = Object.keys(tally);
        for (let i = 0; i < keys.length; i++) {
            const check = tally[keys[i]];
            if (check.count >= quorum) {
                return check.result;
            }
        }
        // No quroum
        return undefined;
    };
}
function getProcessFunc(provider, method, params) {
    let normalize = serialize;
    switch (method) {
        case "getBlockNumber":
            // Return the median value, unless there is (median + 1) is also
            // present, in which case that is probably true and the median
            // is going to be stale soon. In the event of a malicious node,
            // the lie will be true soon enough.
            return function (configs) {
                const values = configs.map((c) => c.result);
                // Get the median block number
                let blockNumber = median(configs.map((c) => c.result), 2);
                if (blockNumber == null) {
                    return undefined;
                }
                blockNumber = Math.ceil(blockNumber);
                // If the next block height is present, its prolly safe to use
                if (values.indexOf(blockNumber + 1) >= 0) {
                    blockNumber++;
                }
                // Don't ever roll back the blockNumber
                if (blockNumber >= provider._highestBlockNumber) {
                    provider._highestBlockNumber = blockNumber;
                }
                return provider._highestBlockNumber;
            };
        case "getGasPrice":
            // Return the middle (round index up) value, similar to median
            // but do not average even entries and choose the higher.
            // Malicious actors must compromise 50% of the nodes to lie.
            return function (configs) {
                const values = configs.map((c) => c.result);
                values.sort();
                return values[Math.floor(values.length / 2)];
            };
        case "getEtherPrice":
            // Returns the median price. Malicious actors must compromise at
            // least 50% of the nodes to lie (in a meaningful way).
            return function (configs) {
                return median(configs.map((c) => c.result));
            };
        // No additional normalizing required; serialize is enough
        case "getBalance":
        case "getTransactionCount":
        case "getCode":
        case "getStorageAt":
        case "call":
        case "estimateGas":
        case "getLogs":
            break;
        // We drop the confirmations from transactions as it is approximate
        case "getTransaction":
        case "getTransactionReceipt":
            normalize = function (tx) {
                if (tx == null) {
                    return null;
                }
                tx = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["shallowCopy"])(tx);
                tx.confirmations = -1;
                return serialize(tx);
            };
            break;
        // We drop the confirmations from transactions as it is approximate
        case "getBlock":
            // We drop the confirmations from transactions as it is approximate
            if (params.includeTransactions) {
                normalize = function (block) {
                    if (block == null) {
                        return null;
                    }
                    block = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["shallowCopy"])(block);
                    block.transactions = block.transactions.map((tx) => {
                        tx = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["shallowCopy"])(tx);
                        tx.confirmations = -1;
                        return tx;
                    });
                    return serialize(block);
                };
            }
            else {
                normalize = function (block) {
                    if (block == null) {
                        return null;
                    }
                    return serialize(block);
                };
            }
            break;
        default:
            throw new Error("unknown method: " + method);
    }
    // Return the result if and only if the expected quorum is
    // satisfied and agreed upon for the final result.
    return normalizedTally(normalize, provider.quorum);
}
// If we are doing a blockTag query, we need to make sure the backend is
// caught up to the FallbackProvider, before sending a request to it.
function waitForSync(config, blockNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = (config.provider);
        if ((provider.blockNumber != null && provider.blockNumber >= blockNumber) || blockNumber === -1) {
            return provider;
        }
        return Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_5__["poll"])(() => {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    // We are synced
                    if (provider.blockNumber >= blockNumber) {
                        return resolve(provider);
                    }
                    // We're done; just quit
                    if (config.cancelled) {
                        return resolve(null);
                    }
                    // Try again, next block
                    return resolve(undefined);
                }, 0);
            });
        }, { oncePoll: provider });
    });
}
function getRunner(config, currentBlockNumber, method, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let provider = config.provider;
        switch (method) {
            case "getBlockNumber":
            case "getGasPrice":
                return provider[method]();
            case "getEtherPrice":
                if (provider.getEtherPrice) {
                    return provider.getEtherPrice();
                }
                break;
            case "getBalance":
            case "getTransactionCount":
            case "getCode":
                if (params.blockTag && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(params.blockTag)) {
                    provider = yield waitForSync(config, currentBlockNumber);
                }
                return provider[method](params.address, params.blockTag || "latest");
            case "getStorageAt":
                if (params.blockTag && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(params.blockTag)) {
                    provider = yield waitForSync(config, currentBlockNumber);
                }
                return provider.getStorageAt(params.address, params.position, params.blockTag || "latest");
            case "getBlock":
                if (params.blockTag && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(params.blockTag)) {
                    provider = yield waitForSync(config, currentBlockNumber);
                }
                return provider[(params.includeTransactions ? "getBlockWithTransactions" : "getBlock")](params.blockTag || params.blockHash);
            case "call":
            case "estimateGas":
                if (params.blockTag && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(params.blockTag)) {
                    provider = yield waitForSync(config, currentBlockNumber);
                }
                return provider[method](params.transaction);
            case "getTransaction":
            case "getTransactionReceipt":
                return provider[method](params.transactionHash);
            case "getLogs": {
                let filter = params.filter;
                if ((filter.fromBlock && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(filter.fromBlock)) || (filter.toBlock && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(filter.toBlock))) {
                    provider = yield waitForSync(config, currentBlockNumber);
                }
                return provider.getLogs(filter);
            }
        }
        return logger.throwError("unknown method error", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.UNKNOWN_ERROR, {
            method: method,
            params: params
        });
    });
}
class FallbackProvider extends _base_provider__WEBPACK_IMPORTED_MODULE_6__["BaseProvider"] {
    constructor(providers, quorum) {
        logger.checkNew(new.target, FallbackProvider);
        if (providers.length === 0) {
            logger.throwArgumentError("missing providers", "providers", providers);
        }
        const providerConfigs = providers.map((configOrProvider, index) => {
            if (_ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_0__["Provider"].isProvider(configOrProvider)) {
                const stallTimeout = Object(_formatter__WEBPACK_IMPORTED_MODULE_7__["isCommunityResource"])(configOrProvider) ? 2000 : 750;
                const priority = 1;
                return Object.freeze({ provider: configOrProvider, weight: 1, stallTimeout, priority });
            }
            const config = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["shallowCopy"])(configOrProvider);
            if (config.priority == null) {
                config.priority = 1;
            }
            if (config.stallTimeout == null) {
                config.stallTimeout = Object(_formatter__WEBPACK_IMPORTED_MODULE_7__["isCommunityResource"])(configOrProvider) ? 2000 : 750;
            }
            if (config.weight == null) {
                config.weight = 1;
            }
            const weight = config.weight;
            if (weight % 1 || weight > 512 || weight < 1) {
                logger.throwArgumentError("invalid weight; must be integer in [1, 512]", `providers[${index}].weight`, weight);
            }
            return Object.freeze(config);
        });
        const total = providerConfigs.reduce((accum, c) => (accum + c.weight), 0);
        if (quorum == null) {
            quorum = total / 2;
        }
        else if (quorum > total) {
            logger.throwArgumentError("quorum will always fail; larger than total weight", "quorum", quorum);
        }
        // Are all providers' networks are known
        let networkOrReady = checkNetworks(providerConfigs.map((c) => (c.provider).network));
        // Not all networks are known; we must stall
        if (networkOrReady == null) {
            networkOrReady = new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.detectNetwork().then(resolve, reject);
                }, 0);
            });
        }
        super(networkOrReady);
        // Preserve a copy, so we do not get mutated
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["defineReadOnly"])(this, "providerConfigs", Object.freeze(providerConfigs));
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["defineReadOnly"])(this, "quorum", quorum);
        this._highestBlockNumber = -1;
    }
    detectNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const networks = yield Promise.all(this.providerConfigs.map((c) => c.provider.getNetwork()));
            return checkNetworks(networks);
        });
    }
    perform(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Sending transactions is special; always broadcast it to all backends
            if (method === "sendTransaction") {
                const results = yield Promise.all(this.providerConfigs.map((c) => {
                    return c.provider.sendTransaction(params.signedTransaction).then((result) => {
                        return result.hash;
                    }, (error) => {
                        return error;
                    });
                }));
                // Any success is good enough (other errors are likely "already seen" errors
                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    if (typeof (result) === "string") {
                        return result;
                    }
                }
                // They were all an error; pick the first error
                throw results[0];
            }
            // We need to make sure we are in sync with our backends, so we need
            // to know this before we can make a lot of calls
            if (this._highestBlockNumber === -1 && method !== "getBlockNumber") {
                yield this.getBlockNumber();
            }
            const processFunc = getProcessFunc(this, method, params);
            // Shuffle the providers and then sort them by their priority; we
            // shallowCopy them since we will store the result in them too
            const configs = Object(_ethersproject_random__WEBPACK_IMPORTED_MODULE_4__["shuffled"])(this.providerConfigs.map(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["shallowCopy"]));
            configs.sort((a, b) => (a.priority - b.priority));
            const currentBlockNumber = this._highestBlockNumber;
            let i = 0;
            let first = true;
            while (true) {
                const t0 = now();
                // Compute the inflight weight (exclude anything past)
                let inflightWeight = configs.filter((c) => (c.runner && ((t0 - c.start) < c.stallTimeout)))
                    .reduce((accum, c) => (accum + c.weight), 0);
                // Start running enough to meet quorum
                while (inflightWeight < this.quorum && i < configs.length) {
                    const config = configs[i++];
                    const rid = nextRid++;
                    config.start = now();
                    config.staller = stall(config.stallTimeout);
                    config.staller.wait(() => { config.staller = null; });
                    config.runner = getRunner(config, currentBlockNumber, method, params).then((result) => {
                        config.done = true;
                        config.result = result;
                        if (this.listenerCount("debug")) {
                            this.emit("debug", {
                                action: "request",
                                rid: rid,
                                backend: exposeDebugConfig(config, now()),
                                request: { method: method, params: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["deepCopy"])(params) },
                                provider: this
                            });
                        }
                    }, (error) => {
                        config.done = true;
                        config.error = error;
                        if (this.listenerCount("debug")) {
                            this.emit("debug", {
                                action: "request",
                                rid: rid,
                                backend: exposeDebugConfig(config, now()),
                                request: { method: method, params: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["deepCopy"])(params) },
                                provider: this
                            });
                        }
                    });
                    if (this.listenerCount("debug")) {
                        this.emit("debug", {
                            action: "request",
                            rid: rid,
                            backend: exposeDebugConfig(config, null),
                            request: { method: method, params: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__["deepCopy"])(params) },
                            provider: this
                        });
                    }
                    inflightWeight += config.weight;
                }
                // Wait for anything meaningful to finish or stall out
                const waiting = [];
                configs.forEach((c) => {
                    if (c.done || !c.runner) {
                        return;
                    }
                    waiting.push(c.runner);
                    if (c.staller) {
                        waiting.push(c.staller.getPromise());
                    }
                });
                if (waiting.length) {
                    yield Promise.race(waiting);
                }
                // Check the quorum and process the results; the process function
                // may additionally decide the quorum is not met
                const results = configs.filter((c) => (c.done && c.error == null));
                if (results.length >= this.quorum) {
                    const result = processFunc(results);
                    if (result !== undefined) {
                        // Shut down any stallers
                        configs.forEach(c => {
                            if (c.staller) {
                                c.staller.cancel();
                            }
                            c.cancelled = true;
                        });
                        return result;
                    }
                    if (!first) {
                        yield stall(100).getPromise();
                    }
                    first = false;
                }
                // No result, check for errors that should be forwarded
                const errors = configs.reduce((accum, c) => {
                    if (!c.done || c.error == null) {
                        return accum;
                    }
                    const code = (c.error).code;
                    if (ForwardErrors.indexOf(code) >= 0) {
                        if (!accum[code]) {
                            accum[code] = { error: c.error, weight: 0 };
                        }
                        accum[code].weight += c.weight;
                    }
                    return accum;
                }, ({}));
                Object.keys(errors).forEach((errorCode) => {
                    const tally = errors[errorCode];
                    if (tally.weight < this.quorum) {
                        return;
                    }
                    // Shut down any stallers
                    configs.forEach(c => {
                        if (c.staller) {
                            c.staller.cancel();
                        }
                        c.cancelled = true;
                    });
                    const e = (tally.error);
                    const props = {};
                    ForwardProperties.forEach((name) => {
                        if (e[name] == null) {
                            return;
                        }
                        props[name] = e[name];
                    });
                    logger.throwError(e.reason || e.message, errorCode, props);
                });
                // All configs have run to completion; we will never get more data
                if (configs.filter((c) => !c.done).length === 0) {
                    break;
                }
            }
            // Shut down any stallers; shouldn't be any
            configs.forEach(c => {
                if (c.staller) {
                    c.staller.cancel();
                }
                c.cancelled = true;
            });
            return logger.throwError("failed to meet quorum", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_8__["Logger"].errors.SERVER_ERROR, {
                method: method,
                params: params,
                //results: configs.map((c) => c.result),
                //errors: configs.map((c) => c.error),
                results: configs.map((c) => exposeDebugConfig(c)),
                provider: this
            });
        });
    }
}
//# sourceMappingURL=fallback-provider.js.map

/***/ }),

/***/ "ggob":
/*!***********************************************************!*\
  !*** ./node_modules/@ethersproject/sha2/lib.esm/index.js ***!
  \***********************************************************/
/*! exports provided: computeHmac, ripemd160, sha256, sha512, SupportedAlgorithm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sha2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha2 */ "N5aZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeHmac", function() { return _sha2__WEBPACK_IMPORTED_MODULE_0__["computeHmac"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ripemd160", function() { return _sha2__WEBPACK_IMPORTED_MODULE_0__["ripemd160"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return _sha2__WEBPACK_IMPORTED_MODULE_0__["sha256"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sha512", function() { return _sha2__WEBPACK_IMPORTED_MODULE_0__["sha512"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "1Few");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SupportedAlgorithm", function() { return _types__WEBPACK_IMPORTED_MODULE_1__["SupportedAlgorithm"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "h+6H":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-it.js ***!
  \******************************************************************/
/*! exports provided: langIt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langIt", function() { return langIt; });
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wordlist */ "vZu+");


const words = "AbacoAbbaglioAbbinatoAbeteAbissoAbolireAbrasivoAbrogatoAccadereAccennoAccusatoAcetoneAchilleAcidoAcquaAcreAcrilicoAcrobataAcutoAdagioAddebitoAddomeAdeguatoAderireAdipeAdottareAdulareAffabileAffettoAffissoAffrantoAforismaAfosoAfricanoAgaveAgenteAgevoleAggancioAgireAgitareAgonismoAgricoloAgrumetoAguzzoAlabardaAlatoAlbatroAlberatoAlboAlbumeAlceAlcolicoAlettoneAlfaAlgebraAlianteAlibiAlimentoAllagatoAllegroAllievoAllodolaAllusivoAlmenoAlogenoAlpacaAlpestreAltalenaAlternoAlticcioAltroveAlunnoAlveoloAlzareAmalgamaAmanitaAmarenaAmbitoAmbratoAmebaAmericaAmetistaAmicoAmmassoAmmendaAmmirareAmmonitoAmoreAmpioAmpliareAmuletoAnacardoAnagrafeAnalistaAnarchiaAnatraAncaAncellaAncoraAndareAndreaAnelloAngeloAngolareAngustoAnimaAnnegareAnnidatoAnnoAnnuncioAnonimoAnticipoAnziApaticoAperturaApodeApparireAppetitoAppoggioApprodoAppuntoAprileArabicaArachideAragostaAraldicaArancioAraturaArazzoArbitroArchivioArditoArenileArgentoArgineArgutoAriaArmoniaArneseArredatoArringaArrostoArsenicoArsoArteficeArzilloAsciuttoAscoltoAsepsiAsetticoAsfaltoAsinoAsolaAspiratoAsproAssaggioAsseAssolutoAssurdoAstaAstenutoAsticeAstrattoAtavicoAteismoAtomicoAtonoAttesaAttivareAttornoAttritoAttualeAusilioAustriaAutistaAutonomoAutunnoAvanzatoAvereAvvenireAvvisoAvvolgereAzioneAzotoAzzimoAzzurroBabeleBaccanoBacinoBacoBadessaBadilataBagnatoBaitaBalconeBaldoBalenaBallataBalzanoBambinoBandireBaraondaBarbaroBarcaBaritonoBarlumeBaroccoBasilicoBassoBatostaBattutoBauleBavaBavosaBeccoBeffaBelgioBelvaBendaBenevoleBenignoBenzinaBereBerlinaBetaBibitaBiciBidoneBifidoBigaBilanciaBimboBinocoloBiologoBipedeBipolareBirbanteBirraBiscottoBisestoBisnonnoBisonteBisturiBizzarroBlandoBlattaBollitoBonificoBordoBoscoBotanicoBottinoBozzoloBraccioBradipoBramaBrancaBravuraBretellaBrevettoBrezzaBrigliaBrillanteBrindareBroccoloBrodoBronzinaBrulloBrunoBubboneBucaBudinoBuffoneBuioBulboBuonoBurloneBurrascaBussolaBustaCadettoCaducoCalamaroCalcoloCalesseCalibroCalmoCaloriaCambusaCamerataCamiciaCamminoCamolaCampaleCanapaCandelaCaneCaninoCanottoCantinaCapaceCapelloCapitoloCapogiroCapperoCapraCapsulaCarapaceCarcassaCardoCarismaCarovanaCarrettoCartolinaCasaccioCascataCasermaCasoCassoneCastelloCasualeCatastaCatenaCatrameCautoCavilloCedibileCedrataCefaloCelebreCellulareCenaCenoneCentesimoCeramicaCercareCertoCerumeCervelloCesoiaCespoCetoChelaChiaroChiccaChiedereChimeraChinaChirurgoChitarraCiaoCiclismoCifrareCignoCilindroCiottoloCircaCirrosiCitricoCittadinoCiuffoCivettaCivileClassicoClinicaCloroCoccoCodardoCodiceCoerenteCognomeCollareColmatoColoreColposoColtivatoColzaComaCometaCommandoComodoComputerComuneConcisoCondurreConfermaCongelareConiugeConnessoConoscereConsumoContinuoConvegnoCopertoCopioneCoppiaCopricapoCorazzaCordataCoricatoCorniceCorollaCorpoCorredoCorsiaCorteseCosmicoCostanteCotturaCovatoCratereCravattaCreatoCredereCremosoCrescitaCretaCricetoCrinaleCrisiCriticoCroceCronacaCrostataCrucialeCruscaCucireCuculoCuginoCullatoCupolaCuratoreCursoreCurvoCuscinoCustodeDadoDainoDalmataDamerinoDanielaDannosoDanzareDatatoDavantiDavveroDebuttoDecennioDecisoDeclinoDecolloDecretoDedicatoDefinitoDeformeDegnoDelegareDelfinoDelirioDeltaDemenzaDenotatoDentroDepositoDerapataDerivareDerogaDescrittoDesertoDesiderioDesumereDetersivoDevotoDiametroDicembreDiedroDifesoDiffusoDigerireDigitaleDiluvioDinamicoDinnanziDipintoDiplomaDipoloDiradareDireDirottoDirupoDisagioDiscretoDisfareDisgeloDispostoDistanzaDisumanoDitoDivanoDiveltoDividereDivoratoDobloneDocenteDoganaleDogmaDolceDomatoDomenicaDominareDondoloDonoDormireDoteDottoreDovutoDozzinaDragoDruidoDubbioDubitareDucaleDunaDuomoDupliceDuraturoEbanoEccessoEccoEclissiEconomiaEderaEdicolaEdileEditoriaEducareEgemoniaEgliEgoismoEgregioElaboratoElargireEleganteElencatoElettoElevareElficoElicaElmoElsaElusoEmanatoEmblemaEmessoEmiroEmotivoEmozioneEmpiricoEmuloEndemicoEnduroEnergiaEnfasiEnotecaEntrareEnzimaEpatiteEpilogoEpisodioEpocaleEppureEquatoreErarioErbaErbosoEredeEremitaErigereErmeticoEroeErosivoErranteEsagonoEsameEsanimeEsaudireEscaEsempioEsercitoEsibitoEsigenteEsistereEsitoEsofagoEsortatoEsosoEspansoEspressoEssenzaEssoEstesoEstimareEstoniaEstrosoEsultareEtilicoEtnicoEtruscoEttoEuclideoEuropaEvasoEvidenzaEvitatoEvolutoEvvivaFabbricaFaccendaFachiroFalcoFamigliaFanaleFanfaraFangoFantasmaFareFarfallaFarinosoFarmacoFasciaFastosoFasulloFaticareFatoFavolosoFebbreFecolaFedeFegatoFelpaFeltroFemminaFendereFenomenoFermentoFerroFertileFessuraFestivoFettaFeudoFiabaFiduciaFifaFiguratoFiloFinanzaFinestraFinireFioreFiscaleFisicoFiumeFlaconeFlamencoFleboFlemmaFloridoFluenteFluoroFobicoFocacciaFocosoFoderatoFoglioFolataFolcloreFolgoreFondenteFoneticoFoniaFontanaForbitoForchettaForestaFormicaFornaioForoFortezzaForzareFosfatoFossoFracassoFranaFrassinoFratelloFreccettaFrenataFrescoFrigoFrollinoFrondeFrugaleFruttaFucilataFucsiaFuggenteFulmineFulvoFumanteFumettoFumosoFuneFunzioneFuocoFurboFurgoneFuroreFusoFutileGabbianoGaffeGalateoGallinaGaloppoGamberoGammaGaranziaGarboGarofanoGarzoneGasdottoGasolioGastricoGattoGaudioGazeboGazzellaGecoGelatinaGelsoGemelloGemmatoGeneGenitoreGennaioGenotipoGergoGhepardoGhiaccioGhisaGialloGildaGineproGiocareGioielloGiornoGioveGiratoGironeGittataGiudizioGiuratoGiustoGlobuloGlutineGnomoGobbaGolfGomitoGommoneGonfioGonnaGovernoGracileGradoGraficoGrammoGrandeGrattareGravosoGraziaGrecaGreggeGrifoneGrigioGrinzaGrottaGruppoGuadagnoGuaioGuantoGuardareGufoGuidareIbernatoIconaIdenticoIdillioIdoloIdraIdricoIdrogenoIgieneIgnaroIgnoratoIlareIllesoIllogicoIlludereImballoImbevutoImboccoImbutoImmaneImmersoImmolatoImpaccoImpetoImpiegoImportoImprontaInalareInarcareInattivoIncantoIncendioInchinoIncisivoInclusoIncontroIncrocioIncuboIndagineIndiaIndoleIneditoInfattiInfilareInflittoIngaggioIngegnoIngleseIngordoIngrossoInnescoInodoreInoltrareInondatoInsanoInsettoInsiemeInsonniaInsulinaIntasatoInteroIntonacoIntuitoInumidireInvalidoInveceInvitoIperboleIpnoticoIpotesiIppicaIrideIrlandaIronicoIrrigatoIrrorareIsolatoIsotopoIstericoIstitutoIstriceItaliaIterareLabbroLabirintoLaccaLaceratoLacrimaLacunaLaddoveLagoLampoLancettaLanternaLardosoLargaLaringeLastraLatenzaLatinoLattugaLavagnaLavoroLegaleLeggeroLemboLentezzaLenzaLeoneLepreLesivoLessatoLestoLetteraleLevaLevigatoLiberoLidoLievitoLillaLimaturaLimitareLimpidoLineareLinguaLiquidoLiraLiricaLiscaLiteLitigioLivreaLocandaLodeLogicaLombareLondraLongevoLoquaceLorenzoLotoLotteriaLuceLucidatoLumacaLuminosoLungoLupoLuppoloLusingaLussoLuttoMacabroMacchinaMaceroMacinatoMadamaMagicoMagliaMagneteMagroMaiolicaMalafedeMalgradoMalintesoMalsanoMaltoMalumoreManaManciaMandorlaMangiareManifestoMannaroManovraMansardaMantideManubrioMappaMaratonaMarcireMarettaMarmoMarsupioMascheraMassaiaMastinoMaterassoMatricolaMattoneMaturoMazurcaMeandroMeccanicoMecenateMedesimoMeditareMegaMelassaMelisMelodiaMeningeMenoMensolaMercurioMerendaMerloMeschinoMeseMessereMestoloMetalloMetodoMettereMiagolareMicaMicelioMicheleMicroboMidolloMieleMiglioreMilanoMiliteMimosaMineraleMiniMinoreMirinoMirtilloMiscelaMissivaMistoMisurareMitezzaMitigareMitraMittenteMnemonicoModelloModificaModuloMoganoMogioMoleMolossoMonasteroMoncoMondinaMonetarioMonileMonotonoMonsoneMontatoMonvisoMoraMordereMorsicatoMostroMotivatoMotosegaMottoMovenzaMovimentoMozzoMuccaMucosaMuffaMughettoMugnaioMulattoMulinelloMultiploMummiaMuntoMuovereMuraleMusaMuscoloMusicaMutevoleMutoNababboNaftaNanometroNarcisoNariceNarratoNascereNastrareNaturaleNauticaNaviglioNebulosaNecrosiNegativoNegozioNemmenoNeofitaNerettoNervoNessunoNettunoNeutraleNeveNevroticoNicchiaNinfaNitidoNobileNocivoNodoNomeNominaNordicoNormaleNorvegeseNostranoNotareNotiziaNotturnoNovellaNucleoNullaNumeroNuovoNutrireNuvolaNuzialeOasiObbedireObbligoObeliscoOblioOboloObsoletoOccasioneOcchioOccidenteOccorrereOccultareOcraOculatoOdiernoOdorareOffertaOffrireOffuscatoOggettoOggiOgnunoOlandeseOlfattoOliatoOlivaOlogrammaOltreOmaggioOmbelicoOmbraOmegaOmissioneOndosoOnereOniceOnnivoroOnorevoleOntaOperatoOpinioneOppostoOracoloOrafoOrdineOrecchinoOreficeOrfanoOrganicoOrigineOrizzonteOrmaOrmeggioOrnativoOrologioOrrendoOrribileOrtensiaOrticaOrzataOrzoOsareOscurareOsmosiOspedaleOspiteOssaOssidareOstacoloOsteOtiteOtreOttagonoOttimoOttobreOvaleOvestOvinoOviparoOvocitoOvunqueOvviareOzioPacchettoPacePacificoPadellaPadronePaesePagaPaginaPalazzinaPalesarePallidoPaloPaludePandoroPannelloPaoloPaonazzoPapricaParabolaParcellaParerePargoloPariParlatoParolaPartireParvenzaParzialePassivoPasticcaPataccaPatologiaPattumePavonePeccatoPedalarePedonalePeggioPelosoPenarePendicePenisolaPennutoPenombraPensarePentolaPepePepitaPerbenePercorsoPerdonatoPerforarePergamenaPeriodoPermessoPernoPerplessoPersuasoPertugioPervasoPesatorePesistaPesoPestiferoPetaloPettinePetulantePezzoPiacerePiantaPiattinoPiccinoPicozzaPiegaPietraPifferoPigiamaPigolioPigroPilaPiliferoPillolaPilotaPimpantePinetaPinnaPinoloPioggiaPiomboPiramidePireticoPiritePirolisiPitonePizzicoPlaceboPlanarePlasmaPlatanoPlenarioPochezzaPoderosoPodismoPoesiaPoggiarePolentaPoligonoPollicePolmonitePolpettaPolsoPoltronaPolverePomicePomodoroPontePopolosoPorfidoPorosoPorporaPorrePortataPosaPositivoPossessoPostulatoPotassioPoterePranzoPrassiPraticaPreclusoPredicaPrefissoPregiatoPrelievoPremerePrenotarePreparatoPresenzaPretestoPrevalsoPrimaPrincipePrivatoProblemaProcuraProdurreProfumoProgettoProlungaPromessaPronomePropostaProrogaProtesoProvaPrudentePrugnaPruritoPsichePubblicoPudicaPugilatoPugnoPulcePulitoPulsantePuntarePupazzoPupillaPuroQuadroQualcosaQuasiQuerelaQuotaRaccoltoRaddoppioRadicaleRadunatoRafficaRagazzoRagioneRagnoRamarroRamingoRamoRandagioRantolareRapatoRapinaRappresoRasaturaRaschiatoRasenteRassegnaRastrelloRataRavvedutoRealeRecepireRecintoReclutaReconditoRecuperoRedditoRedimereRegalatoRegistroRegolaRegressoRelazioneRemareRemotoRennaReplicaReprimereReputareResaResidenteResponsoRestauroReteRetinaRetoricaRettificaRevocatoRiassuntoRibadireRibelleRibrezzoRicaricaRiccoRicevereRiciclatoRicordoRicredutoRidicoloRidurreRifasareRiflessoRiformaRifugioRigareRigettatoRighelloRilassatoRilevatoRimanereRimbalzoRimedioRimorchioRinascitaRincaroRinforzoRinnovoRinomatoRinsavitoRintoccoRinunciaRinvenireRiparatoRipetutoRipienoRiportareRipresaRipulireRisataRischioRiservaRisibileRisoRispettoRistoroRisultatoRisvoltoRitardoRitegnoRitmicoRitrovoRiunioneRivaRiversoRivincitaRivoltoRizomaRobaRoboticoRobustoRocciaRocoRodaggioRodereRoditoreRogitoRollioRomanticoRompereRonzioRosolareRospoRotanteRotondoRotulaRovescioRubizzoRubricaRugaRullinoRumineRumorosoRuoloRupeRussareRusticoSabatoSabbiareSabotatoSagomaSalassoSaldaturaSalgemmaSalivareSalmoneSaloneSaltareSalutoSalvoSapereSapidoSaporitoSaracenoSarcasmoSartoSassosoSatelliteSatiraSatolloSaturnoSavanaSavioSaziatoSbadiglioSbalzoSbancatoSbarraSbattereSbavareSbendareSbirciareSbloccatoSbocciatoSbrinareSbruffoneSbuffareScabrosoScadenzaScalaScambiareScandaloScapolaScarsoScatenareScavatoSceltoScenicoScettroSchedaSchienaSciarpaScienzaScindereScippoSciroppoScivoloSclerareScodellaScolpitoScompartoSconfortoScoprireScortaScossoneScozzeseScribaScrollareScrutinioScuderiaScultoreScuolaScuroScusareSdebitareSdoganareSeccaturaSecondoSedanoSeggiolaSegnalatoSegregatoSeguitoSelciatoSelettivoSellaSelvaggioSemaforoSembrareSemeSeminatoSempreSensoSentireSepoltoSequenzaSerataSerbatoSerenoSerioSerpenteSerraglioServireSestinaSetolaSettimanaSfaceloSfaldareSfamatoSfarzosoSfaticatoSferaSfidaSfilatoSfingeSfocatoSfoderareSfogoSfoltireSforzatoSfrattoSfruttatoSfuggitoSfumareSfusoSgabelloSgarbatoSgonfiareSgorbioSgrassatoSguardoSibiloSiccomeSierraSiglaSignoreSilenzioSillabaSimboloSimpaticoSimulatoSinfoniaSingoloSinistroSinoSintesiSinusoideSiparioSismaSistoleSituatoSlittaSlogaturaSlovenoSmarritoSmemoratoSmentitoSmeraldoSmilzoSmontareSmottatoSmussatoSnellireSnervatoSnodoSobbalzoSobrioSoccorsoSocialeSodaleSoffittoSognoSoldatoSolenneSolidoSollazzoSoloSolubileSolventeSomaticoSommaSondaSonettoSonniferoSopireSoppesoSopraSorgereSorpassoSorrisoSorsoSorteggioSorvolatoSospiroSostaSottileSpadaSpallaSpargereSpatolaSpaventoSpazzolaSpecieSpedireSpegnereSpelaturaSperanzaSpessoreSpettraleSpezzatoSpiaSpigolosoSpillatoSpinosoSpiraleSplendidoSportivoSposoSprangaSprecareSpronatoSpruzzoSpuntinoSquilloSradicareSrotolatoStabileStaccoStaffaStagnareStampatoStantioStarnutoStaseraStatutoSteloSteppaSterzoStilettoStimaStirpeStivaleStizzosoStonatoStoricoStrappoStregatoStriduloStrozzareStruttoStuccareStufoStupendoSubentroSuccosoSudoreSuggeritoSugoSultanoSuonareSuperboSupportoSurgelatoSurrogatoSussurroSuturaSvagareSvedeseSveglioSvelareSvenutoSveziaSviluppoSvistaSvizzeraSvoltaSvuotareTabaccoTabulatoTacciareTaciturnoTaleTalismanoTamponeTanninoTaraTardivoTargatoTariffaTarpareTartarugaTastoTatticoTavernaTavolataTazzaTecaTecnicoTelefonoTemerarioTempoTemutoTendoneTeneroTensioneTentacoloTeoremaTermeTerrazzoTerzettoTesiTesseratoTestatoTetroTettoiaTifareTigellaTimbroTintoTipicoTipografoTiraggioTiroTitanioTitoloTitubanteTizioTizzoneToccareTollerareToltoTombolaTomoTonfoTonsillaTopazioTopologiaToppaTorbaTornareTorroneTortoraToscanoTossireTostaturaTotanoTraboccoTracheaTrafilaTragediaTralcioTramontoTransitoTrapanoTrarreTraslocoTrattatoTraveTrecciaTremolioTrespoloTributoTrichecoTrifoglioTrilloTrinceaTrioTristezzaTrituratoTrivellaTrombaTronoTroppoTrottolaTrovareTruccatoTubaturaTuffatoTulipanoTumultoTunisiaTurbareTurchinoTutaTutelaUbicatoUccelloUccisoreUdireUditivoUffaUfficioUgualeUlisseUltimatoUmanoUmileUmorismoUncinettoUngereUnghereseUnicornoUnificatoUnisonoUnitarioUnteUovoUpupaUraganoUrgenzaUrloUsanzaUsatoUscitoUsignoloUsuraioUtensileUtilizzoUtopiaVacanteVaccinatoVagabondoVagliatoValangaValgoValicoVallettaValorosoValutareValvolaVampataVangareVanitosoVanoVantaggioVanveraVaporeVaranoVarcatoVarianteVascaVedettaVedovaVedutoVegetaleVeicoloVelcroVelinaVellutoVeloceVenatoVendemmiaVentoVeraceVerbaleVergognaVerificaVeroVerrucaVerticaleVescicaVessilloVestaleVeteranoVetrinaVetustoViandanteVibranteVicendaVichingoVicinanzaVidimareVigiliaVignetoVigoreVileVillanoViminiVincitoreViolaViperaVirgolaVirologoVirulentoViscosoVisioneVispoVissutoVisuraVitaVitelloVittimaVivandaVividoViziareVoceVogaVolatileVolereVolpeVoragineVulcanoZampognaZannaZappatoZatteraZavorraZefiroZelanteZeloZenzeroZerbinoZibettoZincoZirconeZittoZollaZoticoZuccheroZufoloZuluZuppa";
let wordlist = null;
function loadWords(lang) {
    if (wordlist != null) {
        return;
    }
    wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"].check(lang) !== "0x5c1362d88fd4cf614a96f3234941d29f7d37c08c5292fde03bf62c2db6ff7620") {
        wordlist = null;
        throw new Error("BIP39 Wordlist for it (Italian) FAILED");
    }
}
class LangIt extends _wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"] {
    constructor() {
        super("it");
    }
    getWord(index) {
        loadWords(this);
        return wordlist[index];
    }
    getWordIndex(word) {
        loadWords(this);
        return wordlist.indexOf(word);
    }
}
const langIt = new LangIt();
_wordlist__WEBPACK_IMPORTED_MODULE_0__["Wordlist"].register(langIt);

//# sourceMappingURL=lang-it.js.map

/***/ }),

/***/ "isBc":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/etherscan-provider.js ***!
  \*****************************************************************************/
/*! exports provided: EtherscanProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EtherscanProvider", function() { return EtherscanProvider; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/transactions */ "WsP5");
/* harmony import */ var _ethersproject_web__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/web */ "uvd5");
/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formatter */ "fwYn");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version */ "SkWp");
/* harmony import */ var _base_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base-provider */ "vHmw");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"](_version__WEBPACK_IMPORTED_MODULE_6__["version"]);

// The transaction has already been sanitized by the calls in Provider
function getTransactionPostData(transaction) {
    const result = {};
    for (let key in transaction) {
        if (transaction[key] == null) {
            continue;
        }
        let value = transaction[key];
        if (key === "type" && value === 0) {
            continue;
        }
        // Quantity-types require no leading zero, unless 0
        if ({ type: true, gasLimit: true, gasPrice: true, maxFeePerGs: true, maxPriorityFeePerGas: true, nonce: true, value: true }[key]) {
            value = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexValue"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexlify"])(value));
        }
        else if (key === "accessList") {
            value = "[" + Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_2__["accessListify"])(value).map((set) => {
                return `{address:"${set.address}",storageKeys:["${set.storageKeys.join('","')}"]}`;
            }).join(",") + "]";
        }
        else {
            value = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexlify"])(value);
        }
        result[key] = value;
    }
    return result;
}
function getResult(result) {
    // getLogs, getHistory have weird success responses
    if (result.status == 0 && (result.message === "No records found" || result.message === "No transactions found")) {
        return result.result;
    }
    if (result.status != 1 || result.message != "OK") {
        const error = new Error("invalid response");
        error.result = JSON.stringify(result);
        if ((result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
            error.throttleRetry = true;
        }
        throw error;
    }
    return result.result;
}
function getJsonResult(result) {
    // This response indicates we are being throttled
    if (result && result.status == 0 && result.message == "NOTOK" && (result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
        const error = new Error("throttled response");
        error.result = JSON.stringify(result);
        error.throttleRetry = true;
        throw error;
    }
    if (result.jsonrpc != "2.0") {
        // @TODO: not any
        const error = new Error("invalid response");
        error.result = JSON.stringify(result);
        throw error;
    }
    if (result.error) {
        // @TODO: not any
        const error = new Error(result.error.message || "unknown error");
        if (result.error.code) {
            error.code = result.error.code;
        }
        if (result.error.data) {
            error.data = result.error.data;
        }
        throw error;
    }
    return result.result;
}
// The blockTag was normalized as a string by the Provider pre-perform operations
function checkLogTag(blockTag) {
    if (blockTag === "pending") {
        throw new Error("pending not supported");
    }
    if (blockTag === "latest") {
        return blockTag;
    }
    return parseInt(blockTag.substring(2), 16);
}
const defaultApiKey = "9D13ZE7XSBTJ94N9BNJ2MA33VMAY2YPIRB";
function checkError(method, error, transaction) {
    // Undo the "convenience" some nodes are attempting to prevent backwards
    // incompatibility; maybe for v6 consider forwarding reverts as errors
    if (method === "call" && error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.SERVER_ERROR) {
        const e = error.error;
        // Etherscan keeps changing their string
        if (e && (e.message.match(/reverted/i) || e.message.match(/VM execution error/i))) {
            // Etherscan prefixes the data like "Reverted 0x1234"
            let data = e.data;
            if (data) {
                data = "0x" + data.replace(/^.*0x/i, "");
            }
            if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["isHexString"])(data)) {
                return data;
            }
            logger.throwError("missing revert data in call exception", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.CALL_EXCEPTION, {
                error, data: "0x"
            });
        }
    }
    // Get the message from any nested error structure
    let message = error.message;
    if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.SERVER_ERROR) {
        if (error.error && typeof (error.error.message) === "string") {
            message = error.error.message;
        }
        else if (typeof (error.body) === "string") {
            message = error.body;
        }
        else if (typeof (error.responseText) === "string") {
            message = error.responseText;
        }
    }
    message = (message || "").toLowerCase();
    // "Insufficient funds. The account you tried to send transaction from does not have enough funds. Required 21464000000000 and got: 0"
    if (message.match(/insufficient funds/)) {
        logger.throwError("insufficient funds for intrinsic transaction cost", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.INSUFFICIENT_FUNDS, {
            error, method, transaction
        });
    }
    // "Transaction with the same hash was already imported."
    if (message.match(/same hash was already imported|transaction nonce is too low|nonce too low/)) {
        logger.throwError("nonce has already been used", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.NONCE_EXPIRED, {
            error, method, transaction
        });
    }
    // "Transaction gas price is too low. There is another transaction with same nonce in the queue. Try increasing the gas price or incrementing the nonce."
    if (message.match(/another transaction with same nonce/)) {
        logger.throwError("replacement fee too low", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.REPLACEMENT_UNDERPRICED, {
            error, method, transaction
        });
    }
    if (message.match(/execution failed due to an exception|execution reverted/)) {
        logger.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.UNPREDICTABLE_GAS_LIMIT, {
            error, method, transaction
        });
    }
    throw error;
}
class EtherscanProvider extends _base_provider__WEBPACK_IMPORTED_MODULE_7__["BaseProvider"] {
    constructor(network, apiKey) {
        logger.checkNew(new.target, EtherscanProvider);
        super(network);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "baseUrl", this.getBaseUrl());
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "apiKey", apiKey || defaultApiKey);
    }
    getBaseUrl() {
        switch (this.network ? this.network.name : "invalid") {
            case "homestead":
                return "https:/\/api.etherscan.io";
            case "ropsten":
                return "https:/\/api-ropsten.etherscan.io";
            case "rinkeby":
                return "https:/\/api-rinkeby.etherscan.io";
            case "kovan":
                return "https:/\/api-kovan.etherscan.io";
            case "goerli":
                return "https:/\/api-goerli.etherscan.io";
            default:
        }
        return logger.throwArgumentError("unsupported network", "network", name);
    }
    getUrl(module, params) {
        const query = Object.keys(params).reduce((accum, key) => {
            const value = params[key];
            if (value != null) {
                accum += `&${key}=${value}`;
            }
            return accum;
        }, "");
        const apiKey = ((this.apiKey) ? `&apikey=${this.apiKey}` : "");
        return `${this.baseUrl}/api?module=${module}${query}${apiKey}`;
    }
    getPostUrl() {
        return `${this.baseUrl}/api`;
    }
    getPostData(module, params) {
        params.module = module;
        params.apikey = this.apiKey;
        return params;
    }
    fetch(module, params, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = (post ? this.getPostUrl() : this.getUrl(module, params));
            const payload = (post ? this.getPostData(module, params) : null);
            const procFunc = (module === "proxy") ? getJsonResult : getResult;
            this.emit("debug", {
                action: "request",
                request: url,
                provider: this
            });
            const connection = {
                url: url,
                throttleSlotInterval: 1000,
                throttleCallback: (attempt, url) => {
                    if (this.isCommunityResource()) {
                        Object(_formatter__WEBPACK_IMPORTED_MODULE_4__["showThrottleMessage"])();
                    }
                    return Promise.resolve(true);
                }
            };
            let payloadStr = null;
            if (payload) {
                connection.headers = { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" };
                payloadStr = Object.keys(payload).map((key) => {
                    return `${key}=${payload[key]}`;
                }).join("&");
            }
            const result = yield Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_3__["fetchJson"])(connection, payloadStr, procFunc || getJsonResult);
            this.emit("debug", {
                action: "response",
                request: url,
                response: Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["deepCopy"])(result),
                provider: this
            });
            return result;
        });
    }
    detectNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.network;
        });
    }
    perform(method, params) {
        const _super = Object.create(null, {
            perform: { get: () => super.perform }
        });
        return __awaiter(this, void 0, void 0, function* () {
            switch (method) {
                case "getBlockNumber":
                    return this.fetch("proxy", { action: "eth_blockNumber" });
                case "getGasPrice":
                    return this.fetch("proxy", { action: "eth_gasPrice" });
                case "getBalance":
                    // Returns base-10 result
                    return this.fetch("account", {
                        action: "balance",
                        address: params.address,
                        tag: params.blockTag
                    });
                case "getTransactionCount":
                    return this.fetch("proxy", {
                        action: "eth_getTransactionCount",
                        address: params.address,
                        tag: params.blockTag
                    });
                case "getCode":
                    return this.fetch("proxy", {
                        action: "eth_getCode",
                        address: params.address,
                        tag: params.blockTag
                    });
                case "getStorageAt":
                    return this.fetch("proxy", {
                        action: "eth_getStorageAt",
                        address: params.address,
                        position: params.position,
                        tag: params.blockTag
                    });
                case "sendTransaction":
                    return this.fetch("proxy", {
                        action: "eth_sendRawTransaction",
                        hex: params.signedTransaction
                    }, true).catch((error) => {
                        return checkError("sendTransaction", error, params.signedTransaction);
                    });
                case "getBlock":
                    if (params.blockTag) {
                        return this.fetch("proxy", {
                            action: "eth_getBlockByNumber",
                            tag: params.blockTag,
                            boolean: (params.includeTransactions ? "true" : "false")
                        });
                    }
                    throw new Error("getBlock by blockHash not implemented");
                case "getTransaction":
                    return this.fetch("proxy", {
                        action: "eth_getTransactionByHash",
                        txhash: params.transactionHash
                    });
                case "getTransactionReceipt":
                    return this.fetch("proxy", {
                        action: "eth_getTransactionReceipt",
                        txhash: params.transactionHash
                    });
                case "call": {
                    if (params.blockTag !== "latest") {
                        throw new Error("EtherscanProvider does not support blockTag for call");
                    }
                    const postData = getTransactionPostData(params.transaction);
                    postData.module = "proxy";
                    postData.action = "eth_call";
                    try {
                        return yield this.fetch("proxy", postData, true);
                    }
                    catch (error) {
                        return checkError("call", error, params.transaction);
                    }
                }
                case "estimateGas": {
                    const postData = getTransactionPostData(params.transaction);
                    postData.module = "proxy";
                    postData.action = "eth_estimateGas";
                    try {
                        return yield this.fetch("proxy", postData, true);
                    }
                    catch (error) {
                        return checkError("estimateGas", error, params.transaction);
                    }
                }
                case "getLogs": {
                    const args = { action: "getLogs" };
                    if (params.filter.fromBlock) {
                        args.fromBlock = checkLogTag(params.filter.fromBlock);
                    }
                    if (params.filter.toBlock) {
                        args.toBlock = checkLogTag(params.filter.toBlock);
                    }
                    if (params.filter.address) {
                        args.address = params.filter.address;
                    }
                    // @TODO: We can handle slightly more complicated logs using the logs API
                    if (params.filter.topics && params.filter.topics.length > 0) {
                        if (params.filter.topics.length > 1) {
                            logger.throwError("unsupported topic count", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.UNSUPPORTED_OPERATION, { topics: params.filter.topics });
                        }
                        if (params.filter.topics.length === 1) {
                            const topic0 = params.filter.topics[0];
                            if (typeof (topic0) !== "string" || topic0.length !== 66) {
                                logger.throwError("unsupported topic format", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].errors.UNSUPPORTED_OPERATION, { topic0: topic0 });
                            }
                            args.topic0 = topic0;
                        }
                    }
                    const logs = yield this.fetch("logs", args);
                    // Cache txHash => blockHash
                    let blocks = {};
                    // Add any missing blockHash to the logs
                    for (let i = 0; i < logs.length; i++) {
                        const log = logs[i];
                        if (log.blockHash != null) {
                            continue;
                        }
                        if (blocks[log.blockNumber] == null) {
                            const block = yield this.getBlock(log.blockNumber);
                            if (block) {
                                blocks[log.blockNumber] = block.hash;
                            }
                        }
                        log.blockHash = blocks[log.blockNumber];
                    }
                    return logs;
                }
                case "getEtherPrice":
                    if (this.network.name !== "homestead") {
                        return 0.0;
                    }
                    return parseFloat((yield this.fetch("stats", { action: "ethprice" })).ethusd);
                default:
                    break;
            }
            return _super.perform.call(this, method, params);
        });
    }
    // Note: The `page` page parameter only allows pagination within the
    //       10,000 window abailable without a page and offset parameter
    //       Error: Result window is too large, PageNo x Offset size must
    //              be less than or equal to 10000
    getHistory(addressOrName, startBlock, endBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                action: "txlist",
                address: (yield this.resolveName(addressOrName)),
                startblock: ((startBlock == null) ? 0 : startBlock),
                endblock: ((endBlock == null) ? 99999999 : endBlock),
                sort: "asc"
            };
            const result = yield this.fetch("account", params);
            return result.map((tx) => {
                ["contractAddress", "to"].forEach(function (key) {
                    if (tx[key] == "") {
                        delete tx[key];
                    }
                });
                if (tx.creates == null && tx.contractAddress != null) {
                    tx.creates = tx.contractAddress;
                }
                const item = this.formatter.transactionResponse(tx);
                if (tx.timeStamp) {
                    item.timestamp = parseInt(tx.timeStamp);
                }
                return item;
            });
        });
    }
    isCommunityResource() {
        return (this.apiKey === defaultApiKey);
    }
}
//# sourceMappingURL=etherscan-provider.js.map

/***/ }),

/***/ "jZRw":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-ko.js ***!
  \******************************************************************/
/*! exports provided: langKo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langKo", function() { return langKo; });
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wordlist */ "vZu+");



const data = [
    "OYAa",
    "ATAZoATBl3ATCTrATCl8ATDloATGg3ATHT8ATJT8ATJl3ATLlvATLn4ATMT8ATMX8ATMboATMgoAToLbAToMTATrHgATvHnAT3AnAT3JbAT3MTAT8DbAT8JTAT8LmAT8MYAT8MbAT#LnAUHT8AUHZvAUJXrAUJX8AULnrAXJnvAXLUoAXLgvAXMn6AXRg3AXrMbAX3JTAX3QbAYLn3AZLgvAZrSUAZvAcAZ8AaAZ8AbAZ8AnAZ8HnAZ8LgAZ8MYAZ8MgAZ8OnAaAboAaDTrAaFTrAaJTrAaJboAaLVoAaMXvAaOl8AaSeoAbAUoAbAg8AbAl4AbGnrAbMT8AbMXrAbMn4AbQb8AbSV8AbvRlAb8AUAb8AnAb8HgAb8JTAb8NTAb8RbAcGboAcLnvAcMT8AcMX8AcSToAcrAaAcrFnAc8AbAc8MgAfGgrAfHboAfJnvAfLV8AfLkoAfMT8AfMnoAfQb8AfScrAfSgrAgAZ8AgFl3AgGX8AgHZvAgHgrAgJXoAgJX8AgJboAgLZoAgLn4AgOX8AgoATAgoAnAgoCUAgoJgAgoLXAgoMYAgoSeAgrDUAgrJTAhrFnAhrLjAhrQgAjAgoAjJnrAkMX8AkOnoAlCTvAlCV8AlClvAlFg4AlFl6AlFn3AloSnAlrAXAlrAfAlrFUAlrFbAlrGgAlrOXAlvKnAlvMTAl3AbAl3MnAnATrAnAcrAnCZ3AnCl8AnDg8AnFboAnFl3AnHX4AnHbrAnHgrAnIl3AnJgvAnLXoAnLX4AnLbrAnLgrAnLhrAnMXoAnMgrAnOn3AnSbrAnSeoAnvLnAn3OnCTGgvCTSlvCTvAUCTvKnCTvNTCT3CZCT3GUCT3MTCT8HnCUCZrCULf8CULnvCU3HnCU3JUCY6NUCbDb8CbFZoCbLnrCboOTCboScCbrFnCbvLnCb8AgCb8HgCb$LnCkLfoClBn3CloDUDTHT8DTLl3DTSU8DTrAaDTrLXDTrLjDTrOYDTrOgDTvFXDTvFnDT3HUDT3LfDUCT9DUDT4DUFVoDUFV8DUFkoDUGgrDUJnrDULl8DUMT8DUMXrDUMX4DUMg8DUOUoDUOgvDUOg8DUSToDUSZ8DbDXoDbDgoDbGT8DbJn3DbLg3DbLn4DbMXrDbMg8DbOToDboJXGTClvGTDT8GTFZrGTLVoGTLlvGTLl3GTMg8GTOTvGTSlrGToCUGTrDgGTrJYGTrScGTtLnGTvAnGTvQgGUCZrGUDTvGUFZoGUHXrGULnvGUMT8GUoMgGXoLnGXrMXGXrMnGXvFnGYLnvGZOnvGZvOnGZ8LaGZ8LmGbAl3GbDYvGbDlrGbHX3GbJl4GbLV8GbLn3GbMn4GboJTGboRfGbvFUGb3GUGb4JnGgDX3GgFl$GgJlrGgLX6GgLZoGgLf8GgOXoGgrAgGgrJXGgrMYGgrScGgvATGgvOYGnAgoGnJgvGnLZoGnLg3GnLnrGnQn8GnSbrGnrMgHTClvHTDToHTFT3HTQT8HToJTHToJgHTrDUHTrMnHTvFYHTvRfHT8MnHT8SUHUAZ8HUBb4HUDTvHUoMYHXFl6HXJX6HXQlrHXrAUHXrMnHXrSbHXvFYHXvKXHX3LjHX3MeHYvQlHZrScHZvDbHbAcrHbFT3HbFl3HbJT8HbLTrHbMT8HbMXrHbMbrHbQb8HbSX3HboDbHboJTHbrFUHbrHgHbrJTHb8JTHb8MnHb8QgHgAlrHgDT3HgGgrHgHgrHgJTrHgJT8HgLX@HgLnrHgMT8HgMX8HgMboHgOnrHgQToHgRg3HgoHgHgrCbHgrFnHgrLVHgvAcHgvAfHnAloHnCTrHnCnvHnGTrHnGZ8HnGnvHnJT8HnLf8HnLkvHnMg8HnRTrITvFUITvFnJTAXrJTCV8JTFT3JTFT8JTFn4JTGgvJTHT8JTJT8JTJXvJTJl3JTJnvJTLX4JTLf8JTLhvJTMT8JTMXrJTMnrJTObrJTQT8JTSlvJT8DUJT8FkJT8MTJT8OXJT8OgJT8QUJT8RfJUHZoJXFT4JXFlrJXGZ8JXGnrJXLV8JXLgvJXMXoJXMX3JXNboJXPlvJXoJTJXoLkJXrAXJXrHUJXrJgJXvJTJXvOnJX4KnJYAl3JYJT8JYLhvJYQToJYrQXJY6NUJbAl3JbCZrJbDloJbGT8JbGgrJbJXvJbJboJbLf8JbLhrJbLl3JbMnvJbRg8JbSZ8JboDbJbrCZJbrSUJb3KnJb8LnJfRn8JgAXrJgCZrJgDTrJgGZrJgGZ8JgHToJgJT8JgJXoJgJgvJgLX4JgLZ3JgLZ8JgLn4JgMgrJgMn4JgOgvJgPX6JgRnvJgSToJgoCZJgoJbJgoMYJgrJXJgrJgJgrLjJg6MTJlCn3JlGgvJlJl8Jl4AnJl8FnJl8HgJnAToJnATrJnAbvJnDUoJnGnrJnJXrJnJXvJnLhvJnLnrJnLnvJnMToJnMT8JnMXvJnMX3JnMg8JnMlrJnMn4JnOX8JnST4JnSX3JnoAgJnoAnJnoJTJnoObJnrAbJnrAkJnrHnJnrJTJnrJYJnrOYJnrScJnvCUJnvFaJnvJgJnvJnJnvOYJnvQUJnvRUJn3FnJn3JTKnFl3KnLT6LTDlvLTMnoLTOn3LTRl3LTSb4LTSlrLToAnLToJgLTrAULTrAcLTrCULTrHgLTrMgLT3JnLULnrLUMX8LUoJgLVATrLVDTrLVLb8LVoJgLV8MgLV8RTLXDg3LXFlrLXrCnLXrLXLX3GTLX4GgLX4OYLZAXrLZAcrLZAgrLZAhrLZDXyLZDlrLZFbrLZFl3LZJX6LZJX8LZLc8LZLnrLZSU8LZoJTLZoJnLZrAgLZrAnLZrJYLZrLULZrMgLZrSkLZvAnLZvGULZvJeLZvOTLZ3FZLZ4JXLZ8STLZ8ScLaAT3LaAl3LaHT8LaJTrLaJT8LaJXrLaJgvLaJl4LaLVoLaMXrLaMXvLaMX8LbClvLbFToLbHlrLbJn4LbLZ3LbLhvLbMXrLbMnoLbvSULcLnrLc8HnLc8MTLdrMnLeAgoLeOgvLeOn3LfAl3LfLnvLfMl3LfOX8Lf8AnLf8JXLf8LXLgJTrLgJXrLgJl8LgMX8LgRZrLhCToLhrAbLhrFULhrJXLhvJYLjHTrLjHX4LjJX8LjLhrLjSX3LjSZ4LkFX4LkGZ8LkGgvLkJTrLkMXoLkSToLkSU8LkSZ8LkoOYLl3FfLl3MgLmAZrLmCbrLmGgrLmHboLmJnoLmJn3LmLfoLmLhrLmSToLnAX6LnAb6LnCZ3LnCb3LnDTvLnDb8LnFl3LnGnrLnHZvLnHgvLnITvLnJT8LnJX8LnJlvLnLf8LnLg6LnLhvLnLnoLnMXrLnMg8LnQlvLnSbrLnrAgLnrAnLnrDbLnrFkLnrJdLnrMULnrOYLnrSTLnvAnLnvDULnvHgLnvOYLnvOnLn3GgLn4DULn4JTLn4JnMTAZoMTAloMTDb8MTFT8MTJnoMTJnrMTLZrMTLhrMTLkvMTMX8MTRTrMToATMTrDnMTrOnMT3JnMT4MnMT8FUMT8FaMT8FlMT8GTMT8GbMT8GnMT8HnMT8JTMT8JbMT8OTMUCl8MUJTrMUJU8MUMX8MURTrMUSToMXAX6MXAb6MXCZoMXFXrMXHXrMXLgvMXOgoMXrAUMXrAnMXrHgMXrJYMXrJnMXrMTMXrMgMXrOYMXrSZMXrSgMXvDUMXvOTMX3JgMX3OTMX4JnMX8DbMX8FnMX8HbMX8HgMX8HnMX8LbMX8MnMX8OnMYAb8MYGboMYHTvMYHX4MYLTrMYLnvMYMToMYOgvMYRg3MYSTrMbAToMbAXrMbAl3MbAn8MbGZ8MbJT8MbJXrMbMXvMbMX8MbMnoMbrMUMb8AfMb8FbMb8FkMcJXoMeLnrMgFl3MgGTvMgGXoMgGgrMgGnrMgHT8MgHZrMgJnoMgLnrMgLnvMgMT8MgQUoMgrHnMgvAnMg8HgMg8JYMg8LfMloJnMl8ATMl8AXMl8JYMnAToMnAT4MnAZ8MnAl3MnAl4MnCl8MnHT8MnHg8MnJnoMnLZoMnLhrMnMXoMnMX3MnMnrMnOgvMnrFbMnrFfMnrFnMnrNTMnvJXNTMl8OTCT3OTFV8OTFn3OTHZvOTJXrOTOl3OT3ATOT3JUOT3LZOT3LeOT3MbOT8ATOT8AbOT8AgOT8MbOUCXvOUMX3OXHXvOXLl3OXrMUOXvDbOX6NUOX8JbOYFZoOYLbrOYLkoOYMg8OYSX3ObHTrObHT4ObJgrObLhrObMX3ObOX8Ob8FnOeAlrOeJT8OeJXrOeJnrOeLToOeMb8OgJXoOgLXoOgMnrOgOXrOgOloOgoAgOgoJbOgoMYOgoSTOg8AbOjLX4OjMnoOjSV8OnLVoOnrAgOn3DUPXQlrPXvFXPbvFTPdAT3PlFn3PnvFbQTLn4QToAgQToMTQULV8QURg8QUoJnQXCXvQbFbrQb8AaQb8AcQb8FbQb8MYQb8ScQeAlrQeLhrQjAn3QlFXoQloJgQloSnRTLnvRTrGURTrJTRUJZrRUoJlRUrQnRZrLmRZrMnRZrSnRZ8ATRZ8JbRZ8ScRbMT8RbST3RfGZrRfMX8RfMgrRfSZrRnAbrRnGT8RnvJgRnvLfRnvMTRn8AaSTClvSTJgrSTOXrSTRg3STRnvSToAcSToAfSToAnSToHnSToLjSToMTSTrAaSTrEUST3BYST8AgST8LmSUAZvSUAgrSUDT4SUDT8SUGgvSUJXoSUJXvSULTrSU8JTSU8LjSV8AnSV8JgSXFToSXLf8SYvAnSZrDUSZrMUSZrMnSZ8HgSZ8JTSZ8JgSZ8MYSZ8QUSaQUoSbCT3SbHToSbQYvSbSl4SboJnSbvFbSb8HbSb8JgSb8OTScGZrScHgrScJTvScMT8ScSToScoHbScrMTScvAnSeAZrSeAcrSeHboSeJUoSeLhrSeMT8SeMXrSe6JgSgHTrSkJnoSkLnvSk8CUSlFl3SlrSnSl8GnSmAboSmGT8SmJU8",
    "ATLnDlATrAZoATrJX4ATrMT8ATrMX4ATrRTrATvDl8ATvJUoATvMl8AT3AToAT3MX8AT8CT3AT8DT8AT8HZrAT8HgoAUAgFnAUCTFnAXoMX8AXrAT8AXrGgvAXrJXvAXrOgoAXvLl3AZvAgoAZvFbrAZvJXoAZvJl8AZvJn3AZvMX8AZvSbrAZ8FZoAZ8LZ8AZ8MU8AZ8OTvAZ8SV8AZ8SX3AbAgFZAboJnoAbvGboAb8ATrAb8AZoAb8AgrAb8Al4Ab8Db8Ab8JnoAb8LX4Ab8LZrAb8LhrAb8MT8Ab8OUoAb8Qb8Ab8ST8AcrAUoAcrAc8AcrCZ3AcrFT3AcrFZrAcrJl4AcrJn3AcrMX3AcrOTvAc8AZ8Ac8MT8AfAcJXAgoFn4AgoGgvAgoGnrAgoLc8AgoMXoAgrLnrAkrSZ8AlFXCTAloHboAlrHbrAlrLhrAlrLkoAl3CZrAl3LUoAl3LZrAnrAl4AnrMT8An3HT4BT3IToBX4MnvBb!Ln$CTGXMnCToLZ4CTrHT8CT3JTrCT3RZrCT#GTvCU6GgvCU8Db8CU8GZrCU8HT8CboLl3CbrGgrCbrMU8Cb8DT3Cb8GnrCb8LX4Cb8MT8Cb8ObrCgrGgvCgrKX4Cl8FZoDTrAbvDTrDboDTrGT6DTrJgrDTrMX3DTrRZrDTrRg8DTvAVvDTvFZoDT3DT8DT3Ln3DT4HZrDT4MT8DT8AlrDT8MT8DUAkGbDUDbJnDYLnQlDbDUOYDbMTAnDbMXSnDboAT3DboFn4DboLnvDj6JTrGTCgFTGTGgFnGTJTMnGTLnPlGToJT8GTrCT3GTrLVoGTrLnvGTrMX3GTrMboGTvKl3GZClFnGZrDT3GZ8DTrGZ8FZ8GZ8MXvGZ8On8GZ8ST3GbCnQXGbMbFnGboFboGboJg3GboMXoGb3JTvGb3JboGb3Mn6Gb3Qb8GgDXLjGgMnAUGgrDloGgrHX4GgrSToGgvAXrGgvAZvGgvFbrGgvLl3GgvMnvGnDnLXGnrATrGnrMboGnuLl3HTATMnHTAgCnHTCTCTHTrGTvHTrHTvHTrJX8HTrLl8HTrMT8HTrMgoHTrOTrHTuOn3HTvAZrHTvDTvHTvGboHTvJU8HTvLl3HTvMXrHTvQb4HT4GT6HT4JT8HT4Jb#HT8Al3HT8GZrHT8GgrHT8HX4HT8Jb8HT8JnoHT8LTrHT8LgvHT8SToHT8SV8HUoJUoHUoJX8HUoLnrHXrLZoHXvAl3HX3LnrHX4FkvHX4LhrHX4MXoHX4OnoHZrAZ8HZrDb8HZrGZ8HZrJnrHZvGZ8HZvLnvHZ8JnvHZ8LhrHbCXJlHbMTAnHboJl4HbpLl3HbrJX8HbrLnrHbrMnvHbvRYrHgoSTrHgrFV8HgrGZ8HgrJXoHgrRnvHgvBb!HgvGTrHgvHX4HgvHn!HgvLTrHgvSU8HnDnLbHnFbJbHnvDn8Hn6GgvHn!BTvJTCTLnJTQgFnJTrAnvJTrLX4JTrOUoJTvFn3JTvLnrJTvNToJT3AgoJT3Jn4JT3LhvJT3ObrJT8AcrJT8Al3JT8JT8JT8JnoJT8LX4JT8LnrJT8MX3JT8Rg3JT8Sc8JUoBTvJU8AToJU8GZ8JU8GgvJU8JTrJU8JXrJU8JnrJU8LnvJU8ScvJXHnJlJXrGgvJXrJU8JXrLhrJXrMT8JXrMXrJXrQUoJXvCTvJXvGZ8JXvGgrJXvQT8JX8Ab8JX8DT8JX8GZ8JX8HZvJX8LnrJX8MT8JX8MXoJX8MnvJX8ST3JYGnCTJbAkGbJbCTAnJbLTAcJboDT3JboLb6JbrAnvJbrCn3JbrDl8JbrGboJbrIZoJbrJnvJbrMnvJbrQb4Jb8RZrJeAbAnJgJnFbJgScAnJgrATrJgvHZ8JgvMn4JlJlFbJlLiQXJlLjOnJlRbOlJlvNXoJlvRl3Jl4AcrJl8AUoJl8MnrJnFnMlJnHgGbJnoDT8JnoFV8JnoGgvJnoIT8JnoQToJnoRg3JnrCZ3JnrGgrJnrHTvJnrLf8JnrOX8JnvAT3JnvFZoJnvGT8JnvJl4JnvMT8JnvMX8JnvOXrJnvPX6JnvSX3JnvSZrJn3MT8Jn3MX8Jn3RTrLTATKnLTJnLTLTMXKnLTRTQlLToGb8LTrAZ8LTrCZ8LTrDb8LTrHT8LT3PX6LT4FZoLT$CTvLT$GgrLUvHX3LVoATrLVoAgoLVoJboLVoMX3LVoRg3LV8CZ3LV8FZoLV8GTvLXrDXoLXrFbrLXvAgvLXvFlrLXvLl3LXvRn6LX4Mb8LX8GT8LYCXMnLYrMnrLZoSTvLZrAZvLZrAloLZrFToLZrJXvLZrJboLZrJl4LZrLnrLZrMT8LZrOgvLZrRnvLZrST4LZvMX8LZvSlvLZ8AgoLZ8CT3LZ8JT8LZ8LV8LZ8LZoLZ8Lg8LZ8SV8LZ8SbrLZ$HT8LZ$Mn4La6CTvLbFbMnLbRYFTLbSnFZLboJT8LbrAT9LbrGb3LbrQb8LcrJX8LcrMXrLerHTvLerJbrLerNboLgrDb8LgrGZ8LgrHTrLgrMXrLgrSU8LgvJTrLgvLl3Lg6Ll3LhrLnrLhrMT8LhvAl4LiLnQXLkoAgrLkoJT8LkoJn4LlrSU8Ll3FZoLl3HTrLl3JX8Ll3JnoLl3LToLmLeFbLnDUFbLnLVAnLnrATrLnrAZoLnrAb8LnrAlrLnrGgvLnrJU8LnrLZrLnrLhrLnrMb8LnrOXrLnrSZ8LnvAb4LnvDTrLnvDl8LnvHTrLnvHbrLnvJT8LnvJU8LnvJbrLnvLhvLnvMX8LnvMb8LnvNnoLnvSU8Ln3Al3Ln4FZoLn4GT6Ln4JgvLn4LhrLn4MT8Ln4SToMToCZrMToJX8MToLX4MToLf8MToRg3MTrEloMTvGb6MT3BTrMT3Lb6MT8AcrMT8AgrMT8GZrMT8JnoMT8LnrMT8MX3MUOUAnMXAbFnMXoAloMXoJX8MXoLf8MXoLl8MXrAb8MXrDTvMXrGT8MXrGgrMXrHTrMXrLf8MXrMU8MXrOXvMXrQb8MXvGT8MXvHTrMXvLVoMX3AX3MX3Jn3MX3LhrMX3MX3MX4AlrMX4OboMX8GTvMX8GZrMX8GgrMX8JT8MX8JX8MX8LhrMX8MT8MYDUFbMYMgDbMbGnFfMbvLX4MbvLl3Mb8Mb8Mb8ST4MgGXCnMg8ATrMg8AgoMg8CZrMg8DTrMg8DboMg8HTrMg8JgrMg8LT8MloJXoMl8AhrMl8JT8MnLgAUMnoJXrMnoLX4MnoLhrMnoMT8MnrAl4MnrDb8MnrOTvMnrOgvMnrQb8MnrSU8MnvGgrMnvHZ8Mn3MToMn4DTrMn4LTrMn4Mg8NnBXAnOTFTFnOToAToOTrGgvOTrJX8OT3JXoOT6MTrOT8GgrOT8HTpOT8MToOUoHT8OUoJT8OUoLn3OXrAgoOXrDg8OXrMT8OXvSToOX6CTvOX8CZrOX8OgrOb6HgvOb8AToOb8MT8OcvLZ8OgvAlrOgvHTvOgvJTrOgvJnrOgvLZrOgvLn4OgvMT8OgvRTrOg8AZoOg8DbvOnrOXoOnvJn4OnvLhvOnvRTrOn3GgoOn3JnvOn6JbvOn8OTrPTGYFTPbBnFnPbGnDnPgDYQTPlrAnvPlrETvPlrLnvPlrMXvPlvFX4QTMTAnQTrJU8QYCnJlQYJlQlQbGTQbQb8JnrQb8LZoQb8LnvQb8MT8Qb8Ml8Qb8ST4QloAl4QloHZvQloJX8QloMn8QnJZOlRTrAZvRTrDTrRTvJn4RTvLhvRT4Jb8RZrAZrRZ8AkrRZ8JU8RZ8LV8RZ8LnvRbJlQXRg3GboRg3MnvRg8AZ8Rg8JboRg8Jl4RnLTCbRnvFl3RnvQb8SToAl4SToCZrSToFZoSToHXrSToJU8SToJgvSToJl4SToLhrSToMX3STrAlvSTrCT9STrCgrSTrGgrSTrHXrSTrHboSTrJnoSTrNboSTvLnrST4AZoST8Ab8ST8JT8SUoJn3SU6HZ#SU6JTvSU8Db8SU8HboSU8LgrSV8JT8SZrAcrSZrAl3SZrJT8SZrJnvSZrMT8SZvLUoSZ4FZoSZ8JnoSZ8RZrScoLnrScoMT8ScoMX8ScrAT4ScrAZ8ScrLZ8ScrLkvScvDb8ScvLf8ScvNToSgrFZrShvKnrSloHUoSloLnrSlrMXoSl8HgrSmrJUoSn3BX6",
    "ATFlOn3ATLgrDYAT4MTAnAT8LTMnAYJnRTrAbGgJnrAbLV8LnAbvNTAnAeFbLg3AgOYMXoAlQbFboAnDboAfAnJgoJTBToDgAnBUJbAl3BboDUAnCTDlvLnCTFTrSnCYoQTLnDTwAbAnDUDTrSnDUHgHgrDX8LXFnDbJXAcrETvLTLnGTFTQbrGTMnGToGT3DUFbGUJlPX3GbQg8LnGboJbFnGb3GgAYGgAg8ScGgMbAXrGgvAbAnGnJTLnvGnvATFgHTDT6ATHTrDlJnHYLnMn8HZrSbJTHZ8LTFnHbFTJUoHgSeMT8HgrLjAnHgvAbAnHlFUrDlHnDgvAnHnHTFT3HnQTGnrJTAaMXvJTGbCn3JTOgrAnJXvAXMnJbMg8SnJbMnRg3Jb8LTMnJnAl3OnJnGYrQlJnJlQY3LTDlCn3LTJjLg3LTLgvFXLTMg3GTLV8HUOgLXFZLg3LXNXrMnLX8QXFnLX9AlMYLYLXPXrLZAbJU8LZDUJU8LZMXrSnLZ$AgFnLaPXrDULbFYrMnLbMn8LXLboJgJgLeFbLg3LgLZrSnLgOYAgoLhrRnJlLkCTrSnLkOnLhrLnFX%AYLnFZoJXLnHTvJbLnLloAbMTATLf8MTHgJn3MTMXrAXMT3MTFnMUITvFnMXFX%AYMXMXvFbMXrFTDbMYAcMX3MbLf8SnMb8JbFnMgMXrMTMgvAXFnMgvGgCmMnAloSnMnFnJTrOXvMXSnOX8HTMnObJT8ScObLZFl3ObMXCZoPTLgrQXPUFnoQXPU3RXJlPX3RkQXPbrJXQlPlrJbFnQUAhrDbQXGnCXvQYLnHlvQbLfLnvRTOgvJbRXJYrQlRYLnrQlRbLnrQlRlFT8JlRlFnrQXSTClCn3STHTrAnSTLZQlrSTMnGTrSToHgGbSTrGTDnSTvGXCnST3HgFbSU3HXAXSbAnJn3SbFT8LnScLfLnv",
    "AT3JgJX8AT8FZoSnAT8JgFV8AT8LhrDbAZ8JT8DbAb8GgLhrAb8SkLnvAe8MT8SnAlMYJXLVAl3GYDTvAl3LfLnvBUDTvLl3CTOn3HTrCT3DUGgrCU8MT8AbCbFTrJUoCgrDb8MTDTLV8JX8DTLnLXQlDT8LZrSnDUQb8FZ8DUST4JnvDb8ScOUoDj6GbJl4GTLfCYMlGToAXvFnGboAXvLnGgAcrJn3GgvFnSToGnLf8JnvGn#HTDToHTLnFXJlHTvATFToHTvHTDToHTvMTAgoHT3STClvHT4AlFl6HT8HTDToHUoDgJTrHUoScMX3HbRZrMXoHboJg8LTHgDb8JTrHgMToLf8HgvLnLnoHnHn3HT4Hn6MgvAnJTJU8ScvJT3AaQT8JT8HTrAnJXrRg8AnJbAloMXoJbrATFToJbvMnoSnJgDb6GgvJgDb8MXoJgSX3JU8JguATFToJlPYLnQlJlQkDnLbJlQlFYJlJl8Lf8OTJnCTFnLbJnLTHXMnJnLXGXCnJnoFfRg3JnrMYRg3Jn3HgFl3KT8Dg8LnLTRlFnPTLTvPbLbvLVoSbrCZLXMY6HT3LXNU7DlrLXNXDTATLX8DX8LnLZDb8JU8LZMnoLhrLZSToJU8LZrLaLnrLZvJn3SnLZ8LhrSnLaJnoMT8LbFlrHTvLbrFTLnrLbvATLlvLb6OTFn3LcLnJZOlLeAT6Mn4LeJT3ObrLg6LXFlrLhrJg8LnLhvDlPX4LhvLfLnvLj6JTFT3LnFbrMXoLnQluCTvLnrQXCY6LnvLfLnvLnvMgLnvLnvSeLf8MTMbrJn3MT3JgST3MT8AnATrMT8LULnrMUMToCZrMUScvLf8MXoDT8SnMX6ATFToMX8AXMT8MX8FkMT8MX8HTrDUMX8ScoSnMYJT6CTvMgAcrMXoMg8SToAfMlvAXLg3MnFl3AnvOT3AnFl3OUoATHT8OU3RnLXrOXrOXrSnObPbvFn6Og8HgrSnOg8OX8DbPTvAgoJgPU3RYLnrPXrDnJZrPb8CTGgvPlrLTDlvPlvFUJnoQUvFXrQlQeMnoAl3QlrQlrSnRTFTrJUoSTDlLiLXSTFg6HT3STJgoMn4STrFTJTrSTrLZFl3ST4FnMXoSUrDlHUoScvHTvSnSfLkvMXo",
    "AUoAcrMXoAZ8HboAg8AbOg6ATFgAg8AloMXoAl3AT8JTrAl8MX8MXoCT3SToJU8Cl8Db8MXoDT8HgrATrDboOT8MXoGTOTrATMnGT8LhrAZ8GnvFnGnQXHToGgvAcrHTvAXvLl3HbrAZoMXoHgBlFXLg3HgMnFXrSnHgrSb8JUoHn6HT8LgvITvATrJUoJUoLZrRnvJU8HT8Jb8JXvFX8QT8JXvLToJTrJYrQnGnQXJgrJnoATrJnoJU8ScvJnvMnvMXoLTCTLgrJXLTJlRTvQlLbRnJlQYvLbrMb8LnvLbvFn3RnoLdCVSTGZrLeSTvGXCnLg3MnoLn3MToLlrETvMT8SToAl3MbrDU6GTvMb8LX4LhrPlrLXGXCnSToLf8Rg3STrDb8LTrSTvLTHXMnSb3RYLnMnSgOg6ATFg",
    "HUDlGnrQXrJTrHgLnrAcJYMb8DULc8LTvFgGnCk3Mg8JbAnLX4QYvFYHnMXrRUoJnGnvFnRlvFTJlQnoSTrBXHXrLYSUJgLfoMT8Se8DTrHbDb",
    "AbDl8SToJU8An3RbAb8ST8DUSTrGnrAgoLbFU6Db8LTrMg8AaHT8Jb8ObDl8SToJU8Pb3RlvFYoJl"
];
const codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
function getHangul(code) {
    if (code >= 40) {
        code = code + 168 - 40;
    }
    else if (code >= 19) {
        code = code + 97 - 19;
    }
    return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__["toUtf8String"])([225, (code >> 6) + 132, (code & 0x3f) + 128]);
}
let wordlist = null;
function loadWords(lang) {
    if (wordlist != null) {
        return;
    }
    wordlist = [];
    data.forEach((data, length) => {
        length += 4;
        for (let i = 0; i < data.length; i += length) {
            let word = "";
            for (let j = 0; j < length; j++) {
                word += getHangul(codes.indexOf(data[i + j]));
            }
            wordlist.push(word);
        }
    });
    wordlist.sort();
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].check(lang) !== "0xf9eddeace9c5d3da9c93cf7d3cd38f6a13ed3affb933259ae865714e8a3ae71a") {
        wordlist = null;
        throw new Error("BIP39 Wordlist for ko (Korean) FAILED");
    }
}
class LangKo extends _wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"] {
    constructor() {
        super("ko");
    }
    getWord(index) {
        loadWords(this);
        return wordlist[index];
    }
    getWordIndex(word) {
        loadWords(this);
        return wordlist.indexOf(word);
    }
}
const langKo = new LangKo();
_wordlist__WEBPACK_IMPORTED_MODULE_1__["Wordlist"].register(langKo);

//# sourceMappingURL=lang-ko.js.map

/***/ }),

/***/ "kP66":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/number.js ***!
  \******************************************************************/
/*! exports provided: NumberCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberCoder", function() { return NumberCoder; });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/constants */ "tGuN");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");




class NumberCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_2__["Coder"] {
    constructor(size, signed, localName) {
        const name = ((signed ? "int" : "uint") + (size * 8));
        super(name, name, localName, false);
        this.size = size;
        this.signed = signed;
    }
    defaultValue() {
        return 0;
    }
    encode(writer, value) {
        let v = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(value);
        // Check bounds are safe for encoding
        let maxUintValue = _ethersproject_constants__WEBPACK_IMPORTED_MODULE_1__["MaxUint256"].mask(writer.wordSize * 8);
        if (this.signed) {
            let bounds = maxUintValue.mask(this.size * 8 - 1);
            if (v.gt(bounds) || v.lt(bounds.add(_ethersproject_constants__WEBPACK_IMPORTED_MODULE_1__["One"]).mul(_ethersproject_constants__WEBPACK_IMPORTED_MODULE_1__["NegativeOne"]))) {
                this._throwError("value out-of-bounds", value);
            }
        }
        else if (v.lt(_ethersproject_constants__WEBPACK_IMPORTED_MODULE_1__["Zero"]) || v.gt(maxUintValue.mask(this.size * 8))) {
            this._throwError("value out-of-bounds", value);
        }
        v = v.toTwos(this.size * 8).mask(this.size * 8);
        if (this.signed) {
            v = v.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
        }
        return writer.writeValue(v);
    }
    decode(reader) {
        let value = reader.readValue().mask(this.size * 8);
        if (this.signed) {
            value = value.fromTwos(this.size * 8);
        }
        return reader.coerce(this.name, value);
    }
}
//# sourceMappingURL=number.js.map

/***/ }),

/***/ "nPSg":
/*!**********************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/keystore.js ***!
  \**********************************************************************/
/*! exports provided: KeystoreAccount, decryptSync, decrypt, encrypt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeystoreAccount", function() { return KeystoreAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decryptSync", function() { return decryptSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decrypt", function() { return decrypt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encrypt", function() { return encrypt; });
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aes-js */ "cke4");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scrypt-js */ "n2qG");
/* harmony import */ var scrypt_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scrypt_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/hdnode */ "8AIR");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/keccak256 */ "b1pR");
/* harmony import */ var _ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/pbkdf2 */ "Uvg9");
/* harmony import */ var _ethersproject_random__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/random */ "CxN6");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/transactions */ "WsP5");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ "/m0q");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_version */ "Ub8o");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};













const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_11__["Logger"](_version__WEBPACK_IMPORTED_MODULE_12__["version"]);
// Exported Types
function hasMnemonic(value) {
    return (value != null && value.mnemonic && value.mnemonic.phrase);
}
class KeystoreAccount extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_8__["Description"] {
    isKeystoreAccount(value) {
        return !!(value && value._isKeystoreAccount);
    }
}
function _decrypt(data, key, ciphertext) {
    const cipher = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/cipher");
    if (cipher === "aes-128-ctr") {
        const iv = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["looseArrayify"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/cipherparams/iv"));
        const counter = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.Counter(iv);
        const aesCtr = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.ModeOfOperation.ctr(key, counter);
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(aesCtr.decrypt(ciphertext));
    }
    return null;
}
function _getAccount(data, key) {
    const ciphertext = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["looseArrayify"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/ciphertext"));
    const computedMAC = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(Object(_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_5__["keccak256"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["concat"])([key.slice(16, 32), ciphertext]))).substring(2);
    if (computedMAC !== Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/mac").toLowerCase()) {
        throw new Error("invalid password");
    }
    const privateKey = _decrypt(data, key.slice(0, 16), ciphertext);
    if (!privateKey) {
        logger.throwError("unsupported cipher", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_11__["Logger"].errors.UNSUPPORTED_OPERATION, {
            operation: "decrypt"
        });
    }
    const mnemonicKey = key.slice(32, 64);
    const address = Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_9__["computeAddress"])(privateKey);
    if (data.address) {
        let check = data.address.toLowerCase();
        if (check.substring(0, 2) !== "0x") {
            check = "0x" + check;
        }
        if (Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_2__["getAddress"])(check) !== address) {
            throw new Error("address mismatch");
        }
    }
    const account = {
        _isKeystoreAccount: true,
        address: address,
        privateKey: Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(privateKey)
    };
    // Version 0.1 x-ethers metadata must contain an encrypted mnemonic phrase
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "x-ethers/version") === "0.1") {
        const mnemonicCiphertext = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["looseArrayify"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "x-ethers/mnemonicCiphertext"));
        const mnemonicIv = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["looseArrayify"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "x-ethers/mnemonicCounter"));
        const mnemonicCounter = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.Counter(mnemonicIv);
        const mnemonicAesCtr = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
        const path = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "x-ethers/path") || _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_4__["defaultPath"];
        const locale = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "x-ethers/locale") || "en";
        const entropy = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(mnemonicAesCtr.decrypt(mnemonicCiphertext));
        try {
            const mnemonic = Object(_ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_4__["entropyToMnemonic"])(entropy, locale);
            const node = _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_4__["HDNode"].fromMnemonic(mnemonic, null, locale).derivePath(path);
            if (node.privateKey != account.privateKey) {
                throw new Error("mnemonic mismatch");
            }
            account.mnemonic = node.mnemonic;
        }
        catch (error) {
            // If we don't have the locale wordlist installed to
            // read this mnemonic, just bail and don't set the
            // mnemonic
            if (error.code !== _ethersproject_logger__WEBPACK_IMPORTED_MODULE_11__["Logger"].errors.INVALID_ARGUMENT || error.argument !== "wordlist") {
                throw error;
            }
        }
    }
    return new KeystoreAccount(account);
}
function pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc) {
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(Object(_ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_6__["pbkdf2"])(passwordBytes, salt, count, dkLen, prfFunc));
}
function pbkdf2(passwordBytes, salt, count, dkLen, prfFunc) {
    return Promise.resolve(pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc));
}
function _computeKdfKey(data, password, pbkdf2Func, scryptFunc, progressCallback) {
    const passwordBytes = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getPassword"])(password);
    const kdf = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdf");
    if (kdf && typeof (kdf) === "string") {
        const throwError = function (name, value) {
            return logger.throwArgumentError("invalid key-derivation function parameters", name, value);
        };
        if (kdf.toLowerCase() === "scrypt") {
            const salt = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["looseArrayify"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/salt"));
            const N = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/n"));
            const r = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/r"));
            const p = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/p"));
            // Check for all required parameters
            if (!N || !r || !p) {
                throwError("kdf", kdf);
            }
            // Make sure N is a power of 2
            if ((N & (N - 1)) !== 0) {
                throwError("N", N);
            }
            const dkLen = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/dklen"));
            if (dkLen !== 32) {
                throwError("dklen", dkLen);
            }
            return scryptFunc(passwordBytes, salt, N, r, p, 64, progressCallback);
        }
        else if (kdf.toLowerCase() === "pbkdf2") {
            const salt = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["looseArrayify"])(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/salt"));
            let prfFunc = null;
            const prf = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/prf");
            if (prf === "hmac-sha256") {
                prfFunc = "sha256";
            }
            else if (prf === "hmac-sha512") {
                prfFunc = "sha512";
            }
            else {
                throwError("prf", prf);
            }
            const count = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/c"));
            const dkLen = parseInt(Object(_utils__WEBPACK_IMPORTED_MODULE_10__["searchPath"])(data, "crypto/kdfparams/dklen"));
            if (dkLen !== 32) {
                throwError("dklen", dkLen);
            }
            return pbkdf2Func(passwordBytes, salt, count, dkLen, prfFunc);
        }
    }
    return logger.throwArgumentError("unsupported key-derivation function", "kdf", kdf);
}
function decryptSync(json, password) {
    const data = JSON.parse(json);
    const key = _computeKdfKey(data, password, pbkdf2Sync, scrypt_js__WEBPACK_IMPORTED_MODULE_1___default.a.syncScrypt);
    return _getAccount(data, key);
}
function decrypt(json, password, progressCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(json);
        const key = yield _computeKdfKey(data, password, pbkdf2, scrypt_js__WEBPACK_IMPORTED_MODULE_1___default.a.scrypt, progressCallback);
        return _getAccount(data, key);
    });
}
function encrypt(account, password, options, progressCallback) {
    try {
        // Check the address matches the private key
        if (Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_2__["getAddress"])(account.address) !== Object(_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_9__["computeAddress"])(account.privateKey)) {
            throw new Error("address/privateKey mismatch");
        }
        // Check the mnemonic (if any) matches the private key
        if (hasMnemonic(account)) {
            const mnemonic = account.mnemonic;
            const node = _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_4__["HDNode"].fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path || _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_4__["defaultPath"]);
            if (node.privateKey != account.privateKey) {
                throw new Error("mnemonic mismatch");
            }
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
    // The options are optional, so adjust the call as needed
    if (typeof (options) === "function" && !progressCallback) {
        progressCallback = options;
        options = {};
    }
    if (!options) {
        options = {};
    }
    const privateKey = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(account.privateKey);
    const passwordBytes = Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getPassword"])(password);
    let entropy = null;
    let path = null;
    let locale = null;
    if (hasMnemonic(account)) {
        const srcMnemonic = account.mnemonic;
        entropy = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(Object(_ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_4__["mnemonicToEntropy"])(srcMnemonic.phrase, srcMnemonic.locale || "en"));
        path = srcMnemonic.path || _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_4__["defaultPath"];
        locale = srcMnemonic.locale || "en";
    }
    let client = options.client;
    if (!client) {
        client = "ethers.js";
    }
    // Check/generate the salt
    let salt = null;
    if (options.salt) {
        salt = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(options.salt);
    }
    else {
        salt = Object(_ethersproject_random__WEBPACK_IMPORTED_MODULE_7__["randomBytes"])(32);
        ;
    }
    // Override initialization vector
    let iv = null;
    if (options.iv) {
        iv = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(options.iv);
        if (iv.length !== 16) {
            throw new Error("invalid iv");
        }
    }
    else {
        iv = Object(_ethersproject_random__WEBPACK_IMPORTED_MODULE_7__["randomBytes"])(16);
    }
    // Override the uuid
    let uuidRandom = null;
    if (options.uuid) {
        uuidRandom = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(options.uuid);
        if (uuidRandom.length !== 16) {
            throw new Error("invalid uuid");
        }
    }
    else {
        uuidRandom = Object(_ethersproject_random__WEBPACK_IMPORTED_MODULE_7__["randomBytes"])(16);
    }
    // Override the scrypt password-based key derivation function parameters
    let N = (1 << 17), r = 8, p = 1;
    if (options.scrypt) {
        if (options.scrypt.N) {
            N = options.scrypt.N;
        }
        if (options.scrypt.r) {
            r = options.scrypt.r;
        }
        if (options.scrypt.p) {
            p = options.scrypt.p;
        }
    }
    // We take 64 bytes:
    //   - 32 bytes   As normal for the Web3 secret storage (derivedKey, macPrefix)
    //   - 32 bytes   AES key to encrypt mnemonic with (required here to be Ethers Wallet)
    return scrypt_js__WEBPACK_IMPORTED_MODULE_1___default.a.scrypt(passwordBytes, salt, N, r, p, 64, progressCallback).then((key) => {
        key = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(key);
        // This will be used to encrypt the wallet (as per Web3 secret storage)
        const derivedKey = key.slice(0, 16);
        const macPrefix = key.slice(16, 32);
        // This will be used to encrypt the mnemonic phrase (if any)
        const mnemonicKey = key.slice(32, 64);
        // Encrypt the private key
        const counter = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.Counter(iv);
        const aesCtr = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.ModeOfOperation.ctr(derivedKey, counter);
        const ciphertext = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(aesCtr.encrypt(privateKey));
        // Compute the message authentication code, used to check the password
        const mac = Object(_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_5__["keccak256"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["concat"])([macPrefix, ciphertext]));
        // See: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
        const data = {
            address: account.address.substring(2).toLowerCase(),
            id: Object(_utils__WEBPACK_IMPORTED_MODULE_10__["uuidV4"])(uuidRandom),
            version: 3,
            Crypto: {
                cipher: "aes-128-ctr",
                cipherparams: {
                    iv: Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(iv).substring(2),
                },
                ciphertext: Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(ciphertext).substring(2),
                kdf: "scrypt",
                kdfparams: {
                    salt: Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(salt).substring(2),
                    n: N,
                    dklen: 32,
                    p: p,
                    r: r
                },
                mac: mac.substring(2)
            }
        };
        // If we have a mnemonic, encrypt it into the JSON wallet
        if (entropy) {
            const mnemonicIv = Object(_ethersproject_random__WEBPACK_IMPORTED_MODULE_7__["randomBytes"])(16);
            const mnemonicCounter = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.Counter(mnemonicIv);
            const mnemonicAesCtr = new aes_js__WEBPACK_IMPORTED_MODULE_0___default.a.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
            const mnemonicCiphertext = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(mnemonicAesCtr.encrypt(entropy));
            const now = new Date();
            const timestamp = (now.getUTCFullYear() + "-" +
                Object(_utils__WEBPACK_IMPORTED_MODULE_10__["zpad"])(now.getUTCMonth() + 1, 2) + "-" +
                Object(_utils__WEBPACK_IMPORTED_MODULE_10__["zpad"])(now.getUTCDate(), 2) + "T" +
                Object(_utils__WEBPACK_IMPORTED_MODULE_10__["zpad"])(now.getUTCHours(), 2) + "-" +
                Object(_utils__WEBPACK_IMPORTED_MODULE_10__["zpad"])(now.getUTCMinutes(), 2) + "-" +
                Object(_utils__WEBPACK_IMPORTED_MODULE_10__["zpad"])(now.getUTCSeconds(), 2) + ".0Z");
            data["x-ethers"] = {
                client: client,
                gethFilename: ("UTC--" + timestamp + "--" + data.address),
                mnemonicCounter: Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(mnemonicIv).substring(2),
                mnemonicCiphertext: Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(mnemonicCiphertext).substring(2),
                path: path,
                locale: locale,
                version: "0.1"
            };
        }
        return JSON.stringify(data);
    });
}
//# sourceMappingURL=keystore.js.map

/***/ }),

/***/ "qAdo":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/interface.js ***!
  \**************************************************************/
/*! exports provided: checkResultErrors, LogDescription, TransactionDescription, ErrorDescription, Indexed, Interface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogDescription", function() { return LogDescription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionDescription", function() { return TransactionDescription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorDescription", function() { return ErrorDescription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Indexed", function() { return Indexed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return Interface; });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/hash */ "fQvb");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/keccak256 */ "b1pR");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _abi_coder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./abi-coder */ "V5Ee");
/* harmony import */ var _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./coders/abstract-coder */ "UTQg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkResultErrors", function() { return _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_7__["checkResultErrors"]; });

/* harmony import */ var _fragments__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fragments */ "wWf6");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_version */ "EKg+");












const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_9__["Logger"](_version__WEBPACK_IMPORTED_MODULE_10__["version"]);

class LogDescription extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["Description"] {
}
class TransactionDescription extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["Description"] {
}
class ErrorDescription extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["Description"] {
}
class Indexed extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["Description"] {
    static isIndexed(value) {
        return !!(value && value._isIndexed);
    }
}
const BuiltinErrors = {
    "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: true },
    "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] }
};
function wrapAccessError(property, error) {
    const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
    wrap.error = error;
    return wrap;
}
/*
function checkNames(fragment: Fragment, type: "input" | "output", params: Array<ParamType>): void {
    params.reduce((accum, param) => {
        if (param.name) {
            if (accum[param.name]) {
                logger.throwArgumentError(`duplicate ${ type } parameter ${ JSON.stringify(param.name) } in ${ fragment.format("full") }`, "fragment", fragment);
            }
            accum[param.name] = true;
        }
        return accum;
    }, <{ [ name: string ]: boolean }>{ });
}
*/
class Interface {
    constructor(fragments) {
        logger.checkNew(new.target, Interface);
        let abi = [];
        if (typeof (fragments) === "string") {
            abi = JSON.parse(fragments);
        }
        else {
            abi = fragments;
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "fragments", abi.map((fragment) => {
            return _fragments__WEBPACK_IMPORTED_MODULE_8__["Fragment"].from(fragment);
        }).filter((fragment) => (fragment != null)));
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "_abiCoder", Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["getStatic"])((new.target), "getAbiCoder")());
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "functions", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "errors", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "events", {});
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "structs", {});
        // Add all fragments by their signature
        this.fragments.forEach((fragment) => {
            let bucket = null;
            switch (fragment.type) {
                case "constructor":
                    if (this.deploy) {
                        logger.warn("duplicate definition - constructor");
                        return;
                    }
                    //checkNames(fragment, "input", fragment.inputs);
                    Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "deploy", fragment);
                    return;
                case "function":
                    //checkNames(fragment, "input", fragment.inputs);
                    //checkNames(fragment, "output", (<FunctionFragment>fragment).outputs);
                    bucket = this.functions;
                    break;
                case "event":
                    //checkNames(fragment, "input", fragment.inputs);
                    bucket = this.events;
                    break;
                case "error":
                    bucket = this.errors;
                    break;
                default:
                    return;
            }
            let signature = fragment.format();
            if (bucket[signature]) {
                logger.warn("duplicate definition - " + signature);
                return;
            }
            bucket[signature] = fragment;
        });
        // If we do not have a constructor add a default
        if (!this.deploy) {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "deploy", _fragments__WEBPACK_IMPORTED_MODULE_8__["ConstructorFragment"].from({
                payable: false,
                type: "constructor"
            }));
        }
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["defineReadOnly"])(this, "_isInterface", true);
    }
    format(format) {
        if (!format) {
            format = _fragments__WEBPACK_IMPORTED_MODULE_8__["FormatTypes"].full;
        }
        if (format === _fragments__WEBPACK_IMPORTED_MODULE_8__["FormatTypes"].sighash) {
            logger.throwArgumentError("interface does not support formatting sighash", "format", format);
        }
        const abi = this.fragments.map((fragment) => fragment.format(format));
        // We need to re-bundle the JSON fragments a bit
        if (format === _fragments__WEBPACK_IMPORTED_MODULE_8__["FormatTypes"].json) {
            return JSON.stringify(abi.map((j) => JSON.parse(j)));
        }
        return abi;
    }
    // Sub-classes can override these to handle other blockchains
    static getAbiCoder() {
        return _abi_coder__WEBPACK_IMPORTED_MODULE_6__["defaultAbiCoder"];
    }
    static getAddress(address) {
        return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(address);
    }
    static getSighash(fragment) {
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexDataSlice"])(Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__["id"])(fragment.format()), 0, 4);
    }
    static getEventTopic(eventFragment) {
        return Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__["id"])(eventFragment.format());
    }
    // Find a function definition by any means necessary (unless it is ambiguous)
    getFunction(nameOrSignatureOrSighash) {
        if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(nameOrSignatureOrSighash)) {
            for (const name in this.functions) {
                if (nameOrSignatureOrSighash === this.getSighash(name)) {
                    return this.functions[name];
                }
            }
            logger.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
        }
        // It is a bare name, look up the function (will return null if ambiguous)
        if (nameOrSignatureOrSighash.indexOf("(") === -1) {
            const name = nameOrSignatureOrSighash.trim();
            const matching = Object.keys(this.functions).filter((f) => (f.split("(" /* fix:) */)[0] === name));
            if (matching.length === 0) {
                logger.throwArgumentError("no matching function", "name", name);
            }
            else if (matching.length > 1) {
                logger.throwArgumentError("multiple matching functions", "name", name);
            }
            return this.functions[matching[0]];
        }
        // Normlize the signature and lookup the function
        const result = this.functions[_fragments__WEBPACK_IMPORTED_MODULE_8__["FunctionFragment"].fromString(nameOrSignatureOrSighash).format()];
        if (!result) {
            logger.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
        }
        return result;
    }
    // Find an event definition by any means necessary (unless it is ambiguous)
    getEvent(nameOrSignatureOrTopic) {
        if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(nameOrSignatureOrTopic)) {
            const topichash = nameOrSignatureOrTopic.toLowerCase();
            for (const name in this.events) {
                if (topichash === this.getEventTopic(name)) {
                    return this.events[name];
                }
            }
            logger.throwArgumentError("no matching event", "topichash", topichash);
        }
        // It is a bare name, look up the function (will return null if ambiguous)
        if (nameOrSignatureOrTopic.indexOf("(") === -1) {
            const name = nameOrSignatureOrTopic.trim();
            const matching = Object.keys(this.events).filter((f) => (f.split("(" /* fix:) */)[0] === name));
            if (matching.length === 0) {
                logger.throwArgumentError("no matching event", "name", name);
            }
            else if (matching.length > 1) {
                logger.throwArgumentError("multiple matching events", "name", name);
            }
            return this.events[matching[0]];
        }
        // Normlize the signature and lookup the function
        const result = this.events[_fragments__WEBPACK_IMPORTED_MODULE_8__["EventFragment"].fromString(nameOrSignatureOrTopic).format()];
        if (!result) {
            logger.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
        }
        return result;
    }
    // Find a function definition by any means necessary (unless it is ambiguous)
    getError(nameOrSignatureOrSighash) {
        if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(nameOrSignatureOrSighash)) {
            const getSighash = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["getStatic"])(this.constructor, "getSighash");
            for (const name in this.errors) {
                const error = this.errors[name];
                if (nameOrSignatureOrSighash === getSighash(error)) {
                    return this.errors[name];
                }
            }
            logger.throwArgumentError("no matching error", "sighash", nameOrSignatureOrSighash);
        }
        // It is a bare name, look up the function (will return null if ambiguous)
        if (nameOrSignatureOrSighash.indexOf("(") === -1) {
            const name = nameOrSignatureOrSighash.trim();
            const matching = Object.keys(this.errors).filter((f) => (f.split("(" /* fix:) */)[0] === name));
            if (matching.length === 0) {
                logger.throwArgumentError("no matching error", "name", name);
            }
            else if (matching.length > 1) {
                logger.throwArgumentError("multiple matching errors", "name", name);
            }
            return this.errors[matching[0]];
        }
        // Normlize the signature and lookup the function
        const result = this.errors[_fragments__WEBPACK_IMPORTED_MODULE_8__["FunctionFragment"].fromString(nameOrSignatureOrSighash).format()];
        if (!result) {
            logger.throwArgumentError("no matching error", "signature", nameOrSignatureOrSighash);
        }
        return result;
    }
    // Get the sighash (the bytes4 selector) used by Solidity to identify a function
    getSighash(fragment) {
        if (typeof (fragment) === "string") {
            try {
                fragment = this.getFunction(fragment);
            }
            catch (error) {
                try {
                    fragment = this.getError(fragment);
                }
                catch (_) {
                    throw error;
                }
            }
        }
        return Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["getStatic"])(this.constructor, "getSighash")(fragment);
    }
    // Get the topic (the bytes32 hash) used by Solidity to identify an event
    getEventTopic(eventFragment) {
        if (typeof (eventFragment) === "string") {
            eventFragment = this.getEvent(eventFragment);
        }
        return Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__["getStatic"])(this.constructor, "getEventTopic")(eventFragment);
    }
    _decodeParams(params, data) {
        return this._abiCoder.decode(params, data);
    }
    _encodeParams(params, values) {
        return this._abiCoder.encode(params, values);
    }
    encodeDeploy(values) {
        return this._encodeParams(this.deploy.inputs, values || []);
    }
    decodeErrorResult(fragment, data) {
        if (typeof (fragment) === "string") {
            fragment = this.getError(fragment);
        }
        const bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["arrayify"])(data);
        if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(bytes.slice(0, 4)) !== this.getSighash(fragment)) {
            logger.throwArgumentError(`data signature does not match error ${fragment.name}.`, "data", Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(bytes));
        }
        return this._decodeParams(fragment.inputs, bytes.slice(4));
    }
    encodeErrorResult(fragment, values) {
        if (typeof (fragment) === "string") {
            fragment = this.getError(fragment);
        }
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["concat"])([
            this.getSighash(fragment),
            this._encodeParams(fragment.inputs, values || [])
        ]));
    }
    // Decode the data for a function call (e.g. tx.data)
    decodeFunctionData(functionFragment, data) {
        if (typeof (functionFragment) === "string") {
            functionFragment = this.getFunction(functionFragment);
        }
        const bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["arrayify"])(data);
        if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(bytes.slice(0, 4)) !== this.getSighash(functionFragment)) {
            logger.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(bytes));
        }
        return this._decodeParams(functionFragment.inputs, bytes.slice(4));
    }
    // Encode the data for a function call (e.g. tx.data)
    encodeFunctionData(functionFragment, values) {
        if (typeof (functionFragment) === "string") {
            functionFragment = this.getFunction(functionFragment);
        }
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["concat"])([
            this.getSighash(functionFragment),
            this._encodeParams(functionFragment.inputs, values || [])
        ]));
    }
    // Decode the result from a function call (e.g. from eth_call)
    decodeFunctionResult(functionFragment, data) {
        if (typeof (functionFragment) === "string") {
            functionFragment = this.getFunction(functionFragment);
        }
        let bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["arrayify"])(data);
        let reason = null;
        let errorArgs = null;
        let errorName = null;
        let errorSignature = null;
        switch (bytes.length % this._abiCoder._getWordSize()) {
            case 0:
                try {
                    return this._abiCoder.decode(functionFragment.outputs, bytes);
                }
                catch (error) { }
                break;
            case 4: {
                const selector = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(bytes.slice(0, 4));
                const builtin = BuiltinErrors[selector];
                if (builtin) {
                    errorArgs = this._abiCoder.decode(builtin.inputs, bytes.slice(4));
                    errorName = builtin.name;
                    errorSignature = builtin.signature;
                    if (builtin.reason) {
                        reason = errorArgs[0];
                    }
                }
                else {
                    try {
                        const error = this.getError(selector);
                        errorArgs = this._abiCoder.decode(error.inputs, bytes.slice(4));
                        errorName = error.name;
                        errorSignature = error.format();
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                break;
            }
        }
        return logger.throwError("call revert exception", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_9__["Logger"].errors.CALL_EXCEPTION, {
            method: functionFragment.format(),
            errorArgs, errorName, errorSignature, reason
        });
    }
    // Encode the result for a function call (e.g. for eth_call)
    encodeFunctionResult(functionFragment, values) {
        if (typeof (functionFragment) === "string") {
            functionFragment = this.getFunction(functionFragment);
        }
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(this._abiCoder.encode(functionFragment.outputs, values || []));
    }
    // Create the filter for the event with search criteria (e.g. for eth_filterLog)
    encodeFilterTopics(eventFragment, values) {
        if (typeof (eventFragment) === "string") {
            eventFragment = this.getEvent(eventFragment);
        }
        if (values.length > eventFragment.inputs.length) {
            logger.throwError("too many arguments for " + eventFragment.format(), _ethersproject_logger__WEBPACK_IMPORTED_MODULE_9__["Logger"].errors.UNEXPECTED_ARGUMENT, {
                argument: "values",
                value: values
            });
        }
        let topics = [];
        if (!eventFragment.anonymous) {
            topics.push(this.getEventTopic(eventFragment));
        }
        const encodeTopic = (param, value) => {
            if (param.type === "string") {
                return Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__["id"])(value);
            }
            else if (param.type === "bytes") {
                return Object(_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_4__["keccak256"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(value));
            }
            // Check addresses are valid
            if (param.type === "address") {
                this._abiCoder.encode(["address"], [value]);
            }
            return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexZeroPad"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(value), 32);
        };
        values.forEach((value, index) => {
            let param = eventFragment.inputs[index];
            if (!param.indexed) {
                if (value != null) {
                    logger.throwArgumentError("cannot filter non-indexed parameters; must be null", ("contract." + param.name), value);
                }
                return;
            }
            if (value == null) {
                topics.push(null);
            }
            else if (param.baseType === "array" || param.baseType === "tuple") {
                logger.throwArgumentError("filtering with tuples or arrays not supported", ("contract." + param.name), value);
            }
            else if (Array.isArray(value)) {
                topics.push(value.map((value) => encodeTopic(param, value)));
            }
            else {
                topics.push(encodeTopic(param, value));
            }
        });
        // Trim off trailing nulls
        while (topics.length && topics[topics.length - 1] === null) {
            topics.pop();
        }
        return topics;
    }
    encodeEventLog(eventFragment, values) {
        if (typeof (eventFragment) === "string") {
            eventFragment = this.getEvent(eventFragment);
        }
        const topics = [];
        const dataTypes = [];
        const dataValues = [];
        if (!eventFragment.anonymous) {
            topics.push(this.getEventTopic(eventFragment));
        }
        if (values.length !== eventFragment.inputs.length) {
            logger.throwArgumentError("event arguments/values mismatch", "values", values);
        }
        eventFragment.inputs.forEach((param, index) => {
            const value = values[index];
            if (param.indexed) {
                if (param.type === "string") {
                    topics.push(Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__["id"])(value));
                }
                else if (param.type === "bytes") {
                    topics.push(Object(_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_4__["keccak256"])(value));
                }
                else if (param.baseType === "tuple" || param.baseType === "array") {
                    // @TOOD
                    throw new Error("not implemented");
                }
                else {
                    topics.push(this._abiCoder.encode([param.type], [value]));
                }
            }
            else {
                dataTypes.push(param);
                dataValues.push(value);
            }
        });
        return {
            data: this._abiCoder.encode(dataTypes, dataValues),
            topics: topics
        };
    }
    // Decode a filter for the event and the search criteria
    decodeEventLog(eventFragment, data, topics) {
        if (typeof (eventFragment) === "string") {
            eventFragment = this.getEvent(eventFragment);
        }
        if (topics != null && !eventFragment.anonymous) {
            let topicHash = this.getEventTopic(eventFragment);
            if (!Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["isHexString"])(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
                logger.throwError("fragment/topic mismatch", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_9__["Logger"].errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: topicHash, value: topics[0] });
            }
            topics = topics.slice(1);
        }
        let indexed = [];
        let nonIndexed = [];
        let dynamic = [];
        eventFragment.inputs.forEach((param, index) => {
            if (param.indexed) {
                if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
                    indexed.push(_fragments__WEBPACK_IMPORTED_MODULE_8__["ParamType"].fromObject({ type: "bytes32", name: param.name }));
                    dynamic.push(true);
                }
                else {
                    indexed.push(param);
                    dynamic.push(false);
                }
            }
            else {
                nonIndexed.push(param);
                dynamic.push(false);
            }
        });
        let resultIndexed = (topics != null) ? this._abiCoder.decode(indexed, Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["concat"])(topics)) : null;
        let resultNonIndexed = this._abiCoder.decode(nonIndexed, data, true);
        let result = [];
        let nonIndexedIndex = 0, indexedIndex = 0;
        eventFragment.inputs.forEach((param, index) => {
            if (param.indexed) {
                if (resultIndexed == null) {
                    result[index] = new Indexed({ _isIndexed: true, hash: null });
                }
                else if (dynamic[index]) {
                    result[index] = new Indexed({ _isIndexed: true, hash: resultIndexed[indexedIndex++] });
                }
                else {
                    try {
                        result[index] = resultIndexed[indexedIndex++];
                    }
                    catch (error) {
                        result[index] = error;
                    }
                }
            }
            else {
                try {
                    result[index] = resultNonIndexed[nonIndexedIndex++];
                }
                catch (error) {
                    result[index] = error;
                }
            }
            // Add the keyword argument if named and safe
            if (param.name && result[param.name] == null) {
                const value = result[index];
                // Make error named values throw on access
                if (value instanceof Error) {
                    Object.defineProperty(result, param.name, {
                        enumerable: true,
                        get: () => { throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value); }
                    });
                }
                else {
                    result[param.name] = value;
                }
            }
        });
        // Make all error indexed values throw on access
        for (let i = 0; i < result.length; i++) {
            const value = result[i];
            if (value instanceof Error) {
                Object.defineProperty(result, i, {
                    enumerable: true,
                    get: () => { throw wrapAccessError(`index ${i}`, value); }
                });
            }
        }
        return Object.freeze(result);
    }
    // Given a transaction, find the matching function fragment (if any) and
    // determine all its properties and call parameters
    parseTransaction(tx) {
        let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());
        if (!fragment) {
            return null;
        }
        return new TransactionDescription({
            args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
            functionFragment: fragment,
            name: fragment.name,
            signature: fragment.format(),
            sighash: this.getSighash(fragment),
            value: _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__["BigNumber"].from(tx.value || "0"),
        });
    }
    // @TODO
    //parseCallResult(data: BytesLike): ??
    // Given an event log, find the matching event fragment (if any) and
    // determine all its properties and values
    parseLog(log) {
        let fragment = this.getEvent(log.topics[0]);
        if (!fragment || fragment.anonymous) {
            return null;
        }
        // @TODO: If anonymous, and the only method, and the input count matches, should we parse?
        //        Probably not, because just because it is the only event in the ABI does
        //        not mean we have the full ABI; maybe jsut a fragment?
        return new LogDescription({
            eventFragment: fragment,
            name: fragment.name,
            signature: fragment.format(),
            topic: this.getEventTopic(fragment),
            args: this.decodeEventLog(fragment, log.data, log.topics)
        });
    }
    parseError(data) {
        const hexData = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__["hexlify"])(data);
        let fragment = this.getError(hexData.substring(0, 10).toLowerCase());
        if (!fragment) {
            return null;
        }
        return new ErrorDescription({
            args: this._abiCoder.decode(fragment.inputs, "0x" + hexData.substring(10)),
            errorFragment: fragment,
            name: fragment.name,
            signature: fragment.format(),
            sighash: this.getSighash(fragment),
        });
    }
    /*
    static from(value: Array<Fragment | string | JsonAbi> | string | Interface) {
        if (Interface.isInterface(value)) {
            return value;
        }
        if (typeof(value) === "string") {
            return new Interface(JSON.parse(value));
        }
        return new Interface(value);
    }
    */
    static isInterface(value) {
        return !!(value && value._isInterface);
    }
}
//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "ssiG":
/*!*****************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/tuple.js ***!
  \*****************************************************************/
/*! exports provided: TupleCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TupleCoder", function() { return TupleCoder; });
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "BEEm");



class TupleCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__["Coder"] {
    constructor(coders, localName) {
        let dynamic = false;
        const types = [];
        coders.forEach((coder) => {
            if (coder.dynamic) {
                dynamic = true;
            }
            types.push(coder.type);
        });
        const type = ("tuple(" + types.join(",") + ")");
        super("tuple", type, localName, dynamic);
        this.coders = coders;
    }
    defaultValue() {
        const values = [];
        this.coders.forEach((coder) => {
            values.push(coder.defaultValue());
        });
        // We only output named properties for uniquely named coders
        const uniqueNames = this.coders.reduce((accum, coder) => {
            const name = coder.localName;
            if (name) {
                if (!accum[name]) {
                    accum[name] = 0;
                }
                accum[name]++;
            }
            return accum;
        }, {});
        // Add named values
        this.coders.forEach((coder, index) => {
            let name = coder.localName;
            if (!name || uniqueNames[name] !== 1) {
                return;
            }
            if (name === "length") {
                name = "_length";
            }
            if (values[name] != null) {
                return;
            }
            values[name] = values[index];
        });
        return Object.freeze(values);
    }
    encode(writer, value) {
        return Object(_array__WEBPACK_IMPORTED_MODULE_1__["pack"])(writer, this.coders, value);
    }
    decode(reader) {
        return reader.coerce(this.name, Object(_array__WEBPACK_IMPORTED_MODULE_1__["unpack"])(reader, this.coders));
    }
}
//# sourceMappingURL=tuple.js.map

/***/ }),

/***/ "uvd5":
/*!**********************************************************!*\
  !*** ./node_modules/@ethersproject/web/lib.esm/index.js ***!
  \**********************************************************/
/*! exports provided: _fetchData, fetchJson, poll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_fetchData", function() { return _fetchData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchJson", function() { return fetchJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "poll", function() { return poll; });
/* harmony import */ var _ethersproject_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/base64 */ "cdpc");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version */ "4wOL");
/* harmony import */ var _geturl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./geturl */ "Id5K");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"](_version__WEBPACK_IMPORTED_MODULE_5__["version"]);

function staller(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
function bodyify(value, type) {
    if (value == null) {
        return null;
    }
    if (typeof (value) === "string") {
        return value;
    }
    if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["isBytesLike"])(value)) {
        if (type && (type.split("/")[0] === "text" || type.split(";")[0].trim() === "application/json")) {
            try {
                return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["toUtf8String"])(value);
            }
            catch (error) { }
            ;
        }
        return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexlify"])(value);
    }
    return value;
}
// This API is still a work in progress; the future changes will likely be:
// - ConnectionInfo => FetchDataRequest<T = any>
// - FetchDataRequest.body? = string | Uint8Array | { contentType: string, data: string | Uint8Array }
//   - If string => text/plain, Uint8Array => application/octet-stream (if content-type unspecified)
// - FetchDataRequest.processFunc = (body: Uint8Array, response: FetchDataResponse) => T
// For this reason, it should be considered internal until the API is finalized
function _fetchData(connection, body, processFunc) {
    // How many times to retry in the event of a throttle
    const attemptLimit = (typeof (connection) === "object" && connection.throttleLimit != null) ? connection.throttleLimit : 12;
    logger.assertArgument((attemptLimit > 0 && (attemptLimit % 1) === 0), "invalid connection throttle limit", "connection.throttleLimit", attemptLimit);
    const throttleCallback = ((typeof (connection) === "object") ? connection.throttleCallback : null);
    const throttleSlotInterval = ((typeof (connection) === "object" && typeof (connection.throttleSlotInterval) === "number") ? connection.throttleSlotInterval : 100);
    logger.assertArgument((throttleSlotInterval > 0 && (throttleSlotInterval % 1) === 0), "invalid connection throttle slot interval", "connection.throttleSlotInterval", throttleSlotInterval);
    const headers = {};
    let url = null;
    // @TODO: Allow ConnectionInfo to override some of these values
    const options = {
        method: "GET",
    };
    let allow304 = false;
    let timeout = 2 * 60 * 1000;
    if (typeof (connection) === "string") {
        url = connection;
    }
    else if (typeof (connection) === "object") {
        if (connection == null || connection.url == null) {
            logger.throwArgumentError("missing URL", "connection.url", connection);
        }
        url = connection.url;
        if (typeof (connection.timeout) === "number" && connection.timeout > 0) {
            timeout = connection.timeout;
        }
        if (connection.headers) {
            for (const key in connection.headers) {
                headers[key.toLowerCase()] = { key: key, value: String(connection.headers[key]) };
                if (["if-none-match", "if-modified-since"].indexOf(key.toLowerCase()) >= 0) {
                    allow304 = true;
                }
            }
        }
        options.allowGzip = !!connection.allowGzip;
        if (connection.user != null && connection.password != null) {
            if (url.substring(0, 6) !== "https:" && connection.allowInsecureAuthentication !== true) {
                logger.throwError("basic authentication requires a secure https url", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.INVALID_ARGUMENT, { argument: "url", url: url, user: connection.user, password: "[REDACTED]" });
            }
            const authorization = connection.user + ":" + connection.password;
            headers["authorization"] = {
                key: "Authorization",
                value: "Basic " + Object(_ethersproject_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["toUtf8Bytes"])(authorization))
            };
        }
    }
    if (body) {
        options.method = "POST";
        options.body = body;
        if (headers["content-type"] == null) {
            headers["content-type"] = { key: "Content-Type", value: "application/octet-stream" };
        }
        if (headers["content-length"] == null) {
            headers["content-length"] = { key: "Content-Length", value: String(body.length) };
        }
    }
    const flatHeaders = {};
    Object.keys(headers).forEach((key) => {
        const header = headers[key];
        flatHeaders[header.key] = header.value;
    });
    options.headers = flatHeaders;
    const runningTimeout = (function () {
        let timer = null;
        const promise = new Promise(function (resolve, reject) {
            if (timeout) {
                timer = setTimeout(() => {
                    if (timer == null) {
                        return;
                    }
                    timer = null;
                    reject(logger.makeError("timeout", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.TIMEOUT, {
                        requestBody: bodyify(options.body, flatHeaders["content-type"]),
                        requestMethod: options.method,
                        timeout: timeout,
                        url: url
                    }));
                }, timeout);
            }
        });
        const cancel = function () {
            if (timer == null) {
                return;
            }
            clearTimeout(timer);
            timer = null;
        };
        return { promise, cancel };
    })();
    const runningFetch = (function () {
        return __awaiter(this, void 0, void 0, function* () {
            for (let attempt = 0; attempt < attemptLimit; attempt++) {
                let response = null;
                try {
                    response = yield Object(_geturl__WEBPACK_IMPORTED_MODULE_6__["getUrl"])(url, options);
                    // Exponential back-off throttling
                    if (response.statusCode === 429 && attempt < attemptLimit) {
                        let tryAgain = true;
                        if (throttleCallback) {
                            tryAgain = yield throttleCallback(attempt, url);
                        }
                        if (tryAgain) {
                            let stall = 0;
                            const retryAfter = response.headers["retry-after"];
                            if (typeof (retryAfter) === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                                stall = parseInt(retryAfter) * 1000;
                            }
                            else {
                                stall = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                            }
                            //console.log("Stalling 429");
                            yield staller(stall);
                            continue;
                        }
                    }
                }
                catch (error) {
                    response = error.response;
                    if (response == null) {
                        runningTimeout.cancel();
                        logger.throwError("missing response", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.SERVER_ERROR, {
                            requestBody: bodyify(options.body, flatHeaders["content-type"]),
                            requestMethod: options.method,
                            serverError: error,
                            url: url
                        });
                    }
                }
                let body = response.body;
                if (allow304 && response.statusCode === 304) {
                    body = null;
                }
                else if (response.statusCode < 200 || response.statusCode >= 300) {
                    runningTimeout.cancel();
                    logger.throwError("bad response", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.SERVER_ERROR, {
                        status: response.statusCode,
                        headers: response.headers,
                        body: bodyify(body, ((response.headers) ? response.headers["content-type"] : null)),
                        requestBody: bodyify(options.body, flatHeaders["content-type"]),
                        requestMethod: options.method,
                        url: url
                    });
                }
                if (processFunc) {
                    try {
                        const result = yield processFunc(body, response);
                        runningTimeout.cancel();
                        return result;
                    }
                    catch (error) {
                        // Allow the processFunc to trigger a throttle
                        if (error.throttleRetry && attempt < attemptLimit) {
                            let tryAgain = true;
                            if (throttleCallback) {
                                tryAgain = yield throttleCallback(attempt, url);
                            }
                            if (tryAgain) {
                                const timeout = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                                //console.log("Stalling callback");
                                yield staller(timeout);
                                continue;
                            }
                        }
                        runningTimeout.cancel();
                        logger.throwError("processing response error", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.SERVER_ERROR, {
                            body: bodyify(body, ((response.headers) ? response.headers["content-type"] : null)),
                            error: error,
                            requestBody: bodyify(options.body, flatHeaders["content-type"]),
                            requestMethod: options.method,
                            url: url
                        });
                    }
                }
                runningTimeout.cancel();
                // If we had a processFunc, it eitehr returned a T or threw above.
                // The "body" is now a Uint8Array.
                return body;
            }
            return logger.throwError("failed response", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.SERVER_ERROR, {
                requestBody: bodyify(options.body, flatHeaders["content-type"]),
                requestMethod: options.method,
                url: url
            });
        });
    })();
    return Promise.race([runningTimeout.promise, runningFetch]);
}
function fetchJson(connection, json, processFunc) {
    let processJsonFunc = (value, response) => {
        let result = null;
        if (value != null) {
            try {
                result = JSON.parse(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["toUtf8String"])(value));
            }
            catch (error) {
                logger.throwError("invalid JSON", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].errors.SERVER_ERROR, {
                    body: value,
                    error: error
                });
            }
        }
        if (processFunc) {
            result = processFunc(result, response);
        }
        return result;
    };
    // If we have json to send, we must
    // - add content-type of application/json (unless already overridden)
    // - convert the json to bytes
    let body = null;
    if (json != null) {
        body = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__["toUtf8Bytes"])(json);
        // Create a connection with the content-type set for JSON
        const updated = (typeof (connection) === "string") ? ({ url: connection }) : Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["shallowCopy"])(connection);
        if (updated.headers) {
            const hasContentType = (Object.keys(updated.headers).filter((k) => (k.toLowerCase() === "content-type")).length) !== 0;
            if (!hasContentType) {
                updated.headers = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["shallowCopy"])(updated.headers);
                updated.headers["content-type"] = "application/json";
            }
        }
        else {
            updated.headers = { "content-type": "application/json" };
        }
        connection = updated;
    }
    return _fetchData(connection, body, processJsonFunc);
}
function poll(func, options) {
    if (!options) {
        options = {};
    }
    options = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__["shallowCopy"])(options);
    if (options.floor == null) {
        options.floor = 0;
    }
    if (options.ceiling == null) {
        options.ceiling = 10000;
    }
    if (options.interval == null) {
        options.interval = 250;
    }
    return new Promise(function (resolve, reject) {
        let timer = null;
        let done = false;
        // Returns true if cancel was successful. Unsuccessful cancel means we're already done.
        const cancel = () => {
            if (done) {
                return false;
            }
            done = true;
            if (timer) {
                clearTimeout(timer);
            }
            return true;
        };
        if (options.timeout) {
            timer = setTimeout(() => {
                if (cancel()) {
                    reject(new Error("timeout"));
                }
            }, options.timeout);
        }
        const retryLimit = options.retryLimit;
        let attempt = 0;
        function check() {
            return func().then(function (result) {
                // If we have a result, or are allowed null then we're done
                if (result !== undefined) {
                    if (cancel()) {
                        resolve(result);
                    }
                }
                else if (options.oncePoll) {
                    options.oncePoll.once("poll", check);
                }
                else if (options.onceBlock) {
                    options.onceBlock.once("block", check);
                    // Otherwise, exponential back-off (up to 10s) our next request
                }
                else if (!done) {
                    attempt++;
                    if (attempt > retryLimit) {
                        if (cancel()) {
                            reject(new Error("retry limit reached"));
                        }
                        return;
                    }
                    let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                    if (timeout < options.floor) {
                        timeout = options.floor;
                    }
                    if (timeout > options.ceiling) {
                        timeout = options.ceiling;
                    }
                    setTimeout(check, timeout);
                }
                return null;
            }, function (error) {
                if (cancel()) {
                    reject(error);
                }
            });
        }
        check();
    });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "vHmw":
/*!************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/base-provider.js ***!
  \************************************************************************/
/*! exports provided: Event, Resolver, BaseProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resolver", function() { return Resolver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseProvider", function() { return BaseProvider; });
/* harmony import */ var _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/abstract-provider */ "7aoe");
/* harmony import */ var _ethersproject_basex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/basex */ "LPIR");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/constants */ "tGuN");
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/hash */ "fQvb");
/* harmony import */ var _ethersproject_networks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/networks */ "AQnt");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/sha2 */ "ggob");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _ethersproject_web__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/web */ "uvd5");
/* harmony import */ var bech32__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! bech32 */ "vyt/");
/* harmony import */ var bech32__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(bech32__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_version */ "SkWp");
/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./formatter */ "fwYn");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"](_version__WEBPACK_IMPORTED_MODULE_13__["version"]);

//////////////////////////////
// Event Serializeing
function checkTopic(topic) {
    if (topic == null) {
        return "null";
    }
    if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexDataLength"])(topic) !== 32) {
        logger.throwArgumentError("invalid topic", "topic", topic);
    }
    return topic.toLowerCase();
}
function serializeTopics(topics) {
    // Remove trailing null AND-topics; they are redundant
    topics = topics.slice();
    while (topics.length > 0 && topics[topics.length - 1] == null) {
        topics.pop();
    }
    return topics.map((topic) => {
        if (Array.isArray(topic)) {
            // Only track unique OR-topics
            const unique = {};
            topic.forEach((topic) => {
                unique[checkTopic(topic)] = true;
            });
            // The order of OR-topics does not matter
            const sorted = Object.keys(unique);
            sorted.sort();
            return sorted.join("|");
        }
        else {
            return checkTopic(topic);
        }
    }).join("&");
}
function deserializeTopics(data) {
    if (data === "") {
        return [];
    }
    return data.split(/&/g).map((topic) => {
        if (topic === "") {
            return [];
        }
        const comps = topic.split("|").map((topic) => {
            return ((topic === "null") ? null : topic);
        });
        return ((comps.length === 1) ? comps[0] : comps);
    });
}
function getEventTag(eventName) {
    if (typeof (eventName) === "string") {
        eventName = eventName.toLowerCase();
        if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexDataLength"])(eventName) === 32) {
            return "tx:" + eventName;
        }
        if (eventName.indexOf(":") === -1) {
            return eventName;
        }
    }
    else if (Array.isArray(eventName)) {
        return "filter:*:" + serializeTopics(eventName);
    }
    else if (_ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_0__["ForkEvent"].isForkEvent(eventName)) {
        logger.warn("not implemented");
        throw new Error("not implemented");
    }
    else if (eventName && typeof (eventName) === "object") {
        return "filter:" + (eventName.address || "*") + ":" + serializeTopics(eventName.topics || []);
    }
    throw new Error("invalid event - " + eventName);
}
//////////////////////////////
// Helper Object
function getTime() {
    return (new Date()).getTime();
}
function stall(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
//////////////////////////////
// Provider Object
/**
 *  EventType
 *   - "block"
 *   - "poll"
 *   - "didPoll"
 *   - "pending"
 *   - "error"
 *   - "network"
 *   - filter
 *   - topics array
 *   - transaction hash
 */
const PollableEvents = ["block", "network", "pending", "poll"];
class Event {
    constructor(tag, listener, once) {
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "tag", tag);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "listener", listener);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "once", once);
    }
    get event() {
        switch (this.type) {
            case "tx":
                return this.hash;
            case "filter":
                return this.filter;
        }
        return this.tag;
    }
    get type() {
        return this.tag.split(":")[0];
    }
    get hash() {
        const comps = this.tag.split(":");
        if (comps[0] !== "tx") {
            return null;
        }
        return comps[1];
    }
    get filter() {
        const comps = this.tag.split(":");
        if (comps[0] !== "filter") {
            return null;
        }
        const address = comps[1];
        const topics = deserializeTopics(comps[2]);
        const filter = {};
        if (topics.length > 0) {
            filter.topics = topics;
        }
        if (address && address !== "*") {
            filter.address = address;
        }
        return filter;
    }
    pollable() {
        return (this.tag.indexOf(":") >= 0 || PollableEvents.indexOf(this.tag) >= 0);
    }
}
;
// https://github.com/satoshilabs/slips/blob/master/slip-0044.md
const coinInfos = {
    "0": { symbol: "btc", p2pkh: 0x00, p2sh: 0x05, prefix: "bc" },
    "2": { symbol: "ltc", p2pkh: 0x30, p2sh: 0x32, prefix: "ltc" },
    "3": { symbol: "doge", p2pkh: 0x1e, p2sh: 0x16 },
    "60": { symbol: "eth", ilk: "eth" },
    "61": { symbol: "etc", ilk: "eth" },
    "700": { symbol: "xdai", ilk: "eth" },
};
function bytes32ify(value) {
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexZeroPad"])(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(value).toHexString(), 32);
}
// Compute the Base58Check encoded data (checksum is first 4 bytes of sha256d)
function base58Encode(data) {
    return _ethersproject_basex__WEBPACK_IMPORTED_MODULE_1__["Base58"].encode(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["concat"])([data, Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexDataSlice"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_8__["sha256"])(Object(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_8__["sha256"])(data)), 0, 4)]));
}
class Resolver {
    constructor(provider, address, name) {
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "provider", provider);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "name", name);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "address", provider.formatter.address(address));
    }
    _fetchBytes(selector, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // keccak256("addr(bytes32,uint256)")
            const transaction = {
                to: this.address,
                data: Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexConcat"])([selector, Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["namehash"])(this.name), (parameters || "0x")])
            };
            try {
                const result = yield this.provider.call(transaction);
                if (result === "0x") {
                    return null;
                }
                const offset = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexDataSlice"])(result, 0, 32)).toNumber();
                const length = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexDataSlice"])(result, offset, offset + 32)).toNumber();
                return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexDataSlice"])(result, offset + 32, offset + 32 + length);
            }
            catch (error) {
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.CALL_EXCEPTION) {
                    return null;
                }
                return null;
            }
        });
    }
    _getAddress(coinType, hexBytes) {
        const coinInfo = coinInfos[String(coinType)];
        if (coinInfo == null) {
            logger.throwError(`unsupported coin type: ${coinType}`, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: `getAddress(${coinType})`
            });
        }
        if (coinInfo.ilk === "eth") {
            return this.provider.formatter.address(hexBytes);
        }
        const bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(hexBytes);
        // P2PKH: OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
        if (coinInfo.p2pkh != null) {
            const p2pkh = hexBytes.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
            if (p2pkh) {
                const length = parseInt(p2pkh[1], 16);
                if (p2pkh[2].length === length * 2 && length >= 1 && length <= 75) {
                    return base58Encode(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["concat"])([[coinInfo.p2pkh], ("0x" + p2pkh[2])]));
                }
            }
        }
        // P2SH: OP_HASH160 <scriptHash> OP_EQUAL
        if (coinInfo.p2sh != null) {
            const p2sh = hexBytes.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
            if (p2sh) {
                const length = parseInt(p2sh[1], 16);
                if (p2sh[2].length === length * 2 && length >= 1 && length <= 75) {
                    return base58Encode(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["concat"])([[coinInfo.p2sh], ("0x" + p2sh[2])]));
                }
            }
        }
        // Bech32
        if (coinInfo.prefix != null) {
            const length = bytes[1];
            // https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki#witness-program
            let version = bytes[0];
            if (version === 0x00) {
                if (length !== 20 && length !== 32) {
                    version = -1;
                }
            }
            else {
                version = -1;
            }
            if (version >= 0 && bytes.length === 2 + length && length >= 1 && length <= 75) {
                const words = bech32__WEBPACK_IMPORTED_MODULE_11___default.a.toWords(bytes.slice(2));
                words.unshift(version);
                return bech32__WEBPACK_IMPORTED_MODULE_11___default.a.encode(coinInfo.prefix, words);
            }
        }
        return null;
    }
    getAddress(coinType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (coinType == null) {
                coinType = 60;
            }
            // If Ethereum, use the standard `addr(bytes32)`
            if (coinType === 60) {
                try {
                    // keccak256("addr(bytes32)")
                    const transaction = {
                        to: this.address,
                        data: ("0x3b3b57de" + Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["namehash"])(this.name).substring(2))
                    };
                    const hexBytes = yield this.provider.call(transaction);
                    // No address
                    if (hexBytes === "0x" || hexBytes === _ethersproject_constants__WEBPACK_IMPORTED_MODULE_4__["HashZero"]) {
                        return null;
                    }
                    return this.provider.formatter.callAddress(hexBytes);
                }
                catch (error) {
                    if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.CALL_EXCEPTION) {
                        return null;
                    }
                    throw error;
                }
            }
            // keccak256("addr(bytes32,uint256")
            const hexBytes = yield this._fetchBytes("0xf1cb7e06", bytes32ify(coinType));
            // No address
            if (hexBytes == null || hexBytes === "0x") {
                return null;
            }
            // Compute the address
            const address = this._getAddress(coinType, hexBytes);
            if (address == null) {
                logger.throwError(`invalid or unsupported coin data`, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNSUPPORTED_OPERATION, {
                    operation: `getAddress(${coinType})`,
                    coinType: coinType,
                    data: hexBytes
                });
            }
            return address;
        });
    }
    getContentHash() {
        return __awaiter(this, void 0, void 0, function* () {
            // keccak256("contenthash()")
            const hexBytes = yield this._fetchBytes("0xbc1c58d1");
            // No contenthash
            if (hexBytes == null || hexBytes === "0x") {
                return null;
            }
            // IPFS (CID: 1, Type: DAG-PB)
            const ipfs = hexBytes.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
            if (ipfs) {
                const length = parseInt(ipfs[3], 16);
                if (ipfs[4].length === length * 2) {
                    return "ipfs:/\/" + _ethersproject_basex__WEBPACK_IMPORTED_MODULE_1__["Base58"].encode("0x" + ipfs[1]);
                }
            }
            // Swarm (CID: 1, Type: swarm-manifest; hash/length hard-coded to keccak256/32)
            const swarm = hexBytes.match(/^0xe40101fa011b20([0-9a-f]*)$/);
            if (swarm) {
                if (swarm[1].length === (32 * 2)) {
                    return "bzz:/\/" + swarm[1];
                }
            }
            return logger.throwError(`invalid or unsupported content hash data`, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "getContentHash()",
                data: hexBytes
            });
        });
    }
    getText(key) {
        return __awaiter(this, void 0, void 0, function* () {
            // The key encoded as parameter to fetchBytes
            let keyBytes = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_9__["toUtf8Bytes"])(key);
            // The nodehash consumes the first slot, so the string pointer targets
            // offset 64, with the length at offset 64 and data starting at offset 96
            keyBytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["concat"])([bytes32ify(64), bytes32ify(keyBytes.length), keyBytes]);
            // Pad to word-size (32 bytes)
            if ((keyBytes.length % 32) !== 0) {
                keyBytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["concat"])([keyBytes, Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexZeroPad"])("0x", 32 - (key.length % 32))]);
            }
            const hexBytes = yield this._fetchBytes("0x59d1d43c", Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(keyBytes));
            if (hexBytes == null || hexBytes === "0x") {
                return null;
            }
            return Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_9__["toUtf8String"])(hexBytes);
        });
    }
}
let defaultFormatter = null;
let nextPollId = 1;
class BaseProvider extends _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_0__["Provider"] {
    /**
     *  ready
     *
     *  A Promise<Network> that resolves only once the provider is ready.
     *
     *  Sub-classes that call the super with a network without a chainId
     *  MUST set this. Standard named networks have a known chainId.
     *
     */
    constructor(network) {
        logger.checkNew(new.target, _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_0__["Provider"]);
        super();
        // Events being listened to
        this._events = [];
        this._emitted = { block: -2 };
        this.formatter = new.target.getFormatter();
        // If network is any, this Provider allows the underlying
        // network to change dynamically, and we auto-detect the
        // current network
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "anyNetwork", (network === "any"));
        if (this.anyNetwork) {
            network = this.detectNetwork();
        }
        if (network instanceof Promise) {
            this._networkPromise = network;
            // Squash any "unhandled promise" errors; that do not need to be handled
            network.catch((error) => { });
            // Trigger initial network setting (async)
            this._ready().catch((error) => { });
        }
        else {
            const knownNetwork = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["getStatic"])((new.target), "getNetwork")(network);
            if (knownNetwork) {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "_network", knownNetwork);
                this.emit("network", knownNetwork, null);
            }
            else {
                logger.throwArgumentError("invalid network", "network", network);
            }
        }
        this._maxInternalBlockNumber = -1024;
        this._lastBlockNumber = -2;
        this._pollingInterval = 4000;
        this._fastQueryDate = 0;
    }
    _ready() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._network == null) {
                let network = null;
                if (this._networkPromise) {
                    try {
                        network = yield this._networkPromise;
                    }
                    catch (error) { }
                }
                // Try the Provider's network detection (this MUST throw if it cannot)
                if (network == null) {
                    network = yield this.detectNetwork();
                }
                // This should never happen; every Provider sub-class should have
                // suggested a network by here (or have thrown).
                if (!network) {
                    logger.throwError("no network detected", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNKNOWN_ERROR, {});
                }
                // Possible this call stacked so do not call defineReadOnly again
                if (this._network == null) {
                    if (this.anyNetwork) {
                        this._network = network;
                    }
                    else {
                        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["defineReadOnly"])(this, "_network", network);
                    }
                    this.emit("network", network, null);
                }
            }
            return this._network;
        });
    }
    // This will always return the most recently established network.
    // For "any", this can change (a "network" event is emitted before
    // any change is refelcted); otherwise this cannot change
    get ready() {
        return Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_10__["poll"])(() => {
            return this._ready().then((network) => {
                return network;
            }, (error) => {
                // If the network isn't running yet, we will wait
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.NETWORK_ERROR && error.event === "noNetwork") {
                    return undefined;
                }
                throw error;
            });
        });
    }
    // @TODO: Remove this and just create a singleton formatter
    static getFormatter() {
        if (defaultFormatter == null) {
            defaultFormatter = new _formatter__WEBPACK_IMPORTED_MODULE_14__["Formatter"]();
        }
        return defaultFormatter;
    }
    // @TODO: Remove this and just use getNetwork
    static getNetwork(network) {
        return Object(_ethersproject_networks__WEBPACK_IMPORTED_MODULE_6__["getNetwork"])((network == null) ? "homestead" : network);
    }
    // Fetches the blockNumber, but will reuse any result that is less
    // than maxAge old or has been requested since the last request
    _getInternalBlockNumber(maxAge) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._ready();
            // Allowing stale data up to maxAge old
            if (maxAge > 0) {
                // While there are pending internal block requests...
                while (this._internalBlockNumber) {
                    // ..."remember" which fetch we started with
                    const internalBlockNumber = this._internalBlockNumber;
                    try {
                        // Check the result is not too stale
                        const result = yield internalBlockNumber;
                        if ((getTime() - result.respTime) <= maxAge) {
                            return result.blockNumber;
                        }
                        // Too old; fetch a new value
                        break;
                    }
                    catch (error) {
                        // The fetch rejected; if we are the first to get the
                        // rejection, drop through so we replace it with a new
                        // fetch; all others blocked will then get that fetch
                        // which won't match the one they "remembered" and loop
                        if (this._internalBlockNumber === internalBlockNumber) {
                            break;
                        }
                    }
                }
            }
            const reqTime = getTime();
            const checkInternalBlockNumber = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])({
                blockNumber: this.perform("getBlockNumber", {}),
                networkError: this.getNetwork().then((network) => (null), (error) => (error))
            }).then(({ blockNumber, networkError }) => {
                if (networkError) {
                    // Unremember this bad internal block number
                    if (this._internalBlockNumber === checkInternalBlockNumber) {
                        this._internalBlockNumber = null;
                    }
                    throw networkError;
                }
                const respTime = getTime();
                blockNumber = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(blockNumber).toNumber();
                if (blockNumber < this._maxInternalBlockNumber) {
                    blockNumber = this._maxInternalBlockNumber;
                }
                this._maxInternalBlockNumber = blockNumber;
                this._setFastBlockNumber(blockNumber); // @TODO: Still need this?
                return { blockNumber, reqTime, respTime };
            });
            this._internalBlockNumber = checkInternalBlockNumber;
            // Swallow unhandled exceptions; if needed they are handled else where
            checkInternalBlockNumber.catch((error) => {
                // Don't null the dead (rejected) fetch, if it has already been updated
                if (this._internalBlockNumber === checkInternalBlockNumber) {
                    this._internalBlockNumber = null;
                }
            });
            return (yield checkInternalBlockNumber).blockNumber;
        });
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            const pollId = nextPollId++;
            // Track all running promises, so we can trigger a post-poll once they are complete
            const runners = [];
            let blockNumber = null;
            try {
                blockNumber = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
            }
            catch (error) {
                this.emit("error", error);
                return;
            }
            this._setFastBlockNumber(blockNumber);
            // Emit a poll event after we have the latest (fast) block number
            this.emit("poll", pollId, blockNumber);
            // If the block has not changed, meh.
            if (blockNumber === this._lastBlockNumber) {
                this.emit("didPoll", pollId);
                return;
            }
            // First polling cycle, trigger a "block" events
            if (this._emitted.block === -2) {
                this._emitted.block = blockNumber - 1;
            }
            if (Math.abs((this._emitted.block) - blockNumber) > 1000) {
                logger.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${blockNumber})`);
                this.emit("error", logger.makeError("network block skew detected", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.NETWORK_ERROR, {
                    blockNumber: blockNumber,
                    event: "blockSkew",
                    previousBlockNumber: this._emitted.block
                }));
                this.emit("block", blockNumber);
            }
            else {
                // Notify all listener for each block that has passed
                for (let i = this._emitted.block + 1; i <= blockNumber; i++) {
                    this.emit("block", i);
                }
            }
            // The emitted block was updated, check for obsolete events
            if (this._emitted.block !== blockNumber) {
                this._emitted.block = blockNumber;
                Object.keys(this._emitted).forEach((key) => {
                    // The block event does not expire
                    if (key === "block") {
                        return;
                    }
                    // The block we were at when we emitted this event
                    const eventBlockNumber = this._emitted[key];
                    // We cannot garbage collect pending transactions or blocks here
                    // They should be garbage collected by the Provider when setting
                    // "pending" events
                    if (eventBlockNumber === "pending") {
                        return;
                    }
                    // Evict any transaction hashes or block hashes over 12 blocks
                    // old, since they should not return null anyways
                    if (blockNumber - eventBlockNumber > 12) {
                        delete this._emitted[key];
                    }
                });
            }
            // First polling cycle
            if (this._lastBlockNumber === -2) {
                this._lastBlockNumber = blockNumber - 1;
            }
            // Find all transaction hashes we are waiting on
            this._events.forEach((event) => {
                switch (event.type) {
                    case "tx": {
                        const hash = event.hash;
                        let runner = this.getTransactionReceipt(hash).then((receipt) => {
                            if (!receipt || receipt.blockNumber == null) {
                                return null;
                            }
                            this._emitted["t:" + hash] = receipt.blockNumber;
                            this.emit(hash, receipt);
                            return null;
                        }).catch((error) => { this.emit("error", error); });
                        runners.push(runner);
                        break;
                    }
                    case "filter": {
                        const filter = event.filter;
                        filter.fromBlock = this._lastBlockNumber + 1;
                        filter.toBlock = blockNumber;
                        const runner = this.getLogs(filter).then((logs) => {
                            if (logs.length === 0) {
                                return;
                            }
                            logs.forEach((log) => {
                                this._emitted["b:" + log.blockHash] = log.blockNumber;
                                this._emitted["t:" + log.transactionHash] = log.blockNumber;
                                this.emit(filter, log);
                            });
                        }).catch((error) => { this.emit("error", error); });
                        runners.push(runner);
                        break;
                    }
                }
            });
            this._lastBlockNumber = blockNumber;
            // Once all events for this loop have been processed, emit "didPoll"
            Promise.all(runners).then(() => {
                this.emit("didPoll", pollId);
            }).catch((error) => { this.emit("error", error); });
            return;
        });
    }
    // Deprecated; do not use this
    resetEventsBlock(blockNumber) {
        this._lastBlockNumber = blockNumber - 1;
        if (this.polling) {
            this.poll();
        }
    }
    get network() {
        return this._network;
    }
    // This method should query the network if the underlying network
    // can change, such as when connected to a JSON-RPC backend
    detectNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            return logger.throwError("provider does not support network detection", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "provider.detectNetwork"
            });
        });
    }
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield this._ready();
            // Make sure we are still connected to the same network; this is
            // only an external call for backends which can have the underlying
            // network change spontaneously
            const currentNetwork = yield this.detectNetwork();
            if (network.chainId !== currentNetwork.chainId) {
                // We are allowing network changes, things can get complex fast;
                // make sure you know what you are doing if you use "any"
                if (this.anyNetwork) {
                    this._network = currentNetwork;
                    // Reset all internal block number guards and caches
                    this._lastBlockNumber = -2;
                    this._fastBlockNumber = null;
                    this._fastBlockNumberPromise = null;
                    this._fastQueryDate = 0;
                    this._emitted.block = -2;
                    this._maxInternalBlockNumber = -1024;
                    this._internalBlockNumber = null;
                    // The "network" event MUST happen before this method resolves
                    // so any events have a chance to unregister, so we stall an
                    // additional event loop before returning from /this/ call
                    this.emit("network", currentNetwork, network);
                    yield stall(0);
                    return this._network;
                }
                const error = logger.makeError("underlying network changed", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.NETWORK_ERROR, {
                    event: "changed",
                    network: network,
                    detectedNetwork: currentNetwork
                });
                this.emit("error", error);
                throw error;
            }
            return network;
        });
    }
    get blockNumber() {
        this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((blockNumber) => {
            this._setFastBlockNumber(blockNumber);
        }, (error) => { });
        return (this._fastBlockNumber != null) ? this._fastBlockNumber : -1;
    }
    get polling() {
        return (this._poller != null);
    }
    set polling(value) {
        if (value && !this._poller) {
            this._poller = setInterval(() => { this.poll(); }, this.pollingInterval);
            if (!this._bootstrapPoll) {
                this._bootstrapPoll = setTimeout(() => {
                    this.poll();
                    // We block additional polls until the polling interval
                    // is done, to prevent overwhelming the poll function
                    this._bootstrapPoll = setTimeout(() => {
                        // If polling was disabled, something may require a poke
                        // since starting the bootstrap poll and it was disabled
                        if (!this._poller) {
                            this.poll();
                        }
                        // Clear out the bootstrap so we can do another
                        this._bootstrapPoll = null;
                    }, this.pollingInterval);
                }, 0);
            }
        }
        else if (!value && this._poller) {
            clearInterval(this._poller);
            this._poller = null;
        }
    }
    get pollingInterval() {
        return this._pollingInterval;
    }
    set pollingInterval(value) {
        if (typeof (value) !== "number" || value <= 0 || parseInt(String(value)) != value) {
            throw new Error("invalid polling interval");
        }
        this._pollingInterval = value;
        if (this._poller) {
            clearInterval(this._poller);
            this._poller = setInterval(() => { this.poll(); }, this._pollingInterval);
        }
    }
    _getFastBlockNumber() {
        const now = getTime();
        // Stale block number, request a newer value
        if ((now - this._fastQueryDate) > 2 * this._pollingInterval) {
            this._fastQueryDate = now;
            this._fastBlockNumberPromise = this.getBlockNumber().then((blockNumber) => {
                if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
                    this._fastBlockNumber = blockNumber;
                }
                return this._fastBlockNumber;
            });
        }
        return this._fastBlockNumberPromise;
    }
    _setFastBlockNumber(blockNumber) {
        // Older block, maybe a stale request
        if (this._fastBlockNumber != null && blockNumber < this._fastBlockNumber) {
            return;
        }
        // Update the time we updated the blocknumber
        this._fastQueryDate = getTime();
        // Newer block number, use  it
        if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
            this._fastBlockNumber = blockNumber;
            this._fastBlockNumberPromise = Promise.resolve(blockNumber);
        }
    }
    waitForTransaction(transactionHash, confirmations, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._waitForTransaction(transactionHash, (confirmations == null) ? 1 : confirmations, timeout || 0, null);
        });
    }
    _waitForTransaction(transactionHash, confirmations, timeout, replaceable) {
        return __awaiter(this, void 0, void 0, function* () {
            const receipt = yield this.getTransactionReceipt(transactionHash);
            // Receipt is already good
            if ((receipt ? receipt.confirmations : 0) >= confirmations) {
                return receipt;
            }
            // Poll until the receipt is good...
            return new Promise((resolve, reject) => {
                const cancelFuncs = [];
                let done = false;
                const alreadyDone = function () {
                    if (done) {
                        return true;
                    }
                    done = true;
                    cancelFuncs.forEach((func) => { func(); });
                    return false;
                };
                const minedHandler = (receipt) => {
                    if (receipt.confirmations < confirmations) {
                        return;
                    }
                    if (alreadyDone()) {
                        return;
                    }
                    resolve(receipt);
                };
                this.on(transactionHash, minedHandler);
                cancelFuncs.push(() => { this.removeListener(transactionHash, minedHandler); });
                if (replaceable) {
                    let lastBlockNumber = replaceable.startBlock;
                    let scannedBlock = null;
                    const replaceHandler = (blockNumber) => __awaiter(this, void 0, void 0, function* () {
                        if (done) {
                            return;
                        }
                        // Wait 1 second; this is only used in the case of a fault, so
                        // we will trade off a little bit of latency for more consistent
                        // results and fewer JSON-RPC calls
                        yield stall(1000);
                        this.getTransactionCount(replaceable.from).then((nonce) => __awaiter(this, void 0, void 0, function* () {
                            if (done) {
                                return;
                            }
                            if (nonce <= replaceable.nonce) {
                                lastBlockNumber = blockNumber;
                            }
                            else {
                                // First check if the transaction was mined
                                {
                                    const mined = yield this.getTransaction(transactionHash);
                                    if (mined && mined.blockNumber != null) {
                                        return;
                                    }
                                }
                                // First time scanning. We start a little earlier for some
                                // wiggle room here to handle the eventually consistent nature
                                // of blockchain (e.g. the getTransactionCount was for a
                                // different block)
                                if (scannedBlock == null) {
                                    scannedBlock = lastBlockNumber - 3;
                                    if (scannedBlock < replaceable.startBlock) {
                                        scannedBlock = replaceable.startBlock;
                                    }
                                }
                                while (scannedBlock <= blockNumber) {
                                    if (done) {
                                        return;
                                    }
                                    const block = yield this.getBlockWithTransactions(scannedBlock);
                                    for (let ti = 0; ti < block.transactions.length; ti++) {
                                        const tx = block.transactions[ti];
                                        // Successfully mined!
                                        if (tx.hash === transactionHash) {
                                            return;
                                        }
                                        // Matches our transaction from and nonce; its a replacement
                                        if (tx.from === replaceable.from && tx.nonce === replaceable.nonce) {
                                            if (done) {
                                                return;
                                            }
                                            // Get the receipt of the replacement
                                            const receipt = yield this.waitForTransaction(tx.hash, confirmations);
                                            // Already resolved or rejected (prolly a timeout)
                                            if (alreadyDone()) {
                                                return;
                                            }
                                            // The reason we were replaced
                                            let reason = "replaced";
                                            if (tx.data === replaceable.data && tx.to === replaceable.to && tx.value.eq(replaceable.value)) {
                                                reason = "repriced";
                                            }
                                            else if (tx.data === "0x" && tx.from === tx.to && tx.value.isZero()) {
                                                reason = "cancelled";
                                            }
                                            // Explain why we were replaced
                                            reject(logger.makeError("transaction was replaced", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.TRANSACTION_REPLACED, {
                                                cancelled: (reason === "replaced" || reason === "cancelled"),
                                                reason,
                                                replacement: this._wrapTransaction(tx),
                                                hash: transactionHash,
                                                receipt
                                            }));
                                            return;
                                        }
                                    }
                                    scannedBlock++;
                                }
                            }
                            if (done) {
                                return;
                            }
                            this.once("block", replaceHandler);
                        }), (error) => {
                            if (done) {
                                return;
                            }
                            this.once("block", replaceHandler);
                        });
                    });
                    if (done) {
                        return;
                    }
                    this.once("block", replaceHandler);
                    cancelFuncs.push(() => {
                        this.removeListener("block", replaceHandler);
                    });
                }
                if (typeof (timeout) === "number" && timeout > 0) {
                    const timer = setTimeout(() => {
                        if (alreadyDone()) {
                            return;
                        }
                        reject(logger.makeError("timeout exceeded", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.TIMEOUT, { timeout: timeout }));
                    }, timeout);
                    if (timer.unref) {
                        timer.unref();
                    }
                    cancelFuncs.push(() => { clearTimeout(timer); });
                }
            });
        });
    }
    getBlockNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._getInternalBlockNumber(0);
        });
    }
    getGasPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const result = yield this.perform("getGasPrice", {});
            try {
                return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(result);
            }
            catch (error) {
                return logger.throwError("bad result from backend", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.SERVER_ERROR, {
                    method: "getGasPrice",
                    result, error
                });
            }
        });
    }
    getBalance(addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const params = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])({
                address: this._getAddress(addressOrName),
                blockTag: this._getBlockTag(blockTag)
            });
            const result = yield this.perform("getBalance", params);
            try {
                return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(result);
            }
            catch (error) {
                return logger.throwError("bad result from backend", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.SERVER_ERROR, {
                    method: "getBalance",
                    params, result, error
                });
            }
        });
    }
    getTransactionCount(addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const params = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])({
                address: this._getAddress(addressOrName),
                blockTag: this._getBlockTag(blockTag)
            });
            const result = yield this.perform("getTransactionCount", params);
            try {
                return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(result).toNumber();
            }
            catch (error) {
                return logger.throwError("bad result from backend", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.SERVER_ERROR, {
                    method: "getTransactionCount",
                    params, result, error
                });
            }
        });
    }
    getCode(addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const params = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])({
                address: this._getAddress(addressOrName),
                blockTag: this._getBlockTag(blockTag)
            });
            const result = yield this.perform("getCode", params);
            try {
                return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(result);
            }
            catch (error) {
                return logger.throwError("bad result from backend", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.SERVER_ERROR, {
                    method: "getCode",
                    params, result, error
                });
            }
        });
    }
    getStorageAt(addressOrName, position, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const params = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])({
                address: this._getAddress(addressOrName),
                blockTag: this._getBlockTag(blockTag),
                position: Promise.resolve(position).then((p) => Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexValue"])(p))
            });
            const result = yield this.perform("getStorageAt", params);
            try {
                return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(result);
            }
            catch (error) {
                return logger.throwError("bad result from backend", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.SERVER_ERROR, {
                    method: "getStorageAt",
                    params, result, error
                });
            }
        });
    }
    // This should be called by any subclass wrapping a TransactionResponse
    _wrapTransaction(tx, hash, startBlock) {
        if (hash != null && Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexDataLength"])(hash) !== 32) {
            throw new Error("invalid response - sendTransaction");
        }
        const result = tx;
        // Check the hash we expect is the same as the hash the server reported
        if (hash != null && tx.hash !== hash) {
            logger.throwError("Transaction hash mismatch from Provider.sendTransaction.", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNKNOWN_ERROR, { expectedHash: tx.hash, returnedHash: hash });
        }
        result.wait = (confirms, timeout) => __awaiter(this, void 0, void 0, function* () {
            if (confirms == null) {
                confirms = 1;
            }
            if (timeout == null) {
                timeout = 0;
            }
            // Get the details to detect replacement
            let replacement = undefined;
            if (confirms !== 0 && startBlock != null) {
                replacement = {
                    data: tx.data,
                    from: tx.from,
                    nonce: tx.nonce,
                    to: tx.to,
                    value: tx.value,
                    startBlock
                };
            }
            const receipt = yield this._waitForTransaction(tx.hash, confirms, timeout, replacement);
            if (receipt == null && confirms === 0) {
                return null;
            }
            // No longer pending, allow the polling loop to garbage collect this
            this._emitted["t:" + tx.hash] = receipt.blockNumber;
            if (receipt.status === 0) {
                logger.throwError("transaction failed", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.CALL_EXCEPTION, {
                    transactionHash: tx.hash,
                    transaction: tx,
                    receipt: receipt
                });
            }
            return receipt;
        });
        return result;
    }
    sendTransaction(signedTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const hexTx = yield Promise.resolve(signedTransaction).then(t => Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(t));
            const tx = this.formatter.transaction(signedTransaction);
            if (tx.confirmations == null) {
                tx.confirmations = 0;
            }
            const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
            try {
                const hash = yield this.perform("sendTransaction", { signedTransaction: hexTx });
                return this._wrapTransaction(tx, hash, blockNumber);
            }
            catch (error) {
                error.transaction = tx;
                error.transactionHash = tx.hash;
                throw error;
            }
        });
    }
    _getTransactionRequest(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = yield transaction;
            const tx = {};
            ["from", "to"].forEach((key) => {
                if (values[key] == null) {
                    return;
                }
                tx[key] = Promise.resolve(values[key]).then((v) => (v ? this._getAddress(v) : null));
            });
            ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach((key) => {
                if (values[key] == null) {
                    return;
                }
                tx[key] = Promise.resolve(values[key]).then((v) => (v ? _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(v) : null));
            });
            ["type"].forEach((key) => {
                if (values[key] == null) {
                    return;
                }
                tx[key] = Promise.resolve(values[key]).then((v) => ((v != null) ? v : null));
            });
            if (values.accessList) {
                tx.accessList = this.formatter.accessList(values.accessList);
            }
            ["data"].forEach((key) => {
                if (values[key] == null) {
                    return;
                }
                tx[key] = Promise.resolve(values[key]).then((v) => (v ? Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(v) : null));
            });
            return this.formatter.transactionRequest(yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])(tx));
        });
    }
    _getFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            filter = yield filter;
            const result = {};
            if (filter.address != null) {
                result.address = this._getAddress(filter.address);
            }
            ["blockHash", "topics"].forEach((key) => {
                if (filter[key] == null) {
                    return;
                }
                result[key] = filter[key];
            });
            ["fromBlock", "toBlock"].forEach((key) => {
                if (filter[key] == null) {
                    return;
                }
                result[key] = this._getBlockTag(filter[key]);
            });
            return this.formatter.filter(yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])(result));
        });
    }
    call(transaction, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const params = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])({
                transaction: this._getTransactionRequest(transaction),
                blockTag: this._getBlockTag(blockTag)
            });
            const result = yield this.perform("call", params);
            try {
                return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["hexlify"])(result);
            }
            catch (error) {
                return logger.throwError("bad result from backend", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.SERVER_ERROR, {
                    method: "call",
                    params, result, error
                });
            }
        });
    }
    estimateGas(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const params = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])({
                transaction: this._getTransactionRequest(transaction)
            });
            const result = yield this.perform("estimateGas", params);
            try {
                return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(result);
            }
            catch (error) {
                return logger.throwError("bad result from backend", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.SERVER_ERROR, {
                    method: "estimateGas",
                    params, result, error
                });
            }
        });
    }
    _getAddress(addressOrName) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.resolveName(addressOrName);
            if (address == null) {
                logger.throwError("ENS name not configured", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNSUPPORTED_OPERATION, {
                    operation: `resolveName(${JSON.stringify(addressOrName)})`
                });
            }
            return address;
        });
    }
    _getBlock(blockHashOrBlockTag, includeTransactions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            blockHashOrBlockTag = yield blockHashOrBlockTag;
            // If blockTag is a number (not "latest", etc), this is the block number
            let blockNumber = -128;
            const params = {
                includeTransactions: !!includeTransactions
            };
            if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["isHexString"])(blockHashOrBlockTag, 32)) {
                params.blockHash = blockHashOrBlockTag;
            }
            else {
                try {
                    params.blockTag = this.formatter.blockTag(yield this._getBlockTag(blockHashOrBlockTag));
                    if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["isHexString"])(params.blockTag)) {
                        blockNumber = parseInt(params.blockTag.substring(2), 16);
                    }
                }
                catch (error) {
                    logger.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", blockHashOrBlockTag);
                }
            }
            return Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_10__["poll"])(() => __awaiter(this, void 0, void 0, function* () {
                const block = yield this.perform("getBlock", params);
                // Block was not found
                if (block == null) {
                    // For blockhashes, if we didn't say it existed, that blockhash may
                    // not exist. If we did see it though, perhaps from a log, we know
                    // it exists, and this node is just not caught up yet.
                    if (params.blockHash != null) {
                        if (this._emitted["b:" + params.blockHash] == null) {
                            return null;
                        }
                    }
                    // For block tags, if we are asking for a future block, we return null
                    if (params.blockTag != null) {
                        if (blockNumber > this._emitted.block) {
                            return null;
                        }
                    }
                    // Retry on the next block
                    return undefined;
                }
                // Add transactions
                if (includeTransactions) {
                    let blockNumber = null;
                    for (let i = 0; i < block.transactions.length; i++) {
                        const tx = block.transactions[i];
                        if (tx.blockNumber == null) {
                            tx.confirmations = 0;
                        }
                        else if (tx.confirmations == null) {
                            if (blockNumber == null) {
                                blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                            }
                            // Add the confirmations using the fast block number (pessimistic)
                            let confirmations = (blockNumber - tx.blockNumber) + 1;
                            if (confirmations <= 0) {
                                confirmations = 1;
                            }
                            tx.confirmations = confirmations;
                        }
                    }
                    const blockWithTxs = this.formatter.blockWithTransactions(block);
                    blockWithTxs.transactions = blockWithTxs.transactions.map((tx) => this._wrapTransaction(tx));
                    return blockWithTxs;
                }
                return this.formatter.block(block);
            }), { oncePoll: this });
        });
    }
    getBlock(blockHashOrBlockTag) {
        return (this._getBlock(blockHashOrBlockTag, false));
    }
    getBlockWithTransactions(blockHashOrBlockTag) {
        return (this._getBlock(blockHashOrBlockTag, true));
    }
    getTransaction(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            transactionHash = yield transactionHash;
            const params = { transactionHash: this.formatter.hash(transactionHash, true) };
            return Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_10__["poll"])(() => __awaiter(this, void 0, void 0, function* () {
                const result = yield this.perform("getTransaction", params);
                if (result == null) {
                    if (this._emitted["t:" + transactionHash] == null) {
                        return null;
                    }
                    return undefined;
                }
                const tx = this.formatter.transactionResponse(result);
                if (tx.blockNumber == null) {
                    tx.confirmations = 0;
                }
                else if (tx.confirmations == null) {
                    const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                    // Add the confirmations using the fast block number (pessimistic)
                    let confirmations = (blockNumber - tx.blockNumber) + 1;
                    if (confirmations <= 0) {
                        confirmations = 1;
                    }
                    tx.confirmations = confirmations;
                }
                return this._wrapTransaction(tx);
            }), { oncePoll: this });
        });
    }
    getTransactionReceipt(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            transactionHash = yield transactionHash;
            const params = { transactionHash: this.formatter.hash(transactionHash, true) };
            return Object(_ethersproject_web__WEBPACK_IMPORTED_MODULE_10__["poll"])(() => __awaiter(this, void 0, void 0, function* () {
                const result = yield this.perform("getTransactionReceipt", params);
                if (result == null) {
                    if (this._emitted["t:" + transactionHash] == null) {
                        return null;
                    }
                    return undefined;
                }
                // "geth-etc" returns receipts before they are ready
                if (result.blockHash == null) {
                    return undefined;
                }
                const receipt = this.formatter.receipt(result);
                if (receipt.blockNumber == null) {
                    receipt.confirmations = 0;
                }
                else if (receipt.confirmations == null) {
                    const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                    // Add the confirmations using the fast block number (pessimistic)
                    let confirmations = (blockNumber - receipt.blockNumber) + 1;
                    if (confirmations <= 0) {
                        confirmations = 1;
                    }
                    receipt.confirmations = confirmations;
                }
                return receipt;
            }), { oncePoll: this });
        });
    }
    getLogs(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const params = yield Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_7__["resolveProperties"])({ filter: this._getFilter(filter) });
            const logs = yield this.perform("getLogs", params);
            logs.forEach((log) => {
                if (log.removed == null) {
                    log.removed = false;
                }
            });
            return _formatter__WEBPACK_IMPORTED_MODULE_14__["Formatter"].arrayOf(this.formatter.filterLog.bind(this.formatter))(logs);
        });
    }
    getEtherPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getNetwork();
            return this.perform("getEtherPrice", {});
        });
    }
    _getBlockTag(blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            blockTag = yield blockTag;
            if (typeof (blockTag) === "number" && blockTag < 0) {
                if (blockTag % 1) {
                    logger.throwArgumentError("invalid BlockTag", "blockTag", blockTag);
                }
                let blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                blockNumber += blockTag;
                if (blockNumber < 0) {
                    blockNumber = 0;
                }
                return this.formatter.blockTag(blockNumber);
            }
            return this.formatter.blockTag(blockTag);
        });
    }
    getResolver(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield this._getResolver(name);
                if (address == null) {
                    return null;
                }
                return new Resolver(this, address, name);
            }
            catch (error) {
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.CALL_EXCEPTION) {
                    return null;
                }
                return null;
            }
        });
    }
    _getResolver(name) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the resolver from the blockchain
            const network = yield this.getNetwork();
            // No ENS...
            if (!network.ensAddress) {
                logger.throwError("network does not support ENS", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.UNSUPPORTED_OPERATION, { operation: "ENS", network: network.name });
            }
            // keccak256("resolver(bytes32)")
            const transaction = {
                to: network.ensAddress,
                data: ("0x0178b8bf" + Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["namehash"])(name).substring(2))
            };
            try {
                return this.formatter.callAddress(yield this.call(transaction));
            }
            catch (error) {
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.CALL_EXCEPTION) {
                    return null;
                }
                throw error;
            }
        });
    }
    resolveName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            name = yield name;
            // If it is already an address, nothing to resolve
            try {
                return Promise.resolve(this.formatter.address(name));
            }
            catch (error) {
                // If is is a hexstring, the address is bad (See #694)
                if (Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["isHexString"])(name)) {
                    throw error;
                }
            }
            if (typeof (name) !== "string") {
                logger.throwArgumentError("invalid ENS name", "name", name);
            }
            // Get the addr from the resovler
            const resolver = yield this.getResolver(name);
            if (!resolver) {
                return null;
            }
            return yield resolver.getAddress();
        });
    }
    lookupAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            address = yield address;
            address = this.formatter.address(address);
            const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
            const resolverAddress = yield this._getResolver(reverseName);
            if (!resolverAddress) {
                return null;
            }
            // keccak("name(bytes32)")
            let bytes = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__["arrayify"])(yield this.call({
                to: resolverAddress,
                data: ("0x691f3431" + Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_5__["namehash"])(reverseName).substring(2))
            }));
            // Strip off the dynamic string pointer (0x20)
            if (bytes.length < 32 || !_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(bytes.slice(0, 32)).eq(32)) {
                return null;
            }
            bytes = bytes.slice(32);
            // Not a length-prefixed string
            if (bytes.length < 32) {
                return null;
            }
            // Get the length of the string (from the length-prefix)
            const length = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__["BigNumber"].from(bytes.slice(0, 32)).toNumber();
            bytes = bytes.slice(32);
            // Length longer than available data
            if (length > bytes.length) {
                return null;
            }
            const name = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_9__["toUtf8String"])(bytes.slice(0, length));
            // Make sure the reverse record matches the foward record
            const addr = yield this.resolveName(name);
            if (addr != address) {
                return null;
            }
            return name;
        });
    }
    perform(method, params) {
        return logger.throwError(method + " not implemented", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_12__["Logger"].errors.NOT_IMPLEMENTED, { operation: method });
    }
    _startEvent(event) {
        this.polling = (this._events.filter((e) => e.pollable()).length > 0);
    }
    _stopEvent(event) {
        this.polling = (this._events.filter((e) => e.pollable()).length > 0);
    }
    _addEventListener(eventName, listener, once) {
        const event = new Event(getEventTag(eventName), listener, once);
        this._events.push(event);
        this._startEvent(event);
        return this;
    }
    on(eventName, listener) {
        return this._addEventListener(eventName, listener, false);
    }
    once(eventName, listener) {
        return this._addEventListener(eventName, listener, true);
    }
    emit(eventName, ...args) {
        let result = false;
        let stopped = [];
        let eventTag = getEventTag(eventName);
        this._events = this._events.filter((event) => {
            if (event.tag !== eventTag) {
                return true;
            }
            setTimeout(() => {
                event.listener.apply(this, args);
            }, 0);
            result = true;
            if (event.once) {
                stopped.push(event);
                return false;
            }
            return true;
        });
        stopped.forEach((event) => { this._stopEvent(event); });
        return result;
    }
    listenerCount(eventName) {
        if (!eventName) {
            return this._events.length;
        }
        let eventTag = getEventTag(eventName);
        return this._events.filter((event) => {
            return (event.tag === eventTag);
        }).length;
    }
    listeners(eventName) {
        if (eventName == null) {
            return this._events.map((event) => event.listener);
        }
        let eventTag = getEventTag(eventName);
        return this._events
            .filter((event) => (event.tag === eventTag))
            .map((event) => event.listener);
    }
    off(eventName, listener) {
        if (listener == null) {
            return this.removeAllListeners(eventName);
        }
        const stopped = [];
        let found = false;
        let eventTag = getEventTag(eventName);
        this._events = this._events.filter((event) => {
            if (event.tag !== eventTag || event.listener != listener) {
                return true;
            }
            if (found) {
                return true;
            }
            found = true;
            stopped.push(event);
            return false;
        });
        stopped.forEach((event) => { this._stopEvent(event); });
        return this;
    }
    removeAllListeners(eventName) {
        let stopped = [];
        if (eventName == null) {
            stopped = this._events;
            this._events = [];
        }
        else {
            const eventTag = getEventTag(eventName);
            this._events = this._events.filter((event) => {
                if (event.tag !== eventTag) {
                    return true;
                }
                stopped.push(event);
                return false;
            });
        }
        stopped.forEach((event) => { this._stopEvent(event); });
        return this;
    }
}
//# sourceMappingURL=base-provider.js.map

/***/ }),

/***/ "vZu+":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/wordlist.js ***!
  \*******************************************************************/
/*! exports provided: logger, Wordlist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wordlist", function() { return Wordlist; });
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/hash */ "fQvb");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version */ "GAgr");

// This gets overridden by rollup
const exportWordlist = false;




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__["Logger"](_version__WEBPACK_IMPORTED_MODULE_3__["version"]);
class Wordlist {
    constructor(locale) {
        logger.checkAbstract(new.target, Wordlist);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(this, "locale", locale);
    }
    // Subclasses may override this
    split(mnemonic) {
        return mnemonic.toLowerCase().split(/ +/g);
    }
    // Subclasses may override this
    join(words) {
        return words.join(" ");
    }
    static check(wordlist) {
        const words = [];
        for (let i = 0; i < 2048; i++) {
            const word = wordlist.getWord(i);
            /* istanbul ignore if */
            if (i !== wordlist.getWordIndex(word)) {
                return "0x";
            }
            words.push(word);
        }
        return Object(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_0__["id"])(words.join("\n") + "\n");
    }
    static register(lang, name) {
        if (!name) {
            name = lang.locale;
        }
        /* istanbul ignore if */
        if (exportWordlist) {
            try {
                const anyGlobal = window;
                if (anyGlobal._ethers && anyGlobal._ethers.wordlists) {
                    if (!anyGlobal._ethers.wordlists[name]) {
                        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(anyGlobal._ethers.wordlists, name, lang);
                    }
                }
            }
            catch (error) { }
        }
    }
}
//# sourceMappingURL=wordlist.js.map

/***/ }),

/***/ "vae8":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/address.js ***!
  \*******************************************************************/
/*! exports provided: AddressCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressCoder", function() { return AddressCoder; });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/address */ "Oxwv");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");




class AddressCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_2__["Coder"] {
    constructor(localName) {
        super("address", "address", localName, false);
    }
    defaultValue() {
        return "0x0000000000000000000000000000000000000000";
    }
    encode(writer, value) {
        try {
            value = Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(value);
        }
        catch (error) {
            this._throwError(error.message, value);
        }
        return writer.writeValue(value);
    }
    decode(reader) {
        return Object(_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__["getAddress"])(Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__["hexZeroPad"])(reader.readValue().toHexString(), 20));
    }
}
//# sourceMappingURL=address.js.map

/***/ }),

/***/ "vyt/":
/*!**************************************!*\
  !*** ./node_modules/bech32/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'

// pre-compute lookup table
var ALPHABET_MAP = {}
for (var z = 0; z < ALPHABET.length; z++) {
  var x = ALPHABET.charAt(z)

  if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
  ALPHABET_MAP[x] = z
}

function polymodStep (pre) {
  var b = pre >> 25
  return ((pre & 0x1FFFFFF) << 5) ^
    (-((b >> 0) & 1) & 0x3b6a57b2) ^
    (-((b >> 1) & 1) & 0x26508e6d) ^
    (-((b >> 2) & 1) & 0x1ea119fa) ^
    (-((b >> 3) & 1) & 0x3d4233dd) ^
    (-((b >> 4) & 1) & 0x2a1462b3)
}

function prefixChk (prefix) {
  var chk = 1
  for (var i = 0; i < prefix.length; ++i) {
    var c = prefix.charCodeAt(i)
    if (c < 33 || c > 126) return 'Invalid prefix (' + prefix + ')'

    chk = polymodStep(chk) ^ (c >> 5)
  }
  chk = polymodStep(chk)

  for (i = 0; i < prefix.length; ++i) {
    var v = prefix.charCodeAt(i)
    chk = polymodStep(chk) ^ (v & 0x1f)
  }
  return chk
}

function encode (prefix, words, LIMIT) {
  LIMIT = LIMIT || 90
  if ((prefix.length + 7 + words.length) > LIMIT) throw new TypeError('Exceeds length limit')

  prefix = prefix.toLowerCase()

  // determine chk mod
  var chk = prefixChk(prefix)
  if (typeof chk === 'string') throw new Error(chk)

  var result = prefix + '1'
  for (var i = 0; i < words.length; ++i) {
    var x = words[i]
    if ((x >> 5) !== 0) throw new Error('Non 5-bit word')

    chk = polymodStep(chk) ^ x
    result += ALPHABET.charAt(x)
  }

  for (i = 0; i < 6; ++i) {
    chk = polymodStep(chk)
  }
  chk ^= 1

  for (i = 0; i < 6; ++i) {
    var v = (chk >> ((5 - i) * 5)) & 0x1f
    result += ALPHABET.charAt(v)
  }

  return result
}

function __decode (str, LIMIT) {
  LIMIT = LIMIT || 90
  if (str.length < 8) return str + ' too short'
  if (str.length > LIMIT) return 'Exceeds length limit'

  // don't allow mixed case
  var lowered = str.toLowerCase()
  var uppered = str.toUpperCase()
  if (str !== lowered && str !== uppered) return 'Mixed-case string ' + str
  str = lowered

  var split = str.lastIndexOf('1')
  if (split === -1) return 'No separator character for ' + str
  if (split === 0) return 'Missing prefix for ' + str

  var prefix = str.slice(0, split)
  var wordChars = str.slice(split + 1)
  if (wordChars.length < 6) return 'Data too short'

  var chk = prefixChk(prefix)
  if (typeof chk === 'string') return chk

  var words = []
  for (var i = 0; i < wordChars.length; ++i) {
    var c = wordChars.charAt(i)
    var v = ALPHABET_MAP[c]
    if (v === undefined) return 'Unknown character ' + c
    chk = polymodStep(chk) ^ v

    // not in the checksum?
    if (i + 6 >= wordChars.length) continue
    words.push(v)
  }

  if (chk !== 1) return 'Invalid checksum for ' + str
  return { prefix: prefix, words: words }
}

function decodeUnsafe () {
  var res = __decode.apply(null, arguments)
  if (typeof res === 'object') return res
}

function decode (str) {
  var res = __decode.apply(null, arguments)
  if (typeof res === 'object') return res

  throw new Error(res)
}

function convert (data, inBits, outBits, pad) {
  var value = 0
  var bits = 0
  var maxV = (1 << outBits) - 1

  var result = []
  for (var i = 0; i < data.length; ++i) {
    value = (value << inBits) | data[i]
    bits += inBits

    while (bits >= outBits) {
      bits -= outBits
      result.push((value >> bits) & maxV)
    }
  }

  if (pad) {
    if (bits > 0) {
      result.push((value << (outBits - bits)) & maxV)
    }
  } else {
    if (bits >= inBits) return 'Excess padding'
    if ((value << (outBits - bits)) & maxV) return 'Non-zero padding'
  }

  return result
}

function toWordsUnsafe (bytes) {
  var res = convert(bytes, 8, 5, true)
  if (Array.isArray(res)) return res
}

function toWords (bytes) {
  var res = convert(bytes, 8, 5, true)
  if (Array.isArray(res)) return res

  throw new Error(res)
}

function fromWordsUnsafe (words) {
  var res = convert(words, 5, 8, false)
  if (Array.isArray(res)) return res
}

function fromWords (words) {
  var res = convert(words, 5, 8, false)
  if (Array.isArray(res)) return res

  throw new Error(res)
}

module.exports = {
  decodeUnsafe: decodeUnsafe,
  decode: decode,
  encode: encode,
  toWordsUnsafe: toWordsUnsafe,
  toWords: toWords,
  fromWordsUnsafe: fromWordsUnsafe,
  fromWords: fromWords
}


/***/ }),

/***/ "vzeg":
/*!********************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/url-json-rpc-provider.js ***!
  \********************************************************************************/
/*! exports provided: StaticJsonRpcProvider, UrlJsonRpcProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticJsonRpcProvider", function() { return StaticJsonRpcProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlJsonRpcProvider", function() { return UrlJsonRpcProvider; });
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "SkWp");
/* harmony import */ var _json_rpc_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./json-rpc-provider */ "PoCP");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"](_version__WEBPACK_IMPORTED_MODULE_2__["version"]);

// A StaticJsonRpcProvider is useful when you *know* for certain that
// the backend will never change, as it never calls eth_chainId to
// verify its backend. However, if the backend does change, the effects
// are undefined and may include:
// - inconsistent results
// - locking up the UI
// - block skew warnings
// - wrong results
// If the network is not explicit (i.e. auto-detection is expected), the
// node MUST be running and available to respond to requests BEFORE this
// is instantiated.
class StaticJsonRpcProvider extends _json_rpc_provider__WEBPACK_IMPORTED_MODULE_3__["JsonRpcProvider"] {
    detectNetwork() {
        const _super = Object.create(null, {
            detectNetwork: { get: () => super.detectNetwork }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let network = this.network;
            if (network == null) {
                network = yield _super.detectNetwork.call(this);
                if (!network) {
                    logger.throwError("no network detected", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.UNKNOWN_ERROR, {});
                }
                // If still not set, set it
                if (this._network == null) {
                    // A static network does not support "any"
                    Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "_network", network);
                    this.emit("network", network, null);
                }
            }
            return network;
        });
    }
}
class UrlJsonRpcProvider extends StaticJsonRpcProvider {
    constructor(network, apiKey) {
        logger.checkAbstract(new.target, UrlJsonRpcProvider);
        // Normalize the Network and API Key
        network = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["getStatic"])((new.target), "getNetwork")(network);
        apiKey = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["getStatic"])((new.target), "getApiKey")(apiKey);
        const connection = Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["getStatic"])((new.target), "getUrl")(network, apiKey);
        super(connection, network);
        if (typeof (apiKey) === "string") {
            Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "apiKey", apiKey);
        }
        else if (apiKey != null) {
            Object.keys(apiKey).forEach((key) => {
                Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, key, apiKey[key]);
            });
        }
    }
    _startPending() {
        logger.warn("WARNING: API provider does not support pending filters");
    }
    isCommunityResource() {
        return false;
    }
    getSigner(address) {
        return logger.throwError("API provider does not support signing", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.UNSUPPORTED_OPERATION, { operation: "getSigner" });
    }
    listAccounts() {
        return Promise.resolve([]);
    }
    // Return a defaultApiKey if null, otherwise validate the API key
    static getApiKey(apiKey) {
        return apiKey;
    }
    // Returns the url or connection for the given network and API key. The
    // API key will have been sanitized by the getApiKey first, so any validation
    // or transformations can be done there.
    static getUrl(network, apiKey) {
        return logger.throwError("not implemented; sub-classes must override getUrl", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].errors.NOT_IMPLEMENTED, {
            operation: "getUrl"
        });
    }
}
//# sourceMappingURL=url-json-rpc-provider.js.map

/***/ }),

/***/ "wDBh":
/*!**********************************************!*\
  !*** ./node_modules/ethers/lib.esm/index.js ***!
  \**********************************************/
/*! exports provided: ethers, Signer, Wallet, VoidSigner, getDefaultProvider, providers, BaseContract, Contract, ContractFactory, BigNumber, FixedNumber, constants, errors, logger, utils, wordlists, version, Wordlist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ethers */ "Z3mj");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ethers", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Signer", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["Signer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["Wallet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VoidSigner", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["VoidSigner"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDefaultProvider", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["getDefaultProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "providers", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["providers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseContract", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["BaseContract"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Contract", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["Contract"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContractFactory", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["ContractFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BigNumber", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["BigNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FixedNumber", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["FixedNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "constants", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["constants"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "errors", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["errors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["logger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["utils"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wordlists", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["wordlists"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["version"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Wordlist", function() { return _ethers__WEBPACK_IMPORTED_MODULE_0__["Wordlist"]; });


// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

try {
    const anyGlobal = window;
    if (anyGlobal._ethers == null) {
        anyGlobal._ethers = _ethers__WEBPACK_IMPORTED_MODULE_0__;
    }
}
catch (error) { }


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "wJhM":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/null.js ***!
  \****************************************************************/
/*! exports provided: NullCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NullCoder", function() { return NullCoder; });
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");


class NullCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__["Coder"] {
    constructor(localName) {
        super("null", "", localName, false);
    }
    defaultValue() {
        return null;
    }
    encode(writer, value) {
        if (value != null) {
            this._throwError("not null", value);
        }
        return writer.writeBytes([]);
    }
    decode(reader) {
        reader.readBytes(0);
        return reader.coerce(this.name, null);
    }
}
//# sourceMappingURL=null.js.map

/***/ }),

/***/ "wWf6":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/fragments.js ***!
  \**************************************************************/
/*! exports provided: FormatTypes, ParamType, Fragment, EventFragment, ConstructorFragment, FunctionFragment, ErrorFragment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatTypes", function() { return FormatTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParamType", function() { return ParamType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventFragment", function() { return EventFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConstructorFragment", function() { return ConstructorFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionFragment", function() { return FunctionFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorFragment", function() { return ErrorFragment; });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version */ "EKg+");





const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__["Logger"](_version__WEBPACK_IMPORTED_MODULE_3__["version"]);
;
const _constructorGuard = {};
let ModifiersBytes = { calldata: true, memory: true, storage: true };
let ModifiersNest = { calldata: true, memory: true };
function checkModifier(type, name) {
    if (type === "bytes" || type === "string") {
        if (ModifiersBytes[name]) {
            return true;
        }
    }
    else if (type === "address") {
        if (name === "payable") {
            return true;
        }
    }
    else if (type.indexOf("[") >= 0 || type === "tuple") {
        if (ModifiersNest[name]) {
            return true;
        }
    }
    if (ModifiersBytes[name] || name === "payable") {
        logger.throwArgumentError("invalid modifier", "name", name);
    }
    return false;
}
// @TODO: Make sure that children of an indexed tuple are marked with a null indexed
function parseParamType(param, allowIndexed) {
    let originalParam = param;
    function throwError(i) {
        logger.throwArgumentError(`unexpected character at position ${i}`, "param", param);
    }
    param = param.replace(/\s/g, " ");
    function newNode(parent) {
        let node = { type: "", name: "", parent: parent, state: { allowType: true } };
        if (allowIndexed) {
            node.indexed = false;
        }
        return node;
    }
    let parent = { type: "", name: "", state: { allowType: true } };
    let node = parent;
    for (let i = 0; i < param.length; i++) {
        let c = param[i];
        switch (c) {
            case "(":
                if (node.state.allowType && node.type === "") {
                    node.type = "tuple";
                }
                else if (!node.state.allowParams) {
                    throwError(i);
                }
                node.state.allowType = false;
                node.type = verifyType(node.type);
                node.components = [newNode(node)];
                node = node.components[0];
                break;
            case ")":
                delete node.state;
                if (node.name === "indexed") {
                    if (!allowIndexed) {
                        throwError(i);
                    }
                    node.indexed = true;
                    node.name = "";
                }
                if (checkModifier(node.type, node.name)) {
                    node.name = "";
                }
                node.type = verifyType(node.type);
                let child = node;
                node = node.parent;
                if (!node) {
                    throwError(i);
                }
                delete child.parent;
                node.state.allowParams = false;
                node.state.allowName = true;
                node.state.allowArray = true;
                break;
            case ",":
                delete node.state;
                if (node.name === "indexed") {
                    if (!allowIndexed) {
                        throwError(i);
                    }
                    node.indexed = true;
                    node.name = "";
                }
                if (checkModifier(node.type, node.name)) {
                    node.name = "";
                }
                node.type = verifyType(node.type);
                let sibling = newNode(node.parent);
                //{ type: "", name: "", parent: node.parent, state: { allowType: true } };
                node.parent.components.push(sibling);
                delete node.parent;
                node = sibling;
                break;
            // Hit a space...
            case " ":
                // If reading type, the type is done and may read a param or name
                if (node.state.allowType) {
                    if (node.type !== "") {
                        node.type = verifyType(node.type);
                        delete node.state.allowType;
                        node.state.allowName = true;
                        node.state.allowParams = true;
                    }
                }
                // If reading name, the name is done
                if (node.state.allowName) {
                    if (node.name !== "") {
                        if (node.name === "indexed") {
                            if (!allowIndexed) {
                                throwError(i);
                            }
                            if (node.indexed) {
                                throwError(i);
                            }
                            node.indexed = true;
                            node.name = "";
                        }
                        else if (checkModifier(node.type, node.name)) {
                            node.name = "";
                        }
                        else {
                            node.state.allowName = false;
                        }
                    }
                }
                break;
            case "[":
                if (!node.state.allowArray) {
                    throwError(i);
                }
                node.type += c;
                node.state.allowArray = false;
                node.state.allowName = false;
                node.state.readArray = true;
                break;
            case "]":
                if (!node.state.readArray) {
                    throwError(i);
                }
                node.type += c;
                node.state.readArray = false;
                node.state.allowArray = true;
                node.state.allowName = true;
                break;
            default:
                if (node.state.allowType) {
                    node.type += c;
                    node.state.allowParams = true;
                    node.state.allowArray = true;
                }
                else if (node.state.allowName) {
                    node.name += c;
                    delete node.state.allowArray;
                }
                else if (node.state.readArray) {
                    node.type += c;
                }
                else {
                    throwError(i);
                }
        }
    }
    if (node.parent) {
        logger.throwArgumentError("unexpected eof", "param", param);
    }
    delete parent.state;
    if (node.name === "indexed") {
        if (!allowIndexed) {
            throwError(originalParam.length - 7);
        }
        if (node.indexed) {
            throwError(originalParam.length - 7);
        }
        node.indexed = true;
        node.name = "";
    }
    else if (checkModifier(node.type, node.name)) {
        node.name = "";
    }
    parent.type = verifyType(parent.type);
    return parent;
}
function populate(object, params) {
    for (let key in params) {
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_1__["defineReadOnly"])(object, key, params[key]);
    }
}
const FormatTypes = Object.freeze({
    // Bare formatting, as is needed for computing a sighash of an event or function
    sighash: "sighash",
    // Human-Readable with Minimal spacing and without names (compact human-readable)
    minimal: "minimal",
    // Human-Readble with nice spacing, including all names
    full: "full",
    // JSON-format a la Solidity
    json: "json"
});
const paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
class ParamType {
    constructor(constructorGuard, params) {
        if (constructorGuard !== _constructorGuard) {
            logger.throwError("use fromString", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "new ParamType()"
            });
        }
        populate(this, params);
        let match = this.type.match(paramTypeArray);
        if (match) {
            populate(this, {
                arrayLength: parseInt(match[2] || "-1"),
                arrayChildren: ParamType.fromObject({
                    type: match[1],
                    components: this.components
                }),
                baseType: "array"
            });
        }
        else {
            populate(this, {
                arrayLength: null,
                arrayChildren: null,
                baseType: ((this.components != null) ? "tuple" : this.type)
            });
        }
        this._isParamType = true;
        Object.freeze(this);
    }
    // Format the parameter fragment
    //   - sighash: "(uint256,address)"
    //   - minimal: "tuple(uint256,address) indexed"
    //   - full:    "tuple(uint256 foo, addres bar) indexed baz"
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            let result = {
                type: ((this.baseType === "tuple") ? "tuple" : this.type),
                name: (this.name || undefined)
            };
            if (typeof (this.indexed) === "boolean") {
                result.indexed = this.indexed;
            }
            if (this.components) {
                result.components = this.components.map((comp) => JSON.parse(comp.format(format)));
            }
            return JSON.stringify(result);
        }
        let result = "";
        // Array
        if (this.baseType === "array") {
            result += this.arrayChildren.format(format);
            result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
        }
        else {
            if (this.baseType === "tuple") {
                if (format !== FormatTypes.sighash) {
                    result += this.type;
                }
                result += "(" + this.components.map((comp) => comp.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ")";
            }
            else {
                result += this.type;
            }
        }
        if (format !== FormatTypes.sighash) {
            if (this.indexed === true) {
                result += " indexed";
            }
            if (format === FormatTypes.full && this.name) {
                result += " " + this.name;
            }
        }
        return result;
    }
    static from(value, allowIndexed) {
        if (typeof (value) === "string") {
            return ParamType.fromString(value, allowIndexed);
        }
        return ParamType.fromObject(value);
    }
    static fromObject(value) {
        if (ParamType.isParamType(value)) {
            return value;
        }
        return new ParamType(_constructorGuard, {
            name: (value.name || null),
            type: verifyType(value.type),
            indexed: ((value.indexed == null) ? null : !!value.indexed),
            components: (value.components ? value.components.map(ParamType.fromObject) : null)
        });
    }
    static fromString(value, allowIndexed) {
        function ParamTypify(node) {
            return ParamType.fromObject({
                name: node.name,
                type: node.type,
                indexed: node.indexed,
                components: node.components
            });
        }
        return ParamTypify(parseParamType(value, !!allowIndexed));
    }
    static isParamType(value) {
        return !!(value != null && value._isParamType);
    }
}
;
function parseParams(value, allowIndex) {
    return splitNesting(value).map((param) => ParamType.fromString(param, allowIndex));
}
class Fragment {
    constructor(constructorGuard, params) {
        if (constructorGuard !== _constructorGuard) {
            logger.throwError("use a static from method", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "new Fragment()"
            });
        }
        populate(this, params);
        this._isFragment = true;
        Object.freeze(this);
    }
    static from(value) {
        if (Fragment.isFragment(value)) {
            return value;
        }
        if (typeof (value) === "string") {
            return Fragment.fromString(value);
        }
        return Fragment.fromObject(value);
    }
    static fromObject(value) {
        if (Fragment.isFragment(value)) {
            return value;
        }
        switch (value.type) {
            case "function":
                return FunctionFragment.fromObject(value);
            case "event":
                return EventFragment.fromObject(value);
            case "constructor":
                return ConstructorFragment.fromObject(value);
            case "error":
                return ErrorFragment.fromObject(value);
            case "fallback":
            case "receive":
                // @TODO: Something? Maybe return a FunctionFragment? A custom DefaultFunctionFragment?
                return null;
        }
        return logger.throwArgumentError("invalid fragment object", "value", value);
    }
    static fromString(value) {
        // Make sure the "returns" is surrounded by a space and all whitespace is exactly one space
        value = value.replace(/\s/g, " ");
        value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
        value = value.trim();
        if (value.split(" ")[0] === "event") {
            return EventFragment.fromString(value.substring(5).trim());
        }
        else if (value.split(" ")[0] === "function") {
            return FunctionFragment.fromString(value.substring(8).trim());
        }
        else if (value.split("(")[0].trim() === "constructor") {
            return ConstructorFragment.fromString(value.trim());
        }
        else if (value.split(" ")[0] === "error") {
            return ErrorFragment.fromString(value.substring(5).trim());
        }
        return logger.throwArgumentError("unsupported fragment", "value", value);
    }
    static isFragment(value) {
        return !!(value && value._isFragment);
    }
}
class EventFragment extends Fragment {
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            return JSON.stringify({
                type: "event",
                anonymous: this.anonymous,
                name: this.name,
                inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
            });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
            result += "event ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ") ";
        if (format !== FormatTypes.sighash) {
            if (this.anonymous) {
                result += "anonymous ";
            }
        }
        return result.trim();
    }
    static from(value) {
        if (typeof (value) === "string") {
            return EventFragment.fromString(value);
        }
        return EventFragment.fromObject(value);
    }
    static fromObject(value) {
        if (EventFragment.isEventFragment(value)) {
            return value;
        }
        if (value.type !== "event") {
            logger.throwArgumentError("invalid event object", "value", value);
        }
        const params = {
            name: verifyIdentifier(value.name),
            anonymous: value.anonymous,
            inputs: (value.inputs ? value.inputs.map(ParamType.fromObject) : []),
            type: "event"
        };
        return new EventFragment(_constructorGuard, params);
    }
    static fromString(value) {
        let match = value.match(regexParen);
        if (!match) {
            logger.throwArgumentError("invalid event string", "value", value);
        }
        let anonymous = false;
        match[3].split(" ").forEach((modifier) => {
            switch (modifier.trim()) {
                case "anonymous":
                    anonymous = true;
                    break;
                case "":
                    break;
                default:
                    logger.warn("unknown modifier: " + modifier);
            }
        });
        return EventFragment.fromObject({
            name: match[1].trim(),
            anonymous: anonymous,
            inputs: parseParams(match[2], true),
            type: "event"
        });
    }
    static isEventFragment(value) {
        return (value && value._isFragment && value.type === "event");
    }
}
function parseGas(value, params) {
    params.gas = null;
    let comps = value.split("@");
    if (comps.length !== 1) {
        if (comps.length > 2) {
            logger.throwArgumentError("invalid human-readable ABI signature", "value", value);
        }
        if (!comps[1].match(/^[0-9]+$/)) {
            logger.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
        }
        params.gas = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(comps[1]);
        return comps[0];
    }
    return value;
}
function parseModifiers(value, params) {
    params.constant = false;
    params.payable = false;
    params.stateMutability = "nonpayable";
    value.split(" ").forEach((modifier) => {
        switch (modifier.trim()) {
            case "constant":
                params.constant = true;
                break;
            case "payable":
                params.payable = true;
                params.stateMutability = "payable";
                break;
            case "nonpayable":
                params.payable = false;
                params.stateMutability = "nonpayable";
                break;
            case "pure":
                params.constant = true;
                params.stateMutability = "pure";
                break;
            case "view":
                params.constant = true;
                params.stateMutability = "view";
                break;
            case "external":
            case "public":
            case "":
                break;
            default:
                console.log("unknown modifier: " + modifier);
        }
    });
}
function verifyState(value) {
    let result = {
        constant: false,
        payable: true,
        stateMutability: "payable"
    };
    if (value.stateMutability != null) {
        result.stateMutability = value.stateMutability;
        // Set (and check things are consistent) the constant property
        result.constant = (result.stateMutability === "view" || result.stateMutability === "pure");
        if (value.constant != null) {
            if ((!!value.constant) !== result.constant) {
                logger.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
            }
        }
        // Set (and check things are consistent) the payable property
        result.payable = (result.stateMutability === "payable");
        if (value.payable != null) {
            if ((!!value.payable) !== result.payable) {
                logger.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
            }
        }
    }
    else if (value.payable != null) {
        result.payable = !!value.payable;
        // If payable we can assume non-constant; otherwise we can't assume
        if (value.constant == null && !result.payable && value.type !== "constructor") {
            logger.throwArgumentError("unable to determine stateMutability", "value", value);
        }
        result.constant = !!value.constant;
        if (result.constant) {
            result.stateMutability = "view";
        }
        else {
            result.stateMutability = (result.payable ? "payable" : "nonpayable");
        }
        if (result.payable && result.constant) {
            logger.throwArgumentError("cannot have constant payable function", "value", value);
        }
    }
    else if (value.constant != null) {
        result.constant = !!value.constant;
        result.payable = !result.constant;
        result.stateMutability = (result.constant ? "view" : "payable");
    }
    else if (value.type !== "constructor") {
        logger.throwArgumentError("unable to determine stateMutability", "value", value);
    }
    return result;
}
class ConstructorFragment extends Fragment {
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            return JSON.stringify({
                type: "constructor",
                stateMutability: ((this.stateMutability !== "nonpayable") ? this.stateMutability : undefined),
                payable: this.payable,
                gas: (this.gas ? this.gas.toNumber() : undefined),
                inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
            });
        }
        if (format === FormatTypes.sighash) {
            logger.throwError("cannot format a constructor for sighash", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "format(sighash)"
            });
        }
        let result = "constructor(" + this.inputs.map((input) => input.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ") ";
        if (this.stateMutability && this.stateMutability !== "nonpayable") {
            result += this.stateMutability + " ";
        }
        return result.trim();
    }
    static from(value) {
        if (typeof (value) === "string") {
            return ConstructorFragment.fromString(value);
        }
        return ConstructorFragment.fromObject(value);
    }
    static fromObject(value) {
        if (ConstructorFragment.isConstructorFragment(value)) {
            return value;
        }
        if (value.type !== "constructor") {
            logger.throwArgumentError("invalid constructor object", "value", value);
        }
        let state = verifyState(value);
        if (state.constant) {
            logger.throwArgumentError("constructor cannot be constant", "value", value);
        }
        const params = {
            name: null,
            type: value.type,
            inputs: (value.inputs ? value.inputs.map(ParamType.fromObject) : []),
            payable: state.payable,
            stateMutability: state.stateMutability,
            gas: (value.gas ? _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(value.gas) : null)
        };
        return new ConstructorFragment(_constructorGuard, params);
    }
    static fromString(value) {
        let params = { type: "constructor" };
        value = parseGas(value, params);
        let parens = value.match(regexParen);
        if (!parens || parens[1].trim() !== "constructor") {
            logger.throwArgumentError("invalid constructor string", "value", value);
        }
        params.inputs = parseParams(parens[2].trim(), false);
        parseModifiers(parens[3].trim(), params);
        return ConstructorFragment.fromObject(params);
    }
    static isConstructorFragment(value) {
        return (value && value._isFragment && value.type === "constructor");
    }
}
class FunctionFragment extends ConstructorFragment {
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            return JSON.stringify({
                type: "function",
                name: this.name,
                constant: this.constant,
                stateMutability: ((this.stateMutability !== "nonpayable") ? this.stateMutability : undefined),
                payable: this.payable,
                gas: (this.gas ? this.gas.toNumber() : undefined),
                inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
                outputs: this.outputs.map((output) => JSON.parse(output.format(format))),
            });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
            result += "function ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ") ";
        if (format !== FormatTypes.sighash) {
            if (this.stateMutability) {
                if (this.stateMutability !== "nonpayable") {
                    result += (this.stateMutability + " ");
                }
            }
            else if (this.constant) {
                result += "view ";
            }
            if (this.outputs && this.outputs.length) {
                result += "returns (" + this.outputs.map((output) => output.format(format)).join(", ") + ") ";
            }
            if (this.gas != null) {
                result += "@" + this.gas.toString() + " ";
            }
        }
        return result.trim();
    }
    static from(value) {
        if (typeof (value) === "string") {
            return FunctionFragment.fromString(value);
        }
        return FunctionFragment.fromObject(value);
    }
    static fromObject(value) {
        if (FunctionFragment.isFunctionFragment(value)) {
            return value;
        }
        if (value.type !== "function") {
            logger.throwArgumentError("invalid function object", "value", value);
        }
        let state = verifyState(value);
        const params = {
            type: value.type,
            name: verifyIdentifier(value.name),
            constant: state.constant,
            inputs: (value.inputs ? value.inputs.map(ParamType.fromObject) : []),
            outputs: (value.outputs ? value.outputs.map(ParamType.fromObject) : []),
            payable: state.payable,
            stateMutability: state.stateMutability,
            gas: (value.gas ? _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(value.gas) : null)
        };
        return new FunctionFragment(_constructorGuard, params);
    }
    static fromString(value) {
        let params = { type: "function" };
        value = parseGas(value, params);
        let comps = value.split(" returns ");
        if (comps.length > 2) {
            logger.throwArgumentError("invalid function string", "value", value);
        }
        let parens = comps[0].match(regexParen);
        if (!parens) {
            logger.throwArgumentError("invalid function signature", "value", value);
        }
        params.name = parens[1].trim();
        if (params.name) {
            verifyIdentifier(params.name);
        }
        params.inputs = parseParams(parens[2], false);
        parseModifiers(parens[3].trim(), params);
        // We have outputs
        if (comps.length > 1) {
            let returns = comps[1].match(regexParen);
            if (returns[1].trim() != "" || returns[3].trim() != "") {
                logger.throwArgumentError("unexpected tokens", "value", value);
            }
            params.outputs = parseParams(returns[2], false);
        }
        else {
            params.outputs = [];
        }
        return FunctionFragment.fromObject(params);
    }
    static isFunctionFragment(value) {
        return (value && value._isFragment && value.type === "function");
    }
}
//export class StructFragment extends Fragment {
//}
function checkForbidden(fragment) {
    const sig = fragment.format();
    if (sig === "Error(string)" || sig === "Panic(uint256)") {
        logger.throwArgumentError(`cannot specify user defined ${sig} error`, "fragment", fragment);
    }
    return fragment;
}
class ErrorFragment extends Fragment {
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            return JSON.stringify({
                type: "error",
                name: this.name,
                inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
            });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
            result += "error ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ") ";
        return result.trim();
    }
    static from(value) {
        if (typeof (value) === "string") {
            return ErrorFragment.fromString(value);
        }
        return ErrorFragment.fromObject(value);
    }
    static fromObject(value) {
        if (ErrorFragment.isErrorFragment(value)) {
            return value;
        }
        if (value.type !== "error") {
            logger.throwArgumentError("invalid error object", "value", value);
        }
        const params = {
            type: value.type,
            name: verifyIdentifier(value.name),
            inputs: (value.inputs ? value.inputs.map(ParamType.fromObject) : [])
        };
        return checkForbidden(new ErrorFragment(_constructorGuard, params));
    }
    static fromString(value) {
        let params = { type: "error" };
        let parens = value.match(regexParen);
        if (!parens) {
            logger.throwArgumentError("invalid error signature", "value", value);
        }
        params.name = parens[1].trim();
        if (params.name) {
            verifyIdentifier(params.name);
        }
        params.inputs = parseParams(parens[2], false);
        return checkForbidden(ErrorFragment.fromObject(params));
    }
    static isErrorFragment(value) {
        return (value && value._isFragment && value.type === "error");
    }
}
function verifyType(type) {
    // These need to be transformed to their full description
    if (type.match(/^uint($|[^1-9])/)) {
        type = "uint256" + type.substring(4);
    }
    else if (type.match(/^int($|[^1-9])/)) {
        type = "int256" + type.substring(3);
    }
    // @TODO: more verification
    return type;
}
// See: https://github.com/ethereum/solidity/blob/1f8f1a3db93a548d0555e3e14cfc55a10e25b60e/docs/grammar/SolidityLexer.g4#L234
const regexIdentifier = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
function verifyIdentifier(value) {
    if (!value || !value.match(regexIdentifier)) {
        logger.throwArgumentError(`invalid identifier "${value}"`, "value", value);
    }
    return value;
}
const regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
function splitNesting(value) {
    value = value.trim();
    let result = [];
    let accum = "";
    let depth = 0;
    for (let offset = 0; offset < value.length; offset++) {
        let c = value[offset];
        if (c === "," && depth === 0) {
            result.push(accum);
            accum = "";
        }
        else {
            accum += c;
            if (c === "(") {
                depth++;
            }
            else if (c === ")") {
                depth--;
                if (depth === -1) {
                    logger.throwArgumentError("unbalanced parenthesis", "value", value);
                }
            }
        }
    }
    if (accum) {
        result.push(accum);
    }
    return result;
}
//# sourceMappingURL=fragments.js.map

/***/ }),

/***/ "wfln":
/*!**************************************************************************!*\
  !*** ./node_modules/@ethersproject/providers/lib.esm/infura-provider.js ***!
  \**************************************************************************/
/*! exports provided: InfuraWebSocketProvider, InfuraProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfuraWebSocketProvider", function() { return InfuraWebSocketProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfuraProvider", function() { return InfuraProvider; });
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/properties */ "m9oY");
/* harmony import */ var _websocket_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket-provider */ "e2Sn");
/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatter */ "fwYn");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/logger */ "/7J2");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version */ "SkWp");
/* harmony import */ var _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url-json-rpc-provider */ "vzeg");






const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"](_version__WEBPACK_IMPORTED_MODULE_4__["version"]);

const defaultProjectId = "84842078b09946638c03157f83405213";
class InfuraWebSocketProvider extends _websocket_provider__WEBPACK_IMPORTED_MODULE_1__["WebSocketProvider"] {
    constructor(network, apiKey) {
        const provider = new InfuraProvider(network, apiKey);
        const connection = provider.connection;
        if (connection.password) {
            logger.throwError("INFURA WebSocket project secrets unsupported", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].errors.UNSUPPORTED_OPERATION, {
                operation: "InfuraProvider.getWebSocketProvider()"
            });
        }
        const url = connection.url.replace(/^http/i, "ws").replace("/v3/", "/ws/v3/");
        super(url, network);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "apiKey", provider.projectId);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "projectId", provider.projectId);
        Object(_ethersproject_properties__WEBPACK_IMPORTED_MODULE_0__["defineReadOnly"])(this, "projectSecret", provider.projectSecret);
    }
    isCommunityResource() {
        return (this.projectId === defaultProjectId);
    }
}
class InfuraProvider extends _url_json_rpc_provider__WEBPACK_IMPORTED_MODULE_5__["UrlJsonRpcProvider"] {
    static getWebSocketProvider(network, apiKey) {
        return new InfuraWebSocketProvider(network, apiKey);
    }
    static getApiKey(apiKey) {
        const apiKeyObj = {
            apiKey: defaultProjectId,
            projectId: defaultProjectId,
            projectSecret: null
        };
        if (apiKey == null) {
            return apiKeyObj;
        }
        if (typeof (apiKey) === "string") {
            apiKeyObj.projectId = apiKey;
        }
        else if (apiKey.projectSecret != null) {
            logger.assertArgument((typeof (apiKey.projectId) === "string"), "projectSecret requires a projectId", "projectId", apiKey.projectId);
            logger.assertArgument((typeof (apiKey.projectSecret) === "string"), "invalid projectSecret", "projectSecret", "[REDACTED]");
            apiKeyObj.projectId = apiKey.projectId;
            apiKeyObj.projectSecret = apiKey.projectSecret;
        }
        else if (apiKey.projectId) {
            apiKeyObj.projectId = apiKey.projectId;
        }
        apiKeyObj.apiKey = apiKeyObj.projectId;
        return apiKeyObj;
    }
    static getUrl(network, apiKey) {
        let host = null;
        switch (network ? network.name : "unknown") {
            case "homestead":
                host = "mainnet.infura.io";
                break;
            case "ropsten":
                host = "ropsten.infura.io";
                break;
            case "rinkeby":
                host = "rinkeby.infura.io";
                break;
            case "kovan":
                host = "kovan.infura.io";
                break;
            case "goerli":
                host = "goerli.infura.io";
                break;
            case "matic":
                host = "polygon-mainnet.infura.io";
                break;
            case "maticmum":
                host = "polygon-mumbai.infura.io";
                break;
            default:
                logger.throwError("unsupported network", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }
        const connection = {
            allowGzip: true,
            url: ("https:/" + "/" + host + "/v3/" + apiKey.projectId),
            throttleCallback: (attempt, url) => {
                if (apiKey.projectId === defaultProjectId) {
                    Object(_formatter__WEBPACK_IMPORTED_MODULE_2__["showThrottleMessage"])();
                }
                return Promise.resolve(true);
            }
        };
        if (apiKey.projectSecret != null) {
            connection.user = "";
            connection.password = apiKey.projectSecret;
        }
        return connection;
    }
    isCommunityResource() {
        return (this.projectId === defaultProjectId);
    }
}
//# sourceMappingURL=infura-provider.js.map

/***/ }),

/***/ "wr5v":
/*!*************************************************************************!*\
  !*** ./node_modules/@ethersproject/abstract-signer/lib.esm/_version.js ***!
  \*************************************************************************/
/*! exports provided: version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
const version = "abstract-signer/5.4.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "yFKc":
/*!***********************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js ***!
  \***********************************************************************/
/*! exports provided: FixedBytesCoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixedBytesCoder", function() { return FixedBytesCoder; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-coder */ "UTQg");



// @TODO: Merge this with bytes
class FixedBytesCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_1__["Coder"] {
    constructor(size, localName) {
        let name = "bytes" + String(size);
        super(name, name, localName, false);
        this.size = size;
    }
    defaultValue() {
        return ("0x0000000000000000000000000000000000000000000000000000000000000000").substring(0, 2 + this.size * 2);
    }
    encode(writer, value) {
        let data = Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["arrayify"])(value);
        if (data.length !== this.size) {
            this._throwError("incorrect data length", value);
        }
        return writer.writeBytes(data);
    }
    decode(reader) {
        return reader.coerce(this.name, Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexlify"])(reader.readBytes(this.size)));
    }
}
//# sourceMappingURL=fixed-bytes.js.map

/***/ }),

/***/ "yusA":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-ja.js ***!
  \******************************************************************/
/*! exports provided: langJa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langJa", function() { return langJa; });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "VJ7P");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/strings */ "jhkW");
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wordlist */ "vZu+");




const data = [
    // 4-kana words
    "AQRASRAGBAGUAIRAHBAghAURAdBAdcAnoAMEAFBAFCBKFBQRBSFBCXBCDBCHBGFBEQBpBBpQBIkBHNBeOBgFBVCBhBBhNBmOBmRBiHBiFBUFBZDBvFBsXBkFBlcBjYBwDBMBBTBBTRBWBBWXXaQXaRXQWXSRXCFXYBXpHXOQXHRXhRXuRXmXXbRXlXXwDXTRXrCXWQXWGaBWaKcaYgasFadQalmaMBacAKaRKKBKKXKKjKQRKDRKCYKCRKIDKeVKHcKlXKjHKrYNAHNBWNaRNKcNIBNIONmXNsXNdXNnBNMBNRBNrXNWDNWMNFOQABQAHQBrQXBQXFQaRQKXQKDQKOQKFQNBQNDQQgQCXQCDQGBQGDQGdQYXQpBQpQQpHQLXQHuQgBQhBQhCQuFQmXQiDQUFQZDQsFQdRQkHQbRQlOQlmQPDQjDQwXQMBQMDQcFQTBQTHQrDDXQDNFDGBDGQDGRDpFDhFDmXDZXDbRDMYDRdDTRDrXSAhSBCSBrSGQSEQSHBSVRShYShkSyQSuFSiBSdcSoESocSlmSMBSFBSFKSFNSFdSFcCByCaRCKcCSBCSRCCrCGbCEHCYXCpBCpQCIBCIHCeNCgBCgFCVECVcCmkCmwCZXCZFCdRClOClmClFCjDCjdCnXCwBCwXCcRCFQCFjGXhGNhGDEGDMGCDGCHGIFGgBGVXGVEGVRGmXGsXGdYGoSGbRGnXGwXGwDGWRGFNGFLGFOGFdGFkEABEBDEBFEXOEaBEKSENBENDEYXEIgEIkEgBEgQEgHEhFEudEuFEiBEiHEiFEZDEvBEsXEsFEdXEdREkFEbBEbRElFEPCEfkEFNYAEYAhYBNYQdYDXYSRYCEYYoYgQYgRYuRYmCYZTYdBYbEYlXYjQYRbYWRpKXpQopQnpSFpCXpIBpISphNpdBpdRpbRpcZpFBpFNpFDpFopFrLADLBuLXQLXcLaFLCXLEhLpBLpFLHXLeVLhILdHLdRLoDLbRLrXIABIBQIBCIBsIBoIBMIBRIXaIaRIKYIKRINBINuICDIGBIIDIIkIgRIxFIyQIiHIdRIbYIbRIlHIwRIMYIcRIRVITRIFBIFNIFQOABOAFOBQOaFONBONMOQFOSFOCDOGBOEQOpBOLXOIBOIFOgQOgFOyQOycOmXOsXOdIOkHOMEOMkOWWHBNHXNHXWHNXHDuHDRHSuHSRHHoHhkHmRHdRHkQHlcHlRHwBHWcgAEgAggAkgBNgBQgBEgXOgYcgLXgHjgyQgiBgsFgdagMYgWSgFQgFEVBTVXEVKBVKNVKDVKYVKRVNBVNYVDBVDxVSBVSRVCjVGNVLXVIFVhBVhcVsXVdRVbRVlRhBYhKYhDYhGShxWhmNhdahdkhbRhjohMXhTRxAXxXSxKBxNBxEQxeNxeQxhXxsFxdbxlHxjcxFBxFNxFQxFOxFoyNYyYoybcyMYuBQuBRuBruDMuCouHBudQukkuoBulVuMXuFEmCYmCRmpRmeDmiMmjdmTFmFQiADiBOiaRiKRiNBiNRiSFiGkiGFiERipRiLFiIFihYibHijBijEiMXiWBiFBiFCUBQUXFUaRUNDUNcUNRUNFUDBUSHUCDUGBUGFUEqULNULoUIRUeEUeYUgBUhFUuRUiFUsXUdFUkHUbBUjSUjYUwXUMDUcHURdUTBUrBUrXUrQZAFZXZZaRZKFZNBZQFZCXZGBZYdZpBZLDZIFZHXZHNZeQZVRZVFZmXZiBZvFZdFZkFZbHZbFZwXZcCZcRZRBvBQvBGvBLvBWvCovMYsAFsBDsaRsKFsNFsDrsSHsSFsCXsCRsEBsEHsEfspBsLBsLDsIgsIRseGsbRsFBsFQsFSdNBdSRdCVdGHdYDdHcdVbdySduDdsXdlRdwXdWYdWcdWRkBMkXOkaRkNIkNFkSFkCFkYBkpRkeNkgBkhVkmXksFklVkMBkWDkFNoBNoaQoaFoNBoNXoNaoNEoSRoEroYXoYCoYbopRopFomXojkowXorFbBEbEIbdBbjYlaRlDElMXlFDjKjjSRjGBjYBjYkjpRjLXjIBjOFjeVjbRjwBnXQnSHnpFnLXnINnMBnTRwXBwXNwXYwNFwQFwSBwGFwLXwLDweNwgBwuHwjDwnXMBXMpFMIBMeNMTHcaQcNBcDHcSFcCXcpBcLXcLDcgFcuFcnXcwXccDcTQcrFTQErXNrCHrpFrgFrbFrTHrFcWNYWNbWEHWMXWTR",
    // 5-kana words
    "ABGHABIJAEAVAYJQALZJAIaRAHNXAHdcAHbRAZJMAZJRAZTRAdVJAklmAbcNAjdRAMnRAMWYAWpRAWgRAFgBAFhBAFdcBNJBBNJDBQKBBQhcBQlmBDEJBYJkBYJTBpNBBpJFBIJBBIJDBIcABOKXBOEJBOVJBOiJBOZJBepBBeLXBeIFBegBBgGJBVJXBuocBiJRBUJQBlXVBlITBwNFBMYVBcqXBTlmBWNFBWiJBWnRBFGHBFwXXKGJXNJBXNZJXDTTXSHSXSVRXSlHXCJDXGQJXEhXXYQJXYbRXOfXXeNcXVJFXhQJXhEJXdTRXjdXXMhBXcQTXRGBXTEBXTnQXFCXXFOFXFgFaBaFaBNJaBCJaBpBaBwXaNJKaNJDaQIBaDpRaEPDaHMFamDJalEJaMZJaFaFaFNBaFQJaFLDaFVHKBCYKBEBKBHDKXaFKXGdKXEJKXpHKXIBKXZDKXwXKKwLKNacKNYJKNJoKNWcKDGdKDTRKChXKGaRKGhBKGbRKEBTKEaRKEPTKLMDKLWRKOHDKVJcKdBcKlIBKlOPKFSBKFEPKFpFNBNJNJBQNBGHNBEPNBHXNBgFNBVXNBZDNBsXNBwXNNaRNNJDNNJENNJkNDCJNDVDNGJRNJiDNZJNNsCJNJFNNFSBNFCXNFEPNFLXNFIFQJBFQCaRQJEQQLJDQLJFQIaRQOqXQHaFQHHQQVJXQVJDQhNJQmEIQZJFQsJXQJrFQWbRDJABDBYJDXNFDXCXDXLXDXZDDXsJDQqXDSJFDJCXDEPkDEqXDYmQDpSJDOCkDOGQDHEIDVJDDuDuDWEBDJFgSBNDSBSFSBGHSBIBSBTQSKVYSJQNSJQiSJCXSEqXSJYVSIiJSOMYSHAHSHaQSeCFSepQSegBSHdHSHrFShSJSJuHSJUFSkNRSrSrSWEBSFaHSJFQSFCXSFGDSFYXSFODSFgBSFVXSFhBSFxFSFkFSFbBSFMFCADdCJXBCXaFCXKFCXNFCXCXCXGBCXEJCXYBCXLDCXIBCXOPCXHXCXgBCXhBCXiBCXlDCXcHCJNBCJNFCDCJCDGBCDVXCDhBCDiDCDJdCCmNCpJFCIaRCOqXCHCHCHZJCViJCuCuCmddCJiFCdNBCdHhClEJCnUJCreSCWlgCWTRCFBFCFNBCFYBCFVFCFhFCFdSCFTBCFWDGBNBGBQFGJBCGBEqGBpBGBgQGNBEGNJYGNkOGNJRGDUFGJpQGHaBGJeNGJeEGVBlGVKjGiJDGvJHGsVJGkEBGMIJGWjNGFBFGFCXGFGBGFYXGFpBGFMFEASJEAWpEJNFECJVEIXSEIQJEOqXEOcFEeNcEHEJEHlFEJgFEhlmEmDJEmZJEiMBEUqXEoSREPBFEPXFEPKFEPSFEPEFEPpFEPLXEPIBEJPdEPcFEPTBEJnXEqlHEMpREFCXEFODEFcFYASJYJAFYBaBYBVXYXpFYDhBYCJBYJGFYYbRYeNcYJeVYiIJYZJcYvJgYvJRYJsXYsJFYMYMYreVpBNHpBEJpBwXpQxFpYEJpeNDpJeDpeSFpeCHpHUJpHbBpHcHpmUJpiiJpUJrpsJuplITpFaBpFQqpFGBpFEfpFYBpFpBpFLJpFIDpFgBpFVXpFyQpFuFpFlFpFjDpFnXpFwXpJFMpFTBLXCJLXEFLXhFLXUJLXbFLalmLNJBLSJQLCLCLGJBLLDJLHaFLeNFLeSHLeCXLepFLhaRLZsJLsJDLsJrLocaLlLlLMdbLFNBLFSBLFEHLFkFIBBFIBXFIBaQIBKXIBSFIBpHIBLXIBgBIBhBIBuHIBmXIBiFIBZXIBvFIBbFIBjQIBwXIBWFIKTRIQUJIDGFICjQIYSRIINXIJeCIVaRImEkIZJFIvJRIsJXIdCJIJoRIbBQIjYBIcqXITFVIreVIFKFIFSFIFCJIFGFIFLDIFIBIJFOIFgBIFVXIJFhIFxFIFmXIFdHIFbBIJFrIJFWOBGBOQfXOOKjOUqXOfXBOqXEOcqXORVJOFIBOFlDHBIOHXiFHNTRHCJXHIaRHHJDHHEJHVbRHZJYHbIBHRsJHRkDHWlmgBKFgBSBgBCDgBGHgBpBgBIBgBVJgBuBgBvFgKDTgQVXgDUJgGSJgOqXgmUMgZIJgTUJgWIEgFBFgFNBgFDJgFSFgFGBgFYXgJFOgFgQgFVXgFhBgFbHgJFWVJABVQKcVDgFVOfXVeDFVhaRVmGdViJYVMaRVFNHhBNDhBCXhBEqhBpFhBLXhNJBhSJRheVXhhKEhxlmhZIJhdBQhkIJhbMNhMUJhMZJxNJgxQUJxDEkxDdFxSJRxplmxeSBxeCXxeGFxeYXxepQxegBxWVcxFEQxFLXxFIBxFgBxFxDxFZtxFdcxFbBxFwXyDJXyDlcuASJuDJpuDIBuCpJuGSJuIJFueEFuZIJusJXudWEuoIBuWGJuFBcuFKEuFNFuFQFuFDJuFGJuFVJuFUtuFdHuFTBmBYJmNJYmQhkmLJDmLJomIdXmiJYmvJRmsJRmklmmMBymMuCmclmmcnQiJABiJBNiJBDiBSFiBCJiBEFiBYBiBpFiBLXiBTHiJNciDEfiCZJiECJiJEqiOkHiHKFieNDiHJQieQcieDHieSFieCXieGFieEFieIHiegFihUJixNoioNXiFaBiFKFiFNDiFEPiFYXitFOitFHiFgBiFVEiFmXiFitiFbBiFMFiFrFUCXQUIoQUIJcUHQJUeCEUHwXUUJDUUqXUdWcUcqXUrnQUFNDUFSHUFCFUFEfUFLXUtFOZBXOZXSBZXpFZXVXZEQJZEJkZpDJZOqXZeNHZeCDZUqXZFBQZFEHZFLXvBAFvBKFvBCXvBEPvBpHvBIDvBgFvBuHvQNJvFNFvFGBvFIBvJFcsXCDsXLXsXsXsXlFsXcHsQqXsJQFsEqXseIFsFEHsFjDdBxOdNpRdNJRdEJbdpJRdhZJdnSJdrjNdFNJdFQHdFhNkNJDkYaRkHNRkHSRkVbRkuMRkjSJkcqDoSJFoEiJoYZJoOfXohEBoMGQocqXbBAFbBXFbBaFbBNDbBGBbBLXbBTBbBWDbGJYbIJHbFQqbFpQlDgQlOrFlVJRjGEBjZJRnXvJnXbBnEfHnOPDngJRnxfXnUJWwXEJwNpJwDpBwEfXwrEBMDCJMDGHMDIJMLJDcQGDcQpHcqXccqNFcqCXcFCJRBSBRBGBRBEJRBpQTBNFTBQJTBpBTBVXTFABTFSBTFCFTFGBTFMDrXCJrXLDrDNJrEfHrFQJrFitWNjdWNTR",
    // 6-kana words
    "AKLJMANOPFASNJIAEJWXAYJNRAIIbRAIcdaAeEfDAgidRAdjNYAMYEJAMIbRAFNJBAFpJFBBIJYBDZJFBSiJhBGdEBBEJfXBEJqXBEJWRBpaUJBLXrXBIYJMBOcfXBeEfFBestXBjNJRBcDJOBFEqXXNvJRXDMBhXCJNYXOAWpXONJWXHDEBXeIaRXhYJDXZJSJXMDJOXcASJXFVJXaBQqXaBZJFasXdQaFSJQaFEfXaFpJHaFOqXKBNSRKXvJBKQJhXKEJQJKEJGFKINJBKIJjNKgJNSKVElmKVhEBKiJGFKlBgJKjnUJKwsJYKMFIJKFNJDKFIJFKFOfXNJBSFNJBCXNBpJFNJBvQNJBMBNJLJXNJOqXNJeCXNJeGFNdsJCNbTKFNwXUJQNFEPQDiJcQDMSJQSFpBQGMQJQJeOcQyCJEQUJEBQJFBrQFEJqDXDJFDJXpBDJXIMDGiJhDIJGRDJeYcDHrDJDVXgFDkAWpDkIgRDjDEqDMvJRDJFNFDJFIBSKclmSJQOFSJQVHSJQjDSJGJBSJGJFSECJoSHEJqSJHTBSJVJDSViJYSZJNBSJsJDSFSJFSFEfXSJFLXCBUJVCJXSBCJXpBCXVJXCJXsXCJXdFCJNJHCLIJgCHiJFCVNJMChCJhCUHEJCsJTRCJdYcCoQJCCFEfXCFIJgCFUJxCFstFGJBaQGJBIDGQJqXGYJNRGJHKFGeQqDGHEJFGJeLXGHIiJGHdBlGUJEBGkIJTGFQPDGJFEqEAGegEJIJBEJVJXEhQJTEiJNcEJZJFEJoEqEjDEqEPDsXEPGJBEPOqXEPeQFEfDiDEJfEFEfepQEfMiJEqXNBEqDIDEqeSFEqVJXEMvJRYXNJDYXEJHYKVJcYYJEBYJeEcYJUqXYFpJFYFstXpAZJMpBSJFpNBNFpeQPDpHLJDpHIJFpHgJFpeitFpHZJFpJFADpFSJFpJFCJpFOqXpFitBpJFZJLXIJFLIJgRLVNJWLVHJMLwNpJLFGJBLFLJDLFOqXLJFUJIBDJXIBGJBIJBYQIJBIBIBOqXIBcqDIEGJFILNJTIIJEBIOiJhIJeNBIJeIBIhiJIIWoTRIJFAHIJFpBIJFuHIFUtFIJFTHOSBYJOEcqXOHEJqOvBpFOkVJrObBVJOncqDOcNJkHhNJRHuHJuHdMhBgBUqXgBsJXgONJBgHNJDgHHJQgJeitgHsJXgJyNagyDJBgZJDrgsVJQgkEJNgkjSJgJFAHgFCJDgFZtMVJXNFVXQfXVJXDJVXoQJVQVJQVDEfXVDvJHVEqNFVeQfXVHpJFVHxfXVVJSRVVmaRVlIJOhCXVJhHjYkhxCJVhWVUJhWiJcxBNJIxeEqDxfXBFxcFEPxFSJFxFYJXyBDQJydaUJyFOPDuYCJYuLvJRuHLJXuZJLDuFOPDuFZJHuFcqXmKHJdmCQJcmOsVJiJAGFitLCFieOfXiestXiZJMEikNJQirXzFiFQqXiFIJFiFZJFiFvtFUHpJFUteIcUteOcUVCJkUhdHcUbEJEUJqXQUMNJhURjYkUFitFZDGJHZJIxDZJVJXZJFDJZJFpQvBNJBvBSJFvJxBrseQqDsVFVJdFLJDkEJNBkmNJYkFLJDoQJOPoGsJRoEAHBoEJfFbBQqDbBZJHbFVJXlFIJBjYIrXjeitcjjCEBjWMNBwXQfXwXOaFwDsJXwCJTRwrCZJMDNJQcDDJFcqDOPRYiJFTBsJXTQIJBTFEfXTFLJDrXEJFrEJXMrFZJFWEJdEWYTlm",
    // 7-kana words
    "ABCDEFACNJTRAMBDJdAcNJVXBLNJEBXSIdWRXErNJkXYDJMBXZJCJaXMNJaYKKVJKcKDEJqXKDcNJhKVJrNYKbgJVXKFVJSBNBYBwDNJeQfXNJeEqXNhGJWENJFiJRQlIJbEQJfXxDQqXcfXQFNDEJQFwXUJDYcnUJDJIBgQDIUJTRDJFEqDSJQSJFSJQIJFSOPeZtSJFZJHCJXQfXCTDEqFGJBSJFGJBOfXGJBcqXGJHNJDGJRLiJEJfXEqEJFEJPEFpBEJYJBZJFYBwXUJYiJMEBYJZJyTYTONJXpQMFXFpeGIDdpJFstXpJFcPDLBVSJRLHQJqXLJFZJFIJBNJDIJBUqXIBkFDJIJEJPTIYJGWRIJeQPDIJeEfHIJFsJXOqGDSFHXEJqXgJCsJCgGQJqXgdQYJEgFMFNBgJFcqDVJwXUJVJFZJchIgJCCxOEJqXxOwXUJyDJBVRuscisciJBiJBieUtqXiJFDJkiFsJXQUGEZJcUJFsJXZtXIrXZDZJDrZJFNJDZJFstXvJFQqXvJFCJEsJXQJqkhkNGBbDJdTRbYJMEBlDwXUJMEFiJFcfXNJDRcNJWMTBLJXC",
    // 8-kana words
    "BraFUtHBFSJFdbNBLJXVJQoYJNEBSJBEJfHSJHwXUJCJdAZJMGjaFVJXEJPNJBlEJfFiJFpFbFEJqIJBVJCrIBdHiJhOPFChvJVJZJNJWxGFNIFLueIBQJqUHEJfUFstOZJDrlXEASJRlXVJXSFwVJNJWD",
    // 9-kana words
    "QJEJNNJDQJEJIBSFQJEJxegBQJEJfHEPSJBmXEJFSJCDEJqXLXNJFQqXIcQsFNJFIFEJqXUJgFsJXIJBUJEJfHNFvJxEqXNJnXUJFQqD",
    // 10-kana words
    "IJBEJqXZJ"
];
// Maps each character into its kana value (the index)
const mapping = "~~AzB~X~a~KN~Q~D~S~C~G~E~Y~p~L~I~O~eH~g~V~hxyumi~~U~~Z~~v~~s~~dkoblPjfnqwMcRTr~W~~~F~~~~~Jt";
let wordlist = null;
function hex(word) {
    return Object(_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__["hexlify"])(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8Bytes"])(word));
}
const KiYoKu = "0xe3818de38284e3818f";
const KyoKu = "0xe3818de38283e3818f";
function loadWords(lang) {
    if (wordlist !== null) {
        return;
    }
    wordlist = [];
    // Transforms for normalizing (sort is a not quite UTF-8)
    const transform = {};
    // Delete the diacritic marks
    transform[Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 130, 154])] = false;
    transform[Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 130, 153])] = false;
    // Some simple transforms that sort out most of the order
    transform[Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 130, 133])] = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 130, 134]);
    transform[Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 129, 163])] = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 129, 164]);
    transform[Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 130, 131])] = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 130, 132]);
    transform[Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 130, 135])] = Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])([227, 130, 136]);
    // Normalize words using the transform
    function normalize(word) {
        let result = "";
        for (let i = 0; i < word.length; i++) {
            let kana = word[i];
            const target = transform[kana];
            if (target === false) {
                continue;
            }
            if (target) {
                kana = target;
            }
            result += kana;
        }
        return result;
    }
    // Sort how the Japanese list is sorted
    function sortJapanese(a, b) {
        a = normalize(a);
        b = normalize(b);
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }
    // Load all the words
    for (let length = 3; length <= 9; length++) {
        const d = data[length - 3];
        for (let offset = 0; offset < d.length; offset += length) {
            const word = [];
            for (let i = 0; i < length; i++) {
                const k = mapping.indexOf(d[offset + i]);
                word.push(227);
                word.push((k & 0x40) ? 130 : 129);
                word.push((k & 0x3f) + 128);
            }
            wordlist.push(Object(_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__["toUtf8String"])(word));
        }
    }
    wordlist.sort(sortJapanese);
    // For some reason kyoku and kiyoku are flipped in node (!!).
    // The order SHOULD be:
    //   - kyoku
    //   - kiyoku
    // This should ignore "if", but that doesn't work here??
    /* istanbul ignore next */
    if (hex(wordlist[442]) === KiYoKu && hex(wordlist[443]) === KyoKu) {
        const tmp = wordlist[442];
        wordlist[442] = wordlist[443];
        wordlist[443] = tmp;
    }
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_2__["Wordlist"].check(lang) !== "0xcb36b09e6baa935787fd762ce65e80b0c6a8dabdfbc3a7f86ac0e2c4fd111600") {
        wordlist = null;
        throw new Error("BIP39 Wordlist for ja (Japanese) FAILED");
    }
}
class LangJa extends _wordlist__WEBPACK_IMPORTED_MODULE_2__["Wordlist"] {
    constructor() {
        super("ja");
    }
    getWord(index) {
        loadWords(this);
        return wordlist[index];
    }
    getWordIndex(word) {
        loadWords(this);
        return wordlist.indexOf(word);
    }
    split(mnemonic) {
        _wordlist__WEBPACK_IMPORTED_MODULE_2__["logger"].checkNormalize();
        return mnemonic.split(/(?:\u3000| )+/g);
    }
    join(words) {
        return words.join("\u3000");
    }
}
const langJa = new LangJa();
_wordlist__WEBPACK_IMPORTED_MODULE_2__["Wordlist"].register(langJa);

//# sourceMappingURL=lang-ja.js.map

/***/ }),

/***/ "zkI0":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/index.js ***!
  \*******************************************************************/
/*! exports provided: decryptCrowdsale, decryptKeystore, decryptKeystoreSync, encryptKeystore, isCrowdsaleWallet, isKeystoreWallet, getJsonWalletAddress, decryptJsonWallet, decryptJsonWalletSync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decryptJsonWallet", function() { return decryptJsonWallet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decryptJsonWalletSync", function() { return decryptJsonWalletSync; });
/* harmony import */ var _crowdsale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crowdsale */ "7FBX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decryptCrowdsale", function() { return _crowdsale__WEBPACK_IMPORTED_MODULE_0__["decrypt"]; });

/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inspect */ "a1v+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isCrowdsaleWallet", function() { return _inspect__WEBPACK_IMPORTED_MODULE_1__["isCrowdsaleWallet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isKeystoreWallet", function() { return _inspect__WEBPACK_IMPORTED_MODULE_1__["isKeystoreWallet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getJsonWalletAddress", function() { return _inspect__WEBPACK_IMPORTED_MODULE_1__["getJsonWalletAddress"]; });

/* harmony import */ var _keystore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keystore */ "nPSg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decryptKeystore", function() { return _keystore__WEBPACK_IMPORTED_MODULE_2__["decrypt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decryptKeystoreSync", function() { return _keystore__WEBPACK_IMPORTED_MODULE_2__["decryptSync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encryptKeystore", function() { return _keystore__WEBPACK_IMPORTED_MODULE_2__["encrypt"]; });





function decryptJsonWallet(json, password, progressCallback) {
    if (Object(_inspect__WEBPACK_IMPORTED_MODULE_1__["isCrowdsaleWallet"])(json)) {
        if (progressCallback) {
            progressCallback(0);
        }
        const account = Object(_crowdsale__WEBPACK_IMPORTED_MODULE_0__["decrypt"])(json, password);
        if (progressCallback) {
            progressCallback(1);
        }
        return Promise.resolve(account);
    }
    if (Object(_inspect__WEBPACK_IMPORTED_MODULE_1__["isKeystoreWallet"])(json)) {
        return Object(_keystore__WEBPACK_IMPORTED_MODULE_2__["decrypt"])(json, password, progressCallback);
    }
    return Promise.reject(new Error("invalid JSON wallet"));
}
function decryptJsonWalletSync(json, password) {
    if (Object(_inspect__WEBPACK_IMPORTED_MODULE_1__["isCrowdsaleWallet"])(json)) {
        return Object(_crowdsale__WEBPACK_IMPORTED_MODULE_0__["decrypt"])(json, password);
    }
    if (Object(_inspect__WEBPACK_IMPORTED_MODULE_1__["isKeystoreWallet"])(json)) {
        return Object(_keystore__WEBPACK_IMPORTED_MODULE_2__["decryptSync"])(json, password);
    }
    throw new Error("invalid JSON wallet");
}

//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=default~ensdomains-ensjs~eth-lattice-keyring~ledgerhq-hw-app-eth.js.map