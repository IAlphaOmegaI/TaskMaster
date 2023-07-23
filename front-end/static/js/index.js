import View from "./views/View.js";
//a history array that saves all the pages link the user visited
const historyArr = [];
let lastHistoryState;
//
const backOut = $("#back-out");

//
const routes = {
  "/": {
    route: "Home",
    path: "/",
    callback: () => {
      // initialize Packery
      $('.notes-container').imagesLoaded( function() {
        // initialize Packery after all images have loaded
        const grid = $('.notes-container').packery({
          itemSelector: '.note',
          columnWidth: '.notes-container-sizer',
          percentPosition: true,
        });
        var items = grid.find('.note').draggable();
        grid.packery( 'bindUIDraggableEvents', items );
      });
    }
  },

  "/todo/:id": {
    route: "Todo",
    path: "/todo/:id",
  },

  '/account': {
    route: "Account",
    path: "/account",
  },
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

//
const pathToRegEx = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

//
const router = async () => {
  //adding the class loading to indicate to the user that the page is responsive
  $('html').addClass('loading');
  //
  const potentialMatches = Object.keys(routes).map((key, i) => {
    const route = routes[key];
    return {
      ...route,
      result: location.pathname.match(pathToRegEx(route.path)),
    };
  });

  //
  const match = potentialMatches.find(
    (potentialMatches) => potentialMatches.result !== null
  ) || {
    ...routes["/"],
    result: [location.pathname],
  };
  //getting the last history state
  lastHistoryState = historyArr[historyArr.length - 1];
  //
  match.path != "/" ? backOut.show() : backOut.hide();
  //pushing the history
  historyArr.push(match.path);
  //the constructor
  const view = new View(match.route, getParams(match));
  const {appContents, navContents} = await view.getHtml(match.route.toLowerCase());
  //
  // console.warn(appContents)
  //the transition handler
  if (historyArr.length > 1) {
    //=> the navbar transition
    $(".nav").attr("data-animation", "animate-out-right-to-left");
    $("#app-contents").attr("data-animation", "animate-out-top-to-bottom"); 
  }
  setTimeout(
    () => {
      //removing the loading class
      $('html').removeClass('loading');
      $("#app")
        .attr("class", "")
        .addClass(match.route.toLowerCase())
        .html(appContents);
      //
      $("#nav")
        .attr("class", 'navigation')
        .addClass(match.route.toLowerCase())
        .html(navContents);
      //
      $("body").attr("class", "").addClass(match.route.toLowerCase());
      //and a few extra attributes
      if(match.callback)
        match.callback()
    }, 500 );
};

router();
$(window).on("popstate", router);

$(document).on("click", "[data-link]", function (e) {
  e.preventDefault();
  const link = $(this).attr("href");
  navigateTo(link);
});
//also an animation for all the icons on the page
$(document).on('mouseenter', '.fi', function() {
  const s = $(this);
  const newClass = s.attr('class').replace('-rr-', '-sr-');
  s.attr('class', newClass)
})
$(document).on('mouseleave', '.fi', function() {
  const s = $(this);
  const newClass = s.attr('class').replace('-sr-', '-rr-');
  s.attr('class', newClass)

})