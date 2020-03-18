function onChangeFileOne(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoadFileOne;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoadFileOne(event) {
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
    if(fileOnePresent && fileTwoPresent){
        startButton.disabled = false;
    }
}


function onChangeFileTwo(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoadFileTwo;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoadFileTwo(event) {
    try {
        obj2 = JSON.parse(event.target.result);
    } catch (error) {
        console.log(error)
        modal.style.display = "block";
        modalText.textContent = "File type not supported. Please provide a JSON file.";
        proceedButton.style.display = "none";
        retry.style.display = "inline";
        cancelButton.style.display = "none";
    }
    startFlag = true;
    fileTwoPresent = true;
    if(fileOnePresent && fileTwoPresent){
        startButton.disabled = false;
    }
}