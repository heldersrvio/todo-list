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
        projectId: "todo-list-c001f"
    };
    
    firebase.initializeApp(firebaseConfig);
    const database = firebase.firestore();
    const provider = new firebase.auth.GoogleAuthProvider();

    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.id = 'main-container';

    const signInOut = () => {
        if (_user === null) {
            signIn();
        } else {
            signOut();
        }
    }

    const signOut = () => {
        firebase.auth().signOut();
        _user = null;
    };

    const signIn = () => {
        console.log('Signing in...')
        firebase.auth().signInWithRedirect(provider);
    };

    const clearMainContainer = () => {
        while (container.firstChild !== null) {
            container.removeChild(container.lastChild);
        }
    };

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            _user = user;
            const photoURL = user.providerData[0].photoURL;
            const id = user.providerData[0].uid;

            database.collection('users').doc(id).set({
                userId: id,
                profilePictureURL: photoURL,
            }, {merge: true});

            database.collection('users').doc(id).get().then((doc) => {
                if (doc.exists) {
                    console.log('Doc exists');
                    pL = createProjectList(doc.data(), database.collection('users').doc(id));
                    pd = projectDisplay(document, container, pL);
                }
                clearMainContainer();
                createTopBar(document, container, pd.clearMainScreen, pd.todayDisplay, signInOut, true, photoURL);
                createProjectsTab(document, container, pd.clearMainScreen, pd.createProjectDisplay, pL);
            });
        } else {
            _user = null;
            clearMainContainer();
            createTopBar(document, container, pd.clearMainScreen, pd.todayDisplay, signInOut, false);
            createProjectsTab(document, container, pd.clearMainScreen, pd.createProjectDisplay, pL);
        }
    });

    let pL = createProjectList();
    let pd = projectDisplay(document, container, pL);
    createTopBar(document, container, pd.clearMainScreen, pd.todayDisplay, signInOut);
    createProjectsTab(document, container, pd.clearMainScreen, pd.createProjectDisplay, pL);
    body.appendChild(container);

}