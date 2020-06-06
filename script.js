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
            list = list + createList(data);
        });
        document.querySelector('.content').innerHTML = list + addAnotherList();
    }).catch(err => console.log(err));    
}

function createList(listdata) {
    var card = "";
    listdata.cards.map(c => {
        card += createCard(c);
    });
    var list = `<div class="list">
    <div class="list-title">
        <input type="text" value="${listdata.title}">
        <a href="#"><i class="fas fa-ellipsis-h"></i></a>
    </div>
    <div class="cards">${card}</div>
    <div class="footer">
        <div class="add-another">
            <i class="fas fa-plus" style="margin: 0px 5px;"></i>
            <p>Add another card</p>
        </div>
        <i class="far fa-window-restore template" style="cursor: pointer;"></i>
    </div>
    </div>`;    
    return list;
}

function addAnotherList() {
    var addlist = `<div class="last list">
    <div class="footer">
        <div class="add-another-list">
            <i class="fas fa-plus" style="margin: 0px 5px;"></i>
            <p>Add another list</p>
        </div>
    </div>
    </div>`;
    return addlist;
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
    var card = `<div class="card" onclick="clickCard(${carddata.id})">
    <div class="label-bar">${label}</div>
    <p>${carddata.title}</p>
    <div class="card-details">${card_details}</div>    
    </div>`; 
    console.log(card);
    
    return card;
}

function clickCard(id) {
    var card = fetch(API_END_POINT + '/card/' + id)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showCard(data);
    });
    console.log(card);
}

function showCard(data) {
    var members = "";
    var labels = "";
    var checklists = "";
    if (data.members.length !== 0) {
        members += ``;
    }

    if (data.labels.length !== 0) {
        labels += ``;
    }

    if (data.checklists.length !== 0) {
        checklists += ``;
    }
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
                    <div class="members">
                        <h4>Members</h4>
                        <div class="members-body">
                            <img src="image/profile.jpg" alt="member" id="profile">
                            <a href="#"><i class="fas fa-plus"></i></a>
                        </div>
                    </div>
                    <div class="labels">
                        <h4>Labels</h4>
                        <div class="labels-body">
                            <div class="label" style="background-color: red;"></div>
                            <div class="label" style="background-color: skyblue;"></div>
                        </div>
                    </div>
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
                    <textarea placeholder="Add a more detailed description..."></textarea>
                    <div class="save-desc">
                        <a href="#">Save</a>
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="checklist">
                    <div>
                        <i class="far fa-check-square card-icon" style="margin-top: 40px;"></i>
                        <div class="header">
                            <h3 class="check-title" style="cursor: pointer;">Checklist</h3>
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
                        <div class="check">
                            <input type="checkbox">
                            <label>check item 1</label>
                        </div>
                        <a href="#" class="add-check buttons">Add an item</a>
                    </div>
                </div>
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
                            <img src="image/profile.jpg" alt="#" id="profile">
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
    console.log(showCard);
    
    document.querySelector('.content').insertAdjacentHTML('beforeend',showCard);
    document.querySelector('.card-bg').style.display = 'flex';
}