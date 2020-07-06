import React from 'react';

const regexNumber = /^\d+$/;
const regexArithmetic = /[+]|[-]|[*]|\//;
const regexArithmetics = /[+]|[-]|[*]|\//g;
const regexDecimalsAndNumbers = /(?<!\d)[-]\d+\.\d{0,}|\d+\.\d{0,}|(?<!\d)[-]\d+|\d+/g;
const regexDecimal = /\d+\.\d{0,}/;
class App extends React.Component {
  state = {
    display: '0'
  };
  handleClick = (e) => {
    // reset 
    let action = e.target.innerText;
    if (action === 'AC') {
      this.setState({
        display: '0'
      });
      return;
    }
    // input number
    if (regexNumber.test(action)) {
      let newDisplay = this.state.display;
      // 1st
      let arrNum = newDisplay.match(regexDecimalsAndNumbers);
      const lastIndexArr = arrNum[arrNum.length - 1];
      if (!regexDecimal.test(lastIndexArr) &&
        lastIndexArr === '0' &&
        newDisplay[newDisplay.length - 1] === '0') {
        newDisplay = newDisplay.substr(0, newDisplay.length - 1);
      }

      newDisplay = newDisplay + action;
      this.setState({
        display: newDisplay,
      });
      return;
    }
    // input arithmetic
    if (regexArithmetic.test(action)) {
      let newDisplay = this.state.display;
      // 1st
      const lastIndexChar = newDisplay[newDisplay.length - 1];
      const secondLastIndexChar = newDisplay[newDisplay.length - 2];
      if ((regexArithmetic.test(lastIndexChar) && action !== '-')
        || (lastIndexChar === '-' && action === '-')) {
        newDisplay = newDisplay.substr(0, newDisplay.length - 1);
      }
      // 2nd
      if (regexArithmetic.test(secondLastIndexChar) && regexArithmetic.test(lastIndexChar)) {
        newDisplay = newDisplay.substr(0, newDisplay.length - 1);
      }
      newDisplay = newDisplay + action;
      this.setState({
        display: newDisplay,
      });
      return;
    }
    // input decimal
    if (action === '.') {
      let newDisplay = this.state.display;
      // 1st
      const lastIndexChar = newDisplay[newDisplay.length - 1];
      if (regexArithmetic.test(lastIndexChar)) {
        newDisplay = newDisplay + '0';
      }
      // 2nd
      if (lastIndexChar === '.') {
        newDisplay = newDisplay.substr(0, newDisplay.length - 1);
      }
      // 3rd
      const arr = newDisplay.match(regexDecimalsAndNumbers);
      const lastIndexArr = arr[arr.length - 1];
      if (regexDecimal.test(lastIndexArr) && !regexArithmetic.test(lastIndexChar)) {
        action = '';
      }
      newDisplay = newDisplay + action;
      this.setState({
        display: newDisplay,
      });
      return;
    }
    // input "="
    if (action === '=') {
      let newDisplay = this.state.display;
      const arrDecimalsAndNumbers = newDisplay.match(regexDecimalsAndNumbers);
      console.log(arrDecimalsAndNumbers);
      const arrArithmetics = newDisplay.match(regexArithmetics);
      let i = 0;
      const result = arrDecimalsAndNumbers.reduce((acc, val) => {
        if (regexDecimal.test(acc)) {
          acc = parseFloat(acc);
        }
        if (regexDecimal.test(val)) {
          val = parseFloat(val);
        }
        if (regexNumber.test(acc)) {
          acc = parseInt(acc);
        }
        if (regexNumber.test(val)) {
          val = parseInt(val);
        }
        switch (arrArithmetics[i]) {
          case "+":
            i++;
            return acc + val;
          case "-":
            i++;
            return acc - val;
          case "*":
            i++;
            return acc * val;
          case "/":
            i++;
            return acc / val;
          default:
            i++;
            return acc + val;
        }
      });
      // console.log(result);
      // newDisplay += '=';
      // newDisplay += result;
      newDisplay = result;
      this.setState({
        display: newDisplay,
      })
    }
  }
  render() {
    return (
      <div className="container">
        <div id="display"><span>{this.state.display}</span></div>
        <button id="equals" className="btn" onClick={this.handleClick}>=</button>
        <button id="zero" className="btn" onClick={this.handleClick}>0</button>
        <button id="one" className="btn" onClick={this.handleClick}>1</button>
        <button id="two" className="btn" onClick={this.handleClick}>2</button>
        <button id="three" className="btn" onClick={this.handleClick}>3</button>
        <button id="four" className="btn" onClick={this.handleClick}>4</button>
        <button id="five" className="btn" onClick={this.handleClick}>5</button>
        <button id="six" className="btn" onClick={this.handleClick}>6</button>
        <button id="seven" className="btn" onClick={this.handleClick}>7</button>
        <button id="eight" className="btn" onClick={this.handleClick}>8</button>
        <button id="nine" className="btn" onClick={this.handleClick}>9</button>
        <button id="add" className="btn" onClick={this.handleClick}>+</button>
        <button id="subtract" className="btn" onClick={this.handleClick}>-</button>
        <button id="multiply" className="btn" onClick={this.handleClick}>*</button>
        <button id="divide" className="btn" onClick={this.handleClick}>/</button>
        <button id="decimal" className="btn" onClick={this.handleClick}>.</button>
        <button id="clear" className="btn" onClick={this.handleClick}>AC</button>
      </div>
    );
  }
}

export default App;
