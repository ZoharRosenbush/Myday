
import React from "react";
import { connect } from "react-redux";



class _BoardFilterListCmp extends React.Component {
    state = { isFilterBtnClicked: false }

    handleChange = ({ target }) => {
        this.setClassName()
        const value = target.innerText
        const field = target.dataset.field
        this.props.updateFilterBy(value, field)
    }

    setClassName = (field) => {
        this.setState({ isFilterBtnClicked: !this.state.isFilterBtnClicked })

        // const className = field && 'filterClicked'
        // return className
    }

    render() {
        const { labels, board, field } = this.props
        const { isFilterBtnClicked } = this.state
        // const btnClassName = isFilterBtnClicked && 'filterClicked'
        return (
            <ul className="filter-list">
                {board[labels].map((labelType, idx) => {
                    return (
                        <li key={idx} id={`${labelType.value}-${field}`} data-field={field}
                            className={`flex ${isFilterBtnClicked}`}
                            // className={`flex ${btnClassName}`}
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

};

export const BoardFilterListCmp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BoardFilterListCmp);

