export default function(accountTag, hidden) {
    if(hidden === true && accountTag) {
      return `${accountTag.split('#')[0]}#${accountTag.split('#')[1].replace(/[0-9]/g, '-')}`
    } else {
      return accountTag;
    }
}
