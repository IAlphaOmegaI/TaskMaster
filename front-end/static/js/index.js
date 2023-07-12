import View from "./views/View.js";

import { todoHandler } from "/static/js/routes/todo.js";
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
    navbar: true,
  },

  "/todo/:id": {
    route: "Todo",
    path: "/todo/:id",
    navbar: true,
    handler: todoHandler,
  },

  account: {
    route: "Account",
    path: "/account",
    navbar: false,
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
  const html = await view.getHtml(match.route.toLowerCase());

  //
  //the transition handler
  if (historyArr.length !== 1) {
    //=> the navbar transition
    $(".nav").attr("data-animation", "animate-out-right-to-left");
    //=> the container transition
    $("#app-contents").attr("data-animation", "animate-out-top-to-bottom");
  }

  setTimeout(
    () => {
      //removing the custom nav-bars
      $("nav:not('.default-nav')").remove();
      //
      $("#app")
        .attr("class", "")
        .addClass(match.route.toLowerCase())
        .html(html.appContents);
      //
      $("body").attr("class", "").addClass(match.route.toLowerCase());
      //extra attributes
      match.navbar === false
        ? $("body").removeClass("active")
        : $("body").addClass("active");
      match.handler ? match.handler() : null;
    },

    500
  );
};

router();
$(window).on("popstate", router);

$(document).on("click", "[data-link]", function (e) {
  e.preventDefault();
  const link = $(this).attr("href");
  navigateTo(link);
});
