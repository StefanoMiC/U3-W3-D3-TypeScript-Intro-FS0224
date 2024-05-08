// assicurarsi di aver installato typescript con npm i -g typescript
// controllare che si sia installato correttamente con il comando tsc -v
// se ritorna una versione allora siamo pronti per utilizzarlo con il comando: tsc [nomefile].ts

console.log("hello typescript");

let myVar = " Stefano " + 50;

// Type Inference (inferenza del tipo)
// TypeScript riconosce e assegna in automatico i tipi rispetto ad un valore iniziale
// Evitiamo di assegnare un tipo quando TypeScript potrebbe ricavarlo in automatico

// let myVar2: string = "Stefano"
// come in questo caso assegnare string come tipo è ridondante

let myNumber = 5; // type number
// myNumber = "5"; // non riassegnabile a stringa

// utilizzare any farà "spegnere" i controlli di TypeScript, di fatto quindi non lo staremo più usando
// non avremo più nessun controllo e nessun aiuto in anticipo per prevenzione errori

// let myNumber2: any = 5; // TODO: cambia questo any ASAP!
// myNumber2 = "5";
// MEGLIO EVITARE di usare any quando possibile!

let newVar: string; // in questo caso typescript non poteva sapere che tipo di dato sarebbe stato assegnato in futuro ad una
// variabile inizializzata senza valore
newVar = "Stefano";
// newVar = 50;

// const constantVar; // le costanti devono essere inizialzzate con un valore da subito, perché non potranno mai cambiare, non hanno occasione per farlo.

// TIPI PRIMITIVI

// string
// number
// boolean
// null
// undefined

// any - !!! DA NON USARE MAI SE POSSIBILE !!!
// never
// unknown
// void

// TIPI STRUTTURALI
// Array
// Object
// Function

console.log(myNumber.toString());
console.log(myVar.trim());
console.log(myVar.substring(1, 3));

// Funzioni

const sayHello = () => {
  return "hello typescript";
};

console.log(sayHello().slice(0, 1));

const addition = (n1, n2) => {
  return n1 + n2;
};

console.log(addition(5, 6));
console.log(addition("5", "6"));

const additionWithChecks = (n1, n2) => {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return n1 + n2;
  } else {
    return "Devi passare un numero, " + n1 + " e " + n2 + "non sono dei numeri";
  }
};
// in TypeScript è buona prassi andare a definire il tipo dei parametri e TS riuscirà a ricavare il valore in uscita in automatico il più delle volte

// se però volessimo essere assolutamente certi di avere un particolare tipo in uscita, allora potremmo specificarlo con : dopo la chiusura delle tonde dei parametri
const additionWithTypeScript = (n1: number, n2: number): string => {
  return (n1 + n2).toString();
};

console.log(additionWithTypeScript(5, 6));
// console.log(additionWithTypeScript("5", "6")); // typescript ci blocca l'esecuzione di questa funzione,
// perché gli argomenti non rispettano il tipo assegnato al parametro

// TYPE UNION
let whatever: string | boolean | undefined;

if (4 < 8) {
  whatever = "stefano";
} else if (5 < 10) {
  whatever = undefined;
} else {
  whatever = false;
}

// in questo caso lo capisce dal contesto che whatever sarà effettivamente una stringa quando cercheremo di utilizzare .slice()
if (typeof whatever === "string") {
  whatever.slice();
}

// attenzione a quando usiamo dei type union perché TS diventa molto stringente sui controlli e sulle operazioni che avremo disponibili
(whatever as string).slice();
// whatever.slice() // errore, bisogna specificare l'utilizzo che faremo di whatever

// noi sapevamo che whatever sarebbe stata una stringa perché il controllo 4 < 8 dava true, ma TS non è abbastanza intelligente per capirlo a priori
// quindi secondo TS la variabile whatever a riga 104 POTEVA anche essere false e quindi non avere slice disponibile tra i metodi
// abbiamo quindi forzato tramite un "type casting" (conversione del tipo) la variabile whatever,
// rassicurando TS che avremmo avuto sicuramente a che fare con una stringa in quel momento

