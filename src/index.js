// Implement function check(str, bracketsConfig), that for given brackets sequence will return true if it is correct and false otherwise

// In the second param there is bracketsConfig - the array of pairs open-closed brackets. Each subarray includes only 2 elements - opening and closing bracket

// check('()', [['(', ')']]) // -> true
// check('((()))()', [['(', ')']]) // -> true
// check('())(', [['(', ')']]) // -> false
// check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]) // -> true
// check('[(])', [['(', ')'], ['[', ']']]) // -> false
// check('[]()', [['(', ')'], ['[', ']']]) // -> true
// check('[]()(', [['(', ')'], ['[', ']']]) // -> false

// special case: opening and closing bracket can be the same :)

// check('||', [['|', '|']]) // -> true
// check('|()|', [['(', ')'], ['|', '|']]) // -> true
// check('|(|)', [['(', ')'], ['|', '|']]) // -> false
// check('|()|(||)||', [['(', ')'], ['|', '|']]) // -> true

// 13 из 20
/* module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;
  for (let i = 0; i < bracketsConfig.length; i++) {
    const strArr = str.split('');
    const countArr = [];
    bracketsConfig[i].forEach(element => {
      const filterArr = strArr.filter(bracket => bracket === element)
      countArr.push(filterArr.length);
    });
    if (countArr[0] === countArr[1]) {
      true;
    } else {
      return false
    }
  }
  return true;
} */

// 11 из 20
/* module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;
  bracketsConfig = bracketsConfig.reverse();
  let strArr = str.split('');
  let index = 0;
  let j = 0;
  for (let i = 0; i < bracketsConfig.length; i++) {
    while (strArr.includes(bracketsConfig[i][j + 1])) {
      index = strArr.indexOf(bracketsConfig[i][j + 1]);
      if (strArr[index - 1] === bracketsConfig[i][j]) {
        strArr.splice((index - 1), 2)
        j = 0;
      } else {
        return false;
      }
    }
  }
  return true;
} */

// 15 из 20
/* module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;
  bracketsConfig = bracketsConfig.reverse();
  let strArr = str.split('');
  let counter = 0;
  const lengthFilter = strArr.filter(el => el === '|').length;
  if (lengthFilter % 2 === 0) {
    while (counter !== lengthFilter) {
      strArr.splice(strArr.indexOf('|'), 1);
      counter += 1;
    }
  }
  let index = 0;
  let j = 0;
  for (let i = 0; i < bracketsConfig.length; i++) {
    while (strArr.includes(bracketsConfig[i][j + 1])) {
      index = strArr.indexOf(bracketsConfig[i][j + 1]);
      if (strArr[index - 1] === bracketsConfig[i][j]) {
        strArr.splice((index - 1), 2)
        j = 0;
      } else {
        return false;
      }
    }
  }
  return true;
} */


// 17 из 20
/* module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;
  const openedBrackets = [];
  const closedBrackets = [];
  let bracketsPairObj = {};
  bracketsConfig.forEach(element => {
    openedBrackets.push(element[0]);
    closedBrackets.push(element[1])
    bracketsPairObj[element[1]] = element[0];
  });
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (openedBrackets.includes(str[i])){
      if (closedBrackets.includes(str[i])) {
        false
      } else {
        stack.push(str[i]);
      }
    } else if (bracketsPairObj[str[i]] === stack[stack.length - 1]) {
      if (stack.length === 0) {
        return false;
      } else {
        stack.pop();
      }
    }
  }
  return stack.length === 0;
} */

module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;
  const openedBrackets = [];
  const closedBrackets = [];
  let bracketsPairObj = {};
  bracketsConfig.forEach(element => {
    // openedBrackets.push(element[0]);
    closedBrackets.push(element[1])
    bracketsPairObj[element[1]] = element[0];
  });
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (closedBrackets.includes(str[i])) {
      if (stack[stack.length - 1] === str[i]) {
        stack.pop();
      } else if (bracketsPairObj[str[i]] === stack[stack.length - 1]) {
        if (stack.length === 0) {
          return false;
        } else {
          stack.pop();
        }
      } else {
        stack.push(str[i]);
      }
    }  else {
      stack.push(str[i]);
    }
  }
  return stack.length === 0;
}