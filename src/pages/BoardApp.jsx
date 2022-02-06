import React from "react";
import { connect } from "react-redux";
import { BeatLoader } from 'react-spinners'
import { MiddlePage } from "./MiddlePage.jsx";
import { UserMsg } from "../cmps/UserMsg/UserMsg.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import { addBoard, setBoardNav } from '../store/board.action.js'

class _BoardApp extends React.Component {
    loaderCSS = {
        margin: "auto",
        marginTop: "30vh",
    }

    state = {
        isTimeOut: false,
        isBoardAdded: false,
    }
    timeoutId;

    componentDidMount() {
        this.hideLoader()
    }

    componentWillUnmount() {
        if (this.timeoutId) clearTimeout(this.timeoutId)
    }

    onAddNewBoard = () => {
        this.props.addBoard()
        this.props.setBoardNav(true)
        this.setState((prevState) => ({ ...prevState, isBoardAdded: true }))
    }



    hideLoader = () => {
        this.timeoutId = setTimeout(() => {
            this.setState({ isTimeOut: true })
        }, 3000);

    }

    render() {
        const { isTimeOut } = this.state
        const { boards, user,isBoardNavOpen } = this.props
        // console.log('isBoardNavOpen',isBoardNavOpen);
        const bgColor = user ? user.userColor : "lightgray";
        return (
            <section className="app-layout">
                <MainNav />
                <BoardNav isReopened={this.state.isBoardAdded} />
                {!boards.length && !isTimeOut && <BeatLoader loading size={34} css={this.loaderCSS} color={"#ff3d57"} />}
                {!boards.length && isTimeOut && <MiddlePage user={user} bgColor={bgColor} onAddNewBoard={this.onAddNewBoard} isBoardNavOpen={isBoardNavOpen} />}
                {boards.length && !isTimeOut && <BeatLoader loading size={34} css={this.loaderCSS} color={"#ff3d57"} />}
                {boards.length && isTimeOut && <MiddlePage user={user} bgColor={bgColor} onAddNewBoard={this.onAddNewBoard}isBoardNavOpen={isBoardNavOpen} />}
                <UserMsg />
            </section>

        )
    }
}

function mapStateToProps({ boardModule, userModule }) {
    return {
        boards: boardModule.boards,
        user: userModule.user,
        isBoardNavOpen: boardModule.isBoardNavOpen
    };
}
const mapDispatchToProps = {
    addBoard,
    setBoardNav

};

export const BoardApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardApp);
