import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { User } from '../../modules/database/builders.js'
import { db } from '../../modules/database/index.js'
import getLogger from '../../modules/log/index.js'

const SECRET = process.env.JWT_SECRET ?? crypto.generateKeySync("aes", { length: 128 }).export().toString()
const auth = Router()
const log = getLogger("  Auth  ", "red")

/**
 * This route handles registering a user.
 * It error ahdnles:
 * 1. Missing parts of the request.
 * 2. Password and passwordRepeat not matching.
 * 3. Username already existing in database.
 */
auth.post(
    '/register',
    async (req, res) => {
        const { username, password, passwordRepeat } = req.body

        if (!username || !password || !passwordRepeat)
            return res.redirect(`/register?err=ERR_MISSING_PARAMS&un=${username}`)

        if (password !== passwordRepeat)
            return res.redirect(`/register?err=ERR_PASSWORD_NO_MATCH&un=${username}`)

        // You shouldn't be able to create two accounts with the same name!
        if (await db.collection('users').findOne({ username }))
            return res.redirect(`/register?err=ERR_USER_EXISTS&un=${username}`)

        const hash = await bcrypt.hash(password, 12)
        const user = User(username, hash)

        await db.collection('users').insertOne(user)

        log(`Registred user ${username}.`)
        res.send("Successful!")
    }
)

/**
 * This route logs a user in and gives said user a cookie with an API token.
 */
auth.post(
    '/login',
    async (req, res) => {
        const { username, password } = req.body

        if (!username || !password)
            return res.redirect(`/login?err=ERR_MISSING_PARAMS&un=${username}`)

        const user = await db.collection('users').findOne({ username })

        if (!user)
            return res.redirect(`/login?err=ERR_USER_NO_EXISTS&un=${username}`)

        if (!await bcrypt.compare(password, user.password))
            return res.redirect(`/login?err=ERR_PASSWORD_INCORRECT&un=${username}`)

        delete user.password

        const token = jwt.sign(
            user,
            SECRET,
            { expiresIn: '4h' }
        )

        const fourHours = 60 * 60 * 1000
        res.cookie(
            'api-token', token,
            {
                expires: new Date(Date.now() + fourHours),
                httpOnly: true,
                signed: true 
            }
        ).redirect('/')
    }
)

export default auth