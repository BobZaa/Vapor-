/**
 * This script is just a collection of all API routes.
 */
import { Router } from 'express'
import auth from './api/auth.js'

const api = Router()

api.use('/auth', auth)

export default api