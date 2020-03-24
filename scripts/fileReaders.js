function onChangeFileOne(event) {
    // Takes the file input from user and once the file is loaded calls the onReaderLoadFile function
    let reader = new FileReader();
    reader.onload = onReaderLoadFileOne;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoadFileOne(event) {
    // Trys to make the object of the and stores it if not gives an error message
    try {
        obj1 = JSON.parse(event.target.result);
    } catch (error) {
        console.log(error)
        modal.style.display = "block";
        modalText.textContent = "File type not supported. Please provide a JSON file.";
        proceedButton.style.display = "none";
        cancelButton.style.display = "none";
        retry.style.display = "inline";
    }
    fileOnePresent = true;
    if (fileOnePresent && fileTwoPresent) {
        // Checks if both the files are present and enables the start button and sets the startflag to be true;
        startButton.disabled = false;
        startFlag = true;
    }
}


function onChangeFileTwo(event) {
    // Takes the file input from user and once the file is loaded calls the onReaderLoadFile function
    let reader = new FileReader();
    reader.onload = onReaderLoadFileTwo;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoadFileTwo(event) {
    // Trys to make the object of the and stores it if not gives an error message
    try {
        obj2 = JSON.parse(event.target.result);
    } catch (error) {
        // Gives a popup to the user with the error message;
        console.log(error);
        modal.style.display = "block";
        modalText.textContent = "File type not supported. Please provide a JSON file.";
        proceedButton.style.display = "none";
        retry.style.display = "inline";
        cancelButton.style.display = "none";
    }
    fileTwoPresent = true;
    if (fileOnePresent && fileTwoPresent) {
        // Checks if both the files are present and enables the start button and sets the startflag to be true;
        startButton.disabled = false;
        startFlag = true;
    }
}