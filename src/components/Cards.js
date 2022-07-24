import * as React from "react";
import * as ReactDOM from "react-dom";
import { TaskBoard, TaskBoardToolbar } from "@progress/kendo-react-taskboard";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";

import { filterBy } from "@progress/kendo-data-query";

import { classNames } from "@progress/kendo-react-common";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { TaskBoardColumn } from "@progress/kendo-react-taskboard";
import {
  TaskBoardCard,
  TaskBoardCardHeader,
} from "@progress/kendo-react-taskboard";
import { CardBody } from "@progress/kendo-react-layout";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Btn from "react-bootstrap/esm/Button";

export const cards = [
  {
    id: 1,
    title: "Task 1",
    order: 1,
    description: "Task 1",
    status: "inProgress",
    priority: {
      color: "orange",
      priority: "Urgent",
    },
    image:
      "https://demos.telerik.com/kendo-ui/content/web/taskboard/taskboard-demo-illustrations-04.png",
  },
  {
    id: 2,
    title: "Task title",
    order: 1,
    description: "Task description",
    status: "todo",
    priority: {
      color: "orange",
      priority: "Urgent",
    },
    image:
      "https://demos.telerik.com/kendo-ui/content/web/taskboard/taskboard-demo-illustrations-05.png",
  },

  {
    id: 3,
    title: "Task 3",
    order: 2,
    description: "Task 3",
    status: "todo",
    priority: {
      color: "orange",
      priority: "Urgent",
    },
    image:
      "https://demos.telerik.com/kendo-ui/content/web/taskboard/taskboard-demo-illustrations-08.png",
  },

  {
    id: 4,
    title: "Task 4",
    order: 2,
    description: "Task 4",
    status: "inProgress",
    priority: {
      color: "blue",
      priority: "High Priority",
    },
    image:
      "https://demos.telerik.com/kendo-ui/content/web/taskboard/taskboard-demo-illustrations-11.png",
  },

  {
    id: 5,
    title: "Task 5",
    order: 1,
    description: "Task 5",
    status: "done",
    priority: {
      color: "green",
      priority: "Low Priority",
    },
    image:
      "https://demos.telerik.com/kendo-ui/content/web/taskboard/taskboard-demo-illustrations-13.png",
  },
];

const images = {};
cards.forEach((card) => {
  images[String(card.id)] = card.image;
});

export const Card = (props) => {
  return <TaskBoardCard {...props} />;
};
const themeColor = {
  todo: "warning",
  inProgress: "info",
  done: "success",
};

const ColumnHeader = (props) => {
  const { edit, title, status } = props.column;
  return (
    <div
      className={"k-taskboard-column-header bg-dark text-white "}
      border="dark"
    >
      <div className={"k-taskboard-column-header-text k-text-ellipsis "}>
        {edit ? (
          <Input
            value={title}
            onChange={props.onTitleChange}
            onBlur={props.onColumnExitEdit}
            autoFocus={true}
          />
        ) : (
          <>
            <BadgeContainer
              style={{
                left: "12px",
                top: "-6px",
              }}
            >
              <Badge
                themeColor={themeColor[status]}
                style={{
                  zIndex: 0,
                }}
              >
                {props.tasks && props.tasks.length}
              </Badge>
            </BadgeContainer>
            <span
              style={{
                marginLeft: "30px",
              }}
            >
              {title}
            </span>
          </>
        )}
      </div>
      <span className={"k-spacer"} />
      <div
        className={classNames("k-taskboard-column-header-actions", {
          "k-disabled": edit,
        })}
      >
        <Button
          fillMode="flat"
          icon="edit"
          title={props.editButtonTitle}
          onClick={props.onColumnEnterEdit}
        />
        <Button
          fillMode="flat"
          icon="add"
          title={props.addButtonTitle}
          onClick={props.onShowAddCardDialog}
        />
        <Button
          fillMode="flat"
          icon="close"
          title={props.closeButtonTitle}
          onClick={props.onColumnDelete}
        />
      </div>
    </div>
  );
};

export const Column = (props) => {
  return <TaskBoardColumn {...props} header={ColumnHeader} />;
};

const tasks = cards.map((c) => ({
  id: c.id,
  title: c.title,
  description: c.description,
  status: c.status,
  priority: c.priority,
}));
const columns = [
  {
    id: 1,
    title: "To-Do",
    status: "todo",
  },
  {
    id: 2,
    title: "In Progress",
    status: "inProgress",
  },
  {
    id: 3,
    title: "Done",
    status: "done",
  },
];
const priorities = [
  {
    priority: "Low Priority",
    color: "green",
  },
  {
    priority: "High Priority",
    color: "blue",
  },
  {
    priority: "Urgent",
    color: "orange",
  },
];

const Cards = () => {
  const [filter, setFilter] = React.useState("");
  const [taskData, setTaskData] = React.useState(tasks);
  const [columnsData, setColumnsData] = React.useState(columns);
  const onSearchChange = React.useCallback((event) => {
    setFilter(event.value);
  }, []);
  const resultTasks = React.useMemo(() => {
    const filterDesc = {
      logic: "and",
      filters: [
        {
          field: "title",
          operator: "contains",
          value: filter,
        },
      ],
    };
    return filter ? filterBy(taskData, filterDesc) : taskData;
  }, [filter, taskData]);
  const onChangeHandler = React.useCallback((event) => {
    if (event.type === "column") {
      setColumnsData(event.data);
    } else {
      // New Task has been added.
      if (event.item && event.item.id === undefined) {
        event.item.id = event.data.length + 1;
      }

      setTaskData(event.data);
    }
  }, []);

  const onAddColumn = () => {
    const newColumn = {
      id: columnsData.length + 1,
      title: "New Column",
      status: "new",
      edit: true,
    };
    setColumnsData([...columnsData, newColumn]);
  };

  return (
    <>
      <TaskBoard
        columnData={columnsData}
        taskData={resultTasks}
        priorities={priorities}
        onChange={onChangeHandler}
        column={Column}
        card={Card}
        style={{
          height: "700px",
        }}
        tabIndex={0}
      >
        <TaskBoardToolbar>
          <Form className="d-flex">
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={onSearchChange}
              value={filter}
            /> */}
            <Input
              placeholder="Search..."
              onChange={onSearchChange}
              value={filter}
            />
            <Btn variant="outline-success">Search</Btn>
          </Form>
          <span className="k-spacer" />
          <Btn icon="add" onClick={onAddColumn}>
            Add Column
          </Btn>
        </TaskBoardToolbar>
      </TaskBoard>
    </>
  );
};

export default Cards;