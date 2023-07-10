import AbstractView from "./AbstractView.js";
// const defualtNav = `
// <div class="nav-container">
//   <img class="nav-container-image" id="nav-profile-picture"
//       src="./static/assets/images/default-profile-picture.jpg" />
//   <h1 class="nav-container-title">Hi <span class="nav-container-title-user" id="nav-username">User</span></h1>
//   <span class="nav-container-subtitle">What's next?</span>
// </div>
// <div class="nav-items">
//   <h1 class="nav-items-item selected"><i class="fa-solid fa-note-sticky nav-items-item-icon"></i>Notes</h1>
//   <h1 class="nav-items-item"><i class="fa-solid fa-check nav-items-item-icon"></i>ToDo-s</h1>
//   <h1 class="nav-items-item"><i class="fa-solid fa-music nav-items-item-icon"></i>Music</h1>
//   <h1 class="nav-items-item"><i class="fa-solid fa-film nav-items-item-icon"></i>Movies</h1>
//   <h1 class="nav-items-item"><i class="fa-solid fa-plus nav-items-item-icon"></i>Add a Folder</h1>
// </div>
// <div class="nav-upgrade">
//   <h1 class="nav-upgrade-title">Upgrade and elevate your experience!</h1>
//   <div class="nav-upgrade-button">
//       <h1 class="nav-upgrade-button-title">Upgrade to Premium</h1>
//   </div>
// </div>
// <div class="nav-settings">
//   <h1 class="nav-settings-item" id="nav-user" href="account" data-link>
//       <i class="fa-solid fa-arrow-right-to-bracket nav-settings-item-icon" id="nav-user-icon"></i>
//       <span class=" nav-settings-item-title">Log In</span>
//   </h1>
// </div>`
export default class extends AbstractView {
  constructor(title, params) {
    super(params);
    this.setTitle(title);
  }
  async getHtml(source) {
    const response = await $.get(`/static/html/${source}.html`, {
        dataType: "html",
      }),
      appContents = $(response).filter("#app").html();
      // navContents = $(response).filter('nav').length ? $(response).filter('nav').html() : defualtNav;

    return {
      appContents: appContents,
      // navContents: navContents,
    };
  }
}
