// Load modal content
fetch('modal.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('modalContainer').innerHTML = data;

        var modal = document.getElementById("myModal");
        var btn = document.getElementById("openModalBtn");
        var span = document.getElementById("closeModalBtn");

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        // Initialize Bootstrap Datepicker
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            todayHighlight: true
        });

        // Handle form submission
        document.getElementById('transactionForm').onsubmit = function(event) {
            event.preventDefault();
            var name = document.getElementById('name').value;
            var value = parseFloat(document.getElementById('value').value);
            var type = document.querySelector('input[name="type"]:checked').value;
            var category = document.getElementById('category').value;
            var date = document.getElementById('date').value;
            var description = document.getElementById('description').value;

            var transaction = {
                name: name,
                value: value,
                type: type,
                category: category,
                date: date,
                description: description
            };

            addTransaction(transaction);
            if (type === 'income') {
                updateTotal('entradas', value);
            } else if (type === 'expense') {
                updateTotal('despesas', value);
            }

            modal.style.display = "none";
            this.reset();
        };

        function updateTotal(id, value) {
            var element = document.getElementById(id);
            var currentTotal = parseFloat(element.innerText.replace(',', '.'));
            var newTotal = currentTotal + value;
            element.innerText = newTotal.toFixed(2).replace('.', ',');
        }

        function addTransaction(transaction) {
            var transactionList = document.querySelector('.transaction-list');
            var emptyState = document.querySelector('.transaction-list .empty-state');
            if (emptyState) {
                emptyState.remove();
            }

            var transactionItem = document.createElement('div');
            transactionItem.className = 'transaction-item';
            transactionItem.innerHTML = `
                <div class="transaction-details">
                    <p><strong>${transaction.name}</strong></p>
                    <p>${transaction.date} - ${transaction.category}</p>
                    <p>${transaction.description}</p>
                </div>
                <div class="transaction-value ${transaction.type}">
                    <p>${transaction.type === 'income' ? '+' : '-'}${transaction.value.toFixed(2).replace('.', ',')}</p>
                </div>
            `;
            transactionList.appendChild(transactionItem);
        }

        // Filter functionality
        document.getElementById('filterIncome').onclick = function() {
            filterTransactions('income');
        };

        document.getElementById('filterExpense').onclick = function() {
            filterTransactions('expense');
        };

        document.getElementById('filterLastWeek').onclick = function() {
            filterTransactions('lastWeek');
        };

        function filterTransactions(type) {
            var transactionItems = document.querySelectorAll('.transaction-item');
            var today = new Date();
            var lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);

            transactionItems.forEach(function(item) {
                var itemType = item.querySelector('.transaction-value').classList.contains('income') ? 'income' : 'expense';
                var itemDate = item.querySelector('.transaction-details p:nth-child(2)').innerText.split(' - ')[0];
                var itemDateObj = new Date(itemDate.split('/').reverse().join('-'));

                if (type === 'income' && itemType !== 'income') {
                    item.style.display = 'none';
                } else if (type === 'expense' && itemType !== 'expense') {
                    item.style.display = 'none';
                } else if (type === 'lastWeek' && (itemDateObj < lastWeek || itemDateObj > today)) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            });
        }
    });
