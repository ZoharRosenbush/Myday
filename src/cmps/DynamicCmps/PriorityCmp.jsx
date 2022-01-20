import React from "react";


export class PriorityCmp extends React.Component {
    state = {
        isModalOpen: false,
    };

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    handleChange = ({ target }) => {
        const { cmpData, onUpdateTask } = this.props;
        onUpdateTask(cmpData.type, target.className);
        this.setState({ isModalOpen: false });
    };

    getBgColor = (info) => {
        const currPritority = info.priorities.filter((p) => {
            return (p.value === info.selectedStatus)
        })
        return currPritority[0].bgColor
    }
    getTxtColor = (info) => {
        const currPritority = info.priorities.filter((p) => {
            return (p.value === info.selectedStatus)
        })
        return currPritority[0].color
    }


    render() {
        const { cmpData } = this.props;
        const { info } = cmpData;
        const { isModalOpen } = this.state;

        return (
            <section>
                <div className={info.selectedStatus}
                    style={{ backgroundColor: `${this.getBgColor(info)}`, color: `${this.getTxtColor(info)}` }}
                    onClick={this.openModal}>
                    {info.selectedStatus}
                </div>
                {isModalOpen && (
                    <div className="labels-modal priorities">
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