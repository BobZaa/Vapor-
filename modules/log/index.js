const colors = require('colors')

/**
 * @typedef {Function} Logger
 * @argument {string} The string to be logged.
 */

/**
 * This function creates logger.
 * @param {string} prefix The prefix of the logger. I.e. MAIN, DATABASE, ETC.
 * @returns {Logger}
 */
module.exports = function getLogger(prefix, color="red") {
    /**
     * @argument {string} string The string to be logged.
     */
    const now =  new Date(Date.now())
    const time = now.toISOString().replace(/[TZ]/g, ' ').replace(/.\d*\s*$/, '')
    const clr = colors[color] ? color : "red"
    return function log(string) {
        console.log(time.grey, colors[clr](`[ ${prefix} ]`), string)
    }
}