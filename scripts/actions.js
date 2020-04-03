function valueCreator(obj, path, pathsArray, valuesArray) { // Creates the paths of the key and stores it in an array and also strores the values in an array
    path = path || "";
    let objKeys = Object.keys(obj);
    objKeys.forEach(key => {
        let currentKey = key;
        let currentValue = obj[currentKey];
        if (Array.isArray(currentValue)) {
            arrayProcess(currentKey, currentValue, path, pathsArray, valuesArray);
        } else if (isObject(currentValue)) {
            objProcess(currentKey, currentValue, path, pathsArray, valuesArray, false);
        } else if (currentValue == null && path == "") {
            pathsArray.push(currentKey);
            valuesArray.push("");
        } else if (currentValue == null) {
            prevPath = path;
            path = path + '.' + currentKey;
            pathsArray.push(path);
            valuesArray.push("");
            path = prevPath;
        } else if (path == "") {
            pathsArray.push(currentKey);
            valuesArray.push(currentValue);
        } else {
            prevPath = path;
            path = path + '.' + currentKey;
            pathsArray.push(path);
            valuesArray.push(currentValue);
            path = prevPath;
        }
    });
}

function objProcess(currentKey, currentValue, path, pathsArray, valuesArray, flag) { // Does the processing for each object
    if (flag == true) {
        path = path + '[' + currentKey + ']';
    } else {
        path = path + '.' + currentKey;
    }
    valueCreator(currentValue, path, pathsArray, valuesArray);
}

function arrayProcess(currentKey, currentValue, path, pathsArray, valuesArray) { // Does the processing for each array 
    path = path + '.' + currentKey;
    currentValue.forEach((element, objIndex) => {
        objProcess(objIndex, element, path, pathsArray, valuesArray, true);
    });

}

const isObject = obj => obj === Object(obj); // Checks if object or not.

function setBaseFile() { // Sets the base file as per the radio button
    if (firstFileRadio.checked == true) {
        // Sets the left hand side file to be base
        flag = true;
        baseObjPaths = object1Paths;
        compareObjPaths = object2Paths;
        baseObjValues = object1Values;
        compareObjValues = object2Values;
        baseTable = firstTable;
        compareTable = secondTable;
    } else if (secondFileRadio.checked == true) {
        // Sets the right hand side file to be base
        flag = true;
        baseObjPaths = object2Paths;
        compareObjPaths = object1Paths;
        baseObjValues = object2Values;
        compareObjValues = object1Values;
        baseTable = secondTable;
        compareTable = firstTable;
    }
}

function starter() { // The function that is called when the start button is pressed and it enables the functionality
    let d = new Date();
    console.log(d);
    if (startFlag == true) {
        object1Paths = [];
        object2Paths = [];
        object1Values = [];
        object2Values = [];
        valueCreator(obj1, "", object1Paths, object1Values);
        valueCreator(obj2, "", object2Paths, object2Values);
        startFlag = false;
    }
    setBaseFile();
    if (baseObjPaths != null && compareObjPaths != null && flag == true) {
        rightButton.disabled = false;
        leftButton.disabled = false;
        allRightButton.disabled = false;
        allLeftButton.disabled = false;
        searchBtn.disabled = false;
        clear.disabled = false;
        if (tableOneKeyIndex > 1 && tableTwoKeyIndex > 1) {
            while (firstTable.hasChildNodes()) {
                firstTable.removeChild(firstTable.firstChild);
            }
            while (secondTable.hasChildNodes()) {
                secondTable.removeChild(secondTable.firstChild);
            }
            tableOneKeyIndex = 1;
            tableTwoKeyIndex = 1;
        }
        createTableWithHeadings(firstTable, tableHeadings);
        createTableWithHeadings(secondTable, tableHeadings);
        tablePolulator(baseObjPaths, compareObjPaths, baseObjValues, compareObjValues, baseTable, compareTable);
    }
    d = new Date();
    console.log(d);
}

