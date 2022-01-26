import { Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home.jsx'

import routes from './routes.js'


export function App() {
    return (
        <section>
            {/* <AppHeader/> */}
            <main>
                <Switch>
                    {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
                    <Route exact component={Home} path={"/"} />
                </Switch>

            </main>
            {/* <AppFooter/> */}
            {/* <UserMsg/> */}
        </section>
    )
}