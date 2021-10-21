/*
* Author: Ngozi Young
* Date: July 21, 2021
*/
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const container = document.querySelector('#container');
container.classList.add('pokemon');

for(let i=1; i<152; i++) {
    const pokemon = document.createElement('div');
    const pokemonImg = document.createElement('img');
    const label = document.createElement('span');
    pokemonImg.setAttribute('src', `${baseURL}${i}.png`);
    label.innerText = `# ${i}`;
    pokemon.append(pokemonImg, label);
    container.appendChild(pokemon);
}