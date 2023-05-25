// Constantes do programa
const companyName = "Omma - Serviços em Gastronomia LTDA"
var readlineSync = require('readline-sync');
// const prompt = require('prompt-sync')({sigint: true});

// Variáveis globais

let bancoDeReceitas = [];//Cria um banco de receitas vazio

let templateReceitas = { // Cria um ojeto em branco com a estrutura
                         //de como devem ser organizados os dados
    titulo:"",
    dificuldade:"",
    ingredientes: [],// Array para indexar os ingredientes
        //vazio para podermos adicionar mais objetos aqui dentro,
    etapas:listaDeEtapas = [], // Array simples para armazenar passos (strings)
    linkVideo: "",
    vegano: ""
};

//Beleza, vamos usar essa idéia depois

// let templateIngrediente = {
//     quantidade: 0,//deve ser expresso em número
//     unidade: "",//xícara, colher de sopa, Kg, etc
//     nome: ""//nome do ingrediente
// };

//Ok, let the fun begin

//O programa vai perguntar e pedir validação inúmeras vezes. Melhor tornar esse processo uma função :)
function confirmacao (mensagem){
    let continuar;

    do{
            continuar = readlineSync.question(`${mensagem} (S/N)`);
            switch(continuar){
                case "S":
                case "s":
                case "sim":
                case "Sim":
                    continuar = false;
                    break;
                case "N":
                case "n":
                case "Não":
                case "Nao":
                case "nao":
                case "não":
                    continuar = true;
                    break;
                default:
                    console.log(`Desculpe, "${continuar}" nao e resposta valida. Tente novamente.`);
                    continuar = "invalid";
            }
        }while(continuar === "invalid");
    return continuar;
}


//função responsável pelo cadastro das informações da receita.

function cadastrarReceita (banco){
    console.log("***********************************************");
    console.log("*            CADASTRANDO RECEITA              *");
    console.log("***********************************************");
    //document.write("CADASTRANDO RECEITA<br><br>");

    let Receita = templateReceitas; //Cria um objeto vazio para armazenar os dados. Ele é temporário.
   

    Receita.titulo = readlineSync.question("Qual o titulo da receita a ser cadastrada? ");
    //document.write("Título: " + Receita.titulo + "<br>");
    Receita.dificuldade = readlineSync.question("Qual a dificuldade desta receita? ");
    //document.write("Dificuldade: " + Receita.dificuldade + "<br>");
    
    let adicionarMais;//meio confuso, talvez mudar o nome para naoAdicionarMais?

    let ingrediente;//variável responsável por guardar os ingredientes temporariamente.

    console.log("\nAgora vamos cadastrar os ingredientes!");//aqui, adicionamos ingredientes
    do{
        ingrediente = readlineSync.question("\nQual o nome do ingrediente?\n");
               
        Receita.ingredientes.push(ingrediente);
        adicionarMais = confirmacao("Cadastrar mais ingredientes? "); 
        
    }while(adicionarMais === false);

    let etapa;

    console.log("\nAgora vamos cadastrar os passos da receita!\n");

    etapa = readlineSync.question("Qual o primeiro passo da receita?\n"); 
    Receita.etapas.push(etapa);
    adicionarMais = confirmacao("Cadastrar mais passos? ");

    while(adicionarMais === false){
        etapa = readlineSync.question("Qual o proximo passo da receita?\n"); 
        Receita.etapas.push(etapa);
        adicionarMais = confirmacao("Cadastrar mais passos? ");         
    }

    Receita.linkVideo = readlineSync.question("Adicione um link para o video da receita. Caso nao exista, digite \"N/A\"\n");
    Receita.vegano = readlineSync.question("Esta receita e vegana? (S/N) ");
    
    salvarReceita(Receita, banco);
    
}

function salvarReceita(receita, banco){
    if(confirmacao("Salvar receita? ") === false){
         banco.push(receita);
         console.log("\n >>> RECEITA SALVA COM SUCESSO! <<<\n");
    }else console.log("\n >>> RECEITA NÃO SALVA! <<<\n"); 
}

function deletarReceita(banco){
    let element = readlineSync.question("Qual o índice da receita a ser deletada?\n"); 
    
    if(element < banco.length){
        if(confirmacao("Deletar receita? ") === false){
            banco.splice(element, 1);
            console.log(`\n >>> RECEITA ${element} DELETADA COM SUCESSO! <<<\n`);
       }else console.log("\n >>> OPERACAO ABORTADA! <<<\n"); 
    }else{
        console.log(`\n >>> RECEITA '\${elemente}'\ NAO ENCONTRADA OU INEXISTENTE! <<<\N`);
    }


       
}

function exibirReceita(banco){
    banco.forEach(element => {
        console.log(element);
    });    
}

//OK, daqui pra frente vamos criar a interface de interação com o usuário

//Vamos mostrar o nome da empresa:
console.log("***********************************************");
console.log(`     ${companyName}       `);
console.log("***********************************************\n");
console.log(`Bom vindo(a) ao gerenciador de receitas da\n ${companyName}\n`);

let continuarLoop;
do{
    console.log("***********************************************\n")
    console.log("Para exibir as receitas cadastradas, digite \"exibir\"");
    console.log("Para cadastrar uma nova receita, digite \"cadastrar\"");
    console.log("Para deletar uma receita, digite \"deletar\"");
    console.log("Para finalizar o programa, digite \"sair\"");
    let fazer = readlineSync.question("\nOmma> ");
    switch(fazer){
        case "exibir":
        case "EXIBIR":
        case "Exibir":
            exibirReceita(bancoDeReceitas);
            continuarLoop = true;
            break;
        case "cadastrar":
        case "Cadastrar":
        case "CADASTRAR":
            cadastrarReceita(bancoDeReceitas);
            continuarLoop = true;
            break;
        case "deletar":
        case "Deletar":
        case "DELETAR":
                deletarReceita(bancoDeReceitas);
                continuarLoop = true;
                break;
        case "sair":
        case "Sair":
        case "SAIR":
        case "exit":
                console.log(`\N >>> OBRIGADO POR UTILIZAR O EDITOR DE RECEITAS DA ${companyName}\n`);
                continuarLoop = false;
                break;
        default:
            console.log(`\n >>> O COMANDO \"${fazer}\" NAO E VALIDO, TENTE NOVAMENTE <<<\n`);
            continuarLoop = true;
    }

}while(continuarLoop);


