import moment from 'moment';

// Humanizes secconds up to hours

export default function (time, zero) {

  if(!time && zero === true) return '0 Seconds'
  if(!time) return
  if(time === 0 && zero == true) return '0 Seconds'
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
