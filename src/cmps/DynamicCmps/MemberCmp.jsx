import React from "react";

export class MemberCmp extends React.Component {
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

  render() {
    const { selectedStatus } = this.state;
    return <div className={selectedStatus}>{selectedStatus}</div>;
  }
}

