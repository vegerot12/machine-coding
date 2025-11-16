import React, { useState } from "react";
import "./getWeekDay.css";

export default function GetWeekday() {
const [date,setDate] = useState<string>("");
const [weekday, setWeekday] = useState<string>("");
const WeekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ] 

const handleFindDay = () => {
  const [year, month, dayNum]: number[] = date.split('-').map(i => parseInt(i, 10));
  const selectedDate = new Date(year, month - 1, dayNum);
  const dayIndex = selectedDate.getDay();
  setWeekday(WeekdayNames[dayIndex]);
};
const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
}

  return (
    <div className="container">
      <h1>Get Weekday</h1>
      <input
        type="date"
        data-testid="date-input"
        onChange = {handleDateChange}
        value={date}
      />
      <button onClick={handleFindDay} data-testid="find-day-btn">
        Find Day
      </button>
      {weekday && <p>That date falls on a {weekday}</p>}
    </div>
  );
}
