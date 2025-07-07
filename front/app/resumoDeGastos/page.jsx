"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function RegistroDeGastos() {
    const router = useRouter()
    const url = "http://localhost:3000/users/resumoDosGastos"

    const [dadosGasto, setDadosGastos] = useState([])

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token")
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.ok) {
                    const res = await response.json()
                    console.log(res)
                    setDadosGastos(res.mensagem)
                } else {
                    console.error("Erro na requisição: ", response.status)
                }

            } catch (error) {
                console.error("Erro no fetch: ", error)
            }
        }   
        

        fetchData()

    }, [])
    function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
    function backPage(rota){
        router.push(rota)
    }

    return (
        <div>
            <div className="card_controleDeRegistro">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Valor</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(dadosGasto) && dadosGasto.length > 0 ? (
                            dadosGasto.map((gasto, index) => (
                                <tr key={index}>
                                    <td>{gasto.nameDoGasto}</td>
                                    <td>{gasto.valorGasto}</td>
                                    <td>{ formatarData(gasto.dataDoGasto)}</td>
                                    <td><button>Deletar</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>Nenhum gasto encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                    
                        <button onClick={() => backPage("/pageHome")}>
                            Voltar
                        </button>
                </table>
            </div>
        </div>
    )
}
