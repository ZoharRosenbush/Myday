import React from "react";
import { connect } from "react-redux";

class _ProgressBarType extends React.Component {
  state = {
    Quality: 0,
    Feature: 0,
    Bug: 0,
    Improvement: 0,
    Security: 0,
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
    const countQuality = board.groups[groupIdx].tasks.filter(
      (task) => task.type === "Quality"
    );
    const countFeature = board.groups[groupIdx].tasks.filter(
      (task) => task.type === "Feature"
    );
    const countBug = board.groups[groupIdx].tasks.filter(
      (task) => task.type === "Bug"
    );
    const countImprovement = board.groups[groupIdx].tasks.filter(
      (task) => task.type === "Improvement"
    );
    const countSecurity = board.groups[groupIdx].tasks.filter(
      (task) => task.type === "Security"
    );

    this.setState({
      Quality: countQuality,
      Feature: countFeature,
      Bug: countBug,
      Improvement: countImprovement,
      Security: countSecurity,
    });
  };

  render() {
    const { groupId } = this.props;
    const Quality = (this.state.Quality.length / this.totalTaskCount) * 100;
    const Feature = (this.state.Feature.length / this.totalTaskCount) * 100;
    const Bug = (this.state.Bug.length / this.totalTaskCount) * 100;
    const Improvement = (this.state.Improvement.length / this.totalTaskCount) * 100;
    const Security = (this.state.Security.length / this.totalTaskCount) * 100;
    const Empty = 100 - Quality - Feature - Bug-Improvement-Security ;
    return (
      <div className="type-container">

      <div className="type-bar">
        <div
          className="progress-div"
          // title={Quality}
          style={{
            width: Quality + "%",
            
            backgroundColor: "#fcc4f7",
          }}
          ></div>
        <div
          className="progress-div"
          // title={Feature}
          style={{
            width: Feature + "%",
            backgroundColor: "#00c875",
          }}
          ></div>
        <div
          className="progress-div"
          // title={Bug}
          style={{
            width: Bug + "%",
            
            backgroundColor: "#e2445c",
          }}
          ></div>
        <div
          className="progress-div"
          // title={Improvement}
          style={{
            width: Improvement + "%",
            
            backgroundColor: "#a25ddc",
          }}
          ></div>
        <div
          className="progress-div"
          // title={Security}
          style={{
            width: Security + "%",
            
            backgroundColor: "#ffadad",
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
export const ProgressBarType = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProgressBarType);
