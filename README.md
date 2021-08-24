# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn test --watchAll`

Run the test runner (Jest) in a terminal

### `yarn storybook`

Start the component explorer on port 6006

## React Storybook 설치하기

```
# Create our application
npx create-react-app taxkbox

cd taskbox

# Add Storybook:
npx -p @storybook/cli sb init
```

### babel-loader 충돌 해결

package.json에 아래 코드 추가

```
  "resolutions": {
    "babel-loader": "8.1.0"
  }

```

### 소스예시

Task.tsx

```
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
    updatedAt: Date;
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

```

Task.stories.tsx

```
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Task from "./Task";

export default {
  title: "Task",
  component: Task,
} as ComponentMeta<typeof Task>;

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

```

## 스냅샷 테스트

스냅샷 테스트는 어떤 기능의 예상 결과를 미리 정확히 포착해두고 실제 결과에 비교하는 테스트 기법.
