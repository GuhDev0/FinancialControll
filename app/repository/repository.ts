import { PrismaClient } from "../generated/prisma";
import userDto from "../model/userDto"
const prisma = new PrismaClient();


 const registrarNoBanco = async (userDto: userDto) => {

    const user = await prisma.user.create({
        data: {
        name: userDto.name, 
        email: userDto.email,
        password: userDto.password,
        cidade: userDto.cidade,
        dataNascimento: userDto.dataNascimento,
        profissao :userDto.profissao,
        rendaSalarial: userDto.rendaSalarial
        }

    })
    return user
}

 const deleteUser = async () => {
    const userDelete = await prisma.user.deleteMany()
    console.log("Deletado com sucesso")
}

const trazerSalario = async () =>{
    const salario = await prisma.user.findFirst(
        {
            where:{
                name : "Gustavo"
            },
            select:{
                rendaSalarial: true
            }
        }
    )
    return salario
   
}



export default {registrarNoBanco, deleteUser,trazerSalario }

