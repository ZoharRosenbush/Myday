import React from "react";
import { connect } from "react-redux";
import { BsPersonCircle, BsPinAngle } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { BiSortAlt2, BiColorFill } from "react-icons/bi";
import { FiFilter, FiEyeOff } from "react-icons/fi";
import { BoardFilterListCmp } from './BoardFilterListCmp'
import { loadBoard, updateFilter } from '../../store/board.action.js'
// import { IoColorFillOutline } from 'react-icons/io'

class _BoardControllers extends React.Component {

  state = {
    isModalFilterOpen: false,
    filterBy: {
      status: [],
      priority: [],
      type: [],
      role: [],
      member: []
    },
  }


  updateFilterBy = (value, field) => {
    const { updateFilter } = this.props
    const { filterBy } = this.state

    if (filterBy[field].includes(value)) {
      const newFilter = filterBy[field].filter(filteredValue => {
        return filteredValue !== value
      })
      this.setState((prevState) => (
        { ...prevState, filterBy: { ...prevState.filterBy, [field]: newFilter } }), () => {
          updateFilter(this.state.filterBy)
        })
    } else {
      this.setState((prevState) => (
        { ...prevState, filterBy: { ...prevState.filterBy, [field]: [...prevState.filterBy[field], value] } }), () => {
          updateFilter(this.state.filterBy)
        }
      )
    }
  }

  openFilterModal = () => {
    this.setState({ isModalFilterOpen: !this.state.isModalFilterOpen })
  }

  render() {
    const { onAddGroup } = this.props;
    const { isModalFilterOpen } = this.state;
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
        {isModalFilterOpen && (
          <div className="filter-modal flex column">
            <div><p>Quick filters</p></div>
            <div className="flex">
              <div className="flex column-filter">
                <span className="filterBy">Status</span>
                <BoardFilterListCmp updateFilterBy={this.updateFilterBy} labels={"statuses"} field={"status"} />
              </div>
              <div className="flex column-filter">
                <span className="filterBy">Type</span>
                <BoardFilterListCmp updateFilterBy={this.updateFilterBy} labels={"types"} field={"type"} />
              </div>
              <div className="flex column-filter">
                <span className="filterBy">Priority</span>
                <BoardFilterListCmp updateFilterBy={this.updateFilterBy} labels={"priorities"} field={"priority"} />
              </div>
              <div className="flex column-filter">
                <span className="filterBy">Role</span>
                <BoardFilterListCmp updateFilterBy={this.updateFilterBy} labels={"roles"} field={"role"} />
              </div>

              <div className="flex column-filter">
                <span className="filterBy">Member</span>
                <ul className="filter-list">
                  {board.members.map((member, idx) => {
                    return (
                      <li key={idx} className="flex">
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
    currFilterBy: boardModule.currFilterBy
  };
}
const mapDispatchToProps = {
  loadBoard,
  updateFilter
};

export const BoardControllers = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardControllers);

