class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = [
            { codigo: 'cafe', quantidade: '1', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', quantidade: '1', descricao: 'Chantily (extra do Café)', valor: 1.50, dependencia: 'cafe' },
            { codigo: 'suco', quantidade: '1', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', quantidade: '1', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', quantidade: '1', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00, dependencia: 'sanduiche'  },
            { codigo: 'salgado', quantidade: '1', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', quantidade: '1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', quantidade: '1', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        ];

        let orderTotal = 0;
        const orderItems = [];

        function calcularTotal(total) {
            if (metodoDePagamento === 'dinheiro') {
                return total * 0.95;
            } else if (metodoDePagamento === 'credito') {
                return total * 1.03;
            } else if (metodoDePagamento === 'debito') {
                return total;
            }
        }

        for (const itemCodigo of itens) {
            const selectedItem = cardapio.find(item => item.codigo === itemCodigo);

            if (selectedItem) {
                if (selectedItem.dependencia) {
                    const itemPrincipal = orderItems.find(item => item.codigo === selectedItem.dependencia);
                    if (!itemPrincipal) {
                        orderItems.push({ descricao: "Item extra não pode ser pedido sem o principal", valor: 0 });
                    }
                }

                orderItems.push(selectedItem);
                orderTotal += selectedItem.valor;
            }
        }

        if (orderItems.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const totalComDescontoAcrecimo = calcularTotal(orderTotal);
        const formattedOrder = orderItems.map(item => {
            if (item.valor === 0) {
                return `${item.descricao}`;
            } else {
                return `${item.descricao} - R$ ${item.valor.toFixed(2)}`;
            }
        }).join('\n');
        const totalMessage = `Total: R$ ${totalComDescontoAcrecimo.toFixed(2)}`;
        const paymentMessage = `Forma de pagamento: ${metodoDePagamento}`;

        return `Pedido finalizado!\n\n${formattedOrder}\n\n${totalMessage}\n${paymentMessage}`;
    }
}

const itemInput = document.getElementById('item');
const paymentInput = document.getElementById('payment');
const addButton = document.getElementById('add');
const orderList = document.getElementById('order');
const totalSpan = document.getElementById('total');
const checkoutButton = document.getElementById('checkout');

const caixa = new CaixaDaLanchonete();

addButton.addEventListener('click', () => {
    const metodoDePagamento = paymentInput.value.toLowerCase();
    const itens = itemInput.value.split(',').map(item => item.trim());

    const resultado = caixa.calcularValorDaCompra(metodoDePagamento, itens);
    alert(resultado);

    itemInput.value = '';
    paymentInput.value = '';
    orderList.innerHTML = '';
    totalSpan.textContent = '0.00';
});