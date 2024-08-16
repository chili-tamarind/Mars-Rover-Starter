const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// Use Jest Runner extension

beforeEach(function () {
  
  sentCommands = [new Command('STATUS_CHECK'), 
    new Command('MOVE', 12000), 
    new Command('STATUS_CHECK'),
    new Command('MODE_CHANGE', 'LOW_POWER'),
    new Command('MOVE', 15000), 
    new Command('STATUS_CHECK'),
    new Command('MODE_CHANGE', 'NORMAL'),
    new Command('MOVE', 11000), 
    new Command('STATUS_CHECK')];

  sentMessage = new Message(`Sending ${sentCommands.length} sentCommands`, sentCommands);
  sentRover = new Rover(1500); 
  sentResponse = sentRover.receiveMessage(sentMessage);
  sentResults = sentResponse.results;

});

describe("Rover class", function () {

  // TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function () {

    sentRoverTest7 = new Rover(404); 

    expect(sentRoverTest7.position).toEqual(404);
    expect(sentRoverTest7.mode).toEqual('NORMAL');
    expect(sentRoverTest7.generatorWatts).toEqual(110);
  });

  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function () {

    expect(sentResponse.message).toEqual(sentMessage.name);
  });

  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {

    expect(sentResponse.results.length).toEqual(sentCommands.length);
  });

  // TEST 10
  test("responds correctly to the status check command", function () {

    for (sentCommands in sentResponse.length) {
      if (sentResponse[sentCommands].commandType === 'STATUS_CHECK') {
        expect(sentResults.roverStatus).toEqualInstanceOf(roverStatus);
        expect(sentResults.roverStatus.mode).toEqual(rover.mode);
        expect(sentResults.roverStatus.generatorWatts).toEqual(rover.generatorWatts);
        expect(response.results.roverStatus.position).toEqual(rover.position);
      }
    }
  });

  // TEST 11
  test("responds correctly to the mode change command", function () {

    for (sentCommands in sentResults.length) {
      if (sentResults[sentCommands].commandType === 'MOVE') {
        if (rover.mode === 'NORMAL') {
          expect(roverCompletion.completed).toEqual(true);
        }
      }
    }
  });

  // TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {

    for (sentCommands in sentResults.length) {
      if (sentResults[sentCommands].commandType === 'MOVE') {
        if (rover.mode === 'LOW_POWER') {
          expect(roverCompletion.completed).toEqual(false);
    }}};
  });

  // TEST 13
  test("responds with the position for the move command", function () {

    for (sentCommands in sentResults.length) {
      if (sentResults[sentCommands].commandType === 'MODE_CHANGE')
        expect(rover.position).toEqual(message.commands[sentCommand].value);
    }
  });

});