import { Router } from "express"

import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { ListUserSendComplomentsServiceService } from "./services/ListUserSendComplimentsService"
import { ListUserSendComplimentsController } from "./controllers/ListUserSenderComplimentsController"
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController"
import { ListTagsController } from "./controllers/ListTagsController"
import { ListUserController } from "./controllers/ListUsersController"

const router = Router()

const createUserController = new CreateUserController()
const listUserController = new ListUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagsController = new ListTagsController()

router.post("/users", createUserController.handle)
router.use(ensureAdmin)
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
router.get("/tags",  ensureAuthenticated, listTagsController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)
router.get("/users/compliments/send",  ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle)
router.get("/users", ensureAuthenticated, listUserController.handle)


export { router }