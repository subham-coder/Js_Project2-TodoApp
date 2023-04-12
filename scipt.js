let data = [];
let cardId;
// show Add card popup..
function showAddItemPopup() {
    const body = document.getElementById("mainpage");
    const taskItem = document.getElementById("popup");
    taskItem.style.display = "block";
    body.style.filter = "blur(.2em)"
}
// close Add Item card popup..
function closeItemPopup() {
    const body = document.getElementById("mainpage");
    const taskItem = document.getElementById("popup"); 
    taskItem.style.display = "none";
    body.style.filter = "none";
}
// Handle the add item popup..
function handleItemCardPopup() {
    const cardText = document.getElementById("input-text").value;
    const card = {
      id: new Date().getTime().toString(),
      cardTitle: cardText,
      content: [],
    };
    if (cardText) {
      data.push(card);
      renderCards();
    } 
    else {
      alert("Please add card Name");
    }
    document.getElementById("input-text").value = "";
    closeItemPopup();
  }
 
//   Add card to the webpage..
function renderCards() {
    const cardcontainer = document.getElementById("card-container");
    let child = "";
    for (let i = 0; i < data.length; i++) {
      console.log("data:", data[i]);
      child += `<div id="card_${data[i].id}" class="card">
          <p class="card-title">${data[i].cardTitle}</p>
          <hr>
          <ul id="content_list_${data[i].id}">
  
          </ul>
          <div class="container2">
          <button onclick="deleteCard(${data[i].id})" class="delete">X</button>
          <button onclick="showAddContentToCardPopup(${data[i].id})" class="add">+</button>
          </div>
          </div>`;
    }
    cardcontainer.innerHTML = child;
    renderContent();
}
 // Add card content to the card..
 function renderContent() {
  for(let i=0; i< data.length; i++) {
    const ulElement= document.getElementById(`content_list_${data[i].id}`);
    let contentChild = "";
    for(let j=0; j< data[i].content.length; j++) {
      const content= data[i].content[j];
      contentChild += `<li id="content_${content.id}">${content.contentText}</li>`
    }
    ulElement.innerHTML = contentChild;
  }
}

// Delete card from the webpage..
function deleteCard(id) {
    // const cardcontainer = document.getElementById("card-container");
    const cardId = `card_${id}`;
    const card = document.getElementById(cardId);
 // remove child node from parent node
    card.parentNode.removeChild(card);
    data = data.filter((item) => item.id !== cardId);
}
// It shows the content Task popup..
function showAddContentToCardPopup(id) {
    const taskContent = document.getElementById("popup2");
    taskContent.style.display = "block";
    cardId = id;
  }
// close the content task popup..  
  function removeAddContentToCardPopup() {
    const  taskContent = document.getElementById("popup2");
    taskContent.style.display = "none";
  }
// Handle the card-content task popup.. 
  function addContentToCard() {
    const contentListId = `content_list_${cardId}`;
    const Ul = document.getElementById(contentListId);
    const contentText = document.getElementById("card-input-text").value;
    if (!contentText) {
      alert("Please add task name");
      } 
    else {
     document.getElementById("card-input-text").value = "";
      const liNode = document.createElement("li");
      liNode.innerHTML = contentText;
      Ul.appendChild(liNode);
      removeAddContentToCardPopup();
     
      for(let i=0; i<data.length; i++) {
        if(data[i].id == cardId) {
          const content = {
            id: new Date().getTime().toString(),
            contentText: contentText,
            done:false,
          } 
          data[i].content.push(content);
        }
       
      }
      console.log("data", data)
   }
  }