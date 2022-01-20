import React from "react";
import { connect } from "react-redux";

import { loadBoard } from "../store/board.action.js";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { GroupList } from "../cmps/GroupCmps/GroupList.jsx";

import {setActiveModal} from '../store/board.action.js'

// import { boards } from '../helpers/monday.js'
class _BoardDetails extends React.Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(boardId);
    const activeModal = { cmpType: null, taskId:null}
    document.addEventListener('click',()=>{this.props.setActiveModal(activeModal)});
  }

  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
      this.props.loadBoard(boardId)
    }
  }

  componentWillUnmount(){
    const activeModal = { cmpType: null, taskId:null}
    document.removeEventListener('click', ()=>{this.props.setActiveModal(activeModal)});

  }



  render() {
    const { board } = this.props;


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
  setActiveModal
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
