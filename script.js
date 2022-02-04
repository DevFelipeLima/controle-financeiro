const transactionsUl = document.getElementById('transactions')
const desp = document.getElementById('money-minus')
const rec = document.getElementById('money-plus')
const SldAtual = document.getElementById('balance')
const InputTvalue = document.getElementById('amount')
const InputTname = document.getElementById('text')
const form = document.getElementById('form')



/*Criação do paramentro para utilização do localStorage */
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions  : []

/* remover os itens ao clicar no X, fazendo com que as transações recebam todas as transações, menos a que foi clicada atravez do parametro ID */
const deleteTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID )
    
    updateLocalStorage()
    init()

}

const addTransactions= transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CssClass = transaction.amount < 0 ? 'minus' : 'plus'
    const ValueABS = Math.abs(transaction.amount)
    const li = document.createElement('li')
    
    li.classList.add(CssClass)
    li.innerHTML = ` ${transaction.name} 
    <span>${operator} R$ ${ValueABS} </span>
    <button class="delete-btn" onClick='deleteTransaction(${transaction.id})'>X</button>`

   transactionsUl.append(li) 
}
/*Pegar apenas os valores da propriendade Amount de dentr do array, atravez do metodo map()  */
const updateBalance =()=>{
    const transactionsAmout = transactions.map(transaction => transaction.amount)
    const total = transactionsAmout.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const FilterNegative = Math.abs(transactionsAmout.filter(item => item < 0).reduce((accumulator, value)=> accumulator + value, 0).toFixed(2)) 
    const FilterPositive = transactionsAmout.filter(item => item > 0).reduce((accumulator, value)=> accumulator + value, 0).toFixed(2)

    /* Passando os valores para os respectivos locais no HTML atravez das consts criadas */
    SldAtual.textContent =  `R$ ${total}`
    rec.textContent =  `R$ ${FilterPositive}`
    desp.textContent =  `R$ ${FilterNegative}`
    
}
/*Função que mostra os dados do DOM atualizados, atravez dela que atualiza o quadro de transações sempre que for invocada logo apos as mudançãs */
const init = ()=>{

    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactions)
    updateBalance()
}
init()

/*Criação da função que ira atualizar os dados do Local Storage,
 setando os itens com a Key ('transactions')e o Valor passado para string JSON
 a função será invocada em todos os locais que necessitarem de atualização da tela de transações (Listener e no remove) */
const updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

/* Função que vai gerar um ID Aleatorio a partir do metodo Math.random até 1000 */
const genereteID = () => Math.round(Math.random() * 1000)

/*Adcionando o evento que vai ouvir se os campos do formulario foram preenchidos */
form.addEventListener('submit', event =>{
    event.preventDefault()

    const transactionName = InputTname.value.trim()
    const transactionValue= InputTvalue.value.trim()

    /*Função .trim() remove todos os espaços vazios no input */

    if(transactionName==="" || transactionValue.trim()===''){
        window.alert('Preencha todos os dados do formulario abaixo!!!')
        return
    }

    /*Const que vai ser adcionada ao Form quando o usuario preencher as informações e clicar em adicionar*/
    /*Função construtora Number() pelo simples fato de que queremos rebeber na propriedade amout um numero atravez do input */
    const transaction =  {id: genereteID(), name:transactionName, amount: Number(transactionValue)}

    transactions.push(transaction)
    init()
    updateLocalStorage()

    InputTname.value = ''
    InputTvalue.value = ''
})

