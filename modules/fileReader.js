let obj1;
let obj2;
let flag;
let startFlag;
let baseObjPaths;
let compareObjPaths;
let baseObjValues;
let compareObjValues;
let baseTable;
let compareTable;

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
        baseObjPaths = object1Paths;
        compareObjPaths = object2Paths;
        baseObjValues = object1Values;
        compareObjValues = object2Values;
        baseTable = firstTable;
        compareTable = secondTable;
    } else if (secondFileRadio.checked == true) {
        flag = true;
        baseObjPaths = object2Paths;
        compareObjPaths = object1Paths;
        baseObjValues = object2Values;
        compareObjValues = object1Values;
        baseTable = secondTable;
        compareTable = firstTable;
    }
}


export {
    onChangeFileOne,
    onChangeFileTwo,
    setBaseFile,
    obj1,
    obj2,
    startFlag,
    flag,
    baseObjPaths,
    compareObjPaths,
    baseObjValues,
    compareObjValues,
    baseTable,
    compareTable
};