import { LoginSignup } from './pages/LoginSignup.jsx'
import { Home } from './pages/Home.jsx'
import { MainApp } from './pages/MainApp.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx'


const routes = [

    {
        path: '/login',
        component: LoginSignup,
    },
    {
        path: '/',
        component: Home,
    },
    {
        path: '/myday/board',
        component: MainApp,
        //TODO: change to boardApp
    }
    ,
    {
        path: '/myday/board/:boardId',
        component: BoardDetails,
    }
]

export default routes;