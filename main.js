
closeSign.addEventListener("click", function() {
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


appendToNode(modalHeader, [closeSign, modalHeading]);
appendToNode(modalBody, [modalText]);
appendToNode(modalFooter, [proceedButton, cancelButton]);
appendToNode(modalContent, [modalHeader, modalBody, modalFooter]);
appendToNode(modal, [modalContent]);
//changes end

firstTableMatch.style.display = "none";
secondTableMatch.style.display = "none";
firstFileRadio.checked = true;
firstDiff.disabled = true;
nextDiff.disabled = true;
prevDiff.disabled = true;
lastDiff.disabled = true;
noMatch.style.display = "none";
emptySearch.style.display = "none";

startButton.addEventListener("click", starter);
saveRightFile.addEventListener("click", saveRightFileFunc);
saveLeftFile.addEventListener("click", saveLeftFileFunc);
rightButton.addEventListener("click", selectMoveRight);
leftButton.addEventListener("click", selectMoveLeft);
allRightButton.addEventListener("click", allMoveRight);
allLeftButton.addEventListener("click", allMoveLeft);
firstDiff.addEventListener("click", firstDiffFunc);
nextDiff.addEventListener("click", nextDiffFunc);
prevDiff.addEventListener("click", prevDiffFunc);
lastDiff.addEventListener("click", lastDiffFunc)
retry.addEventListener("click", resetFileDiv);
scrollCheck.addEventListener("click", overflowdisable);
searchBtn.addEventListener("click", function() {
    searchValue = input.value;
    search(searchValue);
});
clear.addEventListener("click", function() {
    searchValue = input.value;
    clearSearch(searchValue);
});
firstFileSelect.addEventListener('change', onChangeFileOne);
secondFileSelect.addEventListener('change', onChangeFileTwo);
proceedButton.addEventListener("click", function() {
    if (continueFlag == "prevDiffFunc") {
        diffArrayIndex = diffArray.length;
        prevDiffFunc();
    } else if (continueFlag == "nextDiffFunc") {
        diffArrayIndex = -1;
        nextDiffFunc();
    }
    modal.style.display = "none"; //changes
    modalText.textContent = ""; //changes
});

cancelButton.addEventListener("click", function() {
    continueFlag = false;
    modal.style.display = "none"; //changes
    modalText.textContent = ""; //changes
});
input.addEventListener("click", function() {
    emptySearch.style.display = "none";
});


//Appends the left and right JSON display frames to the DOM
appendToNode(firstTableDiv, [firstTable]);
appendToNode(secondTableDiv, [secondTable]);

//File upload control
appendToNode(fileDiv, [firstFileSelect, secondFileSelect, checkboxDiv]);
appendToNode(errorDiv, [fileErrorMsg, checkBoxErrorMsg, retry]);
appendToNode(firstCheckDiv, [firstFileRadio, checklabel]);
appendToNode(secondCheckDiv, [secondFileRadio, checklabel.cloneNode(true)]);
appendToNode(checkboxDiv, [firstCheckDiv, secondCheckDiv]);
appendToNode(tableDiv, [firstTableDiv, scrollDiv, secondTableDiv]);
appendToNode(searchDropdown, [optionOne, optionTwo]);
appendToNode(buttonDiv, [firstDiff, nextDiff, prevDiff, lastDiff, searchDropdown, input, searchBtn, clear, firstTableMatch, secondTableMatch]);
appendToNode(buttonDivTwo, [saveLeftFile, saveRightFile]);
appendToNode(body, [modal, buttonDiv, hr, fileDiv, errorDiv, br.cloneNode(true), hr.cloneNode(true), tableDiv, buttonDivTwo]); //change
appendToNode(scrollDiv, [startButton, br.cloneNode(true), br.cloneNode(true), rightButton, br.cloneNode(true), br.cloneNode(true), allRightButton, br.cloneNode(true), br.cloneNode(true), leftButton, br.cloneNode(true), br.cloneNode(true), allLeftButton, br.cloneNode(true), br.cloneNode(true), scrollCheckLabel, scrollCheck]);



function saveRightFileFunc() {

}

function saveLeftFileFunc() {

}

function overflowdisable() {
    if (scrollCheck.checked == true) {
        scrollDiv.style.transform = "translate(-66.5%, -21%)";
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
        scrollDiv.style.transform = "translate(-55%, -21%)";
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

function resetFileDiv() {
    fileDiv.style.display = "block";
    errorDiv.style.display = "none";
    fileErrorMsg.style.display = "none";
    checkBoxErrorMsg.style.display = "none";
    firstFileSelect.value = "";
    secondFileSelect.value = "";
}



//complexity changes for search
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
        } else {
            if (firstTableMatch.style.display == "none" && secondTableMatch.style.display == "none") {
                firstTableMatch.style.display = "block";
                firstTableMatch.innerHTML = firstTableMatch.innerHTML + tableOneCount;
                secondTableMatch.style.display = "block";
                secondTableMatch.innerHTML = secondTableMatch.innerHTML + tableTwoCount;
            }
        }
        prevSearch = srcValue;
        searchFlag = 1;
    } else {
        console.log("else of dearch method");
        modalText.textContent = "";
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
    noMatch.style.display = "none";
    firstTableMatch.style.display = "none";
    secondTableMatch.style.display = "none";
    found = 0;
}

function createTableWithHeadings(tableName, tableHeadings) {
    var row = tableName.insertRow(0);
    tableHeadings.forEach((tableHeading, index) => {
        row.insertCell(index).innerHTML = tableHeading;
    });
    headingsPresent = true;
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


function onChangeFileOne(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoadFileOne;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoadFileOne(event) {
    //console.log(event);
    try {
        obj1 = JSON.parse(event.target.result);
    } catch (error) {
        console.log(error)
        fileDiv.style.display = "none";
        errorDiv.style.display = "block";
        fileErrorMsg.style.display = "block";
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
    temparray = [rowTableOne, rowTableTwo]
    temparray.forEach(element => {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
}

let diffArrayIndex = -1;
let temparray = [];

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
        temparray.push(rowTableOne)
        temparray.push(rowTableTwo)
        temparray.forEach(element => {
            element.classList.add('active');
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    } else {
        modalText.textContent = "End of the file reached. Do you want to continue:";
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
        modalText.textContent = "Top of the file reached. Do you want to continue:";
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
    temparray = [rowTableOne, rowTableTwo]
    temparray.forEach(element => {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
}

function starter() {
    setBaseFile();
    if (startFlag == true) {
        valueCreator(obj1, "", object1Paths, object1Values);
        valueCreator(obj2, "", object2Paths, object2Values);
        startFlag = false;
    }
    if (value1 != null && value2 != null && flag == true) {
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
        tablePolulator(value1, value2, value3, value4, value5, value6);
    } else {
        fileDiv.style.display = "none";
        errorDiv.style.display = "block";
        checkBoxErrorMsg.style.display = "block";
    }
}

function selectMoveRight() {
    moveRight(selectedValues);
}

function selectMoveLeft() {
    moveLeft(selectedValues)
}

function allMoveRight() {
    moveRight(allMoveRightArray);

}

function allMoveLeft() {
    moveLeft(allMoveLeftArray);
}

function moveRight(keyArray) {
    console.log(keyArray);
    keyArray.forEach(element => {
        //move from table1 to table2
        tableTwoId = element.replace("firstTable", "secondTable");
        tableOneId = element.replace("secondTable", "firstTable");
        rowTableOne = document.getElementById(tableOneId);
        rowTableTwo = document.getElementById(tableTwoId)
        cellsTableone = rowTableOne.getElementsByTagName("td");
        cellsTableTwo = rowTableTwo.getElementsByTagName("td");
        cellsTableTwo[0].innerText = cellsTableone[0].innerText;
        cellsTableTwo[1].innerText = cellsTableone[1].innerText;

    });
}

function moveLeft(keyArray) {
    keyArray.forEach(element => {
        //move from table2 to table1
        tableTwoId = element.replace("firstTable", "secondTable");
        tableOneId = element.replace("secondTable", "firstTable");
        rowTableOne = document.getElementById(tableOneId);
        rowTableTwo = document.getElementById(tableTwoId);
        cellsTableone = rowTableOne.getElementsByTagName("td");
        cellsTableTwo = rowTableTwo.getElementsByTagName("td");
        cellsTableone[0].innerText = cellsTableTwo[0].innerText;
        cellsTableone[1].innerText = cellsTableTwo[1].innerText;

    });
}

function onChangeFileTwo(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoadFileTwo;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoadFileTwo(event) {
    //console.log(event);
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

let tableOneKeyIndex = 1;
let tableTwoKeyIndex = 1;


function createTableRows(tableName, key, value, type) {
    //console.log("row")
    if (tableName == firstTable) {
        row = tableName.insertRow(tableOneKeyIndex);
        row.insertCell(0).innerHTML = key;
        row.insertCell(1).innerHTML = value;
        //row.setAttribute('id', tableIndex);
        row.setAttribute('class', type);
        row.setAttribute('id', `${"firstTable"+tableOneKeyIndex}`)
        row.onclick = function() {
            selectedRowsFunction(this)
        }
        tableOneKeyIndex++;
    } else {
        row = tableName.insertRow(tableTwoKeyIndex);
        row.insertCell(0).innerHTML = key;
        row.insertCell(1).innerHTML = value;
        //row.setAttribute('id', tableIndex);
        row.setAttribute('class', type);
        row.setAttribute('id', `${"secondTable"+ tableTwoKeyIndex}`)
        row.onclick = function() {
            selectedRowsFunction(this)
        }
        tableTwoKeyIndex++;
    }
}

function selectedRowsFunction(row) {
    id = row.getAttribute("id");
    selectedValues.push(id);
    tableTwoId = id.replace("firstTable", "secondTable");
    tableOneId = id.replace("secondTable", "firstTable");
    rowTableOne = document.getElementById(tableOneId);
    rowTableTwo = document.getElementById(tableTwoId);
    diffArrayIndex = diffArray.indexOf(tableOneId) || diffArray.indexOf(tableTwoId);
    prevclassRowOne = rowTableOne.getAttribute("class");
    prevclassRowTwo = rowTableTwo.getAttribute("class");
    rowTableOne.removeAttribute("class");
    rowTableOne.setAttribute("class", "active")
    rowTableOne.onclick = function() {
        deselectedRowsFunction(this, prevclassRowOne, prevclassRowTwo)
    }
    rowTableTwo.removeAttribute("class");
    rowTableTwo.setAttribute("class", "active")
    rowTableTwo.onclick = function() {
        deselectedRowsFunction(this, prevclassRowOne, prevclassRowTwo)
    }
}

function deselectedRowsFunction(row, prevclassRowOne, prevclassRowTwo) {
    id = row.getAttribute("id");
    let index = selectedValues.indexOf(id);
    if (index > -1) {
        selectedValues.splice(selectedValues, 1);
    }
    tableTwoId = id.replace("firstTable", "secondTable");
    tableOneId = id.replace("secondTable", "firstTable");
    rowTableOne = document.getElementById(tableOneId);
    rowTableTwo = document.getElementById(tableTwoId);
    diffArrayIndex = -1;
    if (temparray.length) {
        temparray[0].style.border = null;
        temparray[1].style.border = null;
    }
    rowTableOne.removeAttribute("class");
    rowTableOne.setAttribute("class", prevclassRowOne)
    rowTableTwo.removeAttribute("class");
    rowTableTwo.setAttribute("class", prevclassRowTwo)
    rowTableOne.onclick = function() {
        selectedRowsFunction(this)
    }
    rowTableTwo.onclick = function() {
        selectedRowsFunction(this)
    }
}

const isObject = obj => obj === Object(obj);

function valueCreator(obj, path, pathsArray, valuesArray) {
    path = path || "";
    let objKeys = Object.keys(obj);
    objKeys.forEach(key => {
        let currentKey = key;
        let currentValue = obj[currentKey];
        if (Array.isArray(currentValue)) {
            arrayProcess(currentKey, currentValue, path, pathsArray, valuesArray)
        } else if (isObject(currentValue)) {
            objProcess(currentKey, currentValue, path, pathsArray, valuesArray, false)
        } else if (currentValue == null && path == "") {
            pathsArray.push(currentKey)
            valuesArray.push("")
        } else if (currentValue == null) {
            prevPath = path;
            path = path + '.' + currentKey;
            pathsArray.push(path)
            valuesArray.push("")
            path = prevPath;
        } else if (path == "") {
            pathsArray.push(currentKey)
            valuesArray.push(currentValue)
        } else {
            prevPath = path;
            path = path + '.' + currentKey;
            pathsArray.push(path)
            valuesArray.push(currentValue)
            path = prevPath;
        }
    });
}

function objProcess(currentKey, currentValue, path, pathsArray, valuesArray, flag) {
    if (flag == true) {
        path = path + '[' + currentKey + ']';
    } else {
        path = path + '.' + currentKey;
    }
    valueCreator(currentValue, path, pathsArray, valuesArray);
}

function arrayProcess(currentKey, currentValue, path, pathsArray, valuesArray) {
    path = path + '.' + currentKey;
    currentValue.forEach((element, objIndex) => {
        objProcess(objIndex, element, path, pathsArray, valuesArray, true)
    });

}

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}


function tablePolulator(object1PathsArray, object2PathsArray, object1ValuesArray, object2ValuesArray, tableOne, tableTwo) {
    object1PathsArray.forEach((element, index) => {
        if (object2PathsArray.includes(element)) {
            indexValue = object2PathsArray.indexOf(element)
            if (object1ValuesArray[index] == object2ValuesArray[indexValue]) {
                createTableRows(tableOne, element, object1ValuesArray[index], "normal")
                createTableRows(tableTwo, object2PathsArray[indexValue], object2ValuesArray[indexValue], "normal")
            } else {
                createTableRows(tableOne, element, object1ValuesArray[index], "blue")
                createTableRows(tableTwo, object2PathsArray[indexValue], object2ValuesArray[indexValue], "blue")
            }
        } else {
            allMoveRightArray.push(`${"firstTable"+tableTwoKeyIndex}`)
            createTableRows(tableOne, element, object1ValuesArray[index], "green")
            createTableRows(tableTwo, "", "", "red")
        }
    });

    object2PathsArray.forEach((element, index) => {
        if (object1PathsArray.includes(element)) {
            //continue;
        } else {
            allMoveLeftArray.push(`${"firstTable"+tableTwoKeyIndex}`)
            createTableRows(tableOne, "", "", "red")
            createTableRows(tableTwo, element, object2ValuesArray[index], "green")
        }

    });

    diffArray = allMoveRightArray.concat(allMoveLeftArray);
}