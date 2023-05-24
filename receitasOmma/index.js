// Constantes do programa
const programName = "Omma - Serviços em Gastronomia LTDA"
var readlineSync = require('readline-sync');
// const prompt = require('prompt-sync')({sigint: true});

// Variáveis globais

let bancoDeReceitas = [];//Cria um banco de receitas vazio

let templateReceitas = { // Cria um ojeto em branco com a estrutura
                         //de como devem ser organizados os dados
    titulo:"",
    dificuldade:"",
    ingredientes: listaDeIngredientes = [],// Array para indexar os ingredientes
        //vazio para podermos adicionar mais objetos aqui dentro,
    etapas:listaDeEtapas = [], // Array simples para armazenar passos (strings)
    linkVideo: "",
    vegano: ""
};

let templateIngrediente = {
    quantidade: 0,//deve ser expresso em número
    unidade: "",//xícara, colher de sopa, Kg, etc
    nome: ""//nome do ingrediente
};

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

function cadastrarReceita (){//função responsável pelo cadastro das informações da receita.
    console.log("***********************************************");
    console.log("*            CADASTRANDO RECEITA              *");
    console.log("***********************************************");
    //document.write("CADASTRANDO RECEITA<br><br>");

    let Receita = templateReceitas; //Cria um objeto vazio para armazenar os dados. Ele é temporário.
    let ingrediente = templateIngrediente;

    Receita.titulo = readlineSync.question("Qual o titulo da receita a ser cadastrada? ");
    //document.write("Título: " + Receita.titulo + "<br>");
    Receita.dificuldade = readlineSync.question("Qual a dificuldade desta receita? ");
    //document.write("Dificuldade: " + Receita.dificuldade + "<br>");
    
    let adicionarMais;

    console.log("\nAgora vamos cadastrar os ingredientes!");//aqui, adicionamos ingredientes
    do{
        ingrediente.nome = readlineSync.question("\nQual o nome do ingrediente?\n");
        ingrediente.quantidade = readlineSync.question("Qual a quantidade a ser utilizada? ");
        ingrediente.unidade = readlineSync.question("Como este ingrediente e medido? (xicaras, gramas, quilos, etc) ");
        
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

    ingrediente.linkVideo = readlineSync.question("Adicione um link para o video da receita. Caso nao exista, digite \"N/A\"\n");
    ingrediente.vegano = readlineSync.question("Esta receita e vegana? (S/N) ");

    if(confirmacao("Salvar receita? ") === false){
         bancoDeReceitas.push(Receita);
         console.log("\n >>> RECEITA SALVA COM SUCESSO! <<<\n");
    }else console.log("\n >>> RECEITA NÃO SALVA! <<<\n");

    
    
}

cadastrarReceita();
console.log(bancoDeReceitas);
//document.write(bancoDeReceitas);

