(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~authereum~providerEngine-7945c13d-js~walletconnect-web3-provider~walletlink"],{

/***/ "/UYa":
/*!**********************************************************!*\
  !*** ./node_modules/eth-json-rpc-middleware/scaffold.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// for backwards compat
module.exports = __webpack_require__(/*! json-rpc-engine/src/createScaffoldMiddleware */ "MS7i")


/***/ }),

/***/ "/u+i":
/*!****************************************************!*\
  !*** ./node_modules/eth-block-tracker/src/base.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EthQuery = __webpack_require__(/*! eth-query */ "QXrW")
const pify = __webpack_require__(/*! pify */ "4CaD")
const SafeEventEmitter = __webpack_require__(/*! safe-event-emitter */ "y2lW")

const sec = 1000

const calculateSum = (accumulator, currentValue) => accumulator + currentValue
const blockTrackerEvents = ['sync', 'latest']

class BaseBlockTracker extends SafeEventEmitter {

  //
  // public
  //

  constructor (opts = {}) {
    super()
    // config
    this._blockResetDuration = opts.blockResetDuration || 20 * sec
    // state
    this._blockResetTimeout
    this._currentBlock = null
    this._isRunning = false
    // bind functions for internal use
    this._onNewListener = this._onNewListener.bind(this)
    this._onRemoveListener = this._onRemoveListener.bind(this)
    this._resetCurrentBlock = this._resetCurrentBlock.bind(this)
    // listen for handler changes
    this._setupInternalEvents()
  }

  isRunning () {
    return this._isRunning
  }

  getCurrentBlock () {
    return this._currentBlock
  }

  async getLatestBlock () {
    // return if available
    if (this._currentBlock) return this._currentBlock
    // wait for a new latest block
    const latestBlock = await new Promise(resolve => this.once('latest', resolve))
    // return newly set current block
    return latestBlock
  }

  // dont allow module consumer to remove our internal event listeners
  removeAllListeners (eventName) {
    // perform default behavior, preserve fn arity
    if (eventName) {
      super.removeAllListeners(eventName)
    } else {
      super.removeAllListeners()
    }
    // re-add internal events
    this._setupInternalEvents()
    // trigger stop check just in case
    this._onRemoveListener()
  }

  //
  // to be implemented in subclass
  //

  _start () {
    // default behavior is noop
  }

  _end () {
    // default behavior is noop
  }

  //
  // private
  //

  _setupInternalEvents () {
    // first remove listeners for idempotence
    this.removeListener('newListener', this._onNewListener)
    this.removeListener('removeListener', this._onRemoveListener)
    // then add them
    this.on('newListener', this._onNewListener)
    this.on('removeListener', this._onRemoveListener)
  }

  _onNewListener (eventName, handler) {
    // `newListener` is called *before* the listener is added
    if (!blockTrackerEvents.includes(eventName)) return
    this._maybeStart()
  }

  _onRemoveListener (eventName, handler) {
    // `removeListener` is called *after* the listener is removed
    if (this._getBlockTrackerEventCount() > 0) return
    this._maybeEnd()
  }

  _maybeStart () {
    if (this._isRunning) return
    this._isRunning = true
    // cancel setting latest block to stale
    this._cancelBlockResetTimeout()
    this._start()
  }

  _maybeEnd () {
    if (!this._isRunning) return
    this._isRunning = false
    this._setupBlockResetTimeout()
    this._end()
  }

  _getBlockTrackerEventCount () {
    return blockTrackerEvents
      .map(eventName => this.listenerCount(eventName))
      .reduce(calculateSum)
  }

  _newPotentialLatest (newBlock) {
    const currentBlock = this._currentBlock
    // only update if blok number is higher
    if (currentBlock && (hexToInt(newBlock) <= hexToInt(currentBlock))) return
    this._setCurrentBlock(newBlock)
  }

  _setCurrentBlock (newBlock) {
    const oldBlock = this._currentBlock
    this._currentBlock = newBlock
    this.emit('latest', newBlock)
    this.emit('sync', { oldBlock, newBlock })
  }

  _setupBlockResetTimeout () {
    // clear any existing timeout
    this._cancelBlockResetTimeout()
    // clear latest block when stale
    this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this._blockResetDuration)
    // nodejs - dont hold process open
    if (this._blockResetTimeout.unref) {
      this._blockResetTimeout.unref()
    }
  }

  _cancelBlockResetTimeout () {
    clearTimeout(this._blockResetTimeout)
  }

  _resetCurrentBlock () {
    this._currentBlock = null
  }

}

module.exports = BaseBlockTracker

function hexToInt(hexInt) {
  return Number.parseInt(hexInt, 16)
}


/***/ }),

/***/ "0QlC":
/*!****************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/getBlocksForRange.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = getBlocksForRange

async function getBlocksForRange({ provider, fromBlock, toBlock }) {
  if (!fromBlock) fromBlock = toBlock

  const fromBlockNumber = hexToInt(fromBlock)
  const toBlockNumber = hexToInt(toBlock)
  const blockCountToQuery = toBlockNumber - fromBlockNumber + 1
  // load all blocks from old to new (inclusive)
  const missingBlockNumbers = Array(blockCountToQuery).fill()
                              .map((_,index) => fromBlockNumber + index)
                              .map(intToHex)
  const blockBodies = await Promise.all(
    missingBlockNumbers.map(blockNum => query(provider, 'eth_getBlockByNumber', [blockNum, false]))
  )
  return blockBodies
}

function hexToInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString
  return Number.parseInt(hexString, 16)
}

function incrementHexInt(hexString){
  if (hexString === undefined || hexString === null) return hexString
  const value = hexToInt(hexString)
  return intToHex(value + 1)
}

function intToHex(int) {
  if (int === undefined || int === null) return int
  const hexString = int.toString(16)
  return '0x' + hexString
}

function query(provider, method, params) {
  return new Promise((resolve, reject) => {
    provider.sendAsync({ id: 1, jsonrpc: '2.0', method, params }, (err, res) => {
      if (err) return reject(err)
      resolve(res.result)
    })
  })
}


/***/ }),

/***/ "1Ti9":
/*!**************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/mergeMiddleware.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMiddleware = void 0;
const JsonRpcEngine_1 = __webpack_require__(/*! ./JsonRpcEngine */ "X+co");
function mergeMiddleware(middlewareStack) {
    const engine = new JsonRpcEngine_1.JsonRpcEngine();
    middlewareStack.forEach((middleware) => engine.push(middleware));
    return engine.asMiddleware();
}
exports.mergeMiddleware = mergeMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21lcmdlTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBbUU7QUFFbkUsU0FBZ0IsZUFBZSxDQUFDLGVBQXNEO0lBQ3BGLE1BQU0sTUFBTSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO0lBQ25DLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNqRSxPQUFPLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUMvQixDQUFDO0FBSkQsMENBSUMifQ==

/***/ }),

/***/ "2J3U":
/*!**************************************************!*\
  !*** ./node_modules/json-rpc-random-id/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = IdIterator

function IdIterator(opts){
  opts = opts || {}
  var max = opts.max || Number.MAX_SAFE_INTEGER
  var idCounter = typeof opts.start !== 'undefined' ? opts.start : Math.floor(Math.random() * max)

  return function createRandomId () {
    idCounter = idCounter % max
    return idCounter++
  }

}

/***/ }),

/***/ "2nhq":
/*!****************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Mutex = __webpack_require__(/*! async-mutex */ "q6/2").Mutex
const { createAsyncMiddleware } = __webpack_require__(/*! json-rpc-engine */ "llSS")
const createJsonRpcMiddleware = __webpack_require__(/*! eth-json-rpc-middleware/scaffold */ "/UYa")
const LogFilter = __webpack_require__(/*! ./log-filter.js */ "FqFB")
const BlockFilter = __webpack_require__(/*! ./block-filter.js */ "rW7p")
const TxFilter = __webpack_require__(/*! ./tx-filter.js */ "hyCD")
const { intToHex, hexToInt } = __webpack_require__(/*! ./hexUtils */ "UJ2e")

