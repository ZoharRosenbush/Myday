import React from "react";

export class MemberCmp extends React.Component {
  state = {
    isModalOpen: false,
  };

  // type: "member-picker",
  // info: {
  //   selectedMembers: task.owner,
  //   members: board.members,
  // },

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  handelChange = (ev) => {
    console.log('ev.target.innerText:', ev.target.innerText);
    
    const { cmpData, onUpdateTask } = this.props;
    onUpdateTask(cmpData.type, ev.target.innerText);
    this.setState({ isModalOpen: false });
  };

  render() {
    const { cmpData } = this.props;
    const { type, info } = cmpData;
    const { isModalOpen } = this.state;
    return (
      <section>
        <div onClick={this.openModal}>
          {info.selectedMembers && info.selectedMembers.map(member=>{
            console.log('member.username:', member.username);
            return member.username
          })}
        </div>
        {isModalOpen && (
          <div className="labels-modal memners">
            {info.members.map((member, idx) => {
              return (
                <div
                  className={member.fullname}
                  key={idx}
                  onClick={this.handelChange}
                >
                  {member.fullname}
                  <img src={member.imgUrl} alt=""></img>
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}
