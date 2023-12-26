export class EventManager {//класс для создания менеджеров событий
  constructor(...events) {
    this.listeners = new Map();
    for (let event of events) {
      this.listeners.set(event, new Array());
    }
  }
  subscribe(event, ...listeners) {// подписать на событие
    for (let listener of listeners) {
      this.listeners.get(event).push(listener);
    }
  }
  unsubscribe(event, listener) {//отписать от события
    let listeners = this.listeners.get(event).filter((curent) => { return curent !== listener });
    this.listeners.set(event, listeners);
  }
  notify(event, data) {//уведомить подписчиков
    this.listeners.get(event).forEach(listener => listener.update(data));
  }
}