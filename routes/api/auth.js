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

auth.post(
    '/register',
    async (req, res) => {
        const { username, password, passwordRepeat } = req.body

        if (!username || !password || !passwordRepeat)
            return res.send("Missing parameter: username, password, and/or passwordRepeat")

        if (password !== passwordRepeat)
            return res.send("Passwords do not match!")

        // You shouldn't be able to create two accounts with the same name!
        if (await db.collection('users').findOne({ username }))
            return res.send("That user already exists!")

        const hash = await bcrypt.hash(password, 12)
        const user = User(username, hash)

        await db.collection('users').insertOne(user)

        log(`Registred user ${username}.`)
        res.send("Successful!")
    }
)

auth.post(
    '/login',
    async (req, res) => {
        const { username, password } = req.body

        if (!username || !password)
            return res.send("Missing parameters: username and/or password")

        const user = await db.collection('users').findOne({ username })

        if (!await bcrypt.compare(password, user.password))
            return res.send("Incorrect password!")

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