import React from "react";
import { connect } from "react-redux";

class _ProgressBarRole extends React.Component {
  state = {
    Dev: 0,
    Design: 0,
    Product: 0,
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
    const countDev = board.groups[groupIdx].tasks.filter(
      (task) => task.role === "Dev"
    );
  

    const countDesign = board.groups[groupIdx].tasks.filter(
      (task) => task.role === "Design"
    );
    const countProduct = board.groups[groupIdx].tasks.filter(
      (task) => task.role === "Product"
    );

    this.setState({
      Dev: countDev,
      Design: countDesign,
      Product: countProduct,
    });
  };

  render() {
    const { groupId } = this.props;
    const Dev = (this.state.Dev.length / this.totalTaskCount) * 100;
    const Design = (this.state.Design.length / this.totalTaskCount) * 100;
    const Product = (this.state.Product.length / this.totalTaskCount) * 100;
    const Empty = 100 - Dev - Design - Product;
    return (
      <div className="role-container">
        <div className="type-bar">
          <div
            className="progress-div"
            title={Dev + "%"}
            style={{
              width: Dev + "%",
              backgroundColor: "#279165",
            }}
          ></div>
          <div
            className="progress-div"
            title={Design + "%"}
            style={{
              width: Design + "%",
              backgroundColor: "#0086c0",
            }}
          ></div>
          <div
            className="progress-div"
            title={Product + "%"}
            style={{
              width: Product + "%",

              backgroundColor: "#a25ddc",
            }}
          ></div>
          <div
            className="progress-div"
            title={Empty + "%"}
            style={{
              width: Empty + "%",

              backgroundColor: "#c4c4c4",
            }}
          ></div>
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
export const ProgressBarRole = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProgressBarRole);
