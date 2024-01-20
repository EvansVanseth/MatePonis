let divApp;
/* DATOS DE LA SESSION */

const appData = {
  operacion: 0,  //0:suma, 1:resta, 2:multiplicacion, 3:division
  datoA: 0,      // valor de la parte superior de la operacion
  datoB: 0,      // valor de la parte inferior de la operacion
  cifrA: 0,
  cifrB: 0,
  cifras: 0,     // numero de cifras más alto entre los números de cifras de cada numero
  resultado: 0,  // valor resultado de la operación
  intentos: 0,   // intentos de la misma operacion
  racha: 0,      // operaciones acertadas a la primera
  puntosGanados: 0,
  oPonySel: null,// Pony con la que se está jugando
  comentario: "" // comentario de la poni respecto a nuestra última acción
}

/* DATOS DEL JUGADOR */
const jugador = {
  nombre: "",
  exp_total: 0,  // total de puntos acumulados
  exp_actual: 0, // puntos actuales, canjeables por dinero real
  nivel: 1       // nivel obtenido tras acumular puntos
                 //  (se utiliza exp_total para calcularlo)
}

/* Objeto personaje  */
function Personaje (clave, 
                    nombre, 
                    descripcion, 
                    necesidad, 
                    operacion, 
                    lado, 
                    minLvl,
                    com_inicio,
                    com_fallo1,
                    com_fallo2,
                    com_fallo3,
                    com_acierto,
                    com_3aciertos,
                    com_6aciertos,
                    com_10aciertos,
                    com_continuar
                    ) {
  this.clave = clave;
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.necesidad = necesidad;
  this.operacion = operacion;
  this.lado = lado; // 0: izquierda, 1: derecha
  this.minLvl = minLvl;
  this.com_inicio = com_inicio;
  this.com_fallo1 = com_fallo1;
  this.com_fallo2 = com_fallo2;
  this.com_fallo3 = com_fallo3;
  this.com_acierto = com_acierto;
  this.com_3aciertos = com_3aciertos;
  this.com_6aciertos = com_6aciertos;
  this.com_10aciertos = com_10aciertos;
  this.com_continuar = com_continuar;
}

