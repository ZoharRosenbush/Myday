import React from "react";
import { connect } from "react-redux";
import { loadBoard } from "../store/board.action.js";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { GroupList } from "../cmps/GroupCmps/GroupList.jsx";

// import { boards } from '../helpers/monday.js'
class _BoardDetails extends React.Component {
  componentDidMount() {
    console.log("mount");
    const { boardId } = this.props.match.params;
    console.log("boardId in details", boardId);
    // const  board = await boardService.getById(boardId)
    console.log("boardId details:", boardId);
    this.props.loadBoard(boardId);
    //   this.setState({ board });
  }


  componentDidUpdate(prevProps, prevState) {
    console.log("updating");
    const { boardId } = this.props.match.params;
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
      console.log("updating inside condition");
      this.props.loadBoard(boardId)
    }
  }



  render() {
    console.log("rendering");
    const { board } = this.props;
    console.log('board:', board);
    
    return (
      <section>
        <BoardHeader
        // title={board.title}
        />
        <BoardNav />
        {board && <GroupList board={board} />}
      </section>
    );
  }
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    //   currFilterBy: toyModule.currFilterBy
  };
}
const mapDispatchToProps = {
  loadBoard,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
