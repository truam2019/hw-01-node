const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer los contactos:', error);
    return [];
  }
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al listar los contactos:', error);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.error('Error al obtener el contacto por ID:', error);
    throw error;
  }
}

async function removeContact(contactId) {
  return readContacts().then((contacts) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    return writeContacts(updatedContacts);
  });
}

async function writeContacts(contacts) {
  try {
    const data = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, data, 'utf8');
  } catch (error) {
    console.error("Error al escribir datos en el archivo:", error);
    throw error; 
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newContact = { id: await generateId(), name, email, phone };
    contacts.push(newContact);
    await writeContacts(contacts);
  } catch (error) {
    console.error("Error al agregar el contacto:", error);
  }
}

async function generateId() {
  return nanoid();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};

