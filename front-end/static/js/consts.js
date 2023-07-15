//outisde exports
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getStorage, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
//we set the tempalte data into the local storage if there isnt any
//genrating a random hexadecimal number to save in the local storage in case user isnt logged in, we can also sync to firebase when the user logs in with this id
const randomHexGenerator = () =>
  Math.floor(Math.random() * 16777216)
    .toString(16)
    .padStart(6, "0");
//
const defaults = {
      defaultProfilePicture: '/static/assets/images/overall/default-profile-picture.jpg',
      templateUserData: {
        metaData: null,
        info: {
          uid: randomHexGenerator(),
          name: 'User',
          email: 'local.user@task-master.com',
          profilePicture: '/static/assets/images/overall/default-profile-picture.jpg',
          folders: {
            'Notes': {
              name: 'Notes',
              className: 'edit',
              hashtagsArr: [],
              noteIds: {},
            },
            'ToDo-s': {
              name: 'ToDo-s',
              className: 'assept-document',
              hashtagsArr: [],
              noteIds: {},
            },
            'Music': {
              name: 'Music',
              className: 'music',
              hashtagsArr: [],
              noteIds: {},
            },
            'Movies': {
              name: 'Movies',
              className: 'camera-movie',
              hashtagsArr: [],
              noteIds: {},
            },
          }
        },
      },
}
//
if(!localStorage.globals){
    localStorage.globals = JSON.stringify({
        verified: false,
        user: defaults.templateUserData,  
        notes: {},
        noteLocation: 'Notes',
    })
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
        console.log('%cState updated', 'backgroundColor:grey; color:blue')
        localStorage.globals = JSON.stringify(value)
    }
})
//the init of global variables, here we'll need to set some default values instead of empty and null
//initilization of the storage and authentication constants
const storage = getStorage(window.app);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
//

export { storage, auth, provider, db, defaults, randomHexGenerator}