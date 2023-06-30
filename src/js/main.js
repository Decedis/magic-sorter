const url = 'https://api.magicthegathering.io/v1/cards';
const sortDesc = document.getElementById('sort-desc');
const sortAsc  = document.getElementById('sort-asc');
const sortDescFav = document.getElementById('sort-desc-fav');
const sortAscFav  = document.getElementById('sort-asc-fav');
const library  = document.getElementById('browse-injection');
const favorites = document.getElementById('favorite-injection');
//unique vals
const instantCount = document.getElementById('instant')
const creatureCount = document.getElementById('creature')
const sorceryCount = document.getElementById('sorcery')
const enchantmentCount = document.getElementById('enchantment')
const legendaryCount = document.getElementById('legendary')

//cardlist
let cardList = [];


const cardSort = (container, direction) => {
        //let container = document.getElementById('main');
    if (direction === 'desc') {
        let sortConst = ((a,b) => {
            if (a.id < b.id ){
                return 1
            } 
            if ( a.id > b.id) {
                return -1
            }
            return 0;
        });

        //let sorted = cardList.sort(sortConst);
        let sorted = Array.from(container.childNodes).sort(sortConst);
        //sorted.forEach((card) => container.appendChild(card));
        sorted.forEach((card) => container.appendChild(card));
    }
    if (direction === 'asc') {
        let sortConst = ((a,b) => {
            if (a.id > b.id ){
                return 1
            } 
            if ( a.id < b.id) {
                return -1
            }
            return 0;
        });

        // let sorted = cardList.sort(sortConst);
        // sorted.forEach((card) => container.appendChild(card));
        let sorted = Array.from(container.childNodes).sort(sortConst);
        sorted.forEach((card) => container.appendChild(card));
    }
}
const uniqueVal = (target, modify) => {
    let cardType = target.getAttribute('data-cardtype').toLowerCase();
    
    let send = document.getElementById(`${cardType}`);
    
    let uVal = parseInt(send.innerHTML);
    modify === 'add' ? uVal++ : uVal--;
    return send.innerHTML = uVal;
}
const generate = (jsonData, id) => {
    const parent = document.getElementById('browse-injection');
    const element = document.createElement('div');
    element.classList.add('card');
    element.setAttribute("id", id);
    element.setAttribute('data-cardtype', jsonData.type.split(' ')[0]);
    element.innerHTML =`
        <div class="img-container">
            <img src="${jsonData.imageUrl}" alt="${jsonData.name}">
        </div>
        <div class="hover-info" >
            <p>${jsonData.name}</p>
            <p>Type: ${jsonData.type}</p>
        </div>
    `;
    return parent.append(element);    
}
let data;
const magicDrag = async () => {
    try {
        const response = await fetch(url);
        const result = await response.json() 
            .then(res => {
                console.log(res);
                data = res;
                //return res.cards.forEach(card => card.imageUrl ? generate(card) : "");
                
                for(let i = 0; i <= 40; i++){
                    res.cards[i].imageUrl ? generate(res.cards[i], i) : "" ;
                }
            });
        cardList = Array.from(document.getElementsByClassName('card'));
        cardList.forEach(card => card.addEventListener('click', function(){
            card.parentElement.id === library.id ? favorites.appendChild(card) && uniqueVal(card, 'add') : library.appendChild(card) && uniqueVal(card, '');
        }));
        sortDesc.addEventListener('click', () => cardSort(library, 'desc'));
        sortAsc.addEventListener('click', () => cardSort(library, 'asc'));
        sortDescFav.addEventListener('click', () => cardSort(favorites, 'desc'));
        sortAscFav.addEventListener('click', () => cardSort(favorites, 'asc'));
    
    } catch (error) {
        console.error(error);
    }
}
magicDrag();


