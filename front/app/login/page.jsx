"use client";

import { useRouter } from "next/navigation";

export default function Login(){
    const URL = "http://localhost:3000/users/login"
    const router = useRouter()
    
    async function  loginApi  (){
        
         const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        try{
            const login = await fetch(URL, {
                method:"POST",
                headers :{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({email,senha})
            })
            const data= await login.json();
            console.log(data)
            if(login.ok){
                router.push("/token")
            }
            
              
             
        }catch(error){
            alert(error)
        }
                    
    }
    return(
        <div className="card_login">
        <div>
            <label htmlFor="">Email : </label>
            <input type="text" name="" id="email" />
        </div>
        <div>
            <label htmlFor="">Password : </label>
            <input type="password" name="" id="senha" />
        </div>
        <button onClick={loginApi}>
            Acessar
        </button>
    </div>
    )
    
}