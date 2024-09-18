import { useState, useContext } from "react"
import "../../styles.css"

import AlunoFirebaseService from "../services/AlunoFirebaseService"
import FirebaseContext from "../utils/FirebaseContext"

const Criar = () => {
    
    const [nome, setNome] = useState("")
    const [curso,setCurso] = useState("")
    const [ira, setIra] = useState(0)

    const firebase = useContext(FirebaseContext)
    
    /* Criando submit de um novo aluno */
    const handleSubmit = (event) => {
        event.preventDefault()
        
        const novoAluno = {nome, curso, ira}
        AlunoFirebaseService.criar(
            firebase.getFirestoreDb(),
            (alunoSimples) => console.log(alunoSimples),
            novoAluno
        )
    }

    /* Settando nome após submit */
    const handleNome = (event) => {
        setNome(event.target.value)
    }

    /* Settando curso após submit */
    const handleCurso = (event) => {
        setCurso(event.target.value)
    }

    /* Settando IRA após submit */
    const handleIra = (event) => {
        setIra(event.target.value)
    }

    return (
        <div>
            <h1>Criar Aluno</h1>

            <form className="form-context" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="inputNome">Nome:</label>
                    <input
                    className="form-control" 
                    type="text"
                    name="nome"
                    id="inputNome"
                    onChange={handleNome}
                    />
                </div>

                <div className="mb-3">
                <label className="form-label" htmlFor="inputCurso">Curso:</label>
                    <input 
                    className="form-control" 
                    type="text"
                    name="Curso"
                    id="inputCurso"
                    onChange={handleCurso}
                    />
                </div>

                <div className="mb-3">
                <label className="form-label" htmlFor="inputIra">IRA:</label>
                    <input 
                    className="form-control" 
                    type="text"
                    name="ira"
                    id="labelIra"
                    onChange={handleIra}
                    />
                </div>

                <div className="button-submit">
                    <button type="submit" className="btn btn-primary">Submeter</button>
                </div>
            </form>
        </div>
    )
}

export default Criar