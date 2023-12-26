import { Department } from "./Department.js";
import { Developer } from "../Developer.js";

export class Web extends Department {
  addDeveloper() {
    let dev = new Developer('web');
    this.developers.push(dev);
  }
  getName() {
    return 'web';
  }
}