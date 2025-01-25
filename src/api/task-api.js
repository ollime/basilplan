/**
 * @module task-api
 * @description Fetch functions related to the task table.
 */

async function getTasks() {
  return fetch(`/api/getTasks`)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      return JSON.parse(text);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deleteTask(txt) {
  fetch(`/api/deleteTask/${txt}`).catch((err) => {
    console.log(err);
  });
}

async function sendTask(txt, list, position) {
  fetch(`/api/sendTask/${txt}/${list}/${position}`).catch((err) => {
    console.log(err);
  });
}

export { getTasks, deleteTask, sendTask };
