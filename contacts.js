const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join('./db/contacts.json')

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) =>console.table(JSON.parse(data.toString())))
    .catch((err) => err.message);
}

function getContactById(contactId) {
    fs.readFile(contactsPath)
    .then((data) => {
        const contacts = JSON.parse(data.toString());
        const contact = contacts.find(contact => contact.id == contactId)
        console.log(contact)
    })
}

function removeContact(contactId) {
    fs.readFile(contactsPath)
        .then((data) => {
            const contacts = JSON.parse(data.toString())
            const filteredContacts = contacts.filter((item) => item.id != contactId);
            console.table(filteredContacts)
        })
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath)
        .then((data) => {
            const contacts = JSON.parse(data.toString())
            let id = contacts.length + 1
            const newContact = {
                id: id, 
                name: name,
                email: email,
                phone: phone
            };
            contacts.push(newContact)
            console.table(contacts);
        })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}