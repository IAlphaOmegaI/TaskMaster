// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
// } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
// } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
// //
// const storage = getStorage(window.app);
// const auth = getAuth();
// const GLOBALS = {
//   user:'',
//   notes: [],
// };
// //
// const accountStatusChangeHandler = (source) => {
//   //changing the profile picture, folders and profile-picture of the nav bar
//   const settingsRef = $("#nav-user");
//   const nameRef = $("#nav-username");
//   const profilePictureRef = $("#nav-profile-picture");
//   //
//   nameRef.text(source.info.name);
//   profilePictureRef.attr("src", source.info.profilePicture);
//   settingsRef
//     .children("i")
//     .removeClass("fa-arrow-right-to-bracket")
//     .addClass("fa-arrow-right-from-bracket");
//   settingsRef.children("span").text("Log Out");
//   settingsRef.attr("href", "").removeAttr("data-link")
//     .on("click", function () {
//       localStorage.user = null;
//       signOut(auth);
//       $(this)
//         .children("i")
//         .addClass("fa-arrow-right-to-bracket")
//         .removeClass("fa-arrow-right-from-bracket");
//       nameRef.text("User");
//       profilePictureRef.attr("src", defaultProfilePicture);
//       settingsRef.children("span").text("Log In");
//       setTimeout(() => {
//         settingsRef.attr("href", "/account").attr("data-link", "");
//       }, 100);
//     });
// };
// //
// if (
//   localStorage.getItem("user") != null &&
//   localStorage.getItem("user") != "null"
// )
//   accountStatusChangeHandler(JSON.parse(localStorage.getItem("user")));
// //
// localStorage.GLOBALS = {};
// let userValidity = true;
// //
// const defaultProfilePicture =
//   "https://firebasestorage.googleapis.com/v0/b/task-master-42453.appspot.com/o/images%2Fdefault-profile-picture.jpg?alt=media&token=72528a6a-2839-43b5-a992-dfd2d4a4430d";
// //the dialog/modal
// const dialog = $(`.modal`),
//   backdrop = $(".backdrop");
// //dialog closer
// $("#modal-exit, .backdrop").on("click", () => {
//   dialog.removeClass("active");
//   backdrop.removeClass("active");
// });
// //the error interface that translates the error message to something readable
// const errorInterface = {
//   "(auth/user-not-found)": {
//     title: "Email was not found!",
//     message:
//       "Please check your email, it either was typed wrong or this account does not exist!",
//   },
//   "(auth/wrong-password)": {
//     title: "Password incorrect!",
//     message: "Your password is incorrect!",
//   },
//   "(gen/general-error)": {
//     title: "Something went wrong!",
//     message: "Please try again later!",
//   },
//   "(auth/too-many-request)": {
//     title: "We've detected too many log-in attempts!",
//     message:
//       "Are you sure this is really your account? If so you can reset your password and try again later!",
//   },
//   "(auth/email-already-in-use)": {
//     title: "This Email is already in use!",
//     message: "Please log-in with an existing account or create a new one!",
//   },
//   "(auth/network-request-failed)": {
//     title: "Your Internet connection is weak!",
//     message: "Try again later with a stronger connection!",
//   },
//   "(auth/internal-error)": {
//     title: "We're facing some internal issues!",
//     message: "Please try again at a later time",
//   },
// };
// //the error formatter to reti=urn the important part of the error so we can translate it
// const errorFormmaterReturner = (error) => {
//   const regex = /\((.*?)\)/;
//   const match = error.toString().match(regex);
//   const errorID = match ? match[0] : "(gen/general-error)";
//   return errorID;
// };
// //the main error handler function
// const errorHandler = (error) => {
//   console.log(error);
//   dialog
//     .find("#dialog-title")
//     .text(errorInterface[errorFormmaterReturner(error)].title);
//   dialog
//     .find("#dialog-message")
//     .text(errorInterface[errorFormmaterReturner(error)].message);
//   dialog.addClass("active");
//   backdrop.addClass("active");
// };
// $(document).on("click", "[checkbox-input]", function () {
//   const s = $(this);
//   s.toggleClass("checked");
// });
// let filePath = "",
//   imageFile = null;
// $(document).on("change", "#profile-picture-input-signUp", function () {
//   imageFile = this.files[0];
//   const reader = new FileReader();
//   reader.onload = function (e) {
//     $("#picture-preview").attr("src", e.target.result).css("display", "block");
//     filePath = `images/${imageFile.name}`;
//   };
//   reader.readAsDataURL(imageFile);
// });
// const emptyFieldTriggerer = (field, extension = false, extensionText) => {
//   userValidity = false;
//   const title = field.siblings(".content-column-content-field-title");
//   field.addClass("error");
//   title.addClass("title-error");
//   if (extension) {
//     const target = field.parent().parent().siblings(".content-column-error");
//     target.text(extensionText);
//   }
// };

