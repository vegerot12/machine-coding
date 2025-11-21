import { useState } from "react";
import "./cinematicket.css";

const ROW = 10,
  COL = 10;

export default function CinemaHall() {

const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
const [bookedSeats, setBookedSeats] = useState<string[]>([]);


    const handleBook = () => {  
        if (selectedSeats.length === 0) {
            window.alert("Please select at least one seat")
            return;
          }
        const newBookedSeats = [...bookedSeats, ...selectedSeats];
        setBookedSeats(newBookedSeats);


     }
    const handleClear = () => { 
        setSelectedSeats([]);

    }
    const handleReset = () => { 
        setSelectedSeats([]);
        setBookedSeats([])


    } 
    const handleSeatClick = (seat:string) => {
        if(bookedSeats.includes(seat)) return;

        let newSelectedSeats = [...selectedSeats];

        if(selectedSeats.includes(seat)) {
            newSelectedSeats = newSelectedSeats.filter(s=> s !== seat);
        }
        else{
            newSelectedSeats.push(seat);
        }
        setSelectedSeats(newSelectedSeats);
    }

    
  return (
    <div className="main-container">
      <h1>Cinema Hall</h1>
      <div className="button-section">
        <button onClick={handleBook} data-testid="book-button">
          Book Seats
        </button>
        <button onClick={handleClear} data-testid="clear-button">
          Clear
        </button>
        <button  onClick={handleReset} data-testid="reset-button">
          Reset
        </button>
      </div>
      <div className="cinema-hall" data-testid="cinema-hall">
        {Array.from({ length: ROW }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: COL }, (_, colIdx) => {
              return (
                <div
                  className={"col"}
                  
                  key={colIdx} >
                    <button className={`seat ${bookedSeats.includes(String.fromCharCode(65+rowIdx)+colIdx) ? "disabled-seat": selectedSeats.includes(String.fromCharCode(65+rowIdx)+colIdx) ? "selected-seat" : ""}`}
                    disabled={bookedSeats.includes(String.fromCharCode(65+rowIdx)+colIdx)}
                    onClick={()=> handleSeatClick(String.fromCharCode(65+rowIdx)+colIdx)}
                    >{String.fromCharCode(65+rowIdx)}{colIdx}</button>
                  
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
