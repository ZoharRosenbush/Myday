
import React from "react";
import { connect } from "react-redux";




class _BoardFilterListCmp extends React.Component {

    state={

    }

    handelChange=({target})=>{
     const value = target.innerText  
    }


render(){
const { labels, board } = this.props
    return (
        <ul className="filter-list">
            {board[labels].map((labelType) => {
                return (
                    <li key={labelType.id} className="flex" onClick={this.handelChange}>
                        <div className="status-circle" style={{ backgroundColor: `${labelType.bgColor}` }}>
                        </div>{(labelType.value !== 'Empty') ? labelType.value : 'Blank'}</li>
                )
            })}
        </ul>
    )
}
}



function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
    };
}
const mapDispatchToProps = {
    // addGroup,
    // loadBoards
};

export const BoardFilterListCmp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardFilterListCmp);

