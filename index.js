// On page refresh I now get a warning about resubmitting data. Why? Get rid of that.
// 
/*
Need to add event listeners: I can add event listeners to the tableheaders, so when clicked
they show the elements in ascending or descending order of that property. 

Allow partial match search results for element names. 
    return all results for elements whose name contains the text at all.
      the order of the results will be displayed by:
        The sooner the substring is found in their name.
(can I get this to update automatically as the user types more?)
*/
// ---------------------------------------------------------

async function fetchElements() {
  
  const res = await fetch("http://localhost:3000/elements");
    const elements = await res.json();
    return renderElements(elements);  
}


// Function has to refer to the HTML table headers <th> id values 
// to know what element properties to show in which column.

function renderElements(elements) {
  
  const tableBody = document.querySelector('.tableBody');

  elements.forEach(element => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'rowData');
    tableBody.appendChild(tr);

    const headers = document.getElementsByClassName("tblHeader");
    
    for(let i = 0; i < headers.length; i++){ 
      let td = document.createElement("td");
      let key = headers[i].getAttribute('id');
      tr.appendChild(td);
      td.innerHTML = element[`${key}`]; 
    }
  });
}

function clearTable() {
  const rows = document.getElementsByClassName('rowData');
  let size = rows.length;
  for(let i =0; i< size; i++){
    rows[0].remove();
  }
}

// the submit button for the chemical equations does the same thing 
// because of the eventlistener on the filterForm, which basically refreshes the page
function seeAll() {
  clearTable(); 
  fetchElements();
}

// When the page loads, populates the table with data from db.json
document.addEventListener('DOMContentLoaded', function() {
  fetchElements();
});

let filteredElements = [];   
let searchBoxText;
let option = "number";


// abbreviation searches are case sensitive.
function filter(opt){
    clearTable(); 
    let searchText = document.getElementById("searchText");
    searchBoxText = searchText.value;  

    let key = `${opt}`;
    console.log(key);

    let match = false;
    let e;
      fetch(`http://localhost:3000/elements/`)
        .then((response) => response.json())
        .then((data) => {                 
          for (let i =0; i < data.length; i++){
            if (data[i][`${key}`] == searchBoxText){      // Use only two ='s so that integer values will still match if sent as string   
              e = data[i];
              console.log(e);
              filteredElements.push(e);               
              match = true;
            }         
          }  
          renderElements(filteredElements);  // Have to render this inside the fetch to have the filtered elements appear. idk why?
          filteredElements = []; // clears the array so filtered elements don't get rerendered again.
        });

      };
  
  

//let option = "Number";
function menuHandler(){
  let menuSelection = document.querySelector('#searchBy');

  // displays selection
  option = menuSelection.value;
  document.querySelector('.output').textContent = option;
  //console.log(option);
}


// Stop page from refreshing
var form=document.getElementById("filterForm");
//var form2 = document.getElementById("form2");

function submitForm(event){
   event.preventDefault();
}

// lists for a submit event on the filterForm only
form.addEventListener('submit', submitForm);
//form2.addEventListener('submit', submitForm);