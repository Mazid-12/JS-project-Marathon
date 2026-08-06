const lists = document.querySelectorAll('.list');
const addButton = document.querySelector('.addTask');
const saveCard = document.querySelector('.saveCard')
const container = document.querySelector('.container');
const cancelBtn = document.querySelector('.cancelBtn');
const taskForm = document.querySelector('.saveTask');
const taskInput = document.querySelector('#taskInput');
let is_adding = null;
let title = null;
let first_time = true;
let taskStoreArray = null;


if(localStorage.length !==0){
    taskStoreArray = JSON.parse(localStorage.getItem('task'));
    taskStoreArray.forEach(storeTask => {
        storeTitle = storeTask.title;
        storeCategory = storeTask.category;
        
        for(const list of lists){
            listHeading = list.querySelector('h2');
            if(storeCategory === listHeading.textContent){
                createTask(storeTitle, list)
            }
        }
        
    });
}
else if(localStorage.length===0){
    taskStore = []
    localStorage.setItem('task', JSON.stringify(taskStore));
}
for(const list of lists){
    list.addEventListener('pointerdown', event=>{
        const task = event.target.closest('.task');
        if(task){
            task.addEventListener("dragstart", dragStart);
            task.addEventListener("dragend", dragEnd);
            const writeBtn = event.target.closest('.writeTask');
            const deleteBtn = event.target.closest('.deleteTask');
            const editTitle = task.querySelector('.taskTitle');
            if(deleteBtn){
                task.classList.add('deleted');
                taskStoreArray = JSON.parse(localStorage.getItem('task'));
                const deletedStore = taskStoreArray.filter(storeTask=>storeTask.title !== editTitle.textContent);
                localStorage.setItem('task', JSON.stringify(deletedStore));
            }
            else if(writeBtn){
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
    const dragTitle = dragTask.querySelector('.taskTitle');
    const dragCategory = this.querySelector('h2')
    taskStoreArray = JSON.parse(localStorage.getItem('task'));
    const newTaskArray = taskStoreArray.map(taskStore =>{
        if(taskStore.title === dragTitle.textContent){
            taskStore.category = dragCategory.textContent;
        }
        return taskStore
    })
    localStorage.setItem('task', JSON.stringify(newTaskArray));

}




addButton.addEventListener("click", ()=>{
    saveCard.classList.remove('hidden');
    container.classList.add('blurred');
    is_adding = true;

})

taskForm.addEventListener('submit', event=>{
    event.preventDefault()
    if(is_adding === true){
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
    if(taskInput.value.trim() !== ''){
        const toDo = document.querySelector('#list1');
        createTask(taskInput.value, toDo)
        taskStoreArray = JSON.parse(localStorage.getItem('task'));

        newTaskObject = {'title': taskInput.value.trim(),
                         'category': 'To Do'
        }
        taskStoreArray.push(newTaskObject);

        localStorage.setItem('task', JSON.stringify(taskStoreArray));
        
    }
    else{
        console.log('no')
    }
    saveCard.classList.add('hidden');
    container.classList.remove('blurred');
    taskInput.value = '';
}


function editingTask(title){
    const oldTitle = title.textContent;
    const newTitle = taskInput.value;
    title.textContent = newTitle;

    taskStoreArray = JSON.parse(localStorage.getItem('task'));
    const newTaskArray = taskStoreArray.map(taskStore =>{
        if(taskStore.title === oldTitle){
            taskStore.title = newTitle;
        }
        return taskStore
    })
    localStorage.setItem('task', JSON.stringify(newTaskArray));

}


function createTask(taskValue, category){
    console.log(taskValue)
    const newTask = document.createElement('div');
    const taskTitle = document.createElement('p');
    
    newTask.draggable = 'true';
    newTask.classList.add('task');

    taskTitle.textContent = taskValue.trim();
    newId = taskValue.trim().replaceAll(' ', '-');
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
    category.appendChild(newTask);
}