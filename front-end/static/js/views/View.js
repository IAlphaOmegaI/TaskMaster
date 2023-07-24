//imports
import AbstractView from "./AbstractView.js";
import {
  storage,
  auth,
  db,
  provider,
  defaults,
} from "/static/js/consts.js";
//outside imports
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
//
function addObjectToSet(set, obj) {
  // Check if the set already contains an object with the same content
  for (const item of set) {
    if (JSON.stringify(item) === JSON.stringify(obj)) {
      // The set already contains an object with the same content, so don't add the new object
      return;
    }
  }

  // The set does not contain an object with the same content, so add the new object
  set.add(obj);
}
const dynamicViewInteraface = {
  'todo': async ({id}, appFunc, navFunc) => {
    //when you come here you come with an id from th link that you were routed from
    //so for example you pressed the link /todo/192 so that 192 is the id that we'll go and request to firebase
    //here we go request the specific doc
    const loggedInOrNot = window.globals.verified;
    let appContents, navContents;
    if(loggedInOrNot){
      const docRef = doc(db, "notes", id);
      const docData = await getDoc(docRef);
      if(docData.exists()){
        //here the document itself exists
        //the app func here is the note builder in /todo/:id
        //this is a typical docData response
        // {
        //   noteConfigs: {
        //     noteColor: noteColor,
        //     noteFont: noteFont,
        //     noteBackground: noteBackground,
        //     notePaper: notePaper,
        //   },
        //   noteName: noteName,
        //   noteValue: noteValue,
        //   hashtagsArray: [],
        //   noteId: '',
        // };
        const {noteName, noteValue, hashtagsArray, noteConfigs } = docData.data();
        appContents = appFunc(noteValue, noteConfigs, hashtagsArray , id);
        navContents = navFunc(noteName, noteConfigs)
      }else{
        //the document doesen't exist
        history.pushState(null, null, 'new-note');
        appContents = appFunc('', {
          noteBackground: 'pattern-1',
          notePaper: 'pattern-1',
          noteColor: 'black',
          noteFont: 'ballpoint'
        }, [], 'new-note');
        navContents = navFunc('New Note', {
          noteBackground: 'pattern-1',
          noteColor: 'black',
          noteFont: 'ballpoint'
        })
      }
    } else {
      //user is not logged in
      const noteData = window.globals.notes[id];
       if(noteData){
        //note exists
        const {noteName, noteValue, hashtagsArray, noteConfigs } = noteData;
        appContents = appFunc(noteValue, noteConfigs, hashtagsArray , id);
        navContents = navFunc(noteName, noteConfigs)
       } else {
        //note doesen't exist
        history.pushState(null, null, 'new-note');
        appContents = appFunc('', {
          notePaper: 'pattern-1',
          noteBackground: 'pattern-1',
          noteColor: 'black',
          noteFont: 'ballpoint'
        }, [], 'new-note');
        navContents = navFunc('New Note', {
          noteBackground: 'pattern-1',
          noteColor: 'black',
          noteFont: 'ballpoint'
        })
       }
    }
    //we should also deal with the navbar
    
    return{
      appContents: appContents,
      navContents: navContents, 
    }
  },
  'home': async (params, appFunc, navFunc) => {
    //what is dynamic about home is the notes, with the argument name if notesArray, we either pull this from the local storage or if the user is logged in
    //we pull that information from the firebase, which are all convienently accessiable from the window.globals
    //this is what a typical user object would look like
    // {
    //   metaData: null,
    //   info: {
    //     uid: randomHexGenerator(),
    //     name: 'User',
    //     email: 'local.user@task-master.com',
    //     profilePicture: defaults.defaultProfilePicture,
    //     folders: [
    //       {
    //         name: 'Notes',
    //         className: 'edit',
    //         hashtagsArr: [],
    //         noteIds: [],
    //       },
    //       {
    //         name: 'ToDo-s',
    //         className: 'assept-document',
    //         hashtagsArr: [],
    //         noteIds: [],
    //       },
    //       {
    //         name: 'Music',
    //         className: 'music',
    //         hashtagsArr: [],
    //         noteIds: [],
    //       },
    //       {
    //         name: 'Movies',
    //         className: 'camera-movie',
    //         hashtagsArr: [],
    //         noteIds: [],
    //       },
    //     ]
    //   },
    // },
    //we firstly pull the information 
    const userInfo = window.globals.user.info;
    const loggedInOrNot = window.globals.verified;
    //we should merge all the arrays into one
    const hashtagsSet = new Set();
    const notesArray =  [];
    //
      for ( let folderId of Object.keys(userInfo.folders)) {
        const folder = userInfo.folders[folderId];
        const folderLocation = folder.name;
        for ( let id of folder.noteIds ) {
          //we go and request the id in the firebase
          if(loggedInOrNot){
              const docRef = doc(db, "notes", id);
              const docData = await getDoc(docRef);
              //the doc will always exist since it was in the noteIds array in the first place
              notesArray.push({
                ...docData.data(),
                noteLocation: folderLocation,
              });
              //we also get all the note hashtags and form a set with them
              const {hashtagsArray} = docData.data();
              hashtagsArray.forEach( hashtag => hashtagsSet.add({
                hashtagLocation: folderLocation,
                value: hashtag.toLowerCase(),
              }))
            } else {
              //user is not linked to the database
              notesArray.push(window.globals.notes[id]);
              // console.log(window.globals.notes[id])
              const {hashtagsArray} = window.globals.notes[id];
              hashtagsArray.forEach( hashtag => addObjectToSet( hashtagsSet, {
                hashtagLocation: folderLocation,
                value: hashtag.toLowerCase(),
              }))
              // console.log(hashtagsSet)
            }

          } 
      }
    return{
      appContents : await appFunc(notesArray, Array.from(hashtagsSet)),
      //and also dealing with the navbar
      navContents: navFunc(userInfo, window.globals.verified),
    }

  },
  'account': (params, appFunc, navFunc) => {
    return{
      appContents: appFunc(),
      navContents: navFunc(),
    };
  },
}
export default class extends AbstractView {
  constructor(title, params) {
    super(params);
    this.setTitle(title);
    this.params = params;
    console.log(params)
  }
  async getHtml(source) {
    const reqLoc = `/static/views/${source}/`
    const appImport = await import(`${reqLoc}index.js`);
    const navImport = await import(`${reqLoc}nav.js`);
    const appContentsReturner = appImport.default;
    const navContentsReturner = navImport.default;
    //
    const {appContents, navContents} = await dynamicViewInteraface[source](this.params, appContentsReturner, navContentsReturner)
    return {
      appContents: appContents,
      navContents: navContents,
    };
  }
}
