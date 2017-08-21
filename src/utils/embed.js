import Joi from 'joi';
import settings from '../../config/env';

export default class Embed {
  constructor(message) {
    this.message = message;
    this.embed = {};
    this.embed.fields = [];
    this.files = [];
  }

  title(title){
    if (Joi.validate(toStr(title), Joi.string()).error != null) return this;
    this.embed.title = val;
    return this;
  }

  description(description) {
    if (Joi.validate(toStr(description), Joi.string()).error != null) return this;
    this.embed.description = description;
    return this;
  }

  url(link) {
    if (Joi.validate(link, Joi.string().uri()).error != null) return this;
    this.embed.url = link;
    return this;
  }

  timestamp() {
    this.embed.timestamp = new Date();
    return this;
  }

  color(color) {
    if (!color) return this;
    if (Joi.validate(color, Joi.string().regex(/^#?[0-9A-Fa-f]{6}$/)).error === null) {
      this.embed.color = parseInt(color.replace('#', ''), 16);
      return this
    }
    if (Joi.validate(color, Joi.number().min(0).max(16777215)).error === null) {
      this.embed.color = color
      return this
    }

    return this;
  }

  footer(text, icon_url) {
    this.embed.footer = this.embed.footer || {};
    this.embed.footer.text = Joi.validate(toStr(text), Joi.string()).error === null ? text : settings.footer;
    this.embed.footer.icon_url = Joi.validate(icon_url, Joi.string().uri()).error === null ? icon_url : '';
    return this;
  }

  author(name, url, icon_url, hidden) {
    this.embed.author = this.embed.author || {};
    this.embed.author.name = Joi.validate(toStr(name), Joi.string()).error === null ? name : '';
    this.embed.author.icon_url = Joi.validate(icon_url, Joi.string().uri()).error === null ? icon_url : '';
    if (!hidden) {
      this.embed.author.url = Joi.validate(url, Joi.string().uri()).error === null ? url : '';
    }
    return this;
  }

  fields(name, value) {
    if (name && value) {
      this.embed.fields.push({name, value: String(value), inline: false});
    }
    return this;
  }

  image(url) {
    url = url || 'attachment://unknown.png';
    this.embed.image = {};
    this.embed.image.url = Joi.validate(url, Joi.string().uri()).error === null ? url : '';
    return this;
  }

  thumbnail(url) {
    url = url || 'attachment://unknown.png';
    this.embed.thumbnail = {};
    this.embed.thumbnail.url = Joi.validate(url, Joi.string().uri()).error === null ? url : '';
    return this;
  }

  attach(attachment, name) {
    name = name || 'unknown.png';
    name = Joi.validate(toStr(name), Joi.string()).error === null ? name : 'unknown.png';
    this.files.push({ attachment, name })
    return this
  }

  send(inline) {
    let fields = this.embed.fields;

    if((inline != false && (fields.length % 2 == 0 || fields.length % 3 == 0)) || inline === true) {
      for (var i = fields.length - 1; i >= 0; i--) {
        fields[i].inline = true;
      }
    }
    this.message.channel.send('', { embed: this.embed, files: this.files })
      .catch(e => {
        this.message.channel.send(`A wild error has occurred. This is most likely due to limited permissions.`)
      });
    return this;
  }

  sendHook(inline) {
    let fields = this.embed.fields;

    if((inline != false && (fields.length % 2 == 0 || fields.length % 3 == 0)) || inline === true) {
      for (var i = fields.length - 1; i >= 0; i--) {
        fields[i].inline = true;
      }
    }
    return this.message.send('', { embeds: [this.embed], files: this.files });
  }

}

function toStr(value) {
  if (value === undefined) return undefined;
  return String(value)
}
