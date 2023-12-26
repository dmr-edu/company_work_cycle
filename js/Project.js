export class Project {
  constructor(boss) {
    this._boss = boss;//директор - посредник
    this._complexity = Math.floor(Math.random() * 3 + 1);  //сложность проекта
    this._type = Math.floor(Math.random() * 2 + 1) == 1 ? 'web' : 'mobile';  //тип проекта
    this._daysOfDevelopment = 0;//текущее кол-во дней на разработке
    this._countDevs = 0;
    this._isWaiting = true;//есле не поступил на разработку, то не будет увеличивать текущее кол-во дней на разработке при оповещении
  }
  wait() {//
    this._isWaiting = true;
  }
  stopWaiting() {
    this._isWaiting = false;
  }
  isWaiting() {
    return this._isWaiting;
  }
  getComplexity() {
    return this._complexity;
  }
  getType() {
    return this._type;
  }
  setType(type) {
    this._type = type;
  }
  incCountDevelopers() {//увеличить число программистов разрабатывающих проект
    this._countDevs++;
  }
  getCountDevelopers() {
    return this._countDevs;
  }
  getTimeToDo() {// количество дней для выполнения проекта 
    return Math.ceil(this._complexity / this._countDevs);
  }
  update() {//обрабатываем оповешение от издателя
    if (!this.isWaiting()) {
      this._daysOfDevelopment++;
      if (!(this.getType() == 'qa')) {
        if (this.getTimeToDo() == this._daysOfDevelopment) {
          this.setType('qa');
          this.wait();//ожидает тестировщика
          this._daysOfDevelopment = 0;
          this._boss.addProjectToTest(this);
        }
      } else {
        if (this._daysOfDevelopment == 1) {
          this._boss.removeProject(this);//удаляем готовый проект
        }

      }
    }
  }
}