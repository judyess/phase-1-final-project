let filteredElements = [];   
let lookUp = null; 
let inRange = [];
let min = document.querySelector('#minValue');
let max = document.querySelector('#maxValue');
let filterRangeBy = null;
let output = document.querySelector('.output');

document.addEventListener('DOMContentLoaded', function() {
  fetchElements();
});

async function fetchElements() {
  const res = await fetch("http://localhost:3000/elements");
    const elements = await res.json();
    return renderElements(elements);  
}

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

function filter(){ 
    let key = lookUp; 
    output.textContent = "";
    
    let start;
    let stop;

    

    console.log(min);
    console.log(max);
    console.log(filterRangeBy);

      fetch(`http://localhost:3000/elements/`)
        .then((response) => response.json())
        .then((data) => {
          
          let rangeSelected = false;

          if(filterRangeBy==='default'){
            start = 0;
            stop = data.length;
          } else {
            rangeSelected = true;
              if (filterRangeBy ==="number"){
                {
                  if(min == null && max != null){
                    start = 0;
                    stop = max;
                  } else if (max == null && min != null){
                    start = min;
                    stop = data.length;
                  } else {
                    start = min;
                    stop = max;
                  }
                }
              } 
          }
          

          let match = false;              
          for (let i = start; i < stop; i++){
            if (data[i][`${key}`] == document.getElementById("searchText").value){   
              filteredElements.push(data[i]);               
              match = true;
            }         
          } 
          if(match===false){
            output.textContent = "No Match Found";
          } else {
          clearTable();
          
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

function submitForm(event){
   event.preventDefault();
}

let filterOption = document.querySelector('#searchBy');
filterOption.addEventListener("change", function() {
  lookUp = document.querySelector('#searchBy').value;
});


var form=document.getElementById("filterForm");
form.addEventListener('submit', submitForm);



// This is a part of an incomplete collection of functions thats meant to gather elements within a range
let selectRangeType = document.querySelector('#rangeType');
filterOption.addEventListener("change", function() {
  filterRangeBy = document.querySelector('#rangeType').value;  
});


// This is an incomplete function that currently only listens for a click on any table header
let tblHeaders = document.getElementsByClassName('tblHeader');
for(let i = 0; i < tblHeaders.length; i++){
  tblHeaders[i].addEventListener('click', function(){
    console.log(tblHeaders[i].getAttribute('id'));

    fetch(`http://localhost:3000/elements/`)
    .then((response) => response.json())
    .then((data) => {   
      // reorder elements by tblHeader 
    });
  })
}


/*

** FOR NUMBER RANGE ONLY

for all elements in data
    if min == null
      i = 0;

    if max == null




*/
