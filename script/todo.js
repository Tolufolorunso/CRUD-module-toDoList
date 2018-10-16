'use strict';

//Global variables
let ulLI = document.querySelector('.list--containter');
//let deleteLI = document.querySelector('li .delete');


//classes
let controller = (function () {
    class Todo {
        constructor(subject, message) {
            this.subject = subject;
            this.message = message;
        }
    }

    let data = {
        toDoList: []
    };

    return {
        addItem: function (sub, msg) {
            let todo = new Todo(sub, msg);
            data.toDoList.push(todo);
            return todo;

        }
    };


})();







//Functions

function submitMessage(e) {
    e.preventDefault();
    msgObj(controller);
    document.querySelector('form').reset();
    document.querySelector('#subject').focus();
}

//Get data from UI
let msgObj = function (controller) {

    //getting data from UI

    let subject = document.querySelector('#subject').value;
    let msg = document.querySelector('#main--message').value;

    //send the data to controller
    let todoItems = controller.addItem(subject || 'Note', msg);

    UIcontroller(todoItems);

};


//UI controller
let UIcontroller = function (todoItems) {
    let todo = todoItems,
        sub = todo.subject,
        msg = todo.message;
    //html text holder
    let liMsg = `
                <li><div class="li--container">
                        <h2 class="subject">subject: ${sub}</h2>
                        <p class="message">${msg}</p>
                        <a href="#" class="delete">X</a>
                </div></li>`;

    ulLI.insertAdjacentHTML('afterbegin', liMsg);

    storeToLocal(todo);
};


function storeToLocal(todoList) {
    let todo = retriveFromLocal();
    todo.push(todoList);

    localStorage.setItem('todo', JSON.stringify(todo));
}

function retriveFromLocal() {
    let todo;
    if (localStorage.getItem('todo') === null) {
        todo = [];
    } else {
        todo = JSON.parse(localStorage.getItem('todo'));
    }

    return todo;
}


function loadTodo() {
    let todoList = retriveFromLocal();
    todoList.forEach(function (todo) {
        const li = document.createElement('li');

        li.innerHTML = `
                <div class="li--container">
                        <h2 class="subject">subject: ${todo.subject}</h2>
                        <p class="message">${todo.message}</p>
                        <a href="#" class="delete">X</a>
                </div>`;
        document.querySelector('.list--containter').appendChild(li);
    });
}

function deleteFunc(e) {
    let todo;
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        todo = e.target.parentElement.querySelector('.message').textContent;
    }
    deleteFromLocal(todo);
    document.querySelector('#subject').focus();

}

function deleteFromLocal(todoLi) {
    let todo = retriveFromLocal();

    for (let i = 0; i < todo.length; i++) {
        if (todo[i].message == todoLi) {
            todo.splice(i, 1);
        }
    }
    localStorage.setItem('todo', JSON.stringify(todo));

}

//addEventListener

function init() {
    document.querySelector('form').addEventListener('submit', submitMessage);
    ulLI.addEventListener('click', deleteFunc);
    document.addEventListener('DOMContentLoaded', loadTodo);
}
init();
