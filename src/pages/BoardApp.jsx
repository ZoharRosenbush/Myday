import React from "react";
import { connect } from "react-redux";
// import Loader from 'react-loaders'
// import { XlviLoader } from "react-awesome-loaders";
import { Link } from 'react-router-dom'
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import two from '../assets/imgs/2.png'
import BoardSvg from "../assets/svgs/BoardSvg.svg";
import HomeLogo from "../assets/imgs/2day.png";

class _BoardApp extends React.Component {

    render() {
        const { boards } = this.props
        console.log('boards:', boards);

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
                <BoardNav />

                <section>
                    {/* {!boards.length && } */}
                    <section className="home-page">
                        <div className="main-board-container">
                            <div>

                                <h1>
                                    Work the way that
                                </h1>
                                <h1>
                                    works <span>for you</span>
                                </h1>
                                <p>Add board and start planning your tasks</p>
                                {/* <Link className="clean-link link-container" to="/myday/board"> */}
                                <button className="board-btn">Add new board</button>
                                {/* </Link> */}
                            </div>
                            <div className="board-img-container">

                                <img src={BoardSvg} alt=""></img>
                            </div>
                        </div>
                    </section>
                </section>
                {/* <BoardHeader /> */}
            </section>
        );
    }
}

function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
        //   currFilterBy: toyModule.currFilterBy
    };
}
const mapDispatchToProps = {

};

export const BoardApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardApp);
