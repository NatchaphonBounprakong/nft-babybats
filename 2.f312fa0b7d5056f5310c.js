(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"42mr":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.EthereumProviderError=r.EthereumRpcError=void 0;const o=t("N1pS");class n extends Error{constructor(e,r,t){if(!Number.isInteger(e))throw new Error('"code" must be an integer.');if(!r||"string"!=typeof r)throw new Error('"message" must be a nonempty string.');super(r),this.code=e,void 0!==t&&(this.data=t)}serialize(){const e={code:this.code,message:this.message};return void 0!==this.data&&(e.data=this.data),this.stack&&(e.stack=this.stack),e}toString(){return o.default(this.serialize(),s,2)}}function s(e,r){if("[Circular]"!==r)return r}r.EthereumRpcError=n,r.EthereumProviderError=class extends n{constructor(e,r,t){if(!function(e){return Number.isInteger(e)&&e>=1e3&&e<=4999}(e))throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');super(e,r,t)}}},"4BfN":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.errorValues=r.errorCodes=void 0,r.errorCodes={rpc:{invalidInput:-32e3,resourceNotFound:-32001,resourceUnavailable:-32002,transactionRejected:-32003,methodNotSupported:-32004,limitExceeded:-32005,parse:-32700,invalidRequest:-32600,methodNotFound:-32601,invalidParams:-32602,internal:-32603},provider:{userRejectedRequest:4001,unauthorized:4100,unsupportedMethod:4200,disconnected:4900,chainDisconnected:4901}},r.errorValues={"-32700":{standard:"JSON RPC 2.0",message:"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."},"-32600":{standard:"JSON RPC 2.0",message:"The JSON sent is not a valid Request object."},"-32601":{standard:"JSON RPC 2.0",message:"The method does not exist / is not available."},"-32602":{standard:"JSON RPC 2.0",message:"Invalid method parameter(s)."},"-32603":{standard:"JSON RPC 2.0",message:"Internal JSON-RPC error."},"-32000":{standard:"EIP-1474",message:"Invalid input."},"-32001":{standard:"EIP-1474",message:"Resource not found."},"-32002":{standard:"EIP-1474",message:"Resource unavailable."},"-32003":{standard:"EIP-1474",message:"Transaction rejected."},"-32004":{standard:"EIP-1474",message:"Method not supported."},"-32005":{standard:"EIP-1474",message:"Request limit exceeded."},4001:{standard:"EIP-1193",message:"User rejected the request."},4100:{standard:"EIP-1193",message:"The requested account and/or method has not been authorized by the user."},4200:{standard:"EIP-1193",message:"The requested method is not supported by this Ethereum provider."},4900:{standard:"EIP-1193",message:"The provider is disconnected from all chains."},4901:{standard:"EIP-1193",message:"The provider is disconnected from the specified chain."}}},KWYN:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.serializeError=r.isValidCode=r.getMessageFromCode=r.JSON_RPC_SERVER_ERROR_MESSAGE=void 0;const o=t("4BfN"),n=t("42mr"),s=o.errorCodes.rpc.internal,i={code:s,message:a(s)};function a(e,t="Unspecified error message. This is a bug, please report it."){if(Number.isInteger(e)){const t=e.toString();if(f(o.errorValues,t))return o.errorValues[t].message;if(u(e))return r.JSON_RPC_SERVER_ERROR_MESSAGE}return t}function d(e){if(!Number.isInteger(e))return!1;const r=e.toString();return!!o.errorValues[r]||!!u(e)}function u(e){return e>=-32099&&e<=-32e3}function c(e){return e&&"object"==typeof e&&!Array.isArray(e)?Object.assign({},e):e}function f(e,r){return Object.prototype.hasOwnProperty.call(e,r)}r.JSON_RPC_SERVER_ERROR_MESSAGE="Unspecified server error.",r.getMessageFromCode=a,r.isValidCode=d,r.serializeError=function(e,{fallbackError:r=i,shouldIncludeStack:t=!1}={}){var o,s;if(!r||!Number.isInteger(r.code)||"string"!=typeof r.message)throw new Error("Must provide fallback error with integer number code and string message.");if(e instanceof n.EthereumRpcError)return e.serialize();const u={};if(e&&"object"==typeof e&&!Array.isArray(e)&&f(e,"code")&&d(e.code)){const r=e;u.code=r.code,r.message&&"string"==typeof r.message?(u.message=r.message,f(r,"data")&&(u.data=r.data)):(u.message=a(u.code),u.data={originalError:c(e)})}else{u.code=r.code;const t=null===(o=e)||void 0===o?void 0:o.message;u.message=t&&"string"==typeof t?t:r.message,u.data={originalError:c(e)}}const p=null===(s=e)||void 0===s?void 0:s.stack;return t&&e&&p&&"string"==typeof p&&(u.stack=p),u}},N1pS:function(e,r){e.exports=a,a.default=a,a.stable=f,a.stableStringify=f;var t="[...]",o="[Circular]",n=[],s=[];function i(){return{depthLimit:Number.MAX_SAFE_INTEGER,edgesLimit:Number.MAX_SAFE_INTEGER}}function a(e,r,t,o){var a;void 0===o&&(o=i()),u(e,"",0,[],void 0,0,o);try{a=0===s.length?JSON.stringify(e,r,t):JSON.stringify(e,l(r),t)}catch(c){return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")}finally{for(;0!==n.length;){var d=n.pop();4===d.length?Object.defineProperty(d[0],d[1],d[3]):d[0][d[1]]=d[2]}}return a}function d(e,r,t,o){var i=Object.getOwnPropertyDescriptor(o,t);void 0!==i.get?i.configurable?(Object.defineProperty(o,t,{value:e}),n.push([o,t,r,i])):s.push([r,t,e]):(o[t]=e,n.push([o,t,r]))}function u(e,r,n,s,i,a,c){var f;if(a+=1,"object"==typeof e&&null!==e){for(f=0;f<s.length;f++)if(s[f]===e)return void d(o,e,r,i);if(void 0!==c.depthLimit&&a>c.depthLimit)return void d(t,e,r,i);if(void 0!==c.edgesLimit&&n+1>c.edgesLimit)return void d(t,e,r,i);if(s.push(e),Array.isArray(e))for(f=0;f<e.length;f++)u(e[f],f,f,s,e,a,c);else{var p=Object.keys(e);for(f=0;f<p.length;f++){var l=p[f];u(e[l],l,f,s,e,a,c)}}s.pop()}}function c(e,r){return e<r?-1:e>r?1:0}function f(e,r,t,o){void 0===o&&(o=i());var a,d=p(e,"",0,[],void 0,0,o)||e;try{a=0===s.length?JSON.stringify(d,r,t):JSON.stringify(d,l(r),t)}catch(c){return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")}finally{for(;0!==n.length;){var u=n.pop();4===u.length?Object.defineProperty(u[0],u[1],u[3]):u[0][u[1]]=u[2]}}return a}function p(e,r,s,i,a,u,f){var l;if(u+=1,"object"==typeof e&&null!==e){for(l=0;l<i.length;l++)if(i[l]===e)return void d(o,e,r,a);try{if("function"==typeof e.toJSON)return}catch(v){return}if(void 0!==f.depthLimit&&u>f.depthLimit)return void d(t,e,r,a);if(void 0!==f.edgesLimit&&s+1>f.edgesLimit)return void d(t,e,r,a);if(i.push(e),Array.isArray(e))for(l=0;l<e.length;l++)p(e[l],l,l,i,e,u,f);else{var m={},g=Object.keys(e).sort(c);for(l=0;l<g.length;l++){var h=g[l];p(e[h],h,l,i,e,u,f),m[h]=e[h]}if(void 0===a)return m;n.push([a,r,e]),a[r]=m}i.pop()}}function l(e){return e=void 0!==e?e:function(e,r){return r},function(r,t){if(s.length>0)for(var o=0;o<s.length;o++){var n=s[o];if(n[1]===r&&n[0]===t){t=n[2],s.splice(o,1);break}}return e.call(this,r,t)}}},bXnx:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ethErrors=void 0;const o=t("42mr"),n=t("KWYN"),s=t("4BfN");function i(e,r){const[t,s]=d(r);return new o.EthereumRpcError(e,t||n.getMessageFromCode(e),s)}function a(e,r){const[t,s]=d(r);return new o.EthereumProviderError(e,t||n.getMessageFromCode(e),s)}function d(e){if(e){if("string"==typeof e)return[e];if("object"==typeof e&&!Array.isArray(e)){const{message:r,data:t}=e;if(r&&"string"!=typeof r)throw new Error("Must specify string message.");return[r||void 0,t]}}return[]}r.ethErrors={rpc:{parse:e=>i(s.errorCodes.rpc.parse,e),invalidRequest:e=>i(s.errorCodes.rpc.invalidRequest,e),invalidParams:e=>i(s.errorCodes.rpc.invalidParams,e),methodNotFound:e=>i(s.errorCodes.rpc.methodNotFound,e),internal:e=>i(s.errorCodes.rpc.internal,e),server:e=>{if(!e||"object"!=typeof e||Array.isArray(e))throw new Error("Ethereum RPC Server errors must provide single object argument.");const{code:r}=e;if(!Number.isInteger(r)||r>-32005||r<-32099)throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');return i(r,e)},invalidInput:e=>i(s.errorCodes.rpc.invalidInput,e),resourceNotFound:e=>i(s.errorCodes.rpc.resourceNotFound,e),resourceUnavailable:e=>i(s.errorCodes.rpc.resourceUnavailable,e),transactionRejected:e=>i(s.errorCodes.rpc.transactionRejected,e),methodNotSupported:e=>i(s.errorCodes.rpc.methodNotSupported,e),limitExceeded:e=>i(s.errorCodes.rpc.limitExceeded,e)},provider:{userRejectedRequest:e=>a(s.errorCodes.provider.userRejectedRequest,e),unauthorized:e=>a(s.errorCodes.provider.unauthorized,e),unsupportedMethod:e=>a(s.errorCodes.provider.unsupportedMethod,e),disconnected:e=>a(s.errorCodes.provider.disconnected,e),chainDisconnected:e=>a(s.errorCodes.provider.chainDisconnected,e),custom:e=>{if(!e||"object"!=typeof e||Array.isArray(e))throw new Error("Ethereum Provider custom errors must provide single object argument.");const{code:r,message:t,data:n}=e;if(!t||"string"!=typeof t)throw new Error('"message" must be a nonempty string');return new o.EthereumProviderError(r,t,n)}}}},"jNV+":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.getMessageFromCode=r.serializeError=r.EthereumProviderError=r.EthereumRpcError=r.ethErrors=r.errorCodes=void 0;const o=t("42mr");Object.defineProperty(r,"EthereumRpcError",{enumerable:!0,get:function(){return o.EthereumRpcError}}),Object.defineProperty(r,"EthereumProviderError",{enumerable:!0,get:function(){return o.EthereumProviderError}});const n=t("KWYN");Object.defineProperty(r,"serializeError",{enumerable:!0,get:function(){return n.serializeError}}),Object.defineProperty(r,"getMessageFromCode",{enumerable:!0,get:function(){return n.getMessageFromCode}});const s=t("bXnx");Object.defineProperty(r,"ethErrors",{enumerable:!0,get:function(){return s.ethErrors}});const i=t("4BfN");Object.defineProperty(r,"errorCodes",{enumerable:!0,get:function(){return i.errorCodes}})}}]);