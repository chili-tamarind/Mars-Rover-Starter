const Command = require('../command.js');

// Use Jest Runner extension

describe("Command class", function () {

  // TEST 1
  test("throws error if command type is NOT passed into constructor as the first parameter", function () {
    expect(function () { new Command(); }).toThrow(new Error('Command type required.'));
  });

  // TEST 2
  test("constructor sets command type", function () {

    const allowedCommandTypes = ['MODE_CHANGE', 'MOVE', 'STATUS_CHECK'];

    let sentCommand = new Command('MOVE', 4321);
    expect(allowedCommandTypes.includes(sentCommand.commandType)).toEqual(true);

    sentCommand = new Command('STATUS_CHECK');
    expect(allowedCommandTypes.includes(sentCommand.commandType)).toEqual(true);

    sentCommand = new Command('MODE_CHANGE', 'LOW_POWER');
    expect(allowedCommandTypes.includes(sentCommand.commandType)).toEqual(true);

    sentCommand = new Command('MOVE', 3579);
    expect(allowedCommandTypes.includes(sentCommand.commandType)).toEqual(true);

    sentCommand = new Command('STATUS_CHECK');
    expect(allowedCommandTypes.includes(sentCommand.commandType)).toEqual(true);

    sentCommand = new Command('MEH');
    expect(allowedCommandTypes.includes(sentCommand.commandType)).toEqual(false);
  });


  // TEST 3
  test("constructor sets a value passed in as the 2nd argument", function () {

    const sentCommand = [new Command('STATUS_CHECK'), 
      new Command('MOVE', 12000), 
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 15000), 
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'NORMAL'),
      new Command('MOVE', 15000), 
      new Command('STATUS_CHECK')];
    
    
    for (eachCommand in sentCommand.length) {
      if (Command.commandType === 'MOVE') {
        expect(typeof Command.value === 'number').toEqual(true);
      }
      else if (Command.commandType === 'MODE_CHANGE') {
        expect(typeof Command.value === 'string').toEqual(true);
      }
      else if (Command.commandType === 'STATUS_CHECK') {
        expect(typeof Command.value === 'undefined').toEqual(true);
      }
    }   
  });

});