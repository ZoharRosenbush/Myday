import React from "react";

import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import two from '../assets/imgs/2.png'

export function BoardApp() {

    return (
        <section>
            <section className="main-board">
                <div className="title">
                    <img src={two} alt=""></img>
                    day</div>
                <div className="subtitle">Welcome to your workspace</div>
                <div className="subtitle">Add new board</div>

            </section>
            <MainNav />
            <BoardNav />
        </section>
    );
}
