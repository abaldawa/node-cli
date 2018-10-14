/**
 * User: abhijit.baldawa
 */

const
    chalk = require('chalk');

/**
 * @method PRIVATE
 *
 * This method prints the log on the console and if 'shouldPersist' is set to true then an extra line is added to the console
 * so that the log will not be cleared by next log
 *
 * @param {Object | String} log :REQUIRED: log to print
 * @param {Boolean | null} shouldPersist :OPTIONAL: if true then log is persisted on console and will not be cleared by nect log
 * @returns {undefined}
 */
function print( log, shouldPersist ) {
    process.stdout.write( log );

    if( shouldPersist ) {
        process.stdout.write("\n");
    }
}

/**
 * @method PUBLIC
 *
 * This method prints and persists log line in green color
 *
 * @param {Object | String} successLog :REQUIRED: log to print in green color
 * @returns {undefined}
 */
function success( successLog ) {
    clearLine();
    print( chalk.green(successLog), true );
}

/**
 * @method PUBLIC
 *
 * This method prints and persists log line in red color
 *
 * @param {Object | String} errorLog :REQUIRED: log to print in red color
 * @returns {undefined}
 */
function error( errorLog ) {
    clearLine();
    print( chalk.red(errorLog), true );
}

/**
 * @method PUBLIC
 *
 * This method prints log line in yellow color
 *
 * @param {Object | String} progressLog :REQUIRED: log to print in yellow color
 * @returns {undefined}
 */
function progress( progressLog ) {
    clearLine();
    print( chalk.yellow(progressLog) );
}

/**
 * @method PUBLIC
 *
 * This method clears log line and also sets the cursor to the start of line
 *
 * @returns {undefined}
 */
function clearLine() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
}

module.exports = {
    success,
    error,
    progress,
    clearLine
};