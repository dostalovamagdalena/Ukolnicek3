

// vytáhni data z localStorage, parsuj je a vlož je do taskArray, 
// pokud tam žádný nejsou, vytvoř prázdnou taskArray

const getSavedTasks =  function(){
  const taskArray = localStorage.getItem("tasks")
  if(taskArray !== null) {
    return JSON.parse(taskArray)
  } else {
    return []
  }
}

// funkce která ukládá úkol z políčka
const saveTasks = function(oneTask) {
 // z localStorage vezme jedno jméno, uloží ho a rovnou ho i stringifuje
  localStorage.setItem("tasks", JSON.stringify(oneTask))
}




// výstup funkce(array) getSavedTasks nazývám taskArray abych s ní mohla dělat dál
const taskArray = getSavedTasks()

let newForm = document.querySelector(".new-form")
newForm.addEventListener("submit", function(event){
  event.preventDefault()

  // do pole names pushneme úkol co je uložen v localStorage(každé jméno bude mít svoje unikátní id)
  

  taskArray.push({
    id:uuidv4(),
    task: event.target.elements.task.value
  })

  // vyprázdnění políčka po odeslání(dělá se to ještě před forEach)
  event.target.elements.task.value = ""

  // zde volám funkci saveTasks a vkládám do ní taskArray
  saveTasks(taskArray)
  console.log(taskArray)
  document.querySelector(".results").innerHTML = ""

  // vytvářím HTML strukturu po submitnutí
  taskArray.forEach(function(oneTask) {
    let newDiv = document.createElement("div")
  let newSpan = document.createElement("span")
  let deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-button")
  newDiv.classList.add("new-div")
  newSpan.classList.add("new-span")

  deleteButton.textContent = "Vymazat úkol"
  newSpan.textContent = oneTask.task
  console.log(newSpan.innerHTML)

  newDiv.appendChild(newSpan)
  newDiv.appendChild(deleteButton)
  let results = document.querySelector(".results")
  results.appendChild(newDiv)
 

  // mazací tlačítko
  deleteButton.addEventListener("click", function(event){
    // volám mazací funkci
    removeTask(oneTask.id)
    // ukládádm výsledek do localStorage
    saveTasks(taskArray)
    // smaže vypsané úkoly na stránce
    deleteOnPage()
  })
  })
 

})

const removeTask = function(id){
  const index = taskArray.findIndex(function(checkedTask){
    
    return checkedTask.id === id
    
  })
  if(index >-1){
    taskArray.splice(index,1)
  }

}

// když smažu něco z localStorage, tak tato funkce mi to znovu vypíše
// bez smazané položky (prostě to smaže i na stránce, nejenom v localStorage)

const deleteOnPage = function(){
  document.querySelector(".results").innerHTML = ""

  let newData = getSavedTasks()
  

  // znovu generuju html strukturu i mazací tlačítko
  newData.forEach(function(oneTask){

    let newDiv = document.createElement("div")
    let newSpan = document.createElement("span")
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-button")
    newDiv.classList.add("new-div")
    newSpan.classList.add("new-span")

    deleteButton.textContent = "Vymazat úkol"
    newSpan.textContent = oneTask.task
    console.log(newSpan.innerHTML)
  
    newDiv.appendChild(newSpan)
    newDiv.appendChild(deleteButton)
    let results = document.querySelector(".results")
    results.appendChild(newDiv)

    deleteButton.addEventListener("click", function(event){
      // volám mazací funkci
      removeTask(oneTask.id)
      // ukládádm výsledek do localStorage
      saveTasks(taskArray)
      // smaže vypsané úkoly na stránce
      deleteOnPage()
    })





  })
}



// kde sem skoncila? tedka mi to vypisuje do stránky udaje v local storage.
// co dal? buď přidat mazací funkci přímo k tlačítku deleteButton, 
// nebo udělat mazací funkci mimo a u buttonu ji jenom zavolat
let newData = getSavedTasks()
  

// znovu generuju html strukturu i mazací tlačítko
newData.forEach(function(oneTask){

  let newDiv = document.createElement("div")
  let newSpan = document.createElement("span")
  let deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-button")
  newDiv.classList.add("new-div")
  newSpan.classList.add("new-span")

  deleteButton.textContent = "Vymazat úkol"
  newSpan.textContent = oneTask.task
  console.log(newSpan.innerHTML)

  newDiv.appendChild(newSpan)
  newDiv.appendChild(deleteButton)
  let results = document.querySelector(".results")
  results.appendChild(newDiv)

  deleteButton.addEventListener("click", function(event){
    // volám mazací funkci
    removeTask(oneTask.id)
    // ukládádm výsledek do localStorage
    saveTasks(taskArray)
    // smaže vypsané úkoly na stránce
    deleteOnPage()
  })





})