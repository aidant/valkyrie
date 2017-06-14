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
    if (title) {
      this.embed.title = title;
    }
    return this;
  }

  description(description) {
    if(description) {
      this.embed.description = description;
    }
    return this;
  }

  url(link) {

    const vLink = Joi.validate(link, Joi.string().uri(), function (err, value) {
        if (err) {
          console.log(err);
          return false;
        } else {
          return value;
        }
      });

    if (vLink) {
    this.embed.url = vLink;
    }

    return this;
  }

  timestamp() {
    this.embed.timestamp = new Date();
    return this;
  }

  color(color) { //Needs work
    if (color) {
      this.embed.color = color
    }
    return this;
  }

  footer(text, icon_url) {
    this.embed.footer = {};
    const schema = Joi.string().uri()

    if (text) {
      this.embed.footer.text = text;
    } else {
      this.embed.footer.text = settings.footer;
    }

    if (icon_url) {
      this.embed.footer.icon_url = icon_url;
    }

    return this;
  }

  author(name, url, icon_url) {
    this.embed.author = {};

    if (name) {
      this.embed.author.name = name;
    }

      this.embed.author.url = url;
      this.embed.author.icon_url = icon_url;

    return this;
  }

  fields(name, value) {
    if (name && value) {
      this.embed.fields.push({name, value: String(value), inline: false});
    }
    return this;
  }

  image(url) {

    this.embed.image = {};
    this.embed.image.url = url;
    return this

  }

  thumbnail(url) {

    this.embed.thumbnail = {};
    this.embed.thumbnail.url = url;
    return this

  }

  attach(attachment, name) {
    this.files.push({ attachment, name })
    return this
  }

  send(inline) {
    let fields = this.embed.fields;

    if(inline != false && (fields.length % 2 == 0 || fields.length % 3 == 0)) {
      for (var i = fields.length - 1; i >= 0; i--) {
        fields[i].inline = true;
      }
    }
    return this.message.channel.send('', { embed: this.embed, files: this.files });
  }

  sendHook(inline) {
    let fields = this.embed.fields;

    if(inline != false && (fields.length % 2 == 0 || fields.length % 3 == 0)) {
      for (var i = fields.length - 1; i >= 0; i--) {
        fields[i].inline = true;
      }
    }
    return this.message.send('', { embeds: [this.embed], files: this.files });
  }

}
