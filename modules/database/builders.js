/**
 * This script is a collection of 'builders' - functions that create basic entities for the database.
 */
import { ObjectId } from 'mongodb'

/**
 * @typedef {object} User
 * @property {string} username
 * @property {string} password A hash of the user's password.
 * @property {[ObjectId]} library The user's game library. An array of ObjectIds to games.
 */

/**
 * This function generates a new user. (It does not store it in the database.)
 * @param {string} username The username of the user.
 * @param {string} hash A hash of the password.
 * @returns {User}
 */
export function User(username, hash) {
    return {
        username,
        password: hash,
        library: [],
    }
}

/**
 * @typedef {object} Publisher
 * @property {string} publisher The publisher's name
 * @property {string} password A hash of the user's password.
 * @property {[ObjectId]} games The publisher's released games. An array of ObjectIds to games.
 */

/**
 * This function generates a new publisher. (It does not store it in the database.)
 * @param {string} publisher
 * @param {string} hash
 * @returns {Publisher}
 */
 export async function Publisher(publisher, hash) {
    return {
        publisher,
        password: hash,
        games: [],
    }
}