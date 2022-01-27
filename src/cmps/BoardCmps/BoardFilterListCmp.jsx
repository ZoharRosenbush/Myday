
import React from "react";
import { connect } from "react-redux";



class _BoardFilterListCmp extends React.Component {
    state = {
        isFilterBtnClicked: false,
        selectedIds: []
    }

    handleChange = ({ target }) => {
        // this.setClassName()
        const value = target.innerText
        const field = target.dataset.field
        // const id = target.dataset.id
        // this.setState({ isFilterBtnClicked: !this.state.isFilterBtnClicked })
        this.props.updateFilterBy(value, field)
        // this.updateClickedBtn(id)
    }


    // updateClickedBtn = (value, field) => {
    //     const { selectedIds } = this.state

    //     if (selectedIds[field].includes(value)) {
    //         const newFilter = selectedIds[field].filter(filteredValue => {
    //             return filteredValue !== value
    //         })
    //         this.setState((prevState) => (
    //             { ...prevState, selectedIds: { ...prevState.selectedIds, [field]: newFilter } }), () => {
    //                 updateFilter(this.state.selectedIds)
    //             })
    //     } else {
    //         this.setState((prevState) => (
    //             { ...prevState, selectedIds: { ...prevState.selectedIds, [field]: [...prevState.selectedIds[field], value] } }), () => {
    //                 updateFilter(this.state.selectedIds)
    //             }
    //         )
    //     }

    // }



    // setClassName = (field) => {
    //     this.setState({
    //         isFilterBtnClicked: !this.state.isFilterBtnClicked,
    //         selectedId: [this.state.selectedId]
    //     })

    //     // const className = field && 'filterClicked'
    //     // return className
    // }

    render() {
        const { labels, board, field, filterBy } = this.props
        console.log('field:', field);
        console.log('filterBy:', filterBy);
        console.log('labels:', labels);

        // const { isFilterBtnClicked } = this.state
        // const btnClassName = isFilterBtnClicked && 'filterClicked'
        return (
            <ul className="filter-list">
                {board[labels].map((labelType, idx) => {
                    const className = (filterBy[field].includes(labelType.value)) && 'filterClicked'
                    return (
                        <li key={idx} id={`${labelType.value}-${field}`} data-field={field}
                            // className={`flex ${isFilterBtnClicked}`}
                            className={`flex ${className}`}
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

