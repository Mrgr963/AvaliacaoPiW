import { collection, query, where ,getDocs, addDoc, doc, getDoc, setDoc, deleteDoc, QuerySnapshot, Query } from "firebase/firestore"
import { useEffect } from "react"

class AlunoFirebaseService {
    
    /* Crianço serviço de listagem geral */
    static listar(db, callback) {
        /* Pegando Coleção de Alunos */
        const c = collection (db, "alunos")
        getDocs(c)

        .then(
            (QuerySnapshot) => {
                const alunos = []
                /* Inserindo todos os alunos da Coleção na Lista */
                QuerySnapshot.forEach(
                    (aluno) => {
                        alunos.push (
                            {
                                id:aluno.id,
                                ...aluno.data()
                            }
                        )
                    }
                )
                /* Retornando Lista de alunos contendo todos os alunos d Coleção */
                callback(alunos)
            }
        )
        .catch (error => console.log(error))
    }

    /* Criando serviço de calcular média de todos os alunos */
    static media(db, callback) {
        const c = collection(db, "alunos");
        getDocs(c)
        .then((QuerySnapshot) => {
            const alunos = [];
            let totalNotas = 0;
    
            QuerySnapshot.forEach((aluno) => {
                const alunoData = aluno.data();
                alunos.push({
                    id: aluno.id,
                    ...alunoData,
                });
                /* Somando o total de notas de Ira */
                const ira = parseFloat(alunoData.ira) || 0;
                totalNotas += ira;
            });
            /* Retornando o calculo da Média de Ira */
            const media = alunos.length > 0 ? totalNotas / alunos.length : 0;
            callback(media.toFixed(1));
        })
        .catch((error) => console.log(error));
    }
    
    


    /* Criando serviço de Criar Aluno */
    static criar(db,callback, aluno) {
        const c = collection(db,"alunos")
        addDoc(c, aluno)
        .then(
            (aluno) => {
                callback({id:aluno.id})
            }
        )
        .catch(error => console.log(error))
    }

}

export default AlunoFirebaseService