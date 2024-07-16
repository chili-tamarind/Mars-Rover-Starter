const Message = require('./message.js');
const Command = require('./command.js');

//Rover: An object representing the mars rover. This class contains information on the rover’s position, operating mode, and generatorWatts. It also contains a function, receiveMessage that handles the various types of commands it receives and updates the rover’s properties.

class Rover {
   constructor(position) {
   
      this.position = position;  // position is a number representing the rover’s position.
      if (!position) {
         throw Error("Position required.");
      }

      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
      
   // Updates certain properties of the rover object. Returns an object containing at least two properties
   receiveMessage(my_message) { // message is a Message object

      let my_results = [];

         //for (sent_index in my_message.commands.length) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
         for (let sent_index = 0;  sent_index < my_message.commands.length; sent_index++) {             

            // Declare Objects
            let roverCompletion = {completed: false} 
            let roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position,};

            // Determine the commandType
            let my_command = my_message.commands[sent_index].commandType;

            // Number representing the position the rover should move to      
            if (my_command === 'MOVE' && this.mode !== 'LOW_POWER'){ 
               roverCompletion.completed = true;
               this.position =  my_message.commands[sent_index].value; 
            }

            // No values sent with this commandType
            else if (my_command === 'STATUS_CHECK'){  
               roverCompletion.completed = true;
               roverCompletion.roverStatus =  roverStatus;      
            }

            //String representing rover mode
            else if (my_command === 'MODE_CHANGE'){ 
               roverCompletion.completed = true; 
               this.mode = my_message.commands[sent_index].value;
            }
         
            // Append the result. Note the response value for completed will remain false if the command could NOT be completed.
            my_results.push(roverCompletion);
      }

         let rover_object = {
               
               // message: the name of the original Message object
               message: my_message.name,         
               
               // results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
               results: my_results,
            };
         
            return rover_object;
   }
}  

// INSIDER CHECKS
let commands = [  new Command('STATUS_CHECK'), 
                  new Command('MOVE', 12000), 
                  new Command('STATUS_CHECK'),
                  new Command('MODE_CHANGE', 'LOW_POWER'),
                  new Command('MOVE', 15000), 
                  new Command('STATUS_CHECK'),
                  new Command('MODE_CHANGE', 'NORMAL'),
                  new Command('MOVE', 15000), 
                  new Command('STATUS_CHECK')];

let message = new Message(`Sending ${commands.length} commands`, commands);
let rover = new Rover(10000);    // Passes the rover's position.
let response = rover.receiveMessage(message);

console.log("\n*******************");
console.dir(response);

// EXPORT MODULE
module.exports = Rover; 