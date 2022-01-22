import React from "react";
import { BsPersonCircle, BsPinAngle } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { BiSortAlt2, BiColorFill } from "react-icons/bi";
import { FiFilter, FiEyeOff } from "react-icons/fi";
// import { IoColorFillOutline } from 'react-icons/io'

export class BoardControllers extends React.Component {

state={
  isModalTaskOpen:false
}

openFilterModal = ()=>{
  this.setState({isModalTaskOpen: !this.state.isModalTaskOpen})
}

  render() {
    const { onAddGroup } = this.props;
    const { isModalTaskOpen } = this.state;
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
          <div className="filter-modal">
            <div className="flex column-filter">
              <h4>Status</h4>
              <ul className="filter-list">
                <li>Done</li>
                <li>Stuck</li>
                <li>Working on it</li>
              </ul>
            </div>
            <div className="flex column-filter">
              <h4>Priority</h4>
              <ul className="filter-list">
          
                <li>High</li>
                <li>Medium</li>
                <li>Low</li>
              </ul>
            </div>
          </div>
        )}
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
      </section>
    );
  }
}
