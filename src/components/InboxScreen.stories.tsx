import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { PureInboxScreen } from "./InboxScreen";

export default {
  title: "InboxScreen",
  component: PureInboxScreen,
} as ComponentMeta<typeof PureInboxScreen>;

const Template: ComponentStory<typeof PureInboxScreen> = (args) => (
  <PureInboxScreen {...args} />
);

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: "something",
};
