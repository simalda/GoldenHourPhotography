import file from "./Languages/hebrew.json";

class Translator {
  constructor() {
    this.dictionary = file;
  }

  getDictionary() {
    return this.dictionary;
  }

  translate(word) {
    return this.dictionary[word];
  }
  translateToEnglish(value) {
    return Object.keys(this.dictionary).find(
      (key) => this.dictionary[key] === value
    );
  }

  translateArray(arrayOfWords) {
    return arrayOfWords.map((word) => this.dictionary[word]);
  }
}

export default Translator;
