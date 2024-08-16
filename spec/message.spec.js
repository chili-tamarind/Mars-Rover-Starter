const Message = require('../message.js');
const Command = require('../command.js');

// Use Jest Runner extension

describe("Message class", function () {

    // TEST 4
    test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect(function () { new Message(); }).toThrow(new Error('Name required.'));
    });


    // TEST 5
    test("constructor sets name", function () {
        let messageString = "Test message with two commands";
        let roverMessage = new Message(messageString, commands = []);

        expect(roverMessage.name).toEqual(messageString);
    });

    // TEST 6
    test("contains a commands array passed into the constructor as the 2nd argument", function () {

        let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
        let moveCommand = new Command('MOVE', 12000);
        let statusCommand = new Command('STATUS_CHECK');

        let sentCommands = [modeCommand, moveCommand, statusCommand];
        let roverMessage = new Message('Test message with two commands', commands);

        expect(roverMessage.commands === sentCommands)
    });

});