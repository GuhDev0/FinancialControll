
import { Response, Request } from "express";
import userDto from "../model/userDto"
import Service from "../services/use.services"

const service = new Service();

export default class ControllerRota{
   
    createUser = async (req:Request, res:Response) =>{
        try{
        const userRequest : userDto = req.body;    
        const user = await service.registerService(userRequest)
        res.status(201).json("Servidor Criado com sucesso")
        }catch(error){
            console.error(error)
            res.status(400).json("voce deve informa os dados")
        }
            
}

    calcularGastos = async(req:Request, res:Response): Promise<any>=>  {
        try{
        const dadosReq = req.body.gasto
        const valor = await service.calculoDeGasto(dadosReq)
        console.log(valor)
        return res.status(200).json(valor)
        }
        catch(error){
            res.status(500).json(error)
        }
        
        
    }
}