/* Personajes */
const oApplejack = new Personaje (
  "applejack",
  "Applejack",
  "A Applejack le encanta recolectar las manzanas de la granja, contar los pajaritos que han anidado en los arboles y limpiar el granero! ¡Son todo trabajos muy importantes! ¿Le ayudas a contar cuantas de esas cosas ha recolectado?",
  "Para ayudar a Applejack tendrás que realizar sumas",
  pagApplejack,
  0,
  1,
  `¡Esa se resistió!`,
  `¡Ush! ¡Que molestas las moscas!`,
  `Concentrate ${jugador.nombre} ¡Tu puedes!`,
  `¡Ah! Se ha escapado... Bueno, no pasa nada.`,
  `Que bien! Esto va como la seda!`,
  `Ya le hemos cogido el ritmo.`,
  `¡Wala! Mira como va. ¡Fabuloso!`,
  `¿Seguro que no has estudiado con Twilight?`,
  `Otra mas. ¡Esto es un no parar!`
);
const oFluttershy = new Personaje (
  "fluttershy",
  "Fluttershy",
  "Para Fluttershy lo mas importante es no molestar a los demás. Así que ella siempre va quitando hierro a las situaciones, a los problemas y a los malos rollos.",
  "Para ayudar a Fluttershy tendrás que realizar restas",
  ()=>{alert("Has seleccionado a FlutterShy")},
  1,
  3,
  `¡Probemos con esta!`,
  `¡Ush! ¡Que molestas las moscas!`,
  `Concentrate ${jugador.nombre} ¡Tu puedes!`,
  `¡Ah! Se ha escapado... Bueno, no pasa nada.`,
  `Que bien! Esto va como la seda!`,
  `Ya le hemos cogido el ritmo.`,
  `¡Wala! Mira como va. ¡Fabuloso!`,
  `¿Seguro que no has estudiado con Twilight?`,
  `Otra mas. ¡Esto es un no parar!`  
);
const oRainbow = new Personaje (
  "rainbow",
  "Rainbow Dash",
  "Rainbow Dash es una alma veloz! Le encanta la velocidad y por ello cuanto más rápdio alcanza sus metas mejor se siente. Para ella las cosas van de dos en dos, de tres en tres o cuatro en cuatro, la cuestión es agrupar!",
  "Para ayudar a Rainbow Dash tendrás que realizar multiplicaciones",
  undefined,
  0,
  5,
  `¡Probemos con esta!`,
  `¡Ush! ¡Que molestas las moscas!`,
  `Concentrate ${jugador.nombre} ¡Tu puedes!`,
  `¡Ah! Se ha escapado... Bueno, no pasa nada.`,
  `Que bien! Esto va como la seda!`,
  `Ya le hemos cogido el ritmo.`,
  `¡Wala! Mira como va. ¡Fabuloso!`,
  `¿Seguro que no has estudiado con Twilight?`,
  `Otra mas. ¡Esto es un no parar!`
);
const oPinkie = new Personaje (
  "pinkie",
  "Pinkie Pie",
  "¡¡ Pinkie Pie es el alma de la fiesta !! Tiene alegría y diversión para rato. Por ello le encanta repartir su jovialidad, su juerga, su música y su entusiasmo con todo el mundo. ¿Le ayudas a decidir que parte le toca a cada uno?",
  "Para ayudar a Pinkie Pie tendrás que realizar divisiones",
  undefined,
  1,
  7,
  `¡Probemos con esta!`,
  `¡Ush! ¡Que molestas las moscas!`,
  `Concentrate ${jugador.nombre} ¡Tu puedes!`,
  `¡Ah! Se ha escapado... Bueno, no pasa nada.`,
  `Que bien! Esto va como la seda!`,
  `Ya le hemos cogido el ritmo.`,
  `¡Wala! Mira como va. ¡Fabuloso!`,
  `¿Seguro que no has estudiado con Twilight?`,
  `Otra mas. ¡Esto es un no parar!`
);
const oTwilight = new Personaje (
  "twilight",
  "Twilight Sparkle",
  "Twily para las amigas, es una alicornio princesa. Como tal tiene muchas responsabilidades, pero pese a ello siempre busca la forma de ayudar a sus amigas. Así que ha tomado tareas de todas ellas y ha pensado en tí para ayudarle. ¿Le echas una pata?",
  "Para ayudar a Twilight tendrás que hacer operaciones matemáticas",
  undefined,
  0,
  10,
  `¡Probemos con esta!`,
  `¡Ush! ¡Que molestas las moscas!`,
  `Concentrate ${jugador.nombre} ¡Tu puedes!`,
  `¡Ah! Se ha escapado... Bueno, no pasa nada.`,
  `Que bien! Esto va como la seda!`,
  `Ya le hemos cogido el ritmo.`,
  `¡Wala! Mira como va. ¡Fabuloso!`,
  `¿Seguro que no has estudiado con Twilight?`,
  `Otra mas. ¡Esto es un no parar!`
);

let divPersonajes;

/** Guardar datos del jugador en LocalStorage */
function guardarDatosJugador() {
  localStorage.setItem("mates-ponis-nombre", jugador.nombre);
  localStorage.setItem("mates-ponis-exp-total", jugador.exp_total.toString());
  localStorage.setItem("mates-ponis-exp-actual", jugador.exp_actual.toString());
  localStorage.setItem("mates-ponis-nivel", jugador.nivel.toString());
}

/** Cargar datos del jugador en LocalStorage */
function cargarDatosJugador() {
  jugador.nombre = localStorage.getItem("mates-ponis-nombre");
  jugador.exp_total = parseInt(localStorage.getItem("mates-ponis-exp-total"));
  jugador.exp_actual = parseInt(localStorage.getItem("mates-ponis-exp-actual"));
  jugador.nivel = parseInt(localStorage.getItem("mates-ponis-nivel"));
}

/** Eliminar datos del jugador en LocalStorage */
function eliminarDatosJugador() {
  localStorage.removeItem("mates-ponis-nombre");
  localStorage.removeItem("mates-ponis-exp-total");
  localStorage.removeItem("mates-ponis-exp-actual");
  localStorage.removeItem("mates-ponis-nivel");
}

