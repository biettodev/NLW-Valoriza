import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
	sub: string
}

export function ensureAuthenticated(
	req: Request, 
	res: Response, 
	next: NextFunction
){
	const authToken = req.headers.authorization
	if(!authToken){
		return res.status(401).end()
	}
	
	const [, token] = authToken.split(" ")
	
	try{
		const { sub } = verify(token, "ac2fc0c19773bf0e69be7fbe27af63fa") as IPayload
		req.user_id = sub
		
	}catch(err){
		return res.status(401).end()
	}
	
	
	return next()
}