const prompt = require('prompt')
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const main = () => {
    console.log('A CLI program that prints the contents of any text file');
    prompt.start()

    const properties = [
        {
            name: 'filePath',
            description: 'Enter the path of the file you want to view (relative or absolute)',
        }
    ];

    prompt.get(properties, async (error, input) => {
        
        if(error) {
            console.log(error);
        }
        const contents = await readFile(input.filePath, 'utf-8')
        console.log(contents);
    })
}

main()