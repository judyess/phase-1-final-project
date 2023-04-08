// Use to repopulate db.json
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


// Note that element objects are actually being accessed by their id and not their atomic number. They just happen to be the same.
function addProperty(propertyName, value, number) {
    
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


let periodLanthanides = [
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
]

let periodActinides = [
    89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103
]


function processArray(arr) {
    fetch(`http://localhost:3000/elements/`)
    .then((response) => response.json())
    .then((data) => {
                  
      for (let i =0; i < data.length; i++){        
        for( let j = 0; j < arr.length; j++){
            if (data[i].number === arr[j]){    
                addProperty("period", 6, arr[j]); // Must manually update with each array
            } 
        }               
      }      
    });
}


processArray(periodLanthanides);