var fs = require('fs');
var Handlebars = require('handlebars');

var compiledTemplates = {};
var extension = 'html';
var partials = [
    
];
var templates = [
    'requester'
];

partials.forEach(function(partialName) {
    var data = fs.readFileSync('../common/templates/' + partialName + '.' + extension).toString();
    Handlebars.registerPartial(partialName, data);
});

templates.forEach(function(templateName) {
    var data = fs.readFileSync('templates/' + templateName + '.' + extension).toString();
    compiledTemplates[templateName]= Handlebars.compile(data);
});

module.exports = compiledTemplates;