// unknown Type
// il tipo unknown acquisisce il suo tipo in base al contesto di utilizzo

let maybe: unknown;

if (maybe === true) {
  const myBoolean: boolean = maybe; // maybe in quanto true può essere assegnato ad una variabile che accetti valori booleani
  // const anotherVar: number = maybe // errore perché se siamo qua maybe non può che avere valore true, quindi booleano
}

if (maybe === "qualsiasi stringa") {
  const myString: string = maybe;
}

// CUSTOM TYPE (o TYPE ALIAS) - è un contenitore di tipi composti
// vanno definiti in PascalCase

type StringOrNumber = string | number;

const mixedParams = (param1: StringOrNumber, param2: string | number) => {
  // return (param1 as number) + (param2 as number)

  if (typeof param1 === "number" && typeof param2 === "number") {
    return param1 + param2;
  } else if (typeof param1 === "string" && typeof param2 === "string") {
    return parseInt(param1) + parseInt(param2);
  }
};

mixedParams(2, 3);
mixedParams("2", "3");

// ARRAY in TS

const myArray = []; // non è utile creare un array in questo modo perché viene assegnato il tipo :never
// myArray.push(2) // anche perché non potremmo mai riempirlo con nessun tipo di dato
// però abbiamo bisogno spesso di inizializzare un array vuoto, quindi come fare?
// gli assegneremo il tipo in partenza

const myArrayInferred = ["uno", 2, "tre"];
const arrOfStrings: string[] = [];
arrOfStrings.push("Stefano", "Emanuele", "Carmen");
console.log(arrOfStrings);

arrOfStrings.forEach(s => s.toUpperCase());

const mixedArray: (string | boolean)[] = [];

mixedArray.push("Ciao");
mixedArray.push(true);
// mixedArray.push(5); // valore non ammesso per contenitore di tipo array di string | boolean

const mixedArray2: StringOrNumber[] = [];
// sostanzialmente la stessa cosa che scrivere
// const mixedArray2: (string | number)[] = []

// si può scrivere anche con questa sintassi, come se fosse un parametro passato ad un Array
// const mixedArray3: Array<StringOrNumber> = []

mixedArray2.push("HEllo");
mixedArray2.push(58);
mixedArray2.push(52.9);
// questi valori non saranno ammessi
// mixedArray2.push(undefined)
// mixedArray2.push(true)
// mixedArray2.push(null)

const mixedArray3: (string | undefined)[] = [];
mixedArray3.push("uno");
mixedArray3.push("due");
mixedArray3.push("tre");

// in questo caso essendo che la e potrebbe essere undefined typescript ci chiede di verificare l'esistenza di e prima di poter leggere la sua length
mixedArray3.forEach(e => e?.length);

// TUPLE
const myTuple: [number, string] = [0, ""];
const myTupleOfThree: [number, boolean, string] = [450, true, ""];

// avendo assegnato un tipo per posizione specifica,
// nell'utilizzare il dato contenuto in quella certa posizione mi farà dare come suggerimento i metodi adeguati
myTuple[0].toFixed(1);
myTuple[1].length;

myTupleOfThree[1].valueOf();

// FUNCTION TYPE

// la definizione del tipo funzione assomiglia alla definizione di una funzione freccia,
// ma viene impostato come valore di tipo ad una variabile inizialmente vuota che riceverà un valore in futuro
let newFunc: (x: number, y: number) => string;

// questo valore, quando assegnato, dovrà rispettare esattamente le caratteristiche delineate nella definizione del tipo sulla variabile
newFunc = additionWithTypeScript;

// OGGETTI in TS
type Person = {
  name: string;
  surname: string;
  role: string;
  active: boolean;
  yearsOfExp: number;
};

