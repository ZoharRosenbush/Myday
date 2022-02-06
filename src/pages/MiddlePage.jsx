import { CgProfile } from "react-icons/cg";
import BoardSvg from "../assets/svgs/BoardSvg.svg";

export function MiddlePage({ user, bgColor, onAddNewBoard,isBoardNavOpen }) {
   

    const pageClassName = isBoardNavOpen? 'board-page preview': 'board-page'
    return (<section className={pageClassName}>
        <div className="flex hello-user">
            <p>{user ? "Hello " + user.username : "Hello Guest"}</p>
            <p className="board-page-avatar" style={{ backgroundColor: bgColor }}>{user ? user.acronyms : <CgProfile style={{ width: "100%", height: "100%" }} />}</p>
        </div>
        <div className="main-board-container">
            <div className= "middle-page-header">
                <h1>
                    Work the way that works <br/><span>for you</span>
                </h1>
                <p>Add board and start planning your tasks</p>
                <button className="board-btn" onClick={onAddNewBoard}>Add new board</button>
            </div>
            <div className="board-img-container">
                <img src={BoardSvg} alt=""></img>
            </div>
        </div>
    </section>
    )

}