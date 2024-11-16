(function() {
    // TODO: add a delete button
    // TODO: add in text field and edit button
    let addBtn = document.querySelector(".add-btn");
    let taskList = document.querySelector("#task")

    // initial task added for testing
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
            let allEditBtn = document.querySelectorAll(".edit-btn")
            allEditBtn.forEach((editBtn) => {
                editBtn.addEventListener("click", (evt) => openEditPanel(evt))
            })
            let allConfirmBtn = document.querySelectorAll(".confirm-btn")
            allConfirmBtn.forEach((confirmBtn) => {
                confirmBtn.addEventListener("click", (evt) => confirmedEditPanel(evt))
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function deleteTask(evt) {
        let parentListItem = evt.target.parentElement.parentElement;
        parentListItem.remove()
    }

    function openEditPanel(evt) {
        let parentListItem = evt.target.parentElement.parentElement
        let editPanel = parentListItem.querySelector(".edit-panel")
        let displayPanel = parentListItem.querySelector(".display-panel")
        
        if (editPanel.style.display == "none") {
            editPanel.style.display = "flex";
            displayPanel.style.display = "none";    
        }
        else {
            editPanel.style.display = "none";
            displayPanel.style.display = "flex";    
        }
    }

    function confirmedEditPanel(evt) {
        let parentListItem = evt.target.parentElement.parentElement;

        let label1 = parentListItem.querySelector(".display-panel > .item-label")
        let label2 = parentListItem.querySelector(".edit-panel > .item-label")

        let newLabel = label2.value;

        label1.innerHTML = newLabel;
        label2.value = newLabel;

        openEditPanel(evt)
    }
})();