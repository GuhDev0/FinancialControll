"use client"
import { useRouter } from "next/navigation"


export default  function Token(){
    const router = useRouter();
    const URL = "http://localhost:3000/users/rotaUser"

    

    async function liberaRota() {
        const token = document.getElementById("tokenUser").value
        try{
            const authe = await  fetch(URL,{
            method:"GET",
            headers:{
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
            }
        })

         const res = await authe.json()
         console.log(res)  
         if(authe.ok){
            localStorage.setItem("token", token)
            router.push("/pageHome")            
         }
         
        }catch(error){
            alert(error)
            router.push("/token")
        }
        
    }

    return(
        <div>
                <div>
                    <label >Token</label>
                    <input type="text" name="tokenUser" id="tokenUser" />
                </div>
                <button onClick={liberaRota}>
                    Enviar Token
                </button>
                    </div>


    )
}