//ACCOUNT SCRIPTS
//handles log in/ sign up operatoions, log out, connections with the database, ui updatesbeased on user state and account-screen animations
//
//outside exports
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  inMemoryPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
//inside exports
import {
  globals,
  storage,
  auth,
  db,
  provider,
  defaults,
} from "/static/js/consts.js";
//the current user
const currentUser = getAuth(window.app).currentUser;
//the account state change handler for when the user logs in or out
const accountStatusChangeHandler = (source) => {
  //changing the profile picture, folders and profile-picture of the nav bar
  const settingsRef = $("#nav-user");
  const nameRef = $("#nav-username");
  const profilePictureRef = $("#nav-profile-picture");
  //
  nameRef.text(source.name);
  profilePictureRef.attr("src", source.profilePicture);
  //changing the icon
  settingsRef
    .children("i")
    .removeClass("fi-rr-enter")
    .addClass("fi fi-rr-exit");
  settingsRef.children("span").text("Log Out");
  //removing the ability to link anywhere since this button will only serve to log the user out now
  settingsRef.off("click");
  settingsRef
    .attr("href", "")
    .removeAttr("data-link")
    .on("click", function () {
      //reseting the local storage data
      localStorage.removeItem("user");
      signOut(auth);
      $(this)
        .children("i")
        .addClass("fa-arrow-right-to-bracket")
        .removeClass("fa-arrow-right-from-bracket");
      nameRef.text("User");
      profilePictureRef.attr("src", defaults.defaultProfilePicture);
      settingsRef.children("span").text("Log In");
      setTimeout(() => {
        settingsRef.attr("href", "/account").attr("data-link", "");
      }, 100);
    });
};
//we trigger the function if we already had a save of the users data in the local storage
onAuthStateChanged(auth, async (user) => {
  if (user) {
    //this means that the user logged in
    const docRef = doc(db, "users", user.uid);
    try {
      const userData = await getDoc(docRef);
      accountStatusChangeHandler(userData.data());
      //also setting up the globals variables
      globals.verified = true;
      globals.user = {
        metaData: user.user,
        info: userData.data(),
      };
    } catch (error) {
      console.error(error);
    }
  }
});
//the modal and backdrop elements
const dialog = $(".modal"),
  backdrop = $(".backdrop");
//the exiter
$("#modal-exit, .backdrop").on("click", () => {
  dialog.removeClass("active");
  backdrop.removeClass("active");
});
//the error interface that translates the error message to something readable
const errorInterface = {
  "(auth/user-not-found)": {
    title: "Email was not found!",
    message:
      "Please check your email, it either was typed wrong or this account does not exist!",
  },
  "(auth/wrong-password)": {
    title: "Password incorrect!",
    message: "Your password is incorrect!",
  },
  "(gen/general-error)": {
    title: "Something went wrong!",
    message: "Please try again later!",
  },
  "(auth/too-many-request)": {
    title: "We've detected too many log-in attempts!",
    message:
      "Are you sure this is really your account? If so you can reset your password and try again later!",
  },
  "(auth/email-already-in-use)": {
    title: "This Email is already in use!",
    message: "Please log-in with an existing account or create a new one!",
  },
  "(auth/network-request-failed)": {
    title: "Your Internet connection is weak!",
    message: "Try again later with a stronger connection!",
  },
  "(auth/internal-error)": {
    title: "We're facing some internal issues!",
    message: "Please try again at a later time",
  },
};
//the error formatter to reti=urn the important part of the error so we can translate it
const errorFormmaterReturner = (error) => {
  const regex = /\((.*?)\)/;
  const match = error.toString().match(regex);
  const errorID = match ? match[0] : "(gen/general-error)";
  return errorID;
};
//the main error handler function
const errorHandler = (error) => {
  console.log(error);
  dialog
    .find("#dialog-title")
    .text(errorInterface[errorFormmaterReturner(error)].title);
  dialog
    .find("#dialog-message")
    .text(errorInterface[errorFormmaterReturner(error)].message);
  dialog.addClass("active");
  backdrop.addClass("active");
};
//the image uploader function
let filePath = "",
  imageFile = null;
