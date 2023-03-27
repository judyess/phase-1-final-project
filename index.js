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

// Variables
let filteredElements = [];   
let lookUp = null; // default option because that's the first one in the list. Harcoded, change this.
let inRange = [];
let rangeStart = document.querySelector('#startValue');
let rangeEnd = document.querySelector('#endValue');
let filterRangeBy = null;
let output = document.querySelector('.output');


// Have to wait for the page to load  
// because renderElements() builds the table body 
// from information about the HTML elements which need to exist first.
document.addEventListener('DOMContentLoaded', function() {
  fetchElements();
});


async function fetchElements() {
  const res = await fetch("http://localhost:3000/elements");
    const elements = await res.json();
    return renderElements(elements);  
}


// Function has to refer to the HTML table headers <th> id values 
// to know what element properties to show in which column.

function renderElements(elements) { 
  const tableBody = document.querySelector('.tableBody');
  const headers = document.getElementsByClassName("tblHeader");

  elements.forEach(element => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'rowData');
    tableBody.appendChild(tr);

    for(let i = 0; i < headers.length; i++){ 
      let td = document.createElement("td");
      let key = headers[i].getAttribute('id');
      tr.appendChild(td);
      td.innerHTML = element[`${key}`]; 
    }
  });
}



// abbreviation searches are case sensitive.
function filter(){ 
    let key = lookUp; 
    output.textContent = "";

      fetch(`http://localhost:3000/elements/`)
        .then((response) => response.json())
        .then((data) => {   
          let match = false;              
          for (let i =0; i < data.length; i++){
            if (data[i][`${key}`] == document.getElementById("searchText").value){   
              filteredElements.push(data[i]);               
              match = true;
            }         
          } 
          if(match===false){
            output.textContent = "No Match Found";
          } else {
          clearTable();
          // why do I have to handle the data I get from the fetch inside the fetch?
          renderElements(filteredElements); 
          filteredElements = []; 
          }
        });
      };


function clearTable() {
  const rows = document.getElementsByClassName('rowData');
  let size = rows.length;
  for(let i =0; i< size; i++){
    rows[0].remove();
  }
}

function seeAll() {
  clearTable(); 
  fetchElements();
}


/*
Event Listeners/page activity handlers
*/


// by default submitting forms causes the page to reload, if I don't prevent this from happening
// then things I try to display inside HTML elements will immediately disappear when the page reloads.
function submitForm(event){
   event.preventDefault();
}

let filterOption = document.querySelector('#searchBy');
filterOption.addEventListener("change", function() {
  lookUp = document.querySelector('#searchBy').value;
});

let selectRangeType = document.querySelector('#rangeType');
filterOption.addEventListener("change", function() {
  filterRangeBy = document.querySelector('#rangeType').value;  
});



let tblHeaders = document.getElementsByClassName('tblHeader');
for(let i = 0; i < tblHeaders.length; i++){
  tblHeaders[i].addEventListener('click', function(){
    console.log(tblHeaders[i].getAttribute('id'));
  })
}


var form=document.getElementById("filterForm");
form.addEventListener('submit', submitForm);

