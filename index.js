const prompt = require('prompt')
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const question = util.promisify(prompt.get)

main = () => {
    console.clear();
    console.log('-------------------------------------------------------');
    console.log('| A CLI program that prints the contents of any text file |');
    console.log('-------------------------------------------------------');
    prompt.start()

    const run = async () => {
        const properties = [
            {
                name: 'cmd',
                description: 'Enter your command',
            }
        ];

        try {
            viewOptions()
            const input = await question(properties)

            switch (input.cmd) {
                case 'q':
                    process.exit()
                    break;
                case 'v': {

                    const input = await question([{ name: 'filePath' , description: 'What is the path to the file (for example ./test.txt)'}])
                    const contents = await readFile(input.filePath, 'utf-8')
                    console.log(contents);
                    run()
                    break;
                }
                case 'w': {

                    const input = await question([{ name: 'filePath', description: 'What is the path to the file (for example ./test.txt)' }, { name: 'contents', description: 'Enter the content' }])
                    await writeFile(input.filePath, input.contents)
                    console.log('Operation completed!');
                    run()
                    break;
                }
                default:
                    run()
                    break;
            }
        } catch (error) {

            console.log(error);
        }
    }

    run()
}


const viewOptions = () => {
    const cmdOptions = `
'v' to view a file
'w' to write to a file
'q' to quit`
    console.log(cmdOptions);
    console.log('\n');
}

main()