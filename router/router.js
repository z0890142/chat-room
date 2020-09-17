const express=require('express');
const router=express.Router();
const path=require('path');
const dirRoot = path.dirname(__dirname);
// const User=require(path.join(dirRoot,'controller','User.js'));
const Chat=require(path.join(dirRoot,'controller','Chat.js'));



// router.post('/register/user',User.Register);
 router.get('/user/list',Chat.UserList);

module.exports=router;
