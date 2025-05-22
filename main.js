const fs = require('fs');

function getFile(fileName) {
    try {
        const data = fs.readFileSync(fileName);
        return data.toString();
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
        return null;
    }
}

async function fetchApi(word) {
    const url = "https://twoblade.com/api/username/check?username=" + word;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(`Error fetching "${word}": ${error.message}`);
    }
}

let unclaimed = "CHECKED @ " + new Date().toString()+"\n";

async function checkFile(fileName) {
    const content = getFile(fileName);
    if (!content) return;

    const words = content.split("\n");
    for (const word of words) {
        const data = await fetchApi(word.trim());
        console.log(word.trim(), data);
        if (!data.error) unclaimed += word.trim() + "\n";
    }

    fs.writeFile('avaliable.txt', unclaimed, err => {
        if (err) {
          console.error(err);
        } else {
            console.log("We did it :)")
        }
    });      
}

checkFile("words.txt");
