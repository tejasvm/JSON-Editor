let diffArray = [];
let allMoveRightArray = [];
let allMoveLeftArray = [];

function createTableWithHeadings(tableName, tableHeadings) {
    var row = tableName.insertRow(0);
    tableHeadings.forEach((tableHeading, index) => {
        row.insertCell(index).innerHTML = tableHeading;
    });
    headingsPresent = true;
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

export{
    createTableWithHeadings,
    tablePolulator,
    diffArray,
    allMoveLeftArray,
    allMoveRightArray
}
