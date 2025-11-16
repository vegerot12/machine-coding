import { useState } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const color =
    progress <= 40
      ? "red"
      : progress > 40 && progress <= 70
      ? "orange"
      : "green";

  const handleProgressChange = (val: number) => {
    if (progress + val < 0 || progress + val > 100) return;

    setProgress((p) => p + val);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "400px"
      }}
    >
      <h2>Progress Bar</h2>
      <div
        id="testBgColor"
        style={{
          display: "flex",
          alignItems: "center",
          height: "30px",
          position: "relative",
          backgroundColor: "#cdcdcd",
          border: "2px solid #bbb",
          borderRadius: "10px",
          margin: "5px",
          width: "100%",
          // Ensures that the colored progress fill never visually bleeds outside the rounded border,
          // even if there's a subpixel or animation accuracy error. It's a good safety for UI crispness.
          // Technically, with strict clamping at 100%, you don't need it, but it's best practice.
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: color,
             transition: "width 0.3s ease-in-out",
            borderRadius: progress === 100 ? "10px" : "10px 0 0 10px",
          }}
        />
        {/* Text overlay centered over the bar
            transform: "translate(-50%, -50%)" shifts the label so that its center (not top-left corner)
            is exactly in the middle of the bar, rather than starting at (left, top). This is the standard
            way to perfectly center absolutely positioned text. */}
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            // Explanation: This moves the span's center point to align to the center of its container.
            // left: 50%, top: 50% place the top-left of the span at center, while transform brings the
            // element back by 50% of its own width/height—achieving true centering.
            transform: "translate(-50%, -50%)",
            color: progress > 50 ? "#fff" : "#333", // readable on both fill and bg
            fontWeight: "bold"
          }}
        >
          {progress}%
        </span>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px",
        }}
      >
        <button onClick={() => handleProgressChange(-10)}> -10%</button>
        <button onClick={() => handleProgressChange(10)}>+10%</button>
      </div>
      {/* Implement the ProgressBar component logic here */}
    </div>
  );
}

export default ProgressBar;
