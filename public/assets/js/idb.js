// create a variable to hold db connection
let db;
//establish a connection to IndexedDB database called pizza_hunt and set it to version 1
// created a variable called db that will store the connected database objet whhen the connection is complete
// we create the request variabel to act as an event listener for the database, created when used indexedDB.open method

//open method takes two parameters, name of database and the version of the database
const request = indexedDB.open('pizza-hunt', 1);

// this event will emit fi the database version changes
request.onupgradeneeded = function(event) {
    //save a reference to the database
    const db = event.target.result;
    //create an object store called new_pizza and set it to have an auto incrementing primary key
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// upon a successful
request.onsuccess = function(event) {
    //when db is successfully created with its object store or simply established a connetion, save ref to db in global variable
    db = event.target.result;

    //check if app is online, if yes run uploadpizza function to send all local db to api
    if (navigator.online) {
        uploadPizza();
    }
};

request.onerror = function(event) {
    //log error here
    console.log(event.target.errCode);
};

// this function will be executed if we attempt to submit a new pizza and theres no internet connection
function saveRecord(record) {
    //open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //access the object store for new_pizza
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    //add record to your store with add method
    pizzaObjectStore.add(record);
}

function uploadPizza() {
    //open transaction on your db
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access your object store
    const pizzaObjectStor = transaction.objectStore('new_pizza');

    // get all recors from store and set to a variable
    const getAll = pizzaObjectStor.getAll();

    // upon a successful .getAll() execution, run this function
getAll.onsuccess = function() {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch('/api/pizzas', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open one more transaction
          const transaction = db.transaction(['new_pizza'], 'readwrite');
          // access the new_pizza object store
          const pizzaObjectStore = transaction.objectStore('new_pizza');
          // clear all items in your store
          pizzaObjectStore.clear();

          alert('All saved pizza has been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}

//listen for app coming back online
window.addEventListener('online', uploadPizza);