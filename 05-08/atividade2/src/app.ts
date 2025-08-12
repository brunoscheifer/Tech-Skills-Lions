let nome: String = 'Banana'
let preco: Number = 7.50
let emEstoque: boolean = true
let categorias: String[] = ["Boa", 'Ruim']
let coordenada: [Number, Number] = [30, 25]

enum status {
    Pendente,
    Processando,
    Entregue,
    Cancelado
}

function pedido(nome: String, preco: Number): void {
    console.log("O produto " + nome + " custa R$" + preco);
}

pedido("Arroz", 20.00)