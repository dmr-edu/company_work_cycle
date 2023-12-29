export class Developer {
  constructor(profession) {
    this.profession = profession;//специальность
    this._freeDays = 0;//кол-во свободных дней
    this._countDoneProjects = 0;//кол-во готовых проектов
    this._isFree = true;//занят или нет
  }
  incDay() {// увеличиваем свободные дни
    if (this.isFree()) {
      this._freeDays++;
    }
  }
  setProject() {
    this._isFree = false;
    this._freeDays = 0;
  }
  setFree() {
    this._isFree = true;
    this._countDoneProjects++;
  }
  getCountDoneProjects() {
    return this._countDoneProjects;
  }
  isFree() {
    return this._isFree;
  }
  getFreeDays() {
    return this._freeDays;
  }
}