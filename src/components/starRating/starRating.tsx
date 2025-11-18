// StarRating.js

import React, { useState } from "react";

function StarRating() {
    const [rating, setRating] = useState<number>(0);
  // Step 1: Create state variables
  // use `rating` to store the selected rating, and `setRating` to update it

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Star Rating</h1>
      <h3>by NamasteDev</h3>

     { Array.from({length:5}).map((_, index) => (
        <span onClick={()=> setRating(index+1)} key={index} style={{ cursor: "pointer", color: index < rating ? "yellow" : "gray", fontSize: "4rem"}} > ★ </span>
      ) )}

      <p>Rating: {rating}</p>
      <button onClick={()=> setRating(0)}>Reset</button>

      {/* Step 2: Render 5 stars using a loop ★★★★★ */}
      {/* Step 3: Update rating when a star is clicked */}
      {/* Step 4: Style stars based on rating */}

      {/* Step 5: Display current rating */}
      
      {/* Step 6: Add a Reset button to clear the rating */}
    </div>
  );
}

export default StarRating;