// $(document).on(
//   "input",
//   ".content-column-content-field-input.error",
//   function () {
//     $(this)
//       .removeClass("error")
//       .siblings(".content-column-content-field-title.title-error")
//       .removeClass("title-error");
//   }
// );
// // const accountHandler = () => {
// const userData = {};
// $(document).off("click", ".content-column-button");
// $(document).on("click", ".content-column-button", async function () {
//   $(".content-column-error").text("");
//   userValidity = true;
//   const s = $(this);
//   const type = s.attr("id");
//   //
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[\s\S]{8,}$/;
//   //
//   const emailRef = s.parent().find('[name="email"]');
//   emailRef.val() == "" || !emailRegex.test(emailRef.val())
//     ? emptyFieldTriggerer(
//         emailRef,
//         true,
//         `Email must at least include an '@' and a '.' symbol!`
//       )
//     : (userData["email"] = emailRef.val());
//   //
//   const passwordRef = s.parent().find('[name="password"]');
//   passwordRef.val() == "" || !passwordRegex.test(passwordRef.val())
//     ? emptyFieldTriggerer(
//         passwordRef,
//         true,
//         `Password must more than 8 characters long, include at least one uppercase and lowercase letter aswell as a special symbol!`
//       )
//     : (userData["password"] = passwordRef.val());
//   if (userValidity) {
//     if (type === "signUp-button") {
//       let hostedImageURL = "";
//       if (imageFile !== "") {
//         const storageRef = ref(storage, filePath);
//         await uploadBytes(storageRef, imageFile)
//           .then((snapshot) => {
//             return getDownloadURL(snapshot.ref);
//           })
//           .then((imageURL) => {
//             hostedImageURL = imageURL;
//           })
//           .catch((error) => {
//             console.error("Error uploading image to Firebase Storage:", error);
//           });
//       } else hostedImageURL = defaultProfilePicture;
//       //
//       const nameRef = s.parent().find('[name="name"]');
//       nameRef.val() == ""
//         ? emptyFieldTriggerer(nameRef)
//         : (userData["name"] = nameRef.val());
//       try {
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           userData.email,
//           userData.password
//         );
//         GLOBALS.user = {
//           verified: true,
//           metaData: userCredential.user,
//           info: {
//             uid: userCredential.user.uid,
//             name: userData.name,
//             email: userData.email,
//             profilePicture: hostedImageURL,
//             folders: {
//               Notes: [],
//               "ToDO-s": [],
//               Music: [],
//               Movies: [],
//             },
//           },
//         };
//         localStorage.user = JSON.stringify(GLOBALS.user);
//         const db = getFirestore();
//         await setDoc(doc(db, "users", userCredential.user.uid), GLOBALS.user.info,);
//         accountStatusChangeHandler(GLOBALS.user);
//         console.log(
//           `%cCreated a new account and logged in as ${GLOBALS.user.info.name}`,
//           `background-color: black; color: red;`
//         );
//       } catch (error) {
//         errorHandler(error);
//       }
//     } else if (type === "logIn-button") {
//       try {
//         const userCredential = await signInWithEmailAndPassword(
//           auth,
//           userData.email,
//           userData.password
//         );
//         const docRef = doc(db, "users", userCredential.user.uid);
//         const docSnap = await getDoc(docRef);
//         GLOBALS.user = {
//           verified: true,
//           metaData: userCredential.user,
//           info: docSnap.data(),
//         };
//         localStorage.user = JSON.stringify(GLOBALS.user);
//         accountStatusChangeHandler(GLOBALS.user);
//         console.log(
//           `%cLogged in as ${GLOBALS.user.info.name}`,
//           `background-color: black; color: cyan; width:100%; height:100%;`
//         );
//       } catch (error) {
//         errorHandler(error);
//       }
//     }
//   }
// });
// // }

// // const homeHandler = () => {
// const targets = $(".nav-items-item");
// targets.off("click");
// targets.on("click", function () {
//   const s = $(this);
//   if (!s.hasClass("selected")) {
//     targets.removeClass("selected");
//     s.addClass("selected");
//     $("#add-note").text(s.text());
//   }
// });
// // $(document).on('click','.add', ()=>{
// //     //here we deal with the animations and functions that go on to create a new note


