import { Component } from '@angular/core';
import {ChatService} from './services/chat.service'
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:8084';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-frontend';
  channel=false
  showSpinner=false
  username:string
  privateName:string

  conversations: any
  selectedConversation: any
  Msg: string
  memberList=[]
  messages=[]
  memberMsgRecord={}
  constructor(
    private chatService: ChatService,

  ) { }

  ngOnInit(): void {
    this.chatService.getMemberValue().subscribe((value:string[]) => {
      if (value!=undefined){
        console.log(value)
        this.memberList=[]
        value.forEach(element => {
          if (element!=this.username){
            this.memberList.push(element)
          }
        });
      }
    })

    this.chatService.getMemberMsg().subscribe((msg) => {
      if (msg!=undefined&&msg["receiver"]==this.username){
        if (this.memberMsgRecord[msg["sender"]]==undefined){
          this.memberMsgRecord[msg["sender"]]=new Array(msg)
        }else{
          this.memberMsgRecord[msg["sender"]].push(msg)
        }
      }
    })
  }



  startChat(user_name){
    this.selectedConversation=true

    if (this.privateName!=undefined&& this.memberMsgRecord[this.privateName]!=undefined){
      this.memberMsgRecord[this.privateName]=this.messages;
    }

    this.privateName=user_name.selectedOptions.selected.map(item => item.value)[0];

    if (this.memberMsgRecord[this.privateName]==undefined){
      this.memberMsgRecord[this.privateName]=[];
    }

    this.messages=this.memberMsgRecord[this.privateName];
  }

  sendMsg(){
    var params={
      "receiver":this.privateName,
      "sender":this.username,
      "message":this.Msg
    }
    this.memberMsgRecord[this.privateName].push(params)
    this.chatService.sendPrivateMsg(params)
  }

  login(){
    this.channel=true
    this.chatService.setupSocketConnection(this.username)
  }

}
