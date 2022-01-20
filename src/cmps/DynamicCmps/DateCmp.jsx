import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function DateCmp({ cmpData, onUpdateTask,groupColor }) {
    console.log('color', groupColor);

    const { type } = cmpData
    const { selectedDate } = cmpData.info
    const userStartDate = new Date(`${selectedDate[0]}`)
    const userEndDate = new Date(`${selectedDate[1]}`)

    // console.log('cmp dtaa', userStartDate,'end',userEndDate);

    const [dateRange, setDateRange] = useState([userStartDate, userEndDate]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        if (startDate !== userStartDate && endDate !== userEndDate) {
            if (!startDate || !endDate) return
            console.log('activating func', 'type', type, 'data', dateRange)
            onUpdateTask(type, dateRange)
        }
    }, [dateRange]);



    return (

        <div className="date-picker-div">
            <style>
                {`.date-picker input {
            width: 90%;
            background-color:black;
            border-radius: 11px;
            color:white;
            border-color: transparent;
        }`}
            </style>
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                onChange={(update) => {
                    setDateRange(update);
                }}
                wrapperClassName="date-picker"
                isClearable={false}
            />
        </div>

    );

}
