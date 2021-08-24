import React from "react";
import { Meta, ComponentStory } from "@storybook/react";
import { PureTaskList, TaskListProps } from "./TaskList";
import * as TaskStories from "./Task.stories";
import { TaskProps } from "./Task";

export default {
  title: "TaskList",
  component: PureTaskList,
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
} as Meta;

const Template: ComponentStory<typeof PureTaskList> = (args) => (
  <PureTaskList {...args} />
);

const TaskStoriesDefaultArgs = TaskStories.Default.args as TaskProps;

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited the Default story in task.stories.js.
  tasks: [
    { ...TaskStoriesDefaultArgs.task, id: "1", title: "Task 1" },
    { ...TaskStoriesDefaultArgs.task, id: "2", title: "Task 2" },
    { ...TaskStoriesDefaultArgs.task, id: "3", title: "Task 3" },
    { ...TaskStoriesDefaultArgs.task, id: "4", title: "Task 4" },
    { ...TaskStoriesDefaultArgs.task, id: "5", title: "Task 5" },
    { ...TaskStoriesDefaultArgs.task, id: "6", title: "Task 6" },
  ],
};

const DefaultArgs = Default.args as TaskListProps;
export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...DefaultArgs.tasks.slice(0, 5),
    { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};
