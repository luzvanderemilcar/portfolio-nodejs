async function fetchProduct(url, options, next) {
  try {
    let res = await fetch(url, options);
    if (res) {
      let data = await res.json();
      if (data) {
      next(data);
      }
      console.log("Data Not Found !");
    } else {
      console.log("No Response from Server")
    }
  } catch (e) {
    console.error("Error :", e)
  }
}


// test if an object has a specified key-value pair
function testKeyValue(objectsArray, [key, value]) {
  return objectsArray.some(object => object[key] == value)
}

// find object from an array of object and a key value pair
function getObjectById(objectsArray, id) {
    getObjectByKeyValue(objectsArray, "id", id) 
}

function getObjectByKeyValue(objectsArray, [key, value]) {
  
let counter = 0; 
  while (counter < objectsArray.length) {
    if (objectsArray[counter][key] == value) return objectsArray[counter];
    counter++;
  }
}
// search a value inside a list of objects and return match depending on specified list of keys and options (if any)
function matchValueArray(objectsArray, value, searchKeys, options = { strictMatch: false, caseSensitive: false, minimumMatch: 1, order: "descending" }) {

  // Remove whitespace from both side
  let lookupValue = String(value).trim();

  let valueSplitingReg = /\s+/;

  let arrMap = objectsArray.map(object => {
    let matchCount = 0;
    for (let key in object) {
      if (searchKeys.includes(key)) {
        // Turn any key value into string to handle string operation like lowercasing
        let keyValue = String(object[key]).trim();

        //Filters 

	// if strich matching is enabled
        if (options.strictMatch) {
	// if the matching pattern is case sensitive
          if (options.caseSensitive) {
            if (keyValue == lookupValue) {
              matchCount++
            }
          } else { // case insensitive

            if ( keyValue.toLowerCase() == lookupValue.toLowerCase()) {
              matchCount++
            }
          }
        } else { // strick matching is not enabled
          let arrValue;
          if (options.caseSensitive) {
            arrValue = lookupValue.split(valueSplitingReg)
          } else { // case insensitive 
            lookupValue = lookupValue.toLowerCase();
            arrValue = lookupValue.split(valueSplitingReg);
            keyValue = keyValue.toLowerCase()
          }
	// final search
          arrValue.forEach(searchItem => {

            let valueRegex = new RegExp(searchItem);

            if (valueRegex.test(keyValue)) {
              matchCount++
            }
          });
        }
      }
    }
    return {object,  matchCount};
});

     // classify result on ascending or descending order
  if (options.order === "ascending") arrMap.sort((a, b) => a.matchCount - b.matchCount);
  if (options.order === "descending") arrMap.sort((a, b) => b.matchCount - a.matchCount);

	// return the array of objects after sorting
   return arrMap.reduce((acc, obj) => {
    let {matchCount, object} = obj;

    // Filtered according to the match count and the minimum match required
    if (matchCount > 0 && matchCount >= options.minimumMatch) {
	acc.push(object);
    }
  }, []);
}

function findByIdAndUpdateKeyValue(objectsArray, id, [key, value]) {
  let object = getObjectById(objectsArray, id);

    if (object) {
      object[key] = value;
    }
}

// update an object with its id , and update key value from another object
function findByIdAndUpdate(objectsArray, id, objectUpdate) {
  let object =  getObjectById(objectsArray, id);

  if (object) {
      object = {...object, ...objectUpdate};
    }
  };



function copyKeys(object, keyArray) {
  let copyObject = {};
  keyArray.forEach(key => {
    if (object.hasOwnProperty(key)) {
      copyObject[key] = object[key];
    }
  });
  return copyObject
}

function removeObjectAt(objectsArray, index) {
	objectsArray.splice(index, 1);
}

function removeObjectById(objectsArray, id) {	 
   let matchIndex;
   let index = 0;

    while(!matchIndex && index < objectsArray.length) {

    if (objectsArray[index].id == id) {
      matchIndex = index;
    }
   index++;

}
   removeObjectAt(objectsArray, matchIndex);

}


// To format an array of arrays from an array (first argument),  a step that is the regular length of the nested arrays (second argument), 
//an options object (optional third parameter) with two properties - "forceExtraItem" : a boolean to control whether to add extra items to the final sequence or not, and "tolerance" : an integer to limit it
function sequenceArray(objectsArray, step, options = { forceExtraItem: false, tolerance: 0 }) {
  let objectsArrayLength = objectsArray.length;

  // if the number of tems is fewer or equal to the step (limit)
  if (objectsArrayLength <= step) {
    return [objectsArray];
  } else {
    let sequenceCount = Math.floor(objectsArrayLength / step);
    let remainingItemCount = objectsArrayLength % step;

    let regularItems, extraItems;
    if (remainingItemCount === 0) {
      regularItems = objectsArray;
      extraItems = [];
    }
    else if (remainingItemCount > 0) {
      regularItems = objectsArray.slice(0, sequenceCount * step);
      extraItems = objectsArray.slice(sequenceCount * step);
    }

 let sequenceArray = [];
    let itemAddedToSequenceCount = 0;
    // Format the regular array of Array
    let result = regularItems.reduce((acc, object) => {

      if (itemAddedToSequenceCount <= step) {
        sequenceArray.push(object);
        itemAddedToSequenceCount++;

        // The final item in the sequence
        if (itemAddedToSequenceCount == step) {
          acc.push(sequenceArray);
          sequenceArray = [];
          itemAddedToSequenceCount = 0;
        }
      }
      return acc
    }, []);

    // Conditions 

    // No enforcement or sequence with more items than the step
    if (!options.forceExtraItem || options.tolerance == 0) {
      if (extraItems.length > 0) {
        result.push(extraItems);
      }
    }
    else if (options.forceExtraItem) {
      if (options.tolerance >= extraItems.length) {
        result[result.length - 1].push(...extraItems);
      } else {
        result.push(extraItems);
      }
    }
    return result;
  }
}

export { getObjectById, getObjectByKeyValue, matchValueArray, findByIdAndUpdateKeyValue, findByIdAndUpdate, copyKeys, sequenceArray, removeObjectAt, removeObjectById, testKeyValue };
