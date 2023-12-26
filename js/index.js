import { EventManager } from "./EventManager.js";
import { Company } from "./Company.js";
import { Mobile } from "./departments/Mobile.js";
import { Qa } from "./departments/Qa.js";
import { Web } from "./departments/Web.js";
import { Boss } from "./Boss.js";

const startBtn = document.querySelector('.form__button-start');

startBtn.addEventListener('click', () => {
  const daysField = document.querySelector('#days');
  simulate((daysField.value));
})

function simulate(days) {
  var manager = new EventManager('inc_day', 'generate');
  var company = new Company(manager);
  var boss = new Boss();
  var web = new Web();
  var mobile = new Mobile();
  var qa = new Qa();

  company.setBoss(boss);
  company.addDepartment(web);
  company.addDepartment(mobile);
  company.addDepartment(qa);

  for (var i = 0; i < days; i++) {
    company.generateNewProjs();
    company.incDay();
  }

  const projectsCountNode = document.querySelector('#projects-count');
  console.log(`Выполнено проектов: ${company.getDoneProjects()};`);
  projectsCountNode.innerHTML = company.getDoneProjects();

  const employedDevsNode = document.querySelector('#employed-devs-count');
  console.log(`Принято программистов: ${company.getEmployedDevs()};`);
  employedDevsNode.innerHTML = company.getEmployedDevs();

  const firedDevsNode = document.querySelector('#fired-devs-count');
  console.log(`Уволенно программистов: ${company.getDismissedDevs()}.`);
  firedDevsNode.innerHTML = company.getDismissedDevs();

}
