const fs = require('fs')
const path = require('path')
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
const { promises: fsPromise } = fs;

async function listContacts() {
    try {
        const contacts = await fsPromise.readFile(contactsPath)
        const contactsList = JSON.parse(contacts.toString())
        console.table(contactsList);
    } catch (err) {
        console.log(err.message);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await fsPromise.readFile(contactsPath);
        const contactsList = JSON.parse(contacts.toString())
        const contactWithId = contactsList.filter(({ id }) => id == contactId);
        console.log(contactWithId);
    } catch (err) {
        console.log(err.message);
    }
}

async function removeContact(contactId) {
        try {
        const contacts = await fsPromise.readFile(contactsPath);
        const contactsList = JSON.parse(contacts.toString())
        const contactWithouthId = contactsList.filter(({ id }) => id !== contactId);
        await fsPromise.writeFile(contactsPath, JSON.stringify(contactWithouthId));
        console.table(contactWithouthId);
    } catch (err) {
        console.log(err.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await fsPromise.readFile(contactsPath);
        const contactsList = JSON.parse(contacts.toString())
        let id = contactsList.length + 1
        const newContact = {
            id: id, 
            name: name,
            email: email,
            phone: phone
          };
        contactsList.push(newContact)
        await fsPromise.writeFile(contactsPath, JSON.stringify(contactsList));
        console.table(contactsList);
    } catch (err) {
        console.log(err.message);
    }
}

// ========= without async

// const fs = require('fs').promises
// const path = require('path')
// const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// function listContacts() {
//   fs.readFile(contactsPath)
//     .then((data) =>console.table(JSON.parse(data.toString())))
//     .catch((err) => err.message);
// }
// listContacts()

// function getContactById(contactId) {
//     fs.readFile(contactsPath)
//     .then((data) => {
//         const contacts = JSON.parse(data.toString());
//         const contact = contacts.find(contact => contact.id == contactId)
//         console.log(contact)
//     })
// }
// getContactById(2)


// function removeContact(contactId) {
//     fs.readFile(contactsPath)
//         .then((data) => {
//             const contacts = JSON.parse(data.toString())
//             const filteredContacts = contacts.filter((item) => item.id != contactId);
//             console.table(filteredContacts)
//         })
// }
// removeContact(3)

// function addContact(name, email, phone) {
//     fs.readFile(contactsPath)
//         .then((data) => {
//             const contacts = JSON.parse(data.toString())
//             let id = contacts.length + 1
//             const newContact = {
//                 id: id, 
//                 name: name,
//                 email: email,
//                 phone: phone
//             };
//             contacts.push(newContact)
//             console.table(contacts);
//         })
// }
// addContact('as', 'asd', 'asdd')

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}