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

 export {
     domElementCreator,
     appendToNode,
     valueCreator
 };