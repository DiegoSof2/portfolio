/* //Faz rolar a pagina
function openMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
} */

/* Cria um caractere aleatorios  */
function randChar() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    //!@#$^&*()…æ_+-=;[]/~`"
    const randomChar = characters[Math.floor(Math.random() * characters.length)];

    //Cria a possibilidade de caractere aleatorio ser maiúsculo 
    if(Math.random() > 0.5){
        return randomChar.toUpperCase();
        //return randomChar;
    }
    else{
        return randomChar;
    }

   
  }
  
  //função de atualizar o texto do elemento
  function updateText(element, text, encoded, progress){

    //Calcula o ponto de corte do texto, determina até onde texto sera trocado, com base np progresso da animação.
    const point = Math.floor(progress * text.length)

    //Prenche encoded com caracteres aleatorios na mesma quantidade do texto original
     text.forEach((char, i) => encoded[i] = randChar());

     //Pego parte do texto original e parte do texto encoded, uso point como indice   
     let part1 = text.join('').substring(point, 0),
         part2 = encoded.join('').substring(encoded.length - point, 0);
    //Se elemento tiver a classe fromRight a logica é invertida para criar uma animação no sentido contratio.
    if(element.classList.contains('FromRight')){
         part1 = encoded.join('').substring(encoded.length - point, 0);
         part2 = text.join('').substring(text.length - point);
    }
    element.innerHTML = part1 + part2;


  }


  
  // Aplicando a animação a cada elemento com a classe .codedText
  document.querySelectorAll('.codedText').forEach((element) => {
    const text = element.innerHTML.split('');
    const encoded = new Array(text.length).fill(''); // Inicializa arr2 com espaços vazios
  
    //Definindo o evento pointover ao elemento html e Aplicao uma animação usando a biblioteca GSAP
    element.onpointerover = () => {
    
      //crio uma linha do tempo  
      const animation = gsap.timeline();

      // variavel para acompanhar animação
      let step =  0;
  
      animation.fromTo(element, {
       //innerHTML: arr2.join(''),
        //  color: '#000',
       //  background: '#bada55'
      
      }, {

        //Defini a duração do efeito com base no tamanho do texto
        duration: text.length /  20,
        //suaviza animação
        ease: 'power4.in',
        //delay para executar animação
        delay:  0.1,
        //color: '#fff',
        //background: '#000',
        onUpdate: () => {
          const progress = animation.progress();
          if (step !== progress){
            step = progress;
            updateText(element, text, encoded, progress);
          }
        }
      });
    };
  });




