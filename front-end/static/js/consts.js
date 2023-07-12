//outisde exports
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getStorage, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
//we set the tempalte data into the local storage if there isnt any
if(!localStorage.globals){
    localStorage.globals = {
        user: {
            metaData: null,
            info: {
              uid: userCredential.user.uid,
              name: 'User',
              email: 'local.user@task-master.com',
              profilePicture: hostedImageURL,
              folders: [
                {
                  name: 'Notes',
                  className: 'edit',
                  hashtagsArr: [],
                  noteIds: [],
                },
                {
                  name: 'ToDo-s',
                  className: 'assept-document',
                  hashtagsArr: [],
                  noteIds: [],
                },
                {
                  name: 'Music',
                  className: 'music',
                  hashtagsArr: [],
                  noteIds: [],
                },
                {
                  name: 'Movies',
                  className: 'camera-movie',
                  hashtagsArr: [],
                  noteIds: [],
                },
              ]
            },
          },
        notes: {},
    }
}
//GLOBAL VARIABLES AND CHANGE MONITORING
//init of the private var
let _globals = JSON.parse(localStorage.globals);
Object.defineProperty(window, 'globals', {
    get() {
        return _globals;
    },
    set(value) {
        _globals = value;
        localStorage.globals = JSON.stringify(globals)
    }
})
//the init of global variables, here we'll need to set some default values instead of empty and null
//initilization of the storage and authentication constants
const storage = getStorage(window.app);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
//
const defaults = {
    defaultProfilePicture: '/static/assets/images/overall/default-profile-picture.jpg',
}
export { storage, auth, provider, db, defaults,}