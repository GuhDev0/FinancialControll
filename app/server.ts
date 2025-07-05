import express from "express";
import { Request, Response } from "express";
import router from "./router/use.router";


const app = express();

app.use(express.json())


app.use("/users", router)

app.listen(3000, () =>{
    console.log("Servidor Aberto")
    
}) 