module.exports = createEthFilterMiddleware

function createEthFilterMiddleware({ blockTracker, provider }) {

  // create filter collection
  let filterIndex = 0
  let filters = {}
  // create update mutex
  const mutex = new Mutex()
  const waitForFree = mutexMiddlewareWrapper({ mutex })

  const middleware = createJsonRpcMiddleware({
    // install filters
    eth_newFilter:                   waitForFree(toFilterCreationMiddleware(newLogFilter)),
    eth_newBlockFilter:              waitForFree(toFilterCreationMiddleware(newBlockFilter)),
    eth_newPendingTransactionFilter: waitForFree(toFilterCreationMiddleware(newPendingTransactionFilter)),
    // uninstall filters
    eth_uninstallFilter:             waitForFree(toAsyncRpcMiddleware(uninstallFilterHandler)),
    // checking filter changes
    eth_getFilterChanges:            waitForFree(toAsyncRpcMiddleware(getFilterChanges)),
    eth_getFilterLogs:               waitForFree(toAsyncRpcMiddleware(getFilterLogs)),
  })

  // setup filter updating and destroy handler
  const filterUpdater = async ({ oldBlock, newBlock }) => {
    if (filters.length === 0) return
    // lock update reads
    const releaseLock = await mutex.acquire()
    try {
      // process all filters in parallel
      await Promise.all(objValues(filters).map(async (filter) => {
        try {
         await filter.update({ oldBlock, newBlock })
        } catch (err) {
          // handle each error individually so filter update errors don't affect other filters
          console.error(err)
        }
      }))
    } catch (err) {
      // log error so we don't skip the releaseLock
      console.error(err)
    }
    // unlock update reads
    releaseLock()
  }

  // expose filter methods directly
  middleware.newLogFilter = newLogFilter
  middleware.newBlockFilter = newBlockFilter
  middleware.newPendingTransactionFilter = newPendingTransactionFilter
  middleware.uninstallFilter = uninstallFilterHandler
  middleware.getFilterChanges = getFilterChanges
  middleware.getFilterLogs = getFilterLogs

  // expose destroy method for cleanup
  middleware.destroy = () => {
    uninstallAllFilters()
  }

  return middleware

  //
  // new filters
  //

  async function newLogFilter(params) {
    const filter = new LogFilter({ provider, params })
    const filterIndex = await installFilter(filter)
    return filter
  }

  async function newBlockFilter() {
    const filter = new BlockFilter({ provider })
    const filterIndex = await installFilter(filter)
    return filter
  }

  async function newPendingTransactionFilter() {
    const filter = new TxFilter({ provider })
    const filterIndex = await installFilter(filter)
    return filter
  }

  //
  // get filter changes
  //

  async function getFilterChanges(filterIndexHex) {
    const filterIndex = hexToInt(filterIndexHex)
    const filter = filters[filterIndex]
    if (!filter) {
      throw new Error(`No filter for index "${filterIndex}"`)
    }
    const results = filter.getChangesAndClear()
    return results
  }

  async function getFilterLogs(filterIndexHex) {
    const filterIndex = hexToInt(filterIndexHex)
    const filter = filters[filterIndex]
    if (!filter) {
      throw new Error(`No filter for index "${filterIndex}"`)
    }
    // only return results for log filters
    if (filter.type === 'log') {
      results = filter.getAllResults()
    } else {
      results = []
    }
    return results
  }


  //
  // remove filters
  //


  async function uninstallFilterHandler(filterIndexHex) {
    // check filter exists
    const filterIndex = hexToInt(filterIndexHex)
    const filter = filters[filterIndex]
    const result = Boolean(filter)
    // uninstall filter
    if (result) {
      await uninstallFilter(filterIndex)
    }
    return result
  }

  //
  // utils
  //

  async function installFilter(filter) {
    const prevFilterCount = objValues(filters).length
    // install filter
    const currentBlock = await blockTracker.getLatestBlock()
    await filter.initialize({ currentBlock })
    filterIndex++
    filters[filterIndex] = filter
    filter.id = filterIndex
    filter.idHex = intToHex(filterIndex)
    // update block tracker subs
    const newFilterCount = objValues(filters).length
    updateBlockTrackerSubs({ prevFilterCount, newFilterCount })
    return filterIndex
  }

  async function uninstallFilter(filterIndex) {
    const prevFilterCount = objValues(filters).length
    delete filters[filterIndex]
    // update block tracker subs
    const newFilterCount = objValues(filters).length
    updateBlockTrackerSubs({ prevFilterCount, newFilterCount })
  }

  async function uninstallAllFilters() {
    const prevFilterCount = objValues(filters).length
    filters = {}
    // update block tracker subs
    updateBlockTrackerSubs({ prevFilterCount, newFilterCount: 0 })
  }

  function updateBlockTrackerSubs({ prevFilterCount, newFilterCount }) {
    // subscribe
    if (prevFilterCount === 0 && newFilterCount > 0) {
      blockTracker.on('sync', filterUpdater)
      return
    }
    // unsubscribe
    if (prevFilterCount > 0 && newFilterCount === 0) {
      blockTracker.removeListener('sync', filterUpdater)
      return
    }
  }

}

// helper for turning filter constructors into rpc middleware
function toFilterCreationMiddleware(createFilterFn) {
  return toAsyncRpcMiddleware(async (...args) => {
    const filter = await createFilterFn(...args)
    const result = intToHex(filter.id)
    return result
  })
}

// helper for pulling out req.params and setting res.result
function toAsyncRpcMiddleware(asyncFn) {
  return createAsyncMiddleware(async (req, res) => {
    const result = await asyncFn.apply(null, req.params)
    res.result = result
  })
}

function mutexMiddlewareWrapper({ mutex }) {
  return (middleware) => {
    return async (req, res, next, end) => {
      // wait for mutex available
      // we can release immediately because
      // we just need to make sure updates aren't active
      const releaseLock = await mutex.acquire()
      releaseLock()
      middleware(req, res, next, end)
    }
  }
}

function objValues(obj, fn){
  const values = []
  for (let key in obj) {
    values.push(obj[key])
  }
  return values
}


/***/ }),

/***/ "4CaD":
/*!*******************************************************************!*\
  !*** ./node_modules/eth-block-tracker/node_modules/pify/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processFn = (fn, opts) => function () {
	const P = opts.promiseModule;
	const args = new Array(arguments.length);

	for (let i = 0; i < arguments.length; i++) {
		args[i] = arguments[i];
	}

	return new P((resolve, reject) => {
		if (opts.errorFirst) {
			args.push(function (err, result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);

					for (let i = 1; i < arguments.length; i++) {
						results[i - 1] = arguments[i];
					}

					if (err) {
						results.unshift(err);
						reject(results);
					} else {
						resolve(results);
					}
				} else if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		} else {
			args.push(function (result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);

					for (let i = 0; i < arguments.length; i++) {
						results[i] = arguments[i];
					}

					resolve(results);
				} else {
					resolve(result);
				}
			});
		}

		fn.apply(this, args);
	});
};

module.exports = (obj, opts) => {
	opts = Object.assign({
		exclude: [/.+(Sync|Stream)$/],
		errorFirst: true,
		promiseModule: Promise
	}, opts);

	const filter = key => {
		const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
		return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
	};

	let ret;
	if (typeof obj === 'function') {
		ret = function () {
			if (opts.excludeMain) {
				return obj.apply(this, arguments);
			}

			return processFn(obj, opts).apply(this, arguments);
		};
	} else {
		ret = Object.create(Object.getPrototypeOf(obj));
	}

	for (const key in obj) { // eslint-disable-line guard-for-in
		const x = obj[key];
		ret[key] = typeof x === 'function' && filter(key) ? processFn(x, opts) : x;
	}

	return ret;
};


/***/ }),

/***/ "8Pg7":
/*!******************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/base-filter-history.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BaseFilter = __webpack_require__(/*! ./base-filter */ "zvTS")