$(document).on("click", ".image-input", function () {
  const s = $(this);
  const target = s.siblings("img");
  //
  imageFile = this.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    target.attr("src", this.result).show();
    filePath = `images/profilePictures/${imageFile.name}`;
  };
  reader.readAsDataURL(imageFile);
});
//the error effect remover on inputs
$(document).on(
  "input",
  ".content-column-content-field-input.error",
  function () {
    $(this)
      .removeClass("error")
      .siblings(".content-column-content-field-title.title-error")
      .removeClass("title-error");
  }
);
//the user validity variable, only used inside the chache for error handling
let userValidity = true;
//the function that signals an error and also resets the userValidity
const emptyFieldTriggerer = (field, extension = false, extensionText) => {
  userValidity = false;
  const title = field.siblings(".content-column-content-field-title");
  field.addClass("error");
  title.addClass("title-error");
  if (extension) {
    const target = field.parent().parent().siblings(".content-column-error");
    target.text(extensionText);
  }
};
//the userData chace object
const userData = {};
$(document).on("click", ".content-column-button", async function () {
  //we reset the text on the error container
  $(".content-column-error").text("");
  //
  const s = $(this);
  const type = s.attr("id");
  //the respective regular expressions to check the input values do
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[\s\S]{8,}$/;
  //
  const emailRef = s.parent().find('[name="email"]');
  //we check the email first
  emailRef.val() == "" || !emailRegex.test(emailRef.val())
    ? emptyFieldTriggerer(
        emailRef,
        true,
        `Email must at least include an '@' and a '.' symbol!`
      )
    : (userData["email"] = emailRef.val());
  //password
  const passwordRef = s.parent().find('[name="password"]');
  passwordRef.val() == "" || !passwordRegex.test(passwordRef.val())
    ? emptyFieldTriggerer(
        passwordRef,
        true,
        `Password must more than 8 characters long, include at least one uppercase and lowercase letter aswell as a special symbol!`
      )
    : (userData["password"] = passwordRef.val());
  //
  if (userValidity) {
    if (type === "signUp-button") {
      let hostedImageURL = "";
      //we initialize the hosteImageURL and if the image file isn't empty er fill it with it by uploading it the image file into storage and getting back the url, else we just use the default one
      if (imageFile !== "") {
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, imageFile)
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then((imageURL) => {
            hostedImageURL = imageURL;
          })
          .catch((error) => {
            console.error("Error uploading image to Firebase Storage:", error);
          });
      } else hostedImageURL = defaults.defaultProfilePicture;
      //
      const nameRef = s.parent().find('[name="name"]');
      nameRef.val() == ""
        ? emptyFieldTriggerer(nameRef)
        : (userData["name"] = nameRef.val());
      try {
        //setting the persistance so the user remains logged in at all times
        await setPersistence(auth, inMemoryPersistence);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        //updating the global variables
        globals.verified = true;
        globals.user = {
          metaData: userCredential.user,
          info: {
            uid: userCredential.user.uid,
            name: userData.name,
            email: userData.email,
            profilePicture: hostedImageURL,
            folders: {
              Notes: [],
              "ToDO-s": [],
              Music: [],
              Movies: [],
            },
          },
        };
        //creating the new document with template data
        await setDoc(
          doc(db, "users", userCredential.user.uid),
          globals.user.info
        );
        // auth.stateChange will handle the updates
        console.log(
          `%cCreated a new account and logged in as ${GLOBALS.user.info.name}`,
          `background-color: black; color: red;`
        );
      } catch (error) {
        //handling errors gracefully
        errorHandler(error);
      }
    } else if (type === "logIn-button") {
      try {
        //setting the persistance
        await setPersistence(auth, inMemoryPersistence);
        //logging in the user to firebase
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        //retirieving the user firebase data
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        //updating the global variables
        globals.verified = true;
        globals.user = {
          metaData: userCredential.user,
          info: docSnap.data(),
        };

        //auth.stateChange will handle the updates
        //
        console.log(
          `%cLogged in as ${GLOBALS.user.info.name}`,
          `background-color: black; color: cyan; width:100%; height:100%;`
        );
      } catch (error) {
        //gracefull error handling
        errorHandler(error);
      }
    }
  }
});
//also handling sign in with google
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    //updating the global variables
    globals.verified = true;
    globals.user = {
      metaData: user,
      info: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
        folders: {
          Notes: [],
          "ToDO-s": [],
          Music: [],
          Movies: [],
        },
      },
    };
    console.log(user.photoURL);
    // Save the profile picture URL in Firestore
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, globals.user.info, { merge: true });

    console.log("Signed in as:", user.displayName);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
}

$(document).on(
  "click",
  ".content-column-container-header-button",
  signInWithGoogle
);
//and also handling animations and transitons between log in and sign up columns
$(document).on("click", ".content-column-container-instead", function () {
  const s = $(this);
  const primTarget = s.parent().parent();
  const secTarget = primTarget.siblings(".content-column");
  primTarget.toggleClass("active");
  secTarget.toggleClass("active");
});
