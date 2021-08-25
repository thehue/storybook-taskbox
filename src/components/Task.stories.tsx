import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Task, { TaskProps } from "./Task";

export default {
  title: "Task",
  component: Task,
} as ComponentMeta<typeof Task>;

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_PINNED",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_ARCHIVED",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const LongTitle = Template.bind({});
const DefaultArgs = Default.args as TaskProps;
LongTitle.args = {
  task: {
    ...DefaultArgs.task,
    title: longTitleString,
  },
};
