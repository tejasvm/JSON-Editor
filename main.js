import * as utils from "./modules/utils.js";
import * as fileReader from "./modules/fileReader.js"

const body = document.querySelector('body');
const br = utils.domElementCreator('br');
const hr = utils.domElementCreator('hr');
const firstDiff = utils.domElementCreator("button", "First Difference", {class:"firstDiffbtn",disabled:"true"});
const nextDiff = utils.domElementCreator("button", "Next Difference", {class:"nextDiffbtn",disabled:"true"});
const prevDiff = utils.domElementCreator("button", "Previous Difference",{class:"prevDiffbtn",disabled:"true"});
const lastDiff = utils.domElementCreator("button", "Last Difference",{class:"lastDiffbtn",disabled:"true"});
const searchBtn = utils.domElementCreator("button", "Search",{class:"searchBtn",disabled:"true"});
const clear = utils.domElementCreator("button", "Clear", {class:"clearbtn",disabled:"true"});
const buttonDiv = utils.domElementCreator("div", "", {class:"buttonDiv",id:"popup"});
const popSpan = utils.domElementCreator("span", "",{class:"popuptext",id:"myPopup"});
const popLabel = utils.domElementCreator("label", "");
const yesButton = utils.domElementCreator("button", "Yes",{class:"yesButton"});
const noButton = utils.domElementCreator("button", "No",{class:"noButton"});
const input = utils.domElementCreator("input", "",{class:"searchfield",type:"text",placeholder:"Search Property",name:"search"});
const firstFileSelect = utils.domElementCreator("input", "",{class:"firstFileSelect",type:"file",accept:".json"});
const secondFileSelect = utils.domElementCreator("input", "",{class:"secondFileSelect",type:"file",accept:".json"});
const checkboxDiv = utils.domElementCreator("div", "",{class:"checkboxDiv"});
const firstCheckDiv = utils.domElementCreator("div", "",{class:"firstCheckDiv"});
const secondCheckDiv = utils.domElementCreator("div", "",{class:"secondCheckDiv"});
const firstFileRadio = utils.domElementCreator("input", "",{class:"firstFileRadio",type:"radio",name:"fileSelect"});
const checklabel = utils.domElementCreator("label", "Click to make this base");
const secondFileRadio = utils.domElementCreator("input", "",{class:"secondFileRadio",type:"radio",name:"fileSelect"});
const tableDiv = utils.domElementCreator("div", "",{class:"tableDiv"});
const firstTableDiv = utils.domElementCreator("div", "", {class:"FirstTableDiv"});
const secondTableDiv = utils.domElementCreator("div", "", {class:"SecondTableDiv"});
const scrollDiv = utils.domElementCreator("div", "", {class:"scrollDiv"});
const firstTable = utils.domElementCreator("table", "", {class:"firstTable"});
const secondTable = utils.domElementCreator("table", "", {class:"secondTable"});
const rightButton = utils.domElementCreator("button", ">", {class:"rightBtn",disabled:"true"});
const leftButton = utils.domElementCreator("button", "<", {class:"leftBtn",disabled:"true"});
const allRightButton = utils.domElementCreator("button", ">>",{class:"allRightBtn",disabled:"true"});
const allLeftButton = utils.domElementCreator("button", "<<", {class:"allLeftBtn",disabled:"true"});
const startButton = utils.domElementCreator("button", "Start", {class:"startbtn"});
const scrollCheck = utils.domElementCreator("input", "",{class:"scrollCheck",type:"checkbox"});
const scrollCheckLabel = utils.domElementCreator("label", "Sync", {class:"scrollCheckLabel"});
const fileDiv = utils.domElementCreator("div", "", {class:"fileDiv"});
const errorDiv = utils.domElementCreator("div", "",{class:"errorDiv"});
const fileErrorMsg = utils.domElementCreator("p", "File type not supported. Please try again",{class:"fileError"});
const checkBoxErrorMsg = utils.domElementCreator("p", "Checkbox hasn't been selected. Please try again",{class:"checkBoxError"});
const retry = utils.domElementCreator("button", "Retry",{class:"retry"});
const searchDropdown = utils.domElementCreator("select", "", {class:"searchDropdown"});
const optionOne = utils.domElementCreator("option", "Search by Key", {value:"searchKey"});
const optionTwo = utils.domElementCreator("option", "Search by Value",{value:"searchValue"});
const emptySearch = utils.domElementCreator("p", "Provide input",{class:"emptySearch"});
const noMatch = utils.domElementCreator("p", "No match found", {class:"noMatchMsg"});
// code added
const saveRightFile = utils.domElementCreator("button", "Save Right File",{class:"saveRightFile"});
const saveLeftFile = utils.domElementCreator("button", "Save Left File",{class:"saveLeftFile"});
const buttonDivTwo = utils.domElementCreator("div", "", {class:"buttonDivTwo"});
const firstTableMatch = utils.domElementCreator("p", "Total matches in first table: ");
const secondTableMatch = utils.domElementCreator("p", "Total matches in second table: ");

firstTableMatch.style.display = "none";
secondTableMatch.style.display = "none";
noMatch.style.display = "none";
emptySearch.style.display = "none";

//Appends the left and right JSON display frames to the DOM
utils.appendToNode(firstTableDiv, [firstTable]);
utils.appendToNode(secondTableDiv, [secondTable]);

//File upload control
utils.appendToNode(fileDiv, [firstFileSelect, secondFileSelect, checkboxDiv]);
utils.appendToNode(errorDiv, [fileErrorMsg, checkBoxErrorMsg, retry]);
utils.appendToNode(firstCheckDiv, [firstFileRadio, checklabel]);
utils.appendToNode(secondCheckDiv, [secondFileRadio, checklabel.cloneNode(true)]);
utils.appendToNode(checkboxDiv, [firstCheckDiv, secondCheckDiv]);
utils.appendToNode(tableDiv, [firstTableDiv, scrollDiv, secondTableDiv]);
utils.appendToNode(searchDropdown, [optionOne, optionTwo]);
utils.appendToNode(buttonDiv, [firstDiff, nextDiff, prevDiff, lastDiff, popSpan, searchDropdown, input, searchBtn, clear, noMatch, emptySearch, firstTableMatch, secondTableMatch]);
utils.appendToNode(popSpan, [popLabel, yesButton, noButton]);
utils.appendToNode(buttonDivTwo, [saveLeftFile, saveRightFile]);
utils.appendToNode(body, [buttonDiv, hr, fileDiv, errorDiv, br.cloneNode(true), hr.cloneNode(true), tableDiv, buttonDivTwo]);
utils.appendToNode(scrollDiv, [startButton, br.cloneNode(true), br.cloneNode(true), rightButton, br.cloneNode(true), br.cloneNode(true), allRightButton, br.cloneNode(true), br.cloneNode(true), leftButton, br.cloneNode(true), br.cloneNode(true), allLeftButton, br.cloneNode(true), br.cloneNode(true), scrollCheckLabel, scrollCheck]);

let value1, value2, value3, value4, value5, value6, flag, searchValue, prevSearch, continueFlag = false;
let selectedValues = [];
let allMoveRightArray = [];
let allMoveLeftArray = [];
let found = 0,
    searchFlag = 0;
let tableHeadings = ["<b>Path</b>", "<b>Value</b>"]
let prevclassRowOne;
let prevclassRowTwo;
let path;
let object1Paths = [];
let object2Paths = [];
let object1Values = [];
let object2Values = [];
let diffArray = [];

firstFileSelect.addEventListener('change', fileReader.onChangeFileOne);
secondFileSelect.addEventListener('change', fileReader.onChangeFileTwo);