// tracks all results ever recorded
class BaseFilterWithHistory extends BaseFilter {

  constructor () {
    super()
    this.allResults = []
  }

  async update () {
    throw new Error('BaseFilterWithHistory - no update method specified')
  }

  addResults (newResults) {
    this.allResults = this.allResults.concat(newResults)
    super.addResults(newResults)
  }

  addInitialResults (newResults) {
    this.allResults = this.allResults.concat(newResults)
    super.addInitialResults(newResults)
  }

  getAllResults () {
    return this.allResults
  }

}

module.exports = BaseFilterWithHistory

/***/ }),

/***/ "8sGB":
/*!*****************************************************!*\
  !*** ./node_modules/async-mutex/es6/withTimeout.js ***!
  \*****************************************************/
/*! exports provided: withTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTimeout", function() { return withTimeout; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function withTimeout(sync, timeout, timeoutError) {
    var _this = this;
    if (timeoutError === void 0) { timeoutError = new Error('timeout'); }
    return {
        acquire: function () {
            return new Promise(function (resolve, reject) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
                var isTimeout, ticket, release;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isTimeout = false;
                            setTimeout(function () {
                                isTimeout = true;
                                reject(timeoutError);
                            }, timeout);
                            return [4 /*yield*/, sync.acquire()];
                        case 1:
                            ticket = _a.sent();
                            if (isTimeout) {
                                release = Array.isArray(ticket) ? ticket[1] : ticket;
                                release();
                            }
                            else {
                                resolve(ticket);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        runExclusive: function (callback) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
                var release, ticket;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            release = function () { return undefined; };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 7, 8]);
                            return [4 /*yield*/, this.acquire()];
                        case 2:
                            ticket = _a.sent();
                            if (!Array.isArray(ticket)) return [3 /*break*/, 4];
                            release = ticket[1];
                            return [4 /*yield*/, callback(ticket[0])];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4:
                            release = ticket;
                            return [4 /*yield*/, callback()];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            release();
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        },
        release: function () {
            sync.release();
        },
        isLocked: function () { return sync.isLocked(); },
    };
}


/***/ }),

/***/ "Fj00":
/*!************************************************************!*\
  !*** ./node_modules/@metamask/safe-event-emitter/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(/*! events */ "+qE3");