function moveRight(keyArray) {
    if (changeIndex < 0) {
        actions["undoStack"] = actions["undoStack"].slice(-1, changeIndex);
        actions["redoStack"] = actions["redoStack"].slice(-1, changeIndex);
        changeIndex = 0;
    } else {
        actions["undoStack"] = actions["undoStack"].slice(0, changeIndex);
        actions["redoStack"] = actions["redoStack"].slice(0, changeIndex);
    }
    // console.log(actions["undoStack"]);
    // console.log(actions["redoStack"]);
    changeIndex++;
    saveRightFile.disabled = false;
    saveRightFile.style.color = "white";
    saveRightFile.style.backgroundColor = "green";
    undoButton.disabled = false;
    redoButton.disabled = false;
    let beforeMoveArray = [];
    let afterMoveArray = [];
    let tempKeyArray = keyArray.slice(0);
    console.log(keyArray);
    tempKeyArray.forEach(element => {
        console.log(element);
        let beforeMoveObj = {};
        let afterMoveObj = {};
        tableTwoId = element.replace("firstTable", "secondTable");
        tableOneId = element.replace("secondTable", "firstTable");
        rowTableOne = document.getElementById(tableOneId);
        rowTableTwo = document.getElementById(tableTwoId);
        cellsTableOne = rowTableOne.getElementsByTagName("td");
        cellsTableTwo = rowTableTwo.getElementsByTagName("td");
        beforeMoveObj["tableOneId"] = tableOneId;
        beforeMoveObj["tableTwoId"] = tableTwoId;
        beforeMoveObj["tableOneKeyValue"] = cellsTableOne[0].innerText;
        beforeMoveObj["tableTwoKeyValue"] = cellsTableTwo[0].innerText;
        beforeMoveObj["tableOnePathValue"] = cellsTableOne[1].innerText;
        beforeMoveObj["tableTwoPathValue"] = cellsTableTwo[1].innerText;
        beforeMoveArray.unshift(beforeMoveObj);
        cellsTableTwo[0].innerText = cellsTableOne[0].innerText;
        cellsTableTwo[1].innerText = cellsTableOne[1].innerText;
        afterMoveObj["tableOneId"] = tableOneId;
        afterMoveObj["tableTwoId"] = tableTwoId;
        afterMoveObj["tableOneKeyValue"] = cellsTableOne[0].innerText;
        afterMoveObj["tableTwoKeyValue"] = cellsTableTwo[0].innerText;
        afterMoveObj["tableOnePathValue"] = cellsTableOne[1].innerText;
        afterMoveObj["tableTwoPathValue"] = cellsTableTwo[1].innerText;
        afterMoveArray.unshift(afterMoveObj);
        rowTableOne.click();
    });
    actions["undoStack"].splice(changeIndex, 0, beforeMoveArray);
    actions["redoStack"].splice(changeIndex, 0, afterMoveArray);

}

