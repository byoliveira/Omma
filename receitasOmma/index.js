/**********************************************************************
 * 
 * 
 *    DESAFIO - PROGRAMA PARA CADASTRO DE RECEITAS OMMA
 * 
 *                ISAAC JERONIMO MOREIRA
 *                  25 DE MAIO DE 2023
 *                 GAMA ACADEMY - XP-51
 * 
 * 
**********************************************************************/



// Constantes do programa
const companyName = "Omma - Serviços em Gastronomia LTDA"
var readlineSync = require('readline-sync');
// const prompt = require('prompt-sync')({sigint: true});

// Variáveis globais

let bancoDeReceitas = [
    { 
        titulo:"Torresmo",
        dificuldade:"facil",
        ingredientes: ["Torresmo", "Sal", "Oleo"],// Array para indexar os ingredientes
        //vazio para podermos adicionar mais objetos aqui dentro,
        etapas:listaDeEtapas = ["Cortar Torresmo", "Fritar Torresmo", "Limpar a sujeira do Torresmo", "Sal no Torresmo", "Comer Torresmo"], // Array simples para armazenar passos (strings)
        linkVideo: "https://www.youtube.com/shorts/h4Q2nC-A_zI",
        vegano: "Nao"
    },
    { 
        titulo:"Mousse de Limao",
        dificuldade:"facil",
        ingredientes: ["Limao", "Biscoito de Maizena", "Manteiga", "Leite Condensado", "Creme de Leite"],// Array para indexar os ingredientes
        //vazio para podermos adicionar mais objetos aqui dentro,
        etapas:listaDeEtapas = ["Amassa Biscoito de Maizena", "Bota na forma com manteiga", "Bate no Liquidificador"], // Array simples para armazenar passos (strings)
        linkVideo: "https://www.youtube.com/shorts/Z7gchwUBEJ0",
        vegano: "Nao"
        },

];//Cria um banco de receitas vazio

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
    
    //neste ponto, tive zerar o template e passá-lo para o temporário Receita
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
    let Receita = templateReceitas; //Cria um objeto vazio para armazenar os dados. Ele é temporário.
   

    Receita.titulo = readlineSync.question("Qual o titulo da receita a ser cadastrada? ");
    
    Receita.dificuldade = readlineSync.question("Qual a dificuldade desta receita? ");
    
    
    let naoAdicionarMais;//meio confuso, talvez mudar o nome para naoAdicionarMais?

    let ingrediente;//variável responsável por guardar os ingredientes temporariamente.

    console.log("\nAgora vamos cadastrar os ingredientes!");//aqui, adicionamos ingredientes
    do{
        ingrediente = readlineSync.question("\nQual o nome do ingrediente?\n");
               
        Receita.ingredientes.push(ingrediente);
        adicionarMais = confirmacao("Cadastrar mais ingredientes? "); 
        
    }while(naoAdicionarMais === false);

    let etapa;

    console.log("\nAgora vamos cadastrar os passos da receita!\n");

    etapa = readlineSync.question("Qual o primeiro passo da receita?\n"); 
    Receita.etapas.push(etapa);
    naoAdicionarMais = confirmacao("Cadastrar mais passos? ");

    while(naoAdicionarMais === false){
        etapa = readlineSync.question("Qual o proximo passo da receita?\n"); 
        Receita.etapas.push(etapa);
        naoAdicionarMais = confirmacao("Cadastrar mais passos? ");         
    }

    Receita.linkVideo = readlineSync.question("Adicione um link para o video da receita. Caso nao exista, digite \"N/A\"\n");
    Receita.vegano = readlineSync.question("Esta receita e vegana? (S/N) ");
    
    salvarReceita(Receita, banco);    
}

function salvarReceita(receita, banco){
    if(!confirmacao("Salvar receita? ")){
         banco.push(receita);
         console.log("\n >>> RECEITA SALVA COM SUCESSO! <<<\n");
    }else console.log("\n >>> RECEITA NÃO SALVA! <<<\n"); 
}

function deletarReceita(banco){
    console.log(`A ${companyName} possui ${banco.length} receitas cadastradas.\n`);
    let element = readlineSync.question("\nQual o indice da receita a ser deletada?\n(OBS: os indicies comecam por 0): "); 
    
    if(element < banco.length){
        if(!confirmacao("Deletar receita? ")){
            banco.splice(element, 1);
            console.log(`\n >>> RECEITA ${element} DELETADA COM SUCESSO! <<<\n`);
       }else console.log("\n >>> OPERACAO ABORTADA! <<<\n"); 
    }else{
        console.log(`\n >>> RECEITA \"${element}\" NAO ENCONTRADA OU INEXISTENTE! <<<\n`);
    }       
}

function exibirReceita(banco){
    console.log(`A ${companyName} possui ${banco.length} receitas cadastradas.\n`);
    function mostrar(element){
        console.log(element);
        console.log("\n");
    }
    banco.forEach(mostrar);
}

//OK, daqui pra frente vamos criar a interface de interação com o usuário

//Vamos mostrar o nome da empresa:
console.log("\n************************************************\n");
console.log(`   Bem vindo(a) ao gerenciador de receitas da\n      ${companyName}\n`);
console.log("***********************************************\n");


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
        case "excluir":
        case "Excluir":
        case "EXCLUIR":
                deletarReceita(bancoDeReceitas);
                continuarLoop = true;
                break;
        case "sair":
        case "Sair":
        case "SAIR":
        case "exit":
                console.log(`\n  OBRIGADO POR UTILIZAR O EDITOR DE RECEITAS DA \n    ${companyName}\n`);
                continuarLoop = false;
                break;
        default:
            console.log(`\n >>> O COMANDO \"${fazer}\" NAO E VALIDO, TENTE NOVAMENTE <<<\n`);
            continuarLoop = true;
    }

}while(continuarLoop);


