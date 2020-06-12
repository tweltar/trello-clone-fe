const API_END_POINT = "https://trello-clone-ppm.herokuapp.com";

window.onload = function () {
    this.loadData();
}

function loadData() {
    var list = "";
    fetch(API_END_POINT + "/list")
    .then(respoond => respoond.json())
    .then(json => {        
        json.map(data => {
            list = list + this.createList(data);
        });
        document.querySelector('.content').innerHTML = list + this.addAnotherList();
    }).catch(err => console.log(err));       
}

function createList(listdata) {
    var card = "";
    listdata.cards.map(c => {
        card += this.createCard(c);
    });
    var list = `<div class="list">
    <div class="list-title">
        <input type="text" value="${listdata.title}" onclick="showlistTitle(${listdata.id})">
        <div class="titleList${listdata.id}">
            <input type="text" value="${listdata.title}" class="updateListTitle${listdata.id}">
            <a href="#" onclick="updateList(${listdata.id})">Save</a>
            <i class="fas fa-plus" onclick="closeListTitle(${listdata.id})"></i>
        </div>
        <a href="#" onclick="showListMenu(${listdata.id})"><i class="fas fa-ellipsis-h"></i></a>
    </div>
    <div class="cards">${card}
        <div class="new-card id${listdata.id}">
            <textarea class="add_card${listdata.id}" type="text" placeholder="Enter a title for this card..."></textarea>
            <div>
                <a href="#" onclick="newCard(${listdata.id})">Add Card</a>
                <i class="fas fa-plus" onclick="closeAddCard(${listdata.id});event.stopPropagation()"></i>
            </div>
        </div>
    </div>
    <div class="footer footerid${listdata.id}">
        <div class="add-another" onclick="displayAddCard(${listdata.id})">
            <i class="fas fa-plus" style="margin: 0px 5px;"></i>
            <p>Add another card</p>
        </div>
        <i class="far fa-window-restore template" style="cursor: pointer;"></i>
    </div>
    <div class="update-List updateList${listdata.id}">
        <div class="p-div">
            <p>List Actions</p>
            <i class="fas fa-plus" onclick="closeListMenu(${listdata.id});event.stopPropagation()"></i>
        </div>
        <div class="list-separator"></div>
        <a href="#" onclick="displayAddCard(${listdata.id})">Add Card...</a>
        <a href="#">Copy List...</a>
        <a href="#">Move List...</a>
        <a href="#">Watch</a>
        <div class="list-separator"></div>
        <a href="#">Sort By...</a>
        <div class="list-separator"></div>
        <a href="#">Move All Cards in This List...</a>
        <a href="#">Archive All Cards in This List...</a>
        <div class="list-separator"></div>
        <a href="#" onclick="deleteList(${listdata.id})">Archive This List...</a>
    </div>
    </div>`;     
    return list;
}

function createCard(carddata) {
    var label = "";
    var card_details = "";
    carddata.labels.map(l => {
        label += `<div class="label-div" style="background-color: ${l.color};"></div>`;
    })    

    if (carddata.description !== "") {
        card_details += `<div><i class="fas fa-align-justify"></i></div>`;
    }
    if (carddata.checklists.length !== 0) {
        card_details += '<div><i class="far fa-check-square"></i></div>';
    }

    var card = `<div class="card-container"><div class="card card${carddata.id}" onclick="clickCard(${carddata.id})">
        <div class="label-bar">${label}</div>
        <p>${carddata.title}</p>
        <div class="card-details">${card_details}</div>
    </div>
    <a href="#" onclick="cardEditor('${carddata.id}', '${carddata.title}')"><i class="far fa-edit"></i></a>
    </div>`;    
    return card;
}

function addAnotherList() {
    var addlist = `<div class="last-list" onclick="displayAddList()">
            <div class="add-another">
                <i class="fas fa-plus" style="margin: 0px 5px;"></i>
                <p>Add another list</p>
            </div>
            <div class="new-list">
                <input type="text" placeholder="Enter list title..." id="list-title">
                <div>
                    <a href="#" onclick="newList()">Add List</a>
                    <i class="fas fa-plus" onclick="closeAddList();event.stopPropagation()"></i>
                </div>
            </div>
        </div>`;
    return addlist;
}

function showlistTitle(id) {
    document.querySelector('.titleList' + id).style.display = 'flex';
}

function closeListTitle(id) {
    document.querySelector('.titleList' + id).style.display = 'none';
}

function displayAddCard(id) {
    document.querySelector('.id'+id).style.display = 'flex';
    document.querySelector('.footerid'+id).style.display = 'none';
    document.querySelector('.updateList'+id).style.display = 'none';
}

function closeAddCard(id) {
    document.querySelector('.id'+id).style.display = 'none';
    document.querySelector('.footerid'+id).style.display = 'flex';
}

function displayAddList() {
    document.querySelector('.new-list').style.display = 'flex';
}

// event.stopPropagation() // to stop event bubblinng
function closeAddList() {
    document.querySelector('.new-list').style.display = 'none';
}

