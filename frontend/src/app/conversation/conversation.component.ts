import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:8084';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})


export class ConversationComponent implements OnInit {
  socket;
  channel=false
  constructor() { }

  ngOnInit(): void {
    this.setupSocketConnection()
  }

  conversations: any
  selectedConversation: any
  Msg: string
  memberList=[ "user1","user2"]
  currentUser={
    "me":{
      "id":2
    }
  }
 
  messages=[
    {
      "user":{
        "id":1
      },
      "text":"test1"
    },{
      "user":{
        "id":1
      },
      "text":"test2"
    },{
      "user":{
        "id":1
      },
      "text":"test3"
    },{
      "user":{
        "id":2
      },
      "text":"test2"
    },{
      "user":{
        "id":2
      },
      "text":"test3"
    }

  ]

  startChat(user_name){
    this.selectedConversation=true
    console.log(user_name.selectedOptions.selected.map(item => item.value))
  }

  sendMsg(){
    console.log(this.Msg)
  }

  setupSocketConnection(){
    this.socket=io(SOCKET_ENDPOINT)
    this.socket.emit('online',1)
    console.log("connect")
  }
}
