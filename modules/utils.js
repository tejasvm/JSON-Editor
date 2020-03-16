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

 export {
     domElementCreator,
     appendToNode
 };