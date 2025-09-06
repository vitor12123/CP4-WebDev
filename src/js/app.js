let jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];

let contador = 0;
let ativado = false;
let jogadorasFavoritas = []

window.onload = () => {
  exibir();
}

function idx(event) {
    const idx = event.target.dataset.index;
};

function exibir() {
  const localDasJogadoras = document.getElementById('sectionJogadoras');
  jogadoras.forEach(procurar => {
    const card = document.createElement('div')
    card.className ='listaJogadoras' 
    card.innerHTML += `
        <img id="favorito" src="../img/favorite_24dp_000_FILL0_wght400_GRAD0_opsz24.png" alt="">
        <img class="card" src="../img/cardJogadoras.png" alt="">
        <div class='informacaoJogadoras'>
        <img class="fotoJogadora" src="${procurar.foto}" alt="${procurar.foto}">
        <h2 class="nomeJogadora">${procurar.nome}</h2>
        <p>Posição: ${procurar.posicao}</p>
        <p>Clube: ${procurar.clube}</p>
        <p>Gols: ${procurar.gols}</p>
        <p>Assistências: ${procurar.assistencias}</p>
        <p>Jogos: ${procurar.jogos}</p>
        </div>
        <button class="botaoDelete">Excluir Card da jogadora</button>
        <button class="botaoEditar" data-index="${idx}">Editar Card da jogadora</button>
    `
    localDasJogadoras.appendChild(card);
    
    let favorito = card.querySelector('#favorito');
    favorito.addEventListener('click', () => {
      ativado =  !ativado;
      if (ativado == true ) {
        favorito.style.backgroundColor = 'red';
        favorito.style.borderRadius = '60%';
        jogadorasFavoritas.push(procurar.nome)
        localStorage.setItem("JogagadorasFavoritadas", jogadorasFavoritas)
      }
      else {
        favorito.style.backgroundColor = "#ffff";
        jogadorasFavoritas = jogadorasFavoritas.filter(nm => nm !== procurar.nome)
        localStorage.removeItem("JogadorasFavoritas", jogadorasFavoritas)
      }
      contador++; 
    });

    function adicionar(event) {
    event.preventDefault();
    
    const imag = document.getElementById('imag').value;
    const nome2 = document.getElementById('nome2').value;
    const position = document.getElementById('position').value
    const club =  document.getElementById('club').value
    const gool =  document.getElementById('gool').value
    const assists =  document.getElementById('assists').value
    const qntdJogos =  document.getElementById('qntdJogos').value

    const novasJogadoras = { 
        foto: imag,
        nome:  nome2,
        posicao: position,
        clube: club,
        gols: gool,
        assistencias: assists,
        jogos: qntdJogos,
        favorita: false
    };
    
    jogadoras.unshift(novasJogadoras);
    
    document.querySelector('#forms').reset();
    localStorage.setItem('jogadoras',JSON.stringify(jogadoras));  
    exibir();
    }



  let edit = card.querySelectorAll('.botaoEditar');

  edit.forEach((btnEdit, idx) => {
    btnEdit.addEventListener("click", () => {
      const novaImg = prompt("Digite uma nova URL para mudar a foto (ou coloque a mesma para não alterar):",
        jogadoras[idx].foto
      );
      const novoNome = prompt("Digite o novo nome que você quer colocar.",
        jogadoras[idx].nome
      )
      const novaPosicao = prompt("Digite a nova posição da jogadora.",
        jogadoras[idx].posicao
      )
      const novoClube = prompt("Digite o novo clube da jogadora.",
        jogadoras[idx].clube
      )
      const novoGol = prompt("Digite a nova quantidade de gols.",
        jogadoras[idx].gols
      )
      const novaAssisencia = prompt("Digite a nova quantidade de assistencias.",
        jogadoras[idx].assistencias
      )
      const novoJogo = prompt("Digite digite quantos jogos a jogadora jogou.",
        jogadoras[idx].jogos
      )
      if (novaImg !== null && novaImg.trim() !== "") {
        jogadoras[idx].foto = novaImg;
        localDasJogadoras.innerHTML = ""; 
          }
        jogadoras[idx].nome = novoNome
        jogadoras[idx].posicao = novaPosicao
        jogadoras[idx].clube = novoClube
        jogadoras[idx].gols = novoGol
        jogadoras[idx].assistencias = novaAssisencia
        jogadoras[idx].jogos = novoJogo
        exibir();
        alert('jogadora editada com sucesso!')
        });
      });

  let delet = card.querySelectorAll('.botaoDelete');
  delet.forEach(btnDel => {
    btnDel.addEventListener("click", () => {
      jogadoras = jogadoras.filter(x => x.nome !== procurar.nome);
      const localDasJogadoras = document.getElementById('sectionJogadoras'); 
      localDasJogadoras.innerHTML = "";
      exibir();
      alert('jogadora excluida com sucesso!')
      });
    });
  });

}
