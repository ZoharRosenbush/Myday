import { LoginSignup } from './pages/LoginSignup.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx'
import { TaskDetails } from './cmps/TaskCmps/TaskDetails.jsx'


const routes = [

    {
        path: '/login',
        component: LoginSignup,
    },

    // {
    //     path: '/myday/board/:boardId/:groupId/:taskId',
    //     component: TaskDetails,
    // },
    {
        path: '/myday/board/:boardId',
        component: BoardDetails,
    },
    {
        path: '/myday/board',
        component: BoardApp,
    },

]

export default routes;