
let showArray = (array) => {
    array.forEach((element) => {
        console.log(element);
    });
}


let rules = Array();
rules.push("Если [2] { модель amd } и { частота высокая } то Ответ: Rayzen 7 ");
rules.push("Если [2] { модель intel } и { частота высокая } то Ответ: Intel выше 7 поколения ");
rules.push("Если [3] { модель amd } и { частота высокая } и { кол-во потоков много } Ответ: Rayzen 2600 ");
rules.push("Если [3] { модель intel } и { частота нормальная } и { кол-во потоков мало  } Ответ: Intel i5 6 поколения ");
rules.push("Если [5] { модель intel } и { частота высокая } и { кол-во потоков много } и { цена мало } и { потребление высокое } Ответ: Xeon ");
rules.push("Если [4] { потребление низкая } и { цена мало } и  { температура низкая } и { частота нормальная } Ответ: Intel Celeron");
rules.push("Если [4] { поколение новое } и { цена мало } и { модель intel } и { кол-во ядер мало } Ответ: intel i3 последнего поколения");
rules.push("Если [4] { температура высокая } и { цена мало } и { частота высокая } и { поколение новое } Ответ: Amd нового поколения ");
rules.push("Если [3] { обьем кеша большой } и { цена много } и { кол-во ядер мало } Ответ: Процессоры Intel");
rules.push("Если [3] { поколение новое } и { температура низкая } и { частота высокая } Ответ:Intel ");
rules.push("Если [4] { обьем кеша большой } и { частота высокая } и { температура высокая } и { кол-во ядер много } Ответ: Amd Ryzen 9 поколения");


let includeIntoArray = (array,value) => {
    let include = false;
    for(let valuerArr of array) {
        if(valuerArr.localeCompare(value)) {
            include = true;
            break;
        }
    }
    if(include) {
        return true;
    }else {
        return false;
    }
}

let getValuesFromRule = (rule) => {
    let arr_values = Array();
    let indexStart = 0;
    let indexLast = 0;
    for(let i = 0; i < rule.length; i++) {
        if(rule[i] == '{') {
            indexStart = i + 1;
            for(let j = i; j < rule.length; j++) {
                if(rule[j] == '}') {
                    indexLast = j;
                    break;
                }
            }
            let value = rule.substring(indexStart, indexLast);
            arr_values.push(value);
        }
        
    }

    return arr_values;
}

   
let userTask = (rightRules,arrayStatus) => {
    if(rightRules.length == 1) {
        for(let latRule of rightRules) {
            alert(latRule);
        }
        return;
    }
    if(rightRules.length == 0){
        alert("Ничего небыло найдено");
        return;
    }

  let newRulesValues = Array();
  let newValues = Array();
  let flag = 0;

  for(let rule of rightRules) {
    let getValues = getValuesFromRule(rule);
    for(let getValRul of getValues) {
        let [model,value] = getValRul.trim().split(" ");
        let count = 0;

        for(let status of arrayStatus) {
            if(status.includes(model.trim()) || status.includes(value.trim())) {
                count++;
                break;
            }
        }
        // get out from second loop
         if(count == 0) {
            let userAsk = confirm(getValRul.trim());
            if(userAsk) {
            arrayStatus.push(getValRul.trim());
            flag = 1;
                break;
            } else {
            flag = 1;
             // remove rule what doens`t correspond 
               rightRules = rightRules.filter(rule => !rule.includes(getValRul.trim()));
               break;
            }
        }
    }
// Get out from first loop
    if(flag == 1) {
        break;
    }
}

for(let i = 0; i < rightRules.length; i++) {
    let includeCount = 0;
    for(let status of arrayStatus) {
        if(rightRules[i].includes(status.trim())){
            includeCount++;
        }
    }

    if(includeCount != arrayStatus.length ) {
        
        rightRules.splice(i,1);

    }
    
}


    userTask(rightRules,arrayStatus);
}

let getRightRules = (arrayStatus) => {
    let rightRules = Array();
    let flag = 0;
    rules.forEach((elementRule) => {
        let count = 0;
        let numberValue = elementRule.slice(6,7);
        arrayStatus.forEach(elementState => {
            if(elementRule.toLocaleLowerCase().includes(elementState.toLocaleLowerCase())) {
                count++;
            }
        });

        if(count == numberValue && arrayStatus.length == numberValue) {
            let [other,answer] = elementRule.split("Ответ:");
            alert(answer);
            flag = 1;
        } else if(count != 0 ) {
            rightRules.push(elementRule);
        }      
    });
    if(flag == 1){
        return;
    }
    // Convert all to lowwer case
    arrayStatus = arrayStatus.map(element => {
        return element.toLocaleLowerCase();
    });
    // showArray(arrayStatus);
    userTask(rightRules,arrayStatus);
}
let collectSelectDates = () => {
    let arrayStates = Array();
    let arraySelects = document.querySelectorAll("select");
    let count_null = 0;
    arraySelects.forEach(element => {
        if(element.options[element.selectedIndex].textContent.toLocaleLowerCase() != "NULL".toLocaleLowerCase()) {
            let writeWords = element.parentNode.firstElementChild.textContent +" "+ element.options[element.selectedIndex].textContent;
            arrayStates.push(writeWords);
        } else {
            count_null++;
        }
       
    });

    if(count_null == arraySelects.length){
        return;
    } else {
        getRightRules(arrayStates);
    }
}
let button = document.querySelector("input");
button.addEventListener("click",() => {
    collectSelectDates();
});