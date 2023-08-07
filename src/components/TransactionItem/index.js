import './index.css'

const TransactionItem = props => {
  const {transaction, onDeleteTransaction} = props
  const {amount, type, title, id} = transaction

  const deleteTransaction = () => {
    onDeleteTransaction(id)
  }
  return (
    <li className="list-items-history">
      <div className="transaction-rows">
        <p className="row">{title}</p>
        <p className="row">{amount}</p>
        <p className="row">{type}</p>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={deleteTransaction}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
