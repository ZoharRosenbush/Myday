
import React from "react";
import { connect } from "react-redux";



class _BoardFilterListCmp extends React.Component {

    handleChange = ({ target }) => {
        const value = target.innerText
        const field = target.id

        this.props.updateFilterBy(value, field)
    }

    render() {
        const { labels, board, field } = this.props
        return (
            <ul className="filter-list">
                {board[labels].map((labelType, idx) => {

                    return (
                        <li key={idx} id={field} className="flex"
                            // onClick={this.toggleHandleFilter}>
                            onClick={this.handleChange}>
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
        currFilterBy: boardModule.currFilterBy
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

