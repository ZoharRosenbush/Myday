import React from "react";
import { CgProfile } from "react-icons/cg";

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
              return <div style={{ backgroundColor: owner.userColor }} key={idx} className={owner.acronyms}>{owner.acronyms === "G" ? (<CgProfile style={{height:"33px", width:"33px",transform:"translateY(7px)", color:"lightgray", marginLeft:"-6px" }}/>) : owner.acronyms}</div>;
            })}
        </div>
        {activeModal.cmpType === type && activeModal.taskId === taskId && isEditMode && (
          <div className="labels-modal members">
            {info.members.map((member, idx) => {
              
              return (
                <div
                  className={member._id}
                  key={idx}
                  onClick={this.handelChange}
                >

                  <div className="user-avatar" style={{backgroundColor:member.userColor}}>{member.acronyms }</div>
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
