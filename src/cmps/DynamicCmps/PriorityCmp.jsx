import React from "react";


export class PriorityCmp extends React.Component {
    state = {
        isEditMode: false,
    };

    openModal = () => {
        const { cmpData, setActiveModal, taskId } = this.props;
        this.setState({ isEditMode: true });
        const activeModal = { cmpType: cmpData.type, taskId }
        setActiveModal(activeModal)
    }

    handleChange = ({ target }) => {
        const { cmpData, onUpdateTask } = this.props;
        onUpdateTask(cmpData.type, target.className);
        this.setState({ isEditMode: false });
    };

    getBgColor = (info) => {
        const currPritority = info.priorities.filter((priority) => {
            return (priority.value === info.selectedStatus)
        })
        return currPritority[0].bgColor
    }
    getTxtColor = (info) => {
        const currPritority = info.priorities.filter((priority) => {
            return (priority.value === info.selectedStatus)
        })
        return currPritority[0].color
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
            <section className="status-member-section ">
                <div className={`${info.selectedStatus} ${isMouseOver && 'dog-ear'}`}
                    style={{ backgroundColor: `${this.getBgColor(info)}`, color: `${this.getTxtColor(info)}` }}
                    onMouseOver={() => this.addDogEarClassName()}
                    onMouseLeave={() => this.removeDogEarClassName()}
                    onClick={(ev) => {
                        ev.stopPropagation()
                        this.openModal()
                    }}>
                    {info.selectedStatus}
                </div>
                {activeModal.cmpType === type && activeModal.taskId === taskId && isEditMode && (
                    <div className="labels-modal priorities ">
                        {info.priorities.map((priority, idx) => {
                            return (<div
                                style={{ backgroundColor: `${priority.bgColor}`, color: `${priority.color}` }}
                                className={priority.value}
                                key={idx}
                                onClick={this.handleChange}
                            >
                                {priority.value}
                            </div>)
                        })}
                    </div>
                )}
            </section>
        )
    }



}