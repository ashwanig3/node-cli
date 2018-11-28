#!/usr/bin/env node
const readline = require('readline');
const https = require('https');
const chalk = require('chalk');
var elegantSpinner = require('elegant-spinner');
var logUpdate = require('log-update');

const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInput.question(`${`Select any:\n1-github single user info \n. 2-Two user battle`}\n`,  (ans) => {
    if(ans === "1") {
        userInput.question('Enter your username\n', (username) => {
    let url = `https://api.github.com/users/${username}`;

    const options = {
        headers: {
            'User-Agent': 'Github-info',
            'Content-Type': 'application/json'
        }
    };

    https.get(url, options, (res) => {

        if(res.statusCode == 200) {
            console.log('')
        } else{
            console.log("Unable to get data")
        }

        let rawData = "";

        res.on('data', (data) => {
            rawData += data;    
        });

        res.on('end', () => {
            let one = JSON.parse(rawData);
            console.log(`\n${chalk.bold.red('Name')}\t\t\t :: \t${chalk.bold.underline.yellow(`${one.name}`)}`);
            console.log(`\n${chalk.bold.red('Followers')}\t\t :: \t${chalk.bold.yellow(`${one.followers}`)}`);
            console.log(`\n${chalk.bold.red('Following')}\t\t :: \t${chalk.bold.yellow(`${one.following}`)}`);
            console.log(`\n${chalk.bold.red('Public-repos')}\t\t :: \t${chalk.bold.yellow(`${one.public_repos}`)}`);
            
            
            userInput.close();
        })
    }
)
})

} 
    else if(ans === "2") {
        user1 = '';
        user2 = '';

        const options = {
            headers: {
                'User-Agent': 'Github-info',
                'Content-Type': 'application/json'
            }
        };
        userInput.question(`Enter first username: `, (ans) => {
            https.get(`https://api.github.com/users/${ans}`, options, (res) => {
                res.on('data', (data) => {
                    user1 += data
                })
                userInput.question('Enter second username:', (ans) => {
                    https.get(`https://api.github.com/users/${ans}`,options, (res) => {
                        res.on('data', (d) => {
                            user2 += d
                        })
                                res.on('end', () => {
                                    let one = JSON.parse(user1);
                                console.log(`\n${chalk.bold.red('Name')}\t\t\t :: \t${chalk.bold.underline.yellow(`${one.name}`)}`);
                                console.log(`\n${chalk.bold.red('Followers')}\t\t :: \t${chalk.bold.yellow(`${one.followers}`)}`);
                                console.log(`\n${chalk.bold.red('Following')}\t\t :: \t${chalk.bold.yellow(`${one.following}`)}`);
                                console.log(`\n${chalk.bold.red('Public-repos')}\t\t :: \t${chalk.bold.yellow(`${one.public_repos}`)}`);
                                
                                let two = JSON.parse(user2);
                                console.log(`\n${chalk.bold.red('Name')}\t\t\t :: \t${chalk.bold.underline.yellow(`${two.name}`)}`);
                                console.log(`\n${chalk.bold.red('Followers')}\t\t :: \t${chalk.bold.yellow(`${two.followers}`)}`);
                                console.log(`\n${chalk.bold.red('Following')}\t\t :: \t${chalk.bold.yellow(`${two.following}`)}`);
                                console.log(`\n${chalk.bold.red('Public-repos')}\t\t :: \t${chalk.bold.yellow(`${two.public_repos}`)}`);

                                 if(one.public_repos > two.public_repos) {
                                     console.log(`winner: ${one.name}`)
                                 } else {
                                     console.log(`winner: ${two.name}`)
                                 } 
                                    userInput.close();
                                })
    
                                
                    })
                })
            })
            
        })
    }
})

