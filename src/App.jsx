import { Switch, Route } from 'react-router-dom'
import React, { useEffect, useState } from "react";

import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { socketService } from './services/socket.service.js'

import routes from './routes.js'


export function App() {

    // useEffect(() => {
    //     socketService.setup()

    // }, []);




    return (
        <section>
            {/* <AppHeader/> */}
            <main>
                <Switch>
                    {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
                    <Route exact component={Home} path={"/"} />
                    {/* <Route exact component={BoardApp} path={"/myday/board"} /> */}
                </Switch>

            </main>
            {/* <AppFooter/> */}
            {/* <UserMsg/> */}
        </section>
    )
}