import { Project } from './Project.js';
import { Boss } from './Boss.js';

export class Company {
  constructor(manager) {
    this.eventManager = manager;//менеджер событий(шаблон наблюдатель - издатель будет опевещать подписчиков о событиях)
    this._employedDevs = 0;// принятые программисты
    this._dismissedDevs = 0;// уволенные программисты
    this._doneProjects = 0;// кол-во выполненых проектов
    this._departments = [];
    this._newProjects = [];
    this._boss = null;
  }
  unsubscribe(event, listener) {//метод для отписывания подписчика события
    this.eventManager.unsubscribe(event, listener);
  }
  setBoss(boss) {
    if (boss instanceof Boss) {
      this._boss = boss;
      this._boss.setCompany(this);
      this._departments.forEach(dep => {
        dep.setBoss(boss);
        this._boss.addDepartment(dep);
      });
      this.eventManager.subscribe('generate', this._boss);
    }
  }
  generateNewProjs() {//компания получает новые проекты
    let countNewProj = Math.floor((Math.random() * 4) + 1);
    for (var j = 0; j < countNewProj; j++) {
      this._newProjects.push(new Project(this._boss));
    }
    this.eventManager.subscribe('inc_day', ...this._newProjects);//подписываем проекты на событие 'inc_day' - увеличение дня
    this.eventManager.notify('generate', this._newProjects);//уведомляем директора о новых проектах
    this._newProjects = [];//сбрасываем новые проекты
  }
  incDay() {//добавляем день               
    this.eventManager.notify('inc_day', null);//уведомляем подписчиков
  }
  incEmployedDevs() {// увеличиваем кол-во нанятых программистов
    this._employedDevs++;
  }
  addDepartment(dep) {//добавляем департамент
    this._departments.push(dep);
    this._boss.addDepartment(dep);
    dep.setBoss(this._boss);
    this.eventManager.subscribe('inc_day', dep);//подписываем департамент на событие
  }
  getEmployedDevs() {
    return this._employedDevs;
  }
  incDismissedDevs() {//увеличиваем кол-во уволенных программистов
    this._dismissedDevs++;
  }
  getDismissedDevs() {
    return this._dismissedDevs;
  }
  incDoneProjects() {//увеличиваем число выполненых проектов на 1
    this._doneProjects++;
  }
  getDoneProjects() {
    return this._doneProjects;
  }
}