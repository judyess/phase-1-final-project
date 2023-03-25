




// ---------------------------------------------------------

async function fetchElements() {
  // To pass the tests, don't forget to return your fetch!
  const res = await fetch("http://localhost:3000/elements");
    const elements = await res.json();
    return renderElements(elements);  
}


function renderElements(elements) {
  const tableBody = document.querySelector('.tableBody');
  //const table = document.querySelector('table');

  elements.forEach(element => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    td1.innerHTML = element.number;
    td2.innerHTML = element.name;
    td3.innerHTML = element.abbreviation;
    td4.innerHTML = element.atomicMass;
    tableBody.appendChild(tr);
    //table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  });
}


// When the page loads, call fetchElements() to get data in db.json
document.addEventListener('DOMContentLoaded', function() {
  fetchElements();
});






let searchBy;
let searchText;
let searchBoxText;
// idk if I want to use this yet.
// used with the function html snippet in index.html
function getform(){
    
    //searchBy = document.getElementById("searchBy").text;
    searchText = document.getElementById("searchText");
    //let option = searchBy.options[searchBy.selectedIndex].text;  
    searchBoxText = searchText.value;  
    alert("you wrote: " + searchBoxText);
    
}

// Gets dropdown menu selection
let menuSelection;
function menuHandler(){
  menuSelection = document.querySelector('#searchBy');

  // displays selection
  let option = menuSelection.value;
  document.querySelector('.output').textContent = option;
  console.log(option);
}


// Stop page from refreshing
var form=document.getElementById("filterForm");

function submitForm(event){
   event.preventDefault();
}

// lists for a submit event on the filterForm only
form.addEventListener('submit', submitForm);