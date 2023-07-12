import AbstractView from "./AbstractView.js";
const dynamicViewInteraface = {
  'todo': () => {
    //when you come here you come with an id from th link that you were routed from
    //so for example you pressed the link /todo/192 so that 192 is the id that we'll go and request to firebase

  },
  'home': () => {
    //what is dynamic about home is the notes, with the argument name if noteesArray, we either pull this from the local storage or if the user is logged in
    //we pull that information from the firebase
  },
  'account': () => {},
}
export default class extends AbstractView {
  constructor(title, params) {
    super(params);
    this.setTitle(title);
  }
  async getHtml(source) {
    const reqLoc = `/front-end/static/views/${source}/`
    const appImport = await import(`${reqLoc}index.js`);
    const navImport = await import(`${reqLoc}nav.js`);
    const appContents = appImport.default;
    const navContents = navImport.default;
    
    return {
      appContents: appContents,
    };
  }
}
