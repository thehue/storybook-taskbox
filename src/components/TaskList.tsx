import React from "react";

import Task, { TaskProps } from "./Task";
import { connect, ConnectedProps } from "react-redux";
import { archiveTask, pinTask, TaskState } from "../lib/redux";

export interface TaskListProps extends PropsFromRedux {
  /** Checks if it's in loading state */
  loading?: boolean;
  /** The list of tasks */
  tasks: TaskProps["task"][];
  /** Event to change the task to pinned */
  onPinTask: (id: string) => { type: string; id: string };
  /** Event to change the task to archived */
  onArchiveTask: (id: string) => { type: string; id: string };
}

PureTaskList.defaultProps = {
  loading: false,
};

export function PureTaskList({
  loading,
  tasks,
  onPinTask,
  onArchiveTask,
}: TaskListProps) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
const mapState = ({ tasks }: TaskState) => ({
  tasks: tasks.filter(
    (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
  ),
});
const mapDispatch = {
  onArchiveTask: (id: string) => archiveTask(id),
  onPinTask: (id: string) => pinTask(id),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PureTaskList);
