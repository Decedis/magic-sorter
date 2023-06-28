const url = 'https://api.magicthegathering.io/v1/cards'
// const url = 'https://alexandrosok-magic-the-gathering-mythicspoiler-v1.p.rapidapi.com/API/ApiCalls.php?method=%7Brequested-edition%7D&api_key=%7Bapi-key%7D';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'b60a84d472mshc856efe3d62240ep1bcf35jsnef03ddddad01',
// 		'X-RapidAPI-Host': 'alexandrosok-magic-the-gathering-mythicspoiler-v1.p.rapidapi.com'
// 	}
// };
let data;
const magicDrag = async () => {
    try {
        const response = await fetch(url);
        const result = await response.json()
            .then(res => console.log(res))
    } catch (error) {
        console.error(error);
    }
}
magicDrag();