function moveLeft(keyArray) {
    if (changeIndex < 0) {
        actions["undoStack"] = actions["undoStack"].slice(-1, changeIndex);
        actions["redoStack"] = actions["redoStack"].slice(-1, changeIndex);
        changeIndex = 0;
    } else {
        actions["undoStack"] = actions["undoStack"].slice(0, changeIndex);
        actions["redoStack"] = actions["redoStack"].slice(0, changeIndex);
    }
    // console.log(actions["undoStack"]);
    // console.log(actions["redoStack"]);
    changeIndex++;
    saveLeftFile.disabled = false;
    saveLeftFile.style.color = "white";
    saveLeftFile.style.backgroundColor = "green";
    undoButton.disabled = false;
    redoButton.disabled = false;
    let beforeMoveArray = [];
    let afterMoveArray = [];
    let tempKeyArray = keyArray.slice(0);
    console.log(keyArray);
    tempKeyArray.forEach(element => {
        let beforeMoveObj = {};
        let afterMoveObj = {};
        tableTwoId = element.replace("firstTable", "secondTable");
        tableOneId = element.replace("secondTable", "firstTable");
        rowTableOne = document.getElementById(tableOneId);
        rowTableTwo = document.getElementById(tableTwoId);
        cellsTableOne = rowTableOne.getElementsByTagName("td");
        cellsTableTwo = rowTableTwo.getElementsByTagName("td");
        beforeMoveObj["tableOneId"] = tableOneId;
        beforeMoveObj["tableTwoId"] = tableTwoId;
        beforeMoveObj["tableOneKeyValue"] = cellsTableOne[0].innerText;
        beforeMoveObj["tableTwoKeyValue"] = cellsTableTwo[0].innerText;
        beforeMoveObj["tableOnePathValue"] = cellsTableOne[1].innerText;
        beforeMoveObj["tableTwoPathValue"] = cellsTableTwo[1].innerText;
        beforeMoveArray.unshift(beforeMoveObj);
        cellsTableOne[0].innerText = cellsTableTwo[0].innerText;
        cellsTableOne[1].innerText = cellsTableTwo[1].innerText;
        afterMoveObj["tableOneId"] = tableOneId;
        afterMoveObj["tableTwoId"] = tableTwoId;
        afterMoveObj["tableOneKeyValue"] = cellsTableOne[0].innerText;
        afterMoveObj["tableTwoKeyValue"] = cellsTableTwo[0].innerText;
        afterMoveObj["tableOnePathValue"] = cellsTableOne[1].innerText;
        afterMoveObj["tableTwoPathValue"] = cellsTableTwo[1].innerText;
        afterMoveArray.unshift(afterMoveObj);
        rowTableOne.click();
    });
    actions["undoStack"].splice(changeIndex, 0, beforeMoveArray);
    actions["redoStack"].splice(changeIndex, 0, afterMoveArray);

}

function selectMoveRight() {
    moveRight(selectedValues);
}

function selectMoveLeft() {
    moveLeft(selectedValues);
}

function allMoveRight() {
    moveRight(allMoveRightArray);

}

function allMoveLeft() {
    moveLeft(allMoveLeftArray);
}

function undo() {
    console.log("i am called undo");
    console.log("changeIndex");
    console.log(changeIndex);
    changeIndex--;
    console.log("--")
    console.log("changeIndex");
    console.log(changeIndex);
    if (changeIndex > -1) {
        let tempObj = actions["undoStack"][changeIndex];
        tempObj.forEach(element => {
            rowTableOne = document.getElementById(element.tableOneId);
            rowTableTwo = document.getElementById(element.tableTwoId);
            cellsTableOne = rowTableOne.getElementsByTagName("td");
            cellsTableTwo = rowTableTwo.getElementsByTagName("td");
            cellsTableOne[0].innerText = element.tableOneKeyValue;
            cellsTableTwo[0].innerText = element.tableTwoKeyValue;
            cellsTableOne[1].innerText = element.tableOnePathValue;
            cellsTableTwo[1].innerText = element.tableTwoPathValue;
        });
        redoButton.disabled = false;
        if (changeIndex == 0) {
            undoButton.disabled = true;
            //changeIndex--;
            console.log("--")
            console.log("changeIndex");
            console.log(changeIndex);
            console.log("undo disabled");
        }
        undoFlag = true;
    } else {
        undoButton.disabled = true;
    }
    console.log("end of undo")
}

