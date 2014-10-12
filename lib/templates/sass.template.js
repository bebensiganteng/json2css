// Temporary solution
// Load in local modules
var fs = require('fs'),
    _ = require('underscore'),
    mustache = require('mustache'),
    tmpl = fs.readFileSync(__dirname + '/sass.template.mustache', 'utf8');

// Define our css template fn ({items, options}) -> css
function sassTemplate(params) {
  // Localize parameters
  var items = [],
      itemsRetina = [],
      options = params.options;

  // Fallback class naming function
  var classFn = options.cssClass || function defaultCssClass (item) {
    return '.icon-' + item.name;
  };

  params.isRetina = false;

  for (var i = params.items.length - 1; i >= 0; i--) {

    var item = params.items[i];

    if(item.name.indexOf("@2x") < 0) {

      item['class'] = classFn(item);
      items.push(item);

    } else {

      params.isRetina = true;
      item.name       = item.name.substr(0, item.name.indexOf("@2x"));
      item['class']   = classFn(item);
      itemsRetina.push(item);

    }

  };

  params.items        = items;
  params.itemsRetina  = itemsRetina;

  // Render and return CSS
  var css = mustache.render(tmpl, params);
  return css;
}

// Export our CSS template
module.exports = sassTemplate;
