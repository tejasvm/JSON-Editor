function domElementCreator(type, textContent, attributeObject) {
    let element = document.createElement(type);
    element.textContent = textContent;
    if (attributeObject != null) {
        let attributeKeys = Object.keys(attributeObject);
        attributeKeys.forEach(attribute => {
            element.setAttribute(attribute, attributeObject[attribute]);
        });
    }
    return element;
}

function appendToNode(node, elements) {
    if (Array.isArray(elements)) {
        elements.forEach(element => {
            node.appendChild(element);
        });
    } else
        node.appendChild(elements);
}

const body = document.querySelector('body');
const br = domElementCreator('br');
const hr = domElementCreator('hr');
const firstDiff = domElementCreator("button", "First Difference", {
    class: "firstDiffbtn",
    disabled: "true"
});
const nextDiff = domElementCreator("button", "Next Difference", {
    class: "nextDiffbtn",
    disabled: "true"
});
const prevDiff = domElementCreator("button", "Previous Difference", {
    class: "prevDiffbtn",
    disabled: "true"
});
const lastDiff = domElementCreator("button", "Last Difference", {
    class: "lastDiffbtn",
    disabled: "true"
});
const searchBtn = domElementCreator("button", "Search", {
    class: "searchBtn",
    disabled: "true"
});
const clear = domElementCreator("button", "Clear", {
    class: "clearbtn",
    disabled: "true"
});
const buttonDiv = domElementCreator("div", "", {
    class: "buttonDiv",
    id: "popup"
});
const yesButton = domElementCreator("button", "Yes", {
    class: "yesButton"
});
const noButton = domElementCreator("button", "No", {
    class: "noButton"
});
const input = domElementCreator("input", "", {
    class: "searchfield",
    type: "text",
    placeholder: "Search Property",
    name: "search"
});
const firstFileSelect = domElementCreator("input", "", {
    class: "firstFileSelect",
    type: "file",
    accept: ".json"
});
const secondFileSelect = domElementCreator("input", "", {
    class: "secondFileSelect",
    type: "file",
    accept: ".json"
});
const checkboxDiv = domElementCreator("div", "", {
    class: "checkboxDiv"
});
const firstCheckDiv = domElementCreator("div", "", {
    class: "firstCheckDiv"
});
const secondCheckDiv = domElementCreator("div", "", {
    class: "secondCheckDiv"
});
const firstFileRadio = domElementCreator("input", "", {
    class: "firstFileRadio",
    type: "radio",
    name: "fileSelect",
    checked: "true"
});
const checklabel = domElementCreator("label", "Click to make this base");
const secondFileRadio = domElementCreator("input", "", {
    class: "secondFileRadio",
    type: "radio",
    name: "fileSelect"
});
const tableDiv = domElementCreator("div", "", {
    class: "tableDiv",
    id:"tableDiv"
});
const firstTableDiv = domElementCreator("div", "", {
    class: "FirstTableDiv"
});
const secondTableDiv = domElementCreator("div", "", {
    class: "SecondTableDiv"
});
const scrollDiv = domElementCreator("div", "", {
    class: "scrollDiv"
});
const firstTable = domElementCreator("table", "", {
    class: "firstTable"
});
const secondTable = domElementCreator("table", "", {
    class: "secondTable"
});
const rightButton = domElementCreator("button", ">", {
    class: "rightBtn",
    disabled: "true"
});
const leftButton = domElementCreator("button", "<", {
    class: "leftBtn",
    disabled: "true"
});
const allRightButton = domElementCreator("button", ">>", {
    class: "allRightBtn",
    disabled: "true"
});
const allLeftButton = domElementCreator("button", "<<", {
    class: "allLeftBtn",
    disabled: "true"
});
const startButton = domElementCreator("button", "Start", {
    class: "startbtn"
});
const scrollCheck = domElementCreator("input", "", {
    class: "scrollCheck",
    type: "checkbox"
});
const scrollCheckLabel = domElementCreator("label", "Sync", {
    class: "scrollCheckLabel"
});
const fileDiv = domElementCreator("div", "", {
    class: "fileDiv"
});
const errorDiv = domElementCreator("div", "", {
    class: "errorDiv"
});
const fileErrorMsg = domElementCreator("p", "File type not supported. Please try again", {
    class: "fileError"
});
const checkBoxErrorMsg = domElementCreator("p", "Checkbox hasn't been selected. Please try again", {
    class: "checkBoxError"
});
const retry = domElementCreator("button", "Retry", {
    class: "retry"
});
const searchDropdown = domElementCreator("select", "", {
    class: "searchDropdown"
});
const optionOne = domElementCreator("option", "Search by Key", {
    value: "searchKey"
});
const optionTwo = domElementCreator("option", "Search by Value", {
    value: "searchValue"
});
const emptySearch = domElementCreator("p", "Provide input", {
    class: "emptySearch"
});
const noMatch = domElementCreator("p", "No match found", {
    class: "noMatchMsg"
});
const saveRightFile = domElementCreator("button", "Save Right File", {
    class: "saveRightFile",
    disabled: "true"
});
const saveLeftFile = domElementCreator("button", "Save Left File", {
    class: "saveLeftFile",
    disabled: "true"
});
const buttonDivTwo = domElementCreator("div", "", {
    class: "buttonDivTwo"
});
const firstTableMatch = domElementCreator("p", "Total matches in first table: ");
const secondTableMatch = domElementCreator("p", "Total matches in second table: ");
const modal = domElementCreator("div", "", {
    class: "modal",
    id: "alertModal"
});
const modalContent = domElementCreator("div", "", {
    class: "modal-content"
});
const modalHeader = domElementCreator("div", "", {
    class: "modal-header"
});
const modalBody = domElementCreator("div", "", {
    class: "modal-body"
});
const modalFooter = domElementCreator("div", "", {
    class: "modal-footer"
});
const closeSign = domElementCreator("span", "x", {
    class: "close"
});
const modalHeading = domElementCreator("h2", "ALert", {});
const modalText = domElementCreator("h2", "", {});
const proceedButton = domElementCreator("button", "Proceed", {
    class: "modalProceed",
    id :"modalProceed"
});
const cancelButton = domElementCreator("button", "Cancel", {
    class: "modalCancel"
});
const saveButton = domElementCreator("button", "", {
    class: "modalSave",
    id :"modalSave"
});

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
appendToNode(modalHeader, [closeSign, modalHeading]);
appendToNode(modalBody, [modalText]);
appendToNode(modalFooter, [proceedButton, cancelButton,saveButton]);
appendToNode(modalContent, [modalHeader, modalBody, modalFooter]);
appendToNode(modal, [modalContent]);
appendToNode(body, [modal, buttonDiv, hr, fileDiv, errorDiv, br.cloneNode(true), hr.cloneNode(true), tableDiv, buttonDivTwo]); //change
appendToNode(scrollDiv, [startButton, br.cloneNode(true), br.cloneNode(true), rightButton, br.cloneNode(true), br.cloneNode(true), allRightButton, br.cloneNode(true), br.cloneNode(true), leftButton, br.cloneNode(true), br.cloneNode(true), allLeftButton, br.cloneNode(true), br.cloneNode(true), scrollCheckLabel, scrollCheck]);


firstTableMatch.style.display = "none";
secondTableMatch.style.display = "none";
noMatch.style.display = "none";
emptySearch.style.display = "none";