function redo() {
    console.log("i am called redo");
    console.log("changeIndex");
    console.log(changeIndex);
    undoFlag == true ? undoFlag = false : changeIndex++;
    console.log("++")
    console.log("changeIndex");
    console.log(changeIndex);
    if (changeIndex <= actions["undoStack"].length - 1) {
        let tempObj = actions["redoStack"][changeIndex];
        console.log(tempObj);
        tempObj.forEach(element => {
            rowTableOne = document.getElementById(element.tableOneId);
            rowTableTwo = document.getElementById(element.tableTwoId);
            cellsTableOne = rowTableOne.getElementsByTagName("td");
            cellsTableTwo = rowTableTwo.getElementsByTagName("td");
            cellsTableOne[0].innerText = element.tableOneKeyValue;
            cellsTableTwo[0].innerText = element.tableTwoKeyValue;
            cellsTableOne[1].innerText = element.tableOnePathValue;
            cellsTableTwo[1].innerText = element.tableTwoPathValue;
        });
        undoButton.disabled = false;
        if (changeIndex >= actions["undoStack"].length - 1) {
            redoButton.disabled = true;
            changeIndex++;
            console.log("++")
            console.log("changeIndex");
            console.log(changeIndex);
            console.log("redo disabled");
        }
    } else {
        redoButton.disabled = true;
    }
    console.log("end of redo")
}

function overflowdisable() {
    if (scrollCheck.checked == true) {
        actionDiv.style.transform = "translate(-66.5%, -21%)";
        firstTableDiv.style.border = "none";
        secondTableDiv.style.border = "none";
        firstTableDiv.style.overflow = "initial";
        secondTableDiv.style.overflow = "initial";
        tableDiv.style.overflow = "scroll";
        firstDiff.disabled = false;
        nextDiff.disabled = false;
        prevDiff.disabled = false;
        lastDiff.disabled = false;
    } else {
        actionDiv.style.transform = "translate(-55%, -21%)";
        firstTableDiv.style.border = "1px solid black";
        secondTableDiv.style.border = "1px solid black";
        firstTableDiv.style.overflow = "scroll";
        secondTableDiv.style.overflow = "scroll";
        tableDiv.style.overflow = "initial";
        firstDiff.disabled = true;
        nextDiff.disabled = true;
        prevDiff.disabled = true;
        lastDiff.disabled = true;
    }
}

