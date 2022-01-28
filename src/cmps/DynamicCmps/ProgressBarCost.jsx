import React from "react";
import { connect } from "react-redux";

class _ProgressBarCost extends React.Component {
    state = {

        Sum: 0,
        Avg: 0,
        Min: 0,
        Max: 0
    };

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.board !== this.props.board) {

        }
    }

    get sum() {
        const { groupId, board } = this.props;
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let sum = 0;
        board.groups[groupIdx].tasks.forEach(task => {
            if (task.cost !== "Empty" || !task.cost) {

                sum += +task.cost
            }
        })
        return sum

    }


    render() {
        const { groupId } = this.props;



        return (
            <div className="cost-container">
                <div className="cost-bar-sum">
                    {this.sum}
                </div>
                <div className="sum-title">
                    sum
                </div>
            </div>
        );
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
    };
}
const mapDispatchToProps = {};
export const ProgressBarCost = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ProgressBarCost);
