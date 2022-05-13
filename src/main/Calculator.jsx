import React from 'react'
import './Calculator.css'
import { Component } from 'react'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue : '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0,
    cachedLastOp: '',
    cachedLastNum: 0
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({ ...initialState })
    }

    setOperation(operation){

        const values = [...this.state.values]

        const currentOperation = this.state.operation 

        const cachedLastOp = this.state.cachedLastOp 
        
        //se estiver no current 0
        if (this.state.current === 0 ) {

            //Se o operador for =
            if (operation === "=" && cachedLastOp !== '='){

                const cachedLastOp = this.state.cachedLastOp 
                const cachedLastNum = this.state.cachedLastNum 

                let n1 = values[0]
                let n2 = cachedLastNum
                let op = cachedLastOp
                let res = 0

                //Faz a conta com o operador em forma de string
                var math_it_up = {
                    '+': function (a, b) { return a + b },
                    '-': function (a, b) { return a - b },
                    '/': function (a, b) { return a / b },
                    '*': function (a, b) { return a * b }
                }

                
                
                res = math_it_up[op](n1, n2)
                
                values[0] = res

                console.log(values)

                this.setState({
                    displayValue: values[0],
                    values
                })
                
            } else{
                this.setState({operation, current: 1, clearDisplay: true})
                console.log('Fase de operação: ' + operation)
            }


            
        } else {   
            
            let finishEquals = Boolean

            if (operation === "="){
                finishEquals = operation === '='
            }

            const currentNumber = values[1]
            this.setState({cachedLastOp: currentOperation, cachedLastNum: currentNumber})

            
            
            const n1 = values[0]
            const n2 = values[1]
            let res = 0

                switch (currentOperation) {
                case '+':
                    res = n1 + n2
                    values[0] = res
                    break

                case '-':
                    res = n1 - n2
                    values[0] = res
                    break

                case '*':
                    res = n1 * n2
                    values[0] = res
                    break

                case '/':
                    res = n1 / n2
                    values[0] = res
                break

                case '=':

                    console.log('perdido no case' + values)

                break

                default:
                    console.log(`Sorry, we are out of ${currentOperation}.`)
            }

            


            values[1] = 0
            
            if (isNaN(values[0]) || !isFinite(values[0])) {
                this.clearMemory()
            return
            }
            console.log(values)

            this.setState({
                displayValue: values[0],
                operation: finishEquals ? null : operation,
                current: finishEquals ? 0 : 1,
                clearDisplay: !finishEquals,
                values
            })
        }
    }

    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValor = clearDisplay ? '' : this.state.displayValue
        const newDisplayValue = currentValor + n
        this.setState({ displayValue: newDisplayValue, newDisplayValue, clearDisplay: false})

        if (n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(newDisplayValue)
            const values = [ ...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }
    }
    

    render() {
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label={"AC"} click={this.clearMemory} triple/>
                <Button label={'/'} click={this.setOperation} operation/>
                <Button label={'7'} click={this.addDigit}/>
                <Button label={'8'} click={this.addDigit}/>
                <Button label={'9'} click={this.addDigit}/>
                <Button label={'*'} click={this.setOperation} operation/>
                <Button label={'4'} click={this.addDigit}/>
                <Button label={'5'} click={this.addDigit}/>
                <Button label={'6'} click={this.addDigit}/>
                <Button label={'-'} click={this.setOperation} operation/>
                <Button label={'1'} click={this.addDigit}/>
                <Button label={'2'} click={this.addDigit}/>
                <Button label={'3'} click={this.addDigit}/>
                <Button label={'+'} click={this.setOperation} operation/>
                <Button label={'0'} click={this.addDigit} double/>
                <Button label={'.'} click={this.addDigit}/>
                <Button label={'='} click={this.setOperation} operation/>
            </div>
        )
    }
}