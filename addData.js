module.exports = addingData;

function addingData(addition) {
    const fs = require("fs");
    //The object to be added
    fs.readFile("./public/posts.json", "utf8", function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(data); //now converting it to an object
            obj.push(addition); //adding the data
            var json = JSON.stringify(obj, null, 2); //converting it back to json
            fs.writeFile("./public/posts.json", json, "utf8", (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Done");
                }
            });
        }
    });
}