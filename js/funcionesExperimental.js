


//SOLO USAR ESTAS FUNCIONES JUNTAS ENTRE SÍ.

function generarTexto3Char(n){
  // console.clear();
  var textoFinal = '';

  //Selección aleatoria de primer par
  //Basado en: https://stackoverflow.com/a/15106541/10824377
  var keys = Object.keys(probabilidades);

  //Generar nuevos pares hasta que el par inicial sea distinto de "  ".
  //"  " es un par problemático porque sale en los segundos pares,
  //pero no en los primeros. Es el único que encontré hasta ahora que
  //rompe el código.
  var primerParAleatorio = keys[ keys.length * Math.random() << 0];

  var keysPrimerPar = probabilidades[primerParAleatorio];

  var parActual = primerParAleatorio;
  var parSiguiente;

  //Loop: Para cada letra generada
  // console.log('----- Inicio de loop');
  for(var i=0; i<n; i++){
    //reset
    // console.log('-- Nuevo par --');
    var sumaDeOcurrencias=0;
    // console.log('par actual: '+parActual);

    //Imprimir a "texto final" el par actual menos última letra; evitar reduplicación
    parImprimible = parActual.substring(0, parActual.length-1);
    textoFinal += parImprimible;

    var probsParActual = probabilidades[parActual];
    // console.log('Array de pesos de cada letra que puede seguir a la letra actual: ');
    // console.log(probsParActual);
    var keysParActual = Object.keys(probsParActual);

    //Recorrer todas las letras y sumar un número total de ocurrencias
    var arraySegundosParesIterados = [];
    for(var j=0; j<keysParActual.length; j++){
      var ocurrenciasSegParActual = probsParActual[keysParActual[j]];
      sumaDeOcurrencias += ocurrenciasSegParActual;
      for(var k=0; k<ocurrenciasSegParActual; k++){
        arraySegundosParesIterados.push(keysParActual[j]);
      }
    }
    ///console.log('Suma de ocurrencias: '+sumaDeOcurrencias);
    // console.log('Array para selección de número random:');
    // console.log(arraySegundosParesIterados);
    var r = Math.floor(Math.random()*sumaDeOcurrencias);
    // console.log('Número aleatorio: '+r);
    parSiguiente = arraySegundosParesIterados[r];
    // console.log('Letra siguiente: '+parSiguiente);

    //actualización para el siguiente ciclo
    if(parSiguiente=="  "){
      textoFinal += ' '; //agregar un espacio; salvar excepción
      parSiguiente=keys[ keys.length * Math.random() << 0]; //par random
    }
    parActual = parSiguiente;
  }
  return textoFinal;
}

function analizarTexto3Char(str){
  /*El único problema que tiene esta función es que no considera al inicio
  de la primera palabra como posterior a un espacio. La primera letra de
  la primera palabra no entra en el cálculo de probabilidades, todas las demás sí
  (incluyendo la última letra de la última palabra).*/

  //Reset
  probabilidades = {}
  var lA, lB, lC;
  var parActual, parSiguiente; // Ej: "hola" > "ho">"ol". NO "ho">"la"

  //Para cada letra:
  for (var i = 0; i < str.length; i++) {

    //identificar letra actual y siguientes
    lA = str.charAt(i);
    lB = str.charAt(i+1);
    lC = str.charAt(i+2);

    //Si alguna de las letras siguientes no existe, asignarles un espacio
    if(!lB) lB=' ';
    if (!lC) lC=' ';

    //Conformar pares
    parActual = lA + lB;
    parSiguiente = lB + lC;

//(Esta parte que sigue es siempre igual, independientemente del largo de cada token)
    //si el par actual no existe en la matriz, agregarla
    if(!probabilidades[parActual]){
      probabilidades[parActual] = {};
    }
    //ver el par siguiente para el par actual. Si no existe, inicializarlo
    if(!probabilidades[parActual][parSiguiente]){
      probabilidades[parActual][parSiguiente] = 1;
    }
    //Si ya existe, sumarle 1
    else{
      probabilidades[parActual][parSiguiente]++;
    }

  }
}
