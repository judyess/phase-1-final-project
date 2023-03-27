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
let lookUp = "number"; // default option because that's the first one in the list. Harcoded, change this.
let inRange = [];
let rangeStart = document.querySelector('#startValue');
let rangeEnd = document.querySelector('#endValue');
let filterRangeBy = null;



// When the page loads, populates the table with data from db.json. // Be able to explain why I need the DOMContentLoaded first before I fetch the elements.
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

function clearTable() {
  const rows = document.getElementsByClassName('rowData');
  let size = rows.length;
  for(let i =0; i< size; i++){
    rows[0].remove();
  }
}

// the submit button for the chemical equations does the same thing 
// because of the eventlistener on the form2, which basically refreshes the page, bc prevent default wasn't attached to it.
function seeAll() {
  clearTable(); 
  fetchElements();
}

// abbreviation searches are case sensitive.
function filter(opt){
    clearTable(); 
    
    let key = `${opt}`;
    let output = document.querySelector('.output');
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
          renderElements(filteredElements);  // Have to render this inside the fetch to have the filtered elements appear. idk why?
          filteredElements = []; // clears the array so filtered elements don't get rerendered again.
          if(match===false){
            output.textContent = "No Match Found";
          }
        
        });


      };
  
  


function searchHandler(){
  lookUp = document.querySelector('#searchBy').value;
  filterRangeBy = document.querySelector('#rangeType').value;
  
  console.log(lookUp);

}

function rangeHandler(){
  lookUp = document.querySelector('#searchBy').value;
  filterRangeBy = document.querySelector('#rangeType').value;
  
  console.log(filterRangeBy);

}

let filterOption = document.querySelector('#searchBy');
filterOption.addEventListener("change", function() {
      searchHandler();
  
});

let selectRangeType = document.querySelector('#rangeType');
filterOption.addEventListener("change", function() {
      rangeHandler();
  
});



var form=document.getElementById("filterForm");
//var form2 = document.getElementById("form2");

// Stop page from refreshing
// Be able to explain why I want to prevent the default submit behavior. (So the page doesn't reload, but why?)
function submitForm(event){
   event.preventDefault();
}

// lists for a submit event on the filterForm only
form.addEventListener('submit', submitForm);
//form2.addEventListener('submit', submitForm);