const { program } = require('commander');
const {prompt} = require('inquirer')
const {
    listCatalog, 
    listConfiguration,
    calculatePrice
} = require('./index')

const questions = [
    {
        type: 'input',
        name: 'numberOfBicycle',
        message: 'Enter the number of bicycle - '
    },
    {
        type: 'input',
        name: 'failureRate',
        message: 'Enter failure rate (in percentage)- '
    }
]

program.version('0.0.1');

//List Catalogs
program
    .command('list-catalog')
    .alias('ls-ca')
    .description('List all the components available for the Bicycle')
    .action(() => listCatalog())

//List Configuration
program
    .command('list-config')
    .alias('ls-cf')
    .description('List all the configurations selected for the Bicycle')
    .action(() => listConfiguration())

//Calculate price of given number of Bicycle
program
    .command('calculate')
    .alias('c')
    .description('Calculate price of Bicycles')
    .action(() => prompt(questions).then(answers => calculatePrice(answers)))

program.parse(process.argv)