const navItemReturner = (name, className, hashtagsArr, i) => /*html*/`
<h1 class="nav-items-item ${i === 0 ? 'selected' : ''}" data-hashtags="${hashtagsArr.join(',')}">
    <i class="fi fi-rr-${className} nav-items-item-icon"></i>
    ${name}
    <i class="nav-items-item-eleminate fi fi-sr-minus-circle"></i>
</h1>`
const defaultNavReturner = ({name, profilePicture, folders}, loggedInOrNot) => /*html*/`
    <nav class="navigation default-nav">
        <div class="nav" data-animation="animate-in-left-to-right">
            <div class="nav-container">
                <img class="nav-container-image" id="nav-profile-picture" src="${profilePicture}" />
                <h1 class="nav-container-title">Hi <span class="nav-container-title-user" id="nav-username">${name}</span></h1>
                <span class="nav-container-subtitle">What's next?</span>
            </div>
            <div class="nav-items">
            ${folders.map(({name, className, hashtagsArr}, i) => navItemReturner(name, className, hashtagsArr, i))}
                <h1 class="nav-items-item disabled"><i class="fi fi-rr-add-folder nav-items-item-icon"></i>Add a Folder</h1>
            </div>
            <div class="nav-upgrade">
                <h1 class="nav-upgrade-title">Upgrade and elevate your experience!</h1>
                <div class="nav-upgrade-button">
                    <h1 class="nav-upgrade-button-title">Upgrade to Premium</h1>
                </div>
            </div>
            <div class="nav-settings" data-status="${loggedInOrNot ? 'logged-in' : 'logged-out'}">
                <h1 class="nav-settings-item" id="nav-user" href="/account" data-link>
                    <i class="fi fi-rr-${loggedInOrNot ? 'exit' : 'enter'} nav-settings-item-icon" id="nav-user-icon"></i>
                    <span class=" nav-settings-item-title">${loggedInOrNot ? 'Log Out' : 'Log In'}</span>
                </h1>
            </div>
        </div>
    </nav>
`
export default defaultNavReturner;
// /static/assets/images/overall/default-profile-picture.jpg