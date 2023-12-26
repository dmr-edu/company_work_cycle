export class Boss {//директор выступит в качестве посредника
  constructor() {
    this._projsInDevelopment = new Map();//коллекция для группировки проектов с разработчиками(ключ - проект, значение ключа - разработчики)
    this.remainingProjects = new Array();
    this._departments = [];
    this.projectsToTest = [];
    this._company = null;
  }
  setCompany(company) {
    this._company = company;
  }
  joinDevToProj(dev, proj) {//добавляем разработчика к проекту
    proj.stopWaiting();
    if (this._projsInDevelopment.has(proj)) {//если уже есть такой проект, то просто добавляем разработчика
      this._projsInDevelopment.get(proj).push(dev);
    } else {// иначе создаем новую пару
      this._projsInDevelopment.set(proj, [dev])
    }
  }
  incDismissedDevs() {
    this._company.incDismissedDevs();
  }
  removeProject(proj) {//удаляем проект
    let devs = this._projsInDevelopment.get(proj);
    devs.forEach(dev => {
      dev.setFree();
    });
    this._projsInDevelopment.delete(proj);
    this._company.unsubscribe('inc_day', proj);//отписываем от события
    this._company.incDoneProjects();
  }
  addDepartment(dep) {
    this._departments.push(dep);
  }
  addRemainingProjs(projects) {// добавляем оставшийся проект
    projects.forEach(proj => proj.wait());//ржидают разработчика
    this.remainingProjects = this.remainingProjects.concat(projects);
  }
  update(data) {//обрабатываем оповешение о событие
    if (this.remainingProjects.length) {//если есть оставшиеся проекты, то 
      this.employDevs();// нанимаем новых разработчиков
      this.distrProjects(this.remainingProjects);
      this.remainingProjects = [];
    }
    let projects = data.concat(this.projectsToTest);//распределяем новые проекты и проекты для тестирования
    this.projectsToTest = [];
    this.distrProjects(projects);
  }
  distrProjects(projectsToDistr) {//распределяем проекты
    this._departments.forEach(dep => {
      let projects = projectsToDistr.filter(proj => { return proj.getType() == dep.getName() });
      dep.distributeByDevs(projects);
    });
  }
  addProjectToTest(project) {//добавляем проект готовый к тестированию
    this.projectsToTest.push(project);
  }
  employDevs() {// нанимаем новых программистов для реализации оставшихся проектов
    this._departments.forEach(dep => {
      let projects = this.remainingProjects.filter(rProj => { return rProj.getType() == dep.getName() });
      projects.forEach(() => dep.addDeveloper());//шаблон фабричный метод(добавит каждому отделу соответствующего разработчика)
      this._company.incEmployedDevs();
    })
  }
}