function safeApply(handler, context, args) {
    try {
        Reflect.apply(handler, context, args);
    }
    catch (err) {
        // Throw error after timeout so as not to interrupt the stack
        setTimeout(() => {
            throw err;
        });
    }
}
function arrayClone(arr) {
    const n = arr.length;
    const copy = new Array(n);
    for (let i = 0; i < n; i += 1) {
        copy[i] = arr[i];
    }
    return copy;
}
class SafeEventEmitter extends events_1.EventEmitter {
    emit(type, ...args) {
        let doError = type === 'error';
        const events = this._events;
        if (events !== undefined) {
            doError = doError && events.error === undefined;
        }
        else if (!doError) {
            return false;
        }
        // If there is no 'error' event listener then throw.
        if (doError) {
            let er;
            if (args.length > 0) {
                [er] = args;
            }
            if (er instanceof Error) {
                // Note: The comments on the `throw` lines are intentional, they show
                // up in Node's output if this results in an unhandled exception.
                throw er; // Unhandled 'error' event
            }
            // At least give some kind of context to the user
            const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ''}`);
            err.context = er;
            throw err; // Unhandled 'error' event
        }
        const handler = events[type];
        if (handler === undefined) {
            return false;
        }
        if (typeof handler === 'function') {
            safeApply(handler, this, args);
        }
        else {
            const len = handler.length;
            const listeners = arrayClone(handler);
            for (let i = 0; i < len; i += 1) {
                safeApply(listeners[i], this, args);
            }
        }
        return true;
    }
}
exports.default = SafeEventEmitter;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "FqFB":
/*!*********************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/log-filter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EthQuery = __webpack_require__(/*! eth-query */ "QXrW")
const pify = __webpack_require__(/*! pify */ "h9tj")
const BaseFilterWithHistory = __webpack_require__(/*! ./base-filter-history */ "8Pg7")
const { bnToHex, hexToInt, incrementHexInt, minBlockRef, blockRefIsNumber } = __webpack_require__(/*! ./hexUtils */ "UJ2e")

class LogFilter extends BaseFilterWithHistory {

  constructor ({ provider, params }) {
    super()
    this.type = 'log'
    this.ethQuery = new EthQuery(provider)
    this.params = Object.assign({
      fromBlock: 'latest',
      toBlock: 'latest',
      address: undefined,
      topics: [],
    }, params)
    // normalize address parameter
    if (this.params.address) {
      // ensure array
      if (!Array.isArray(this.params.address)) {
        this.params.address = [this.params.address]
      }
      // ensure lowercase
      this.params.address = this.params.address.map(address => address.toLowerCase())
    }
  }

  async initialize({ currentBlock }) {
    // resolve params.fromBlock
    let fromBlock = this.params.fromBlock
    if (['latest', 'pending'].includes(fromBlock)) fromBlock = currentBlock
    if ('earliest' === fromBlock) fromBlock = '0x0'
    this.params.fromBlock = fromBlock
    // set toBlock for initial lookup
    const toBlock = minBlockRef(this.params.toBlock, currentBlock)
    const params = Object.assign({}, this.params, { toBlock })
    // fetch logs and add to results
    const newLogs = await this._fetchLogs(params)
    this.addInitialResults(newLogs)
  }

  async update ({ oldBlock, newBlock }) {
    // configure params for this update
    const toBlock = newBlock
    let fromBlock
    // oldBlock is empty on first sync
    if (oldBlock) {
      fromBlock = incrementHexInt(oldBlock)
    } else {
      fromBlock = newBlock
    }
    // fetch logs
    const params = Object.assign({}, this.params, { fromBlock, toBlock })
    const newLogs = await this._fetchLogs(params)
    const matchingLogs = newLogs.filter(log => this.matchLog(log))

    // add to results
    this.addResults(matchingLogs)
  }

  async _fetchLogs (params) {
    const newLogs = await pify(cb => this.ethQuery.getLogs(params, cb))()
    // add to results
    return newLogs
  }

  matchLog(log) {
    // check if block number in bounds:
    if (hexToInt(this.params.fromBlock) >= hexToInt(log.blockNumber)) return false
    if (blockRefIsNumber(this.params.toBlock) && hexToInt(this.params.toBlock) <= hexToInt(log.blockNumber)) return false

    // address is correct:
    const normalizedLogAddress = log.address && log.address.toLowerCase()
    if (this.params.address && normalizedLogAddress && !this.params.address.includes(normalizedLogAddress)) return false

    // topics match:
    // topics are position-dependant
    // topics can be nested to represent `or` [[a || b], c]
    // topics can be null, representing a wild card for that position
    const topicsMatch = this.params.topics.every((topicPattern, index) => {
      // pattern is longer than actual topics
      let logTopic = log.topics[index]
      if (!logTopic) return false
      logTopic = logTopic.toLowerCase()
      // normalize subTopics
      let subtopicsToMatch = Array.isArray(topicPattern) ? topicPattern : [topicPattern]
      // check for wild card
      const subtopicsIncludeWildcard = subtopicsToMatch.includes(null)
      if (subtopicsIncludeWildcard) return true
      subtopicsToMatch = subtopicsToMatch.map(topic => topic.toLowerCase())
      // check each possible matching topic
      const topicDoesMatch = subtopicsToMatch.includes(logTopic)
      return topicDoesMatch
    })

    return topicsMatch
  }

}

module.exports = LogFilter


/***/ }),

/***/ "LPKZ":
/*!********************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/createAsyncMiddleware.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsyncMiddleware = void 0;
/**
 * JsonRpcEngine only accepts callback-based middleware directly.
 * createAsyncMiddleware exists to enable consumers to pass in async middleware
 * functions.
 *
 * Async middleware have no "end" function. Instead, they "end" if they return
 * without calling "next". Rather than passing in explicit return handlers,
 * async middleware can simply await "next", and perform operations on the
 * response object when execution resumes.
 *
 * To accomplish this, createAsyncMiddleware passes the async middleware a
 * wrapped "next" function. That function calls the internal JsonRpcEngine
 * "next" function with a return handler that resolves a promise when called.
 *
 * The return handler will always be called. Its resolution of the promise
 * enables the control flow described above.
 */
function createAsyncMiddleware(asyncMiddleware) {
    return async (req, res, next, end) => {
        // nextPromise is the key to the implementation
        // it is resolved by the return handler passed to the
        // "next" function
        let resolveNextPromise;
        const nextPromise = new Promise((resolve) => {
            resolveNextPromise = resolve;
        });
        let returnHandlerCallback = null;
        let nextWasCalled = false;
        // This will be called by the consumer's async middleware.
        const asyncNext = async () => {
            nextWasCalled = true;
            // We pass a return handler to next(). When it is called by the engine,
            // the consumer's async middleware will resume executing.
            // eslint-disable-next-line node/callback-return
            next((runReturnHandlersCallback) => {
                // This callback comes from JsonRpcEngine._runReturnHandlers
                returnHandlerCallback = runReturnHandlersCallback;
                resolveNextPromise();
            });
            await nextPromise;
        };
        try {
            await asyncMiddleware(req, res, asyncNext);
            if (nextWasCalled) {
                await nextPromise; // we must wait until the return handler is called
                returnHandlerCallback(null);
            }
            else {
                end(null);
            }
        }
        catch (error) {
            if (returnHandlerCallback) {
                returnHandlerCallback(error);
            }
            else {
                end(error);
            }
        }
    };
}
exports.createAsyncMiddleware = createAsyncMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQXN5bmNNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZUFzeW5jTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFnQkE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFnQixxQkFBcUIsQ0FDbkMsZUFBNkM7SUFFN0MsT0FBTyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbkMsK0NBQStDO1FBQy9DLHFEQUFxRDtRQUNyRCxrQkFBa0I7UUFDbEIsSUFBSSxrQkFBOEIsQ0FBQztRQUNuQyxNQUFNLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUkscUJBQXFCLEdBQVksSUFBSSxDQUFDO1FBQzFDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUxQiwwREFBMEQ7UUFDMUQsTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDM0IsYUFBYSxHQUFHLElBQUksQ0FBQztZQUVyQix1RUFBdUU7WUFDdkUseURBQXlEO1lBQ3pELGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO2dCQUNqQyw0REFBNEQ7Z0JBQzVELHFCQUFxQixHQUFHLHlCQUF5QixDQUFDO2dCQUNsRCxrQkFBa0IsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxXQUFXLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBRUYsSUFBSTtZQUNGLE1BQU0sZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFM0MsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLE1BQU0sV0FBVyxDQUFDLENBQUMsa0RBQWtEO2dCQUNwRSxxQkFBK0MsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4RDtpQkFBTTtnQkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDWDtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLHFCQUFxQixFQUFFO2dCQUN4QixxQkFBK0MsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDWjtTQUNGO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQS9DRCxzREErQ0MifQ==

/***/ }),

/***/ "MS7i":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/eth-json-rpc-middleware/node_modules/json-rpc-engine/src/createScaffoldMiddleware.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function createScaffoldMiddleware (handlers) {
  return (req, res, next, end) => {
    const handler = handlers[req.method]
    // if no handler, return
    if (handler === undefined) {
      return next()
    }
    // if handler is fn, call as middleware
    if (typeof handler === 'function') {
      return handler(req, res, next, end)
    }
    // if handler is some other value, use as result
    res.result = handler
    return end()
  }
}


/***/ }),

/***/ "QXrW":
/*!*****************************************!*\
  !*** ./node_modules/eth-query/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const extend = __webpack_require__(/*! xtend */ "U6jy")
const createRandomId = __webpack_require__(/*! json-rpc-random-id */ "2J3U")()

module.exports = EthQuery


function EthQuery(provider){
  const self = this
  self.currentProvider = provider
}

//
// base queries
//

// default block
EthQuery.prototype.getBalance =                          generateFnWithDefaultBlockFor(2, 'eth_getBalance')
EthQuery.prototype.getCode =                             generateFnWithDefaultBlockFor(2, 'eth_getCode')
EthQuery.prototype.getTransactionCount =                 generateFnWithDefaultBlockFor(2, 'eth_getTransactionCount')
EthQuery.prototype.getStorageAt =                        generateFnWithDefaultBlockFor(3, 'eth_getStorageAt')
EthQuery.prototype.call =                                generateFnWithDefaultBlockFor(2, 'eth_call')
// standard
EthQuery.prototype.protocolVersion =                     generateFnFor('eth_protocolVersion')
EthQuery.prototype.syncing =                             generateFnFor('eth_syncing')
EthQuery.prototype.coinbase =                            generateFnFor('eth_coinbase')
EthQuery.prototype.mining =                              generateFnFor('eth_mining')
EthQuery.prototype.hashrate =                            generateFnFor('eth_hashrate')
EthQuery.prototype.gasPrice =                            generateFnFor('eth_gasPrice')
EthQuery.prototype.accounts =                            generateFnFor('eth_accounts')
EthQuery.prototype.blockNumber =                         generateFnFor('eth_blockNumber')
EthQuery.prototype.getBlockTransactionCountByHash =      generateFnFor('eth_getBlockTransactionCountByHash')
EthQuery.prototype.getBlockTransactionCountByNumber =    generateFnFor('eth_getBlockTransactionCountByNumber')
EthQuery.prototype.getUncleCountByBlockHash =            generateFnFor('eth_getUncleCountByBlockHash')
EthQuery.prototype.getUncleCountByBlockNumber =          generateFnFor('eth_getUncleCountByBlockNumber')
EthQuery.prototype.sign =                                generateFnFor('eth_sign')
EthQuery.prototype.sendTransaction =                     generateFnFor('eth_sendTransaction')
EthQuery.prototype.sendRawTransaction =                  generateFnFor('eth_sendRawTransaction')
EthQuery.prototype.estimateGas =                         generateFnFor('eth_estimateGas')
EthQuery.prototype.getBlockByHash =                      generateFnFor('eth_getBlockByHash')
EthQuery.prototype.getBlockByNumber =                    generateFnFor('eth_getBlockByNumber')
EthQuery.prototype.getTransactionByHash =                generateFnFor('eth_getTransactionByHash')
EthQuery.prototype.getTransactionByBlockHashAndIndex =   generateFnFor('eth_getTransactionByBlockHashAndIndex')
EthQuery.prototype.getTransactionByBlockNumberAndIndex = generateFnFor('eth_getTransactionByBlockNumberAndIndex')
EthQuery.prototype.getTransactionReceipt =               generateFnFor('eth_getTransactionReceipt')
EthQuery.prototype.getUncleByBlockHashAndIndex =         generateFnFor('eth_getUncleByBlockHashAndIndex')
EthQuery.prototype.getUncleByBlockNumberAndIndex =       generateFnFor('eth_getUncleByBlockNumberAndIndex')
EthQuery.prototype.getCompilers =                        generateFnFor('eth_getCompilers')
EthQuery.prototype.compileLLL =                          generateFnFor('eth_compileLLL')
EthQuery.prototype.compileSolidity =                     generateFnFor('eth_compileSolidity')
EthQuery.prototype.compileSerpent =                      generateFnFor('eth_compileSerpent')
EthQuery.prototype.newFilter =                           generateFnFor('eth_newFilter')
EthQuery.prototype.newBlockFilter =                      generateFnFor('eth_newBlockFilter')
EthQuery.prototype.newPendingTransactionFilter =         generateFnFor('eth_newPendingTransactionFilter')
EthQuery.prototype.uninstallFilter =                     generateFnFor('eth_uninstallFilter')
EthQuery.prototype.getFilterChanges =                    generateFnFor('eth_getFilterChanges')
EthQuery.prototype.getFilterLogs =                       generateFnFor('eth_getFilterLogs')
EthQuery.prototype.getLogs =                             generateFnFor('eth_getLogs')
EthQuery.prototype.getWork =                             generateFnFor('eth_getWork')
EthQuery.prototype.submitWork =                          generateFnFor('eth_submitWork')
EthQuery.prototype.submitHashrate =                      generateFnFor('eth_submitHashrate')

// network level

EthQuery.prototype.sendAsync = function(opts, cb){
  const self = this
  self.currentProvider.sendAsync(createPayload(opts), function(err, response){
    if (!err && response.error) err = new Error('EthQuery - RPC Error - '+response.error.message)
    if (err) return cb(err)
    cb(null, response.result)
  })
}

// util

function generateFnFor(methodName){
  return function(){
    const self = this
    var args = [].slice.call(arguments)
    var cb = args.pop()
    self.sendAsync({
      method: methodName,
      params: args,
    }, cb)
  }
}

function generateFnWithDefaultBlockFor(argCount, methodName){
  return function(){
    const self = this
    var args = [].slice.call(arguments)
    var cb = args.pop()
    // set optional default block param
    if (args.length < argCount) args.push('latest')
    self.sendAsync({
      method: methodName,
      params: args,
    }, cb)
  }
}

function createPayload(data){
  return extend({
    // defaults
    id: createRandomId(),
    jsonrpc: '2.0',
    params: [],
    // user-specified
  }, data)
}


/***/ }),

/***/ "RhWC":
/*!**********************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/getUniqueId.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueId = void 0;
// uint32 (two's complement) max
// more conservative than Number.MAX_SAFE_INTEGER
const MAX = 4294967295;
let idCounter = Math.floor(Math.random() * MAX);
function getUniqueId() {
    idCounter = (idCounter + 1) % MAX;
    return idCounter;
}
exports.getUniqueId = getUniqueId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5pcXVlSWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2V0VW5pcXVlSWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQWdDO0FBQ2hDLGlEQUFpRDtBQUNqRCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUM7QUFDdkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFFaEQsU0FBZ0IsV0FBVztJQUN6QixTQUFTLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2xDLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFIRCxrQ0FHQyJ9

/***/ }),

/***/ "UJ2e":
/*!*******************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/hexUtils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = {
  minBlockRef,
  maxBlockRef,
  sortBlockRefs,
  bnToHex,
  blockRefIsNumber,
  hexToInt,
  incrementHexInt,
  intToHex,
  unsafeRandomBytes,
}

function minBlockRef(...refs) {
  const sortedRefs = sortBlockRefs(refs)
  return sortedRefs[0]
}

function maxBlockRef(...refs) {
  const sortedRefs = sortBlockRefs(refs)
  return sortedRefs[sortedRefs.length-1]
}

function sortBlockRefs(refs) {
  return refs.sort((refA, refB) => {
    if (refA === 'latest' || refB === 'earliest') return 1
    if (refB === 'latest' || refA === 'earliest') return -1
    return hexToInt(refA) - hexToInt(refB)
  })
}

function bnToHex(bn) {
  return '0x' + bn.toString(16)
}

function blockRefIsNumber(blockRef){
  return blockRef && !['earliest', 'latest', 'pending'].includes(blockRef)
}

function hexToInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString
  return Number.parseInt(hexString, 16)
}

function incrementHexInt(hexString){
  if (hexString === undefined || hexString === null) return hexString
  const value = hexToInt(hexString)
  return intToHex(value + 1)
}

function intToHex(int) {
  if (int === undefined || int === null) return int
  let hexString = int.toString(16)
  const needsLeftPad = hexString.length % 2
  if (needsLeftPad) hexString = '0' + hexString
  return '0x' + hexString
}

function unsafeRandomBytes(byteCount) {
  let result = '0x'
  for (let i = 0; i < byteCount; i++) {
    result += unsafeRandomNibble()
    result += unsafeRandomNibble()
  }
  return result
}

function unsafeRandomNibble() {
  return Math.floor(Math.random() * 16).toString(16)
}


/***/ }),

/***/ "V5x4":
/*!*******************************************************!*\
  !*** ./node_modules/eth-block-tracker/src/polling.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const pify = __webpack_require__(/*! pify */ "4CaD")
const BaseBlockTracker = __webpack_require__(/*! ./base */ "/u+i")

const sec = 1000

class PollingBlockTracker extends BaseBlockTracker {

  constructor (opts = {}) {
    // parse + validate args
    if (!opts.provider) throw new Error('PollingBlockTracker - no provider specified.')
    const pollingInterval = opts.pollingInterval || 20 * sec
    const retryTimeout = opts.retryTimeout || pollingInterval / 10
    const keepEventLoopActive = opts.keepEventLoopActive !== undefined ? opts.keepEventLoopActive : true
    const setSkipCacheFlag = opts.setSkipCacheFlag || false
    // BaseBlockTracker constructor
    super(Object.assign({
      blockResetDuration: pollingInterval,
    }, opts))
    // config
    this._provider = opts.provider
    this._pollingInterval = pollingInterval
    this._retryTimeout = retryTimeout
    this._keepEventLoopActive = keepEventLoopActive
    this._setSkipCacheFlag = setSkipCacheFlag
  }

  //
  // public
  //

  // trigger block polling
  async checkForLatestBlock () {
    await this._updateLatestBlock()
    return await this.getLatestBlock()
  }

  //
  // private
  //

  _start () {
    this._performSync().catch(err => this.emit('error', err))
  }

  async _performSync () {
    while (this._isRunning) {
      try {
        await this._updateLatestBlock()
        await timeout(this._pollingInterval, !this._keepEventLoopActive)
      } catch (err) {
        const newErr = new Error(`PollingBlockTracker - encountered an error while attempting to update latest block:\n${err.stack}`)
        try {
          this.emit('error', newErr)
        } catch (emitErr) {
          console.error(newErr)
        }
        await timeout(this._retryTimeout, !this._keepEventLoopActive)
      }
    }
  }

  async _updateLatestBlock () {
    // fetch + set latest block
    const latestBlock = await this._fetchLatestBlock()
    this._newPotentialLatest(latestBlock)
  }

  async _fetchLatestBlock () {
    const req = { jsonrpc: "2.0", id: 1, method: 'eth_blockNumber', params: [] }
    if (this._setSkipCacheFlag) req.skipCache = true
    const res = await pify((cb) => this._provider.sendAsync(req, cb))()
    if (res.error) throw new Error(`PollingBlockTracker - encountered error fetching block:\n${res.error}`)
    return res.result
  }

}

module.exports = PollingBlockTracker

function timeout (duration, unref) {
  return new Promise(resolve => {
    const timoutRef = setTimeout(resolve, duration)
    // don't keep process open
    if (timoutRef.unref && unref) {
      timoutRef.unref()
    }
  })
}


/***/ }),

/***/ "X+co":
/*!************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/JsonRpcEngine.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcEngine = void 0;
const safe_event_emitter_1 = __importDefault(__webpack_require__(/*! @metamask/safe-event-emitter */ "Fj00"));
const eth_rpc_errors_1 = __webpack_require__(/*! eth-rpc-errors */ "T2gh");
/**
 * A JSON-RPC request and response processor.
 * Give it a stack of middleware, pass it requests, and get back responses.
 */
class JsonRpcEngine extends safe_event_emitter_1.default {
    constructor() {
        super();
        this._middleware = [];
    }
    /**
     * Add a middleware function to the engine's middleware stack.
     *
     * @param middleware - The middleware function to add.
     */
    push(middleware) {
        this._middleware.push(middleware);
    }
    handle(req, cb) {
        if (cb && typeof cb !== 'function') {
            throw new Error('"callback" must be a function if provided.');
        }
        if (Array.isArray(req)) {
            if (cb) {
                return this._handleBatch(req, cb);
            }
            return this._handleBatch(req);
        }
        if (cb) {
            return this._handle(req, cb);
        }
        return this._promiseHandle(req);
    }
    /**
     * Returns this engine as a middleware function that can be pushed to other
     * engines.
     *
     * @returns This engine as a middleware function.
     */
    asMiddleware() {
        return async (req, res, next, end) => {
            try {
                const [middlewareError, isComplete, returnHandlers,] = await JsonRpcEngine._runAllMiddleware(req, res, this._middleware);
                if (isComplete) {
                    await JsonRpcEngine._runReturnHandlers(returnHandlers);
                    return end(middlewareError);
                }
                return next(async (handlerCallback) => {
                    try {
                        await JsonRpcEngine._runReturnHandlers(returnHandlers);
                    }
                    catch (error) {
                        return handlerCallback(error);
                    }
                    return handlerCallback();
                });
            }
            catch (error) {
                return end(error);
            }
        };
    }
    async _handleBatch(reqs, cb) {
        // The order here is important
        try {
            // 2. Wait for all requests to finish, or throw on some kind of fatal
            // error
            const responses = await Promise.all(
            // 1. Begin executing each request in the order received
            reqs.map(this._promiseHandle.bind(this)));
            // 3. Return batch response
            if (cb) {
                return cb(null, responses);
            }
            return responses;
        }
        catch (error) {
            if (cb) {
                return cb(error);
            }
            throw error;
        }
    }
    /**
     * A promise-wrapped _handle.
     */
    _promiseHandle(req) {
        return new Promise((resolve) => {
            this._handle(req, (_err, res) => {
                // There will always be a response, and it will always have any error
                // that is caught and propagated.
                resolve(res);
            });
        });
    }
    /**
     * Ensures that the request object is valid, processes it, and passes any
     * error and the response object to the given callback.
     *
     * Does not reject.
     */
    async _handle(callerReq, cb) {
        if (!callerReq ||
            Array.isArray(callerReq) ||
            typeof callerReq !== 'object') {
            const error = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, `Requests must be plain objects. Received: ${typeof callerReq}`, { request: callerReq });
            return cb(error, { id: undefined, jsonrpc: '2.0', error });
        }
        if (typeof callerReq.method !== 'string') {
            const error = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, `Must specify a string method. Received: ${typeof callerReq.method}`, { request: callerReq });
            return cb(error, { id: callerReq.id, jsonrpc: '2.0', error });
        }
        const req = Object.assign({}, callerReq);
        const res = {
            id: req.id,
            jsonrpc: req.jsonrpc,
        };
        let error = null;
        try {
            await this._processRequest(req, res);
        }
        catch (_error) {
            // A request handler error, a re-thrown middleware error, or something
            // unexpected.
            error = _error;
        }
        if (error) {
            // Ensure no result is present on an errored response
            delete res.result;
            if (!res.error) {
                res.error = eth_rpc_errors_1.serializeError(error);
            }
        }
        return cb(error, res);
    }
    /**
     * For the given request and response, runs all middleware and their return
     * handlers, if any, and ensures that internal request processing semantics
     * are satisfied.
     */
    async _processRequest(req, res) {
        const [error, isComplete, returnHandlers,] = await JsonRpcEngine._runAllMiddleware(req, res, this._middleware);
        // Throw if "end" was not called, or if the response has neither a result
        // nor an error.
        JsonRpcEngine._checkForCompletion(req, res, isComplete);
        // The return handlers should run even if an error was encountered during
        // middleware processing.
        await JsonRpcEngine._runReturnHandlers(returnHandlers);
        // Now we re-throw the middleware processing error, if any, to catch it
        // further up the call chain.
        if (error) {
            throw error;
        }
    }
    /**
     * Serially executes the given stack of middleware.
     *
     * @returns An array of any error encountered during middleware execution,
     * a boolean indicating whether the request was completed, and an array of
     * middleware-defined return handlers.
     */
    static async _runAllMiddleware(req, res, middlewareStack) {
        const returnHandlers = [];
        let error = null;
        let isComplete = false;
        // Go down stack of middleware, call and collect optional returnHandlers
        for (const middleware of middlewareStack) {
            [error, isComplete] = await JsonRpcEngine._runMiddleware(req, res, middleware, returnHandlers);
            if (isComplete) {
                break;
            }
        }
        return [error, isComplete, returnHandlers.reverse()];
    }
    /**
     * Runs an individual middleware.
     *
     * @returns An array of any error encountered during middleware exection,
     * and a boolean indicating whether the request should end.
     */
    static _runMiddleware(req, res, middleware, returnHandlers) {
        return new Promise((resolve) => {
            const end = (err) => {
                const error = err || res.error;
                if (error) {
                    res.error = eth_rpc_errors_1.serializeError(error);
                }
                // True indicates that the request should end
                resolve([error, true]);
            };
            const next = (returnHandler) => {
                if (res.error) {
                    end(res.error);
                }
                else {
                    if (returnHandler) {
                        if (typeof returnHandler !== 'function') {
                            end(new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: "next" return handlers must be functions. ` +
                                `Received "${typeof returnHandler}" for request:\n${jsonify(req)}`, { request: req }));
                        }
                        returnHandlers.push(returnHandler);
                    }
                    // False indicates that the request should not end
                    resolve([null, false]);
                }
            };
            try {
                middleware(req, res, next, end);
            }
            catch (error) {
                end(error);
            }
        });
    }
    /**
     * Serially executes array of return handlers. The request and response are
     * assumed to be in their scope.
     */
    static async _runReturnHandlers(handlers) {
        for (const handler of handlers) {
            await new Promise((resolve, reject) => {
                handler((err) => (err ? reject(err) : resolve()));
            });
        }
    }
    /**
     * Throws an error if the response has neither a result nor an error, or if
     * the "isComplete" flag is falsy.
     */
    static _checkForCompletion(req, res, isComplete) {
        if (!('result' in res) && !('error' in res)) {
            throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: Response has no error or result for request:\n${jsonify(req)}`, { request: req });
        }
        if (!isComplete) {
            throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: Nothing ended request:\n${jsonify(req)}`, { request: req });
        }
    }
}
exports.JsonRpcEngine = JsonRpcEngine;
function jsonify(request) {
    return JSON.stringify(request, null, 2);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnNvblJwY0VuZ2luZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Kc29uUnBjRW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNGQUE0RDtBQUM1RCxtREFBOEU7QUF1RjlFOzs7R0FHRztBQUNILE1BQWEsYUFBYyxTQUFRLDRCQUFnQjtJQUdqRDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLENBQU8sVUFBbUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBaUQsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUEyQ0QsTUFBTSxDQUFDLEdBQVksRUFBRSxFQUFRO1FBQzNCLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTtZQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxFQUFFLEVBQUU7Z0JBQ04sT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNuQztZQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksRUFBRSxFQUFFO1lBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQThCLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDekQ7UUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBOEIsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFlBQVk7UUFDVixPQUFPLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNuQyxJQUFJ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

/***/ }),

