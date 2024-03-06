import { program } from "commander";
import * as logger from "./contacts.js";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await logger.listContacts();
      return console.table(allContacts);

    case "get":
      const oneContact = await logger.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact = await logger.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const deleteContact = await logger.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
program
  .option("-a, --action, <type>", "choose action")
  .option("-i, --id, <type>", "user id")
  .option("-n, --name, <type>", "user name")
  .option("-e, --email, <type>", "user email")
  .option("-p, --phone, <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);
