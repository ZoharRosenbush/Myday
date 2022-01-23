import { connect } from "react-redux";

function _BoardFilterListCmp({ labels, board }) {
    return (
        <ul className="filter-list">
            {board[labels].map((labelType) => {
                return (
                    <li key={labelType.id} className="flex">
                        <div className="status-circle" style={{ backgroundColor: `${labelType.bgColor}` }}>
                        </div>{(labelType.value !== 'Empty') ? labelType.value : 'Blank'}</li>
                )
            })}
        </ul>
    )
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

