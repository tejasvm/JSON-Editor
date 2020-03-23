startButton.addEventListener("click", starter);
saveRightFile.addEventListener("click", saveRightFileFunc);
saveLeftFile.addEventListener("click", saveLeftFileFunc);
rightButton.addEventListener("click", selectMoveRight);
leftButton.addEventListener("click", selectMoveLeft);
allRightButton.addEventListener("click", allMoveRight);
allLeftButton.addEventListener("click", allMoveLeft);
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo)
firstDiff.addEventListener("click", firstDiffFunc);
nextDiff.addEventListener("click", nextDiffFunc);
prevDiff.addEventListener("click", prevDiffFunc);
lastDiff.addEventListener("click", lastDiffFunc)
retry.addEventListener("click", resetFileDiv);
scrollCheck.addEventListener("click", overflowdisable);
searchBtn.addEventListener("click", function () {
    searchValue = input.value;
    search(searchValue);
});
clear.addEventListener("click", function () {
    searchValue = input.value;
    clearSearch(searchValue);
});
firstFileSelect.addEventListener('change', onChangeFileOne);
secondFileSelect.addEventListener('change', onChangeFileTwo);
proceedButton.addEventListener("click", function () {
    if (continueFlag == "prevDiffFunc") {
        diffArrayIndex = diffArray.length;
        prevDiffFunc();
    } else if (continueFlag == "nextDiffFunc") {
        diffArrayIndex = -1;
        nextDiffFunc();
    }
    modal.style.display = "none";
    modalText.textContent = "";
});

cancelButton.addEventListener("click", function () {
    continueFlag = false;
    modal.style.display = "none";
    modalText.textContent = "";
});

okButton.addEventListener("click", function () { 
    modal.style.display = "none";
    okButton.style.display = "none";
    proceedButton.style.display = "inline";
    cancelButton.style.display = "inline";
})


closeSign.addEventListener("click", function () {
    modal.style.display = "none";
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
saveButton.addEventListener("click", function () {
    modal.style.display = "none";
    saveButton.style.display = "none";
    proceedButton.style.display = "inline";
    cancelButton.style.display = "inline";
})
firstTable.addEventListener("onload", function(){
    alert("haha");
})