/***/ "XW5J":
/*!****************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/idRemapMiddleware.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdRemapMiddleware = void 0;
const getUniqueId_1 = __webpack_require__(/*! ./getUniqueId */ "RhWC");
function createIdRemapMiddleware() {
    return (req, res, next, _end) => {
        const originalId = req.id;
        const newId = getUniqueId_1.getUniqueId();
        req.id = newId;
        res.id = newId;
        next((done) => {
            req.id = originalId;
            res.id = originalId;
            done();
        });
    };
}
exports.createIdRemapMiddleware = createIdRemapMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRSZW1hcE1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRSZW1hcE1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQTRDO0FBRzVDLFNBQWdCLHVCQUF1QjtJQUNyQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDOUIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUMxQixNQUFNLEtBQUssR0FBRyx5QkFBVyxFQUFFLENBQUM7UUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDZixHQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNmLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1osR0FBRyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDcEIsR0FBRyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDcEIsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUM7QUFaRCwwREFZQyJ9

/***/ }),

/***/ "Yxjv":
/*!***********************************************!*\
  !*** ./node_modules/async-mutex/es6/Mutex.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _Semaphore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Semaphore */ "co6y");


var Mutex = /** @class */ (function () {
    function Mutex() {
        this._semaphore = new _Semaphore__WEBPACK_IMPORTED_MODULE_1__["default"](1);
    }
    Mutex.prototype.acquire = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, releaser;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._semaphore.acquire()];
                    case 1:
                        _a = _b.sent(), releaser = _a[1];
                        return [2 /*return*/, releaser];
                }
            });
        });
    };
    Mutex.prototype.runExclusive = function (callback) {
        return this._semaphore.runExclusive(function () { return callback(); });
    };
    Mutex.prototype.isLocked = function () {
        return this._semaphore.isLocked();
    };
    Mutex.prototype.release = function () {
        this._semaphore.release();
    };
    return Mutex;
}());
/* harmony default export */ __webpack_exports__["default"] = (Mutex);


