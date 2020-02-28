import React, { Component } from 'react';
import './Stylesheet.scss';
import { channels } from '../shared/constants';
import Header from '../components/Header'
import ChatroomSelector from '../components/ChatroomSelector'
import OpenChatroom from '../components/OpenChatroom'
import ProfileEditor from '../components/ProfileEditor'
import Footer from '../components/Footer'
import Auth from '../components/Auth'
const { ipcRenderer } = window.require('electron');



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appVersion: '',
      currentRoom: {name:'welcome!',id:0},
      currentRoomUsers: [],
      chatrooms: [],
      currentUser: {id: 1, username: 'alex', icon: 'green'},
      currentRoomMessages: [],
      username: '',
      password: '',
      confirm: '',
      loggedIn: false,
      friends: []
    }
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      this.setState({ appName, appVersion });
    });
  }

  componentDidMount(){
    this.getBasicData()
    this.grabData()
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
      ).then(this.setState({ loggedIn: true }))
    }
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
      }))
    }
  }

  changeRoom = (e) => {
    let room = this.state.chatrooms.find(element => element.name === e.target.innerText)
    this.setState({
      currentRoom: room
    }, () => this.grabData())
  }

  getBasicData = () => {
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

  render() {
    return (
      <div className="App">
          <Auth loggedIn = {this.state.loggedIn} logIn = {this.form} submit = {this.submit}/>
          <Header currentRoom = {this.state.currentRoom}/>
          <div class='container'>
            <span className='column'><ChatroomSelector changeRoom = {this.changeRoom} currentRoom = {this.state.currentRoom} rooms={this.state.chatrooms}/></span>
            <span className='column'><OpenChatroom users = {this.state.currentRoomUsers} currentUser = {this.state.currentUser} messages={this.state.currentRoomMessages}/></span>
            <span className='column'><ProfileEditor friends = {this.state.friends} changeData = {this.form} username = {this.state.username} handleSubmit={this.submitHandler}/></span>
          </div>
          <Footer />
      </div>
    )
  }
}
