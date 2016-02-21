import request from 'axios';



export function BookDate(date) {

  return {
    type: 'BOOK_DATE_COMMAND',
    promise: request.get(url+date),
    date: Date.now()
  }
}

/*export function getDevicesStatus() {
  return {
    type: 'REQUEST_STATUS',
    promise: request.get(REQUEST_STATUS_URL),
    date: Date.now()
  }
}*/