/***/ }),

/***/ "co6y":
/*!***************************************************!*\
  !*** ./node_modules/async-mutex/es6/Semaphore.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

var Semaphore = /** @class */ (function () {
    function Semaphore(_maxConcurrency) {
        this._maxConcurrency = _maxConcurrency;
        this._queue = [];
        if (_maxConcurrency <= 0) {
            throw new Error('semaphore must be initialized to a positive value');
        }
        this._value = _maxConcurrency;
    }
    Semaphore.prototype.acquire = function () {
        var _this = this;
        var locked = this.isLocked();
        var ticket = new Promise(function (r) { return _this._queue.push(r); });
        if (!locked)
            this._dispatch();
        return ticket;
    };
    Semaphore.prototype.runExclusive = function (callback) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, value, release;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.acquire()];
                    case 1:
                        _a = _b.sent(), value = _a[0], release = _a[1];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 4, 5]);
                        return [4 /*yield*/, callback(value)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        release();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Semaphore.prototype.isLocked = function () {
        return this._value <= 0;
    };
    Semaphore.prototype.release = function () {
        if (this._maxConcurrency > 1) {
            throw new Error('this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead');
        }
        if (this._currentReleaser) {
            var releaser = this._currentReleaser;
            this._currentReleaser = undefined;
            releaser();
        }
    };
    Semaphore.prototype._dispatch = function () {
        var _this = this;
        var nextConsumer = this._queue.shift();
        if (!nextConsumer)
            return;
        var released = false;
        this._currentReleaser = function () {
            if (released)
                return;
            released = true;
            _this._value++;
            _this._dispatch();
        };
        nextConsumer([this._value--, this._currentReleaser]);
    };
    return Semaphore;
}());
/* harmony default export */ __webpack_exports__["default"] = (Semaphore);


