import { Switch, Route } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { socketService } from './services/socket.service.js'
import {MainNav} from './cmps/NavCmps/MainNav.jsx'
import {BoardNav} from './cmps/NavCmps/BoardNav.jsx'

import routes from './routes.js'


export function App() {

    // useEffect(() => {
    //     socketService.setup()

    // }, []);




    return (
        <section className="app-layout">
     <MainNav />
        <BoardNav />
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