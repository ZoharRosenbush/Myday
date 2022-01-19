import React from "react";

export class  StatusCmp {

  state = {
    isModalOpen: false,
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
render(){
const {cmpData} = this.props
  const { type, info } = cmpData;
  return <div className={info.selectedStatus}>{info.selectedStatus}</div>;
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
