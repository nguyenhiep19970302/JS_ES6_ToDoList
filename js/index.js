import ToDoList from "./models/ToDoList.js";
const toDoList = new ToDoList();
const getEL = id => document.getElementById(id);
const delInPut = () => {
    getEL("newTask").value = "";
};

function getToDay() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];


    const d = new Date();
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const day = days[d.getDay()];

    return `${day} ${month} ${date},${year}`;
}
const today = getToDay();

document.querySelector(".card__title p").innerHTML = today;

const renderHTML = (arrTask, arrCopmleTask) => {
    if (arrTask) {
        const result = arrTask.reduce((content, task, index) => {
            return content += `
            <li>
                <span>${task.task}</span>
                <div class="buttons">
                    <button class="remove" onclick="deleteTask(${index})"><i class=" fa fa-trash-alt"></i></button>
                    <button class="complete" onclick="TaskComplete(${index})"><i class=" fa fa-check"></i></button>
                </div>
             </li>
            `
        }, "")
        getEL("todo").innerHTML = result;
    }
    if (arrCopmleTask) {
        const result = arrCopmleTask.reduce((content, task, index) => {
            return content += `
            <li>
                <span>${task.task}</span>
                <div class="buttons">
                    <button class="remove" onclick="deleteTaskComplete(${index})"><i class=" fa fa-trash-alt"></i></button>
                    <button class="complete" onclick="refunTask(${index})"><i class="fa fa-redo"></i></button>
                </div>
            </li>
            `;
        }, "") 
        console.log(result);
        getEL("completed").innerHTML = result;
    }
}

const setLocalStorage = (tasklist, taskCompleList) => {
    if (tasklist) {
        localStorage.setItem("task", JSON.stringify(tasklist));
    }
    if (taskCompleList) {
        localStorage.setItem("taskComple", JSON.stringify(taskCompleList));
    }

}

const getLocalStorage = () => {
    if (localStorage.getItem("task")) {
        toDoList.toDoList = JSON.parse(localStorage.getItem("task"));
    }
    if (localStorage.getItem("taskComple")) {
        toDoList.compleToDoList = JSON.parse(localStorage.getItem("taskComple"));
    }
    renderHTML(toDoList.toDoList, toDoList.compleToDoList);
}

getLocalStorage();

getEL("addItem").addEventListener('click', () => {
    let newTask = getEL("newTask").value;
    if (newTask === "") {
        alert("Yêu cầu nhập task!!");
        return;
    }
    toDoList.addTask(newTask, today)

    renderHTML(toDoList.toDoList, toDoList.compleToDoList);
    setLocalStorage(toDoList.toDoList, toDoList.compleToDoList);
    delInPut();

})

const TaskComplete = index => {
    console.log(index);
    toDoList.addTaskCommple(index);
    renderHTML(toDoList.toDoList, toDoList.compleToDoList);
    setLocalStorage(toDoList.toDoList, toDoList.compleToDoList);
}

const deleteTask = index => {
    toDoList.deleTask(index);
    renderHTML(toDoList.toDoList, null);
    setLocalStorage(toDoList.toDoList, null);
}

const deleteTaskComplete = index => {
    toDoList.deleTaskComple(index);
    renderHTML(null,toDoList.compleToDoList);
    setLocalStorage(null,toDoList.compleToDoList);
}

getEL("one").addEventListener("click", () => {
    toDoList.checkAllComple();
    renderHTML(toDoList.toDoList, toDoList.compleToDoList);
    setLocalStorage(toDoList.toDoList, toDoList.compleToDoList);
});

getEL("two").addEventListener("click", () => {
    toDoList.sortAZ();
    renderHTML(toDoList.toDoList, toDoList.compleToDoList);
    setLocalStorage(toDoList.toDoList, toDoList.compleToDoList);
});

getEL("three").addEventListener("click", () => {
    toDoList.sortZA();
    renderHTML(toDoList.toDoList, toDoList.compleToDoList);
    setLocalStorage(toDoList.toDoList, toDoList.compleToDoList); 
});

getEL("all").addEventListener("click", () => {
    toDoList.refundAllTask();
    renderHTML(toDoList.toDoList, toDoList.compleToDoList);
    setLocalStorage(toDoList.toDoList, toDoList.compleToDoList);
})

const refunTask = index => {
    toDoList.refundTask(index);
    renderHTML(toDoList.toDoList, toDoList.compleToDoList);
    setLocalStorage(toDoList.toDoList, toDoList.compleToDoList);
}

window.deleteTask = deleteTask;
window.TaskComplete = TaskComplete;
window.deleteTaskComplete = deleteTaskComplete;
window.refunTask = refunTask;