/** Creación de un jugador nuevo */
function crearJugadorNuevo(){
  const inputName = document.getElementById("nombre-jugador");
  //jugador.nombre = inputName.value.replace(/[^\w]/gi, '');
  jugador.nombre = inputName.value;
  jugador.exp_total = 0;
  jugador.exp_actual = 0;
  jugador.nivel = 1;
  guardarDatosJugador();
  pagSeleccionPersonaje();
}
/** Actualizar el nombre de un jugador */
function actualizarNombreJugador(){
  const inputName = document.getElementById("nombre-jugador");
  //jugador.nombre = inputName.value.replace(/[^\w]/gi, '');
  if (inputName.value !== "") jugador.nombre = inputName.value;
  guardarDatosJugador();
  pagOpcionesJugador();
}

/** Canjear puntos */
function canjearPuntos() {
  const inputPuntos = document.getElementById("puntos-canjear");
  let puntos = parseInt(inputPuntos.value);
  if (inputPuntos.value === "") return;
  if (puntos > jugador.exp_actual) return;
  if (window.confirm(`Esta acción no se puede deshacer.\n
  ¿Quieres canjear ${puntos} puntos?`)) {
    //jugador.nombre = inputName.value.replace(/[^\w]/gi, '');
    jugador.exp_actual -= puntos;
    guardarDatosJugador();
    pagOpcionesJugador();  
  }
}

/** Eliminar datos del jugador */
function eliminarAyudante() {
  if (window.confirm(`Esta acción no se puede deshacer.\n
  ¿Estas segur@ que quieres dejar de ser nuesto ayudante?`)) {
    jugador.nombre = "";
    jugador.exp_actual = 0;
    jugador.exp_total = 0;
    jugador.nivel = 1;
    eliminarDatosJugador();
    pagPedirNombreJugador();  
  }
}

/** Calculo del nivel segun los puntos de experiencia */
function calcularNivel(exp){
  let nvl = 1;
  let expRest = exp;
  const pNec = 200;
  while (expRest >= nvl*pNec) {
    expRest -= nvl*pNec;
    nvl++;
  }
  return nvl;
}
/** devuelve la clave del ultimo personaje jugable */
function poderJugador(){
  if(jugador.nivel >= 10) return "twilight";
  if(jugador.nivel >= 7)  return "pinkie";
  if(jugador.nivel >= 5)  return "rainbow";
  if(jugador.nivel >= 3)  return "fluttershy";
  return "applejack";
}

function numeroRandom(cifras) {
  let num = 0;
  let ini = 0;
  let fin = 0;
  if(cifras<=0) return 0;
  if(cifras>1) ini = 10**(cifras-1);
  fin = 10**cifras;
  num = ini + Math.floor(Math.random()*(fin-ini));
  return num;
}
function minmaxData(dato, min, max){
  let Data = dato;
  if (Data>max) Data=max;
  if (Data<min) Data=min;
  return Data;
}

//    data  ceil  floor
// 1  0.5    1      0
// 2  1      1      1
// 3  1.5    2      1
// 4  2      2      2
// 5  2.5    3      2
// 6  3      3      3
// 7  3.5    4      3
// 8  4      4      4
// 9  4.5    5      4
// X  5      5      5

/** CREACIÓN Y COMPROBACIÓN DE OPERACIONES */
function crearSuma() {
  if (appData.intentos===0) {
    appData.cifrA = minmaxData(Math.ceil(jugador.nivel/2+0.5),1,5);
    appData.cifrB = minmaxData(Math.floor(jugador.nivel/2+0.5),1,5);

    appData.datoA = numeroRandom(appData.cifrA);
    appData.datoB = numeroRandom(appData.cifrB);
    appData.resultado = appData.datoA + appData.datoB;
    appData.cifras = Math.max(appData.cifrA, appData.cifrB)+3;
  }

  let output  = "&nbsp;&nbsp;" + appData.datoA.toString() + "<BR>";
      output += "+&nbsp;" + 
                (appData.cifrA-appData.cifrB===1?"&nbsp;":"") + 
                 appData.datoB.toString();

  return output;

}
function crearResta() {}
function crearMultiplicacion() {}
function crearDivision() {}

