const lists = document.querySelectorAll('.list');
const addButton = document.querySelector('.addTask');
const saveCard = document.querySelector('.saveCard')
const container = document.querySelector('.container');
const cancelBtn = document.querySelector('.cancelBtn');
const taskForm = document.querySelector('.saveTask');
const taskInput = document.querySelector('#taskInput');
let is_adding = null;
let title = null;

for(const list of lists){
    list.addEventListener('pointerdown', event=>{
        const task = event.target.closest('.task');
        if(task){
            task.addEventListener("dragstart", dragStart);
            task.addEventListener("dragend", dragEnd);
            const writeBtn = event.target.closest('.writeTask');
            const deleteBtn = event.target.closest('.deleteTask');

            if(deleteBtn){
                task.classList.add('deleted');
            }
            else if(writeBtn){
                console.log(task)
                const editTitle = task.querySelector('.taskTitle');
                taskInput.value = editTitle.textContent;
                saveCard.classList.remove('hidden');
                container.classList.add('blurred');
                is_adding = false; 
                title = editTitle;          
            }   
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
    event.target.classList.remove("change");
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
    console.log('before');
    is_adding = true;

})

taskForm.addEventListener('submit', event=>{
    event.preventDefault()
    if(is_adding === true){
        console.log('create')
        addingTask();
    }
    else if(is_adding===false){
        console.log('edit')
        editingTask(title);
        taskInput.value = '';
        saveCard.classList.add('hidden');
        container.classList.remove('blurred');
    }
});

cancelBtn.addEventListener('click', ()=>{
    saveCard.classList.add('hidden');
    container.classList.remove('blurred');
    taskInput.value = '';
})

function addingTask(){
    event.preventDefault();
    console.log('second');
    if(taskInput.value.trim() !== ''){
        const newTask = document.createElement('div');
        const taskTitle = document.createElement('p');
        const toDo = document.querySelector('#list1');
        newTask.draggable = 'true';
        newTask.classList.add('task');

        taskTitle.textContent = taskInput.value.trim();
        newId = taskInput.value.trim().replaceAll(' ', '-');
        newTask.id = newId;
        taskTitle.classList.add('taskTitle');

        const edit = document.createElement('div');
        const writeBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        writeBtn.textContent = '✒️';
        deleteBtn.textContent= 'X'

        writeBtn.classList.add("editBtn");
        writeBtn.classList.add("writeTask");
        deleteBtn.classList.add("editBtn");
        deleteBtn.classList.add("deleteTask");

        edit.appendChild(writeBtn);
        edit.appendChild(deleteBtn);
        newTask.appendChild(taskTitle)
        newTask.appendChild(edit)       
        toDo.appendChild(newTask);
    }
    else{
        console.log('no')
    }
    saveCard.classList.add('hidden');
    container.classList.remove('blurred');
    taskInput.value = '';
}


function editingTask(title){
    const newTitle = taskInput.value;
    title.textContent = newTitle;
}