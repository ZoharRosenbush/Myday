import { Switch, Route } from 'react-router-dom'

import routes from './routes.js'


export function App() {
    return (
        <section className="app-layout">
            {/* <AppHeader/> */}
            <main>
                <Switch>
                    {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                </Switch>
            </main>
            {/* <AppFooter/> */}
            {/* <UserMsg/> */}
        </section>
    )
}