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

async function checkFile(fileName) {
    const content = getFile(fileName);
    if (!content) return;

    const words = content.split("\n");
    for (const word of words) {
        const trimmedWord = word.trim();
        if (!trimmedWord) continue;

        const data = await fetchApi(trimmedWord);
        console.log(trimmedWord, data);
        if (data && data.available === true){
            unclaimed += trimmedWord + "\n";
            fs.writeFileSync('avaliable.txt', unclaimed);
        }
    }
    console.log("Finished checking all words.");
}

checkFile("words.txt");
