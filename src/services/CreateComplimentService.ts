import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { getCustomRepository } from "typeorm"

interface IComplimentRequest{
	tag_id: string
	user_sender: string
	user_receiver: string
	message: string
}

class CreateComplimentService {
	async execute({ tag_id, user_sender, user_receiver, message}: IComplimentRequest){
		const complimentsRepository = getCustomRepository(ComplimentsRepositories)
		const userRepository = getCustomRepository(UsersRepositories)
		
		if(user_sender === user_receiver){
			throw new Error("Incorrect user receiver")
		}
		
		const userReceiverExists = await userRepository.findOne(user_receiver)
		
		if(!userReceiverExists){
			throw new Error("User receiver does not exists")
		}
		
		const compliment = complimentsRepository.create({
			tag_id,
			user_sender,
			user_receiver,
			message
		})
		
		await complimentsRepository.save(compliment)
		
		return compliment
	}
}

export { CreateComplimentService }