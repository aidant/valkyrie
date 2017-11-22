import Joi from 'joi'

const commandSchema = Joi.object().keys({
  command: Joi.array().items(Joi.string().required()).required(),
  restrictToServer: Joi.array().items(Joi.string().required()),
  isHidden: Joi.boolean().default(false),
  helpShort: Joi.string(),
  handler: Joi.func(),
  help: Joi.func()
})

let report = 'Registered Commands:\n'

export default class CommandRouter {
  constructor () {
    this.root = {
      name: null,
      path: [],
      children: {}
    }
  }

  add (descriptor) {
    descriptor = Joi.attempt(descriptor, commandSchema, 'Error while registering command:\n')

    let node = this.root
    const command = descriptor.command

    command.forEach(token => {
      token = token.toLowerCase()

      if (!node.children[token]) {
        node.children[token] = {
          name: token,
          path: node.path.concat(token),
          parent: node,
          children: {}
        }
      }

      node = node.children[token]
    })

    if (node.handler) {
      throw new Error("Handler already registered for path '" + descriptor.command + "'")
    }

    report += '\t' + descriptor.command.join(' ') + '\n'

    delete descriptor.command
    Object.assign(node, descriptor)

    return this
  }

  route (message) {
    let node = this.root

    message.some(token => {
      token = token.toLowerCase()

      if (!node.children[token]) {
        return true
      }

      node = node.children[token]
    })

    return Object.assign({}, node)
  }

  report () {
    console.log(report)
  }
}
