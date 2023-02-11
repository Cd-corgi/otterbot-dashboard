import { Router } from 'express'
import { getGuildsController } from '../../controllers/guilds'
import { isAuthorized } from '../../utils/middlewares'
const router = Router()

router.get("/", isAuthorized, getGuildsController)

export default router