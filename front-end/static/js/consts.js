//outisde exports
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getStorage, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
//the init of global variables
const globals = {
    user: null,
    notes: {},
}
//initilization of the storage and authentication constants
const storage = getStorage(window.app);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
//
const defaults = {
    defaultProfilePicture: '/static/assets/images/overall/default-profile-picture.jpg',
}

export {globals, storage, auth, provider, db, defaults,}