const tasks = document.querySelectorAll('.task');
const lists = document.querySelectorAll('.list');

for(const task of tasks){
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
}

for(const list of lists){
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("dragover", dragOver);
    list.addEventListener("drop", drop);
}

function dragStart(){
    event.dataTransfer.setData("text/plain", this.id)

}
function dragEnd(){
    
    
}
function dragEnter(){
    event.target.classList.add("change")
    
}
function dragLeave(){
    event.target.classList.remove("change")
    
}
function dragOver(event){
    event.preventDefault();

}

function drop(){
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const dragTask = document.getElementById(taskId);
    this.appendChild(dragTask);
    this.classList.remove("change");
}