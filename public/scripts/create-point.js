
function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( (res) => { return res.json() })
  .then( states => {
        for( const state of states) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }


      
  } )
}

populateUfs()

function getCities (event) {
  const citysSelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")    
  
  const ufValue = event.target.value 
  
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citysSelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citysSelect.disabled = true

  fetch(url)
  .then( (res) => { return res.json() })
  .then( cities => {

        for( const city of cities) {
          citysSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citysSelect.disabled = false  
  } )
}


document
      .querySelector("select[name=uf]")
      .addEventListener("change", getCities)

// Items de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  
  const itemLi = event.target

  // adicionar ou remover uma classe com javascript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  console.log('ITEM ID:', itemId)

// verificar se existem items selecionados, se sim 
//pegar os itens selecionados 
const alreadySelected = selectedItems.findIndex( item => {
  const itemFound = item == itemId // isso será true ou false
  return itemFound
})

// se já estiver selecionado, 
if( alreadySelected >= 0 ) {
  //tirar da seleção
  const filteredItems = selectedItems.filter( item => {
    const itemIsDifferent = item != itemId // false
    return itemIsDifferent
  })

  selectedItems = filteredItems

} else{
  // se não estiver selecionado, 
  //adicionar à seleção 
  selectedItems.push(itemId)
}

console.log('selectedItems: ', selectedItems)

// atualizar o campo escondido com os items selecionados 
collectedItems.value = selectedItems

}