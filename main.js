const container = document.querySelector("#container")
const select = document.querySelector(("#type"))
const input = document.querySelector("input")
const buttonSearch = document.querySelector("#search")
let search = "";
let type = "all";
let pokemonesArray = [];

buttonSearch.addEventListener("click", (event) =>{
    event.preventDefault()
    clean()
    search = input.value
    console.log(search)
    for(let i=0; i<pokemonesArray.length; i++){
        if(pokemonesArray[i].name === search){
            printCard(pokemonesArray[i])
            console.log(pokemonesArray[i])
    }  }
})


select.addEventListener("change", () =>{
    type = select.value
    if(type === "all"){
        clean()
        printAll(pokemonesArray)
    } else {
        clean()
        for(let i=0; i<pokemonesArray.length; i++){
            if(pokemonesArray[i].type === type){
                printCard(pokemonesArray[i])
                console.log(pokemonesArray[i])
        } 
    }}
})


async function getPokemon(pokemon){
    /* fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i<data.results.length; i++){
                fetch(data.results[i].url)
                .then(response => response.json())
                .then(data => createData(data))  
            }
        })
        .then(() => {
            console.log(pokemonesArray)
            for(let i=0; i<pokemonesArray.length; i++){
                printCard(pokemonesArray[i])
            }
        }) */
        
        let request = await fetch('https://pokeapi.co/api/v2/pokemon/')
        let response = await request.json()
        let data = response.results
        for(let i = 0; i<data.length; i++){
            let request = await fetch(data[i].url)
            let response = await request.json()
            createData(response)      
        }
        printAll(pokemonesArray)
    }
    
function createData(pokemon){
    /* console.log(pokemon) */
    const newPokemon = {
        name: pokemon.name,
        img: pokemon.sprites.front_default,
        id: pokemon.id,
        type: pokemon.types[0].type.name,
        ability: pokemon.abilities[0].ability.name

    }
    pokemonesArray.push(newPokemon)
   
}

function printCard (newPokemon){
    const name = document.createElement("h2")
    name.classList.add("name")
    name.textContent = `${newPokemon.name}`

    const id = document.createElement("p")
    id.classList.add("id")
    id.textContent = `ID: ${newPokemon.id}`

    const type = document.createElement("p")
    type.classList.add("type")
    type.textContent = `Type: ${newPokemon.type}`

    const img = document.createElement("img")
    img.classList.add("img")
    img.src = newPokemon.img

    const div = document.createElement("div")
    div.classList.add("card")
    div.appendChild(name)
    div.appendChild(img)
    div.appendChild(id)
    div.appendChild(type)
    
    if(newPokemon.type === "grass"){
        div.classList.add("grass")
    } else if(newPokemon.type === "bug"){
        div.classList.add("bug")
    } else if(newPokemon.type === "water"){
        div.classList.add("water")
    } else if(newPokemon.type === "fire"){
        div.classList.add("fire")
    } else if(newPokemon.type === "normal"){
        div.classList.add("normal")
    }

    container.appendChild(div)
}  

function clean(){
    container.innerHTML = ''
}

function printAll(pokemones){
    for(let i=0; i<pokemones.length; i++){
        printCard(pokemones[i])
    }
}

getPokemon()