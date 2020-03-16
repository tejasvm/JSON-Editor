let obj1;
let obj2;
let startFlag;
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
        fileDiv.style.display = "none";
        errorDiv.style.display = "block";
        fileErrorMsg.style.display = "block";
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
        fileDiv.style.display = "none";
        errorDiv.style.display = "block";
        fileErrorMsg.style.display = "block";
    }
    startFlag = true;
}

function setBaseFile() {
    if (firstFileRadio.checked == true) {
        flag = true;
        value1 = object1Paths;
        value2 = object2Paths;
        value3 = object1Values;
        value4 = object2Values;
        value5 = firstTable;
        value6 = secondTable;
    } else if (secondFileRadio.checked == true) {
        flag = true;
        value1 = object2Paths;
        value2 = object1Paths;
        value3 = object2Values;
        value4 = object1Values;
        value5 = secondTable;
        value6 = firstTable;
    }
}


export {
    onChangeFileOne,
    onChangeFileTwo,
    setBaseFile,
    obj1,
    obj2,
    startFlag
};