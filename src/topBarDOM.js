export default function createTopBar(doc, container, clearMainScreen, exhibitTodayProjects, signIn){
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

    const signInButtonDiv = doc.createElement('div');
    signInButtonDiv.id = 'signIn-container';
    const signInButton = doc.createElement('button');
    signInButton.id = 'signIn-button';
    signInButton.textContent = 'Sign in with Google';
    signInButton.addEventListener('click', e => {
        signIn();
    });
    signInButtonDiv.appendChild(signInButton);
    topBar.appendChild(signInButtonDiv);

    container.appendChild(topBar);
};