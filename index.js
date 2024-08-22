const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const crypto = require('crypto');

const FILE_PATH = './data.json';

const randomInt = (min, max) => {
    return crypto.randomInt(min, max + 1); // Generate a random integer between min and max (inclusive)
};

const makeCommit = async (n) => {
    if (n === 0) {
        await simpleGit().push();
        return;
    }
    
    const x = randomInt(0, 54);
    const y = randomInt(0, 6);
    const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, "w").add(y, 'd').format();

    const data = { date: DATE };
    
    jsonfile.writeFile(FILE_PATH, data, async () => {
        console.log(DATE);
        await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE });
        makeCommit(n - 1);
    });
};

makeCommit(100);
