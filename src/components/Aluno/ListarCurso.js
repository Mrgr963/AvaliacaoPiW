import '../../styles.css'

import AlunoFirebaseService from "../services/AlunoFirebaseService"
import FirebaseContext from "../utils/FirebaseContext"

import { useEffect, useState, useContext } from "react"

const ListarCurso = () => {
    const [alunos, setAlunos] = useState({});
    const firebase = useContext(FirebaseContext);

    /* UseEffect de listar, porém separando pelo curso */
    useEffect(
        () => {

            AlunoFirebaseService.listar(
                firebase.getFirestoreDb(),
                (alunos) => {
                    const alunosCurso = agruparAlunosPorCurso(alunos)
                    setAlunos(alunosCurso)
                })
            },
        []
    )

    /* Associando cada aluno a um curso diferente */
    const agruparAlunosPorCurso = (alunos) => {
        const agrupamento = {};

        alunos.forEach((aluno) => {
          if (!agrupamento[aluno.curso]) {
            agrupamento[aluno.curso] = [];
          }
          agrupamento[aluno.curso].push(aluno);
        });
        return agrupamento;
      };
      
      /* Renderizando página */
      const renderizarAlunosAgrupados = () => {
        return Object.keys(alunos).map((curso) => (
          <div key={curso} className="curso">
            <h3>{curso}</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>IRA</th>
                </tr>
              </thead>
              <tbody>
                {alunos[curso].map((aluno) => {
                    /*Não faço IDEIA do porquê também não mudou a background-color nesse caso*/
                  const rowClass = aluno.ira > 7 ? "destaque" : "";
                  return (
                    <tr key={aluno.id} className={rowClass}>
                      <td>{aluno.nome}</td>
                      <td>{aluno.ira}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ));
    };
    
    
      return (
        <div className="page-content">

          <h1>Cursos</h1>

          {renderizarAlunosAgrupados()}
        </div>
      );
}

export default ListarCurso