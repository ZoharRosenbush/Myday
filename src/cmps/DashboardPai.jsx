import React from 'react';
import { connect } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


class _DashboardPai extends React.Component {
    state = {
        map: null
    };

    componentDidMount() {
        const map = this.mapChart();
        this.setState({ map })
    }

    // getColors = () => {
    //     const { labelType } = this.props
    //     switch (labelType) {
    //         case "status":
    //             return ["#c4c4c4","#00C875", "#E2445C", "#FDAB3D"]
    //         case "priority":
    //             return ["#c4c4c4","#225091", "#0086c0", "#66ccff"]
    //         case "type":
    //             return ["#c4c4c4","#fcc4f7", "#00c875", "#e2445c", "#a25ddc", "#ffadad"]
    //         case "role":
    //             return ["#c4c4c4","#279165", "#0086c0", "#a25ddc"]
    //     }
    // }

    mapChart = () => {
        const { labelType, board } = this.props
        const mapObj = {}
        
        board.groups.map(group => {
            group.tasks.map(task => {
                mapObj[task[labelType]] = (mapObj[task[labelType]]) + 1 
            })
        })

        return mapObj;
    }

  
 data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 15],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 3,
            },
        ],
    };
    render(){

        
        return <Doughnut data={this.data} />;
    }


}
function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
    }
}
export const DashboardPai = connect(mapStateToProps)(_DashboardPai);
