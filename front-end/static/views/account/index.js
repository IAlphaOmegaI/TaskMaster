const accountReturner  = () => /*html*/`
    <div id="app-contents" data-animation="animate-in-bottom-to-top">
        <div class="content">
            <div class="content-column" id="column-1">
                <div class="content-column-container">
                    <div class="content-column-container-header">
                        <span class="content-column-container-header-title">Create your Account</span>
                        <span class="content-column-container-header-subtitle">Let's get started with your 30
                            days
                            free trial!
                        </span>
                        <div class="content-column-container-header-button">
                            Log In with Google
                            <i class="content-column-container-header-button-icon fa-brands fa-google"></i>
                        </div>
                    </div>
                    <div class="content-column-container-divider">
                        <div class="content-column-container-divider-line"></div>
                        <span class="content-column-container-divider-title">or</span>
                        <div class="content-column-container-divider-line"></div>
                    </div>
                    <div class="content-column-container-content">
                        <div class="content-column-container-content-field">
                            <span class="content-column-container-content-field-title">Name</span>
                            <input type="text" name="name" id="name-input-signUp"
                                class="content-column-container-content-field-input" />
                        </div>
                        <div class="content-column-container-content-field">
                            <span class="content-column-container-content-field-title">Email</span>
                            <input type="email" name="email" id="email-input-signUp"
                                class="content-column-container-content-field-input" />
                        </div>
                        <div class="content-column-container-content-field">
                            <span class="content-column-container-content-field-title">Password</span>
                            <input type="password" name="password" id="password-input-signUp"
                                class="content-column-container-content-field-input" />
                        </div>
                        <div class="content-column-container-content-field">
                            <span class="content-column-container-content-field-title">Profile Picture</span>
                            <input type="file" accept="image/*" name="profile-picture"
                                id="profile-picture-input-signUp"
                                class="content-column-container-content-field-input profile-picture image-input"
                                style="display: none;" />
                            <label for="profile-picture-input-signUp"
                                class="content-column-container-content-field-input profile-picture">Choose an
                                Image</label>
                            <img src="/static/assets/images/overall/default-profile-picture.jpg"
                                class="content-column-container-content-field-preview" id="picture-preview">
                        </div>
                    </div>
                    <div class="content-column-container-button" id="signUp-button">
                        <span class="content-column-container-button-title">Create Account</span>
                    </div>
                    <h1 class="content-column-container-instead">Or <span
                            class="content-column-container-instead-span">Log In</span>
                        instead</h1>
                    <h1 class="content-column-container-error"></h1>
                </div>
            </div>
            <div class="content-column active" id="column-2">
                <div class="content-column-container">
                    <div class="content-column-container-header">
                        <span class="content-column-container-header-title">Log into your Account</span>
                        <span class="content-column-container-header-subtitle">Welcome back, continue where you
                            left
                            off!</span>
                        <div class="content-column-container-header-button">
                            Log In with Google
                            <i class="content-column-container-header-button-icon fa-brands fa-google"></i>
                        </div>
                    </div>
                    <div class="content-column-container-divider">
                        <div class="content-column-container-divider-line"></div>
                        <span class="content-column-container-divider-title">or</span>
                        <div class="content-column-container-divider-line"></div>
                    </div>
                    <div class="content-column-container-content">
                        <div class="content-column-container-content-field">
                            <span class="content-column-container-content-field-title">Email</span>
                            <input type="email" name="email" id="email-input-logIn"
                                class="content-column-container-content-field-input" />
                        </div>
                        <div class="content-column-container-content-field">
                            <span class="content-column-container-content-field-title">Password</span>
                            <input type="password" name="password" id="password-input-logIn"
                                class="content-column-container-content-field-input" />
                        </div>
                    </div>
                    <div class="content-column-container-button" id="logIn-button">
                        <span class="content-column-container-button-title">Log In</span>
                    </div>
                    <h1 class="content-column-container-instead">Or 
                        <span class="content-column-container-instead-span">Create an Account</span> instead
                    </h1>
                    <h1 class="content-column-container-error"></h1>
                </div>
            </div>
        </div>
    </div>
`
export default accountReturner;