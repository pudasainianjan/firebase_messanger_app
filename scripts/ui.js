//responsible for all ui

//todo: 1. render chat templates to the DOM
//todo: 2. clear the list of chats (when the room changes)

class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){    //take the list and clear list
        this.list.innerHTML = '';
    }
    render(data,id){  //responsible for creating an html snippet for each chat document and render to dom
        const when = dateFns.distanceInWords(
            data.created_at.toDate(),
           new Date(),
            { addSuffix:false }
        );

        const html = `
        <li class="list-group-item" data-id = ${id}>
            <span class="username">${data.username}</span>
            <span class="message" id="allMessages">${data.message}</span>
            <div class="time">${when} ago</div>
            <div class="trash-icon">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path class="path-icon" fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
            </div>
        </li>
        
        
        `;

        this.list.innerHTML += html;

        this.list.style.opacity = '1';
        this.list.style.width = '100%';
        this.list.style.background = 'white';
        

    }
    deleteList(id){
        const allLists = document.querySelectorAll('li');
        allLists.forEach(list=>{
            if(list.getAttribute('data-id')===id){
                list.remove();
            }
        })
    }
}