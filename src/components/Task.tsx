import React from "react";

export type TaskProps = {
  /** Composition of the task */
  task: {
    /** Id of the task */
    id: string;
    /** Title of the task */
    title: string;
    /** Current state of the task */
    state: string;
    updatedAt?: Date;
  };
  /** Event to change the task to archived */
  onArchiveTask?: (id: string) => void;
  /** Event to change the task to pinned */
  onPinTask?: (id: string) => void;
};

const Task = ({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: TaskProps) => {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === "TASK_ARCHIVED"}
          disabled={true}
          name="checked"
        />
        <span
          className="checkbox-custom"
          onClick={
            onArchiveTask
              ? () => onArchiveTask(id)
              : (e) => {
                  e.preventDefault();
                }
          }
        />
      </label>
      <div className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
        />
      </div>

      <div className="actions" onClick={(event) => event.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={
              onPinTask
                ? () => onPinTask(id)
                : (e) => {
                    e.preventDefault();
                  }
            }
          >
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Task;
