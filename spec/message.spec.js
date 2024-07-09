const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    // TEST 4 - This test description is “throws error if a name is NOT passed into the constructor as the first parameter”. Review the first test in command.spec.js for an example of how this test works.

    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name required.'));
    });
        
    
    // TEST 5 - The test confirms that the constructor in the Message class correctly sets the name property in a new message object.

    describe("constructor sets name", function() {
        it("constructor in the Message class correctly sets the name property", function() {
            
            let message_1 = new Message('Test message with two commands', my_commands = []); //<<<<<<<<<<<<<<<<<<<<<<
            expect((typeof message_1.name).toBe('string'));
    
        });
    });


    // TEST 6 - This test confirms that the commands property of a new message object contains the data passed in from the Message(name, commands) call.

    describe("contains a commands array passed into the constructor as the 2nd argument", function() {
        
        let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
        let moveCommand = new Command('MOVE', 12000);
        let statusCommand = new Command('STATUS_CHECK');

        let my_commands = [modeCommand, moveCommand, statusCommand];
        let message_1 = new Message('Test message with two commands', my_commands);

        expect(message_1.commands ===  my_commands)
    });

});