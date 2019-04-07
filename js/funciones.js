var probabilidades = {}

var string = "papepapopa carori ro tamo peno";

$('document').ready(function(){
  analizarTexto(string);
  generarTexto(5);
});

function generarTexto(n){
  console.log('caracteres a generar: '+n);
  //Selección aleatoria de primera letra
  //Basado en: https://stackoverflow.com/a/15106541/10824377
  var keys = Object.keys(probabilidades);
  // console.log(keys);
  var primeraLetraAleatoria = keys[ keys.length * Math.random() << 0];
  var keysPrimeraLetra = probabilidades[primeraLetraAleatoria];
  // console.log(primeraLetraAleatoria);
  // console.log(keysPrimeraLetra);

  var letraActual;
  var letraSiguiente;
  for(var i=0; i<n; i++){
  }
}

function analizarTexto(str){
  /*El único problema que tiene esta función es que no considera al inicio
  de la primera palabra como posterior a un espacio. La primera letra de
  la primera palabra no entra en el cálculo de probabilidades, todas las demás sí
  (incluyendo la última letra de la última palabra).*/

  console.log(str);

  //1- Análisis de las letras
  for (var i = 0; i < str.length; i++) {
    //Identificar letra actual y siguiente
    var letraActual = str.charAt(i);
    var letraSiguiente = str.charAt(i+1);

    //Si no hay letra siguiente, tomarlo como un espacio/separador de palabra
    if(!letraSiguiente){
      letraSiguiente=' ';
    }
    else{
      //si la letra actual no existe en la matriz, agregarla
      if(!probabilidades[letraActual]){
        probabilidades[letraActual] = {};
      }
      //ver la letra siguiente para la letra actual. Si no existe, inicializarla
      if(!probabilidades[letraActual][letraSiguiente]){
        probabilidades[letraActual][letraSiguiente] = 1;
      }
      //Si ya existe, sumarle 1
      else{
        probabilidades[letraActual][letraSiguiente]++;
      }
    }
  }

  //2- Normalización de las probabilidades: De peso a rangos
  var ks = Object.keys(probabilidades);
  var probabilidadesPorLetra;
  var letraSeleccionada;
  for(var i=0; i<ks.length; i++){
    letraSeleccionada = probabilidades[ks[i]];
    var keysLetra = Object.keys(letraSeleccionada);
    console.log(keysLetra);
  }
}
