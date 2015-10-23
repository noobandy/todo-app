var natural = require('natural');

var classifier = new natural.BayesClassifier();

var metaphone = natural.Metaphone;

metaphone.attach();

var fs = require("fs");

var path = require("path");

var corpus = require(path.join(__dirname, "./corpus.js"));

natural.PorterStemmer.attach();

for(prop in corpus) {
	for(var i = 0; i < corpus[prop].length; i++) {

		classifier.addDocument(corpus[prop][i], prop);
	}
}

classifier.train();

classifier.save("classifier.json", function(err, classifier) {
	console.log("classifier saved");
});

module.exports = {};

module.exports.classify = function(input) {
	var classifications = classifier.getClassifications(input);
	console.log(classifications);
	if(classifications.length > 0) {
		return classifications[0].label;
	} else {
		return null;
	}
}