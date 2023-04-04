// This is the function that would add an element to db.json.
// That data is in data.txt and is ready to be called with this function name attached.
function submitData(number, name, abbreviation, atomicMass) {
    fetch("http://localhost:3000/elements", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            number: number,
            name: name,
            abbreviation: abbreviation,
            atomicMass: atomicMass
        }),
    })
            .then(function (response) {
                return response.json();
            })
                .then(function (object) {
                   return object.document.body.innerHTML = `<p>${response.id}</p>`
                })
                    .catch(function (error) {
                        console.log("error", error);
                        return (document.body.innerHTML = `<p>${error.message}</p>`);
                    })                 
}


// function to add a property and value to an element in db.json. 
// The function returns an error in the console but still updates the element specified by its number.
function addProperty(propertyName, value, number) {
    // technically, I am accessing the element by its object ID and not its atomic Number
    // they just happen to be the same.
    // but try to figure out how to get to a specific object to update it when this is not the case
    
    fetch(`http://localhost:3000/elements/${number}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({    
            [`${propertyName}`]: value,         
        }),
    })
            .then(function (response) {
                return response.json();
            })
                .then(function (object) {
                   return object.document.body.innerHTML = `<p>${response.id}</p>`

                })
                    .catch(function (error) {
                        console.log("error", error);
                        return (document.body.innerHTML = `<p>${error.message}</p>`);
                    })
}


// These arrays contain the atomic numbers of the elements that belong to the named period

let period1 = [
    1, 2
]
let period2 = [
    3, 4, 5, 6, 7, 8, 9, 10
]
let period3 = [
    11, 12, 13, 14, 15, 16, 17, 18
]
let period4 = [
    19, 20, 21, 22, 23, 24, 25, 26, 36
]
let period5 = [
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54
]
let period6 = [
    55, 56, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86
]
let period7 = [
    87, 88, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118
]

// this function takes one of the arrays written above,
//  and finds the elements that are referenced, then calls addProperty() on them.

function processArray(arr) {
    fetch(`http://localhost:3000/elements/`)
    .then((response) => response.json())
    .then((data) => {
                  
      for (let i =0; i < data.length; i++){        
        for( let j = 0; j < arr.length; j++){
            if (data[i].number === arr[j]){    
                addProperty("period", 1, arr[j]); // I have the propertyName and value hard coded. Change this. (!!!)
            } 
        }               
      }      
    });
}

// currently takes the array named period1, have to finish going through the other arrays to complete the table
processArray(period1);





