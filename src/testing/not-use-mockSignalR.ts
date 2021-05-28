declare const $: any;

class Mock {
  callLog!: string[];
  onFunctionDict: { [key: string]: any} = {}
  doneFunc: null;
  failFunc: null;
  errorFunc: null;
  doneFail: DoneFail;
  channel: Channel;
  connection: Connection;

  constructor() {
    this.doneFail = new DoneFail(this);
    this.channel = new Channel(this);
    this.connection = new Connection(this);
    $.hubConnection = () => {
      return this.connection;
  };
  }

  public logStep(funcName: string) {
    var log = funcName + '(';
    var callerArgs = arguments.callee.caller.arguments;
    for (var i = 0; i < callerArgs.length; i++) {
      log += (typeof callerArgs[i] === 'function') ? 'function, ' : callerArgs[i] + ', ';
    };
    if (callerArgs.length > 0)
      log = log.substr(0, log.length - 2);
    this.callLog.push(log + ')');
  }

  public reset() {
    this.callLog = [];
    this.onFunctionDict = {}
    this.doneFunc = null;
    this.failFunc = null;
    this.errorFunc = null;
  };

}

class DoneFail {

  private mock: Mock;

  constructor(mock: Mock) {
    this.mock = mock;
  }

  public done(startFunc: any): DoneFail {
    this.mock.logStep('connection.start.done');
    this.mock.doneFunc = startFunc;
    return this;
  }

  public fail(failFunc: any): DoneFail {
    this.mock.logStep('connection.start.fail');
    this.mock.failFunc = failFunc;
    return this;
  }
}

class Channel {
  constructor(private mock: Mock) {

  }

  on(namedMessage: any, functionToCall: any) {
    this.mock.logStep('channel.on');
    this.mock.onFunctionDict[namedMessage] = functionToCall;
  }

  invoke(_actionName: string, _actionGuid: string) {
    this.mock.logStep('channel.invoke');
  }
}

class Connection {
  constructor(private mock: Mock) { }

  createHubProxy(_hubName: string) {
    this.mock.logStep('connection.createHubProxy');
    return this.mock.channel;
  }

  error(errorFunc: any) {
    this.mock.logStep('connection.error');
    this.mock.errorFunc = errorFunc;
  }

  start() {
    this.mock.logStep('connection.start');
    return this.mock.doneFail;
  }

  stop() {
    this.mock.logStep('connection.stop');
    return this.mock.doneFail;
  }
}

export const MockSignalR = new Mock();