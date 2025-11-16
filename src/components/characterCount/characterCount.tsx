import { useState } from "react";
import './characterCount.css';


function CharacterCount() {
    const [maxLength, setMaxLength] = useState<number>(0);
    const [currentLength, setCurrentLength] = useState<number>(0);
    const [text, setText] = useState<string>("");
    const warningLimit = maxLength * 0.9;



  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
    setCurrentLength(e.target.value.length)
  }

  return (
    <div className="characterCount">
      <h1>Character Count</h1>
      <p>Track your input length with live character warnings.</p>

      <div className="container">
        <div className="inputs">
          <label>
            Max length:
            <input type="number" onChange={(e)=>setMaxLength(parseInt(e.target.value))} value={maxLength} min="0" max="1000" data-testid="maxlength" />
          </label>
        </div>
        <textarea
        onChange={handleChange}
        value={text}
          className="text"
          placeholder="Start Typing"
          data-testid="textarea"
        ></textarea>

        <div className="char-info">{currentLength}/{maxLength}</div>

        <div className="warnings">
        { currentLength > maxLength ? <p className="error-message" data-testid="error-text">You exceeded the limit by {currentLength - maxLength} characters</p> : 
           currentLength > warningLimit ? <p className="warning-text" data-testid="warning-text">You are close to the limit !</p>: null}

          
        </div>
      </div>
    </div>
  );
}
export default CharacterCount;
