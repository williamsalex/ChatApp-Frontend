import React, { Component } from 'react';
import './Stylesheet.scss';
import { channels } from '../shared/constants';
import Header from '../components/Header'
import ChatroomSelector from '../components/ChatroomSelector'
import OpenChatroom from '../components/OpenChatroom'
import ProfileEditor from '../components/ProfileEditor'
import Footer from '../components/Footer'
import Auth from '../components/Auth'
import { ActionCableConsumer } from 'react-actioncable-provider'
import NewRoom from '../components/NewRoom'
const { ipcRenderer } = window.require('electron');

const defaultState = {
  appName: '',
  appVersion: '',
  currentRoom: {name:'welcome!',id:0},
  currentRoomUsers: [],
  chatrooms: [],
  currentUser: {id: 0, username: 'alex', icon: 'green'},
  currentRoomMessages: [],
  username: '',
  password: '',
  confirm: '',
  loggedIn: false,
  value: '',
  friend: '',
  createRoom: false,
  roomName: ''
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      this.setState({ appName, appVersion });
    });
  }

  form = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submit = () => {
    if ((this.state.password.length > 3) && (this.state.password === this.state.confirm)) {
      fetch(`http://localhost:3001/users`,{
      method: 'POST',
      headers: {
        'content-type':'application/json',
        'accepts':'application/json'
      },
      body:JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
      }).then(
          resp => resp.json()
      )
      .then( data =>
          this.setState(
            {
              currentUser: data
            })
      ).then(this.setState({ loggedIn: true, chatrooms: [{id: 1, name: 'flatiron'}] }))
      .then(
        this.getBasicData())
    }
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmission = (e) => {
    e.preventDefault()
    this.createMessage()
    this.setState({
      value: ''
    })
  }

  createMessage = () => {
    let message = {content: this.state.value, user_id: this.state.currentUser.id}
    fetch(`http://localhost:3001/chatrooms/${this.state.currentRoom.id}`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(message)
    })
  }

  submitHandler = () => {
    if (this.state.password.length > 3) {
      fetch(`http://localhost:3001/users/${this.state.currentUser.id}`,{
      method: 'POST',
      headers: {
        'content-type':'application/json',
        'accepts':'application/json'
      },
      body:JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
      }).then(
          resp => resp.json()
      )
      .then( data =>
          this.setState(
            {
              currentUser: data
      })).then(this.getBasicData())
    }
  }

  changeRoom = (e) => {
    let room = this.state.chatrooms.find(element => element.name === e.target.innerText)
    this.setState({
      currentRoom: room
    }, () => this.grabData())
  }

  getBasicData = () => {
    if (this.state.currentUser.id !== 0){
      fetch(`http://localhost:3001/connections/${this.state.currentUser.id}/`,{
        method: 'GET',
        headers: {
          'content-type':'application/json',
          'accepts':'application/json'
        }
      }).then(
          resp => resp.json()
      )
      .then( data =>
          this.setState(
            {
              chatrooms: data
            })
      )
    }
  }

  reception = (obj) => {
    let lst = this.state.currentRoomMessages
    lst.push(obj["messages"])
    this.setState({
      currentRoomMessages: lst,
      value: ''
    })
  }

  grabData = () => {
    fetch(`http://localhost:3001/chatrooms/${this.state.currentRoom.id}/`,{
      method: 'GET',
      headers: {
        'content-type':'application/json',
        'accepts':'application/json'
      }
    }).then(
        resp => resp.json()
    )
    .then( data =>
        this.setState(
          {
            currentRoomMessages: data["messages"],
            currentRoomUsers: data["users"]
          })
    )
  }

  openCreate = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3001/chatrooms`,{
      method: 'POST',
      headers: {
        'content-type':'application/json',
        'accepts':'application/json'
      },
      body: JSON.stringify({
        roomName: this.state.roomName,
        user_id: this.state.currentUser.id
      })
    }).then(
      this.setState({
        roomName: '',
        createRoom: false
      })
    ).then(
      this.getBasicData()
    )
  }

  openAdd = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3001/connections/`,{
      method: 'POST',
      headers: {
        'content-type':'application/json',
        'accepts':'application/json'
      },
      body: JSON.stringify({
        room: this.state.currentRoom.id,
        username: this.state.friend
      })
    }).then(
    this.setState({
      friend: ''
    }))
    this.grabData()
  }

  changing = (e) => {
    this.setState({
      friend: e.target.value
    })
  }

  press = () => {
    this.setState({
      createRoom: !this.state.createRoom
    })
  }

  logOut = () => {
    this.setState(defaultState)
  }

  render() {
    return (
      <div className="App">
          <ActionCableConsumer channel={{channel: 'ChatroomsChannel', id: this.state.currentRoom.id}} onReceived = { this.reception }/>
          <Auth loggedIn = {this.state.loggedIn} logIn = {this.form} submit = {this.submit}/>
          <NewRoom createRoom = {this.state.createRoom} logIn = {this.form} submit = {this.openCreate}/>
          <Header currentRoom = {this.state.currentRoom}/>
          <div className='container'>
            <span className='column'><ChatroomSelector press = {this.press} changeRoom = {this.changeRoom} currentRoom = {this.state.currentRoom} rooms={this.state.chatrooms}/></span>
            <span className='column'><OpenChatroom currRoom = {this.state.currentRoom} loggd = {this.state.loggedIn} value = {this.state.value} handleSubmission = {this.handleSubmission} onChange = {this.onChange} users = {this.state.currentRoomUsers} currentUser = {this.state.currentUser} messages={this.state.currentRoomMessages}/></span>
            <span className='column'><ProfileEditor logOut = {this.logOut} friend = {this.state.friend} changing = {this.changing} openAdd = {this.openAdd} users = {this.state.currentRoomUsers} changeData = {this.form} username = {this.state.username} handleSubmit={this.submitHandler}/></span>
          </div>
          <Footer />
      </div>
    )
  }
}
