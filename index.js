
// ---------------------------------------------------------

async function fetchElements() {
  
  const res = await fetch("http://localhost:3000/elements");
    const elements = await res.json();
    return renderElements(elements);  
}



function renderElements(elements) {
  
  const tableBody = document.querySelector('.tableBody');

  elements.forEach(element => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'rowData');
    tableBody.appendChild(tr);
    /*
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');

    td1.innerHTML = element.number;
    td2.innerHTML = element.name;
    td3.innerHTML = element.abbreviation;
    td4.innerHTML = element.atomicMass;

    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    */

    // I want to rewrite the above as a loop to create rows of data based on the number of tblheaders
    /*
    for each element, create a row.
      for each tableHeader, create a column of data, 
        const td = document.createElement('td');
          populate that column of data with element.key, where key is whatever the tableHeaders ID is
        let key = tableHeader.attr("id");
        td.innerHTML = element.
        

  
    */
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

// When the page loads, populates the table with data from db.json
document.addEventListener('DOMContentLoaded', function() {
  fetchElements();
});



let filteredElements = [];   
let searchBoxText;
let option = "number";


// abbreviation searches are case sensitive.
function filter(opt){
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
  
  




/*  Commented out to test filter() function. May not need this one.

let searchBoxText;
function getform(){

    let searchText = document.getElementById("searchText");
    searchBoxText = searchText.value;  
    alert("you wrote: " + searchBoxText);
    
}
*/

// Gets dropdown menu selection

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