var TEMPLATE_PATH = '//raw.github.com/skidding/github-issue-template/master/README.md';
var $ISSUE_BODY = $('.composer [name="issue[body]"]');

$(function() {
  // Let the user now immediately that a template is being fetched for the
  // fresh issue they're about to create
  $ISSUE_BODY.prop('placeholder', "Loading issue template...");
  // Fetch template contents from a Github project repo directly (this is
  // conventient because, being on the same domain (github.com), AJAX requests
  // are possible)
  $.get(TEMPLATE_PATH, function(contents, status) {
    if (status == 'success') {
      // This placeholder will be shown only when removing the entire contents
      // provided by the issue template
      $ISSUE_BODY.prop('placeholder', "Ignoring the issue template, are you?");
      $ISSUE_BODY.val($.trim(contents));
    } else {
      // Notify the user that the template couldn't be fetched and the they
      // should carry on w/ a blank issue body
      $ISSUE_BODY.prop('placeholder', "Couldn't fetch issue template. Sorry!");
    }
  });
});
