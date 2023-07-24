const noteThumbnailReturner = async (
  { noteBackground },
  noteName,
  noteId,
  noteLocation,
  noteHashtags
) => {
  var mostUsedColor;
  const img = $(`<img class="note-background" src="${noteBackground}"/>`);
  await new Promise((resolve, reject) => {
    img[0].onload = () => {
      const canvas = $(`<canvas width="${200}" height="${200}">`);
      const ctx = canvas[0].getContext("2d");
      ctx.drawImage(img[0], 0, 0);
      const imageData = ctx.getImageData(0, 0, 200, 200);
      const data = imageData.data;
      // Create an object to keep track of the color values
      const colors = {};
      // Loop through the pixel data
      for (let i = 0; i < data.length; i += 4) {
        // Get the RGB values of the current pixel
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Convert the RGB values to a hex string
        const hex = rgbToHex(r, g, b);
        // If the color has not been seen before, add it to the colors object with a count of 1
        if (!colors[hex]) {
          colors[hex] = 1;
        } else {
          // Otherwise, increment the count of the color
          colors[hex]++;
        }
      }
      // Find the color with the highest count
      let maxCount = 0;
      for (const [color, count] of Object.entries(colors)) {
        if (count > maxCount) {
          mostUsedColor = color;
          maxCount = count;
        }
      }

      resolve();
    };
    img.onerror = (error) => reject(error);
  });
  // Log the most used color
  return /*html*/ `
    <div class="note ${window.globals.noteLocation == noteLocation ? '' : 'disabled'}" data-id="${noteId}"  data-for="${noteLocation}" data-hashtags="${noteHashtags}">
      <span class="note-title" data-link href="/todo/${noteId}" >${noteName}</span>
      ${img.prop("outerHTML")}
      <div class="note-gradient" style="background: linear-gradient(90deg, rgba(0,0,0,0.5) 40%, ${mostUsedColor} 95%);"></div>
      <div class="note-go" data-link href="/todo/${noteId}">
        <i class="fi fi-rr-arrow-right note-go-icon"></i>
      </div>
    </div>
  `;
};

// Helper function to convert RGB values to a hex string
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

const hashtagsReturner = (hashtag, location) => /*html*/ `
  <div class="hashtag ${window.globals.noteLocation == location ? '' : 'disabled'}"" data-for="${location}">
    <span class="hashtag-value" >${hashtag}</span>
    <div class="hashtag-line"></div>
  </div>
`;

const homeReturner = async (notesArray, hashtagsArray) => {
  let notesHtml = "";
  for (const {
    noteConfigs,
    noteValue,
    noteName,
    id,
    noteLocation,
    hashtagsArray,
  } of notesArray) {
    const noteHtml = await noteThumbnailReturner(
      noteConfigs,
      noteName,
      id,
      noteLocation,
      hashtagsArray
    );
    notesHtml += noteHtml;
  }
  return /*html*/ `
    <div id="app-contents" data-animation="animate-in-bottom-to-top">
      <div class="hashtags">
      <div class="hashtag active view-all">
        <span class="hashtag-value" data-for="${Object.keys(
          window.globals.user.info.folders
        ).join(",")}">View All</span>
        <div class="hashtag-line"></div>
      </div>
        ${hashtagsArray
          .map(({ hashtagLocation, value }) =>
            hashtagsReturner(value, hashtagLocation)
          )
          .join("")}
      </div>
      <div class="notes">
        <div class="reminder" data-link href="/account" style="${window.globals.verified === true ? 'display:none' : ''}">
          <span class="reminder-title">Log In to sync your notes to the cloud!</span>
          <i class="fi fi-rr-cloud-upload reminder-icon"></i>
        </div>
        <div class="notes-container">
          <div class="notes-container-sizer"></div>
          <span class="notes-container-title" style="display:none">You don't have any notes, press the button in the corner of the screen to add one!</span>
          ${notesHtml}
        </div>
      </div>
      <div class="add" data-link href="/todo/new-note">
        <i class="fi fi-sr-add-document add-icon"></i>
        <h1 class="add-title">Add something to <span class="add-title-folder" id="add-note">Notes</span></h1>
      </div>
    </div>
  `;
};
export default homeReturner;
