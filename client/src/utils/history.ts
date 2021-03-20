import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// ! history version downgraded to history@4.10.1 due to incompetiblity with react-router-dom v5
// * https://github.com/ReactTraining/history/issues/803

/*
// * https://github.com/ReactTraining/react-router/issues/2144#issuecomment-153899046
history.listen(location => {
  // Use setTimeout to make sure this runs after React Router's own listener
  setTimeout(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (location.action === 'POP') {
      return;
    }
    // In all other cases, check fragment/scroll to top
    var hash = window.location.hash;
    if (hash) {
      var element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  });
});
*/
export default history;
