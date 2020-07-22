//responsible for getting the chats and data together

/*CHATROOM CLASS:
//todo:  adding new chat documents
//todo:  setting up a real-time listener to get new chats
//todo:  updating the username
//todo:  updating the room
*/

class Chatroom {
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub; //unsubscribing change assigned to real time listener
    }
    async addChat(message){
        //format a chat object
        const now = new Date();  //access when the user has submitted
        const chat = {
            message,// message: message,
            username: this.username,
            room:this.room,
            created_at:firebase.firestore.Timestamp.fromDate(now)   //converting current time date to firebase format 
        };

        //save the chat documents to db
        const response = await this.chats.add(chat);
        return response;    //we also can return 'this' here....
    }
    //setting real time listener which listends to change
    async getChats(callback){
        this.unsub = this.chats
        .where('room','==',this.room)    //where a certain condition is true  //!we dont use triple equals in firestore   //only get data of particular room
        .orderBy('created_at')  //order data by time order  //shows error at first, just click link in error and create index, now error solved and ordered
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change => {
                if(change.type==='added'){
                    // update th ui
                    
                    callback(change.doc);
                    this.playSound();
                }
                // else if(change.type==='removed'){
                //     // callback(change.doc);
                // }
            })
        });
    }

    //delete chats
    async deleteChats(id){
        this.chats.doc(id).delete().then(()=>console.log('chats deleted')).catch(err=>console.log(err));
    }

    //updates names
    updateName(username){
        this.username = username;   //updating the username
        localStorage.setItem('username',username);
    }

    // update chat room
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){ // only listen if this.unsub has a value
            this.unsub();  //!unsubscribe from changes to the old room       // and no longer listens to previous unchanged room
                                                                            //now inside unsub() this.room is set to updated one
                                                                             //!when i call updateRoom() it no longer listens to previous unchanged room
        }
    }

    
    playSound(){
        
        //console.log('The keycode of key '+event.key+' is '+event.keyCode);
         const audioList = document.querySelectorAll('audio');
         
    
         const audio = document.querySelector(`audio[data-key = "${Math.round(Math.random() * 8)}"]`);
       
         audio.currentTime = 0  //rewind to the start so when played over again it wont wait audio to finish
         audio.play();
          
         }
         //if(!audio) return;  //stop the function from running all together
         
}



// !we do below stuffs in app.js class
//* const chatroom = new Chatroom('general','shaun');
// console.log(chatroom);
// chatroom.addChat('hello everyone')
//     .then(()=> console.log('chat added'))
//     .catch(err=>console.log(err));

//here room is still old one, so it wont show if we have unsub from change
//*chatroom.getChats(data=>console.log(data)); //it still listens to initial room before update, so we unsubscribe from those  (as it listens to real time, after updating the room changed, so it couldnt match condition so dont shows)

 //chatroom.updateRoom('gaming');     //when we update we dont want to listen to initial document
 
//chatroom.getChats(data=>console.log('updated',data));  //getChats sets up a new listener now to the current room
/*
setTimeout(() => {
    chatroom.updateRoom('gaming');
    chatroom.updateName('yoshi');
    chatroom.getChats((data)=>{     //sets up a new listener here
        console.log(data);
    });
    chatroom.addChat('hello world, how are you?');
}, 3000);
*/







