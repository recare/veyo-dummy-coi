var content = document.body.innerHTML,
    regExp = /\{{([^}]*)\}}/g,
    contentMatches = content.match(regExp),
    keyNames = [],
    dirtyString = "",
    cleanString = "",
    keyString = "",
    valueString = "empty";

// parse page for template fragments
for (var i = 0; i < contentMatches.length; i++) {

    dirtyString = contentMatches[i];
    cleanString = dirtyString.substring(2, dirtyString.length - 2);

    keyNames.push(cleanString);
}

// get json value
$.getJSON("js/dataDE.js", function(result){

  for (i = 0; i < keyNames.length; i++) {

    var keyNameSplit = keyNames[i].split('.');

    // if it is longer it means stuff is inside it
    var hasChildren = keyNameSplit.length > 1;

    if (hasChildren) {

      var theObj = result[keyNameSplit[0]],
          initValue = "";

      for (j = 1; j < keyNameSplit.length; j++) {

        // get the CURRENTLY PARSED KEY
        theObj = theObj[keyNameSplit[j]];
        valueString = theObj;

      }
    } else {

      valueString = result[keyNames[i]];
    }

    // define what needs to be replaced
    keyString = "\{\{" + keyNames[i] + "\}\}";

    $("*").contents().each(function() {

      if(this.nodeType == 3) {

        this.nodeValue = this.nodeValue.replace(keyString, valueString);
      }
    });
  }
});