function cardEditor(id, title) {
    var card = document.querySelector('.card'+id);
    var top = card.getBoundingClientRect().top;
    var left = card.getBoundingClientRect().left;

    var editor = `<div class="card-editor-modal">
    <div class="card-editor" style="top: ${top}px; left: ${left}px;">
    <div class="card-editor-col1">
        <textarea>${title}</textarea>
        <div>
            <a href="#" onclick="updateCard(${id})">Save</a>
            <i class="fas fa-plus closeCardEdit"></i>
        </div>
    </div>
    <div class="card-editor-col2">
        <a href="#"><i class="fas fa-tag"></i>Edit Labels</a>
        <a href="#"><i class="far fa-user card-option-icon"></i>Change Members</a>
        <a href="#"><i class="fas fa-arrow-right card-option-icon"></i>Move</a>
        <a href="#"><i class="far fa-copy card-option-icon"></i>Copy</a>
        <a href="#"><i class="far fa-clock card-option-icon"></i>Change Due Date</a>
        <a href="#" onclick="deleteCard(${id})"><i class="fas fa-archive card-option-icon"></i>Archive</a>
    </div>
    </div>
    </div>`;

    document.querySelector('.content').insertAdjacentHTML('beforeend',editor);
    document.querySelector('.card-editor-modal').style.display = 'flex';
    document.querySelector('.card-editor').style.display = 'flex';

    document.querySelector('.closeCardEdit').addEventListener('click', () => {        
        document.querySelector('.card-editor-modal').remove();
    })
}

function clickCard(id) {
    var card = fetch(API_END_POINT + '/card/' + id)
    .then(response => response.json())
    .then(data => {
        this.showCard(data);
    });
}

function showCard(data) {
    var showCard = `<div class="card-bg">
    <div class="card-popup">
        <div class="card-header">
            <i class="far fa-credit-card card-icon"></i>
            <div class="card-title-bar">
                <input type="text" class="card-title" value="${data.title}">
                <p style="font-size: small; margin-left: 5px;">in list <a href="#" style="text-decoration: underline; font-size: small;">${data.list.title}</a></p>
            </div>
        </div>
        <div class="card-row">
            <div class="card-col">
                <div class="addtoCard">
                    ${hasMembers(data)}
                    ${hasLabels(data)}
                    <!-- <div class="due-date">
                        <h4>Due Date</h4>
                    </div> -->
                </div>
                <div class="description">
                    <div class="header">
                        <div>
                            <i class="fas fa-align-justify card-icon"></i>
                            <h3>Description</h3>    
                        </div>
                    </div>
                    <textarea placeholder="Add a more detailed description...">${data.description}</textarea>
                    <div class="save-desc">
                        <a href="#">Save</a>
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                ${hasChecklists(data)}
                <div class="activity">
                    <div class="header">
                        <div>
                            <i class="fas fa-list-ul card-icon"></i>
                            <h3>Activity</h3>
                        </div>
                        <div>
                            <a href="#" class="buttons">Hide Details</a>
                        </div>
                    </div>
                    <div class="activity-body">
                        <div class="comment-section">
                            <img src="image/ttb.jpg" alt="profile" id="profile">
                            <textarea class="comment" placeholder="Write a comment..."></textarea>
                        </div>
                        <div class="activities"></div>
                    </div>
                </div>
            </div>
            <div class="card-col">
                <h4>Add to card</h4>
                <a href="#" class="buttons"><i class="far fa-user card-option-icon"></i>Members</a>
                <a href="#" class="buttons" id="label"><i class="fas fa-tag card-option-icon"></i>Label</a>
                <a href="#" class="buttons"><i class="fas fa-check-double card-option-icon"></i>Checklist</a>
                <a href="#" class="buttons"><i class="far fa-clock card-option-icon"></i>Due Date</a>
                <a href="#" class="buttons"><i class="fas fa-paperclip card-option-icon"></i>Attachment</a>
                <a href="#" class="buttons"><i class="fas fa-window-maximize card-option-icon"></i>Cover</a>
                <h4>Power-ups</h4>
                <a href="#" class="buttons">Get Power-Ups</a>
                <p style="font-size: smaller; color: rgba(25, 25, 25, 0.5);">Get unlimited Power-Ups, plus much more.</p>
                <a href="#" class="upgrade-team"><i class="fas fa-suitcase" style="margin-right: 10px;"></i>Upgrade Team</a>
                <h4>Actions</h4>
                <a href="#" class="buttons"><i class="fas fa-arrow-right card-option-icon"></i>Move</a>
                <a href="#" class="buttons"><i class="far fa-copy card-option-icon"></i>Copy</a>
                <a href="#" class="buttons"><i class="far fa-window-restore card-option-icon"></i>Make Template</a>
                <a href="#" class="buttons"><i class="far fa-eye card-option-icon"></i>Watch<span><i class="fas fa-check-square"></i></span></a>
                <div class="seperator"></div>
                <a href="#" class="buttons"><i class="fas fa-archive card-option-icon"></i>Archieve</a>
                <a href="#" class="buttons"><i class="fas fa-share-alt card-option-icon"></i>Share</a>
            </div>
        </div>
        <div class="close">+</div>
    </div>
    </div>`;
    document.querySelector('.content').insertAdjacentHTML('beforeend',showCard);
    document.querySelector('.card-bg').style.display = 'flex';
    document.querySelector('.close').addEventListener('click', function () {
        document.querySelector('.card-bg').remove();
    });
}

