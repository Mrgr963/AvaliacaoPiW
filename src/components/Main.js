import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import Home from "./Home"
import Listar from "./Aluno/Listar";
import Criar from "../components/Aluno/Criar"
import ListarCurso from "./Aluno/ListarCurso";

import Firebase from "./utils/Firebase";
import FirebaseContext from "./utils/FirebaseContext";


const router = createBrowserRouter(
    [
        {
            path:"/",
            element: <Home />,
            children: [
                {
                    path:"alunos/listar",
                    element:<Listar />
                },
                {
                    path:"alunos/criar",
                    element:<Criar />
                },
                {
                    path:"alunos/listarCurso",
                    element:<ListarCurso />
                }
            ]
        }
    ]
)

const Main = () => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <RouterProvider router={router}/>
        </FirebaseContext.Provider>
    )
  };

export default Main