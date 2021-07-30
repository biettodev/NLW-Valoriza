import { Request, Response, NextFunction } from "express"
import { UsersRepositories } from "../repositories/UsersRepositories" 
import { getCustomRepository } from "typeorm"

export function ensureAdmin(
	req: Request, 
	res: Response, 
	next: NextFunction
){
	const { user_id } = req
	console.log(user_id)
	
	const usersRepository = getCustomRepository(UsersRepositories)
	const user = await usersRepository.findOne(user)
	
	const admin = true
	
	if(admin){
		return next()
	}
	
	return res.status(401).json({
		error: "Unauthorized"
	})
}