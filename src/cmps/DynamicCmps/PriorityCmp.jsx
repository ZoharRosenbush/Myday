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

    render() {
        const { cmpData } = this.props;
        const { info } = cmpData;
        const { isModalOpen } = this.state;
        console.log(this.state);
        console.log('info:', info);
        console.log(cmpData);
        return (
            <section>
                <div className={info.selectedStatus} onClick={this.openModal}>
                    {info.selectedStatus}
                </div>
                {isModalOpen && (
                    <div className="labels-modal priorities">
                        {info.priorities.map((priority, idx) => {
                            return (<div
                                style={{ backgroundColor: `${priority.color}` }}
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