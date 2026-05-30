// ========================================
// MENU MOBILE
// ========================================
var botaoMenu = document.querySelector('.botao-menu-mobile');
var listaNavegacao = document.querySelector('.lista-navegacao');

function criarFundoMenu() {
    var fundo = document.createElement('div');
    fundo.className = 'fundo-menu';
    document.body.appendChild(fundo);
    return fundo;
}

var fundoMenu = criarFundoMenu();

function abrirMenu() {
    botaoMenu.classList.add('aberto');
    botaoMenu.setAttribute('aria-expanded', 'true');
    listaNavegacao.classList.add('aberto');
    fundoMenu.classList.add('visivel');
    document.body.style.overflow = 'hidden';
}

function fecharMenu() {
    botaoMenu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    listaNavegacao.classList.remove('aberto');
    fundoMenu.classList.remove('visivel');
    document.body.style.overflow = '';
}

botaoMenu.addEventListener('click', function (evento) {
    evento.stopPropagation();
    if (listaNavegacao.classList.contains('aberto')) {
        fecharMenu();
    } else {
        abrirMenu();
    }
});

fundoMenu.addEventListener('click', function () {
    fecharMenu();
});

var todosLinksNavegacao = document.querySelectorAll('.link-navegacao');
todosLinksNavegacao.forEach(function (link) {
    link.addEventListener('click', function () {
        fecharMenu();
    });
});

// ========================================
// CABEÇALHO AO ROLAR A PÁGINA
// ========================================
var cabecalho = document.querySelector('.cabecalho');
var alturaInicialCabecalho = 60;

window.addEventListener('scroll', function () {
    if (window.scrollY > alturaInicialCabecalho) {
        cabecalho.classList.add('rolando');
    } else {
        cabecalho.classList.remove('rolando');
    }
});

// ========================================
// LINK ATIVO NA NAVEGAÇÃO
// ========================================
var todasSecoes = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {
    var posicaoAtual = window.scrollY + 100;

    todasSecoes.forEach(function (secao) {
        var topoSecao = secao.offsetTop;
        var alturaSecao = secao.offsetHeight;
        var identificadorSecao = secao.getAttribute('id');

        if (posicaoAtual >= topoSecao && posicaoAtual < topoSecao + alturaSecao) {
            todosLinksNavegacao.forEach(function (link) {
                link.classList.remove('ativo');
                if (link.getAttribute('href') === '#' + identificadorSecao) {
                    link.classList.add('ativo');
                }
            });
        }
    });
});

// ========================================
// ANIMAÇÃO DE ENTRADA AO ROLAR
// ========================================
var elementosAnimados = document.querySelectorAll(
    '.cartao-interacao, .cartao-participante, .coluna-positivo, .coluna-negativo, .caixa-conclusao, .grid-duas-colunas'
);

elementosAnimados.forEach(function (elemento) {
    elemento.classList.add('elemento-animado');
});

var observadorEntrada = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observadorEntrada.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

elementosAnimados.forEach(function (elemento) {
    observadorEntrada.observe(elemento);
});

// ========================================
// ROLAGEM SUAVE PARA ÂNCORAS
// ========================================
var todasAncoras = document.querySelectorAll('a[href^="#"]');

todasAncoras.forEach(function (ancora) {
    ancora.addEventListener('click', function (evento) {
        evento.preventDefault();
        var identificadorAlvo = this.getAttribute('href');
        var elementoAlvo = document.querySelector(identificadorAlvo);

        if (elementoAlvo) {
            var posicaoTopo = elementoAlvo.offsetTop - 80;
            window.scrollTo({
                top: posicaoTopo,
                behavior: 'smooth'
            });
        }
    });
});