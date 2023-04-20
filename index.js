let option = null; // global because I don't want to call functions when value changes
let elements = [];

document.addEventListener('DOMContentLoaded', function() {
  fetchElements();
});

async function fetchElements() {
  const res = await fetch("http://localhost:3000/elements");
    const response = await res.json();
    elements = response;
    return renderElements();  
}


function renderElements(arr=elements) { 
  const tableBody = document.querySelector('.tableBody');
  const headers = document.getElementsByClassName("tblHeader");

  arr.forEach(element => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'rowData');
    tableBody.appendChild(tr);

    // forEach
    for(let i = 0; i < headers.length; i++){ 
      let td = document.createElement("td");
      let key = headers[i].getAttribute('id');
      tr.appendChild(td);
      td.innerHTML = element[`${key}`]; 
    }
  });
}

// use option. 
function filterList(){ 
  let filteredElements = [];  
  let output = document.querySelector('.output'); 
  output.textContent = "";
  let match = false; 
  
  // forEach or .filter?
  for (let i = 0; i < elements.length; i++){
    if (elements[i][`${option}`] == document.getElementById("searchText").value){   
      filteredElements.push(elements[i]);               
      match = true;
    }         
  } 

  // if/else okay?
  if(match===false){
    output.textContent = "No Match Found";
  } else {
  clearTable();
  renderElements(filteredElements); 
  }
};

function clearTable() {
  const rows = document.getElementsByClassName('rowData');
  let size = rows.length;

  // forEach
  for(let i =0; i< size; i++){
    rows[0].remove();
  }
}

function seeAll() {
  clearTable(); 
  renderElements();
}

// get option
document.querySelector('#searchBy').addEventListener("change", function() {
  option = document.querySelector('#searchBy').value;
});

document.getElementById("filterForm").addEventListener('submit', function(event){
  event.preventDefault();
  filterList();
});


document.getElementById("clearTable").addEventListener("click", function(event){
  event.preventDefault();
  clearTable();
})


document.getElementById("seeAll").addEventListener("click", function(event){
  event.preventDefault();
  seeAll();
});

