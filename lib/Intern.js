const Employee = require("./Employee");

class Intern {
  constructor(id, school) {
    this.id = id;
    this.school = school;
  }

  getRole() {
    return "Intern";
  }
}