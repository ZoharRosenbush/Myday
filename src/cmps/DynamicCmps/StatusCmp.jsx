import React from "react";

export class StatusCmp extends React.Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  handelChange = ({ target }) => {
    const { cmpData, onUpdateTask } = this.props;
    onUpdateTask(cmpData.type, target.className);
  };


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
