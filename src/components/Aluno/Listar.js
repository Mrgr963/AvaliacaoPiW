import '../../styles.css'

import AlunoFirebaseService from "../services/AlunoFirebaseService"
import FirebaseContext from "../utils/FirebaseContext"

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react"


const Listar = () => {

    const [alunos, setAlunos] = useState([])
    /* Variável para calcular média IRA */
    const [media, setMedia] = useState(0)
    /* Variável para pintar background */
    const [pintado, setPintado] = useState(false)
    const firebase = useContext(FirebaseContext)


    useEffect(
        () => {

            /*UseEffect de Listagem */
            AlunoFirebaseService.listar(
                firebase.getFirestoreDb(),
                (alunos) => {
                    setAlunos(alunos)
                })
            
            /* UseEffect de Media IRA */
            AlunoFirebaseService.media(
                firebase.getFirestoreDb(),
                (mediaCalculada) => {
                    setMedia(mediaCalculada);
                }
            );
            },
        []
    )

    /* Processo de deletar aluno */
    const handleDelete = (id) => {
        if (window.confirm('Deseja excluir este aluno?')) {
            AlunoFirebaseService.apagar(
                firebase.getFirestoreDb(),
                (response) => {
                    const result = alunos.filter((aluno) => aluno.id!==id)
                    setAlunos(result)
                },
                id
            )
        }
    }

    /* Função para alterar o estado da variavel Pintado*/
    const togglePintar = () => {
        setPintado(!pintado);
    };

    /* Renderizando alunos */
    const renderizarAlunos = () => {
        return alunos.map((aluno) => {
            /* Settando variável para delimitar a classe da tag html*/
            let rowClass = "";
            
            /* A variavel muda a classe quando o elemento tem a variável de pintado true ou false*/
            if (pintado) {
                if (aluno.ira < 7) {
                    rowClass = "reprovado";
                } else {
                    rowClass = "aprovado";
                }
            }
    
            /*Não faço IDEIA do porquê as cores não estão mudando, por mais que as classes estejam sejam alteradas para "aprovado e "reprovado" corretamente.*/ 
            return (
                <tr key={aluno.id} className={rowClass}>
                    <th scope="row">{aluno.id}</th>
                    <td>{aluno.nome}</td>
                    <td>{aluno.curso}</td>
                    <td>{aluno.ira}</td>
                    <td>
                        <div className="button-content">
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(aluno.id)}>
                                Apagar
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    };
    
    /* Renderizando Renderização */
    return(
        <div className="page-content">
      <h1>Listar Alunos {process.env.REACT_APP_LINK_API}</h1>
      <div className="table-content">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Curso</th>
              <th scope="col">Ira</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {renderizarAlunos()}
          </tbody>
        </table>

        <div>
            Média Ira: {media}
        </div>

        <div className="button-submit">
            <button type="button" className="btn btn-warning" onClick={togglePintar}>
                {pintado ? "Resetar Cores" : "Pintar"}
            </button>
        </div>
      </div>
    </div>
    )
}

export default Listar