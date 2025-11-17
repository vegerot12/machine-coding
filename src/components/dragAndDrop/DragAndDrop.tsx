import React, { useState } from "react";
import "./dragAndDrop.css";

function DragDrop() {

    const initialAvailable = [
        {id: 1, name: "Apple"},
        {id: 2, name: "Banana"},
        {id: 3, name: "Cherry"},
        {id: 4, name: "Date"},
        {id: 5, name: "Avacado"},
        {id: 6, name: "Fig"},
        {id: 7, name: "Grape"},
        {id: 8, name: "Papaya"}, 
    ]
    const [available, setAvailable] = useState<{id: number, name: string}[]>(initialAvailable);
    const [dropped, setDropped] = useState<{id: number, name: string}[]>([]);
    const [draggedItem, setDraggedItem ] = useState<{id: number, name: string} | null>(null);
    const [draggedFrom, setDraggedFrom] = useState<"available" | "dropped" | null>(null); 

    const reorderList = ( list : {id: number, name: string}[],   e: React.DragEvent<HTMLDivElement>) => {
        const srcIndex = list.findIndex( p=> p.id === draggedItem?.id);
        const targetDroppedNearId =parseInt(( e.target as HTMLDivElement).getAttribute("data-id") ||"0");
const targetIndex = list.findIndex(p=> p.id === (targetDroppedNearId));
        if(  targetDroppedNearId === null) return list;

        list.splice(srcIndex, 1); // removed from org index
        list. splice(targetIndex, 0, draggedItem!); 
       
        
        return list;
    }

    const handleDrop  = (to: "available" | "dropped", e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if(!draggedItem || !draggedFrom) return;
        if(draggedFrom === to)  // TODO: reoder dropped
        {
            const list = draggedFrom === "available" ? [...available]: [...dropped];
            const newList = reorderList(list, e);

            if(draggedFrom==="available")
                setAvailable(newList);
             else
            setDropped(newList);
        
        
}

        // if dragged from available to dropped
        else if(draggedFrom=="available"){
            setAvailable( prev => prev.filter(p=> p.id !== draggedItem.id))
            setDropped( prev => [...prev, draggedItem]);
            

        }
        else {
            setDropped( prev => prev.filter(p=> p.id !== draggedItem.id))
            setAvailable( prev => [...prev, draggedItem]);
        }
        setDraggedItem(null);
        setDraggedFrom(null);
    


       
    }
    const handleDragStart = ( item: {id: number, name: string} , from: "available" | "dropped") => {
        setDraggedItem(item);
        setDraggedFrom(from); 
    }
    const renderItems = (item: {id: number, name: string}, from: "available" | "dropped") => {
        return (
            <div 
            key={item.id} 
            data-id={item.id}
            onDragStart = {()=> handleDragStart(item, from)}
            className="item"
            draggable={true}
            >
                {item.name}
            </div>
        )
    }

    const handleReset = ( )=> {
        setAvailable(initialAvailable);
        setDropped([])
    }
  return (
    <div className="app-wrapper">
      <header>
        <h1>Drag & Drop Fruits</h1>
        <button className="reset-btn" onClick={handleReset}>Reset Lists</button>
      </header>

      <div className="container">
        <div className="column"
        onDragOver={e => e.preventDefault()} // to allow dropping 
        onDrop={e => handleDrop("available",e)}
        

    
        >
          <h2>Available Fruits</h2>
          {available.length === 0 && <p className="empty">No fruits here</p>}
          {available.map(item => renderItems(item, "available"))}

          

          
          
        </div>

        <div
         className="column drop-zone"
         
         onDragOver={e => e.preventDefault()} // to allow dropping 
         onDrop={e => handleDrop("dropped",e)}>
          <h2>Dropped Fruits</h2>
          {dropped.length === 0 && <p className="empty">Drop fruits here</p>}
          {dropped.map(item => renderItems( item,"dropped"))}
         
        </div>
      </div>
    </div>
  );
}

export default DragDrop;
