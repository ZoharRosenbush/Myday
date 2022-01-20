import React from "react";

export class MemberCmp extends React.Component {
  state = {
    isModalOpen: false,
    owners: [],
  };

  // type: "member-picker",
  // info: {
  //   selectedMembers: task.owner,
  //   members: board.members,
  // },

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  handelChange = ({target}) => {
    const { cmpData, onUpdateTask } = this.props;
    const { info } = cmpData;
    const ownerToSave = info.members.find((member) => {
      return member._id === target.className;
    });
    this.setState({ isModalOpen: false });
    onUpdateTask(cmpData.type, ownerToSave);
  };

  render() {
    const { cmpData } = this.props;
    const { type, info } = cmpData;
    console.log('info:', info);
    
    const { isModalOpen } = this.state;
    return (
      <section>
        <div onClick={this.openModal}>
          {info.selectedOwners &&
            info.selectedOwners.map((owner) => {
              return owner.acronyms;
            })}
        </div>
        {isModalOpen && (
          <div className="labels-modal members">
            {info.members.map((member, idx) => {
              return (
                <div
                  className={member._id}
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
