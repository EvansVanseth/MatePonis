let divApp;

/* Objeto personaje  */
function Personaje (clave, nombre, descripcion, necesidad, operacion, lado, minLvl) {
  this.clave = clave;
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.necesidad = necesidad;
  this.operacion = operacion;
  this.lado = lado; // 0: izquierda, 1: derecha
  this.minLvl = minLvl;
}

/* Personajes */
const oApplejack = new Personaje (
  "applejack",
  "Applejack",
  "A Applejack le encanta recolectar las manzanas de la granja, contar los pajaritos que han anidado en los arboles y limpiar el granero! ¡Son todo trabajos muy importantes! ¿Le ayudas a contar cuantas de esas cosas ha recolectado?",
  "Para ayudar a Applejack tendrás que realizar sumas",
  pagApplejack,
  0,
  1
);
const oFluttershy = new Personaje (
  "fluttershy",
  "Fluttershy",
  "Para Fluttershy lo mas importante es no molestar a los demás. Así que ella siempre va quitando hierro a las situaciones, a los problemas y a los malos rollos.",
  "Para ayudar a Fluttershy tendrás que realizar restas",
  ()=>{alert("Has seleccionado a FlutterShy")},
  1,
  3
);
const oRainbow = new Personaje (
  "rainbow",
  "Rainbow Dash",
  "Rainbow Dash es una alma veloz! Le encanta la velocidad y por ello cuanto más rápdio alcanza sus metas mejor se siente. Para ella las cosas van de dos en dos, de tres en tres o cuatro en cuatro, la cuestión es agrupar!",
  "Para ayudar a Rainbow Dash tendrás que realizar multiplicaciones",
  undefined,
  0,
  5
);
const oPinkie = new Personaje (
  "pinkie",
  "Pinkie Pie",
  "¡¡ Pinkie Pie es el alma de la fiesta !! Tiene alegría y diversión para rato. Por ello le encanta repartir su jovialidad, su juerga, su música y su entusiasmo con todo el mundo. ¿Le ayudas a decidir que parte le toca a cada uno?",
  "Para ayudar a Pinkie Pie tendrás que realizar divisiones",
  undefined,
  1,
  7
);
const oTwilight = new Personaje (
  "twilight",
  "Twilight Sparkle",
  "Twily para las amigas, es una alicornio princesa. Como tal tiene muchas responsabilidades, pero pese a ello siempre busca la forma de ayudar a sus amigas. Así que ha tomado tareas de todas ellas y ha pensado en tí para ayudarle. ¿Le echas una pata?",
  "Para ayudar a Twilight tendrás que hacer operaciones matemáticas",
  undefined,
  0,
  10
);

let divPersonajes;

/* DATOS DEL JUGADOR */
const jugador = {
  nombre: "",
  exp_total: 0,  // total de puntos acumulados
  exp_actual: 0, // puntos actuales, canjeables por dinero real 
  nivel: 1       // nivel obtenido tras acumular puntos 
                 //  (se utiliza exp_total para calcularlo)
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
  // EXP_ACTUAL
  const expj = document.createElement("p");
  expj.classList.add("exp_jugador");
  expj.innerHTML = `${jugador.exp_actual} PE`;

  div.appendChild(nivj);
  div.appendChild(nomj);
  div.appendChild(expj);

  oHTMLParent.appendChild(div);
}

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
// PAGINA INICIO SI JUGADOR NO EXISTE AUN
function pagPedirNombreJugador(){
  divApp.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("flex-column-center");

  const htit = document.createElement("h2");
  htit.classList.add("text-center");
  htit.innerHTML = "¡¡ Bienvenid@ ayudante !!";

  const p1 = document.createElement("p");
  p1.innerHTML = "Oh! Vemos que todavía no conocemos tu nombre. Es importante para poder guardar la experiencia que acumules mientras ayudas a nuestras amigas.";
  p1.classList.add("big-text");
  p1.classList.add("text-center");

  const p2 = document.createElement("p");
  p2.innerHTML = "¡Vamos, anímate! Seguro que lo pasamos genial.";
  p2.classList.add("big-text");
  p2.classList.add("text-center");
  p2.classList.add("sombra_twilight");

  const input = document.createElement("input");
  input.classList.add("intro_nombre");
  input.setAttribute("placeholder","escribe tu nombre");
  input.setAttribute("id","nombre-jugador");

  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.classList.add(`btn-twilight`);
  btn.innerHTML = `¡ VAMOS ALLÁ !`;
  btn.addEventListener("click", crearJugadorNuevo);

  div.appendChild(htit);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(input);
  div.appendChild(btn);
  divApp.appendChild(div);
  
}
// PAGINA DE BIENVENIDA AL JUGADOR
function pagBienvenidaJugador(){
  divApp.innerHTML = "";

  let sombra = poderJugador();
  
  const div = document.createElement("div");

  const htit = document.createElement("h2");
  htit.classList.add("text-center");
  htit.innerHTML = `¡¡ Bienvenid@ <span class="sombra_${sombra}">${jugador.nombre}</span> !!`;

  const p1 = document.createElement("p");
  p1.innerHTML = "Menos mal que has vuelto. Tenemos un montón de trabajo y vamos a seguir necesitando tu ayuda. ¿Vamos a por ello?";
  p1.classList.add("big-text");
  p1.classList.add("text-center");

  const p2 = document.createElement("p");
  p2.innerHTML = `Ya has acumulado <span class="sombra_${sombra}">${jugador.exp_actual} puntos de experiencia</span>.`;
  p2.classList.add("big-text");
  p2.classList.add("text-center");
  const p3 = document.createElement("p");
  p3.innerHTML = `Estás en nivel <span class="sombra_${sombra}">${jugador.nivel}</span> ¿Seguimos?`;
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
}

// PAGINA PERSONAJE APPLEJACK (SUMAS)
function pagApplejack(){
  divApp.innerHTML = "";
  InsertJugadorInto(divApp);
  
}

//FUNCIÓN DE ENTRADA A LA APLICACIÓN
globalThis.addEventListener("load", ()=>{
  divApp = document.getElementById("App");
  cargarDatosJugador();
  if (jugador.nombre === null) pagPedirNombreJugador();
  else pagBienvenidaJugador();

})