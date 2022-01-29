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

    getColors = () => {
        const { labelType } = this.props
        switch (labelType) {
            case "status":
                return ["#c4c4c4","#00C875", "#E2445C", "#FDAB3D"]
            case "priority":
                return ["#c4c4c4","#225091", "#0086c0", "#66ccff"]
            case "type":
                return ["#c4c4c4","#fcc4f7", "#00c875", "#e2445c", "#a25ddc", "#ffadad"]
            case "role":
                return ["#c4c4c4","#279165", "#0086c0", "#a25ddc"]
        }
    }

    getMapObj = () => {
        const { labelType } = this.props
        var mapObj = {};
        switch (labelType) {
            case "status":
               return mapObj = {
                    Empty: 0,
                    Done: 0,
                    Stuck: 0,
                    "Working on it": 0
                }
            case "priority":
             return   mapObj = {
                    Empty: 0,
                    High: 0,
                    Medium: 0,
                    Low: 0
                }
            case "type":
              return  mapObj = {
                    Empty: 0,
                    Quality: 0,
                    Feature: 0,
                    Bug: 0,
                    Improvement: 0,
                    Security: 0
                }
            case "role":
               return mapObj = {
                    Empty: 0,
                    Dev: 0,
                    Design: 0,
                    Product: 0,
                }
        }
        
    }

    mapChart = () => {
        const { labelType, board } = this.props
        const mapObj = this.getMapObj()
        
        board.groups.map(group => {
            group.tasks.map(task => {
                mapObj[task[labelType]] = (mapObj[task[labelType]]) + 1 
            })
        })

        return mapObj;
    }
    options = {
        responsive: true,
        
        showLine: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                // text: "Prices per toy type",
            },
        },
    };
    map = this.mapChart();
    
    
    data = {
        labels: Object.keys(this.map),
        showLine: false,
        datasets: [
            {
                showLine: false,
                label: this.props.labelType,
                data: Object.values(this.map),
                backgroundColor: this.getColors(),
            },
        ],
    };
    render() {

        return (
            <Bar  showLine={false} options={this.options} data={this.data} />

        );
    }
}
function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
    }
}
export const Dashboard = connect(mapStateToProps)(_Dashboard);