function comprobarResultado() {
  const itRes = document.getElementById("resultado-operacion");
  if (itRes.value === "") return;
  let resultado = parseInt(itRes.value);
  console.log(`Has puesto ${resultado} y el resultado correcto es ${appData.resultado}`);
  if (resultado === appData.resultado) {
    if(appData.intentos===0) (appData.racha<10?appData.racha++:appData.racha=10);
    appData.intentos = 0;
    switch (appData.racha) {
      case 10: appData.comentario = appData.oPonySel.com_10aciertos; break;
      case 9: appData.comentario = appData.oPonySel.com_continuar; break;
      case 8: appData.comentario = appData.oPonySel.com_continuar; break;
      case 7: appData.comentario = appData.oPonySel.com_continuar; break;
      case 6: appData.comentario = appData.oPonySel.com_6aciertos; break;
      case 5: appData.comentario = appData.oPonySel.com_continuar; break;
      case 4: appData.comentario = appData.oPonySel.com_continuar; break;
      case 3: appData.comentario = appData.oPonySel.com_3aciertos; break;
      case 2: appData.comentario = appData.oPonySel.com_continuar; break;
      case 1: appData.comentario = appData.oPonySel.com_acierto; break;
      case 0: appData.comentario = appData.oPonySel.com_inicio; break;
    }
    appData.puntosGanados = appData.cifrA + appData.cifrB + appData.racha;
    jugador.exp_total  += appData.puntosGanados;
    jugador.exp_actual += appData.puntosGanados;
    let nuevoNivel = calcularNivel(jugador.exp_total);
    if(nuevoNivel > jugador.nivel) {
      jugador.nivel = nuevoNivel;
      appData.comentario = `¡Espectacular ${jugador.nombre}! Has subido a nivel ${jugador.nivel}`;
    }
    guardarDatosJugador();
    console.log(appData);
    appData.oPonySel.operacion();
  }
  else {
    appData.racha = 0;
    appData.intentos++;
    if(appData.intentos===1) appData.comentario = appData.oPonySel.com_fallo1;
    if(appData.intentos===2) appData.comentario = appData.oPonySel.com_fallo2;
    if(appData.intentos===3) {
      appData.comentario = appData.oPonySel.com_fallo3;
      appData.intentos = 0;
    }
    appData.puntosGanados=0;
    console.log(appData);
    appData.oPonySel.operacion();
  }
}

