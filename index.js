// Phonebook data store
let Phonebook = new Map();

// Load data from localstorage if exists
     window.onload = function() {
            let savedData = localStorage.getItem("phonebook");
            if (savedData) {
                Phonebook = new Map(JSON.parse(savedData));
                DisplayContacts();
            }
        };
// Add Contact
function addContact() {
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    return alert("Please all fill out both fields");
  }

  Phonebook.set(name, phone);
  SaveData();
  DisplayContacts();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
}

// Display Contacts
function DisplayContacts() {
  let ContactList = document.getElementById("contactList");
  ContactList.innerHTML = "";

  let searchInput = document.getElementById("searchInput").value.toLowerCase();

  for (let [name, phone] of Phonebook) {
    
    if(name.toLowerCase().includes(searchInput)){
        let row = `
        <tr>
                <td>${name}</td>
                <td>${phone}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteContact('${name}')">Delete</button>
                </td>
            </tr>
        `
        ContactList.innerHTML += row;
    }

  }
  
}

// Save Data from LocalStorage
function SaveData() {
  localStorage.setItem("phonebook", JSON.stringify([...Phonebook]));
}

// Delete Contact
function deleteContact(name) {
  if (confirm("Are you sure want to delete contact")) {
    Phonebook.delete(name);
    SaveData();
    DisplayContacts();
  }
}

// Clear All
function clearContacts(){
    if(confirm("Are you sure you want to clear all data?")){
        Phonebook.clear();
        localStorage.removeItem("phonebook");
        DisplayContacts();
    }
}



DisplayContacts();
