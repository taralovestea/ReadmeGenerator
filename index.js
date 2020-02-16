const inquirer = require("inquirer");
const axios= require("axios");
const fs = require("fs")


const questions = [
{
    type: "input",
    name: "username",
    message: "What is your github username?"
},
{
    type: "input",
    name: "project",
    message: "What is your project title?"
},
{
    type: "input",
    name: "description",
    message: "What is a description of your project?"
},
{
    type: "input",
    name: "contents",
    message: "What is the table of contents"
},
{
    type: "list",
    name: "installation",
    choices: ["cdRom", "zip", "magic"]
},
{
    type: "input",
    name: "usage",
    message: "what is the use???"
},
{
    type: "input",
    name: "license",
    message: "what is the license??"
},
{
    type: "input",
    name: "test",
    message: "what is the test??"
},

];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(){
        console.log("Success")
    })
}

function init() {
    inquirer.prompt(questions).then(function(data){
        // console.log(data)
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios
        .get (queryUrl)
        .then(function(res) {
            var image= (res.data.avatar_url)
            var bio= (res.data.bio)

            let combinedData = {
                ...data,
                image: image,
                bio: bio,

            }
            console.log(combinedData)

            let text = ` ## USER DATA 
            ${combinedData.bio}
            ${data.username}

            ## PROJECT NAME 
            ${data.project}

            ## DESCRIPTION 
            ${data.description}

            ## TABLE OF CONTENTS 
            ${data.contents}

            ## INSTALLATION 
            ${data.installation}

            ## USAGE 
            ${data.usage}

            ## LICENSE 
            ${data.license}

            ## TEST 
            ${data.test}

            `


            writeToFile(res.data.login + ".txt", text )
        })

    })


}
    init();

