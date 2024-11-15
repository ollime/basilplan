(function() {
    // TODO: add a delete button
    // TODO: add in text field and edit button
    addBtn = document.querySelector(".add-btn");
    taskList = document.querySelector("#task")

    addBtn.addEventListener("click", addTask)

    function addTask() {
        // Prevents adding too many tasks
        if (taskList.childElementCount > 6) {
            return;
        }

        fetch("/add-task")
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            taskList.innerHTML += text;
        })
        .catch((err) => {
            console.log(err)
        })
    }

})();