function firstDiffFunc() {
    tableTwoId = diffArray[0].replace("firstTable", "secondTable");
    tableOneId = diffArray[0].replace("secondTable", "firstTable");
    rowTableOne = document.getElementById(tableOneId);
    rowTableTwo = document.getElementById(tableTwoId);
    if (temparray.length) {
        temparray[0].style.border = null;
        temparray[1].style.border = null;
        temparray.shift();
        temparray.shift();
    }
    rowTableOne.style.border = "thick solid #0000FF";
    rowTableTwo.style.border = "thick solid #0000FF";
    temparray = [rowTableOne, rowTableTwo];
    temparray.forEach(element => {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
}

function nextDiffFunc() {
    diffArrayIndex++;
    if (diffArrayIndex < diffArray.length) {
        tableTwoId = diffArray[diffArrayIndex].replace("firstTable", "secondTable");
        tableOneId = diffArray[diffArrayIndex].replace("secondTable", "firstTable");
        rowTableOne = document.getElementById(tableOneId);
        rowTableTwo = document.getElementById(tableTwoId);
        if (temparray.length) {
            //console.log(temparray);
            temparray[0].style.border = null;
            temparray[1].style.border = null;
            temparray.shift();
            temparray.shift();
        }
        rowTableOne.style.border = "thick solid #0000FF";
        rowTableTwo.style.border = "thick solid #0000FF";
        temparray.push(rowTableOne, rowTableTwo);
        temparray.forEach(element => {
            element.classList.add('active');
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    } else {
        modalText.textContent = "End of the file reached. Do you want to continue?";
        continueFlag = "nextDiffFunc";
        modal.style.display = "block";
    }
}

//complexity changes for prevDiffFunc
function prevDiffFunc() {
    diffArrayIndex--;
    if (diffArrayIndex < diffArray.length && diffArrayIndex > -1) {
        tableTwoId = diffArray[diffArrayIndex].replace("firstTable", "secondTable");
        tableOneId = diffArray[diffArrayIndex].replace("secondTable", "firstTable");
        rowTableOne = document.getElementById(tableOneId);
        rowTableTwo = document.getElementById(tableTwoId);
        if (temparray.length) {
            temparray[0].style.border = null;
            temparray[1].style.border = null;
            temparray.splice(0, 2);
        }
        rowTableOne.style.border = rowTableTwo.style.border = "thick solid #0000FF";
        temparray.push(rowTableOne, rowTableTwo);
        temparray.forEach(element => {
            element.classList.add('active');
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    } else {
        modalText.textContent = "Top of the file reached. Do you want to continue?";
        continueFlag = "prevDiffFunc";
        modal.style.display = "block";
    }
}

function lastDiffFunc() {
    tableTwoId = diffArray[diffArray.length - 1].replace("firstTable", "secondTable");
    tableOneId = diffArray[diffArray.length - 1].replace("secondTable", "firstTable");
    rowTableOne = document.getElementById(tableOneId);
    rowTableTwo = document.getElementById(tableTwoId);
    if (temparray.length) {
        temparray[0].style.border = null;
        temparray[1].style.border = null;
        temparray.shift();
        temparray.shift();
    }
    rowTableOne.style.border = "thick solid #0000FF";
    rowTableTwo.style.border = "thick solid #0000FF";
    temparray = [rowTableOne, rowTableTwo];
    temparray.forEach(element => {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
}

function search(srcValue) {
    let tableOneCount = 0;
    let tableTwoCount = 0;
    if (srcValue !== "") {
        if (srcValue !== prevSearch && searchFlag == 1) {
            console.log("reached here");
            clearSearch(prevSearch);
        }
        searchDropdown.value == "searchKey" ? cellIndex = 0 : cellIndex = 1;
        let allTables = [firstTable, secondTable];
        allTables.forEach(table => {
            let test = table.tBodies[0].children;
            for (let rowIndex = 1; rowIndex < test.length; rowIndex++) {
                row = test[rowIndex].cells[cellIndex];
                searchString = test[rowIndex].cells[cellIndex].innerText;
                searchResult = searchString.match(srcValue);
                if (searchResult != null) {
                    splitArray = searchString.split(srcValue);
                    let resultPath = "";
                    splitArray.forEach((element, index) => {
                        index == 0 ? resultPath += element : resultPath += "<mark>" + srcValue + "</mark>" + element;
                    });
                    row.innerHTML = resultPath;
                    found = 1;
                    table == firstTable ? tableOneCount += 1 : tableTwoCount += 1;
                }
            }
        });
        if (found == 0) {
            modalText.textContent = "";
            modalText.textContent = "No match found";
            modal.style.display = "block";
            proceedButton.style.display = "none";
            cancelButton.style.display = "none";
            saveButton.style.display = "none";
            okButton.style.display = "inline";
        } else {
            if (firstTableMatch.style.display == "none" && secondTableMatch.style.display == "none") {
                firstTableMatch.style.display = "inline";
                firstTableMatch.innerHTML = firstTableMatch.innerHTML + tableOneCount;
                secondTableMatch.style.display = "inline";
                secondTableMatch.innerHTML = secondTableMatch.innerHTML + tableTwoCount;
            }
        }
        prevSearch = srcValue;
        searchFlag = 1;
    } else {
        console.log("else of search method");
        modalText.textContent = "";
        proceedButton.style.display = "none";
        cancelButton.style.display = "none";
        saveButton.style.display = "none";
        okButton.style.display = "inline";
        modalText.textContent = "Please provide input";
        modal.style.display = "block";
        searchFlag = 1;
    }
}

//complexity changes for clearSearch
function clearSearch(srcValue) {
    if (srcValue !== "") {
        searchDropdown.value == "searchKey" ? cellIndex = 0 : cellIndex = 1;
        let allTables = [firstTable, secondTable];
        allTables.forEach(table => {
            let test = table.tBodies[0].children;
            for (let rowIndex = 1; rowIndex < test.length; rowIndex++) {
                row = test[rowIndex].cells[cellIndex];
                searchString = test[rowIndex].cells[cellIndex].innerText;
                searchResult = searchString.match(srcValue);
                if (searchResult != null) {
                    splitArray = searchString.split(srcValue);
                    let resultPath = "";
                    splitArray.forEach((element, index) => {
                        index == 0 ? resultPath += element : resultPath += srcValue + element;
                    });
                    row.innerHTML = resultPath;
                }
            }
        });
    }

    firstTableMatch.innerHTML = "Total matches in first table: ";
    secondTableMatch.innerHTML = "Total matches in second table: ";
    firstTableMatch.style.display = "none";
    secondTableMatch.style.display = "none";
    found = 0;
}

function resetFileDiv() {
    retry.style.display = "none";
    modal.style.display = "none";
    firstFileSelect.value = "";
    secondFileSelect.value = "";
    proceedButton.style.display = "inline";
    cancelButton.style.display = "inline";
}

function jsonObjectCreator(tableName) {
    let tempObj = {};
    let tableData = tableName.tBodies[0].children;
    let tableKeys = Object.keys(tableData)
    tableKeys.shift();
    tableKeys.forEach(element => {
        let key = tableData[element].cells[0].innerText;
        let value = tableData[element].cells[1].innerText;
        let keyArray = key.split(".");
        if (keyArray[0] == "") {
            keyArray.shift();
        }
        let keyValue = keyArray[keyArray.length - 1];
        for (let index = 0; index < keyArray.length; index++) {
            let keyArrayValue = keyArray[index];
            let matchedValue = keyArrayValue.match(/\[.*?\]/g) || "";
            if (matchedValue == "") {
                if (tempObj.hasOwnProperty(keyArrayValue)) {
                    tempObj[`${keyArrayValue}`][keyValue] = value;
                    index++;
                } else if (index < keyArray.length - 1) {
                    tempObj[keyArrayValue] = {};
                    tempObj[`${keyArrayValue}`][keyValue] = value;
                    index++;
                } else {
                    tempObj[keyArrayValue] = value;
                }
            } else {
                let matchedIndex = parseInt(matchedValue[0].substring(1, 2));
                let arrayName = keyArrayValue.substring(0, keyArrayValue.length - 3);
                if (tempObj.hasOwnProperty(arrayName)) {
                    if (tempObj[`${arrayName}`].length - 1 == matchedIndex) {
                        tempObj[`${arrayName}`][matchedIndex][`${keyValue}`] = value;
                        index++;
                    } else {
                        let obj = {};
                        obj[keyArray[keyArray.length - 1]] = value;
                        tempObj[arrayName].push(obj);
                        index++;
                    }
                } else {
                    tempObj[arrayName] = [];
                    let tempobj = {}
                    tempobj[keyArray[keyArray.length - 1]] = value;
                    tempObj[arrayName].push(tempobj);
                    index++;
                }
            }
        }
    });
    return tempObj;
}

function saveFile(dataObj) {
    let fileData = JSON.stringify(dataObj);
    var blob = new Blob([fileData], {
        type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = "filename";
    a.href = url;
    a.textContent = "Save";
    while (modalSave.hasChildNodes()) {
        modalSave.removeChild(modalSave.firstChild);
    }
    modalSave.appendChild(a);
    modalText.textContent = "";
    proceedButton.style.display = "none";
    cancelButton.style.display = "none";
    okButton.style.display = "none";
    retry.style.display = "none";
    saveButton.style.display = "inline";
    modalText.textContent = "Do you want to save?";
    modal.style.display = "block";
    modalSave.style.display = "inline";
}

function saveRightFileFunc() {
    secondTableObj = jsonObjectCreator(secondTable);
    saveFile(secondTableObj);
}

function saveLeftFileFunc() {
    firstTableObj = jsonObjectCreator(firstTable);
    saveFile(firstTableObj);
}