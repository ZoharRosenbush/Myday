import React from "react";

export class StatusCmp extends React.Component {
  state = {
    selectedStatus: null,
    statuses: [
      { value: "", color: "grey" },
      { value: "Done", color: "green" },
      { value: "Stuck", color: "red" },
      { value: "Working on it", color: "orange" },
    ],
  };

  componentDidMount() {
    const { info } = this.props;
    this.setState({ selectedStatus: info });
  }

//   get colorStatus() {
//     const { selectedStatus, statuses } = this.state;
//     const color = statuses.map((status) => {
//       if (status.value === selectedStatus) return status.color;
//     });
//     return color
//   }

  render() {
const {selectedStatus} = this.state
    return <div className={selectedStatus}>
        {selectedStatus}
    </div>;
  }
}

const cmp1 = {
  type: "status-picker",
  info: {
    selectedStatus: "Done",
    statuses: [
      { value: "", color: "grey" },
      { value: "Done", color: "green" },
      { value: "Stuck", color: "red" },
      { value: "Working on it", color: "orange" },
    ],
  },
};
