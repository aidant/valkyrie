export default class CommandRouter {
  constructor() {
    this.root = {
      token: '',
      children: {},
    };
  }

  add(descriptor) {
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

    node.handler = descriptor.handler;

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

    return {
      command,
      params: message.slice(command.length),
      handler: node.handler,
    }
  }
}
