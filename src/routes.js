import { LoginSignup } from './pages/LoginSignup.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx'
// import { TaskDetails } from './cmps/TaskCmps/TaskDetails.jsx'
import { DynamicDashboard } from './pages/DynamicDashboard.jsx'


const routes = [

    {
        path: '/login',
        component: LoginSignup,
    },

    {
        path: '/2day/board/:boardId/dashboard',
        component: DynamicDashboard,
    },
    {
        path: '/2day/board/:boardId',
        component: BoardDetails,
    },
    {
        path: '/2day/board',
        component: BoardApp,
    },

]

export default routes;