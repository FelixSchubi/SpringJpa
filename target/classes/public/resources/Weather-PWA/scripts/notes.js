var todoDB = (function() {
    // tDB = {object}
    var tDB = {};
    var datastore = null;
  
   
    tDB.open = function(callback) {
      console.log("tDB.open = function(callback) ");
      // Database version.
      var version = 1;
  
      // Verbindung zum Store
      var request = indexedDB.open('Notes', version);
  
      // Handlet upgrades
      request.onupgradeneeded = function(e) {
        var db = e.target.result;
  
        e.target.transaction.onerror = tDB.onerror;
  
        // löscht den alten
        if (db.objectStoreNames.contains('todo')) {
          db.deleteObjectStore('todo');
        }
  
  
  
        // es muss "keyPathi" benutzt werden, da es mir nur möglich war den ObjectStore zu löschen,
        // wenn der ObjectStore name nur Ziffern enthält -> Zusatz: entsteht immer eine andere Nummer!
        // line 500: var keyPathi = new Date().getTime();
  
        var store = db.createObjectStore('todo', {
          keyPath: 'keyPathi' 
        }
      );
      };
  
      // Erfolgreich
      request.onsuccess = function(e) {
        // Referenz zur Database
        datastore = e.target.result;
     
        callback();
        console.log("callback() // request onsuccess");
      };
  
      // Handlet Errors.
      request.onerror = tDB.onerror;
    };
  
  
   
    tDB.fetchTodos = function(callback) {
      console.log("tDB.fetchTodos = function(callback)");
      var db = datastore;
      var transaction = db.transaction(['todo'], 'readwrite');
      var objStore = transaction.objectStore('todo');
  
  //__________________________________________________________//
  
      var keyRange = IDBKeyRange.lowerBound(0);
      var cursorRequest = objStore.openCursor(keyRange);
  
  //_______________________________________________________//
  
  
      var todos = [];
  
      transaction.oncomplete = function(e) {
      
        resetImage();
        callback(todos);
        console.log("callback(todos)");
        
      };
  
      cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
        
        if (!!result == false) {
          return;
        }
        
        todos.push(result.value);
  
        result.continue();
      };
  
      cursorRequest.onerror = tDB.onerror;
    };
  
  
  
    tDB.createTodo = function(text , callback) {
      console.log("tDB.createTodo = function(text , callback)")
      
      var db = datastore;
  
      // Neue Transaktion
      var transaction = db.transaction(['todo'], 'readwrite');
  
      // Holt den ObjectStore
      var objStore = transaction.objectStore('todo');
  
    
      // Datum und Uhrzeit als Timestamp festlegen
  
      var dNow = new Date();
      var timestamp = 'Added:  ' + dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear() + ' ' + 
      dNow.getHours() + ':' + dNow.getMinutes() + ':' + dNow.getSeconds();
     
      var keyPathi = new Date().getTime();
      
  
  
      // Object für das todo item -> neu /-> 'date' : timestamp
  // bild als base64 Speichern
  
    var blob = document.getElementById("outImage").src;
    
  // var tmp = blob;
  
   if(blob == 0)
   {
     blob = "kein Bild hinzugefügt"
   }
  
  
  // var tmp = blob;
      var todo = {
        'text': text,
        'date': timestamp,
        'keyPathi': keyPathi,
        'image' : blob,
      };
   
  
  
      var request = objStore.put(todo);
  
      
      request.onsuccess = function(e) {
              callback(todo);
              console.log("callback(todo)");
              
                 
      };
      // Schlecht...->
      request.onerror = tDB.onerror;
    };
  
  
  
  
    tDB.deleteTodo = function(keyPathi, callback) {
      console.log("tDB.deleteTodo = function(keyPathi, callback)");
      var db = datastore;
      var transaction = db.transaction(['todo'], 'readwrite');
      var objStore = transaction.objectStore('todo');
  
  
  
      var request = objStore.delete(keyPathi);
      
      request.onsuccess = function(e) {
        callback();
        console.log("callback() // bei erfolgreichem löschen");
      }
      
      request.onerror = function(e) {
        console.log(e);
      }
    };
  
  
    // Exportiert das tDB Object.
    return tDB;
  }());
  
  
  
  window.onload = function() {
    
    // anzeigen der todo items
    todoDB.open(refreshTodos);
    
    
    // referenzierung zu den "form"-elementen
    var newTodoForm = document.getElementById('new-todo-form');
    var newTodoInput = document.getElementById('new-todo');
    var todoImg = document.getElementById('todoImg');
    
  // FileReader hinzufügen
  
    document.getElementById('todoImg').onchange = function (evt) {
      var tgt = evt.target || window.event.srcElement,
          files = tgt.files;
  
      // FileReader support
      if (FileReader && files && files.length) {
          var fr = new FileReader();
          fr.onload = function () {
              document.getElementById("outImage").src = fr.result;
      
              
                     
          }
          fr.readAsDataURL(files[0]);
        }
           
  }
  
    
    // Hanlder {{Einreichen einer neuen todo form}}
    newTodoForm.onsubmit = function() {
      // Holt den Text
      var text = newTodoInput.value;
      
      // nicht nichts
      if (text.replace(/ /g,'') != '') {
        // erstellen des todo- items
        todoDB.createTodo(text, function(todo) {
          refreshTodos();
        });
      }
      
      // Setzt Eingabe-Feld auf "0"
      newTodoInput.value = '';
      
      // schlecht ->
      return false;
    };
    
  }
  
  // updated die Liste
  function refreshTodos() {  
    todoDB.fetchTodos(function(todos) {
      var todoList = document.getElementById('todo-items');
      todoList.innerHTML = '';
      
      for(var i = 0; i < todos.length; i++) {
  
        // ____________________________________________________
  
        var todo = todos[(todos.length - 1 - i)];
        console.log(todo);
        var keyPathi = todos[(todos.length - 1 - i)];
  //___________________________________________________
        var li = document.createElement('li');
  
  
        
        var span = document.createElement('span');
  
  // span für Timestamp erstellen
  
        var spanTime = document.createElement('spanTime');
  
        var checkbox = document.createElement('input');
  
        checkbox.type = "checkbox";
  
        checkbox.className = "todo-checkbox";
  
        checkbox.label = "Delete"
  
        checkbox.setAttribute("data-id", todo.keyPathi);
  
  // Um Bilder anzuzeigen
  // span für Image erstellen
  
  var spanImageUrl = document.createElement('spanImageUrl');
  
  
  
  spanImageUrl.innerHTML = todo.image;
  
  console.log(spanImageUrl.innerHTML);
  
  var tmp = spanImageUrl.innerHTML;
  
  console.log(tmp);
  
  
  if(tmp == "kein Bild hinzugefügt")
  {
    var check = document.createElement('check');
    check.innerHTML = tmp;
  }
  else
  {
  
        var check = document.createElement('img');
  
        check.type = "image";
  
        check.src = spanImageUrl.innerHTML;
  
        check.label = "image"
  
  }     
  
     
  
  // span befüllen
          span.innerHTML = todo.text;
    
        spanTime.innerHTML = todo.date;
  
        
  
  
         
        li.appendChild(span);
        
       li.appendChild(checkbox);
  
       li.appendChild(check);
  
  
       li.appendChild(spanTime);
  
        todoList.appendChild(li);
  
        
        
        // Erstellen eines event listeners für die checkbox
        checkbox.addEventListener('click', function(e) {
          var keyPathi = parseInt(e.target.getAttribute('data-id'));
  
          todoDB.deleteTodo(keyPathi, refreshTodos);
        });
      }
  
    });
  };