import { Department } from "./Department";
import { Developer } from "../Developer";

export class Qa extends Department {
  addDeveloper() {
    let dev = new Developer('qa');
    this.developers.push(dev);
  }
  getName() {
    return 'qa';
  }
}