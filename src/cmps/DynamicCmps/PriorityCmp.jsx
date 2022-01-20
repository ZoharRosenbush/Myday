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

    getLabelColor = (info) => {
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
                    style={{ backgroundColor: `${this.getLabelColor(info)}`, color: "white" }}
                    onClick={this.openModal}>
                    {info.selectedStatus}
                </div>
                {isModalOpen && (
                    <div className="labels-modal priorities">
                        {info.priorities.map((priority, idx) => {
                            return (<div
                                style={{ backgroundColor: `${priority.color}`, color: "white" }}
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