
import { Response, Request, NextFunction } from "express";

import userDto from "../model/userDto"
import Service from "../services/use.services"
import jsonwebtoken, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import { MyJwtPayload } from "../model/myJwt";
import { error } from "console";

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
            return res.status(500).json(error)
        }
 
    }
   
 loginAuth = async(req:Request,res:Response) =>{
        
        const {email, senha} = req.body
        const dados = await service.retornaInformacoesPeloEmailService(email) 
        try{
            const login =  await service.compararLogin(email,senha) 

            if(!login.compararEmail || !login.compararSenha){
                res.status(401).json("email ou senha icorretas");
            }else{
                
                const jwtToken =  jsonwebtoken.sign(
                {
                    id : dados?.id,
                    name : dados?.name,
                    email : dados?.email,
                    nascimento : dados?.dataNascimento,
                    cidade : dados?.cidade,
                    profissao : dados?.profissao,

                },
                CHAVE_SECRETA,
                {expiresIn:"1hr"});   

                res.status(201).json({mensagem:"Acesso liberado", token: jwtToken})
            }     
        }catch(error){
                res.status(500).json({mensagem: error} )
            }             
}

authentication = (req:Request, res:Response, next:NextFunction) =>{
    const autheToken  = req.headers["authorization"]
    
    if(!autheToken){
         res.status(401).json({mensagem: "Token não fornecido"})
         return;
    }

    const token = autheToken.split(" ")[1]

    jsonwebtoken.verify(token, CHAVE_SECRETA,(err,decoded) =>{
    if(err){
    res.json({mensagem : "Token inválido"})
    return
        };


        
    req.user = decoded as MyJwtPayload
    next();        
    
    })
}
  
rotaUser = async(req:Request, res:Response)  =>  {
   
    const tokenDados = req.user

    const userId = tokenDados?.id 

    if(!userId){
        return res.status(400).json({mensagem:"Usuario nao encontrado"})
    }
    
    const dadosDB = await service.retornaInformacoesPeloIdService(userId)
    
    
    return res.json({mensagem : "Rota liberada", dadosDB})

     
}

registraGastos = async (req:Request, res:Response) =>{
    const { nameDoGasto, valorGasto} =   req.body
    const tokenDados = req.user
    const userId = tokenDados?.id

    if(!userId){
        return res.status(401).json({mensagem: "Usuario invalido"})
    }

    try{
          const dados =  await service.registrarGasto({nameDoGasto,valorGasto,userId : userId})

          res.status(200).json({mensagem:"Sucesso no envio"})
        return
    }catch(error){
        res.status(400).json({mensagem: error})
        return
    }
} 

resumoDeGastos = async(req:Request,res:Response)=>{ 
    const token = req.user
    const userId = token?.id
     if(!userId){
        return res.status(401).json({mensagem: "Usuario invalido"})
    }
    
    try{
        const resumoFinal = await service.resumoDeGastos(token?.id)
        res.status(201).json({mensagem: resumoFinal })  
    }catch(error){
        console.error(error)
    }
    

}
}





