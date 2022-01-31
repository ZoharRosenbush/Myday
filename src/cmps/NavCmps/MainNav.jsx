import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { HiSparkles, HiOutlinePuzzle } from "react-icons/hi";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { CgLogIn } from "react-icons/cg";
import { BsCalendar2Check, BsInbox } from "react-icons/bs";
import { RiUserAddLine, RiQuestionMark } from "react-icons/ri";
import { utilService } from "../../services/utils.service";
import logo from "../../assets/imgs/logo.png";
import { logout } from '../../store/user.action.js'
class _MainNav extends React.Component {


  state = {
    isModalOpen: false
  }

  openUserModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }


  render() {
    const { user, isBoardNavOpen } = this.props
    const { isModalOpen } = this.state
    const bgColor = user ? user.userColor : "lightgray";
    const className = isBoardNavOpen? '' :'hidden'

    return (
      <section className={`main-nav ${className}`}>
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
          <div className="user-avatar ME" onClick={this.openUserModal} style={{ backgroundColor: bgColor}}>{(this.props.user) ? user.acronyms : <CgProfile style={{ fontSize:"45px", marginLeft:"-3px", marginTop:"-2px" }} />}</div>
          {isModalOpen &&
            <div className="user-modal">
              <Link className="clean-link" to={'/login'}><p><CgLogIn style={{ marginRight: "6px", transform: "translateY(2.5px)" }} />Log in</p></Link>
              <p onClick={this.props.logout}><CgLogOut style={{ marginRight: "4px", transform: "translateY(2.5px)" }} /> Log out</p>



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
    isBoardNavOpen: boardModule.isBoardNavOpen
  };
}
const mapDispatchToProps = {
  logout
};

export const MainNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MainNav);
