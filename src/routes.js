import { LoginSignup } from './pages/LoginSignup.jsx'
import { Home } from './pages/Home.jsx'
import { Board } from './pages/Board.jsx'


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
        path: '/board/:boardId',
        component: Board,
    }
]

export default routes;