const apiUrl = 'https://arabface.online/api/89129812'

class Arabcall {
  constructor() {
    this.init();
  }

  init = () => {

  }
  loginMethod = (email, password) => {
    let url = `${apiUrl}/login?username=${email}&password=${password}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    return fetch(url, {
      method: 'post',
      headers: headers,
    })
  }

  registerMethod = (fname, lname, email, password) => {
    let url = `${apiUrl}/signup?firstname=${fname}&lastname=${lname}&username=${fname + lname}&email_address=${email}&password=${password}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'post',
      headers: headers,
    })
  }

  chatListMethod = (uid) => {
    let url = `${apiUrl}/chat/conversations?userid=${uid}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'get',
      headers: headers,
    })
  }
  contactListMethod = (uid) => {
    let url = `${apiUrl}/profile/friends?userid=${uid}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'get',
      headers: headers,
    })
  }

  getChatSettingsMethod = (uid) => {
    let url = `${apiUrl}/settings/chat/chat_settings?userid=${uid}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'get',
      headers: headers,
    })
  }

  postChatSettingsMethod = (uid, opt1, opt2) => {
    let url = `${apiUrl}/settings/chat/change/chat_settings?userid=${uid}&last_seen_status=${opt1}&read_receipt_status=${opt2}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'post',
      headers: headers,
    })
  }

  getBlockedListMethod = (uid) => {
    let url = `${apiUrl}/all/blocked?userid=${uid}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'get',
      headers: headers,
    })
  }

  unblockUserMethod = (uid, id) => {
    let url = `${apiUrl}/unblock/user?userid=${uid}&id=${id}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'post',
      headers: headers,
    })
  }

  blockUserMethod = (uid, id) => {
    let url = `${apiUrl}/block/user?userid=${uid}&id=${id}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'post',
      headers: headers,
    })
  }

  clearConversation = (uid, cid) => {
    let url = `${apiUrl}/chat/delete/messages?userid=${uid}&cid=${cid}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'get',
      headers: headers,
    })
  }

  reportConversation = (uid, cid) => {
    let url = `${apiUrl}/chat/report/messages?userid=${uid}&cid=${cid}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'post',
      headers: headers,
    })
  }

  getSpecificChatMethod = (uid, cid) => {
    let url = `${apiUrl}/chat/get/chat_messages?theuserid=${uid}&cid=${cid}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'get',
      headers: headers,
    })
  }
  sendMessage = (data) => {
    let url = `${apiUrl}/chat/send/message2`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'post',
      headers: headers,
      body: data
    })

  }
  createNewGroup = (title, name, description) => {
    let url = `${apiUrl}/group/create?title=${title}&name=${name}&description=${description}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'post',
      headers: headers,
    })
  }
  
  getAccountInfoMethod = (uid) => {
    let url = `${apiUrl}/profile/details?userid=${uid}`
    console.log(url);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return fetch(url, {
      method: 'get',
      headers: headers,
    })
  }
}

Arabcall.shared = new Arabcall();
export default Arabcall;
