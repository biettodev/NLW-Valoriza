import { Request, Response } from 'express';
import { ListUserReceiveComplimentsService } from '../services/ListUserReceiveComplimentsService';


class ListUserReceiveComplimentsController {
    async handle(req: Request, res: Response){
    const { user_id } = req

        const listUserSendComplimentsService = new ListUserReceiveComplimentsService()

        const compliments = await listUserSendComplimentsService.execute(user_id)

        return res.json(compliments)
    }
}

export { ListUserReceiveComplimentsController }