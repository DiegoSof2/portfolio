// Função para gerar um caractere aleatório
function randChar() {
  const characters = "abcdefghijklmnopqrstuvwxyz1234567890!@#$^&*()…æ_+-=;[]/~`";
  const randomChar = characters[Math.floor(Math.random() * characters.length)];
  return Math.random() >  0.5 ? randomChar : randomChar.toUpperCase();
}

// Função para atualizar o texto do elemento
function updateText(element, arr1, arr2, progress) {
  const p = Math.floor(progress * arr1.length);
  arr1.forEach((char, i) => arr2[i] = randChar());
  let pt1 = arr1.join('').substring(p,  0),
      pt2 = arr2.join('').substring(arr2.length - p,  0);
  if (element.classList.contains('FromRight')) {
    pt1 = arr2.join('').substring(arr2.length - p,  0);
    pt2 = arr1.join('').substring(arr1.length - p);
  }
  element.innerHTML = pt1 + pt2;
}

// Aplicando a animação a cada elemento com a classe .codedText
document.querySelectorAll('.codedText').forEach((element) => {
  const arr1 = element.innerHTML.split('');
  const arr2 = new Array(arr1.length).fill(''); // Inicializa arr2 com espaços vazios

  element.onpointerover = () => {
    const tl = gsap.timeline();
    let step =  0;

    tl.fromTo(element, {
    // innerHTML: arr2.join(''),
    //  color: '#000',
    //  background: '#bada55'
    }, {
      //duração da animação com base no tamanho do texto
     duration: arr1.length /  20,
     //Suaviza a animação.
     ease: 'power4.in',
 
    //  background: '#000',
      onUpdate: () => {
        const progress = tl.progress();
        if (step !== progress) {
          step = progress;
          updateText(element, arr1, arr2, progress);
        }
      }
    });
  };
});
