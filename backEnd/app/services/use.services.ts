import  repository  from "../repository/repository"
import userDto from "../model/userDto"
import { resumoDeGasto } from "../model/resumoDeGasto"
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

    compararLogin = async (reqEmail:string,reqSenha:string):Promise<{compararEmail:boolean, compararSenha :boolean}> =>{
       
        const listaEmail =await repository.retornaListaDeEmail;
        const listaSenha = await repository.retornaListaDeSenha;

       const compararEmail =  listaEmail.some(lista => lista.email === reqEmail)
       const compararSenha =  listaSenha.some(lista => lista.password === reqSenha) 
           
        return { compararEmail,compararSenha } 
    }
    
    retornaInformacoesPeloEmailService = async (reqEmail:string) => {
        const informacoesUsuario = await repository.retornaInformacoesPeloEmail(reqEmail)        
        console.log(informacoesUsuario)
        return informacoesUsuario
        
        
    }

    retornaInformacoesPeloIdService = async(reqId:number)=>{
        const informacoesUsuario = await repository.retornaInformacoesPeloId(reqId)
        return informacoesUsuario 
    }

    registrarGasto = async(dtoGasto:resumoDeGasto) =>{
      
         const registradoNoDB = await  repository.registraGasto(dtoGasto)    
        return registradoNoDB

    }   

    resumoDeGastos = async (id:number) =>{
        const trazerResumo = await repository.retornaResumoDeGastos(id)
        return trazerResumo
    }

}








