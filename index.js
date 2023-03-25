
// ---------------------------------------------------------

async function fetchElements() {
  
  const res = await fetch("http://localhost:3000/elements");
    const elements = await res.json();
    return renderElements(elements);  
}



function renderElements(elements) {
  const tableBody = document.querySelector('.tableBody');
  //const table = document.querySelector('table');
  //console.log(elements); 

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


/*
See comments in this function. Many things to fix.
*/
let filteredElements = [];   
let searchBoxText;
function filter(){

    let searchText = document.getElementById("searchText");
    searchBoxText = searchText.value;  
    console.log("option: " + option);
    console.log(searchBoxText);
    let match = false;
    let e;
      fetch(`http://localhost:3000/elements/`)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          //console.log(data[0]);
          console.log(data[7]);
          console.log(data[7].name);    // prints "oxygen"
          console.log(option);          // prints "name"but...
          console.log(data[7].option);  // ...this is undefined. 
                                        // How do I access a property through a variable?
          
          


          // Need to figure out how to use a variable to call the object property                       
          for (let i =0; i < data.length; i++){
            
            //if (data[i].option === searchBoxText){        // returns no matches when I try to use the option variable containing the property name
            if (data[i].name === searchBoxText){       // correctly finds matching elements
              console.log("element is: " + data[i]);   // returns [object Object]
              e = data[i];
              filteredElements.push(e);               
              console.log(data[i]);                   // returns correct element object when a literal property value is used 
              match = true;
            }         
          }      
        });

        console.log("match found: " + match); // always prints false even though it goes through the if loop

        // elements will appear as [object Object] but they do render fine
        console.log("filteredElements: " + filteredElements); 
        
        renderElements(filteredElements); 
        /* Only when I name the object property literally instead of using the variable "option"
        
        The elements are being rendered even though they are printing as [object Object]
         in the console. But It does not show up in the table unless I submit the form again.
         The filteredElements array needs to be cleared each time I hit the form, 
         otherwise everything I search stays in the array, and is rendered again everytime I submit

         I also need to clear the table everytime bc right now its all just being 
         added to the end of the table.
        
        */
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

let option;
function menuHandler(){
  let menuSelection = document.querySelector('#searchBy');

  // displays selection
  option = menuSelection.value;
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