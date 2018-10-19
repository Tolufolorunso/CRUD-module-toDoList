 //storage controller 



 //data controller 
 const dataCtrl = (function () {
     //toDo constructor
     const Todo = function (sbj, mssg, ID) {
         this.sbj = sbj;
         this.mssg = mssg;
         this.ID = ID;
     }

     //Data structure / State
     const data = {
         Todos: [
             {
                 id: 0,
                 subject: 'List group item heading',
                 message: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.'
             },
             {
                 id: 1,
                 subject: 'List group item heading',
                 message: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.'
             },
             {
                 id: 2,
                 subject: 'List group item heading',
                 message: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.'
             }
         ],
         currentTodo: null
     }

     //public Methods

     return {
         //get data from the array
         getData: function () {
             return data.Todos;
         },


         logData: () => {
             return data;
         }
     }
 })();


 //UI controller 
 const UICtrl = (function () {



     //public Methods
     return {
         polulateUI: function (todoLists) {
             let html = '';
             todoLists.forEach(function (todoList) {
                 html += `<li class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-2 text-capitalize">${todoList.subject}</h5>
        <a href="#"><i class="fas fa-edit" data-toggle="tooltip" data-placement="bottom" title="Update"></i></a>
    </div>
    <p class="mb-1 lead">${todoList.message}</p>
</li>`
             });

             document.querySelector('.list-group').innerHTML = html;
         }
     }
 })();



 //App controller
 const APP = (function (dataCtrl, UICtrl) {
     //public Methods


     return {
         init: function () {
             const todoLists = dataCtrl.getData();
             console.log(todoLists);


             //populate todo
             UICtrl.polulateUI(todoLists);

         }


     }
 })(dataCtrl, UICtrl);


 APP.init();
