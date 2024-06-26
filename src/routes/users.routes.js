import { Router } from 'express'
import usersController from '../controllers/users.controller.js'

const router = Router()

router.get('/users', usersController.getUsers)
router.get('/users/:id', usersController.getUser)
router.post('/users', usersController.createUser)
router.patch('/users/:id', usersController.updateUser)
router.delete('/users/:id', usersController.deleteUser)

export default router
