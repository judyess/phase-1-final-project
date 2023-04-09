
# The Element Search!

**DESCRIPTION:**

This app lets you search through the table of elements by property.


**INSTRUCTIONS:**
1. in terminal, start the json server `>> json-server --watch db.json`
2. start a second terminal to run `>> explorer.exe index.html`
3. `CTRL+C` to end the session


Functions in load.js are for managing the element objects in db.json.

Adding a property to the Elements:

`processArray()` 
    is given an array which contains the atomic numbers of elements that belong to a particular category. Then it searches the elements that already exist in db.json with a GET-Fetch method. For each element in that array, addProperty() is called on it. The property being added and its value is hardcoded into the body of the function and needs to be updated with each new array. 
*See data.txt for elemental information and categories.

`addProperty()` 
    is passed an element object, and the categoryType and categoryValue of that array of elements from processArray() then it uses a POST-Fetch method to update that object to include a new property of categoryType:categoryValue.


**HELP:**

If needed, you can copy and run the list at the end of data.txt to repopulate an empty db.json file with basic information and rebuild the table from there.




**KNOWN ISSUES:**

1. Horizontal scroll bar never becomes active because the table resizes itself to fit the container. This will become a problem as new table headers are added.
