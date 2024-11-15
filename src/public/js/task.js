(function() {
    // TODO: add a delete button
    // TODO: add in text field and edit button
    addBtn = document.querySelector(".add-btn");
    taskList = document.querySelector("#task")

    addTask()
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

            // adds new event listener to delete button
            // TODO: this feels inefficient but idk how to fix it
            let allDeleteBtn = document.querySelectorAll(".delete-btn")
            allDeleteBtn.forEach((deleteBtn) => {
                deleteBtn.addEventListener("click", (evt) => deleteTask(evt));            
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function deleteTask(evt) {
        parentListItem = evt.target.parentElement;
        parentListItem.remove()
    }

})();