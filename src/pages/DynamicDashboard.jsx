import React from "react";
import { connect } from "react-redux";
import { Dashboard } from "../cmps/DynamicCmps/Dashboard.jsx";
import { DashboardPai } from "../cmps/DashboardPai.jsx";
import { MainDashboardCmp } from "../cmps/BoardCmps/MainDashboardCmp.jsx";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";

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
        board.groups.map(group => {
            tasksCount = tasksCount + group.tasks.length
        })

        this.setState({ groupsCount, tasksCount }, ()=>{  
        })
    }

    render() {

        return  <section className="app-layout">
                  <MainNav />
        <BoardNav />
            <section>
            <MainDashboardCmp/>
            <div className="counts-container">
            <div className="groups-count-container">
                <span>Groups</span><span>{this.state.groupsCount}</span>
            </div>
            <div className="tasks-count-container">
                <span>Tasks</span><span>{this.state.tasksCount}</span>
            </div>
            </div>
            <div className="dashboards-container">
            <div className="pai-container full">
                <DashboardPai />
            </div>
            <div >
                <Dashboard labelType={"status"} />
            </div>
            <div>
                <Dashboard labelType={"priority"} />
            </div>
          <div>
            <Dashboard labelType= {"role"} />
            </div>
            <div>
            <Dashboard  labelType= {"type"}  />
        </div> 

            </div>
                </section>
        </section>
    }
}
function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,

    }
}
const mapDispatchToProps = {

};

export const DynamicDashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DynamicDashboard);
