"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PageHome() {
    const [dados, setDados] = useState(null);
    const [nameDoGasto, setNameDoGasto] = useState(" ")
    const [valorGasto, setvalorGasto] = useState(" ")
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            const Url = "http://localhost:3000/users/rotaUser";

            try {
                const response = await fetch(Url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();
                console.log(data);

                if (data.mensagem === "Token inválido") {
                    router.push("/token");
                    return;
                }

                setDados(data); 

            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [router]);

     async function registraGasto() {
                 const token = localStorage.getItem("token")
            const url = "http://localhost:3000/users/registraGasto"

            try{
                const response = await fetch(url,{
                    method:"POST",
                    headers:{
                         "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },body:JSON.stringify({nameDoGasto,valorGasto:Number(valorGasto)})
                });
                if(response.ok){
                   const res =  await response.json()
                  (res.mensagem || "Gasto registrado com sucesso!")
                }else {
            alert("Erro ao registrar gasto");
        }
            }catch(error){
                return console.error(error)
            }
        }

    function nextPage(){
        router.push("/resumoDeGastos")
    }    

    return (
        <div>
            
            <div>
                <h1>{dados ? dados.dadosDB.name : "Carregando..."}</h1>
                <p>Salario : {dados ? dados.dadosDB.rendaSalarial :"indo"}</p>
            </div>
            <div>
                <button onClick={nextPage}>
                  Resumo dos gastos  
                </button>
            </div>
            <div>
                <div>
                    <label htmlFor="">Gasto: </label>
                    <input type="text" name="" id="nameDoGasto" value={nameDoGasto} onChange={(e) =>setNameDoGasto(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Valor: </label>
                    <input type="number" name="" id="valorGasto" value={valorGasto} onChange={(e) => setvalorGasto(e.target.value)} />
                </div>
                <button onClick={registraGasto}>
                    Registrar gasto
                </button>
            </div>
        </div>
        
    );
}
