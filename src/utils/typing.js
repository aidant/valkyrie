export default function (message) {
  message.channel.i = message.channel.i || 0
  let typing = {}

  typing.start = () => {
    if (message.channel.i <= 0) {
      message.channel.startTyping()
      message.channel.i += 1
    } else {
      message.channel.i += 1
    }
  }

  typing.stop = () => {
    if (message.channel.i > 1) {
      message.channel.i -= 1
    } else {
      message.channel.stopTyping()
      message.channel.i -= 1
    }
  }

  return typing
}
