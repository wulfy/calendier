export function displayForm(title,start,end,id,text,login,message,free)
{
  return {
    type: 'DISPLAY_FORM',
    title:title,
    start:start,
    end:end,
    id:id,
    text:text,
    login:login,
    message:message,
    free:free
  }
}

export function hideForm()
{
  return {
    type: 'HIDE_FORM'
  }
}
