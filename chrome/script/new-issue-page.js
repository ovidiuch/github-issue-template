var TEMPLATE_PATH = 'https://rawgit.com/skidding/github-issue-template/master/template.md'
var $ISSUE_TITLE = $('.composer [name="issue[title]"]');
var $ISSUE_BODY = $('.composer [name="issue[body]"]');

$(function() {
  // Adjust the placeholder of the title input as well, to comply with the BDD
  // story format
  $ISSUE_TITLE.prop('placeholder', "Title (describe the story)");
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
  // Enable 'active placeholders' by reacting to clicks inside text blocks
  // between square brackets. They should get entirely selected when clicking
  // inside them, for ease of replacement
  $ISSUE_BODY.click(function() {
    // Ignore this click if the user is already making a selection of their own
    // XXX this might not work in other browsers, beware if porting
    if (window.getSelection().toString().length) {
      return;
    }
    var position = $ISSUE_BODY.getCursorPosition();
    // Once we have the position, we need to identify if there are brackets
    // around the cursor. The fastest solution I could come up is to break the
    // entire text into two, from that position, and check if the last bracket
    // from the first part is a start one, and the first from the last part is
    // an end one
    issueBody = $ISSUE_BODY.val();
    beforeCursor = issueBody.substr(0, position);
    afterCursor = issueBody.substr(position);
    afterStartBracket = beforeCursor.match(/\[[^\]]*$/);
    beforeEndBracket = afterCursor.match(/^[^\[]*\]/);
    if (afterStartBracket && beforeEndBracket) {
      // Now that we have matched that we are inside a square bracket
      // placeholder, we need to calculate where it begins and ends, in order
      // to create a selection exactly between those positions. Luckily, we can
      // easily detect the start and end position by offseting from the initial
      // cursor position, using the length of the matched strings from both ends
      var selectFrom = position - afterStartBracket[0].length;
      var selectTo = position + beforeEndBracket[0].length;
      $ISSUE_BODY.selectRange(selectFrom, selectTo);
    }
  });
});
