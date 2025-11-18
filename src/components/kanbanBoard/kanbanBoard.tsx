import React, { useState, useRef, useEffect } from "react";
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

  const [task, setTask] = useState<string>("");
  const [addNewTask, setAddNewTask] = useState<boolean>(false);
  const [data, setData ] = useState<{todo: {id: string, label: string}[], "in progress": {id: string, label: string}[], done: {id: string, label: string}[] }>(initialData)

  const [editingTask, setEditingTask] = useState<{id: string, label:string} | null>(null);
  const [draggedTask, setDraggedTask] = useState<{id: string, label:string} | null>(null);
  const [draggedFrom, setDraggedFrom ] = useState<ColumnId | null>(null);

  const ref = useRef<HTMLInputElement>(null);

  type ColumnId = "todo" | "in progress" | "done";
const columns : ColumnId[] = ["todo", "in progress", "done"];

useEffect(()=> {
  if(editingTask){
    ref.current?.focus();
  }
  

},[editingTask])

  const handleDragStart = (task: {id: string, label:string}, columnId: ColumnId) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);


  };

  const handleDrop = (columnId: ColumnId) => {
    if( ! draggedTask || !draggedFrom) return ;

    if( draggedFrom === columnId){
      // reorder 
      return;
    }
    let newDraggedList = {...data};
    newDraggedList[draggedFrom] = newDraggedList[draggedFrom].filter( t=> t.id !== draggedTask.id);
    newDraggedList[columnId] = [...newDraggedList[columnId], draggedTask];
    setData(newDraggedList);
    setDraggedTask(null);
    setDraggedFrom(null);
  };



  const handleLabelClick = ( task: {id: string, label:string}) => {
setEditingTask(task);
setTask(task.label);

  };


  const addNewTaskInline = (columnId: ColumnId ) => {
   if(editingTask === null){
     setData( prev => ({...prev, [columnId]: [...prev[columnId],{id: `task-${new Date()}`, label: task }] }))
     setAddNewTask(false)

   }
   else{
    const newData = {...data};
    newData[columnId ] = newData[columnId].map(t=> t.id === editingTask.id ? {...t, label: task} : t);
    setData(newData);
   
    setEditingTask(null)  
   }
    setTask("");
  
  
  };

  const handleDeleteTask = (taskId: string, columnId: ColumnId) => {

    const newData = {...data};
    newData[columnId ] = newData[columnId].filter(t=> t.id !== taskId);
    setData(newData);
    if (editingTask?.id === taskId) setEditingTask(null);
    setTask("");

  }

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  }

  const handleNewTaskKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, columnId: ColumnId) => {
    if(e.key === "Enter"){
      if(editingTask === null)
      addNewTaskInline(columnId);
      else {
        const newData = {...data};
        newData[columnId ] = newData[columnId].map(t=> t.id === editingTask.id ? {...t, label: task} : t);
        setData(newData);
        setTask("");
        setEditingTask(null)

      }
    }
  }


  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Drag & Drop</h2>
      <div className="board">
        {columns.map((col) => (
          <div
            key={col}
            className="column"
            onDragOver={e=> e.preventDefault()}
            onDrop={() => handleDrop(col)}
          >
            <h4>
              {col === "todo"
                ? "To Do"
                : col === "in progress"
                ? "In Progress"
                : "Done"}
            </h4>



            {data && data[col].map((t: {id: string, label: string}) => (
              <div key={t.id}>
              editingTask?.id === t.id ? 
              <input value={task} onBlur={()=> addNewTaskInline(col)} ref={ref}  onKeyDown={(e)=>handleNewTaskKeyPress(e,col)} onChange={handleNewTaskChange}/> : 
              <div draggable={true} onDragStart ={()=> handleDragStart(t, col)}  onClick={()=>handleLabelClick(t)} key={t.id}>{t.label} <button onClick={()=> handleDeleteTask(t.id, col)}>Delete</button></div>
              </div>
              ))}


            {col === "todo" && (
              <div  className="add-task-inline">
               {!addNewTask ? <button  onClick={()=> setAddNewTask(true)}>Add a new task</button> : 
               <input onBlur={()=> addNewTaskInline("todo")} onKeyDown={(e)=>handleNewTaskKeyPress(e,"todo")} type="text" value={task} onChange={handleNewTaskChange} />}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
