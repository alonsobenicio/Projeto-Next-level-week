function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() }) //pode ser tambem (res => res.sjon() //
    .then( states => {

         for(const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
         }
        
    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
     
    citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
    citySelect.innerHTML = true

    fetch(url)
    .then( (res) => { return res.json() }) //pode ser tambem (res => res.sjon() //
    .then( cities => {
        

         for(const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
         }
        
         citySelect.disabled = false
    } )
     
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities )

// Items de Coleta
// pegar todos os li´s 
const itemsToCollect = document.querySelectorAll(".items-grid li")

for ( const item of itemsToCollect ) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [2,3]

function handleSelectedItem(event) {
       
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    

    // verificar se existem items selecionados , se sim
    // pegar os itens selecionados
    

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId  //isso será true ou false
        return itemFound
    })
     
   // se jé tiver selecionado, 
    
    if( alreadySelected >= 0 ) { 
        // tirar da selecao
        const filteredItems = selectedItems.filter ( item => {
            const itemIsDifferent = item != itemId
            return  itemIsDifferent
        })
        
     selectedItems = filteredItems
} else {
    // se nao estiver selecionado
    // adicionar a seleção
    selectedItems.push(itemId)

    
      }
      collectedItems.value = selectedItems

}