/***/ }),

/***/ "h9tj":
/*!**********************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/node_modules/pify/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processFn = (fn, options, proxy, unwrapped) => function (...arguments_) {
	const P = options.promiseModule;

	return new P((resolve, reject) => {
		if (options.multiArgs) {
			arguments_.push((...result) => {
				if (options.errorFirst) {
					if (result[0]) {
						reject(result);
					} else {
						result.shift();
						resolve(result);
					}
				} else {
					resolve(result);
				}
			});
		} else if (options.errorFirst) {
			arguments_.push((error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		} else {
			arguments_.push(resolve);
		}

		const self = this === proxy ? unwrapped : this;
		Reflect.apply(fn, self, arguments_);
	});
};

const filterCache = new WeakMap();

module.exports = (input, options) => {
	options = {
		exclude: [/.+(?:Sync|Stream)$/],
		errorFirst: true,
		promiseModule: Promise,
		...options
	};

	const objectType = typeof input;
	if (!(input !== null && (objectType === 'object' || objectType === 'function'))) {
		throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? 'null' : objectType}\``);
	}

	const filter = (target, key) => {
		let cached = filterCache.get(target);

		if (!cached) {
			cached = {};
			filterCache.set(target, cached);
		}

		if (key in cached) {
			return cached[key];
		}

		const match = pattern => (typeof pattern === 'string' || typeof key === 'symbol') ? key === pattern : pattern.test(key);
		const desc = Reflect.getOwnPropertyDescriptor(target, key);
		const writableOrConfigurableOwn = (desc === undefined || desc.writable || desc.configurable);
		const included = options.include ? options.include.some(match) : !options.exclude.some(match);
		const shouldFilter = included && writableOrConfigurableOwn;
		cached[key] = shouldFilter;
		return shouldFilter;
	};

	const cache = new WeakMap();

	const proxy = new Proxy(input, {
		apply(target, thisArg, args) {
			const cached = cache.get(target);

			if (cached) {
				return Reflect.apply(cached, thisArg, args);
			}

			const pified = options.excludeMain ? target : processFn(target, options, proxy, target);
			cache.set(target, pified);
			return Reflect.apply(pified, thisArg, args);
		},

		get(target, key) {
			const property = target[key];

			// eslint-disable-next-line no-use-extend-native/no-use-extend-native
			if (!filter(target, key) || property === Function.prototype[key]) {
				return property;
			}

			const cached = cache.get(property);

			if (cached) {
				return cached;
			}

			if (typeof property === 'function') {
				const pified = processFn(property, options, proxy, target);
				cache.set(property, pified);
				return pified;
			}

			return property;
		}
	});

	return proxy;
};


/***/ }),

/***/ "hyCD":
/*!********************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/tx-filter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BaseFilter = __webpack_require__(/*! ./base-filter */ "zvTS")
const getBlocksForRange = __webpack_require__(/*! ./getBlocksForRange */ "0QlC")
const { incrementHexInt } = __webpack_require__(/*! ./hexUtils */ "UJ2e")

class TxFilter extends BaseFilter {

  constructor ({ provider }) {
    super()
    this.type = 'tx'
    this.provider = provider
  }

  async update ({ oldBlock }) {
    const toBlock = oldBlock
    const fromBlock = incrementHexInt(oldBlock)
    const blocks = await getBlocksForRange({ provider: this.provider, fromBlock, toBlock })
    const blockTxHashes = []
    for (const block of blocks) {
      blockTxHashes.push(...block.transactions)
    }
    // add to results
    this.addResults(blockTxHashes)
  }

}

module.exports = TxFilter


/***/ }),

/***/ "llSS":
/*!****************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./idRemapMiddleware */ "XW5J"), exports);
__exportStar(__webpack_require__(/*! ./createAsyncMiddleware */ "LPKZ"), exports);
__exportStar(__webpack_require__(/*! ./createScaffoldMiddleware */ "vhlx"), exports);
__exportStar(__webpack_require__(/*! ./getUniqueId */ "RhWC"), exports);
__exportStar(__webpack_require__(/*! ./JsonRpcEngine */ "X+co"), exports);
__exportStar(__webpack_require__(/*! ./mergeMiddleware */ "1Ti9"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW9DO0FBQ3BDLDBEQUF3QztBQUN4Qyw2REFBMkM7QUFDM0MsZ0RBQThCO0FBQzlCLGtEQUFnQztBQUNoQyxvREFBa0MifQ==

/***/ }),

/***/ "q6/2":
/*!***********************************************!*\
  !*** ./node_modules/async-mutex/es6/index.js ***!
  \***********************************************/
/*! exports provided: Mutex, Semaphore, withTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mutex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mutex */ "Yxjv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mutex", function() { return _Mutex__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Semaphore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Semaphore */ "co6y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Semaphore", function() { return _Semaphore__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _withTimeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./withTimeout */ "8sGB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withTimeout", function() { return _withTimeout__WEBPACK_IMPORTED_MODULE_2__["withTimeout"]; });






/***/ }),

/***/ "rW7p":
/*!***********************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/block-filter.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BaseFilter = __webpack_require__(/*! ./base-filter */ "zvTS")
const getBlocksForRange = __webpack_require__(/*! ./getBlocksForRange */ "0QlC")
const { incrementHexInt } = __webpack_require__(/*! ./hexUtils */ "UJ2e")

