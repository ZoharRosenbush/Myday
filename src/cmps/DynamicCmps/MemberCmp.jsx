import React from "react";

export class MemberCmp extends React.Component {
  state = {
    isEditMode: false,
    owners: [],
  };

  // type: "member-picker",
  // info: {
  //   selectedMembers: task.owner,
  //   members: board.members,
  // },

  openModal = () => {
    const { cmpData, setActiveModal, taskId } = this.props;
    this.setState({ isEditMode: true });
    const activeModal = { cmpType: cmpData.type, taskId }
    setActiveModal(activeModal)
  };

  handelChange = ({ target }) => {
    const { cmpData, onUpdateTask } = this.props;
    const { info } = cmpData;
    const ownerToSave = info.members.find((member) => {
      return member._id === target.className;
    });
    onUpdateTask(cmpData.type, ownerToSave);
    this.setState({ isEditMode: false });
  };

  render() {
    const { cmpData, activeModal, taskId } = this.props;
    const { type, info } = cmpData;
    const { isEditMode } = this.state

    return (
      <section className="member-picher-section" >
        <div className="member-picker" onClick={(ev) => {
          ev.stopPropagation()
          this.openModal()
        }}>
          {info.selectedOwners &&
            info.selectedOwners.map((owner, idx) => {
              // console.log('owner:', owner);
              
              return <div style={{ backgroundColor: owner.userColor }} key={idx} className={owner.acronyms ? owner.acronyms : "guest"}>{owner.acronyms}</div>;
            })}
        </div>
        {activeModal.cmpType === type && activeModal.taskId === taskId && isEditMode && (
          <div className="labels-modal members">
            {info.members.map((member, idx) => {
              const className = member._id ? member._id : "guest"
              return (
                <div
                  className={className}
                  key={idx}
                  onClick={this.handelChange}
                >
                  {member.fullname}

                  {/* <img src={member.imgUrl} alt=""></img> */}
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}
