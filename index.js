const yargs = require("yargs");
const { hideBin } = require('yargs/helpers');
const contacts = require('./contacts');


const argv = yargs(hideBin(process.argv))
  .option('action', {
    alias: 'a',
    type: 'string',
    description: 'Choose action',
    demandOption: true
  })
  .option('id', {
    alias: 'i',
    type: 'string',
    description: 'User ID'
  })
  .option('name', {
    alias: 'n',
    type: 'string',
    description: 'User name'
  })
  .option('email', {
    alias: 'e',
    type: 'string',
    description: 'User email'
  })
  .option('phone', {
    alias: 'p',
    type: 'string',
    description: 'User phone'
  })
  .help()
  .argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.table(contact);
      break;

    case "add":
        await contacts.addContact(name, email, phone);
        console.log("Contact added successfully!")
      break;
    

    case "remove":
      await contacts.removeContact(id);
      console.log("Contact deleted");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
