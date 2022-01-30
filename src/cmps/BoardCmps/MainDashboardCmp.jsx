import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { GrHomeRounded } from "react-icons/gr";
import {Dashboard} from '../DynamicCmps/Dashboard.jsx'
// import { IoColorFillOutline } from 'react-icons/io'

class _MainDashboardCmp extends React.Component {

    state = {

    }
    
    render() {
        
        
        const {board} = this.props
        return (
            <section className="main-dashboard flex">
                <div className="main-table-container flex">
                    <div><GrHomeRounded /></div>
                    <Link className="clean-link" to={`/myday/board/${board._id}`}><span>Main Table</span></Link>
    
                </div> 
                <div className="dashboard-btn">
                <Link className="clean-link" to={`/myday/board/${board._id}/dashboard`}> <span> Dashboard</span></Link>
                </div>
            </section>
        )
    }
}


function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
        // currFilterBy: boardModule.currFilterBy
    };
}
const mapDispatchToProps = {
    //   loadBoard,
    //   updateFilter,
    //   updateSearch
};

export const MainDashboardCmp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_MainDashboardCmp);

