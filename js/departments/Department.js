export class Department {
  constructor() {
    this.developers = [];//разработчики
    this._boss = null;
  }
  setBoss(boss) {
    this._boss = boss;
  }
  update() {  //обрабатываем оповещение от издателя             
    this.checkDevsToDismiss();
    this.developers.forEach(dev => dev.incDay());
  }

  checkDevsToDismiss() {//проверяем разработчиков для увольнения
    let devsToDismiss = this.developers.filter(dev => { return dev.getFreeDays() > 3 });
    if (devsToDismiss.length) {
      devsToDismiss.sort((dev1, dev2) => { return dev1.getCountDoneProjects() - dev2.getCountDoneProjects() });
      let dismissedDev = devsToDismiss.pop();
      this._boss.incDismissedDevs();
      this.developers = this.developers.filter(dev => dev !== dismissedDev);
    }
  }

  distributeByDevs(projects) {  //метод распределения проектов по разработчикам
    let freeDevs = this.developers.filter(dev => { return dev.isFree() });
    while (projects.length && freeDevs.length) {
      let dev = freeDevs.pop();
      dev.setProject();
      let proj = projects.pop();
      proj.incCountDevelopers();
      this._boss.joinDevToProj(dev, proj);
    }
    if (projects.length) {//если есть проекты для разработки которых нет ресурсов, то возвращаем их директору
      this._boss.addRemainingProjs(projects);
    }
  }
}