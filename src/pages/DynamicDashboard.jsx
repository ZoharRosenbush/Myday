import React from "react";
import { connect } from "react-redux";
import { Dashboard } from "../cmps/DynamicCmps/Dashboard.jsx";
import { DashboardPai } from "../cmps/DashboardPai.jsx";
import { MainDashboardCmp } from "../cmps/BoardCmps/MainDashboardCmp.jsx";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import { FaLayerGroup } from 'react-icons/fa'
import { MdPeople } from 'react-icons/md'
import { FaTasks } from 'react-icons/fa'

class _DynamicDashboard extends React.Component {

    state = {
        groupsCount: 0,
        tasksCount: 0
    }

    componentDidMount() {
        this.getCount()
    }


    getCount = () => {
        const { board } = this.props
        const groupsCount = board.groups.length
        let tasksCount = 0;
        let MembersCount = board.members.length;
        board.groups.map(group => {
            tasksCount = tasksCount + group.tasks.length
        })


        this.setState({ groupsCount, tasksCount, MembersCount })
    }

    render() {
        const { isBoardNavOpen } = this.props;

        const dashboardContainerClassName = isBoardNavOpen
            ? "dashboard-container-open-nav"
            : "dashboard-container";
        return <section className="app-layout">
            <MainNav />
            <BoardNav />
            <section className={dashboardContainerClassName}>
                <BoardHeader
                    board={this.props.board} 
                />
                {/* user={this.props.user} */}
                {/* <section className="board-layout"> */}

                <div className="counts-container">
                    <div className="groups-count-container flex">
                        <span >Total groups </span><span>{this.state.groupsCount}</span><span><FaLayerGroup /></span>
                    </div>
                    <div className="tasks-count-container flex">
                        <span>Total tasks </span><span>{this.state.tasksCount}</span><span><FaTasks /></span>
                    </div>
                    <div className="members-count-container flex">
                        <span>Total members </span><span>{this.state.MembersCount}</span><span><MdPeople /></span>
                    </div>
                </div>
                <div className="dashboards-container">
                    <div >
                        <span>Tasks per status</span>
                        <Dashboard labelType={"status"} />
                    </div>
                    <div className="pai-container">
                        <span>Tasks per member</span>
                        <DashboardPai />
                    </div>
                    <div>
                        <span>Tasks per type</span>
                        <Dashboard labelType={"type"} />
                    </div>
                    <div>
                        <span>Tasks per priority</span>
                        <Dashboard labelType={"priority"} />
                    </div>
                    <div>
                        <span>Tasks per role</span>
                        <Dashboard labelType={"role"} />
                    </div>

                </div>
            </section>

        </section>
    }
}
function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.board,
        // user: userModule.user,
        isBoardNavOpen: boardModule.isBoardNavOpen


    }
}
const mapDispatchToProps = {

};

export const DynamicDashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DynamicDashboard);
