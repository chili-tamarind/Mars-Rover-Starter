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
   
   
   // Updates certain properties of the rover object
   receiveMessage(my_message = new Message) { // message is a Message object
   
      // Returns an object containing at least two properties:
      let result = [];

      for (command in my_message.length) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<

         // Number representing the position the rover should move to.       
         if (my_message.commandType == 'MOVE'){ 
            Rover.position = value; 
            result += `{completed: true}`;
         }
         // No values sent with this command.
         else if (my_message.commandType == 'STATUS_CHECK'){ 
            result +=`{completed: true, roverStatus: {mode: ${Rover.mode}, generatorWatts: ${Rover.generatorWatts}, position: ${Rover.position}}}`;
         }
         //String representing rover mode
         else if (my_message.commandType == 'MODE_CHANGE'){ 
            Rover.mode = value;
            result +=`{completed: true}`;
         }
      } 

      let rover_object = {
         
         // message: the name of the original Message object
         'message': my_message.name,         
         
         // results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
         'results': (my_message.commands)//.map(my_message => `${my_message.commands}`) //<<<<<<<<<<<<<<<<<???????????
      
      /*console.log('\nAll Animals\n-------------------')
      let animal_name_ID =  animals.map(animals => `[${animals.astronautID}] ${animals.name}`)
      animal_name_ID = animal_name_ID.sort().join('\n'); 
      console.log(animal_name_ID)*/
      };
      

      return rover_object;
   }

  // The response value for completed will be false if the command could NOT be completed.

}  

//
// INSIDER CHECKS

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);

let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log("\n*******************");
console.log(response);

//

module.exports = Rover; 