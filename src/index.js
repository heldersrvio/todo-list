import createProjectsTab from './projectsTabDOM';
import createTopBar from './topBarDOM';

const body = document.querySelector('body');
const container = document.createElement('div');

createTopBar(document, container, e => { console.log("Hi"); }, e => { console.log("Hey, there"); });
createProjectsTab(document, container, e => { console.log("Hi"); }, e => { console.log("Hey, there"); });
body.appendChild(container);