const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// Use Jest Runner extension

describe("Rover class", function () {

  // TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function () {

    let sentRover = new Rover(404); 

    expect(sentRover.position).toEqual(404);
    expect(sentRover.mode).toEqual('NORMAL');
    expect(sentRover.generatorWatts).toEqual(110);
  });

  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function () {
    
    let sentMessage = new Message(`This is Test 8`, new Command('STATUS_CHECK'));
    let sentRover = new Rover(1500); 
    let sentResponse = sentRover.receiveMessage(sentMessage);   

    expect(sentResponse.message).toEqual("This is Test 8");
  });

  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {

    let sentCommands = [new Command('STATUS_CHECK'), 
      new Command('MOVE', 12000), 
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 15000), 
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'NORMAL'),
      new Command('MOVE', 11000), 
      new Command('STATUS_CHECK')];
  
    let sentMessage = new Message(`Sending ${sentCommands.length} sentCommands`, sentCommands);
    let sentRover = new Rover(1500); 
    let sentResponse = sentRover.receiveMessage(sentMessage);

    expect(sentResponse.results.length).toEqual(9);
  });

  // TEST 10
  test("responds correctly to the status check command", function () {

    let sentMessage = new Message(`This is Test 10`, [new Command('STATUS_CHECK')]);
    let sentRover = new Rover(101010); 
    let sentResponse = sentRover.receiveMessage(sentMessage); 
    let sentResults = sentResponse.results;

    expect(sentResults[0].completed).toEqual(true);
    
    expect(sentResults[0].roverStatus.mode).toEqual('NORMAL');
    expect(sentResults[0].roverStatus.generatorWatts).toEqual(110);
    expect(sentResults[0].roverStatus.position).toEqual(101010);    
  });

  
  // TEST 11
  test("responds correctly to the mode change command", function () {
  
    let sentMessage = new Message(`This is Test 11`, [new Command('MODE_CHANGE', 'LOW_POWER')]);
    let sentRover = new Rover(111111); 
    let sentResponse = sentRover.receiveMessage(sentMessage); 
    let sentResults = sentResponse.results;

    expect(sentResults[0].completed).toEqual(true);    
    expect(sentRover.mode).toEqual('LOW_POWER'); 
  });

  // TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {

    let sentMessage = new Message(`This is Test 12`, [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)]);
    let sentRover = new Rover(121212); 
    let sentResponse = sentRover.receiveMessage(sentMessage); 
    let sentResults = sentResponse.results;

    expect(sentResults[1].completed).toEqual(false);    
    expect(sentRover.mode).toEqual('LOW_POWER'); 
    expect(sentRover.position).toEqual(121212); 
  });

  // TEST 13
  test("responds with the position for the move command", function () {

    let sentMessage = new Message(`This is Test 12`, [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 13000)]);
    let sentRover = new Rover(131313); 
    let sentResponse = sentRover.receiveMessage(sentMessage); 
    let sentResults = sentResponse.results;
    
    expect(sentRover.mode).toEqual('NORMAL'); 
    expect(sentRover.position).toEqual(13000); 
  });

});
