import Canvas from 'canvas';
import fs from 'fs';
import request from 'request';
import path from 'path';
import { valHeroes } from './validation';
import Joi from 'joi';

export default function (border, star, hero, callback) {
  if(!border) return;
  let files = {};

  if(Joi.validate(hero, valHeroes()).error != null) {
    hero = 'none'
  }

  files.border = border.split('/')
  files.border = files.border[files.border.length - 1]
  files.new = `${files.border.split('_')[0]}_${hero}.png`

  if(fs.existsSync(path.join(__dirname, '..', 'img', files.new))){
    callback(files.new);
    return;
  }

  request(border).pipe(fs.createWriteStream(path.join(__dirname, '..', 'img', files.border)))
  .on('close', function() {
    if(star) {
      files.star = star.split('/')
      files.star = files.star[files.star.length - 1]
      request(star).pipe(fs.createWriteStream(path.join(__dirname, '..', 'img', files.star)))
      .on('close', function(){

        let Image = Canvas.Image
        let canvas = new Canvas(256, 256)
        let ctx = canvas.getContext('2d')

        let img = new Image()
        img.src = fs.readFileSync(path.join(__dirname, '..', 'img', 'background.png'))
        ctx.drawImage(img, 0, 0, img.width, img.height)

        img = new Image()
        img.src = fs.readFileSync(path.join(__dirname, '..', 'img', files.border))
        ctx.drawImage(img, 0, 0, img.width, img.height)

        img = new Image()
        img.src = fs.readFileSync(path.join(__dirname, '..', 'img', files.star))
        ctx.drawImage(img, 0, 128, img.width, img.height)

        img = new Image()
        img.src = fs.readFileSync(path.join(__dirname, '..', 'img', 'heroes', `${hero}.png`))
        ctx.drawImage(img, -8, -20, img.width / 2, img.height / 2)

        canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, '..', 'img', files.new)))
        .on('close', function() {callback(files.new)})
      })
    } else {

    let Image = Canvas.Image
    let canvas = new Canvas(256, 256)
    let ctx = canvas.getContext('2d')

    let img = new Image()
    img.src = fs.readFileSync(path.join(__dirname, '..', 'img', 'background.png'))
    ctx.drawImage(img, 0, 0, img.width, img.height)

    img = new Image()
    img.src = fs.readFileSync(path.join(__dirname, '..', 'img', files.border))
    ctx.drawImage(img, 0, 0, img.width, img.height)

    img = new Image()
    img.src = fs.readFileSync(path.join(__dirname, '..', 'img', 'heroes', `${hero}.png`))
    ctx.drawImage(img, -8, -20, img.width / 2, img.height / 2)

    canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, '..', 'img', files.new)))
    .on('close', function() {callback(files.new)})
    }
  })
}
