(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"6vPO":function(r,e,t){const n=t("kX2E"),i=t("9gnv");var f=function(){};function o(r){return r.startsWith("int[")?"int256"+r.slice(3):"int"===r?"int256":r.startsWith("uint[")?"uint256"+r.slice(4):"uint"===r?"uint256":r.startsWith("fixed[")?"fixed128x128"+r.slice(5):"fixed"===r?"fixed128x128":r.startsWith("ufixed[")?"ufixed128x128"+r.slice(6):"ufixed"===r?"ufixed128x128":r}function u(r){return parseInt(/^\D+(\d+)$/.exec(r)[1],10)}function a(r){var e=/^\D+(\d+)x(\d+)$/.exec(r);return[parseInt(e[1],10),parseInt(e[2],10)]}function s(r){var e=r.match(/(.*)\[(.*?)\]$/);return e?""===e[2]?"dynamic":parseInt(e[2],10):null}function c(r){var e=typeof r;if("string"===e)return n.isHexPrefixed(r)?new i(n.stripHexPrefix(r),16):new i(r,10);if("number"===e)return new i(r);if(r.toArray)return r;throw new Error("Argument is not a number")}function l(r){var e=/^(\w+)\((.*)\)$/.exec(r);if(3!==e.length)throw new Error("Invalid method signature");var t=/^(.+)\):\((.+)$/.exec(e[2]);if(null!==t&&3===t.length)return{method:e[1],args:t[1].split(","),retargs:t[2].split(",")};var n=e[2].split(",");return 1===n.length&&""===n[0]&&(n=[]),{method:e[1],args:n}}function h(r,e){var t,f,o,l;if("address"===r)return h("uint160",c(e));if("bool"===r)return h("uint8",e?1:0);if("string"===r)return h("bytes",Buffer.from(e,"utf8"));if(g(r)){if(void 0===e.length)throw new Error("Not an array?");if("dynamic"!==(t=s(r))&&0!==t&&e.length>t)throw new Error("Elements exceed array size: "+t);for(l in o=[],r=r.slice(0,r.lastIndexOf("[")),"string"==typeof e&&(e=JSON.parse(e)),e)o.push(h(r,e[l]));if("dynamic"===t){var d=h("uint256",e.length);o.unshift(d)}return Buffer.concat(o)}if("bytes"===r)return e=Buffer.from(e),o=Buffer.concat([h("uint256",e.length),e]),e.length%32!=0&&(o=Buffer.concat([o,n.zeros(32-e.length%32)])),o;if(r.startsWith("bytes")){if((t=u(r))<1||t>32)throw new Error("Invalid bytes<N> width: "+t);return n.setLengthRight(e,32)}if(r.startsWith("uint")){if((t=u(r))%8||t<8||t>256)throw new Error("Invalid uint<N> width: "+t);if((f=c(e)).bitLength()>t)throw new Error("Supplied uint exceeds width: "+t+" vs "+f.bitLength());if(f<0)throw new Error("Supplied uint is negative");return f.toArrayLike(Buffer,"be",32)}if(r.startsWith("int")){if((t=u(r))%8||t<8||t>256)throw new Error("Invalid int<N> width: "+t);if((f=c(e)).bitLength()>t)throw new Error("Supplied int exceeds width: "+t+" vs "+f.bitLength());return f.toTwos(256).toArrayLike(Buffer,"be",32)}if(r.startsWith("ufixed")){if(t=a(r),(f=c(e))<0)throw new Error("Supplied ufixed is negative");return h("uint256",f.mul(new i(2).pow(new i(t[1]))))}if(r.startsWith("fixed"))return t=a(r),h("int256",c(e).mul(new i(2).pow(new i(t[1]))));throw new Error("Unsupported or invalid type: "+r)}function d(r,e,t){var n,f,o,u;if("string"==typeof r&&(r=p(r)),"address"===r.name)return d(r.rawType,e,t).toArrayLike(Buffer,"be",20).toString("hex");if("bool"===r.name)return d(r.rawType,e,t).toString()===new i(1).toString();if("string"===r.name){var a=d(r.rawType,e,t);return Buffer.from(a,"utf8").toString()}if(r.isArray){for(o=[],n=r.size,"dynamic"===r.size&&(t=d("uint256",e,t).toNumber(),n=d("uint256",e,t).toNumber(),t+=32),u=0;u<n;u++){var s=d(r.subArray,e,t);o.push(s),t+=r.subArray.memoryUsage}return o}if("bytes"===r.name)return t=d("uint256",e,t).toNumber(),n=d("uint256",e,t).toNumber(),e.slice(t+32,t+32+n);if(r.name.startsWith("bytes"))return e.slice(t,t+r.size);if(r.name.startsWith("uint")){if((f=new i(e.slice(t,t+32),16,"be")).bitLength()>r.size)throw new Error("Decoded int exceeds width: "+r.size+" vs "+f.bitLength());return f}if(r.name.startsWith("int")){if((f=new i(e.slice(t,t+32),16,"be").fromTwos(256)).bitLength()>r.size)throw new Error("Decoded uint exceeds width: "+r.size+" vs "+f.bitLength());return f}if(r.name.startsWith("ufixed")){if(n=new i(2).pow(new i(r.size[1])),!(f=d("uint256",e,t)).mod(n).isZero())throw new Error("Decimals not supported yet");return f.div(n)}if(r.name.startsWith("fixed")){if(n=new i(2).pow(new i(r.size[1])),!(f=d("int256",e,t)).mod(n).isZero())throw new Error("Decimals not supported yet");return f.div(n)}throw new Error("Unsupported or invalid type: "+r.name)}function p(r){var e,t,n;if(g(r)){e=s(r);var i=r.slice(0,r.lastIndexOf("["));return i=p(i),{isArray:!0,name:r,size:e,memoryUsage:"dynamic"===e?32:i.memoryUsage*e,subArray:i}}switch(r){case"address":n="uint160";break;case"bool":n="uint8";break;case"string":n="bytes"}if(t={rawType:n,name:r,memoryUsage:32},r.startsWith("bytes")&&"bytes"!==r||r.startsWith("uint")||r.startsWith("int")?t.size=u(r):(r.startsWith("ufixed")||r.startsWith("fixed"))&&(t.size=a(r)),r.startsWith("bytes")&&"bytes"!==r&&(t.size<1||t.size>32))throw new Error("Invalid bytes<N> width: "+t.size);if((r.startsWith("uint")||r.startsWith("int"))&&(t.size%8||t.size<8||t.size>256))throw new Error("Invalid int/uint<N> width: "+t.size);return t}function y(r){return"string"===r||"bytes"===r||"dynamic"===s(r)}function g(r){return r.lastIndexOf("]")===r.length-1}function m(r,e){return r.startsWith("address")||r.startsWith("bytes")?"0x"+e.toString("hex"):e.toString()}f.eventID=function(r,e){var t=r+"("+e.map(o).join(",")+")";return n.keccak256(Buffer.from(t))},f.methodID=function(r,e){return f.eventID(r,e).slice(0,4)},f.rawEncode=function(r,e){var t=[],n=[],i=0;r.forEach(function(r){if(g(r)){var e=s(r);i+="dynamic"!==e?32*e:32}else i+=32});for(var f=0;f<r.length;f++){var u=o(r[f]),a=h(u,e[f]);y(u)?(t.push(h("uint256",i)),n.push(a),i+=a.length):t.push(a)}return Buffer.concat(t.concat(n))},f.rawDecode=function(r,e){var t=[];e=Buffer.from(e);for(var n=0,i=0;i<r.length;i++){var f=p(o(r[i])),u=d(f,e,n);n+=f.memoryUsage,t.push(u)}return t},f.simpleEncode=function(r){var e=Array.prototype.slice.call(arguments).slice(1),t=l(r);if(e.length!==t.args.length)throw new Error("Argument count mismatch");return Buffer.concat([f.methodID(t.method,t.args),f.rawEncode(t.args,e)])},f.simpleDecode=function(r,e){var t=l(r);if(!t.retargs)throw new Error("No return values in method");return f.rawDecode(t.retargs,e)},f.stringify=function(r,e){var t=[];for(var n in r){var i=r[n],f=e[n];f=/^[^\[]+\[.*\]$/.test(i)?f.map(function(r){return m(i,r)}).join(", "):m(i,f),t.push(f)}return t},f.solidityHexValue=function(r,e,t){var i,o;if(g(r)){var a=r.replace(/\[.*?\]/,"");if(!g(a)){var l=s(r);if("dynamic"!==l&&0!==l&&e.length>l)throw new Error("Elements exceed array size: "+l)}var h=e.map(function(r){return f.solidityHexValue(a,r,256)});return Buffer.concat(h)}if("bytes"===r)return e;if("string"===r)return Buffer.from(e,"utf8");if("bool"===r){t=t||8;var d=Array(t/4).join("0");return Buffer.from(e?d+"1":d+"0","hex")}if("address"===r){var p=20;return t&&(p=t/8),n.setLengthLeft(e,p)}if(r.startsWith("bytes")){if((i=u(r))<1||i>32)throw new Error("Invalid bytes<N> width: "+i);return n.setLengthRight(e,i)}if(r.startsWith("uint")){if((i=u(r))%8||i<8||i>256)throw new Error("Invalid uint<N> width: "+i);if((o=c(e)).bitLength()>i)throw new Error("Supplied uint exceeds width: "+i+" vs "+o.bitLength());return t=t||i,o.toArrayLike(Buffer,"be",t/8)}if(r.startsWith("int")){if((i=u(r))%8||i<8||i>256)throw new Error("Invalid int<N> width: "+i);if((o=c(e)).bitLength()>i)throw new Error("Supplied int exceeds width: "+i+" vs "+o.bitLength());return t=t||i,o.toTwos(i).toArrayLike(Buffer,"be",t/8)}throw new Error("Unsupported or invalid type: "+r)},f.solidityPack=function(r,e){if(r.length!==e.length)throw new Error("Number of types are not matching the values");for(var t=[],n=0;n<r.length;n++){var i=o(r[n]);t.push(f.solidityHexValue(i,e[n],null))}return Buffer.concat(t)},f.soliditySHA3=function(r,e){return n.keccak256(f.solidityPack(r,e))},f.soliditySHA256=function(r,e){return n.sha256(f.solidityPack(r,e))},f.solidityRIPEMD160=function(r,e){return n.ripemd160(f.solidityPack(r,e),!0)},f.fromSerpent=function(r){for(var e,t=[],n=0;n<r.length;n++){var i=r[n];if("s"===i)t.push("bytes");else if("b"===i){for(var f="bytes",o=n+1;o<r.length&&(e=r[o])>="0"&&e<="9";)f+=r[o]-"0",o++;n=o-1,t.push(f)}else if("i"===i)t.push("int256");else{if("a"!==i)throw new Error("Unsupported or invalid type: "+i);t.push("int256[]")}}return t},f.toSerpent=function(r){for(var e=[],t=0;t<r.length;t++){var n=r[t];if("bytes"===n)e.push("s");else if(n.startsWith("bytes"))e.push("b"+u(n));else if("int256"===n)e.push("i");else{if("int256[]"!==n)throw new Error("Unsupported or invalid type: "+n);e.push("a")}}return e.join("")},r.exports=f},POqh:function(r,e,t){"use strict";var n=Buffer.from([48,129,211,2,1,1,4,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,129,133,48,129,130,2,1,1,48,44,6,7,42,134,72,206,61,1,1,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,252,47,48,6,4,1,0,4,1,7,4,33,2,121,190,102,126,249,220,187,172,85,160,98,149,206,135,11,7,2,155,252,219,45,206,40,217,89,242,129,91,22,248,23,152,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,186,174,220,230,175,72,160,59,191,210,94,140,208,54,65,65,2,1,1,161,36,3,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),i=Buffer.from([48,130,1,19,2,1,1,4,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,129,165,48,129,162,2,1,1,48,44,6,7,42,134,72,206,61,1,1,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,252,47,48,6,4,1,0,4,1,7,4,65,4,121,190,102,126,249,220,187,172,85,160,98,149,206,135,11,7,2,155,252,219,45,206,40,217,89,242,129,91,22,248,23,152,72,58,218,119,38,163,196,101,93,164,251,252,14,17,8,168,253,23,180,72,166,133,84,25,156,71,208,143,251,16,212,184,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,186,174,220,230,175,72,160,59,191,210,94,140,208,54,65,65,2,1,1,161,68,3,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);e.privateKeyExport=function(r,e,t){var f=Buffer.from(t?n:i);return r.copy(f,t?8:9),e.copy(f,t?181:214),f},e.privateKeyImport=function(r){var e=r.length,t=0;if(e<t+1||48!==r[t])return null;if(e<(t+=1)+1||!(128&r[t]))return null;var n=127&r[t];if(n<1||n>2)return null;if(e<(t+=1)+n)return null;var i=r[t+n-1]|(n>1?r[t+n-2]<<8:0);return e<(t+=n)+i||e<t+3||2!==r[t]||1!==r[t+1]||1!==r[t+2]||e<(t+=3)+2||4!==r[t]||r[t+1]>32||e<t+2+r[t+1]?null:r.slice(t+2,t+2+r[t+1])},e.signatureImportLax=function(r){var e=Buffer.alloc(32,0),t=Buffer.alloc(32,0),n=r.length,i=0;if(48!==r[i++])return null;var f=r[i++];if(128&f&&(i+=f-128)>n)return null;if(2!==r[i++])return null;var o=r[i++];if(128&o){if(i+(f=o-128)>n)return null;for(;f>0&&0===r[i];i+=1,f-=1);for(o=0;f>0;i+=1,f-=1)o=(o<<8)+r[i]}if(o>n-i)return null;var u=i;if(i+=o,2!==r[i++])return null;var a=r[i++];if(128&a){if(i+(f=a-128)>n)return null;for(;f>0&&0===r[i];i+=1,f-=1);for(a=0;f>0;i+=1,f-=1)a=(a<<8)+r[i]}if(a>n-i)return null;var s=i;for(i+=a;o>0&&0===r[u];o-=1,u+=1);if(o>32)return null;var c=r.slice(u,u+o);for(c.copy(e,32-c.length);a>0&&0===r[s];a-=1,s+=1);if(a>32)return null;var l=r.slice(s,s+a);return l.copy(t,32-l.length),{r:e,s:t}}},WMHZ:function(r,e,t){"use strict";var n=t("IhPl"),i=t("mJzV"),f=t("POqh"),o=function(r){return 32===r.length&&n.privateKeyVerify(Uint8Array.from(r))};r.exports={privateKeyVerify:o,privateKeyExport:function(r,e){if(32!==r.length)throw new RangeError("private key length is invalid");var t=i.privateKeyExport(r,e);return f.privateKeyExport(r,t,e)},privateKeyImport:function(r){if(null!==(r=f.privateKeyImport(r))&&32===r.length&&o(r))return r;throw new Error("couldn't import from DER format")},privateKeyNegate:function(r){return Buffer.from(n.privateKeyNegate(Uint8Array.from(r)))},privateKeyModInverse:function(r){if(32!==r.length)throw new Error("private key length is invalid");return Buffer.from(i.privateKeyModInverse(Uint8Array.from(r)))},privateKeyTweakAdd:function(r,e){return Buffer.from(n.privateKeyTweakAdd(Uint8Array.from(r),e))},privateKeyTweakMul:function(r,e){return Buffer.from(n.privateKeyTweakMul(Uint8Array.from(r),Uint8Array.from(e)))},publicKeyCreate:function(r,e){return Buffer.from(n.publicKeyCreate(Uint8Array.from(r),e))},publicKeyConvert:function(r,e){return Buffer.from(n.publicKeyConvert(Uint8Array.from(r),e))},publicKeyVerify:function(r){return(33===r.length||65===r.length)&&n.publicKeyVerify(Uint8Array.from(r))},publicKeyTweakAdd:function(r,e,t){return Buffer.from(n.publicKeyTweakAdd(Uint8Array.from(r),Uint8Array.from(e),t))},publicKeyTweakMul:function(r,e,t){return Buffer.from(n.publicKeyTweakMul(Uint8Array.from(r),Uint8Array.from(e),t))},publicKeyCombine:function(r,e){var t=[];return r.forEach(function(r){t.push(Uint8Array.from(r))}),Buffer.from(n.publicKeyCombine(t,e))},signatureNormalize:function(r){return Buffer.from(n.signatureNormalize(Uint8Array.from(r)))},signatureExport:function(r){return Buffer.from(n.signatureExport(Uint8Array.from(r)))},signatureImport:function(r){return Buffer.from(n.signatureImport(Uint8Array.from(r)))},signatureImportLax:function(r){if(0===r.length)throw new RangeError("signature length is invalid");var e=f.signatureImportLax(r);if(null===e)throw new Error("couldn't parse DER signature");return i.signatureImport(e)},sign:function(r,e,t){if(null===t)throw new TypeError("options should be an Object");var i=void 0;if(t){if(i={},null===t.data)throw new TypeError("options.data should be a Buffer");if(t.data){if(32!==t.data.length)throw new RangeError("options.data length is invalid");i.data=new Uint8Array(t.data)}if(null===t.noncefn)throw new TypeError("options.noncefn should be a Function");t.noncefn&&(i.noncefn=function(r,e,n,i,f){var o=null!=n?Buffer.from(n):null,u=null!=i?Buffer.from(i):null,a=Buffer.from("");return t.noncefn&&(a=t.noncefn(Buffer.from(r),Buffer.from(e),o,u,f)),Uint8Array.from(a)})}var f=n.ecdsaSign(Uint8Array.from(r),Uint8Array.from(e),i);return{signature:Buffer.from(f.signature),recovery:f.recid}},verify:function(r,e,t){return n.ecdsaVerify(Uint8Array.from(e),Uint8Array.from(r),t)},recover:function(r,e,t,i){return Buffer.from(n.ecdsaRecover(Uint8Array.from(e),t,Uint8Array.from(r),i))},ecdh:function(r,e){return Buffer.from(n.ecdh(Uint8Array.from(r),Uint8Array.from(e),{}))},ecdhUnsafe:function(r,e,t){if(33!==r.length&&65!==r.length)throw new RangeError("public key length is invalid");if(32!==e.length)throw new RangeError("private key length is invalid");return Buffer.from(i.ecdhUnsafe(Uint8Array.from(r),Uint8Array.from(e),t))}}},cMPL:function(r,e,t){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},i=t("wzGL"),f=i.keccak224,o=i.keccak384,u=i.keccak256,a=i.keccak512,s=t("WMHZ"),c=t("ePay"),l=t("b4LW"),h=t("9gnv"),d=t("mObS"),p=t("hwdV").Buffer;Object.assign(e,t("mhLr")),e.MAX_INTEGER=new h("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",16),e.TWO_POW256=new h("10000000000000000000000000000000000000000000000000000000000000000",16),e.KECCAK256_NULL_S="c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",e.SHA3_NULL_S=e.KECCAK256_NULL_S,e.KECCAK256_NULL=p.from(e.KECCAK256_NULL_S,"hex"),e.SHA3_NULL=e.KECCAK256_NULL,e.KECCAK256_RLP_ARRAY_S="1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",e.SHA3_RLP_ARRAY_S=e.KECCAK256_RLP_ARRAY_S,e.KECCAK256_RLP_ARRAY=p.from(e.KECCAK256_RLP_ARRAY_S,"hex"),e.SHA3_RLP_ARRAY=e.KECCAK256_RLP_ARRAY,e.KECCAK256_RLP_S="56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",e.SHA3_RLP_S=e.KECCAK256_RLP_S,e.KECCAK256_RLP=p.from(e.KECCAK256_RLP_S,"hex"),e.SHA3_RLP=e.KECCAK256_RLP,e.BN=h,e.rlp=l,e.secp256k1=s,e.zeros=function(r){return p.allocUnsafe(r).fill(0)},e.zeroAddress=function(){var r=e.zeros(20);return e.bufferToHex(r)},e.setLengthLeft=e.setLength=function(r,t,n){var i=e.zeros(t);return r=e.toBuffer(r),n?r.length<t?(r.copy(i),i):r.slice(0,t):r.length<t?(r.copy(i,t-r.length),i):r.slice(-t)},e.setLengthRight=function(r,t){return e.setLength(r,t,!0)},e.unpad=e.stripZeros=function(r){for(var t=(r=e.stripHexPrefix(r))[0];r.length>0&&"0"===t.toString();)t=(r=r.slice(1))[0];return r},e.toBuffer=function(r){if(!p.isBuffer(r))if(Array.isArray(r))r=p.from(r);else if("string"==typeof r)r=e.isHexString(r)?p.from(e.padToEven(e.stripHexPrefix(r)),"hex"):p.from(r);else if("number"==typeof r)r=e.intToBuffer(r);else if(null==r)r=p.allocUnsafe(0);else if(h.isBN(r))r=r.toArrayLike(p);else{if(!r.toArray)throw new Error("invalid type");r=p.from(r.toArray())}return r},e.bufferToInt=function(r){return new h(e.toBuffer(r)).toNumber()},e.bufferToHex=function(r){return"0x"+(r=e.toBuffer(r)).toString("hex")},e.fromSigned=function(r){return new h(r).fromTwos(256)},e.toUnsigned=function(r){return p.from(r.toTwos(256).toArray())},e.keccak=function(r,t){switch(r=e.toBuffer(r),t||(t=256),t){case 224:return f(r);case 256:return u(r);case 384:return o(r);case 512:return a(r);default:throw new Error("Invald algorithm: keccak"+t)}},e.keccak256=function(r){return e.keccak(r)},e.sha3=e.keccak,e.sha256=function(r){return r=e.toBuffer(r),d("sha256").update(r).digest()},e.ripemd160=function(r,t){r=e.toBuffer(r);var n=d("rmd160").update(r).digest();return!0===t?e.setLength(n,32):n},e.rlphash=function(r){return e.keccak(l.encode(r))},e.isValidPrivate=function(r){return s.privateKeyVerify(r)},e.isValidPublic=function(r,e){return 64===r.length?s.publicKeyVerify(p.concat([p.from([4]),r])):!!e&&s.publicKeyVerify(r)},e.pubToAddress=e.publicToAddress=function(r,t){return r=e.toBuffer(r),t&&64!==r.length&&(r=s.publicKeyConvert(r,!1).slice(1)),c(64===r.length),e.keccak(r).slice(-20)};var y=e.privateToPublic=function(r){return r=e.toBuffer(r),s.publicKeyCreate(r,!1).slice(1)};e.importPublic=function(r){return 64!==(r=e.toBuffer(r)).length&&(r=s.publicKeyConvert(r,!1).slice(1)),r},e.ecsign=function(r,e){var t=s.sign(r,e),n={};return n.r=t.signature.slice(0,32),n.s=t.signature.slice(32,64),n.v=t.recovery+27,n},e.hashPersonalMessage=function(r){var t=e.toBuffer("\x19Ethereum Signed Message:\n"+r.length.toString());return e.keccak(p.concat([t,r]))},e.ecrecover=function(r,t,n,i){var f=p.concat([e.setLength(n,32),e.setLength(i,32)],64),o=t-27;if(0!==o&&1!==o)throw new Error("Invalid signature v value");var u=s.recover(r,f,o);return s.publicKeyConvert(u,!1).slice(1)},e.toRpcSig=function(r,t,n){if(27!==r&&28!==r)throw new Error("Invalid recovery id");return e.bufferToHex(p.concat([e.setLengthLeft(t,32),e.setLengthLeft(n,32),e.toBuffer(r-27)]))},e.fromRpcSig=function(r){if(65!==(r=e.toBuffer(r)).length)throw new Error("Invalid signature length");var t=r[64];return t<27&&(t+=27),{v:t,r:r.slice(0,32),s:r.slice(32,64)}},e.privateToAddress=function(r){return e.publicToAddress(y(r))},e.isValidAddress=function(r){return/^0x[0-9a-fA-F]{40}$/.test(r)},e.isZeroAddress=function(r){return e.zeroAddress()===e.addHexPrefix(r)},e.toChecksumAddress=function(r){r=e.stripHexPrefix(r).toLowerCase();for(var t=e.keccak(r).toString("hex"),n="0x",i=0;i<r.length;i++)parseInt(t[i],16)>=8?n+=r[i].toUpperCase():n+=r[i];return n},e.isValidChecksumAddress=function(r){return e.isValidAddress(r)&&e.toChecksumAddress(r)===r},e.generateAddress=function(r,t){return r=e.toBuffer(r),t=(t=new h(t)).isZero()?null:p.from(t.toArray()),e.rlphash([r,t]).slice(-20)},e.isPrecompiled=function(r){var t=e.unpad(r);return 1===t.length&&t[0]>=1&&t[0]<=8},e.addHexPrefix=function(r){return"string"!=typeof r||e.isHexPrefixed(r)?r:"0x"+r},e.isValidSignature=function(r,e,t,n){var i=new h("7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0",16),f=new h("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",16);return!(32!==e.length||32!==t.length||27!==r&&28!==r||(e=new h(e),t=new h(t),e.isZero()||e.gt(f)||t.isZero()||t.gt(f)||!1===n&&1===new h(t).cmp(i)))},e.baToJSON=function(r){if(p.isBuffer(r))return"0x"+r.toString("hex");if(r instanceof Array){for(var t=[],n=0;n<r.length;n++)t.push(e.baToJSON(r[n]));return t}},e.defineProperties=function(r,t,i){if(r.raw=[],r._fields=[],r.toJSON=function(t){if(t){var n={};return r._fields.forEach(function(e){n[e]="0x"+r[e].toString("hex")}),n}return e.baToJSON(this.raw)},r.serialize=function(){return l.encode(r.raw)},t.forEach(function(t,n){function i(){return r.raw[n]}function f(i){"00"!==(i=e.toBuffer(i)).toString("hex")||t.allowZero||(i=p.allocUnsafe(0)),t.allowLess&&t.length?(i=e.stripZeros(i),c(t.length>=i.length,"The field "+t.name+" must not have more "+t.length+" bytes")):t.allowZero&&0===i.length||!t.length||c(t.length===i.length,"The field "+t.name+" must have byte length of "+t.length),r.raw[n]=i}r._fields.push(t.name),Object.defineProperty(r,t.name,{enumerable:!0,configurable:!0,get:i,set:f}),t.default&&(r[t.name]=t.default),t.alias&&Object.defineProperty(r,t.alias,{enumerable:!1,configurable:!0,set:f,get:i})}),i)if("string"==typeof i&&(i=p.from(e.stripHexPrefix(i),"hex")),p.isBuffer(i)&&(i=l.decode(i)),Array.isArray(i)){if(i.length>r._fields.length)throw new Error("wrong number of fields in data");i.forEach(function(t,n){r[r._fields[n]]=e.toBuffer(t)})}else{if("object"!==(void 0===i?"undefined":n(i)))throw new Error("invalid data");var f=Object.keys(i);t.forEach(function(e){-1!==f.indexOf(e.name)&&(r[e.name]=i[e.name]),-1!==f.indexOf(e.alias)&&(r[e.alias]=i[e.alias])})}}},ga3E:function(r,e,t){r.exports=t("6vPO")},mJzV:function(r,e,t){"use strict";var n=t("9gnv"),i=new(0,t("MzeL").ec)("secp256k1"),f=i.curve;e.privateKeyExport=function(r,e){var t=new n(r);if(t.ucmp(f.n)>=0)throw new Error("couldn't export to DER format");var u=i.g.mul(t);return o(u.getX(),u.getY(),e)},e.privateKeyModInverse=function(r){var e=new n(r);if(e.ucmp(f.n)>=0||e.isZero())throw new Error("private key range is invalid");return e.invm(f.n).toArrayLike(Buffer,"be",32)},e.signatureImport=function(r){var e=new n(r.r);e.ucmp(f.n)>=0&&(e=new n(0));var t=new n(r.s);return t.ucmp(f.n)>=0&&(t=new n(0)),Buffer.concat([e.toArrayLike(Buffer,"be",32),t.toArrayLike(Buffer,"be",32)])},e.ecdhUnsafe=function(r,e,t){var u=i.keyFromPublic(r),a=new n(e);if(a.ucmp(f.n)>=0||a.isZero())throw new Error("scalar was invalid (zero or overflow)");var s=u.pub.mul(a);return o(s.getX(),s.getY(),t)};var o=function(r,e,t){var n=void 0;return t?((n=Buffer.alloc(33))[0]=e.isOdd()?3:2,r.toArrayLike(Buffer,"be",32).copy(n,1)):((n=Buffer.alloc(65))[0]=4,r.toArrayLike(Buffer,"be",32).copy(n,1),e.toArrayLike(Buffer,"be",32).copy(n,33)),n}}}]);