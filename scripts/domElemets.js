function domElementCreator(type, textContent, attributeObject) {
    let element = document.createElement(type);
    element.textContent = textContent;
    if (attributeObject != null) {
        let attributeClasses = Object.keys(attributeObject);
        attributeClasses.forEach(attributeClass => {
            element.setAttribute(attributeClass, attributeObject[attributeClass]);
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
const radioDiv = domElementCreator("div", "", {
    class: "radioDiv"
});
const firstRadioDiv = domElementCreator("div", "", {
    class: "firstRadioDiv"
});
const secondRadioDiv = domElementCreator("div", "", {
    class: "secondRadioDiv"
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
    id: "tableDiv"
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
const retry = domElementCreator("button", "Retry", {
    class: "modalRetry"
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
const saveRightFile = domElementCreator("button", "Save Right File", {
    class: "saveRightFile",
    style: "display: none;"
});
const saveLeftFile = domElementCreator("button", "Save Left File", {
    class: "saveLeftFile",
    style: "display: none;"
});
const buttonDivTwo = domElementCreator("div", "", {
    class: "buttonDivTwo"
});
const firstTableMatch = domElementCreator("p", "Total matches in first table: ", {
    style: "display: none;"
});
const secondTableMatch = domElementCreator("p", "Total matches in second table: ", {
    style: "display: none;"
});
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
const modalHeading = domElementCreator("h2", "Alert", {});
const modalText = domElementCreator("h2", "", {});
const proceedButton = domElementCreator("button", "Proceed", {
    class: "modalProceed"
});
const cancelButton = domElementCreator("button", "Cancel", {
    class: "modalCancel"
});

const okButton = domElementCreator("button", "OK", {
    class: "modalOK",
    style: "display: none;"
}); //changes

const saveButton = domElementCreator("button", "", {
    class: "modalSave",
    id: "modalSave",
    style: "display: none;"
});

appendToNode(firstTableDiv, [firstTable]);
appendToNode(secondTableDiv, [secondTable]);
//File upload control
appendToNode(fileDiv, [firstFileSelect, secondFileSelect, radioDiv]);
appendToNode(firstRadioDiv, [firstFileRadio, checklabel]);
appendToNode(secondRadioDiv, [secondFileRadio, checklabel.cloneNode(true)]);
appendToNode(radioDiv, [firstRadioDiv, secondRadioDiv]);
appendToNode(tableDiv, [firstTableDiv, scrollDiv, secondTableDiv]);
appendToNode(searchDropdown, [optionOne, optionTwo]);
appendToNode(buttonDiv, [firstDiff, nextDiff, prevDiff, lastDiff, searchDropdown, input, searchBtn, clear, firstTableMatch, secondTableMatch]);
appendToNode(buttonDivTwo, [saveLeftFile, saveRightFile]);
appendToNode(modalHeader, [closeSign, modalHeading]);
appendToNode(modalBody, [modalText]);
appendToNode(modalFooter, [proceedButton, cancelButton, okButton, saveButton, retry]);
appendToNode(modalContent, [modalHeader, modalBody, modalFooter]);
appendToNode(modal, [modalContent]);
appendToNode(body, [modal, buttonDiv, hr, fileDiv, br.cloneNode(true), hr.cloneNode(true), tableDiv, buttonDivTwo]);
appendToNode(scrollDiv, [startButton, br.cloneNode(true), br.cloneNode(true), rightButton, br.cloneNode(true), br.cloneNode(true), allRightButton, br.cloneNode(true), br.cloneNode(true), leftButton, br.cloneNode(true), br.cloneNode(true), allLeftButton, br.cloneNode(true), br.cloneNode(true), scrollCheckLabel, scrollCheck]);