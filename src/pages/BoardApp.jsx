import React from "react";
import { connect } from "react-redux";
import Loader from 'react-loaders'
// import { XlviLoader } from "react-awesome-loaders";
import { Link } from 'react-router-dom'
import { BoardDetails } from './BoardDetails.jsx'
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import two from '../assets/imgs/2.png'
import BoardSvg from "../assets/svgs/BoardSvg.svg";
import HomeLogo from "../assets/imgs/2day.png";

import { addBoard } from '../store/board.action.js'

class _BoardApp extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        console.log('did uypdate!');
        const { boards } = this.props
        if (prevProps.boards.length < boards.length) {

            const newBoard = boards[boards.length-1]
            console.log('the newBoard',newBoard)
            window.location.href = `http://localhost:3000/#/myday/board/${newBoard._id}`
        }
    }




    onAddBoard = () => {
        this.props.addBoard()
    }

    render() {
        const { boards, board } = this.props
        console.log('board:', board);

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

                    <section className="home-page">
                        <div className="main-board-container">
                            <div>
                                {!!boards.length && <Loader type="line-scale" active />}
                                {!board && <Loader type="line-scale" active />}
                                <h1>
                                    Work the way that
                                </h1>
                                <h1>
                                    works <span>for you</span>
                                </h1>
                                <p>Add board and start planning your tasks</p>
                                {/* <Link className="clean-link link-container" to="/myday/board"> */}
                                <button className="board-btn" onClick={this.onAddBoard}>Add new board</button>
                                {/* </Link> */}
                            </div>
                            <div className="board-img-container">

                                <img src={BoardSvg} alt=""></img>
                            </div>
                        </div>
                    </section>
                    {/* {board&& <BoardDetails boardId={board._id}/>} */}
                </section>
                {/* <BoardHeader /> */}
                {/* <Route path="/myday/board/:boardId/:groupId/:taskId" component={TaskDetails} /> */}
            </section>
        );
    }
}

function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
        board: boardModule.board,
        //   currFilterBy: toyModule.currFilterBy
    };
}
const mapDispatchToProps = {
    addBoard

};

export const BoardApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardApp);