/*
  PUNTUACIÓN
  Las operaciones dan una cantidad de puntos de experiencia que el jugador
  irá acumulando. Más delante podrá canjear esos puntos por dinero real si
  sus padres están de acuerdo.

  El valor estándar es 100 puntos -> 1€

  VALOR DE LAS OPERACIONES
  Las puntuaciones se dan dependiendo de la cantidad de cifras de cada número
  de la operación. Por ejemplo, 12+5 otorgará 3 puntos, 271+35 serían 5 puntos.

  Todas las operaciones tienen una bonificación de 1 punto por acierto (max. 10)
  [
    Una operación acertada en el primer intento, otorga un punto extra.
    Si la siguiente operación también se acierta al primer intento,
    se otorgan 2 puntos extra.

    En definitiva se trata de una bonificación por encadenar primeros intentos ok.

  ]
  <Esto es para incentivar que la operación se realice bien a la primera>

  Las sigientes letras representan las cifras de cada número de la operación.
  · SUMA:
      Nivel 1  -> A+B   1 punto * (A+B);
  · RESTA:
      Nivel 3  -> A-B   1 punto * (A) + 2 puntos * (B)
  · MULTIPLICACION:
      Nivel 5  -> A*B   2 puntos * (A+B)
  · DIVISION:
      Nivel 7  -> A*B   2 puntos * (A) + 3 puntos * (B)
  · TWILIGHT:
      Nivel 10 -> Todas las anteriores + 3 puntos por acierto acumulado

  INTENTOS
  Se pueden realizar hasta tres intentos por operación. Cada poni tendrá su dialogo
  que acompañará al jugador mientras está haciendo las operaciones.
  APPELJACK:
  Inicio: ¡Probemos con esta!
  1er fallo: ¡Ush! ¡Que molestas las moscas!
  2do fallo: Concentrate {jugador.nombre} ¡Tu puedes!
  3er fallo: ¡Ah! Se ha escapado... Bueno, no pasa nada.
  Acierto: Que bien! Esto va como la seda!
  3 aciertos: Ya le hemos cogido el ritmo.
  6 aciertos: ¡Wala! Mira como va. ¡Fabuloso!
  10 aciertos: ¿Seguro que no has estudiado con Twilight?
  Continuar: Otra mas. ¡Esto es un no parar!

  NIVEL
  El jugador subirá de nivel según la siguiente formula:
  - Puntos para acceder al siguiente nivel = nivel actual * 200;
  NIVEL  1: 0
  NIVEL  2: 200
  NIVEL  3: 200+400 = 600
  NIVEL  4: 200+400+600 = 1200
  NIVEL  5: 200+400+600+800 = 2000
  NIVEL  6: 200+400+600+800+1000 = 3000
  NIVEL  7: 200+400+600+800+1000+1200 = 4200
  NIVEL  8: 200+400+600+800+1000+1200+1400 = 5600
  NIVEL  9: 200+400+600+800+1000+1200+1400+1600 = 7200
  NIVEL 10: 200+400+600+800+1000+1200+1400+1600+1800 = 9000




*/
/* PONER JUGADOR */
function InsertJugadorInto(oHTMLParent) {
  // DIV
  const div = document.createElement("div");
  div.classList.add("jugador");
  // NIVEL
  const nivj = document.createElement("p");
  nivj.classList.add("nivel_jugador");
  nivj.innerHTML = `Nv ${jugador.nivel}`;
  // NOMBRE
  const nomj = document.createElement("p");
  nomj.classList.add("nombre_jugador");
  nomj.classList.add(`sombra_${poderJugador()}`);
  nomj.innerHTML = `${jugador.nombre}`;
  nomj.addEventListener("click", pagOpcionesJugador);
  // EXP_ACTUAL
  const expj = document.createElement("p");
  expj.classList.add("exp_jugador");
  expj.innerHTML = `${jugador.exp_actual} PE`;

  div.appendChild(nivj);
  div.appendChild(nomj);
  div.appendChild(expj);

  oHTMLParent.appendChild(div);
}
/** torna los personajes listados según se han desbloqueado por nivel */
function listaPersonajes() {
  let selPers = Array();
  if (jugador.nivel >= 10) selPers.push(oTwilight);
  if (jugador.nivel >= 7) selPers.push(oPinkie);
  if (jugador.nivel >= 5) selPers.push(oRainbow);
  if (jugador.nivel >= 3) selPers.push(oFluttershy);
  selPers.push(oApplejack);
  if(!selPers.includes(oFluttershy)) selPers.push(oFluttershy);
  if(!selPers.includes(oRainbow)) selPers.push(oRainbow);
  if(!selPers.includes(oPinkie)) selPers.push(oPinkie);
  return selPers;
}

/* PONER PERSONAJE */
function InsertPersonajeInto(oHTMLParent, personaje) {
  const habilitado = personaje.minLvl <= jugador.nivel;
  // DIV
  const div = document.createElement("div");
  div.classList.add("descripcion_personaje");
  div.classList.add(`bg_${personaje.clave}`);
  if (!habilitado) div.classList.add(`deshabilitar`);
  if (personaje.lado===1) div.classList.add("text-right");
  // H2
  const hnom = document.createElement("h3");
  hnom.classList.add("nombre_personaje");
  hnom.classList.add(`sombra_${personaje.clave}`);
  hnom.innerHTML = personaje.nombre;
  // P
  const p1 = document.createElement("p");
  p1.innerHTML = personaje.descripcion;
  // P
  const p2 = document.createElement("p");
  p2.classList.add("fntMath");
  p2.innerHTML = personaje.necesidad;
  // P
  const p3 = document.createElement("p");
  p3.classList.add("desbloquear");
  p3.innerHTML = `Para poder ayudar a ${personaje.nombre} debes tener nivel ${personaje.minLvl}`;
  // BTN
  const btn = document.createElement("button");
  btn.classList.add("btn");
  if (habilitado) btn.classList.add(`btn-${personaje.clave}`);
  btn.innerHTML = `Ayudar a ${personaje.nombre.toUpperCase()}`;
  if (habilitado) btn.addEventListener("click", personaje.operacion);

  div.appendChild(hnom);
  if(!habilitado) div.appendChild(p3);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(btn);

  oHTMLParent.appendChild(div);
}

