import Home  from './../pages/home/index'
import Dashbord  from './../pages/dashbord/index'
import Login  from './../pages/login/index'
import Register  from './../pages/register/index'

const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Home,
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login,
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register,
    },
    {
        path: '/dashbord',
        exact: true,
        auth: true,
        component: Dashbord,
    }
]

export default routes;
