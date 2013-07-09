$(function() {
  // Create a list of clickable repos, loaded from local storage (saved from
  // the options page)
  var githubRepos = $.trim(localStorage['github-repos']).split("\n");
  for (var i = 0, path, user, repo, href; i < githubRepos.length; i++) {
    path = githubRepos[i].split('/');
    user = path[0];
    repo = path[1];
    href = 'https://github.com/' + path[0] + '/' + path[1];
    $('#repos').append('<li>' +
      '<a href="' + href + '">' + user + '<strong>' + repo + '</strong></a>' +
    '</li>');
  }
});
