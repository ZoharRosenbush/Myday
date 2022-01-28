import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { GrHomeRounded } from "react-icons/gr";
import {Dashboard} from '../../pages/Dashboard.jsx'
// import { IoColorFillOutline } from 'react-icons/io'

class _MainDashboardCmp extends React.Component {

    state = {

    }


    goToDashbord=()=>{
        console.log('dashbords:');
        // <Link to={`/myday/board/${board._id}/dashboard`}></Link>
    }
    
    render() {
        
        
        const {board} = this.props
        return (
            <section className="main-dashboard flex">
                <div className="main-table-container flex">
                    <div><GrHomeRounded /></div>
                    <span>Main Table</span>
    
                </div> 
                <div className="dashboard-container">
                <Link to={`/myday/board/${board._id}/dashboard`}> <span> Dashboard</span></Link>
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
