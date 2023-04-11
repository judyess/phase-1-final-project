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
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
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

let periodLanthanides = [
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
]

let periodActinides = [
    89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103
]

/*

submitData(1, 'Hydrogen', 'H', 1.0079);
submitData(2, 'Helium', 'He', 4.0026);
submitData(3, 'Lithium', 'Li', 6.941);
submitData(4, 'Beryllium', 'Be', 9.0122);
submitData(5, 'Boron', 'B', 10.811);
submitData(6, 'Carbon', 'C', 12.0107);
submitData(7, 'Nitrogen', 'N', 14.0067);
submitData(8, 'Oxygen', 'O', 15.9994);
submitData(9, 'Fluorine', 'F', 18.9984);
submitData(10, 'Neon', 'Ne', 20.1797);
submitData(11, 'Sodium', 'Na', 22.9897);
submitData(12, 'Magnesium', 'Mg', 24.305);
submitData(13, 'Aluminum', 'Al', 26.9815);
submitData(14, 'Silicon', 'Si', 28.0855);
submitData(15, 'Phosphorus', 'P', 30.9738);
submitData(16, 'Sulfur', 'S', 32.065);
submitData(17, 'Chlorine', 'Cl', 35.453);
submitData(18, 'Argon', 'Ar', 39.948);
submitData(19, 'Potassium', 'K', 39.0983);
submitData(20, 'Calcium', 'Ca', 40.078);
submitData(21, 'Scandium', 'Sc', 44.9559);
submitData(22, 'Titanium', 'Ti', 47.867);
submitData(23, 'Vanadium', 'V', 50.9415);
submitData(24, 'Chromium', 'Cr', 51.9961);
submitData(25, 'Manganese', 'Mn', 54.938);
submitData(26, 'Iron', 'Fe', 55.845);
submitData(27, 'Nickel', 'Ni', 58.6934);
submitData(28, 'Cobalt', 'Co', 58.9332);
submitData(29, 'Copper', 'Cu', 63.546);
submitData(30, 'Zinc', 'Zn', 65.39);
submitData(31, 'Gallium', 'Ga', 69.723);
submitData(32, 'Germanium', 'Ge', 72.64);
submitData(33, 'Arsenic', 'As', 74.9216);
submitData(34, 'Selenium', 'Se', 78.96);
submitData(35, 'Bromine', 'Br', 79.904);
submitData(36, 'Krypton', 'Kr', 83.8);
submitData(37, 'Rubidium', 'Rb', 85.4678);
submitData(38, 'Strontium', 'Sr', 87.62);
submitData(39, 'Yttrium', 'Y', 88.9059);
submitData(40, 'Zirconium', 'Zr', 91.224);
submitData(41, 'Niobium', 'Nb', 92.9064);
submitData(42, 'Molybdenum', 'Mo', 95.94);
submitData(43, 'Technetium', 'Tc', 98);
submitData(44, 'Ruthenium', 'Ru', 101.07);
submitData(45, 'Rhodium', 'Rh', 102.9055);
submitData(46, 'Palladium', 'Pd', 106.42);
submitData(47, 'Silver', 'Ag', 107.8682);
submitData(48, 'Cadmium', 'Cd', 112.411);
submitData(49, 'Indium', 'In', 114.818);
submitData(50, 'Tin', 'Sn', 118.71);
submitData(51, 'Antimony', 'Sb', 121.76);
submitData(52, 'Tellurium', 'Te', 127.6);
submitData(53, 'Iodine', 'I', 126.9045);
submitData(54, 'Xenon', 'Xe', 131.293);
submitData(55, 'Cesium', 'Cs', 132.9055);
submitData(56, 'Barium', 'Ba', 137.327);
submitData(57, 'Lanthanum', 'La', 138.9055);
submitData(58, 'Cerium', 'Ce', 140.116);
submitData(59, 'Praseodymium', 'Pr', 140.9077);
submitData(60, 'Neodymium', 'Nd', 144.24);
submitData(61, 'Promethium', 'Pm', 145);
submitData(62, 'Samarium', 'Sm', 150.36);
submitData(63, 'Europium', 'Eu', 151.964);
submitData(64, 'Gadolinium', 'Gd', 157.25);
submitData(65, 'Terbium', 'Tb', 158.9253);
submitData(66, 'Dysprosium', 'Dy', 162.5);
submitData(67, 'Holmium', 'Ho', 164.9303);
submitData(68, 'Erbium', 'Er', 167.259);
submitData(69, 'Thulium', 'Tm', 168.9342);
submitData(70, 'Ytterbium', 'Yb', 173.04);
submitData(71, 'Lutetium', 'Lu', 174.967);
submitData(72, 'Hafnium', 'Hf', 178.49);
submitData(73, 'Tantalum', 'Ta', 180.9479);
submitData(74, 'Tungsten', 'W', 183.84);
submitData(75, 'Rhenium', 'Re', 186.207);
submitData(76, 'Osmium', 'Os', 190.23);
submitData(77, 'Iridium', 'Ir', 192.217);
submitData(78, 'Platinum', 'Pt', 195.078);
submitData(79, 'Gold', 'Au', 196.9665);
submitData(80, 'Mercury', 'Hg', 200.59);
submitData(81, 'Thallium', 'Tl', 204.3833);
submitData(82, 'Lead', 'Pb', 207.2);
submitData(83, 'Bismuth', 'Bi', 208.9804);
submitData(84, 'Polonium', 'Po', 209);
submitData(85, 'Astatine', 'At', 210);
submitData(86, 'Radon', 'Rn', 222);
submitData(87, 'Francium', 'Fr', 223);
submitData(88, 'Radium', 'Ra', 226);
submitData(89, 'Actinium', 'Ac', 227);
submitData(90, 'Thorium', 'Th', 232.0381);
submitData(91, 'Protactinium', 'Pa', 231.0359);
submitData(92, 'Uranium', 'U', 238.0289);
submitData(93, 'Neptunium', 'Np', 237);
submitData(94, 'Plutonium', 'Pu', 244);
submitData(95, 'Americium', 'Am', 243);
submitData(96, 'Curium', 'Cm', 247);
submitData(97, 'Berkelium', 'Bk', 247);
submitData(98, 'Californium', 'Cf', 251);
submitData(99, 'Einsteinium', 'Es', 252);
submitData(100, 'Fermium', 'Fm', 257);
submitData(101, 'Mendelevium', 'Md', 258);
submitData(102, 'Nobelium', 'No', 259);
submitData(103, 'Lawrencium', 'Lr', 262);
submitData(104, 'Rutherfordium', 'Rf', 261);
submitData(105, 'Dubnium', 'Db', 262);
submitData(106, 'Seaborgium', 'Sg', 266);
submitData(107, 'Bohrium', 'Bh', 264);
submitData(108, 'Hassium', 'Hs', 277);
submitData(109, 'Meitnerium', 'Mt', 268);
submitData(110, 'Darmstadtium', 'Ds', NULL);
submitData(111, 'Roentgenium', 'Rg', 272);
submitData(112, 'Ununbium', 'Uub', NULL);
submitData(113, 'Ununtrium', 'Uut', NULL);
submitData(114, 'Ununquadium', 'Uuq', NULL);
submitData(115, 'Ununpentium', 'Uup', NULL);
submitData(116, 'Ununhexium', 'Uuh', NULL);
submitData(117, 'Ununseptium', 'Uus', NULL);
submitData(118, 'Ununoctium', 'Uuo', NULL);


*/