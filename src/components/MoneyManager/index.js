import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    amount: '',
    type: transactionTypeOptions[0].displayText,
    title: '',
    transactionDetails: [],
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {type, amount, title, income, expenses} = this.state

    const newTransaction = {
      id: uuidv4(),
      amount,
      title,
      type,
    }

    if (type === 'Expenses') {
      this.setState(prevState => ({
        transactionDetails: [...prevState.transactionDetails, newTransaction],
        balance: prevState.balance - parseInt(amount),
        income,
        expenses: prevState.expenses + parseInt(amount),
        amount: '',
        title: '',
        type: transactionTypeOptions[0].displayText,
      }))
    } else {
      this.setState(prevState => ({
        transactionDetails: [...prevState.transactionDetails, newTransaction],
        balance: prevState.balance + parseInt(amount),
        income: prevState.income + parseInt(amount),
        expenses,
        amount: '',
        title: '',
        type: transactionTypeOptions[0].displayText,
      }))
    }
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addAmount = event => {
    this.setState({amount: event.target.value})
  }

  addType = event => {
    const requiredValue = event.target.value
    if (requiredValue === 'EXPENSES') {
      this.setState({
        type: 'Expenses',
      })
    } else {
      this.setState({
        type: 'Income',
      })
    }
  }

  onDeleteTransaction = id => {
    const {transactionDetails, income, expenses} = this.state

    const filteredTransactions = transactionDetails.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    const filteredMoneyDetails = transactionDetails.find(
      eachTransaction => eachTransaction.id === id,
    )
    const {amount, type} = filteredMoneyDetails

    if (type === 'Expenses') {
      this.setState(prevState => ({
        transactionDetails: filteredTransactions,
        balance: prevState.balance + parseInt(amount),
        income,
        expenses: prevState.expenses - parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        transactionDetails: filteredTransactions,
        balance: prevState.balance - parseInt(amount),
        income: prevState.income - parseInt(amount),
        expenses,
      }))
    }
  }

  render() {
    const {
      transactionDetails,
      balance,
      income,
      expenses,
      type,
      title,
      amount,
    } = this.state
    return (
      <div className="container">
        <div className="welcome-card">
          <h1 className="greeting">Hi, Richard</h1>
          <p className="greet-text">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <ul className="money-details-container">
          <MoneyDetails
            key={uuidv4()}
            balance={balance}
            income={income}
            expenses={expenses}
          />
        </ul>
        <div className="bottom-container">
          <div className="input-intake-container">
            <h1 className="heading">Add Transaction</h1>
            <form className="form-element" onSubmit={this.onAddTransaction}>
              <label htmlFor="titleInput">TITLE</label>
              <input
                type="text"
                value={title}
                onChange={this.addTitle}
                className="input"
                id="titleInput"
              />
              <label htmlFor="amountInput">AMOUNT</label>
              <input
                type="text"
                value={amount}
                onChange={this.addAmount}
                className="input"
                id="amountInput"
              />
              <label htmlFor="typeInput">Type</label>
              <select onChange={this.addType} value={type}>
                {transactionTypeOptions.map(each => (
                  <option value={each.optionId} key={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button className="submit-button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h1 className="transaction-history">History</h1>
            <div className="transaction-table">
              <div className="transaction-table-columns">
                <p className="column">Title</p>
                <p className="column">Amount</p>
                <p className="column column1">Type</p>
              </div>
              <ul className="transaction-table-rows">
                {transactionDetails.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transaction={eachTransaction}
                    onDeleteTransaction={this.onDeleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