// GRUPO DE PERSONAJES
function GrupoPersonajes(oHTMLParent, listaPersonajes){
  const div = document.createElement("div");
  div.classList.add("personajes");
  div.setAttribute("id","Pxs");
  divPersonajes = div;
  oHTMLParent.appendChild(divPersonajes);
  listaPersonajes.forEach( personaje => {
    InsertPersonajeInto(div, personaje);
  });
}

/********** PAGINAS ********/

// PAGINA INICIO SI JUGADOR NO EXISTE AUN
function pagPedirNombreJugador(){
  divApp.innerHTML = "";
  // DIV
  const div = document.createElement("div");
  div.classList.add("flex-column-center");
  
  // TITULO (H3)
  const htit = document.createElement("h2");
  htit.classList.add("text-center");
  htit.innerHTML = "¡¡ Bienvenid@ ayudante !!";

  // P1
  const p1 = document.createElement("p");
  p1.innerHTML = "Oh! Vemos que todavía no conocemos tu nombre. Es importante para poder guardar la experiencia que acumules mientras ayudas a nuestras amigas.";
  p1.classList.add("big-text");
  p1.classList.add("text-center");
  
  // P2
  const p2 = document.createElement("p");
  p2.innerHTML = "¡Vamos, anímate! Seguro que lo pasamos genial.";
  p2.classList.add("big-text");
  p2.classList.add("text-center");
  p2.classList.add("sombra_twilight");
  
  // Input
  const input = document.createElement("input");
  input.classList.add("intro_nombre");
  input.classList.add("borde_gris");
  input.setAttribute("placeholder","escribe tu nombre");
  input.setAttribute("id","nombre-jugador");
  
  // button
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.classList.add(`btn-twilight`);
  btn.innerHTML = `¡ VAMOS ALLÁ !`;
  btn.addEventListener("click", crearJugadorNuevo);
  
  // Asignar elementos a Div
  div.appendChild(htit);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(input);
  div.appendChild(btn);
  // Salida a la aplicación
  divApp.appendChild(div);
  
}
// PAGINA DE BIENVENIDA AL JUGADOR
function pagBienvenidaJugador(){
  divApp.innerHTML = "";
  
  let sombra = poderJugador();
  
  const div = document.createElement("div");
  
  const htit = document.createElement("h2");
  htit.classList.add("text-center");
  htit.innerHTML = `¡¡ Bienvenid@ &nbsp;<span class="sombra_${sombra}">${jugador.nombre}</span> !!`;
  
  const p1 = document.createElement("p");
  p1.innerHTML = "Menos mal que has vuelto. Tenemos un montón de trabajo y vamos a seguir necesitando tu ayuda. ¿Vamos a por ello?";
  p1.classList.add("big-text");
  p1.classList.add("text-center");
  
  const p2 = document.createElement("p");
  p2.innerHTML = `Ya has acumulado &nbsp;<span class="sombra_${sombra}">${jugador.exp_actual} puntos de experiencia</span>.`;
  p2.classList.add("big-text");
  p2.classList.add("text-center");
  const p3 = document.createElement("p");
  p3.innerHTML = `Estás en nivel &nbsp;<span class="sombra_${sombra}">${jugador.nivel}</span> ¿Seguimos?`;
  p3.classList.add("big-text");
  p3.classList.add("text-center");
  
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.classList.add(`btn-${sombra}`);
  btn.innerHTML = `¡ VAMOS ALLÁ !`;
  btn.addEventListener("click", pagSeleccionPersonaje);
  
  div.appendChild(htit);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(btn);
  divApp.appendChild(div);
}

// PAGINA ELECCION PERSONAJES
function pagSeleccionPersonaje(){
  divApp.innerHTML = "";
  InsertJugadorInto(divApp);
  GrupoPersonajes(divApp, listaPersonajes());
  window.scrollTo(0,0);
}

