
import React from "react";
import { connect } from "react-redux";

import { updateFilter } from '../../store/board.action.js'


class _BoardFilterListCmp extends React.Component {

    state = {
        currFilterBy: {
            status: [],
            priority: [],
            type: [],
            role: [],
            member: []
        },
    }

    handleChange = ({ target }) => {

        const value = target.innerText
        const field = target.id
        const { currFilterBy } = this.state

        if (currFilterBy[field].includes(value)) {
            const newFilter = currFilterBy[field].filter(filteredValue => {
                return filteredValue !== value
            })
            this.setState({ currFilterBy: { ...this.state.currFilterBy, [field]: newFilter } }, ()=>{ 
                this.props.updateFilter(this.state.currFilterBy) })
        } else {
            this.setState((prevState) => ({
                ...prevState, currFilterBy: { ...prevState.currFilterBy, [field]: [...this.state.currFilterBy[field], value] }
            }), () => { this.props.updateFilter(this.state.currFilterBy) }
            )
        }
    }

    render() {
        const { labels, board, field } = this.props
        return (
            <ul className="filter-list">
                {board[labels].map((labelType) => {

                    return (
                        <li key={labelType.id} id={field} className="flex"
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
    };
}
const mapDispatchToProps = {
    updateFilter
    // addGroup,
    // loadBoards
};

export const BoardFilterListCmp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardFilterListCmp);

