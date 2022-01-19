import React from "react";

export class StatusCmp extends React.Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    console.log("open modal");
    this.setState({ isModalOpen: true });
  };

  handelChange = ({ target }) => {
    const { cmpData, onUpdateTask } = this.props;
    console.log("target.className:", target.className);
    onUpdateTask(cmpData.type, target.className);
  };

  // componentDidMount() {
  //   const { task } = this.props;
  //   this.setState({ selectedStatus: task.status });
  // }

  //   get colorStatus() {
  //     const { selectedStatus, statuses } = this.state;
  //     const color = statuses.map((status) => {
  //       if (status.value === selectedStatus) return status.color;
  //     });
  //     return color
  //   }
  render() {
    const { cmpData } = this.props;
    const { type, info } = cmpData;
    const { isModalOpen } = this.state;
    return (
      <section>
        <div className={info.selectedStatus} onClick={this.openModal}>
          {info.selectedStatus}
        </div>
        {isModalOpen && (
          <div className="labels-modal statuses">
            {info.statuses.map((status, idx) => {
              return (
                <div
                  className={status.value}
                  key={idx}
                  onClick={this.handelChange}
                >
                  {status.value}
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

// const cmp1 = {
//   type: "status-picker",
//   info: {
//     selectedStatus: "Done",
//     statuses: [
//       { value: "", color: "grey" },
//       { value: "Done", color: "green" },
//       { value: "Stuck", color: "red" },
//       { value: "Working on it", color: "orange" },
//     ],
//   },
// };
