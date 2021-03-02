import file from "../../../languages/hebrew.json";

class Translator {
  constructor() {
    // fetch(file)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => console.log(data));
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
