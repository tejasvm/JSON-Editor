import * as tableData from './tableCreator.js';
import * as domElement from './domElements.js';
import * as fileReader from './fileReader.js';
import * as utils from "./utils.js";
let tableHeadings = ["<b>Path</b>", "<b>Value</b>"];
let continueFlag;
let flag;
let object1Paths = [];
let object2Paths = [];
let object1Values = [];
let object2Values = [];
let baseObjPaths;
let compareObjPaths;
let baseObjValues;
let compareObjValues;
let baseTable;
let compareTable;

function setBaseFile() {
    if (domElement.firstFileRadio.checked == true) {
        flag = true;
        baseObjPaths = object1Paths;
        compareObjPaths = object2Paths;
        baseObjValues = object1Values;
        compareObjValues = object2Values;
        baseTable = "firstTable";
        compareTable =  "esecondTable";
    } else if (domElement.secondFileRadio.checked == true) {
        flag = true;
        baseObjPaths = object2Paths;
        compareObjPaths = object1Paths;
        baseObjValues = object2Values;
        compareObjValues = object1Values;
        baseTable =  "secondTable";
        compareTable = "firstTable";
    }
}

function starter() {
    if (fileReader.startFlag == true) {
        utils.valueCreator(fileReader.obj1, "", object1Paths, object1Values);
        utils.valueCreator(fileReader.obj2, "", object2Paths, object2Values);
        //fileReader.startFlag = false;
    }
    setBaseFile();
    if (fileReader.baseObjPaths != null && fileReader.compareObjPaths != null && fileReader.flag == true) {
        domElement.rightButton.disabled = false;
        domElement.leftButton.disabled = false;
        domElement.allRightButton.disabled = false;
        domElement.allLeftButton.disabled = false;
        domElement.searchBtn.disabled = false;
        domElement.clear.disabled = false;
        if (tableData.tableOneKeyIndex > 1 && tableData.tableTwoKeyIndex > 1) {
            while (firstTable.hasChildNodes()) {
                domElement.firstTable.removeChild(firstTable.firstChild);
            }
            while (domElement.secondTable.hasChildNodes()) {
                domElement.secondTable.removeChild(secondTable.firstChild);
            }
            tableData.tableOneKeyIndex = 1;
            tableData.tableTwoKeyIndex = 1;
        }
        tableData.createTableWithHeadings(domElement.firstTable, tableHeadings);
        tableData.createTableWithHeadings(domElement.secondTable, tableHeadings);
        tablePolulator(fileReader.baseObjPaths, fileReader.compareObjPaths,fileReader.baseObjValues, fileReader.compareObjValues, fileReader.baseTable, fileReader.compareTable);
    } else {
        domElement.fileDiv.style.display = "none";
        domElement.errorDiv.style.display = "block";
        domElement.checkBoxErrorMsg.style.display = "block";
    }
}

function selectMoveRight() {
    moveRight(tableData.selectedValues);
}

function selectMoveLeft() {
    moveLeft(tableData.selectedValues)
}

function allMoveRight() {
    moveRight(tableData.allMoveRightArray);

}

