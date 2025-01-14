// src/components/Board.js
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Board = ({ columns, tasks, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`flex p-1 min-h-10 sm:flex-col md:flex-col lg:flex-row w-full `}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.column === column.id)}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
