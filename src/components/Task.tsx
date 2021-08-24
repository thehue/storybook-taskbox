import React from "react";

export type TaskProps = {
  task: {
    id: string;
    title: string;
    state: string;
    updatedAt: Date;
  };
};

const Task = ({ task: { id, title, state } }: TaskProps) => {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly />
    </div>
  );
};

export default Task;
