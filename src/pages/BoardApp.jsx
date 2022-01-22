import React from "react";

import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";


export function BoardApp() {

    return (
        <section>

            <MainNav />
            <BoardHeader />
            <BoardNav />
        </section>
    );
}
