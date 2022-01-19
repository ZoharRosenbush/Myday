import { LoginSignup } from './pages/LoginSignup.jsx'
import { boardApp } from './pages/boardApp.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx'


const routes = [

    {
        path: '/login',
        component: LoginSignup,
    },
    {
        path: '/myday/board',
        component: boardApp,
    }
    ,
    {
        path: '/myday/board/:boardId',
        component: BoardDetails,
    }
]

export default routes;