// A type of object containing a commandType property. commandType is one of the given strings in the table below. Some commandTypes are coupled with a value property, but not all. Every Command object is a single instruction to be delivered to the rover.

class Command {
  constructor(commandType, value) {
    
    this.commandType = commandType;
    
    if (!commandType) {
      throw Error("Command type required.");
    } 
    
    this.value = value;
  }

}

/*
// INSIDER CHECKS
// note that a command type will be one of the following: MODE_CHANGE, MOVE, or STATUS_CHECK.

const modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
const moveCommand = new Command('MOVE', 12000);
const statusCommand = new Command('STATUS_CHECK');

console.log(modeCommand);
console.log(moveCommand);
console.log(statusCommand);
*/

module.exports = Command;