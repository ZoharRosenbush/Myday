import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { WhatsappShareButton, WhatsappIcon } from 'react-share'
import { GrHomeRounded } from "react-icons/gr";
import { Dashboard } from '../DynamicCmps/Dashboard.jsx'
// import { IoColorFillOutline } from 'react-icons/io'

class _MainDashboardCmp extends React.Component {

    state = {

    }

    render() {


        const { board } = this.props
        return (
            <section className="main-dashboard flex">

                <div className="main-dashboard-controllers flex justify-between">
                    <div className="secondery-contollers flex">
                        <div className="main-table-container flex ">
                            <div><GrHomeRounded /></div>
                            <Link className="clean-link" to={`/2day/board/${board._id}`}><span>Main Table</span></Link>

                        </div>
                        <div className="dashboard-btn">
                            <Link className="clean-link" to={`/2day/board/${board._id}/dashboard`}> <span> Dashboard</span></Link>
                        </div>
                    </div>
                    <div className='Whatsapp-share' style={{ backgroundColor: 'transparent' }}>
                        <WhatsappShareButton quote={'Share with friends!'} url={`https://app-2day.herokuapp.com/#/2day/board/${board._id}`}>
                            <WhatsappIcon size={20} round={true} />
                        </WhatsappShareButton>
                    </div>



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

