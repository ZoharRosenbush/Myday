import React from "react";
import { connect } from "react-redux";
import { BeatLoader } from 'react-spinners'
import { MiddlePage } from "./MiddlePage.jsx";
import { UserMsg } from "../cmps/UserMsg/UserMsg.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
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

    onAddBoard = () => {
        this.props.addBoard()
    }

    hideLoader = () => {
        this.timeoutId = setTimeout(() => {
            this.setState({ isTimeOut: true })
        }, 3000);

    }

    render() {
        const { isTimeOut } = this.state
        const { boards, board, user } = this.props
        const bgColor = user ? user.userColor : "lightgray";
        return (
            <section className="app-layout">
                <MainNav />
                <BoardNav />
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
    };
}
const mapDispatchToProps = {
    addBoard

};

export const BoardApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardApp);
