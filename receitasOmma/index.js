// Constantes do programa
const programName = "Omma - Serviços em Gastronomia LTDA"
// const prompt = require('prompt-sync')({sigint: true});

// Variáveis globais

let bancoDeReceitas = [];//Cria um banco de receitas vazio

let templateReceitas = { // Cria um ojeto em branco com a estrutura
                         //de como devem ser organizados os dados
    titulo:"",
    dificuldade:"",
    ingredientes: [// Array para indexar os ingredientes
        //vazio para podermos adicionar mais objetos aqui dentro
    ],
    etapas: [], // Array simples para armazenar passos (strings)
    linkVideo: "",
    vegano: ""
};

let ingrediente = {
    quantidade: 0,//deve ser expresso em número
    unidade: "",//xícara, colher de sopa, Kg, etc
    nome: ""//nome do ingrediente
};

//Ok, let the fun begin

//O programa vai perguntar e pedir validação inúmeras vezes. Melhor tornar esse processo uma função :)
function pergunta (mensagem){
    let resposta;
    let continuar;

    do{
        resposta = prompt(mensagem);

        do{
            continuar = prompt(`Você digitou "${resposta}". Deseja salvar? (S/N)`);
            switch(continuar){
                case "S":
                case "s":
                case "sim":
                    continuar = false;
                    break;
                case "N":
                case "n":
                case "nao":
                case "não":
                    continuar = true;
                    break;
                default:
                    alert(`Desculpe, "${continuar}" não é resposta válida. Tente novamente.`);
                    continuar = "invalid";
            }
        }while(continuar === "invalid");
    }while(continuar);

    return resposta;
}

function cadastrarReceita (){//função responsável pelo cadastro das informações da receita.
    console.log("***********************************************");
    console.log("*            CADASTRANDO RECEITA              *");
    console.log("***********************************************");

    let = Receita = templateReceitas; //Cria um objeto vazio para armazenar os dados. Ele é temporário.

    let titulo = pergunta("Qual o título da receita a ser cadastrada? ");

    Receita.titulo = titulo;//Salva o titulo lido.
    bancoDeReceitas.push(Receita);
    console.log(bancoDeReceitas);    
    
}

cadastrarReceita();

