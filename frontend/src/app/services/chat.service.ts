import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

const SOCKET_ENDPOINT = 'localhost:8084';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private memberDataSubject: BehaviorSubject<any>;
  private memberMsgSubject: BehaviorSubject<any>;
  memberData:any;
  memberMsg:any;
  socket;

  constructor(
    private httpClient: HttpClient
  ) {
    this.memberDataSubject=new BehaviorSubject<any>(this.memberData);
    this.memberMsgSubject=new BehaviorSubject<any>(this.memberMsg);

   }

  getMemberMsg(): Observable<any> {
    return this.memberMsgSubject.asObservable();
  }
  getMemberValue(): Observable<any> {
    return this.memberDataSubject.asObservable();
  }
  setMemberValue(newValue): void {
    this.memberDataSubject.next(newValue);
  }

  setupSocketConnection(username){
    this.socket=io(SOCKET_ENDPOINT);
    this.socket.emit('online',username);

    this.socket.on('getmember',(members)=>{
      this.memberDataSubject.next(members);
    })
    this.getUserList()
    this.socket.on('reply_private_chat',(item)=>{
      console.log('get : ',item)
      this.memberMsgSubject.next(item)
    })
  }

  sendPrivateMsg(msg){
    console.log("emit : ",msg)
    this.socket.emit('private_chat',msg)

  }


  getUserList(){
    this.httpClient.get("http://127.0.0.1:4201/chat/user/list").subscribe((data:any[])=>{
      console.log(data)
      this.memberDataSubject.next(data["data"]);

    })
  }
}
