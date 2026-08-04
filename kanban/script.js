const lists = document.querySelectorAll('.list');
const addButton = document.querySelector('.addTask');
const taskForm = document.querySelector('.saveTask');
const saveCard = document.querySelector('.saveCard')
const container = document.querySelector('.container');
const cancelBtn = document.querySelector('.cancelBtn');

for(const list of lists){
    list.addEventListener('pointerdown', event=>{
        const task = event.target.closest('.task');
        if(task){
            task.addEventListener("dragstart", dragStart);
            task.addEventListener("dragend", dragEnd);
        }
    })

    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("dragover", dragOver);
    list.addEventListener("drop", drop);

}
function dragStart(){
    event.dataTransfer.setData("text/plain", this.id);

}
function dragEnd(){
    
    
}
function dragEnter(){
    this.classList.add("change")
    
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


addButton.addEventListener("click", ()=>{
    saveCard.classList.remove('hidden');
    container.classList.add('blurred');

    const taskInput = document.querySelector('#taskInput');
    taskForm.addEventListener('submit', event=>{
        event.preventDefault();
        if(taskInput.value.trim() !== ''){
            const newTask = document.createElement('div');
            const toDo = document.querySelector('#list1');
            newTask.draggable = 'true';
            newTask.classList.add('task');

            newTask.textContent = taskInput.value.trim();
            newId = taskInput.value.trim().replaceAll(' ', '-');
            newTask.id = newId;
            toDo.appendChild(newTask);
            saveCard.classList.add('hidden');
            container.classList.remove('blurred');
            taskInput.value = '';

        }
    })
    cancelBtn.addEventListener('click', ()=>{
        saveCard.classList.add('hidden');
        container.classList.remove('blurred');
        taskInput.value = '';
    })
})