function hasMembers(data) {
    var members = "";

    if (data.members.length !== 0) {
        var memArray = [];
        var i = 0, name ="";
        
        data.members.map(mem => {
            memArray[i++] = mem.name.split(" ");
        })

        memArray.map(arr => {
            name += `<div class="name"><p>${arr[0].charAt(0)}${arr[1].charAt(0)}</p></div>`;
        })

        members += `<div class="members">
        <h4>Members</h4>
        <div class="members-body">
            ${name}
            <a href="#" class="addmember"><i class="fas fa-plus"></i></a>
        </div>
        </div>`;
    }
    return members;
}

function hasLabels(data) {
    var labels = "";

    if (data.labels.length !== 0) {
        var labeldiv = "";
        data.labels.map(l => {
            labeldiv += `<div class="label" style="background-color: ${l.color}"><p>${l.name}</p></div>`;
        })
        
        labels += `<div class="labels">
        <h4>Labels</h4>
        <div class="labels-body">
            ${labeldiv}
            <a href="#"><i class="fas fa-plus"></i></a>
        </div>
        </div>`;
    }

    return labels;
}

function hasChecklists(data) {
    var checklists = "";

    if (data.checklists.length !== 0) {
        var checkitem = "";
        data.checklists.map(c => {
            checkitem += `<div class="check">
            <input type="checkbox">
            <label>${c.item}</label>
            </div>`;
        })
        checklists += `<div class="checklist">
        <div>
            <i class="fas fa-check-double card-icon" style="margin-top: 40px;"></i>
            <div class="header">
                <h3 class="check-title" style="cursor: pointer;">${data.checklists[0].title}</h3>
                <div class="check-buttons">
                    <a href="#" class="buttons">Hide completed items</a>
                    <a href="#" class="buttons" style="margin-left: 10px;">Delete</a>
                </div>
                <textarea class="check-hide"></textarea>
            </div>
        </div>
        <div class="save-check">
            <a href="#">Save</a>
            <i class="fas fa-times" id="check-close"></i>
        </div>              
        <div class="checklist-body">
            ${checkitem}
            <a href="#" class="add-check buttons">Add an item</a>
        </div>
        </div>`;
    }
    return checklists;
}

function newList() {
    const list_title = document.getElementById('list-title').value;

    if (list_title !== "") {
        const list = {
            title: list_title,
            position: '5',
            status: 1
        };    
        fetch(API_END_POINT + "/list", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(list)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.loadData();
        }).catch(err => {
            console.log(err);
        });
    }
}

function showListMenu(id) {
    document.querySelector('.updateList'+id).style.display = 'flex';    
}

function closeListMenu(id) {
    document.querySelector('.updateList'+id).style.display = 'none';    
}

function updateList(id) {
    var title = document.querySelector('.updateListTitle'+id).value;
    const list = {
        title: title,
        position: 5,
        status: 1
    };
    fetch(API_END_POINT + '/list/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list)
    }).then(res => res.json())
    .then(data => {
        console.log(data);
        this.loadData();
    }).catch(err => {
        console.log(err);
    });
}

function deleteList(id) {
    fetch(API_END_POINT + "/list/" + id, {
        method: 'DELETE'
    });
    this.loadData();
    this.loadData();
}

function newCard(id) {
    const card_title = document.querySelector('.add_card'+id).value;

    if (card_title != "") {
        const card = {
            title: card_title,
            description: null,
            due_date: null,
            position: 7,
            status: 1
        }
        fetch(API_END_POINT + '/card/add/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.loadData();
        }).catch(err => {
            console.log(err);
        });
    }
}

function updateCard(id) {
    var title = document.querySelector('.card-editor-col1').firstElementChild.value;
    
    fetch(API_END_POINT + '/card/' + id)
    .then(response => response.json())
    .then(data => {
        var list_id = data.list.id;
        var labels = data.labels;
        var members = data.members;

        const card = {
            title: title,
            description: data.description,
            due_date: null,
            position: 1,
            status: 1
        }    

        fetch(API_END_POINT + '/card/update/' + list_id + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card)
        }).then(res => res.json())
        .then(data => {
            console.log('updated card '+data);
            this.loadData();
        });

        labels.map(label => {
            fetch(API_END_POINT + "/card/" + id + "/add/label/" + label.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
            .then(data => {
                console.log('label added' + data);
                this.loadData();
            });
        });

        members.map(mem => {
            fetch(API_END_POINT + "/card/" + id + "/add/member/" + mem.username, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json())
            .then(data => {
                console.log('member added: ' + data);
                this.loadData();
            });
        });
    });  
}

function deleteCard(id) {    
    fetch(API_END_POINT + '/card/' + id, {
        method: 'DELETE',
    });
    this.loadData();
    this.loadData();
}