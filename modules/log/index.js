
import colors from 'colors'

/**
 * @typedef {Function} Logger
 * @argument {string} string The string to be logged.
 */

/**
 * This function creates logger - A function that auto-prefixes log messages.
 * @param {string} prefix The prefix of the logger. I.e. MAIN, DATABASE, ETC.
 * @returns {Logger}
 */
export default function getLogger(prefix, color="red") {
    const now =  new Date(Date.now())
    const time = now.toString()
        .match(/\w{3} \d+ \d+ \d{2}:\d{2}:\d{2}/)[0]
        .replace(/\w{3}/, month => {
            const monthToNumber = {
                Jan: '01',
                Feb: '02',
                Mar: '03',
                Apr: '04',
                May: '05',
                Jun: '06',
                Jul: '07',
                Aug: '08',
                Sep: '09',
                Oct: '10',
                Nov: '11',
                Dec: '12',
            }
            return monthToNumber[month] ?? 'XX'
        })
        .replace(/(\d+) (\d+) (\d+)/, "$1-$2-$3")

    const clr = colors[color] ? color : "blue"

    /**
     * @argument {string} string The string to be logged.
     */
    return function log(string) {
        console.log(time.grey, colors[clr](`[ ${prefix} ]`), string)
    }
}