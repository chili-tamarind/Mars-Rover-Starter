const Command = require('./command.js');

// A Message object has a name and contains several Command objects. Message is responsible for bundling the commands from mission control and delivering them to the rover.

class Message {
   
   constructor(name, commands) {
   
   this.name = name;          // name is a string that is the name of the message
   if (!name) {
      throw Error("Name required.");
   }

   this.commands = commands;  // commands is an array of Command objects.
   } 
}

/*
// INSIDER CHECKS

let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
let moveCommand = new Command('MOVE', 12000);
let statusCommand = new Command('STATUS_CHECK');

let my_commands = [modeCommand, moveCommand, statusCommand];
let my_message = new Message('Test message with two commands', my_commands);

console.log(my_message);
*/

module.exports = Message;   