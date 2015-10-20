var natural = require('natural');

var classifier = new natural.BayesClassifier();

var fs = require("fs");

var path = require("path");

var corpus = require(path.join(__dirname, "./corpus.js"));

natural.PorterStemmer.attach();

for(prop in corpus) {
	for(var i = 0; i < corpus[prop].length; i++) {

		classifier.addDocument(corpus[prop][i].tokenizeAndStem(), prop);
	}
}

classifier.train();

module.exports = {};

module.exports.classify = function(input) {
	var classifications = classifier.getClassifications(input);
	if(classifications.length > 0) {
		return classifications[0].label;
	} else {
		return null;
	}
}