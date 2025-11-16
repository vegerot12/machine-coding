import { useState } from "react";
import "./confirmationModel.css";

function ConfirmationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState('');
  return (
    <div data-testid="modal-container" className="modal-container">
      <button className="open-modal-btn" data-testid="open-modal-btn" onClick={() => {
        setResult('')
        setIsOpen(true)
      }}>Open Confirmation Modal</button>

     {isOpen && <div className="modal-backdrop" data-testid="modal-backdrop">
        <div className="modal-box" data-testid="modal-box">
          <h2 className="modal-title" data-testid="modal-title">Confirm Action</h2>
          <p className="modal-message" data-testid="modal-message">Are you sure you want to proceed?</p>

          <div className="modal-buttons" data-testid="modal-buttons">
            <button className="confirm-btn" data-testid="confirm-btn" onClick={() => {
                setIsOpen(false);
                setResult('Confirmed')
              }}>Confirm</button>
            <button className="cancel-btn" data-testid="cancel-btn" onClick={() => {
                setIsOpen(false);
                setResult('Cancelled')
              }}>Cancel</button>
          </div>
        </div>
      </div>}

     {result !== "" && <div className="action-status" data-testid="action-status">{result}</div>}
    </div>
  );
}

export default ConfirmationModal;
