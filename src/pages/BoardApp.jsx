import React from "react";
// import { Route } from "react-router-dom";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import two from '../assets/imgs/2.png'
// import { TaskDetails } from "../cmps/TaskCmps/TaskDetails.jsx";
export function BoardApp() {

    return (
        <section className="app-layout">
            {/* <section className="main-board">
                <div className="title">
                    <img src={two} alt=""></img>
                    day</div>
                <div className="subtitle">Welcome to your workspace</div>
                <div className="subtitle">Add new board</div>

            </section> */}
            <MainNav />
            {/* <BoardHeader /> */}
            <BoardNav />
            {/* <Route path="/myday/board/:boardId/:groupId/:taskId" component={TaskDetails} /> */}
        </section>
    );
}
