const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.getHome = async (req, res) => {
    const user = await User.findByPk(req.session.userId);
    const transactions = await Transaction.findAll({
        where: {
          userId: req.session.userId
        }
      });
    res.render('home', { 
        user: user,
        transactions: transactions.map(transaction => {
            return {
                id: transaction.id,
                date: transaction.date,
                name: transaction.name,
                kind: transaction.kind,
                category: transaction.category,
                value: `${transaction.kind === 'income' ? '+' : '-'}${transaction.amount.toFixed(2).replace('.', ',')}`,
                json: JSON.stringify(transaction)
            }
        }),
        incomeSum: amountSum("income", transactions),
        expenseSum: amountSum("expense", transactions), 
    });
};

function amountSum(type, transactions) {
    return transactions
        .filter(transaction => transaction.kind === type)
        .reduce((sum, transaction) => sum + transaction.amount, 0)
        .toFixed(2)
        .replace('.', ',');
}