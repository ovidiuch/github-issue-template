var STORAGE_KEY = 'github-repos';

$(function() {
  // Default the list of repos to the uberVU/mozaic repo if nothing has been
  // submitted yet
  if (localStorage[STORAGE_KEY] === undefined) {
    localStorage[STORAGE_KEY] = 'uberVU/mozaic';
  }
  // Create a list of clickable repos, loaded from local storage (saved from
  // the options page)
  var githubRepos = $.trim(localStorage[STORAGE_KEY]).split("\n");
  for (var i = 0, path, user, repo, href; i < githubRepos.length; i++) {
    path = githubRepos[i].split('/');
    user = path[0];
    repo = path[1];
    href = 'https://github.com/' + path[0] + '/' + path[1] + '/issues/new';
    $('#repos').append('<li>' +
      '<a href="' + href + '">' + user + '/<strong>' + repo + '</strong></a>' +
    '</li>');
  }
  // Catch click events on the repo links and communicate with the chrome tabs
  // in order to load the corresponding repo location
  $('#repos a').click(function(e) {
    e.preventDefault();
    var repoLocation = $(e.currentTarget).attr('href');
    // Attempt to fetch the instance of the currently-open tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Redirect the current tab if one is found, otherwise create a new one
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, {url: repoLocation});
      } else {
        chrome.tabs.create({url: repoLocation});
      }
    });
  });
});
