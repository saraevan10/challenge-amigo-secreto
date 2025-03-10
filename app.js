//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// Elementos DOM
const nomeInput = document.getElementById('amigo');
const adicionarBtn = document.getElementById('button-add');
const sortearBtn = document.getElementById('button-draw');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

// Array para armazenar os nomes
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const nome = nomeInput.value.trim();
    
    if (nome === '') {
        alert('Por favor, insira um nome válido!');
        return;
    }
    
    // Verificar se o nome já existe na lista
    if (amigos.includes(nome)) {
        alert('Este nome já está na lista!');
        return;
    }
    
    // Adicionar o nome ao array
    amigos.push(nome);
    
    // Criar um elemento de lista
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${nome}</span>
        <button class="remover" data-nome="${nome}">Remover</button>
    `;
    
    // Adicionar à lista
    listaAmigos.appendChild(li);
    
    // Limpar o campo de entrada
    nomeInput.value = '';
    nomeInput.focus();
    
    // Habilitar o botão de sortear se houver pelo menos dois amigos
    atualizarBotaoSortear();
}

// Função para remover um amigo da lista
function removerAmigo(nome) {
    // Remover do array
    amigos = amigos.filter(amigo => amigo !== nome);
    
    // Atualizar a lista na UI
    atualizarListaAmigos();
    
    // Atualizar o estado do botão de sortear
    atualizarBotaoSortear();
    
    // Esconder o resultado se um amigo for removido
    resultado.style.display = 'none';
}

// Função para atualizar a lista de amigos na UI
function atualizarListaAmigos() {
    listaAmigos.innerHTML = '';
    
    amigos.forEach(nome => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${nome}</span>
            <button class="remover" data-nome="${nome}">Remover</button>
        `;
        listaAmigos.appendChild(li);
    });
}

// Função para atualizar o estado do botão de sortear
function atualizarBotaoSortear() {
    sortearBtn.disabled = amigos.length < 2;
}

// Função para sortear um amigo
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos dois amigos para realizar o sorteio!');
        return;
    }
    
    // Escolher um amigo aleatoriamente
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];
    
    // Exibir o resultado
    resultado.textContent = `O amigo sorteado é: ${amigoSorteado}`;
    resultado.style.display = 'block';
    
    // Efeito de animação simples
    resultado.style.opacity = '0';
    setTimeout(() => {
        resultado.style.transition = 'opacity 1s';
        resultado.style.opacity = '1';
    }, 100);
}

// Event Listeners
adicionarBtn.addEventListener('click', adicionarAmigo);

nomeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adicionarAmigo();
    }
});

sortearBtn.addEventListener('click', sortearAmigo);

// Delegação de eventos para os botões de remover
listaAmigos.addEventListener('click', (e) => {
    if (e.target.classList.contains('remover')) {
        const nome = e.target.getAttribute('data-nome');
        removerAmigo(nome);
    }
});