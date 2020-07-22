import * as firebase from 'firebase/app';
import projectDisplay from './projectDisplayDOM';
import createProjectsTab from './projectsTabDOM';
import createTopBar from './topBarDOM';
import createProjectList from './projectList';

export default function main(){

    let _user = null;

    const firebaseConfig = {
        apiKey: "AIzaSyAdQnv52HzLGn_uTg8dIhm3svpZaHqNGuo",
        authDomain: "todo-list-c001f.firebaseapp.com",
        databaseURL: "https://todo-list-c001f.firebaseio.com",
        projectId: "todo-list-c001f",
        storageBucket: "todo-list-c001f.appspot.com",
        messagingSenderId: "398972862468",
        appId: "1:398972862468:web:707e7182bffc0c4b003551",
        measurementId: "G-JEPRVFSR83"
    };
    
    firebase.initializeApp(firebaseConfig);
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            _user = user;
            const name = user.providerData[0].displayName;
            const photoURL = user.providerData[0].photoURL;

            const signInButton = document.getElementById('signIn-button');
            signInButton.textContent = 'Sign out';
            signInButton.onclick = (event) => {
                signOut();
            };
            const signInContainer = document.getElementById('signIn-container');
            const image = document.createElement('img');
            image.src = photoURL;
            signInContainer.insertBefore(image, signInButton);
        } else {
            _user = null;
            const signInButton = document.getElementById('signIn-button');
            const signInContainer = document.getElementById('signIn-container');
            signInButton.onclick = signIn;
            signInContainer.removeChild(document.querySelector('img'));
            signInButton.textContent = 'Sign in with Google';
        }
    });

    const signInOut = () => {
        if (_user === null) {
            signIn();
        } else {
            signOut();
        }
    }

    const signOut = () => {
        firebase.auth().signOut();
    };

    const signIn = () => {
        firebase.auth().signInWithRedirect(provider);
    };

    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.id = 'main-container';

    const pL = createProjectList();
    const pd = projectDisplay(document, container, pL);
    createTopBar(document, container, pd.clearMainScreen, pd.todayDisplay, signInOut);
    createProjectsTab(document, container, pd.clearMainScreen, pd.createProjectDisplay, pL);
    body.appendChild(container);

}