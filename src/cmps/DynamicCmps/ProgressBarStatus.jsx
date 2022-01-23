import React from "react";
import { connect } from "react-redux";

class _ProgressBarStatus extends React.Component {
  state = {
    Done: 0,
    Working: 0,
    Stuck: 0,
  };

  componentDidMount() {
    this.countLabels();
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
    const countDone = board.groups[groupIdx].tasks.filter(
      (task) => task.status === "Done"
    );
    const countWorkingOnIt = board.groups[groupIdx].tasks.filter(
      (task) => task.status === "Working on it"
    );
    const counStuck = board.groups[groupIdx].tasks.filter(
      (task) => task.status === "Stuck"
    );

    this.setState({
      Done: countDone,
      Working: countWorkingOnIt,
      Stuck: counStuck,
    });
  };

  render() {
    const { groupId } = this.props;
    const Done = ((this.state.Done.length / this.totalTaskCount) * 100)
    const Working = (
      (this.state.Working.length / this.totalTaskCount) *
      100
    )
    const Stuck = (
      (this.state.Stuck.length / this.totalTaskCount) *
      100
    )
    const Empty = 100 - Done - Working - Stuck;
    console.log('Empty:',Empty );
    
    console.log("Done:", Done);
    console.log("Working:", Working);
    console.log("Stuck:", Stuck);

    return (
      <div className="status-bar">
        <div
          title={{Done}+"%"}
          style={{
            width: Done+"%",
            height:"34px",
            backgroundColor: "#00C875",
          }}
        ></div>{" "}
        <div
          title={{Working}+"%"}
          style={{
            width: Working+"%",
            height:"34px",
            backgroundColor: "#ffcb00",
          }}
        ></div>{" "}
        <div
          title={Stuck}
          style={{
            width: Stuck+"%",
            height:"34px",
            backgroundColor: "#E2445C",
          }}
        ></div>{" "}
        <div
          title={Empty}
          style={{
            width: 
              Empty+"%"
            ,
            height:"34px",
            backgroundColor: "#c4c4c4",
          }}
        ></div>{" "}
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
export const ProgressBarStatus = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProgressBarStatus);
