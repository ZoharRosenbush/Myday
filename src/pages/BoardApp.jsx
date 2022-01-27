import React from "react";
import { connect } from "react-redux";
// import Loader from 'react-loaders'
// import { XlviLoader } from "react-awesome-loaders";
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";

import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import two from '../assets/imgs/2.png'
import BoardSvg from "../assets/svgs/BoardSvg.svg";
import HomeLogo from "../assets/imgs/2day.png";
import { utilService } from '../services/utils.service.js'

import { addBoard } from '../store/board.action.js'

class _BoardApp extends React.Component {

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('did uypdate!');
    //     const { boards } = this.props
    //     if (prevProps.boards.length < boards.length) {

<<<<<<< HEAD
            const newBoard = boards[boards.length - 1]
            console.log('the newBoard', newBoard)
            window.location.href = `http://localhost:3000/#/myday/board/${newBoard._id}`
        }
    }
=======
    //         const newBoard = boards[boards.length-1]
    //         console.log('the newBoard',newBoard)
    //         window.location.href = `http://localhost:3000/#/myday/board/${newBoard._id}`
    //     }
    // }
>>>>>>> e19d43f322d309d75139a1f667b46605e71495ff




    onAddBoard = () => {
        this.props.addBoard()
    }

    render() {
        const { boards, board, user } = this.props
        console.log('board:', board);
        const bgColor = user ? user.userColor : "lightgray";

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
                    <section className="board-page">
                        <div className="flex hello-user">

                            <p className="hello-user">{this.props.user ? "Hello " + this.props.user.username : "Hello Guest"}</p>
<<<<<<< HEAD
                            <p className="board-page-avatar" style={{ backgroundColor: utilService.getNiceRandomColor() }}>{this.props.user ? this.props.user.acronyms : <CgProfile style={{ width: "100%", height: "100%" }} />}</p>
=======
                            <p className="board-page-avatar" style={{ backgroundColor:bgColor }}>{this.props.user ? this.props.user.acronyms : <CgProfile style= {{width: "100%" ,height : "100%" }} />}</p>
>>>>>>> e19d43f322d309d75139a1f667b46605e71495ff
                        </div>
                        <div className="main-board-container">

                            <div>
                                {/* {!!boards.length && <Loader type="line-scale" active />} */}
                                {/* {!board && <Loader type="line-scale" active />} */}
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

function mapStateToProps({ boardModule, userModule }) {
    return {
        boards: boardModule.boards,
        board: boardModule.board,
        user: userModule.user,
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
