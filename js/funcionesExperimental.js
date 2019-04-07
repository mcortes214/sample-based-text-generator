


//SOLO USAR ESTAS FUNCIONES JUNTAS ENTRE SÍ.

function generarTexto3Char(n){
  var textoFinal = '';
  ///console.log('caracteres a generar: '+n);
  //Selección aleatoria de primera letra
  //Basado en: https://stackoverflow.com/a/15106541/10824377
  var keys = Object.keys(probabilidades);
  // ///console.log(keys);
  var primeraLetraAleatoria = keys[ keys.length * Math.random() << 0];
  var keysPrimeraLetra = probabilidades[primeraLetraAleatoria];

  var letraActual = primeraLetraAleatoria;
  var letraSiguiente;
  var sumaDeOcurrencias;

  //Loop: Para cada letra generada
  ///console.log('----- Inicio de loop');
  for(var i=0; i<n; i++){
    ///console.log('-- Nueva letra --');
    sumaDeOcurrencias=0;
    textoFinal += letraActual;
    ///console.log('Letra actual: '+letraActual);
    var probsLetraActual = probabilidades[letraActual];
    ///console.log('Array de pesos de cada letra que puede seguir a la letra actual: ');
    ///console.log(probsLetraActual);
    var keysLetraActual = Object.keys(probsLetraActual);
    //Recorrer todas las letras y sumar un número total de ocurrencias
    var arraySegundasLetrasIteradas = [];
    for(var j=0; j<keysLetraActual.length; j++){
      var ocurrenciasSegLetraActual = probsLetraActual[keysLetraActual[j]];
      sumaDeOcurrencias += ocurrenciasSegLetraActual;
      for(var k=0; k<ocurrenciasSegLetraActual; k++){
        arraySegundasLetrasIteradas.push(keysLetraActual[j]);
      }
    }
    ///console.log('Suma de ocurrencias: '+sumaDeOcurrencias);
    ///console.log('Array para selección de número random:');
    ///console.log(arraySegundasLetrasIteradas);
    var r = Math.floor(Math.random()*sumaDeOcurrencias);
    ///console.log('Número aleatorio: '+r);
    letraSiguiente = arraySegundasLetrasIteradas[r];
    ///console.log('Letra siguiente: '+letraSiguiente);

    //actualización para el siguiente ciclo
    letraActual = letraSiguiente;
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

  var parActual, letraSiguiente;

  for (var i = 0; i < str.length; i++) {
    //Identificar letra actual y siguiente
    if(!str.charAt(i+1)){
      parActual = str.charAt(i) + ' ';
    }
    else{
      parActual = str.charAt(i)+str.charAt(i+1);
    }
     letraSiguiente = str.charAt(i+2);

     //Si no hay letra siguiente, tomarlo como un espacio/separador de palabra
     if(!letraSiguiente){
       letraSiguiente = ' ';
     }


    else{
      //si la letra actual no existe en la matriz, agregarla
      if(!probabilidades[parActual]){
        probabilidades[parActual] = {};
      }
      //ver la letra siguiente para la letra actual. Si no existe, inicializarla
      if(!probabilidades[parActual][letraSiguiente]){
        probabilidades[parActual][letraSiguiente] = 1;
      }
      //Si ya existe, sumarle 1
      else{
        probabilidades[parActual][letraSiguiente]++;
      }
    }
  }
}