import React from 'react';
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { BoardNav } from '../cmps/BoardNav.jsx'
import {GroupList} from '../cmps/GroupList.jsx'
import { boards } from '../helpers/monday.js'
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