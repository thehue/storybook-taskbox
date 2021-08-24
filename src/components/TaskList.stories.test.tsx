import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

import { WithPinnedTasks } from "./TaskList.stories"; //👈  Our story imported here
import { TaskListProps } from "./TaskList";

const args = WithPinnedTasks.args as TaskListProps;

it("renders pinned tasks at the start of the list", () => {
  const div = document.createElement("div");
  //👇 Story's args used with our test
  ReactDOM.render(<WithPinnedTasks {...args} />, div);

  // We expect the task titled "Task 6 (pinned)" to be rendered first, not at the end
  const lastTaskInput = div.querySelector(
    '.list-item:nth-child(1) input[value="Task 6 (pinned)"]'
  );
  expect(lastTaskInput).not.toBe(null);

  ReactDOM.unmountComponentAtNode(div);
});
