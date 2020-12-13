const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Ask questions realting to the team manager
const askManager = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is your Manager\'s name?',
        name: 'managerName',
      },
      {
        type: 'input',
        message: 'What is your Manager\'s id?',
        name: 'managerId',
      },
      {
        type: 'input',
        message: 'What is your Manager\'s email address?',
        name: 'managerEmail',
      },
      {
        type: 'input',
        message: 'What is your Manager\'s office number?',
        name: 'managerOfficeNum',
      },
    ])
    .then((res) => {
      const manager = new Manager(res.managerName, res.managerId, res.managerEmail, res.managerOfficeNum)
      team.push(manager);
      askWhatRole();
    });
};

// Routine to add another employee or trigger the page creation routine
const askWhatRole = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'newEmployeeType',
      message: 'Which type of team member would you like to add this this team?',
      choices: ["Engineer", "Intern", "I don't want to add anyone else"]
    },
  ])
  .then((res) => {
    switch (res.newEmployeeType) {
      case "Engineer":
        askEngineer();
        break;
      case "Intern":
        askIntern();
        break;
      default:
        generatePage();
        break;
    }
  });
};

// Ask the engineer related questions
const askEngineer = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is your Engineer\'s name?',
      name: 'engineerName',
    },
    {
      type: 'input',
      message: 'What is your Engineer\'s id?',
      name: 'engineerId',
    },
    {
      type: 'input',
      message: 'What is your Engineer\'s email address?',
      name: 'engineerEmail',
    },
    {
      type: 'input',
      message: 'What is your Engineer\'s GitHub username?',
      name: 'engineerGitHub',
    },
  ])
  .then((res) => {
    const engineer = new Engineer(res.engineerName, res.engineerId, res.engineerEmail, res.engineerGitHub)
    team.push(engineer);
    askWhatRole();
  });
};

// Ask the intern related questions
const askIntern = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is your Intern\'s name?',
      name: 'internName',
    },
    {
      type: 'input',
      message: 'What is your Intern\'s id?',
      name: 'internId',
    },
    {
      type: 'input',
      message: 'What is your Intern\'s email address?',
      name: 'internEmail',
    },
    {
      type: 'input',
      message: 'What school did your Intern attend?',
      name: 'internSchool',
    },
  ])
  .then((res) => {
    const intern = new Intern(res.internName, res.internId, res.internEmail, res.internSchool)
    team.push(intern);
    askWhatRole();
  });
};

// gathers the info provided and creates HTML content containing it
const generatePage = () => {
  const generatedHTML = render(team);
  createTeamPage(generatedHTML);
}

// function that takes the generated HTML content and writes it to the output folder as an HTML file.
const createTeamPage = (htmlContent) => {
  fs.writeFile(outputPath, htmlContent, "utf-8", (err) => {
    if(err) throw err;
    console.log("Team page has been created successfully. You will find it in the output folder.");
  })
}

// Start the app by asking about the manager
askManager()
