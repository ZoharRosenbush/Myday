import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { HiSparkles, HiOutlinePuzzle } from "react-icons/hi";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import { BsCalendar2Check, BsInbox } from "react-icons/bs";
import { RiUserAddLine, RiQuestionMark } from "react-icons/ri";
import logo from "../../assets/imgs/logo.png";
import { utilService } from "../../services/utils.service";
class _MainNav extends React.Component {


  state = {
    isModalOpen: false
  }

  openUserModal = ()=>{
    this.setState({isModalOpen: !this.state.isModalOpen})
  }


  render() {
    const { user } = this.props
    const { isModalOpen } = this.state
    console.log('this.state.isModalOpen:', this.state.isModalOpen);
    
    return (
      <section className="main-nav">
        <div className="top-opt flex">
          <Link to={'/'}><img className="2day-logo" src={logo} alt="" /></Link>
          <div className="grid-container">
            <BiGridAlt
              color="white"
              size="23px"
              style={{ marginLeft: "6px", marginTop: "6px", cursor: "pointer" }}
            />
          </div>
          <AiOutlineBell
            color="white"
            size="23px"
            style={{ marginLeft: "19px", cursor: "pointer" }}
          />
          <BsInbox
            color="white"
            size="23px"
            style={{ marginLeft: "19px", cursor: "pointer" }}
          />
          <BsCalendar2Check
            color="white"
            size="23px"
            style={{ marginLeft: "19px", cursor: "pointer" }}
          />
        </div>
        <div className="see-plans flex align-center justify-center">
          <h2>
            <HiSparkles
              color="white"
              style={{
                textAlign: "center",
              }}
            />
            See Plans{" "}
          </h2>
        </div>
        <div className="bottom-opt flex">
          <HiOutlinePuzzle
            color="white"
            size="23px"
            style={{ marginLeft: "19px", cursor: "pointer" }}
          />
          <RiUserAddLine
            color="white"
            size="23px"
            style={{ marginLeft: "19px", cursor: "pointer" }}
          />
          <AiOutlineSearch
            color="white"
            size="23px"
            style={{ marginLeft: "19px", cursor: "pointer" }}
          />
          <RiQuestionMark
            color="white"
            size="23px"
            style={{ marginLeft: "19px", cursor: "pointer" }}
           
          />
          <div className="user-avatar ME"  onClick={this.openUserModal} style={{backgroundColor: utilService.getNiceRandomColor()}}>{(this.props.user) ? user.acronyms : "GST"}</div>
          {isModalOpen && 
          <div className="user-modal">
            <Link className="clean-link" to={'/login'}><p>Log in</p></Link> 
            <p>Log out</p>

            </div>
          }
        </div>
      </section>
    );
  }
}


function mapStateToProps({ boardModule, userModule }) {
  return {
    user: userModule.user,
  };
}
const mapDispatchToProps = {

};

export const MainNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MainNav);