function allMoveLeft() {
    moveLeft(tableData.allMoveLeftArray);
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

function overflowdisable() {
    if (domElement.scrollCheck.checked == true) {
        domElement.scrollDiv.style.transform = "translate(-66.5%, -21%)";
        domElement.firstTableDiv.style.border = "none";
        domElement.secondTableDiv.style.border = "none";
        domElement.firstTableDiv.style.overflow = "initial";
        domElement.secondTableDiv.style.overflow = "initial";
        domElement.tableDiv.style.overflow = "scroll";
        domElement.firstDiff.disabled = false;
        domElement.nextDiff.disabled = false;
        domElement.prevDiff.disabled = false;
        domElement.lastDiff.disabled = false;
    } else {
        domElement.scrollDiv.style.transform = "translate(-55%, -21%)";
        domElement.firstTableDiv.style.border = "1px solid black";
        domElement.secondTableDiv.style.border = "1px solid black";
        domElement.firstTableDiv.style.overflow = "scroll";
        domElement.secondTableDiv.style.overflow = "scroll";
        domElement.tableDiv.style.overflow = "initial";
        domElement.firstDiff.disabled = true;
        domElement.nextDiff.disabled = true;
        domElement.prevDiff.disabled = true;
        domElement.lastDiff.disabled = true;
    }
}

function firstDiffFunc() {
    tableTwoId = tableData.diffArray[0].replace("firstTable", "secondTable");
    tableOneId = tableData.diffArray[0].replace("secondTable", "firstTable");
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
    if (diffArrayIndex < tableData.diffArray.length) {
        tableTwoId = tableData.diffArray[diffArrayIndex].replace("firstTable", "secondTable");
        tableOneId = tableData.diffArray[diffArrayIndex].replace("secondTable", "firstTable");
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
        domElement.popLabel.innerHTML = "End of the file reached. Do you want to continue:";
        continueFlag = "nextDiffFunc";
        domElement.popSpan.classList.toggle("show");
        }
    }


function prevDiffFunc() {
    diffArrayIndex--;
    if (diffArrayIndex < diffArray.length && diffArrayIndex > -1) {
        tableTwoId = diffArray[diffArrayIndex].replace("firstTable", "secondTable");
        tableOneId = diffArray[diffArrayIndex].replace("secondTable", "firstTable");
        rowTableOne = document.getElementById(tableOneId);
        rowTableTwo = document.getElementById(tableTwoId);
        if (temparray.length) {
            console.log(temparray);
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
        domElement.popLabel.innerHTML = "Top of the file reached. Do you want to continue:";
        continueFlag = "prevDiffFunc";
        domElement.popSpan.classList.toggle("show");
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

function search(srcValue) {
    let tableOneCount = 0;
    let tableTwoCount = 0;
    if (srcValue !== "") {
        if (srcValue !== prevSearch && searchFlag == 1) {
            console.log("reached here");
            clearSearch(prevSearch);
        }
        if (domElement.searchDropdown.value == "searchKey") {
            cellIndex = 0;
        } else {
            cellIndex = 1;
        }
        let allTables = [domElement.firstTable, domElement.secondTable];
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
                        if (index == 0) {
                            resultPath += element;
                        } else {
                            resultPath += "<mark>" + srcValue + "</mark>" + element;
                        }
                    });
                    row.innerHTML = resultPath;
                    found = 1;
                    if (table == firstTable) {
                        tableOneCount += 1;
                    } else if (table == secondTable) {
                        tableTwoCount += 1;
                    }
                }
            }
        });
        if (found == 0) {
            domElement.noMatch.style.display = "block";
        } else {
            if (domElement.firstTableMatch.style.display == "none" && domElement.secondTableMatch.style.display == "none") {
                domElement.firstTableMatch.style.display = "block";
                domElement.firstTableMatch.innerHTML = firstTableMatch.innerHTML + tableOneCount;
                domElement.secondTableMatch.style.display = "block";
                domElement.secondTableMatch.innerHTML = secondTableMatch.innerHTML + tableTwoCount;
            }
        }
        prevSearch = srcValue;
        searchFlag = 1;
    } else {
        domElement.emptySearch.style.display = "block";
        searchFlag = 1;
    }
}

function clearSearch(srcValue) {
    if (srcValue !== "") {
        if (domElement.searchDropdown.value == "searchKey") {
            cellIndex = 0;
        } else {
            cellIndex = 1;
        }
        let allTables = [domElement.firstTable, domElement.secondTable];
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
                        if (index == 0) {
                            resultPath += element;
                        } else {
                            resultPath += srcValue + element;
                        }
                    });
                    row.innerHTML = resultPath;
                }
            }
        });
    }

    domElement.firstTableMatch.innerHTML = "Total matches in first table: ";
    domElement.secondTableMatch.innerHTML = "Total matches in second table: ";
    domElement.noMatch.style.display = "none";
    domElement.firstTableMatch.style.display = "none";
    domElement.secondTableMatch.style.display = "none";
    found = 0;
}

export {
    starter,
    selectMoveRight,
    selectMoveLeft,
    allMoveRight,
    allMoveLeft,
    overflowdisable,
    search,
    clearSearch,
    firstDiffFunc,
    nextDiffFunc,
    prevDiffFunc,
    lastDiffFunc,
    baseObjPaths,
    compareObjPaths,
    baseObjValues,
    compareObjValues,
    baseTable,
    compareTable,
    continueFlag
};