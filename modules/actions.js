import * as tableData from './modules/tableCreator.js';
let tableHeadings = ["<b>Path</b>", "<b>Value</b>"];

function starter() {
    if (startFlag == true) {
        valueCreator(obj1, "", object1Paths, object1Values);
        valueCreator(obj2, "", object2Paths, object2Values);
        startFlag = false;
    }
    setBaseFile();
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