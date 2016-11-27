import Joi from 'joi';

const commandSchema = Joi.object().keys({
  command: Joi.array().items(Joi.string().required()).required(),
  handler: Joi.func(),
});

let report = "Registered Commands:\n";

export default class CommandRouter {
  constructor() {
    this.root = {
      token: '',
      children: {},
    };
  }

  add(descriptor) {
    descriptor = Joi.attempt(descriptor, commandSchema, "Error while registering command:\n");

    let node = this.root;
    const command = descriptor.command;

    command.forEach(token => {
      token = token.toLowerCase();

      if (!node.children[token]) {
        node.children[token] = {
          token,
          children: {},
        };
      }

      node = node.children[token];
    });

    if (node.handler) {
      throw new Error("Handler already registered for path '" + descriptor.command + "'");
    }

    node.handler = descriptor.handler;

    report += '\t' + descriptor.command.join(' ') + '\n';

    return this;
  }

  route(message) {
    let node = this.root;

    const command = [];

    message.some(token => {
      token = token.toLowerCase();

      if (!node.children[token]) {
        return true;
      }

      node = node.children[token];
      command.push(token);
    });

    if (!node.handler) {
      return;
    }

    const result = {
      command,
      params: message.slice(command.length),
      handler: node.handler,
    };

    return result;
  }

  report() {
    console.log(report);
  }
}
