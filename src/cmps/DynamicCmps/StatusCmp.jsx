import React from "react";

export class StatusCmp extends React.Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleChange = ({ target }) => {
    const { cmpData, onUpdateTask } = this.props;
    onUpdateTask(cmpData.type, target.className);
    this.setState({ isModalOpen: false });
  };
  getLabelColor = (info) => {
    const currStatus = info.statuses.filter((p) => {
      return (p.value === info.selectedStatus)
    })
    return currStatus[0].color
  }
  render() {
    const { cmpData } = this.props;
    const { type, info } = cmpData;
    const { isModalOpen } = this.state;
    return (
      <section>
        <div
          style={{ backgroundColor: `${this.getLabelColor(info)}`, color: "white" }}
          className={info.selectedStatus}
          onClick={this.openModal}>
          {info.selectedStatus}
        </div>
        {isModalOpen && (
          <div className="labels-modal statuses">
            {info.statuses.map((status, idx) => {
              return (
                <div
                  style={{ backgroundColor: `${status.color}`, color: "white" }}
                  className={status.value}
                  key={idx}
                  onClick={this.handleChange}
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
