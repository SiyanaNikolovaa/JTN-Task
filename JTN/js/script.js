document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const filePathDisplay = document.getElementById("filePath");
  const textContainer = document.getElementById("output");
  const showHideBtn = document.getElementById("action-btn");
  const regex = /^[a-zA-Z]+$/;
  let words = [];
  let textVisible = false;
  let textFromFile = "";

  const getWords = (text) => {
    let word = "";
    for (let i = 0; i < text.length; i++) {
      if (regex.test(text.charAt(i))) {
        // check if the current character is a letter
        word = word + text.charAt(i); // add the character to the word variable
      } else if (
        (text.charAt(i) === " " ||
          text.charAt(i) === "\r" ||
          text.charAt(i) === "\n") &&
        word.length > 0
      ) {
        let found = false;
        words = words.map((obj) => {
          if (obj.name === word) {
            found = true;
            return { name: obj.name, count: obj.count + 1 };
          }
          return obj;
        });
        !found && words.push({ name: word, count: 1 }); //add the word to the array of words
        word = ""; //empty the variable
      }
    }
  };

  const handleFileLoad = (text) => {
    textContainer.textContent = text;
    textVisible = true;
    showHideBtn.textContent = "Hide";
    textFromFile = text;
    getWords(text);
    renderWords();
  };

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      let fr = new FileReader();
      fr.onload = () => handleFileLoad(fr.result);
      fr.readAsText(file);

      filePathDisplay.textContent = `Selected file: ${file.name}`;
    } else {
      filePathDisplay.textContent = "No file selected";
    }
  });

  const renderWords = () => {
    const sortedWords = words.sort((a, b) => b.count - a.count);
    const wordsContainer = document.getElementById("wordsContainer");
    wordsContainer.innerHTML =
      `<p class="words-container-title inter-bold">Word</p>
      <p class="words-container-title inter-bold">Count</p>` +
      sortedWords
        .map((word) => {
          return `<p class="inter-normal">${word.name}</p><p class="inter-normal">${word.count}</p>`;
        })
        .join("");
  };

  const showHideText = () => {
    if (textVisible) {
      showHideBtn.textContent = "Show text";
      textVisible = false;
      textContainer.textContent = "";
    } else {
      showHideBtn.textContent = "Hide text";
      textVisible = true;
      textContainer.textContent = textFromFile;
    }
  };

  showHideBtn.addEventListener("click", showHideText);
});
