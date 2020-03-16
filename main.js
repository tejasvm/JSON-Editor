import * as utils from "./modules/utils.js";
import * as fileReader from "./modules/fileReader.js";
import * as domElement from "./modules/domElements.js";
import * as actions from "./modules/actions.js";




domElement.firstTableMatch.style.display = "none";
domElement.secondTableMatch.style.display = "none";
domElement.noMatch.style.display = "none";
domElement.emptySearch.style.display = "none";

//Appends the left and right JSON display frames to the DOM
utils.appendToNode(domElement.firstTableDiv, [domElement.firstTable]);
utils.appendToNode(domElement.secondTableDiv, [domElement.secondTable]);

//File upload control
utils.appendToNode(domElement.fileDiv, [domElement.firstFileSelect, domElement.secondFileSelect, domElement.checkboxDiv]);
utils.appendToNode(domElement.errorDiv, [domElement.fileErrorMsg, domElement.checkBoxErrorMsg, domElement.retry]);
utils.appendToNode(domElement.firstCheckDiv, [domElement.firstFileRadio, domElement.checklabel]);
utils.appendToNode(domElement.secondCheckDiv, [domElement.secondFileRadio, domElement.checklabel.cloneNode(true)]);
utils.appendToNode(domElement.checkboxDiv, [domElement.firstCheckDiv, domElement.secondCheckDiv]);
utils.appendToNode(domElement.tableDiv, [domElement.firstTableDiv, domElement.scrollDiv, domElement.secondTableDiv]);
utils.appendToNode(domElement.searchDropdown, [domElement.optionOne, domElement.optionTwo]);
utils.appendToNode(domElement.buttonDiv, [domElement.firstDiff, domElement.nextDiff, domElement.prevDiff, domElement.lastDiff, domElement.searchDropdown, domElement.input, domElement.searchBtn, domElement.clear, domElement.noMatch, domElement.emptySearch, domElement.firstTableMatch, domElement.secondTableMatch]);
//utils.appendToNode(domElement.popSpan, [domElement.popLabel, domElement.yesButton, domElement.noButton]);
utils.appendToNode(domElement.buttonDivTwo, [domElement.saveLeftFile, domElement.saveRightFile]);
utils.appendToNode(domElement.body, [domElement.buttonDiv, domElement.hr, domElement.fileDiv, domElement.errorDiv, domElement.br.cloneNode(true), domElement.hr.cloneNode(true), domElement.tableDiv, domElement.buttonDivTwo]);
utils.appendToNode(domElement.scrollDiv, [domElement.startButton, domElement.br.cloneNode(true), domElement.br.cloneNode(true), domElement.rightButton, domElement.br.cloneNode(true), domElement.br.cloneNode(true), domElement.allRightButton, domElement.br.cloneNode(true),domElement.br.cloneNode(true), domElement.leftButton, domElement.br.cloneNode(true), domElement.br.cloneNode(true), domElement.allLeftButton, domElement.br.cloneNode(true), domElement.br.cloneNode(true), domElement.scrollCheckLabel, domElement.scrollCheck]);


domElement.firstFileSelect.addEventListener('change', fileReader.onChangeFileOne);
domElement.secondFileSelect.addEventListener('change', fileReader.onChangeFileTwo);


domElement.startButton.addEventListener("click", actions.starter);