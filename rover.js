const Message = require('./message.js');
const Command = require('./command.js');


class Rover {
   constructor(position) {
   
      this.position = position; 
      if (!position) {
         throw Error("Position required.");
      }

      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
      
   receiveMessage(sentMessage) { 

      let roverResults = [];

            for (let resultIndex = 0;  resultIndex < sentMessage.commands.length; resultIndex++) {             

            const roverCompletion = {completed: false} 
            const roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position,};

            const roverCommand = sentMessage.commands[resultIndex].commandType;
      
            if (roverCommand === 'MOVE' && this.mode !== 'LOW_POWER'){ 
               roverCompletion.completed = true;
               this.position =  sentMessage.commands[resultIndex].value; 
            }

            else if (roverCommand === 'STATUS_CHECK'){  
               roverCompletion.completed = true;
               roverCompletion.roverStatus =  roverStatus;      
            }

            else if (roverCommand === 'MODE_CHANGE'){ 
               roverCompletion.completed = true; 
               this.mode = sentMessage.commands[resultIndex].value;
            }
         
            roverResults.push(roverCompletion);
      }

         const rover_object = {               
               message: sentMessage.name,        
               results: roverResults,
            };
         
            return rover_object;
   }
}  

// EXAMPLE
const commands = [new Command('STATUS_CHECK'), 
                  new Command('MOVE', 12000), 
                  new Command('STATUS_CHECK'),
                  new Command('MODE_CHANGE', 'LOW_POWER'),
                  new Command('MOVE', 15000), 
                  new Command('STATUS_CHECK'),
                  new Command('MODE_CHANGE', 'NORMAL'),
                  new Command('MOVE', 15000), 
                  new Command('STATUS_CHECK')];

const message = new Message(`Sending ${commands.length} commands`, commands);
const rover = new Rover(10000); 
const response = rover.receiveMessage(message);

console.dir(response);

// EXPORT MODULE
module.exports = Rover; 