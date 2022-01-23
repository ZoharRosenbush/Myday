import React from "react";
import { connect } from "react-redux";

class _ProgressBarPriority extends React.Component {
  state = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  componentDidMount() {
    this.countLabels();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.board !== this.props.board) {
      this.countLabels();
    }
  }



  get totalTaskCount() {
    const { board } = this.props;
    const { groupId } = this.props;
    let tasksCount = 0;
    const groupIdx = board.groups.findIndex((group) => {
      return group.id === groupId;
    });
    tasksCount = board.groups[groupIdx].tasks.length;
    return tasksCount;
  }

  countLabels = () => {
    const { board, groupId } = this.props;
    const groupIdx = board.groups.findIndex((group) => {
      return group.id === groupId;
    });
    const countHigh = board.groups[groupIdx].tasks.filter(
      (task) => task.priority === "High"
    );
    const countMedium = board.groups[groupIdx].tasks.filter(
      (task) => task.priority === "Medium"
    );
    const countLow = board.groups[groupIdx].tasks.filter(
      (task) => task.priority === "Low"
    );

    this.setState({
      High: countHigh,
      Medium: countMedium,
      Low: countLow,
    });
  };

  render() {
    const { groupId } = this.props;
    const High = (this.state.High.length / this.totalTaskCount) * 100;
    const Medium = (this.state.Medium.length / this.totalTaskCount) * 100;
    const Low = (this.state.Low.length / this.totalTaskCount) * 100;
    const Empty = 100 - High - Medium - Low;
    // console.log("Empty:", Empty);

    // console.log("High:", High);
    // console.log("Medium:", Medium);
    // console.log("Stuck:", Low);

    return (
      <div className="priority-container">
        <div className="priority-bar">
          <div
            className="progress-div"
            // title={High}
            style={{
              width: High + "%",
              backgroundColor: "#225091",
            }}
          ></div>
          <div
            className="progress-div"
            // title={Medium}
            style={{
              width: Medium + "%",
              backgroundColor: "#0086c0",
            }}
          ></div>
          <div
            className="progress-div"
            // title={Low}
            style={{
              width: Low + "%",

              backgroundColor: "#66ccff",
            }}
          ></div>
          <div
            className="progress-div"
            // title={Empty}
            style={{
              width: Empty + "%",

              backgroundColor: "#c4c4c4",
            }}
          ></div>{" "}
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
export const ProgressBarPriority = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProgressBarPriority);
