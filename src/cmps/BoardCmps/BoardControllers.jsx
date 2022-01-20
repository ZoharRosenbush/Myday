import { BsPersonCircle, BsPinAngle } from 'react-icons/bs'
import { CgSearch } from 'react-icons/cg'
import { BiSortAlt2, BiColorFill } from 'react-icons/bi'
import { FiFilter, FiEyeOff } from 'react-icons/fi'
// import { IoColorFillOutline } from 'react-icons/io'

export function BoardControllers() {
  return (
    <section className="board-controllers flex">
      <button className="add-group-btn">New Group</button>
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
        <button>Filter</button></div>
      <div className="controller-opt">  <BiSortAlt2 /><button>Sort</button></div>
      <div className="controller-opt"><BsPinAngle /></div>
      <div className="controller-opt"><FiEyeOff /></div>
      <div className="controller-opt"><BiColorFill /></div>



    </section>
  );
}
