/**
 * User: abhijit.baldawa
 */

/**
 * @method PUBLIC
 *
 * This method is supposed to be used with async/await. The purpose of this method is to enable superior error handling with async/await.
 * If async/await is used directly with promises we technically have to use a try-catch block and if there is any error in any of the
 * await operation then while logging we are not sure which method threw the error unless we cover all await(s) with try-catch
 * which is ugly and less feasible/elegant.
 *
 * This method accepts a input promise and returns a promise which resolves to either [err] if the input promise has exception
 * or [null, result] if input promise is successful. This give us precise results of every async operation, very similar to node.js
 * error first callback but with all the benefits of async/await with synchronous looking code having all the async goodness.
 *
 * An example usage is as below:
 * let [err, result] = await formatPromiseResult(promise);
 * //User can now handle err/result appropriately at every async/await step
 *
 * Using ES6 assignment destructuring the code looks concise and eliminates the mandatory need to have try-catch. User can still choose
 * to have try-catch but for handling any exception in synchronous code and not for any await.
 *
 * @param {Promise} prom Passed in promise to format
 * @returns {Promise<[]>} If error in prom then promise resolves to [err] else [null, result]
 */
function formatPromiseResult( prom ) {
    return prom
        .then((result) => {
            return [null, result];
        })
        .catch((error) => {
            return [error];
        })
}

/**
 * @method PUBLIC
 *
 * This method should be used to access Objects/Array keys safely without the user explicitly putting a check on that.
 * Ex given input object = {key: {newkey: "value"}}
 * this method can be used to safely get value of "newkey" using chaining as below:
 *
 * ObjParse(obj).getKey("key").getKey("newkey").getVal() === "value"
 *
 * If at any point a key does not exist or its value is null/undefined then this method safely returns null without the developer
 * placing null/undefined checks everywhere
 *
 * @param {Object|Array} obj
 * @returns {Object} {getKey: <Function>, getVal: <Function>}
 */
function ObjParse( obj ) {
    let
        _obj = obj;

    return {
        getKey( key ) {
            if( _obj !== null && _obj !== undefined ) {
                _obj = _obj[key];
            }
            return this;
        },
        getVal() {
            return _obj;
        }
    };
}

module.exports = {
    formatPromiseResult,
    ObjParse
};