const AUTH_KEY = 'bachelore_auth'
const EVENT = 'bachelore_auth_change'

export function isAuthed(){
  try{ return !!localStorage.getItem(AUTH_KEY) }catch(e){ return false }
}

export function login(){
  try{ localStorage.setItem(AUTH_KEY, '1') }catch(e){}
  try{ window.dispatchEvent(new Event(EVENT)) }catch(e){}
}

export function logout(){
  try{ localStorage.removeItem(AUTH_KEY) }catch(e){}
  try{ window.dispatchEvent(new Event(EVENT)) }catch(e){}
}

export function onAuthChange(cb){
  window.addEventListener('storage', cb)
  window.addEventListener(EVENT, cb)
}

export function offAuthChange(cb){
  window.removeEventListener('storage', cb)
  window.removeEventListener(EVENT, cb)
}
