import React from "react";
import { connect } from "react-redux";
import { BsPersonCircle, BsPinAngle } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { BiSortAlt2, BiColorFill } from "react-icons/bi";
import { FiFilter, FiEyeOff } from "react-icons/fi";
import { BoardFilterListCmp } from './BoardFilterListCmp'
import { loadBoard, updateFilter, updateSearch, setActiveModal } from '../../store/board.action.js'
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


  openFilterModal = () => {
    const { setActiveModal } = this.props;
    const activeModal = { cmpType: 'filter' }
    setActiveModal(activeModal)
  }



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


  clearFilter = () => {
    const { updateFilter } = this.props
    this.setState({
      filterBy: {
        status: [],
        priority: [],
        type: [],
        role: [],
        member: []
      }
    }, () => {
      updateFilter(this.state.filterBy)
    })

  }

  handleChange = ({ target }) => {
    const value = target.value
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
          updateFilter(this.state.filterBy)
        }
      )
    }
  }

  // openFilterModal = () => {
  //   this.setState({ isModalFilterOpen: !this.state.isModalFilterOpen })
  // }


  handleChangeMember = ({ target }) => {
    // this.setClassName()

    const value = target.id
    const field = "member"
    this.updateFilterBy(value, field)

  }

  filterAcronyms = () => {
    return false
  }

  render() {
    const { onAddGroup, activeModal } = this.props;
    const { isSearchInputShown, filterBy } = this.state;
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

          {/* <div className="controller-opt">
            <BsPersonCircle />
            <button>Person</button>
          </div> */}
          <div className="controller-opt" onClick={(ev) => {
            ev.stopPropagation()
            this.openFilterModal()
          }}>
            <FiFilter />
            <button >Filter</button>
          </div>

          {activeModal.cmpType === 'filter' &&
            <div style={{ position: "absolute" }}>
              <div className="filter-modal flex column" >
                <div className="filter-headline"><p>Quick filters</p>
                  <button className="clear-all-btn" onClick={this.clearFilter}>
                    Clear all
                  </button>
                </div>
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
                        const className = (filterBy.member.includes(member.username)) && 'filterClicked'
                        return (
                          <li key={idx} className={`flex ${className}`} id={member.username} onClick={this.handleChangeMember}>
                            <div className={`owner-name-circle ${member.acronyms}`} style={{ backgroundColor: member.userColor }} onClick={this.filterAcronyms}>
                              {member.acronyms}
                            </div>
                            {(member.fullname.length > 11) ? `${member.fullname.slice(0, 10)}...` : member.fullname}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          }
          {/* <div className="controller-opt">
            <BiSortAlt2 />
            <button>Sort</button>
          </div> */}
          {/* <div className="controller-opt">
            <BsPinAngle />
          </div>
          <div className="controller-opt">
            <FiEyeOff />
          </div>
          <div className="controller-opt">
            <BiColorFill />
          </div> */}
        </section >
      </div>
    );
  }
}


function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    activeModal: boardModule.activeModal,
  };
}
const mapDispatchToProps = {
  loadBoard,
  updateFilter,
  updateSearch,
  setActiveModal,
};

export const BoardControllers = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardControllers);

