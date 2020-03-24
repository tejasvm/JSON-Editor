function createTableWithHeadings(tableName, tableHeadings) {
    let row = tableName.insertRow(0);
    tableHeadings.forEach((tableHeading, index) => {
        row.insertCell(index).innerHTML = tableHeading;
    });
    headingsPresent = true;
}


function createTableRows(tableName, key, value, type) {
    if (tableName == firstTable) {
        row = tableName.insertRow(tableOneKeyIndex);
        row.insertCell(0).innerHTML = key;
        row.insertCell(1).innerHTML = value;
        row.setAttribute('class', type);
        row.setAttribute('id', `${"firstTable"+tableOneKeyIndex}`);
        row.onclick = function () {
            selectedRowsFunction(this);
        }
        tableOneKeyIndex++;
    } else {
        row = tableName.insertRow(tableTwoKeyIndex);
        row.insertCell(0).innerHTML = key;
        row.insertCell(1).innerHTML = value;
        //row.setAttribute('id', tableIndex);
        row.setAttribute('class', type);
        row.setAttribute('id', `${"secondTable"+ tableTwoKeyIndex}`);
        row.onclick = function () {
            selectedRowsFunction(this);
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
    rowTableOne.setAttribute("class", "active");
    rowTableOne.onclick = function () {
        deselectedRowsFunction(this, prevclassRowOne, prevclassRowTwo);
    }
    rowTableTwo.removeAttribute("class");
    rowTableTwo.setAttribute("class", "active");
    rowTableTwo.onclick = function () {
        deselectedRowsFunction(this, prevclassRowOne, prevclassRowTwo);
    }
}

function deselectedRowsFunction(row, prevclassRowOne, prevclassRowTwo) {
    id = row.getAttribute("id");
    tableTwoId = id.replace("firstTable", "secondTable");
    tableOneId = id.replace("secondTable", "firstTable");
    let index;
    if (selectedValues.indexOf(tableOneId) != -1) {
        index = selectedValues.indexOf(tableOneId);
    } else {
        index = selectedValues.indexOf(tableTwoId);
    }
    if (index > -1) {
        selectedValues.splice(index, 1);
    }
    rowTableOne = document.getElementById(tableOneId);
    rowTableTwo = document.getElementById(tableTwoId);
    diffArrayIndex = -1;
    if (temparray.length) {
        temparray[0].style.border = null;
        temparray[1].style.border = null;
    }
    rowTableOne.removeAttribute("class");
    rowTableOne.setAttribute("class", prevclassRowOne);
    rowTableTwo.removeAttribute("class");
    rowTableTwo.setAttribute("class", prevclassRowTwo);
    rowTableOne.onclick = function () {
        selectedRowsFunction(this);
    }
    rowTableTwo.onclick = function () {
        selectedRowsFunction(this);
    }
}

function tablePolulator(object1PathsArray, object2PathsArray, object1ValuesArray, object2ValuesArray, tableOne, tableTwo) {
    object1PathsArray.forEach((element, index) => {
        if (object2PathsArray.includes(element)) {
            indexValue = object2PathsArray.indexOf(element)
            if (object1ValuesArray[index] == object2ValuesArray[indexValue]) {
                createTableRows(tableOne, element, object1ValuesArray[index], "normal");
                createTableRows(tableTwo, object2PathsArray[indexValue], object2ValuesArray[indexValue], "normal");
            } else {
                createTableRows(tableOne, element, object1ValuesArray[index], "blue");
                createTableRows(tableTwo, object2PathsArray[indexValue], object2ValuesArray[indexValue], "blue");
            }
        } else {
            allMoveRightArray.push(`${"firstTable"+tableTwoKeyIndex}`);
            createTableRows(tableOne, element, object1ValuesArray[index], "green");
            createTableRows(tableTwo, "", "", "red");
        }
    });
    object2PathsArray.forEach((element, index) => {
        if (object1PathsArray.includes(element)) {
            //continue;
        } else {
            allMoveLeftArray.push(`${"firstTable"+tableTwoKeyIndex}`);
            createTableRows(tableOne, "", "", "red");
            createTableRows(tableTwo, element, object2ValuesArray[index], "green");
        }

    });
    diffArray = allMoveRightArray.concat(allMoveLeftArray);
}