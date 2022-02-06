import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function DateCmp({ cmpData, onUpdateTask }) {

    const { type } = cmpData
    const { selectedDate } = cmpData.info
    const userStartDate = (selectedDate[0]) ? new Date(`${selectedDate[0]}`) : null
    const userEndDate = (selectedDate[1]) ? new Date(`${selectedDate[0]}`) : null


    const [dateRange, setDateRange] = useState([userStartDate, userEndDate]);
    const [startDate, endDate] = dateRange;
    const [isRemainingTimeShown, toggleTimeline] = useState(false);
  


    useEffect(() => {
        if (startDate !== userStartDate && endDate !== userEndDate) {
            if (!startDate || !endDate) return
            onUpdateTask(type, dateRange)
            toggleTimeline(false)
            // remainingTime = (endDate.getUTCDate() + 1) - (startDate.getUTCDate() + 1)
        }

    }, [dateRange]);

    useEffect(() => {
    }, [isRemainingTimeShown]);

    const getRemainingTime = () => {
        const remainingTime = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
        if (!endDate) return 'Set dates'
        if (!remainingTime) {
            return '1 d'
        } else {
            return `${remainingTime}d`
        }
    }

    return (
        <div className="date-picker-div flex"
            onMouseEnter={() => { toggleTimeline(true) }}
            onMouseLeave={() => { toggleTimeline(false) }}
        >
            <style>
                {`.date-picker input {
            width: 90%;
            border-radius: 11px;
            text-align: center;
            color:white;
            border: none;
            
        }.date-picker input::placeholder {
            color:white;
            font-size:13.33px;
        }`}
            </style>
            {!endDate && !isRemainingTimeShown &&
                <DatePicker
                    selectsRange={true}
                    placeholderText="-"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    wrapperClassName="date-picker"
                    isClearable={false}
                />
            }
            {startDate && endDate && !isRemainingTimeShown && <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                onChange={(update) => {
                    setDateRange(update);
                }}
                wrapperClassName="date-picker"
                isClearable={false}
            />}
            {isRemainingTimeShown && <div className="time-remaining">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        value={getRemainingTime()}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        wrapperClassName="date-picker"
                        isClearable={false}
                    />
            </div>}
        </div>

    )

}
