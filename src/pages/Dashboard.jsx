import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class _Dashboard extends React.Component {
    state = {
        map: null
    };

    componentDidMount() {

        const map = this.mapChart();
        this.setState({ map })

    }


    mapChart = () => {
        const { labelType, board } = this.props
        const mapObj = {};
        board.groups.map(group => {
            group.tasks.map(task => {
                mapObj[task[labelType]] = (mapObj[task[labelType]]) > 0 ? (mapObj[task[labelType]]) + 1 : 1
            })
        })
        return mapObj;
    }

    options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Prices per toy type",
            },
        },
    };
    map = this.mapChart();

    data = {


        labels: Object.keys(this.map),
        datasets: [
            {
                label: this.props.labelType,
                data: Object.values(this.map),
                backgroundColor: "#dff0ea",
            },
        ],
    };
    render() {
        const { labels, labelType } = this.state
        console.log('render:');

        return (
            <React.Fragment>

                <Bar options={this.options} data={this.data} />
            </React.Fragment>

        );
    }
}
function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
    }
}
export const Dashboard = connect(mapStateToProps)(_Dashboard);
