const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// Use Jest Runner extension

beforeEach(function () { // Test data is reset each time

  // BASE TEST OBJECT
  my_commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 12000), new Command('STATUS_CHECK')];
  my_message = new Message(`Sending ${my_commands.length} commands`, my_commands);
  my_rover = new Rover(10000);    // Passes the rover's position.
  my_response = my_rover.receiveMessage(my_message);
});

describe("Rover class", function() {

  // TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function() {        
    
    my_rover = new Rover(2000);

    expect(my_rover.position).toEqual(2000);
    expect(my_rover.mode).toEqual('NORMAL');
    expect(my_rover.generatorWatts).toEqual(110);
  });
  
  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function() {
    expect(my_response.message).toEqual(my_message.name);
  });

  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    
    let my_commands_T9 = [new Command('MOVE', 12000), new Command('STATUS_CHECK')];
    let my_message_T9 = new Message(`Sending ${my_commands_T9.length} commands`, my_commands_T9);
    let my_rover_T9 = new Rover(10000);    // Passes the rover's position.
    let my_response_T9 = my_rover_T9.receiveMessage(my_message_T9);
    
    expect(my_response_T9.results.length).toEqual(my_commands_T9.length);
  });

  // TEST 10
  test("responds correctly to the status check command", function() {
    for (my_com in my_message.commands.length) {
      if (my_message.commands[my_com].commandType === 'STATUS_CHECK') {
          expect(my_response.results.roverStatus).toEqualInstanceOf(roverStatus);
          expect(my_response.results.roverStatus.mode).toEqual(my_rover.mode);   
          expect(my_response.results.roverStatus.generatorWatts).toEqual(my_rover.generatorWatts);    
          expect(my_response.results.roverStatus.position).toEqual(my_rover.position);
      }}   
  });

  // TEST 11
  test("responds correctly to the mode change command", function() {
    for (my_com in my_message.commands.length) {
      if (my_message.commands[my_com].commandType === 'MOVE') {
        if (my_rover.mode === 'NORMAL'){

          expect(roverCompletion.completed).toEqual(true); }}}  // TEST 13 checks position
  });

  // TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    
    for (my_com in my_message.commands.length) {
      if (my_message.commands[my_com].commandType === 'MOVE') {
        if (my_rover.mode === 'LOW_POWER'){
          expect(roverCompletion.completed).toEqual(false); }}}  
  });

  // TEST 13
  test("responds with the position for the move command", function() {
    
    for (my_com in my_message.commands.length) {
      if (my_message.commands[my_com].commandType === 'MODE_CHANGE')
        expect(my_rover.position).toEqual(my_message.commands[sent_command].value);
      }
  });

});