module.exports={
    //database:'mongodb://admin:Ecg1609c@140.138.154.32:27017/lab'
    database:'mongodb://admin:Ecg1609c@127.0.0.1/chat'
}

db.createUser({
    user:"admin",
    pwd:"Ecg16@9c",
    roles:[{role:"readWrite",db:"chat"}]
})