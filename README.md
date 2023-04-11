
# The Element Search!

**DESCRIPTION:**

This app lets you search through the table of elements by property.


**INSTRUCTIONS:**
1. In terminal, start the json server `>> json-server --watch db.json`
2. Open the app by starting a second terminal and run `>> explorer.exe index.html`
3. `CTRL+C` to end the session




**HELP:**

If needed, you can copy and run the list at the end of load.js to repopulate an empty db.json file with basic information and rebuild the table from there.

Load.js includes the functions and data that I used to build db.json. 

**Adding a property to the Elements:**

In load.js, use `processArray()` by passing it an array of objects that you want to update properties for. The name of the property and the value is hard coded into the body and needs to be changed manually.



**KNOWN ISSUES:**

1. Horizontal scroll bar never becomes active because the table resizes itself to fit the container. This will become a problem as new table headers are added.
