import React from 'react';
import { BoardHeader } from '../cmps/BoardCmps/BoardHeader.jsx';
import { BoardNav } from '../cmps/NavCmps/BoardNav.jsx';
import {GroupList} from '../cmps/GroupCmps/GroupList.jsx'

// import { boards } from '../helpers/monday.js'
export class BoardDetails extends React.Component{



   componentDidMount() {
    const { boardId } = this.props.match.params;
    console.log('boardId:', boardId);
    
    // const  board = await boardService.getById(boardId)
    //   this.setState({ board });
 
  }

render(){

    return(
        <section>

        <BoardHeader 
        // title={board.title}
        />
        <BoardNav/>
        <GroupList/>
        </section>
    )
}
}