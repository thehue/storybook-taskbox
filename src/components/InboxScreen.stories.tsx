import React from "react";
import { Provider } from "react-redux";

import { PureInboxScreen } from "./InboxScreen";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as TaskListStories from "./TaskList.stories";
import { TaskProps } from "./Task";
import { createStore } from "redux";

type Tasks = {
  tasks: TaskProps["task"][];
};

const TaskListStoriesDefaultArgs = TaskListStories.Default.args as Tasks;
const initialState = {
  tasks: TaskListStoriesDefaultArgs.tasks,
};
// A super-simple mock of a redux store

const reducer = (state: Tasks = initialState) => {
  return state;
};

const store = createStore(reducer);

export default {
  title: "InboxScreen",
  component: PureInboxScreen,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof PureInboxScreen>;

const Template: ComponentStory<typeof PureInboxScreen> = (args) => (
  <PureInboxScreen {...args} />
);

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: "something",
};