class BlockFilter extends BaseFilter {

  constructor ({ provider, params }) {
    super()
    this.type = 'block'
    this.provider = provider
  }

  async update ({ oldBlock, newBlock }) {
    const toBlock = newBlock
    const fromBlock = incrementHexInt(oldBlock)
    const blockBodies = await getBlocksForRange({ provider: this.provider, fromBlock, toBlock })
    const blockHashes = blockBodies.map((block) => block.hash)
    this.addResults(blockHashes)
  }

}

module.exports = BlockFilter


/***/ }),

/***/ "t7TP":
/*!******************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/subscriptionManager.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const SafeEventEmitter = __webpack_require__(/*! @metamask/safe-event-emitter */ "Fj00").default
const createScaffoldMiddleware = __webpack_require__(/*! eth-json-rpc-middleware/scaffold */ "/UYa")
const { createAsyncMiddleware } = __webpack_require__(/*! json-rpc-engine */ "llSS")
const createFilterMiddleware = __webpack_require__(/*! ./index.js */ "2nhq")
const { unsafeRandomBytes, incrementHexInt } = __webpack_require__(/*! ./hexUtils.js */ "UJ2e")
const getBlocksForRange = __webpack_require__(/*! ./getBlocksForRange.js */ "0QlC")

module.exports = createSubscriptionMiddleware


function createSubscriptionMiddleware({ blockTracker, provider }) {
  // state and utilities for handling subscriptions
  const subscriptions = {}
  const filterManager = createFilterMiddleware({ blockTracker, provider })

  // internal flag
  let isDestroyed = false

  // create subscriptionManager api object
  const events = new SafeEventEmitter()
  const middleware = createScaffoldMiddleware({
    eth_subscribe: createAsyncMiddleware(subscribe),
    eth_unsubscribe: createAsyncMiddleware(unsubscribe),
  })
  middleware.destroy = destroy
  return { events, middleware }

  async function subscribe(req, res) {

    if (isDestroyed) throw new Error(
      'SubscriptionManager - attempting to use after destroying'
    )

    const subscriptionType = req.params[0]
    // subId is 16 byte hex string
    const subId = unsafeRandomBytes(16)

    // create sub
    let sub
    switch (subscriptionType) {
      case 'newHeads':
        sub = createSubNewHeads({ subId })
        break
      case 'logs':
        const filterParams = req.params[1]
        const filter = await filterManager.newLogFilter(filterParams)
        sub = createSubFromFilter({ subId, filter })
        break
      default:
        throw new Error(`SubscriptionManager - unsupported subscription type "${subscriptionType}"`)

    }
    subscriptions[subId] = sub

    res.result = subId
    return

    function createSubNewHeads({ subId }) {
      const sub = {
        type: subscriptionType,
        destroy: async () => {
          blockTracker.removeListener('sync', sub.update)
        },
        update: async ({ oldBlock, newBlock }) => {
          // for newHeads
          const toBlock = newBlock
          const fromBlock = incrementHexInt(oldBlock)
          const rawBlocks = await getBlocksForRange({ provider, fromBlock, toBlock })
          const results = rawBlocks.map(normalizeBlock)
          results.forEach((value) => {
            _emitSubscriptionResult(subId, value)
          })
        }
      }
      // check for subscription updates on new block
      blockTracker.on('sync', sub.update)
      return sub
    }

    function createSubFromFilter({ subId, filter }){
      filter.on('update', result => _emitSubscriptionResult(subId, result))
      const sub = {
        type: subscriptionType,
        destroy: async () => {
          return await filterManager.uninstallFilter(filter.idHex)
        },
      }
      return sub
    }
  }

  async function unsubscribe(req, res) {

    if (isDestroyed) throw new Error(
      'SubscriptionManager - attempting to use after destroying'
    )

    const id = req.params[0]
    const subscription = subscriptions[id]
    // if missing, return "false" to indicate it was not removed
    if (!subscription) {
      res.result = false
      return
    }
    // cleanup subscription
    delete subscriptions[id]
    await subscription.destroy()
    res.result = true
  }

  function _emitSubscriptionResult(filterIdHex, value) {
    events.emit('notification', {
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: {
        subscription: filterIdHex,
        result: value,
      },
    })
  }

  function destroy () {
    events.removeAllListeners()
    for (const id in subscriptions) {
      subscriptions[id].destroy()
      delete subscriptions[id]
    }
    isDestroyed = true
  }
}

function normalizeBlock(block) {
  return {
    hash: block.hash,
    parentHash: block.parentHash,
    sha3Uncles: block.sha3Uncles,
    miner: block.miner,
    stateRoot: block.stateRoot,
    transactionsRoot: block.transactionsRoot,
    receiptsRoot: block.receiptsRoot,
    logsBloom: block.logsBloom,
    difficulty: block.difficulty,
    number: block.number,
    gasLimit: block.gasLimit,
    gasUsed: block.gasUsed,
    nonce: block.nonce,
    mixHash: block.mixHash,
    timestamp: block.timestamp,
    extraData: block.extraData,
  }
}


/***/ }),

/***/ "vhlx":
/*!***********************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/createScaffoldMiddleware.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createScaffoldMiddleware = void 0;
function createScaffoldMiddleware(handlers) {
    return (req, res, next, end) => {
        const handler = handlers[req.method];
        // if no handler, return
        if (handler === undefined) {
            return next();
        }
        // if handler is fn, call as middleware
        if (typeof handler === 'function') {
            return handler(req, res, next, end);
        }
        // if handler is some other value, use as result
        res.result = handler;
        return end();
    };
}
exports.createScaffoldMiddleware = createScaffoldMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlU2NhZmZvbGRNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZVNjYWZmb2xkTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxTQUFnQix3QkFBd0IsQ0FBQyxRQUV4QztJQUNDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM3QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLHdCQUF3QjtRQUN4QixJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDekIsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNmO1FBQ0QsdUNBQXVDO1FBQ3ZDLElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQ2pDLE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsZ0RBQWdEO1FBQy9DLEdBQStCLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUNsRCxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWpCRCw0REFpQkMifQ==

/***/ }),

/***/ "y2lW":
/*!**************************************************!*\
  !*** ./node_modules/safe-event-emitter/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const util = __webpack_require__(/*! util */ "MCLT")
const EventEmitter = __webpack_require__(/*! events/ */ "+qE3")

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
}

module.exports = SafeEventEmitter


function SafeEventEmitter() {
  EventEmitter.call(this)
}

util.inherits(SafeEventEmitter, EventEmitter)

SafeEventEmitter.prototype.emit = function (type) {
  // copied from https://github.com/Gozala/events/blob/master/events.js
  // modified lines are commented with "edited:"
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    // edited: using safeApply
    safeApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      // edited: using safeApply
      safeApply(listeners[i], this, args);
  }

  return true;
}

function safeApply(handler, context, args) {
  try {
    ReflectApply(handler, context, args)
  } catch (err) {
    // throw error after timeout so as not to interupt the stack
    setTimeout(() => {
      throw err
    })
  }
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}


/***/ }),

/***/ "zvTS":
/*!**********************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/base-filter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const SafeEventEmitter = __webpack_require__(/*! @metamask/safe-event-emitter */ "Fj00").default

class BaseFilter extends SafeEventEmitter {

  constructor () {
    super()
    this.updates = []
  }

  async initialize () {}

  async update () {
    throw new Error('BaseFilter - no update method specified')
  }

  addResults (newResults) {
    this.updates = this.updates.concat(newResults)
    newResults.forEach(result => this.emit('update', result))
  }

  addInitialResults (newResults) {}

  getChangesAndClear () {
    const updates = this.updates
    this.updates = []
    return updates
  }
  
}

module.exports = BaseFilter


/***/ })

}]);
//# sourceMappingURL=default~authereum~providerEngine-7945c13d-js~walletconnect-web3-provider~walletlink.js.map