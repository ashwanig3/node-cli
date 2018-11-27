#!/usr/bin/env node
const readline = require('readline');
const https = require('https');
const chalk = require('chalk');

const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInput.question('whats your username?', (ans) => {
    let url = `https://api.github.com/users/${ans}`;

    const options = {
        headers: {
            'User-Agent': 'Github-info',
            'Content-Type': 'application/json'
        }
    };

    https.get(url, options, (res) => {
        // console.log('check 2', res.statusCode)

        if(res.statusCode == 200) {
            console.log('check 4')
        } 

        let rawData = "";

        res.on('data', (data) => {
            rawData += data;    
        });

        res.on('end', () => {
            let one = JSON.parse(rawData);
            console.log(`\n${chalk.bold.red('Name')}\t\t :: \t${chalk.bold.underline.yellow(`${one.name}`)}`);
            console.log(`\n${chalk.bold.red('Followers')}\t\t :: \t${chalk.bold.yellow(`${one.followers}`)}`);
            console.log(`\n${chalk.bold.red('Following')}\t\t :: \t${chalk.bold.yellow(`${one.following}`)}`);
            console.log(`\n${chalk.bold.red('Public-repos')}\t\t :: \t${chalk.bold.yellow(`${one.public_repos}`)}`);
            
            
            userInput.close();
        })
    }
)
})

