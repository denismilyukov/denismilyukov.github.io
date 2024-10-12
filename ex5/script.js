document.getElementById('calculate').addEventListener('click', function() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const productPrice = parseInt(document.getElementById('product').value);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Пожалуйста, введите корректное количество товара.');
        return;
    }

    const totalCost = quantity * productPrice;
    document.getElementById('result').textContent = `Стоимость заказа: ${totalCost} руб.`;
});
