const Employee = require("./Employee");
const githubPrefix = "https://github.com/"

class Engineer {
  constructor(id, github) {
    this.id = id;
    this.github = github;
  }

  getGithub() {
    console.log("getGithub was called:" + githubPrefix + github);
  }

  getRole() {
    return "Engineer";
  }
}