// // })
// // }
// //genrating a random hexadecimal number to push in the firebase, well also need to update the firebase user document with the new document
// const randomHexGenerator = () => Math.floor(Math.random() * 16777216).toString(16).padStart(6, "0");
// $(document).on('click','#dropdown-icon',() => {
//     $('#dropdown').slideToggle();
// })
// $(document).on('click','.nav-container-select-dropdown-option', function(){
//     const s = $(this);
//     s.siblings().removeClass('selected');
//     s.addClass('selected');
//     $('.nav-container-select-title-text').text(s.text());
// });

// const editNav = $(`    
// <nav class="nav edit-nav">
//     <div class="nav-container nav-edit">
//         <input type="text" class="nav-container-title nav-container-input" id="note-name" value="New Note" />
//         <div class="nav-container-underline"></div>
//         <h1 class="nav-container-text">Choose a background for your note!</h1>
//     </div>
//     <div class="nav-slider" data-function="note-background">
//       <div class="nav-slider-track vertical" data-role="note-background">
//         <div class="nav-slider-track-item selected">
//           <img class="nav-slider-track-item-image" src="/static/assets/images/note-image-1.jpg" />
//           <span class="nav-slider-track-item-title">Quiet Nature</span>
//         </div>
//         <div class="nav-slider-track-item">
//           <img class="nav-slider-track-item-image" src="/static/assets/images/note-image-1.jpg" />
//           <span class="nav-slider-track-item-title">Quiet Nature</span>
//         </div>
//         <div class="nav-slider-track-item">
//           <img class="nav-slider-track-item-image" src="/static/assets/images/note-image-1.jpg" />
//           <span class="nav-slider-track-item-title">Quiet Nature</span>
//         </div>
//         <div class="nav-slider-track-item">
//           <img class="nav-slider-track-item-image" src="/static/assets/images/note-image-1.jpg" />
//           <span class="nav-slider-track-item-title">Quiet Nature</span>
//         </div>
//         <div class="nav-slider-track-item field">
//           <input type="file" accept="image/*" name="nav-slider-track-item-input" id="nav-slider-track-item-input"
//               class="nav-slider-track-item-input image-input" style="display: none;" />
//           <label for="nav-slider-track-item-input" class="nav-slider-track-item-title">Choose an Image</label>
//           <img src="/static/assets/images/default-profile-picture.jpg"  class="nav-slider-track-item-preview" id="nav-slider-track-item-preview">
//         </div>
//       </div>
//       <div class="nav-slider-controls vertical">
//         <i class="nav-slider-controls-control fa-solid fa-chevron-down" data-direction="+"></i>
//         <div class="nav-slider-controls-pagnation ">
//           <div class="nav-slider-controls-pagnation-item selected"></div>
//           <div class="nav-slider-controls-pagnation-item"></div>
//           <div class="nav-slider-controls-pagnation-item"></div>
//           <div class="nav-slider-controls-pagnation-item"></div>
//           <div class="nav-slider-controls-pagnation-item"></div>
//         </div>
//       <i class="nav-slider-controls-control fa-solid fa-chevron-down" data-direction="-"></i>
//       </div>
//     </div>
//     <div class="nav-container nav-edit">
//       <h1 class="nav-container-text">Type of Pen:</h1>
//     </div>
//     <div class="nav-select" data-function="note-font">
//       <div class="nav-select-list active">
//           <div class="nav-select-list-item" value="penicl" title="Pencil"><svg  class="nav-select-list-item-icon"xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M20.131 3.16a3 3 0 0 0-4.242 0l-.707.708l4.95 4.95l.706-.707a3 3 0 0 0 0-4.243l-.707-.707Zm-1.414 7.072l-4.95-4.95l-9.09 9.091a1.5 1.5 0 0 0-.401.724l-1.029 4.455a1 1 0 0 0 1.2 1.2l4.456-1.028a1.5 1.5 0 0 0 .723-.401l9.091-9.091Z"/></g></svg></div>
//           <div class="nav-select-list-item" value="fountain" title="Fountain Pen"><svg class="nav-select-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-3 -3 24 24"><path fill="white" d="M8.406 12.732L5.367 9.693c.543-.956 1.335-1.903 2.375-2.838c1.341-1.208 3.708-3.25 7.1-6.126a1.795 1.795 0 0 1 2.53 2.53c-2.88 3.398-4.921 5.765-6.125 7.1c-.935 1.037-1.882 1.828-2.841 2.373zM3.99 11.146l2.965 2.964l-1.366 1.906l-5.276 1.795l1.771-5.3l1.906-1.365z"/></svg></div>
//           <div class="nav-select-list-item" value="marker" title="Marker"><svg class="nav-select-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="m15.95 2.39l5.657 5.657a1 1 0 0 1 0 1.414l-7.778 7.778l-2.122.707l-1.414 1.415a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414L6.05 12.29l.707-2.122l7.779-7.778a1 1 0 0 1 1.414 0Zm.707 3.536l-6.364 6.364l1.414 1.414l6.364-6.364l-1.414-1.414ZM4.283 16.886l2.828 2.828l-1.414 1.414l-4.243-1.414l2.829-2.828Z"/></svg></div>
//           <div class="nav-select-list-item" value="ballpoint" title="Ballpoint Pen"><svg class="nav-select-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M15.891 3.047a3.578 3.578 0 1 1 5.061 5.06L20.061 9a3.25 3.25 0 0 1-.005 4.592l-1.784 1.783a.75.75 0 1 1-1.06-1.06l1.783-1.784A1.75 1.75 0 0 0 19 10.06l-9.998 10a3.106 3.106 0 0 1-1.477.825L2.924 21.98a.75.75 0 0 1-.904-.903l1.096-4.602c.133-.559.419-1.07.825-1.476l11.95-11.952Z"/></svg></div>
//       </div>
//     </div>
//     <div class="nav-container nav-edit">
//       <h1 class="nav-container-text">Pen Color:</h1>
//     </div>
//     <div class="nav-select" data-function="note-color">
//       <div class="nav-select-list">
//         <div class="nav-select-list-item" value="red" title="Red"><div class="nav-select-list-item-icon" value="red"></div></div>
//         <div class="nav-select-list-item" value="green" title="Green"><div class="nav-select-list-item-icon" value="green"></div></div>
//         <div class="nav-select-list-item" value="yellow" title="Yellow"><div class="nav-select-list-item-icon" value="yellow"></div></div>
//         <div class="nav-select-list-item" value="blue" title="Blue"><div class="nav-select-list-item-icon" value="blue"></div></div>
//       </div>
//     </div>
//     <div class="nav-container nav-edit">
//       <h1 class="nav-container-text">Choose a Paper Background:</h1>
//     </div>
//     <div class="nav-slider horizontal" data-function="note-paper">
//     <div class="nav-slider-track horizontal" data-role="paper-background">
//       <div class="nav-slider-track-item selected pattern-1" data-pattern="pattern-1"></div>
//       <div class="nav-slider-track-item pattern-2" data-pattern="pattern-2"></div>
//       <div class="nav-slider-track-item pattern-3" data-pattern="pattern-3"></div>
//       <div class="nav-slider-track-item pattern-4" data-pattern="pattern-4"></div>
//       <div class="nav-slider-track-item field">
//         <input type="file" accept="image/*" name="nav-slider-track-item-input" id="nav-slider-track-item-input"
//             class="nav-slider-track-item-input" style="display: none;" />
//         <label for="nav-slider-track-item-input" class="nav-slider-track-item-title">Choose an Image</label>
//         <img src="/static/assets/images/default-profile-picture.jpg"  class="nav-slider-track-item-preview" id="nav-slider-track-item-preview">
//       </div>
//     </div>
//     <div class="nav-slider-controls horizontal">
//       <i class="nav-slider-controls-control fa-solid fa-chevron-right" data-direction="+"></i>
//       <div class="nav-slider-controls-pagnation">
//         <div class="nav-slider-controls-pagnation-item selected"></div>
//         <div class="nav-slider-controls-pagnation-item"></div>
//         <div class="nav-slider-controls-pagnation-item"></div>
//       </div>
//       <i class="nav-slider-controls-control fa-solid fa-chevron-right" data-direction="-"></i>
//       </div>
//     </div>
//     <div class="nav-settings nav-edit">
//         <h1 class="nav-settings-item nav-edit">
//             <i class="fa-solid fa-trash-can nav-settings-item-icon"  id="note-delete"></i>
//             <i class="fa-solid fa-save nav-settings-item-icon"  id="note-save"></i>
//         </h1>
//     </div>
// </nav>
// `);
// //the event listneres handlers for the create-note/ view-note view
// let pagnationCounterV = 0;
// $(document).on('click', '.vertical .nav-slider-controls-control',function(){
//   const s = $(this);
//   const target  = $('.vertical .nav-slider-track-item').first();
//   const direction = s.data('direction');
//   //
//   if(target.is(':animated') || $('.vertical .nav-slider-track-item:animated').length){
//     return;
//   }
//   //
//   const existingValue = parseFloat(target.css('margin-top').replace('px',''));
//   const value = target.height() + 4;
//   const maxValue = value * ($('.nav-slider-track.vertical').children('.nav-slider-track-item').length - 1);
//   //
//   if(!(direction == '+' && existingValue == 0) && !(direction == '-' && existingValue == -maxValue)){
//     target.css('margin-top', existingValue + parseFloat(direction + value) + 'px');
//     //also the selector
//     pagnationCounterV = pagnationCounterV + parseInt(direction + 1) * -1;
//     $('.vertical .nav-slider-controls-pagnation-item').eq(pagnationCounterV).addClass('selected').siblings().removeClass('selected');
//   }
// })
// let pagnationCounterH = 0;
// $(document).on('click', '.horizontal .nav-slider-controls-control',function(){
//   const s = $(this);
//   const target  = $('.horizontal .nav-slider-track-item').first();
//   const direction = s.data('direction');
//   //
//   if(target.is(':animated') || $('.horizontal .nav-slider-track-item:animated').length){
//     return;
//   }
//   //
//   const existingValue = parseFloat(target.css('margin-left').replace('px',''));
//   const value = target.width() + 4;
//   const maxValue = value * ($('.nav-slider-track.horizontal').children('.nav-slider-track-item').length - 1);
//   //
//   if(!(direction == '+' && existingValue == 0) && !(direction == '-' && existingValue == -maxValue / 2)){
//     console.log(111)
//     target.css('margin-left', existingValue + parseFloat(direction + value) + 'px');
//     //also the selector
//     pagnationCounterH = pagnationCounterH + parseInt(direction + 1) * -1;
//     $('.horizontal .nav-slider-controls-pagnation-item').eq(pagnationCounterH).addClass('selected').siblings().removeClass('selected');
//   }
// });
// //the interface for the sliders
// const sliderFuncInterface = {
//   'paper-background': pattern => {
//     $('.note-area').attr('data-pattern', pattern);
//   },
//   'note-background': backgroundSrc => {}
// }
// //the selector
// $(document).on('click','.nav-slider-track-item:not(.selected)', function(){
//   const s = $(this);
//   s.addClass('selected').siblings().removeClass('selected');
//   const role = s.parent().data('role');
//   const pattern = s.data('pattern');
//   sliderFuncInterface[role](pattern);
// })
// //handling note saving
// $(document).on('click', '#note-save', async function(){
//   //getting the values to save
//   const noteName = $('#note-name').val();
//   const noteValue = $('#note-value').val();
//   //
//   const noteBackground = $('.nav-slider[data-function="note-background"] .nav-slider-track-item.selected')
//   const notePaper = $('.nav-slider[data-function="note-paper"] .nav-slider-track-item.selected').data('pattern');
//   //
//   const noteColor = $('.nav-select[data-function="note-color"] .nav-select-list-item.selected').attr('value');
//   const noteFont = $('.nav-select[data-function="note-font"] .nav-select-list-item.selected').attr('value');
//   //
//   const userId = GLOBALS.user.id;
//   //
//   const noteData = {
//     noteConfigs:{
//       noteColor: noteColor,
//       noteFont: noteFont,
//       noteBackground: noteBackground,
//       notePaper: notePaper,
//     },
//     noteName: noteName,
//     noteValue: noteValue,
//   };
//   if(userId){
//     noteData.user  = userId;
//     const docRef = doc(db, 'notes');
//     await setDoc(docRef, noteData);
//     const docId = docRef.id;
//     noteData.id = docId;
//   }
//   else{
//     noteData.user = 'local';
//     noteData.id = randomHexGenerator();
//   }
//   //
  
//   GLOBALS.notes.push(noteData);
//   const newDataArr = JSON.parse(localStorage.notes).notes.push(noteData);
//   localStorage.notes = newDataArr;
// })
// const todoHandler = () => {
//     console.log('TODO')
//     editNav.insertAfter('nav');
// }
// //note thumbnail returner
// const noteThumbnailReturner = ( { noteBackground, }, noteName, noteId) => 
// `<div class="note" data-id="${noteId}">
//   <span class="note-title">${noteName}</span>
//   <img class="note-background" src="${noteBackground}"/>
//   <div class="note-go">
//     <i class="fa-solid fa-arrow-right note-go-icon"></i>
//   </div>
// </div>`
// const homeHandler = () => {
//   if(localStorage.notes){
//     const notes = JSON.parse(localStorage.notes)
//     $('#app').append(
//       notes.map( ({noteConfigs, noteValue, noteName, noteId}) => noteThumbnailReturner(noteConfigs, noteName, noteId))
//     )
//   }
// }

// export { todoHandler };
