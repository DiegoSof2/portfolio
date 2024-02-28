
function openMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
} 

/* Cria um caractere aleatorios  */
/* function randChar() {
    const characters = "abcdefghijklmnopqrstuvwxyz!@#$^&*()…æ_+-=;[]/~`";
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
    element.innerHTML = part1.replace(/\n/g, "") +  part2;
 


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
 */

  //executa o scrpit ao carregar a pagina
  document.addEventListener('DOMContentLoaded', function() {

    DecodeString(document.getElementById('meuParagrafo').innerText,document.getElementById('meuParagrafo'));
    
  });

  const coding = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ)(*&%$#@!".split("");

  
  //recebo a entrada e saida
  function DecodeString(input,  output){
    //limpa o elemento de saida 
    output.innerHTML = "";
    //divido o texto de entrada caractere em um array
    let chars = input.split("");

    //Chamo a função displaychars passando o indice
    DisplayChars(0, output, chars);
    return true;
  }

  function DisplayChars(index, output, chars){

    //defino o delay das funções
    const delay = 5;

    //Crio um elemento <span>
    let span = document.createElement('SPAN');
    let x = LocateCode(chars[index]);
    //define um indentificador para o span
    span.id = 'char' + index;
    //Cria um objeto decode, com informação se ele está codificado, quando parar de codificar, e indice da codificação. 
    span.Decode ={coding: true, stop: x, index: x};

    //adiciona o caractere atual do texto de entrada como um nó de texto ao elemento <span>.
    span.appendChild(document.createTextNode(chars[index]));
    //Adição do Elemento <span> ao Elemento de Saída, e atualiza o elemento span
    span = output.appendChild(span);

  
    //chamada recursivamente para processar cada caractere de uma string de entrada, e um delay para executar a função novamente
    if((++index)< chars.length){
     window.setTimeout(()=> { DisplayChars('' + index, output, chars) },  delay);
    }
    //Chamada recursivamente para decodificar caractere por caracatere
    window.setTimeout(() =>{ DisplayCoding('' + span.id, 'char' + (index -  2)) },  delay);
  

  }

  function DisplayCoding(spanId, prevId){
    const delayCoding = 10;
    const delayEnd = 5;
    let prevElement = null;
    let spanElement = document.getElementById(spanId);

    //verifica se previd é diferente de char-1 se for receba id se não parmanece nulo.
    prevElement = prevId !== 'char-1' ? document.getElementById(prevId) : null;


    if (spanElement.Decode.index !== null) {
      if (++spanElement.Decode.index == coding.length) spanElement.Decode.index =  0;
      spanElement.firstChild.data = coding[spanElement.Decode.index];
    }

    if (Continue(spanElement, prevElement)) {
        window.setTimeout(()=> { DisplayCoding('' + spanId, '' + prevId) },  delayCoding);
         } else {
          //Revisar
        window.setTimeout("document.getElementById('" + spanElement.id + "').Decode.coding = false", delayEnd);
     }


  }
  function Continue(spanElement, prevElement) {
       
    return spanElement.Decode.stop !== null && spanElement.Decode.stop != spanElement.Decode.index ||
           (spanElement.Decode.stop !== null && prevElement && prevElement.Decode.coding);

   }
   function LocateCode(char) {
    var index, len = coding.length;
    for (index =  0; index < len; ++index) {
        if (char == coding[index]) return index;
    }
    return null;
}