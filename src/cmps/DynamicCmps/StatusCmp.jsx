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
  getBgColor = (info) => {
    const currStatus = info.statuses.filter((status) => {
      return (status.value === info.selectedStatus)
    })
    return currStatus[0].bgColor
  }
  getTxtColor = (info) => {
    const currStatus = info.statuses.filter((status) => {
      return (status.value === info.selectedStatus)
    })
    return currStatus[0].color
  }
  render() {
    const { cmpData } = this.props;
    const { type, info } = cmpData;
    console.log('info:', info);

    const { isModalOpen } = this.state;
    return (
<section className="status-member-section">
        <div
          style={{ backgroundColor: `${this.getBgColor(info)}`, color: `${this.getTxtColor(info)}` }}
          className={info.selectedStatus}
          onClick={this.openModal}>
          {info.selectedStatus}
        </div>
        {isModalOpen && (
          <div className="labels-modal statuses">
            {info.statuses.map((status, idx) => {
              return (
                <div
                  style={{ backgroundColor: `${status.bgColor}`, color: `${status.color}` }}
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
