import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function DateCmp({ cmpData, onUpdateTask, groupColor }) {

    const { type } = cmpData
    const { selectedDate } = cmpData.info
    const userStartDate = new Date(`${selectedDate[0]}`)
    const userEndDate = new Date(`${selectedDate[1]}`)


    const [dateRange, setDateRange] = useState([userStartDate, userEndDate]);
    let [remainingTime, setRemainingTime] = useState(0);
    const [inputValue, setInputValue] = useState(dateRange);
    const [startDate, endDate] = dateRange;


    useEffect(() => {
        if (startDate !== userStartDate && endDate !== userEndDate) {
            if (!startDate || !endDate) return
            onUpdateTask(type, dateRange)
            remainingTime = (endDate.getUTCDate() + 1) - (startDate.getUTCDate() + 1)
            setRemainingTime(remainingTime)
        }

    }, [dateRange]);

    useEffect(() => {
    }, [inputValue]);

    const replaceInputValue = () => {

        setInputValue(remainingTime)
    }

 
    return (
        <div className="date-picker-div" onMouseEnter={replaceInputValue}>
            <style>
                {`.date-picker input {
            width: 90%;
            border-radius: 11px;
            text-align: center;
            color:white;
            border: none;
        }`}
            </style>
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                // tileContent={(remainingTime)=>{
                //     return <div>
                //         {remainingTime}
                //     </div>
                // }}
                dateFormat="dd/MM/yyyy"
                onChange={(update) => {
                    setDateRange(update);
                }}
                // placeholderText="hello"
                // value={[startDate,endDate]}
                // value={'0','8'}
                // value={0}
                // inputValue
                // onCalendarHover={handleCalendarHover}
                wrapperClassName="date-picker"
                isClearable={false}
            />
        </div>

    );

}
