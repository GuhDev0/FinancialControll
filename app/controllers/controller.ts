
import { Response, Request } from "express";
import userDto from "../model/userDto"
import Service from "../services/use.services"
import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"

const CHAVE_SECRETA = "ADMIN"
dotenv.config()

const service = new Service();

export default class ControllerRota{
   
    createUser = async (req:Request, res:Response) =>{
        try{
        const userRequest : userDto = req.body;    
        const user = await service.registerService(userRequest)
        res.status(201).json("Registrado  com sucesso")
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
   
    loginAuth = async(req:Request,res:Response) =>{
        const {email, senha} = req.body
        try{
            const login =  await service.compararLogin(email,senha) 

            if(!login.compararEmail || !login.compararSenha){
                res.status(401).json("email ou senha icorretas")
            }else{
                res.status(201).json("Acesso liberado")
                
            }
            const jwt =  jsonwebtoken.sign(
                {email : email},
                CHAVE_SECRETA,
                {expiresIn:"10m"})            
        }catch(error){
                res.json(error)
            }
           
        
        
}



}
