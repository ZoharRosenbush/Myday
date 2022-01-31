import React from "react";
import { connect } from "react-redux";
// import Loader from 'react-loaders'
// import { XlviLoader } from "react-awesome-loaders";
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom'


import { MiddlePage } from "./MiddlePage.jsx";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { UserMsg } from "../cmps/UserMsg/UserMsg.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import two from '../assets/imgs/2.png'

import HomeLogo from "../assets/imgs/2day.png";
import { utilService } from '../services/utils.service.js'

import { addBoard } from '../store/board.action.js'

class _BoardApp extends React.Component {
    loaderCSS = {
        margin: "auto",
        marginTop: "30vh",


    }

    state = {
        isTimeOut: false
    }
    timeoutId;

    componentDidMount() {
        this.hideLoader()

    }

    componentWillUnmount() {
        if (this.timeoutId) clearTimeout(this.timeoutId)
    }

    // componentDidUpdate() {
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('did uypdate!');
    //     const { boards } = this.props
    //     if (prevProps.boards.length < boards.length) {

    //     const newBoard = boards[boards.length - 1]
    //             console.log('the newBoard', newBoard)
    //             window.location.href = `http://localhost:3000/#/2day/board/${newBoard._id}`
    // }
    //     }




    onAddBoard = () => {
        this.props.addBoard()
    }

    hideLoader = () => {
        console.log('lalal:');

        console.log('this.state:', this.state);

        this.timeoutId = setTimeout(() => {
            this.setState({ isTimeOut: true }, () => {
                console.log('this.state:', this.state);
            })
        }, 3000);

    }

    render() {
        const { isTimeOut } = this.state
        const { boards, board, user } = this.props
        console.log('board:', board);
        const bgColor = user ? user.userColor : "lightgray";
        console.log('bgColor:', bgColor);
        console.log('user:', user);
        return (
            <section className="app-layout">
                <MainNav />
                <BoardNav />
                {/* <section className="main-board">
                <div className="title">
                <img src={two} alt=""></img>
                    day</div>
                    <div className="subtitle">Welcome to your workspace</div>
                <div className="subtitle">Add new board</div>

            </section> */}
                {/* <MainNav />
                <BoardNav /> */}

                {!boards.length && !isTimeOut && <BeatLoader loading size={34} css={this.loaderCSS} color={"#ff3d57"} />}
                {!boards.length && isTimeOut && <MiddlePage user={user} bgColor={bgColor} onAddBoard={this.onAddBoard}/>}
                {boards.length && !isTimeOut && <BeatLoader loading size={34} css={this.loaderCSS} color={"#ff3d57"} />}
                {boards.length && isTimeOut && <MiddlePage user={user} bgColor={bgColor} onAddBoard={this.onAddBoard}/>}
                <UserMsg />
            </section>

        )
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