// PAGINA OPCIONES DEL JUGADOR
function pagOpcionesJugador(){
  divApp.innerHTML = "";
  let sombra = poderJugador();
  
  const div = document.createElement("div");
  
  const htit = document.createElement("h2");
  htit.classList.add("text-center");
  htit.innerHTML = `Opciones del ayudante`;
  const p1 = document.createElement("p");
  
  p1.innerHTML = `Hola &nbsp;<span class="sombra_${sombra}">${jugador.nombre}</span>.<br>¡ Aqui puedes cambiar tu nombre o canjear puntos !`;
  p1.classList.add("big-text");
  p1.classList.add("text-center");
  
  // Div Cambiar nombre
  const divCN = document.createElement("div");
  divCN.classList.add("flex-column-center");
  divCN.classList.add("margen-inferior");
  divCN.classList.add(`borde_${sombra}`);
  
  const pTCN = document.createElement("h4");
  pTCN.innerHTML = `CAMBIAR NOMBRE`;
  pTCN.classList.add("text-center");
  pTCN.classList.add(`color_${sombra}`);
  
  const pCN = document.createElement("p");
  pCN.innerHTML = `Aqui puede cambiar tu nombre.<BR>Escribe tu nombre en la casilla de texto y pulsa el botón CAMBIAR NOMBRE.`;
  pCN.classList.add("text-center");

  const inputCN = document.createElement("input");
  inputCN.classList.add("intro_nombre");
  inputCN.classList.add(`borde_gris`);
  inputCN.setAttribute("placeholder","escribe tu nombre");
  inputCN.setAttribute("id","nombre-jugador");

  const btnCN = document.createElement("button");
  btnCN.classList.add("btn");
  btnCN.classList.add(`btn-${sombra}`);
  btnCN.innerHTML = `CAMBIAR NOMBRE`;
  btnCN.addEventListener("click", actualizarNombreJugador);
  
  divCN.appendChild(pTCN);
  divCN.appendChild(pCN);
  divCN.appendChild(inputCN);
  divCN.appendChild(btnCN);

  // Div Canjear puntos
  const divCP = document.createElement("div");
  divCP.classList.add("flex-column-center");
  divCP.classList.add(`borde_${sombra}`);
  divCP.classList.add("margen-inferior");
  
  const pTCP = document.createElement("h4");
  pTCP.innerHTML = `CANJEAR PUNTOS`;
  pTCP.classList.add("text-center");
  pTCP.classList.add(`color_${sombra}`);
  
  const pCP = document.createElement("p");
  pCP.innerHTML = `Aqui puede canjear tus puntos por dinero real.<BR>
  Escribe la cantidad que desees cambiar y pulsa el botón CANJEAR PUNTOS.<BR>
  Los puntos canjeados desaparecerán de tu puntuación.<BR>
  < 100 puntos = 1,00 € >`;
  pCP.classList.add("text-center");

  const pAD = document.createElement("p");
  pAD.innerHTML = `Esta acción no puede deshacerse.<BR>
  Asegurate que están tus padres contigo y saben que cantidad vas a canjear.<BR>
  Si canjeas los puntos sin estar en presencia de tus padres, los perderás y no obtendrás el dinero real.`;
  pAD.classList.add("text-center");
  pAD.classList.add("advertencia");

  const pIP = document.createElement("p");
  pIP.innerHTML = `Tienes &nbsp; <span class="sombra_${sombra}">${jugador.exp_actual}</span> puntos.`;
  pIP.classList.add("text-center");
  pIP.classList.add("mid-text");
  pIP.classList.add("margen-inferior");

  const inputCP = document.createElement("input");
  inputCP.classList.add("intro_nombre");
  inputCP.classList.add(`borde_gris`);
  inputCP.setAttribute("placeholder","cuantos puntos quieres canjear");
  inputCP.setAttribute("id","puntos-canjear");
  inputCP.setAttribute("type","number");

  const btnCP = document.createElement("button");
  btnCP.classList.add("btn");
  btnCP.classList.add(`btn-${sombra}`);
  btnCP.innerHTML = `CANJEAR PUNTOS`;
  btnCP.addEventListener("click", canjearPuntos);
  
  divCP.appendChild(pTCP);
  divCP.appendChild(pCP);
  divCP.appendChild(pAD);
  divCP.appendChild(pIP);
  divCP.appendChild(inputCP);
  divCP.appendChild(btnCP);  

  // Div Eliminar datos del jugador
  const divEJ = document.createElement("div");
  divEJ.classList.add("flex-column-center");
  divEJ.classList.add(`borde_${sombra}`);
  
  const pTEJ = document.createElement("h4");
  pTEJ.innerHTML = `ELIMINAR AYUDANTE`;
  pTEJ.classList.add("text-center");
  pTEJ.classList.add(`color_${sombra}`);
  
  const pEJ = document.createElement("p");
  pEJ.innerHTML = `Aqui puede eliminar tus datos del dispositivo.`;
  pEJ.classList.add("text-center");

  const pAE = document.createElement("p");
  pAE.innerHTML = `Esta acción no puede deshacerse.<BR>
  Si borras tus progresos PERDERAS TODOS los puntos que hayas obtenido.`;
  pAE.classList.add("text-center");
  pAE.classList.add("advertencia");

  const btnEJ = document.createElement("button");
  btnEJ.classList.add("btn");
  btnEJ.classList.add(`btn-${sombra}`);
  btnEJ.innerHTML = `ELIMINAR AYUDANTE`;
  btnEJ.addEventListener("click", eliminarAyudante);

  divEJ.appendChild(pTEJ);
  divEJ.appendChild(pEJ);
  divEJ.appendChild(pAE);
  divEJ.appendChild(btnEJ);  

  // REGRESAR a PAGINA Seleccion de personaje
  const btnRT = document.createElement("button");
  btnRT.classList.add("btn");
  btnRT.classList.add(`btn-${sombra}`);
  btnRT.classList.add("margen-vertical");
  btnRT.innerHTML = `VOLVER`;
  btnRT.addEventListener("click", pagSeleccionPersonaje);

  // Colocar elementos
  div.appendChild(htit);
  div.appendChild(p1);
  div.appendChild(divCN);
  div.appendChild(divCP);
  div.appendChild(divEJ);
  div.appendChild(btnRT);

  divApp.appendChild(div);
}

