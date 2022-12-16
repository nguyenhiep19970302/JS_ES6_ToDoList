export default class ToDoList {

    constructor() {
        this.toDoList = [];
        this.compleToDoList = [];
    }

    addTask(task,date) {
        return this.toDoList.push({
            task,
            date
        })
    }

    deleTask(index) {
        return this.toDoList.splice(index, 1);
    }

    addTaskCommple(index) {
        let taskCompel = "";
        index < this.toDoList.length ? taskCompel = this.toDoList.slice(index, index + 1) : taskCompel = this.toDoLis.slice(index);
        this.compleToDoList = [
            ...this.compleToDoList,
            ...taskCompel];
        this.deleTask(index);
    }

    refundTask(index) {
        let task = "";
        if (index < this.compleToDoList.length) {
            task = this.compleToDoList.slice(index, index + 1);
        } else {
            task = this.compleToDoList.slice(index);
        }
        this.toDoList = [...this.toDoList, ...task];
        this.deleTaskComple(index);
    }

    deleTaskComple(index) {
        return this.compleToDoList.splice(index, 1);
    }
    
    checkAllComple() {
        let takComple = "";
        takComple = this.toDoList.splice(0);
        this.compleToDoList = [
            ...this.compleToDoList,
            ...takComple
        ];
        this.toDoList = [];
    }
    refundAllTask() {
        let tak = "";
        tak = this.compleToDoList.splice(0);
        this.toDoList = [
            ...this.toDoList,
            ...tak
        ];
        this.compleToDoList = [];
    }

    sortAZ() {
        this.toDoList.sort((a, b) => a.task.localeCompare(b.task));
        this.compleToDoList.sort((a, b) => a.task.localeCompare(b.task));
    }

    sortZA() {
        this.toDoList.reverse((a, b) => a.task.localeCompare(b.task));
        this.compleToDoList.reverse((a, b) => a.task.localeCompare(b.task));
    }
}