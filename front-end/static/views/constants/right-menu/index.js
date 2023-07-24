const rightMenu = () => /*html*/`
     <header class="menu-header">
        <div class="menu-header-option">
            <i class="fi fi-sr-user-pen menu-header-option-icon"></i>
            <span class="menu-header-option-title">Account</span>
        </div>
        <div class="menu-header-option">
            <i class="fi fi-sr-users menu-header-option-icon"></i>
            <span class="menu-header-option-title">Friends</span>
        </div>
    </header>
    <main class="menu-body">
        <div class="menu-body-container" data-for="Account"></div>
        <div class="menu-body-container" data-for="Friends">
            <div class="menu-body-container-search">
                <input class="menu-body-container-search-input" type="text" name="search-friends" id="friend-search">
                <span class="menu-body-container-search-button">
                    <i class="fi fi-rr-search menu-body-container-search-button-icon"></i>
                </span>
            </div>
        </div>
    </main>
`