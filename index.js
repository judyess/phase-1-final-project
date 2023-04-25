let option = null; 
let elements = [];

document.addEventListener('DOMContentLoaded', () => fetchElements());

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
    for(let i = 0; i < headers.length; i++){ 
      const td = document.createElement("td");
      const key = headers[i].getAttribute('id');
      tr.appendChild(td);
      td.innerHTML = element[`${key}`]; 
    }
  });
}

function filterList(){ 
  const filteredElements = []; 
  const output = document.querySelector('.output');
  let match = false; 
  output.textContent = "";
  elements.forEach(element=>{
    if (element[`${option}`] == document.getElementById("searchText").value){   
      filteredElements.push(element);               
      match = true;
    }
  });
  if(match===false){
    output.textContent = "No Match Found";
  } else {
    clearTable();
    renderElements(filteredElements); 
  }
};

function clearTable() {
  const rows = document.getElementsByClassName('rowData');
  const size = rows.length;
  for(let i =0; i< size; i++){
    rows[0].remove();
  }
}

function seeAll() {
  clearTable(); 
  renderElements();
}

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