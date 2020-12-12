const Employee = require("./Employee");

class Manager {
  constructor(id, officeNumber) {
    this.id = id;
    this.officeNumber = officeNumber;
  }

  getRole() {
    return "Manager";
  }
}