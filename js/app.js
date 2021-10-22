'use strict';
const tasks = [

];
  

(function(arrOfTasks) {
    const objOftasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});


    const themes = { 
      default : {
        '--blue-background' : 'rgb(63, 63, 235)',
        '--red-background' : 'rgba(199, 61, 61, 0.979)',
        '--body-background' : 'white',
      },
      dark : { 
      '--body-background' : 'rgb(136, 133, 133)',
      '--blue-background' : 'rgb(14, 14, 37)',
      '--red-background' : 'rgba(121, 37, 37, 0.979)',
      },
    }

    let objCheck;
    const themeSelect = document.querySelector('select');


    const list = document.querySelector('.list-group')
    
    const form = document.forms['addTask'];

    const body = document.body;
    

    const forChangetheme = [];
    forChangetheme.push(document.querySelector('.add-btn'));
    forChangetheme.push(document.querySelector('nav'));
    

    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];

    renderAllTasks(objOftasks);
    form.addEventListener('submit', onFormSubmithandler);
    list.addEventListener('click', deleteHandler);
    themeSelect.addEventListener('change', changeTheme);

    function renderAllTasks(tasksList){
        if(!tasksList){
            console.error("did not found task list");
            return;
        }
        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        });
        list.appendChild(fragment);
    }

    function listItemTemplate({_id, title, body}){
      const li = document.createElement('li');

      li.setAttribute('data-task-id', _id);
      li.classList.add('list-group-item');

      const span = document.createElement('span');
      span.textContent = title;


      const deleteBtn = document.createElement('button');
      if(objCheck){
        deleteBtn.style.setProperty('--red-background', 'rgba(121, 37, 37, 0.979)')
      }
      deleteBtn.classList.add('delete-task');
      deleteBtn.textContent = 'Delete task';

      const article = document.createElement('p');
      article.classList.add('article');
      article.textContent = body;

      li.appendChild(span);
      li.appendChild(article);
      li.appendChild(deleteBtn);
      return li;
    }

    function onFormSubmithandler(e) {
      e.preventDefault();

      const titleValue = inputTitle.value;
      const bodyValue = inputBody.value;

     if(!titleValue || !bodyValue){
       alert("Enter title and body");
       return;
     }

     const task  = createNewTask(titleValue, bodyValue)
     
     const listItem = listItemTemplate(task);
     list.prepend(listItem);
     form.reset();
    }

    function createNewTask(title, body) {
      const newTask = {
        title : title,
        body :  body,
        completed: false,
        _id : `task-${Math.random()}`,
      }
      objOftasks[newTask._id] = newTask;
      return { ...newTask };
    }

    function deleteTaskFromHTML(el, conf){
      if(!conf) return;
      el.remove();
    }

    function deleteTaskfromObj(id){
      let isConfirm = confirm(`do you really want to delete the task: ${objOftasks[id].title}`);
      if(!isConfirm) return isConfirm;
      delete objOftasks[id];
      return isConfirm;
    }

    function deleteHandler(e){
      if(e.target.classList.contains('delete-task')){
        const parent = e.target.closest('li');
        const id = parent.dataset.taskId;
        const confirmed = deleteTaskfromObj(id);
        deleteTaskFromHTML(parent, confirmed)
      }     
    }
    
    function changeTheme(e){
      const selectedTheme = themeSelect.value;
      setTheme(selectedTheme);
    }

    function setTheme(theme){
      if(theme == 'dark'){
        objCheck = true;
      }else {
        objCheck = false;
      }
      const selectedThemeObj = themes[theme];
      const deleteButton = Array.from(document.querySelectorAll('.delete-task'));
      body.style.background = selectedThemeObj['--body-background'];

      deleteButton.forEach(item => {
        item.style.setProperty('--red-background', selectedThemeObj['--red-background']);
      });
      forChangetheme.forEach(item => {
        item.style.setProperty('--blue-background', selectedThemeObj['--blue-background']);
      })
      
    }
})(tasks);
