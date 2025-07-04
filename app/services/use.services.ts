import  repository  from "../repository/repository"
import userDto from "../model/userDto"
import { promises } from "dns"

export default class Services{
     registerService = async (userDto:userDto) =>{
    const userService = await repository.registrarNoBanco(userDto) 
    return userService   
}

    calculoDeGasto = async (valorGasto:Number ): Promise<number> =>{
        const salarioUsuario = await repository.trazerSalario();   
        const valorDescontado = Number(salarioUsuario?.rendaSalarial) - Number(valorGasto)
        
        return valorDescontado
    }
}






