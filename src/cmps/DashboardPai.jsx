import React from 'react';
import { connect } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


class _DashboardPai extends React.Component {
    state = {
        map: null
    };

    componentDidMount() {
        const map = this.getMembers();
        this.setState({ map })
    }

    getMembers = () => {
        const { board } = this.props
        const mapObj = {}

        board.members.map(member => {
            mapObj[member.username] = 0
        })
        mapObj.guest=0
        return mapObj

    }

    mapChart = () => {
        const { labelType, board } = this.props
        const mapObj =  this.getMembers()

        board.groups.map(group => {
            group.tasks.map(task => {
                task.owner.map(owner=>{
                    mapObj[owner.username]=(mapObj[owner.username])+1
                })
            })
        })
        return mapObj;
    }

    options = {
        responsive: true,
        
        plugins: {
            legend: {
                position: "bottom",
            },
            // title: {
            //     display: true,
            //     text: "Prices per toy type",
            // },
        },
    };

    map = this.mapChart()

  
    data = {
        labels:  Object.keys(this.map),
        datasets: [
            {
                label: 'Members',
                data: Object.values(this.map),
                backgroundColor: [
                    '#fcc4f780',
                    '#00c87580',
                    '#e2445c80',
                    '#c4c4c480'

                ],
                borderColor: [
                    '#fcc4f7',
                    '#00c875',
                    '#E2445C',
                    '#c4c4c4'
                ],
                borderWidth: 2,
            },
        ],
    };
    render() {


        return <Pie data={this.data} options={this.options} />;
    }


}
function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
    }
}
export const DashboardPai = connect(mapStateToProps)(_DashboardPai);
