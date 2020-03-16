import * as domElement from './domElements.js';

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



export {
    onChangeFileOne,
    onChangeFileTwo,
    obj1,
    obj2,
    startFlag
};