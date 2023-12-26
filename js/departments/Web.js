import { Department } from "./Department";
import { Developer } from "../Developer";

export class Web extends Department {
  addDeveloper() {
    let dev = new Developer('web');
    this.developers.push(dev);
  }
  getName() {
    return 'web';
  }
}