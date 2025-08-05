const getTasksFromLocalStorage = ()=>{
    const localTasks = window.localStorage.getItem('tarefas')
    return localTasks ? JSON.parse(localTasks) : [];
}

const renderTasksProgresData = (tarefas) => {
    let tasksProgress;
    const tasksProgressDOM = document.getElementById('tasks-progress');

    if (tasksProgressDOM) tasksProgress = tasksProgressDOM;
    else{
        const newTasksProgressDOM = document.createElement('p');
        newTasksProgressDOM.id = 'tasks-progress';
        document.getElementById('todo-footer').appendChild(newTasksProgressDOM);
        tasksProgress = newTasksProgressDOM;
    }

    const doneTasks = tarefas.filter(({ checked }) => checked).length;
    const totalTasks = tarefas.length;
    tasksProgress.textContent = `${doneTasks}/${totalTasks} Concluídas.`
}

function renderAllTasks() {
    const tarefas = getTasksFromLocalStorage();
    const lista = document.getElementById('todo-list');
    lista.innerHTML = ''; 

    tarefas.forEach((tarefa) => {
        const checkBox = getCheckBoxInput(tarefa);
        createTaskListItem(tarefa, checkBox);
    });

    renderTasksProgresData(tarefas);
}

const setTasksLocalStorage = (tarefas) => {
    window.localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

const removeTarefa = (tarefaId) => {
    const tarefas = getTasksFromLocalStorage();
    const updatedTasks = tarefas.filter(({ id }) => parseInt(id) !== parseInt(tarefaId));
    setTasksLocalStorage(updatedTasks);
    renderTasksProgresData(updatedTasks);

    const item = document.getElementById(tarefaId);
    const parent = document.getElementById('todo-list');

    if (item && parent.contains(item)) {
        parent.removeChild(item);
    }

    renderAllTasks();
};

const removeDoneTasks = () => {
    const tarefas = getTasksFromLocalStorage();
    const tasksToRemove = tarefas
        .filter(({ checked }) => checked)
        .map(({ id }) => id);

    const updatedTasks = tarefas.filter(({ checked }) => !checked);
    setTasksLocalStorage(updatedTasks);
    renderTasksProgresData(updatedTasks);

    const parent = document.getElementById('todo-list');

    tasksToRemove.forEach((id) => {
        const item = document.getElementById(id);
        if (item && parent.contains(item)) {
            parent.removeChild(item);
        }
    });

    renderAllTasks();
};

const createTaskListItem = (tarefas, checkBox) => {
    const lista = document.getElementById('todo-list');
    const toDo = document.createElement('li');

    const removeTaskButton = document.createElement('button');
    removeTaskButton.textContent = 'x';
    removeTaskButton.ariaLabel = 'Remover tarefa.';

    removeTaskButton.onclick = ()=> removeTarefa(tarefas.id)

    toDo.id = tarefas.id
    toDo.appendChild(checkBox)
    toDo.appendChild(removeTaskButton)

    lista.appendChild(toDo)
    
    return toDo;
}

const onCheckboxClick = (event)=> {
    const [id] = event.target.id.split('-');
    const tarefas = getTasksFromLocalStorage();

    const updatedTasks = tarefas.map((tarefa)=>{
        return (parseInt(tarefa.id) === parseInt(id)) 
            ? { ...tarefa, checked: event.target.checked}       
            : tarefa;
    })

    setTasksLocalStorage(updatedTasks);
    renderTasksProgresData(updatedTasks);
}

const getCheckBoxInput = ({id, description, checked})=>{
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkBoxID = `${id}-checkbox`

    checkBox.type = 'checkbox';
    checkBox.id = checkBoxID;
    checkBox.checked = checked || false;
    checkBox.addEventListener('change', onCheckboxClick)

    label.textContent = description;
    label.htmlFor = checkBoxID;
    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild(checkBox);
    wrapper.appendChild(label);

    return wrapper;
}

const getNewTaskId = ()=>{ 
    const tarefas = getTasksFromLocalStorage();   
    const lastId = tarefas[tarefas.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const getNewTaskData = (event)=>{
    const description = event.target.elements.description.value
    const id = getNewTaskId();

    return { description, id }
}

const getCreatedTaskInfo =  (event) => new Promise ((resolve) => {
    setTimeout(()=> {
        resolve(getNewTaskData(event));
    },1500)
})

const createTask = async (event) =>{
    if (document.getElementById('description').value === ''){
        alert('Digite uma tarefa!')
        return;
    }else{
        event.preventDefault();
        document.getElementById('save-task').setAttribute('disabled', true);
        const newTaskData = await getCreatedTaskInfo(event);

        const checkBox = getCheckBoxInput(newTaskData);
        createTaskListItem(newTaskData, checkBox);

        const tarefas = getTasksFromLocalStorage();
        const updatedTasks = [...tarefas, { id: newTaskData.id, description: newTaskData.description, checked: false }]
        setTasksLocalStorage(updatedTasks);
        renderTasksProgresData(updatedTasks)
        document.getElementById('save-task').removeAttribute('disabled');
        document.getElementById('description').value = '';
        document.getElementById('description').focus();        
        }
    
}

window.onload = function(){
    const form = document.getElementById('create-todo-form')  
    form.addEventListener('submit', createTask);

    const tarefas = getTasksFromLocalStorage();
    tarefas.forEach((tarefa)=>{
        const checkBox = getCheckBoxInput(tarefa)
        createTaskListItem(tarefas, checkBox);        
       
    });

    renderTasksProgresData(tarefas);
}

