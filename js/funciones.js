var probabilidades = {}
var letrasAGenerar = 100;

var string = "ingresar un texto y clickear el botón para calcular la probabilidad de letras";

$('document').ready(function(){
  $('#procesar').click(function(){
    string='';
    string = $('#textoIngresado').val();
    analizarTexto(string);
    $('#textoProcesado').html(generarTexto(letrasAGenerar));
  });
  $('#sampleItaliano').click(function(){
    $('#textoIngresado').html("La battaglia di Waterloo (denominata inizialmente dai francesi battaglia di Mont Saint-Jean e dai prussiani battaglia di Belle-Alliance) si svolse il 18 giugno 1815 durante la guerra della Settima coalizione fra le truppe francesi guidate da Napoleone Bonaparte e gli eserciti britannici del Duca di Wellington e prussiano del feldmaresciallo Gebhard Leberecht von Blücher. Fu una delle più combattute e sanguinose battaglie delle guerre napoleoniche, nonché l'ultima battaglia di Napoleone, segnando la sua definitiva sconfitta e il conseguente esilio a Sant'Elena. La battaglia in realtà ebbe luogo nel territorio del villaggio di Mont-Saint-Jean, situato alcuni chilometri a sud della cittadina di Waterloo, nella quale si trovava il quartier generale del Duca di Wellington. Dopo la fuga di Napoleone dall'isola d'Elba nel marzo 1815, numerosi Stati europei si unirono in un'alleanza militare dando vita alla settima coalizione, con lo scopo di sconfiggere definitivamente l'imperatore francese. Napoleone decise di attaccare di sorpresa i due eserciti che Regno Unito e Prussia avevano raggruppato in Belgio; l'imperatore sperava di raggiungere una rapida vittoria sfruttando la scarsa coesione dei suoi avversari. Due giorni prima di Waterloo i francesi avevano sconfitto i prussiani nella battaglia di Ligny, ma Wellington, informato che Blücher era riuscito a riorganizzare il suo esercito e sembrava intenzionato a marciare in suo aiuto, prese la decisione di rischiare una battaglia contro le forze di Napoleone. Il generale britannico schierò i suoi uomini in difesa lungo la scarpata di Mont-Saint-Jean, vicino alla strada per Bruxelles, confidando nell'aiuto dei prussiani. Napoleone sferrò una serie di sanguinosi attacchi contro le linee britanniche a partire dalle ore 11:30 e nel tardo pomeriggio sembrò vicino alla vittoria, ma l'ostinata resistenza del nemico e l'arrivo in massa dei prussiani decisero alla fine la battaglia a favore dei coalizzati. Ancora oggi nei pressi di Waterloo è ricordata la grande battaglia con una serie di monumenti, ed esiste un museo dedicato al famoso scontro. L'intera zona è un parco storico.");
  });
});

function generarTexto(n){
  var textoFinal = '';
  console.log('caracteres a generar: '+n);
  //Selección aleatoria de primera letra
  //Basado en: https://stackoverflow.com/a/15106541/10824377
  var keys = Object.keys(probabilidades);
  // console.log(keys);
  var primeraLetraAleatoria = keys[ keys.length * Math.random() << 0];
  var keysPrimeraLetra = probabilidades[primeraLetraAleatoria];

  var letraActual = primeraLetraAleatoria;
  var letraSiguiente;
  var sumaDeOcurrencias;

  //Loop: Para cada letra generada
  console.log('----- Inicio de loop');
  for(var i=0; i<n; i++){
    console.log('-- Nueva letra --');
    sumaDeOcurrencias=0;
    textoFinal += letraActual;
    console.log('Letra actual: '+letraActual);
    var probsLetraActual = probabilidades[letraActual];
    console.log('Array de pesos de cada letra que puede seguir a la letra actual: ');
    console.log(probsLetraActual);
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
    console.log('Suma de ocurrencias: '+sumaDeOcurrencias);
    console.log('Array para selección de número random:');
    console.log(arraySegundasLetrasIteradas);
    var r = Math.floor(Math.random()*sumaDeOcurrencias);
    console.log('Número aleatorio: '+r);
    letraSiguiente = arraySegundasLetrasIteradas[r];
    console.log('Letra siguiente: '+letraSiguiente);

    //actualización para el siguiente ciclo
    letraActual = letraSiguiente;
  }
  return textoFinal;
}

function analizarTexto(str){
  /*El único problema que tiene esta función es que no considera al inicio
  de la primera palabra como posterior a un espacio. La primera letra de
  la primera palabra no entra en el cálculo de probabilidades, todas las demás sí
  (incluyendo la última letra de la última palabra).*/
  probabilidades = {}
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
}
