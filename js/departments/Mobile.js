import { Developer } from "../Developer.js";
import { Department } from "./Department.js";

export class Mobile extends Department {
  getName() {
    return 'mobile';
  }
  addDeveloper() {//шаблон фабричный метод(каждый отдел добавляет соответствующего разработчика)
    let dev = new Developer('mobile');
    this.developers.push(dev);
  }
  distributeByDevs(projects) {  //метод распределения проектов по разработчикам
    let freeDevs = this.developers.filter(dev => { return dev.isFree() });
    while (projects.length && freeDevs.length) {
      let dev = freeDevs.pop();
      dev.setProject();
      let proj = projects.pop();
      proj.incCountDevelopers();
      this._boss.joinDevToProj(dev, proj);
      if (proj.getComplexity() > proj.getCountDevelopers()) {//если к проекту можно добавить разработчика, то пока оставляем проект
        projects.unshift(proj);
      }
    }
    if (projects.length) {//если есть проекты для разработки которых нет ресурсов, то возвращаем их директору
      let projectsToRemain = projects.filter(proj => { return proj.getCountDevelopers() == 0 });
      this._boss.addRemainingProjs(projectsToRemain);
    }
  }
}