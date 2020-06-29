export default function createTopBar(doc, container, clearMainScreen, exhibitTodayProjects){
    const topBar = doc.createElement('div');
    topBar.id = 'top-bar';
    
    const titleDiv = doc.createElement('div');
    titleDiv.id = 'title-container';
    const title = doc.createElement('h1');
    title.textContent = "Todo List";
    titleDiv.appendChild(title);
    topBar.appendChild(titleDiv);

    const todayButtonDiv = doc.createElement('div');
    todayButtonDiv.id = 'today-container';
    const todayButton = doc.createElement('button');
    todayButton.id = 'today-button';
    todayButton.textContent = "Today";
    todayButton.addEventListener('click', e => {
        clearMainScreen();
        exhibitTodayProjects();
    });
    todayButtonDiv.appendChild(todayButton);
    topBar.appendChild(todayButtonDiv);

    container.appendChild(topBar);
};