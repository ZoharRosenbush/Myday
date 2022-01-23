import React from "react";
import { connect } from "react-redux";
import { BsPersonCircle, BsPinAngle } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { BiSortAlt2, BiColorFill } from "react-icons/bi";
import { FiFilter, FiEyeOff } from "react-icons/fi";
import { BoardFilterListCmp } from './BoardFilterListCmp'
// import { IoColorFillOutline } from 'react-icons/io'

class _BoardControllers extends React.Component {

  state = {
    isModalTaskOpen: false
  }

  openFilterModal = () => {
    this.setState({ isModalTaskOpen: !this.state.isModalTaskOpen })
  }

  render() {
    const { onAddGroup } = this.props;
    const { isModalTaskOpen } = this.state;
    const { board } = this.props


    return (
      <section className="board-controllers flex">
        <button className="add-group-btn" onClick={onAddGroup}>
          New Group
        </button>
        <div className="controller-opt">
          <CgSearch />
          <button>Search</button>
        </div>

        <div className="controller-opt">
          <BsPersonCircle />
          <button>Person</button>
        </div>
        <div className="controller-opt">
          <FiFilter />
          <button onClick={this.openFilterModal}>Filter</button>
        </div>
        {isModalTaskOpen && (
          <div className="filter-modal flex column">
            <div><p>Quick filters</p></div>
            <div className="flex">
              <div className="flex column-filter">
                <span className="filterBy">Status</span>
                <BoardFilterListCmp labels={"statuses"} />
              </div>
              <div className="flex column-filter">
                <span className="filterBy">Type</span>
                <BoardFilterListCmp labels={"types"} />
              </div>
              <div className="flex column-filter">
                <span className="filterBy">Priority</span>
                <BoardFilterListCmp labels={"priorities"} />
              </div>
              <div className="flex column-filter">
                <span className="filterBy">Role</span>
                <BoardFilterListCmp labels={"roles"} />
              </div>

              <div className="flex column-filter">
                <span className="filterBy">Member</span>
                <ul className="filter-list">
                  {board.members.map((member) => {
                    return (
                      <li key={member.id} className="flex">
                        <div className={`owner-name-circle ${member.acronyms}`} >{member.acronyms}
                        </div>{(member.fullname.length > 11) ? `${member.fullname.slice(0, 10)}...` : member.fullname}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>

        )
        }
        <div className="controller-opt">
          {" "}
          <BiSortAlt2 />
          <button>Sort</button>
        </div>
        <div className="controller-opt">
          <BsPinAngle />
        </div>
        <div className="controller-opt">
          <FiEyeOff />
        </div>
        <div className="controller-opt">
          <BiColorFill />
        </div>
      </section >
    );
  }
}


function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}
const mapDispatchToProps = {
  // addGroup,
  // loadBoards
};

export const BoardControllers = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardControllers);

