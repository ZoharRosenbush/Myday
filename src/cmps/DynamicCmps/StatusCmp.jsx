import React from "react";

export class StatusCmp extends React.Component {
  state = {
    isEditMode: false,
    isMouseOver: false,
    isShowTask:true
  };

  openModal = () => {
    const { cmpData, setActiveModal, taskId } = this.props;
    this.setState({ isEditMode: true });
    const activeModal = { cmpType: cmpData.type, taskId }
    setActiveModal(activeModal)
  };

  handleChange = ({ target }) => {
    const { cmpData, onUpdateTask } = this.props;
    onUpdateTask(cmpData.type, target.className);
    this.setState({ isEditMode: false });
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

  addDogEarClassName = () => {
    this.setState({ isMouseOver: true })
  }
  removeDogEarClassName = () => {
    this.setState({ isMouseOver: false })
  }

  render() {
    const { cmpData, activeModal, taskId } = this.props;
    const { type, info } = cmpData;
    const { isEditMode, isMouseOver } = this.state

    return (
      <section className="status-member-section">
        <div
          style={{ backgroundColor: `${this.getBgColor(info)}`, color: `${this.getTxtColor(info)}` }}
          className={`${info.selectedStatus} ${isMouseOver && 'dog-ear'}`}
          onMouseOver={() => this.addDogEarClassName()}
          onMouseLeave={() => this.removeDogEarClassName()}
          onClick={(ev) => {
            ev.stopPropagation()
            this.openModal()
          }}>
          {info.selectedStatus}
        </div>
        {activeModal.cmpType === type && activeModal.taskId === taskId && isEditMode && (
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

