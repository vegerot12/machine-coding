import React, { useState, useRef } from "react";
import "./kanbanBoard.css";

// Sample initial data
const initialData = {
  "todo": [
    { id: "task-1", label: "Task 1" },
    { id: "task-2", label: "Task 2" }
  ],
  "in progress": [
    { id: "task-3", label: "Task 3" }
  ],
  "done": [
    { id: "task-4", label: "Task 4" }
  ]
};

export default function KanbanBoard() {
  
  const handleDragStart = (task) => {
  };

  const handleDrop = (columnId) => {
  };

  const handleDragOver = (e) => {
  };

  const handleLabelClick = (task) => {
  };

  const saveEditedTask = (taskId) => {
  };

  const handleEditKeyPress = (e, taskId) => {
  };

  const deleteTask = (taskId) => {
  };

  const addNewTaskInline = (columnId) => {

  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Drag & Drop</h2>
      <div className="board">
        {["todo", "in progress", "done"].map((col) => (
          <div
            key={col}
            className="column"
          >
            <h4>
              {col === "todo"
                ? "To Do"
                : col === "in progress"
                ? "In Progress"
                : "Done"}
            </h4>

            {col === "todo" && (
              <div className="add-task-inline">
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
