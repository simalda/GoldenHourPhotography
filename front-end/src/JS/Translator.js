import file from "./Languages/hebrew.json";

class Translator {
  constructor() {
    this.dictionary = file;
  }

  getDictionary() {
    return this.dictionary;
  }

  translate(word) {
    console.log(this.dictionary);
    return this.dictionary[word];
  }
}

export default Translator;
