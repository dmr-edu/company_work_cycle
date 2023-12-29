import { Department } from "./Department.js";
import { Developer } from "../Developer.js";

export class Qa extends Department {
  addDeveloper() {
    let dev = new Developer('qa');
    this.developers.push(dev);
  }
  getName() {
    return 'qa';
  }
}