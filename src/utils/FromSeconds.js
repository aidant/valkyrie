import moment from 'moment';

export default function (time) {

  if(!time) return
  if(time === 0) return 0

  if(time === 1) {
    return '1 Second'
  }
  if(time < 60) {
    return `${time} Seconds`
  }
  if(time === 60) {
    return '1 Minuite'
  }
  if(time > 60 && time < 3600) {
    return `${moment.duration(time, 'seconds').as('minutes')} Minutes`
  }
  if(time === 3600) {
    return '1 Hour'
  }
  if(time > 3600) {
    return `${moment.duration(time, 'seconds').as('hours')} Hours`
  }
}
