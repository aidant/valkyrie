import Canvas from 'canvas';
import fs from 'fs';
import request from 'request';
import path from 'path';
import Joi from 'joi';

export default async function (border, star, hero, rank) {
  if (!border) return null;
  rank = Joi.validate(rank, Joi.string().uri()).error === null ? rank : null;

  let files = {};
  files.new = path.join(__dirname, '..', 'img', `${path.parse(border).name.split('_')[0]}_${hero}_${rank ? path.parse(rank).name : null}.png`);
  if (fs.existsSync(files.new)) return files.new;
  [files.border, files.star, files.rank] = await Promise.all([getImage(border), getImage(star), getImage(rank)]);

  let Image = Canvas.Image
  let canvas = new Canvas(256, 256)
  let ctx = canvas.getContext('2d')

  let img = new Image()
  img.src = fs.readFileSync(path.join(__dirname, '..', 'img', 'background.png'))
  ctx.drawImage(img, 0, 0, img.width, img.height)

  img = new Image()
  img.src = fs.readFileSync(files.border)
  ctx.drawImage(img, 0, 0, img.width, img.height)

  if (files.star) {
    img = new Image()
    img.src = fs.readFileSync(files.star)
    ctx.drawImage(img, 0, 128, img.width, img.height)
  }

  img = new Image()
  img.src = fs.readFileSync(path.join(__dirname, '..', 'img', 'heroes', `${hero}.png`))
  ctx.drawImage(img, -8, -20, img.width / 2, img.height / 2)

  if (files.rank) {
    img = new Image()
    img.src = fs.readFileSync(files.rank)
    ctx.drawImage(img, 256 / 2 - (img.width * 0.25 / 2), 155, img.width * 0.25, img.height * 0.25)
  }

  return saveImage(canvas, files.new);

}

function getImage(url) {
  return new Promise((resolve, reject) => {

    if (!url || Joi.validate(url, Joi.string().uri()).error != null) {
      resolve(null);
      return;
    }
    
    const file = path.join(__dirname, '..', 'img', path.parse(url).base);
    if (fs.existsSync(file)) {
      resolve(file);
      return;
    }

    request(url).pipe(fs.createWriteStream(file))
      .on('close', () => {
        resolve(file);
      })
      .on('error', e => {
        reject(e);
      })

  })
}

function saveImage(canvas, file) {
  return new Promise((resolve, reject) => {
    canvas.createPNGStream().pipe(fs.createWriteStream(file))
      .on('close', () => {
        resolve(file);
      })
      .on('error', e => {
        reject(e);
      })
  });
}