// PAGINA PERSONAJE APPLEJACK (SUMAS)
function pagApplejack(){
  appData.oPonySel = oApplejack;
  
  divApp.innerHTML = "";
  InsertJugadorInto(divApp);
  // DIV
  const div = document.createElement("div");
  div.classList.add("flex-column-center");
  const divZO = document.createElement("div");
  divZO.classList.add("flex-column-center", "bg_applejack", "borde_applejack", "zona-operaciones");

  const hTt = document.createElement("h2");
  hTt.innerHTML = "Applejack";
  hTt.classList.add("text-center");
  
  const divEx = document.createElement("div");
  divEx.classList.add("flex-column-center");

  const divOp = document.createElement("div");
  divOp.classList.add("flex-column-center", "centrado-por-margen", "ancho-contenido");

  const pOp = document.createElement("p");
  pOp.classList.add("texto_operacion");
  pOp.innerHTML = crearSuma();

  let iOp = document.createElement("input");
  iOp.classList.add("intro_resultado");
  iOp.classList.add(`borde_gris`);
  iOp.setAttribute("id","resultado-operacion");
  iOp.setAttribute("type","number");
  iOp.style.width = (appData.cifras*2).toString() + "rem";

  const bOp = document.createElement("button");
  bOp.classList.add("btn-comprobacion");
  bOp.classList.add(`btn-applejack`);
  bOp.innerHTML = `COMPROBAR`;
  bOp.addEventListener("click", comprobarResultado);

  divOp.appendChild(pOp);
  divOp.appendChild(iOp);
  divOp.appendChild(bOp);
  
  const pCm = document.createElement("p");
  pCm.classList.add("texto_comentario");
  if (appData.intentos===0) pCm.classList.add("sombra_applejack");
  else pCm.classList.add("sombra_fallo");
  pCm.setAttribute("id","comentario-pony");
  pCm.innerHTML = appData.comentario;

  divEx.appendChild(divOp);
  divEx.appendChild(pCm);

  // Colocamos elementos
  divZO.appendChild(hTt);
  divZO.appendChild(divEx);

  div.appendChild(divZO);

  divApp.appendChild(div);
}

/****** ENTRADA A LA APLICACIÓN *************/

//FUNCIÓN DE ENTRADA A LA APLICACIÓN
globalThis.addEventListener("load", ()=>{
  divApp = document.getElementById("App");
  cargarDatosJugador();
  if (jugador.nombre === null) pagPedirNombreJugador();
  else pagBienvenidaJugador();
  console.log(numeroRandom(3));
})