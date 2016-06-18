export function displayForm(title,start,end,eventId,text,login,calendarparams,free)
{
  return {
    type: 'DISPLAY_FORM',
    title:title,
    start:start,
    end:end,
    eventId:eventId,
    text:text,
    login:login,
    calendarparams:calendarparams,
    free:free
  }
}

export function hideForm()
{
  return {
    type: 'HIDE_FORM'
  }
}