type RemoteTeacher = {
  isRemote?: boolean;
  isLiveNow?: boolean;
  country: string;
};

const person: Person = {
  name: "Stefano",
  surname: "Miceli",
  role: "Teacher",
  active: true,
  yearsOfExp: 5
};
// il tipo oggetto è stato inferito automaticamente

person.yearsOfExp.toString();

// abbiamo fatto l'unione di due Type Alias o Custom Type, così da non ridefinire necessariamente il primo Type,
// lasciando quindi libero il primo oggetto di non avere quelle 3 proprietà aggiuntive
const person2: Person & RemoteTeacher = {
  name: "Riccardo",
  surname: "Gulin",
  role: "Teacher",
  active: true,
  yearsOfExp: 5,
  isRemote: true,
  isLiveNow: true,
  country: "Italy"
};

// INTERFACES
interface HumanBeing {
  name: string;
  numberOfEyes: number;
  numberOfLimbs?: number;
  height: number | string;
  hairColor: string;
}

interface EpicodeStudent extends HumanBeing {
  hasWebcam: boolean;
  batch: string;
  preferredTopic?: "HTML" | "CSS" | "JS" | "React" | "Redux" | "TypeScript";
}

const student1: EpicodeStudent = {
  name: "Alessio",
  numberOfEyes: 2,
  height: "190cm",
  hairColor: "brown",
  hasWebcam: true,
  batch: "FS0224",
  preferredTopic: "JS"
};

const student2: EpicodeStudent = {
  name: "Luca",
  numberOfEyes: 2,
  height: "180cm",
  hairColor: "light brown",
  hasWebcam: false,
  batch: "FS0224",
  preferredTopic: "CSS"
};

const student3: EpicodeStudent = {
  name: "Tiziano",
  numberOfEyes: 2,
  height: "175cm",
  hairColor: "brown-yellow",
  hasWebcam: false,
  batch: "FS0224",
  preferredTopic: "React"
};

// abbiamo specificato il tipo dell'array usando l'interfaccia
const arrOfStudents: EpicodeStudent[] = [student1, student2, student3];

// sintassi equivalente per assegnare EpicodeStudent come tipo dell'array
// const arrOfStudents: Array<EpicodeStudent> = [student1, student2, student3];

arrOfStudents.forEach(student => console.log(student.hairColor));

const arrOfStudName: string[] = arrOfStudents.map(student => student.name);

// GENERICS
// un generic è un "parametro di tipo" per un'interfaccia

// utilizzare un generic in un'interfaccia mi permette di non forzare una serie di tipi in partenza,
// ma di ammettere un qualsiasi tipo per una o più proprietà del mio oggetto
// il tipo verrà specificato al momento dell'assegnazione dell'interfaccia (vedi creazione degli oggetti di seguito)
interface EpicodeUnit<T> {
  name: string;
  assignedTeacher: string | string[];
  //   topic: string | string[] | Topic[];
  topic: T;
}

interface Topic {
  weeklyTopics: string[];
}

const U1: EpicodeUnit<string> = {
  name: "Unit1",
  assignedTeacher: ["Stefano Casasola", "Stefano Miceli"],
  //   topic: ["HTML", "JS1", "JS2"]
  topic: "HTML"
};

const U2: EpicodeUnit<string[]> = {
  name: "Unit2",
  assignedTeacher: "Stefano Miceli",
  topic: ["UX", "Bootstrap", "SASS", "JS3"]
};

const U3: EpicodeUnit<Topic[]> = {
  name: "Unit3",
  assignedTeacher: "Stefano Miceli",
  topic: [
    { weeklyTopics: ["React Intro", "State", "Props"] },
    { weeklyTopics: ["React 2", "Lifecycle Methods", "Router", "React Testing"] },
    { weeklyTopics: ["Redux", "TypeScript"] }
  ]
};
