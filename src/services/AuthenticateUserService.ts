import { UsersRepositories } from "../repositories/UsersRepositories" 
import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
	email: string
	password: string
}

class AuthenticateUserService {
	async execute({ email, password }: IAuthenticateRequest ){
		const usersRepository = getCustomRepository(UsersRepositories)
		
		const user = await usersRepository.findOne({
			email
		})
		
		if(!user){
			throw new Error("Email/Passowrd incorrect")
		}
		
		const passwordMatch = await compare(password, user.password)
		
		if(!passwordMatch){
			throw new Error("Email/Passowrd incorrect")
		}
		
		// Gera o token
		const token = sign({
			email: user.email
		}, "ac2fc0c19773bf0e69be7fbe27af63fa", {
			subject: user.id,
			expiresIn: "1d",
		} )
		
		return token
	}
}

export { AuthenticateUserService }