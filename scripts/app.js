//responsible for bringing ui and chat data and running application//this file joins everyting together

//* dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');  //form class
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

//todo: adding a new chat
newChatForm.addEventListener('submit',e=>{
    e.preventDefault(); //avoid default behaviour of refreshing page when submitted
    chatroom.playSound();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(()=> newChatForm.reset())
        .catch(err=>console.log(err));
    //    console.log(e.target.children[0].children[2].children[0]); send button
    const send = e.target.children[0].children[2].children[0];
    send.style.transform = "rotate(360deg)";
    setTimeout(() => {
        send.style.transform = "";
    }, 300); 


});

// update username
newNameForm.addEventListener('submit',e=>{
    chatroom.playSound();
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    console.log(newName);
    chatroom.updateName(newName);
    newNameForm.reset();
    //show then hide update message
    
    console.log(document.body.scrollHeight);
    updateMsg.innerText = `Your name was updated to ${newName}`; 
    updateMsg.classList.add('d-block');
    setTimeout(() => updateMsg.setAttribute('class','update-msg alert alert-success d-none'), 3000);

    window.scrollTo({
        top: document.body.scrollHeight,
        // left: 100,
        behavior: 'smooth'
      });

});

//Delete the selected chat
chatList.addEventListener('click',(e)=>{
    
    if(e.target.getAttribute('class') ==='bi bi-trash-fill'){
        console.log(e.target.tagName);
        const id = e.target.parentElement.parentElement.getAttribute('data-id');
        chatroom.deleteChats(id);
        chatUI.deleteList(id);
        chatroom.playSound();   
    }
    //experiencing problem when clicked in path icon inside svg so added below:
    if(e.target.getAttribute('class') =='path-icon'){
        console.log(e.target.tagName);
        const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    chatroom.deleteChats(id);
    chatUI.deleteList(id);
    chatroom.playSound();
    }
});


// update the chat room
rooms.addEventListener('click',e=>{
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat =>chatUI.render(chat.data(),chat.id));
        chatroom.playSound();
    }
});

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'guest_user';                //if there is username in localstorage, it is truthy

//*class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general',username);
//get the chat and render

chatroom.getChats(data=>chatUI.render(data.data(),data.id)).then(()=> setTimeout(() => {  //data is single object...everytime we get change we fire callback get single object and render()
    window.scrollTo({
        top: document.body.scrollHeight,
        // left: 100,
        behavior: 'smooth'
      })
}, 1000));




