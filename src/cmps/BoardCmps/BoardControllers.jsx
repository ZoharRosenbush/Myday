import React from "react";
import { connect } from "react-redux";
import { BsPersonCircle, BsPinAngle } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { BiSortAlt2, BiColorFill } from "react-icons/bi";
import { FiFilter, FiEyeOff } from "react-icons/fi";
import { BoardFilterListCmp } from './BoardFilterListCmp'
import { loadBoard, updateFilter, updateSearch } from '../../store/board.action.js'
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
    isSearchInputShown: false,
  }


  searchInput = React.createRef()


  showSearchInput = () => {
    this.setState((prevState) => (
      { ...prevState, isSearchInputShown: true }), () => {
        this.searchInput.current.focus()
      })

  }

  hideSearchInput = () => {
    this.setState((prevState) => (
      { ...prevState, isSearchInputShown: false }), () => {

      })

  }


  handleChange = ({ target }) => {

    const value = target.value
    console.log('value:', value);
    this.props.updateSearch(value)

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
          console.log('this.state:', this.state);
          
          updateFilter(this.state.filterBy)
        }
      )
    }
  }

  openFilterModal = () => {
    this.setState({ isModalFilterOpen: !this.state.isModalFilterOpen })
  }


  handleChangeMember = ({ target }) => {
    // this.setClassName()
    
    const value = target.id
    const field = "member"
    console.log('value:', value);
    // console.log('field:', field);
    this.updateFilterBy(value, field)

}



  render() {
    const { onAddGroup } = this.props;
    const { isModalFilterOpen, isSearchInputShown, filterBy } = this.state;
    const { board } = this.props

    return (
      <div>
        <section className="board-controllers flex">
          <button className="add-group-btn" onClick={onAddGroup}>
            New Group
          </button>
          <div className="input-search-wrapper">
            {isSearchInputShown &&
              <div className="flex search-container">
                <CgSearch style={{ marginLeft: "6px" }} />
                <form>

                  <input
                    className="input-search"
                    placeholder="Search"
                    ref={this.searchInput}
                    onBlur={this.hideSearchInput}
                    onChange={this.handleChange}
                  >

                  </input>
                </form>
              </div>}

            {!isSearchInputShown &&
              <div className="flex search-button controller-opt">
                <CgSearch />
                <button onClick={this.showSearchInput}>Search</button>
              </div>}
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
            <div style={{ position: "absolute" }}>
              <div className="filter-modal flex column" >
                <div><p>Quick filters</p></div>
                <div className="flex">
                  <div className="flex column-filter">
                    <span className="filterBy">Status</span>
                    <BoardFilterListCmp filterBy={filterBy} updateFilterBy={this.updateFilterBy} labels={"statuses"} field={"status"} />
                  </div>
                  <div className="flex column-filter">
                    <span className="filterBy">Type</span>
                    <BoardFilterListCmp filterBy={filterBy} updateFilterBy={this.updateFilterBy} labels={"types"} field={"type"} />
                  </div>
                  <div className="flex column-filter">
                    <span className="filterBy">Priority</span>
                    <BoardFilterListCmp filterBy={filterBy} updateFilterBy={this.updateFilterBy} labels={"priorities"} field={"priority"} />
                  </div>
                  <div className="flex column-filter">
                    <span className="filterBy">Role</span>
                    <BoardFilterListCmp filterBy={filterBy} updateFilterBy={this.updateFilterBy} labels={"roles"} field={"role"} />
                  </div>

                  <div className="flex column-filter">
                    <span className="filterBy">Member</span>
                    <ul className="filter-list">
                      {board.members.map((member, idx) => {
                        return (
                          <li key={idx} className="flex" id={member.username} onClick={this.handleChangeMember}>
                            <div className={`owner-name-circle ${member.acronyms}`} style={{backgroundColor:member.userColor}} >{member.acronyms}
                            </div>{(member.fullname.length > 11) ? `${member.fullname.slice(0, 10)}...` : member.fullname}</li>
                        )
                      })}
                    </ul>
                  </div>
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
      </div>
    );
  }
}


function mapStateToProps({ boardModule, userModule }) {
  return {
    board: boardModule.board,
    user: userModule.user,
    currFilterBy: boardModule.currFilterBy
  };
}
const mapDispatchToProps = {
  loadBoard,
  updateFilter,
  updateSearch
};

export const BoardControllers = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardControllers);

