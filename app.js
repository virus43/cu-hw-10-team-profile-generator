const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
 
let team = []

if (require.main === module) { 
    addMember(); 
}

function addMember() {
    inquirer
        .prompt([
            {
                name: "name",
                message: "Enter team member's name"
            },
            {
                type: "list",
                name: "role",
                message: "Select team member's role",
                choices: ["Manager","Engineer","Intern"]
            },
            {
                name: "id",
                message: "Enter team member's id"
            },
            {
                name: "email",
                message: "Enter team member's email"
            }
        ])
        .then(answers => {

            switch(answers.role) {
                case "Manager":
                    info = "office number";
                    break;
                case "Engineer":
                    info = "github username";
                    break;
                case "Intern":
                    info = "school name";
                    break;
            };

            inquirer
                .prompt([
                    {
                        name: "additionalInfo",
                        message: `Enter team member's ${info}`
                    },
                    {
                        type: "list",
                        name: "addMore",
                        message: "Would you like to add more members?",
                        choices: ['Yes', 'No']
                    }

                ])
                .then(data => {
                    switch(answers.role) {
                        case "Manager":
                            obj = new Manager(answers.name,answers.id,answers.email,data.additionalInfo);
                        
                            break;
                        case "Engineer":
                            info = "github username";
                            obj = new Engineer(answers.name,answers.id,answers.email,data.additionalInfo);
                            break;
                        case "Intern":
                            info = "school name";
                            obj = new Intern(answers.name,answers.id,answers.email,data.additionalInfo);
                            break;
                    }

                    team.push(obj);
                    fs.writeFile(outputPath, render(team), function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    if(data.addMore ==='Yes') {
                        addMember();
                    }
                    else {
                        render(team);
                        // process.exit(1);
                        };

                })

        })
}