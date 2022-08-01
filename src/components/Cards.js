import * as React from "react";

import { TaskBoard } from "@progress/kendo-react-taskboard";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";

import { filterBy } from "@progress/kendo-data-query";

import { classNames } from "@progress/kendo-react-common";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { TaskBoardColumn } from "@progress/kendo-react-taskboard";
import { TaskBoardCard } from "@progress/kendo-react-taskboard";

import axios from "axios";

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
        {/* <Button
          fillMode="flat"
          icon="edit"
          title={props.editButtonTitle}
          onClick={props.onColumnEnterEdit}
        /> */}
        <Button
          fillMode="flat"
          icon="add"
          title={props.addButtonTitle}
          onClick={props.onShowAddCardDialog}
        />
        {/* <Button
          fillMode="flat"
          icon="close"
          title={props.closeButtonTitle}
          onClick={props.onColumnDelete}
        /> */}
      </div>
    </div>
  );
};

export const Column = (props) => {
  // console.log(props);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user[0].id;

  const onCreate = (tasks, task) => {
    props.setCards(tasks);
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      id: `${task.id}`,
      title: `${task.title}`,
      priority: {
        color: `${task.priority.color}`,
        priority: `${task.priority.priority}`,
      },
      description: `${task.description}`,
      status: `${task.status}`,
      order: `${props.children.length}`,
      userId: `${id}`,
    });
    var config = {
      method: "post",
      url: "https://my-json-server.typicode.com/ArditQerimi/Kanban-app/tasks",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log("response.data");
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [order, setOrder] = React.useState(props.children.length);

  const taskId = Math.random();
  return (
    <TaskBoardColumn
      {...props}
      header={ColumnHeader}
      card={Card}
      onTaskCreate={(task) => {
        setOrder(order + 1);

        console.log([
          ...props.cardsArr,
          {
            id: taskId,
            title: task.title,
            description: task.description,
            priority: {
              color: task.priority.color,
              priority: task.priority.priority,
            },
            status: props.column.status,
            order: order + 1,
            userId: id,
          },
        ]);

        onCreate(
          [
            ...props.cardsArr,
            {
              id: taskId,
              title: task.title,
              description: task.description,
              priority: {
                color: task.priority.color,
                priority: task.priority.priority,
              },
              status: props.column.status,
              order: order + 1,
              userId: id,
            },
          ],
          {
            id: taskId,
            title: task.title,
            description: task.description,
            priority: {
              color: task.priority.color,
              priority: task.priority.priority,
            },
            status: props.column.status,
            order: order + 1,
            userId: id,
          }
        );
      }}
    />
  );
};

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
  {
    id: 4,
    title: "In Review",
    status: "review",
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

const Cards = ({ cardsArr, setCards }) => {
  const [filter, setFilter] = React.useState("");

  const [columnsData, setColumnsData] = React.useState(columns);

  const tasks = cardsArr?.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    status: c.status,
    priority: c.priority,
    order: c.order,
    userId: c.userId,
  }));
  console.log(tasks);
  // const onSearchChange = React.useCallback((event) => {
  //   setFilter(event.value);
  // }, []);
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
    return filter ? filterBy(tasks, filterDesc) : tasks;
  }, [filter, tasks]);
  const onChangeHandler = React.useCallback((event) => {
    var qs = require("qs");
    var data = qs.stringify({
      status: event.item.status,
    });
    var config = {
      method: "patch",
      url: `https://my-json-server.typicode.com/ArditQerimi/Kanban-app/tasks/${event.item.id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    if (event.type === "column") {
      setColumnsData(event.data);
    } else {
      // New Task has been added.
      if (event.item && event.item.id === undefined) {
        event.item.id = event.data.length + 1;
      }

      setCards(event.data);
    }
  }, []);

  const onDelete = (id) => {
    console.log(id);
    setCards(cardsArr.filter((item) => item.id !== id));
    console.log(
      `https://my-json-server.typicode.com/ArditQerimi/Kanban-app/tasks/${id}`
    );
    axios
      .delete(
        `https://my-json-server.typicode.com/ArditQerimi/Kanban-app/tasks/${id}`
      )
      .then(() => {
        setCards(cardsArr.filter((item) => item.id !== id));
        console.log(cardsArr.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  // const [edit, setEdit] = React.useState(tasks);
  // console.log(edit);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user[0].id;

  const onEdit = (edited, prevTask) => {
    console.log(edited, prevTask);
    const editingObj = cardsArr.find((item) => item.id === prevTask.id);
    // console.log(editingObj);
    const editedObj = {
      id: edited.id,
      userId: id,
      title: edited.title,
      description: edited.description,
      priority: edited.priority,
      status: edited.status,
      order: edited.order,
    };
    // console.log(editedObj);

    // Object.assign(editingObj, editedObj);
    setCards(
      cardsArr.map((item) => (item.id === editedObj.id ? editedObj : item))
    );
    // console.log(
    //   cardsArr.map((item) => (item.id === editedObj.id ? editedObj : item))
    // );
    // console.log(result);
    console.log(
      `https://my-json-server.typicode.com/ArditQerimi/Kanban-app/tasks/${prevTask.id}`
    );
    // setCards(edited);
  };

  return (
    <>
      <>
        <TaskBoard
          columnData={columnsData}
          taskData={resultTasks}
          priorities={priorities}
          onChange={onChangeHandler}
          column={(props) => {
            // console.log(props);
            return (
              <Column
                {...props}
                setCards={setCards}
                cardsArr={cardsArr}
                onTaskEdit={(edited, prevTask) => onEdit(edited, prevTask)}
              />
            );
          }}
          card={(props) => {
            return (
              <Card {...props} onTaskDelete={() => onDelete(props.task.id)} />
            );
          }}
          style={{
            height: "700px",
          }}
          tabIndex={0}
        ></TaskBoard>
      </>
    </>
  );
};

export default Cards;
