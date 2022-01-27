import { Router } from 'express'
import auth from './api/auth.js'

const api = Router()

api.use('/auth', auth)
api.get('/check-me', (req, res) => res.json(req.signedCookies))

export default api