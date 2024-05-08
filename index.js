// assicurarsi di aver installato typescript con npm i -g typescript
// controllare che si sia installato correttamente con il comando tsc -v
// se ritorna una versione allora siamo pronti per utilizzarlo con il comando: tsc [nomefile].ts
console.log("hello typescript");
var myVar = " Stefano " + 50;
// Type Inference (inferenza del tipo)
// TypeScript riconosce e assegna in automatico i tipi rispetto ad un valore iniziale
// Evitiamo di assegnare un tipo quando TypeScript potrebbe ricavarlo in automatico
// let myVar2: string = "Stefano"
// come in questo caso assegnare string come tipo è ridondante
var myNumber = 5; // type number
// myNumber = "5"; // non riassegnabile a stringa
// utilizzare any farà "spegnere" i controlli di TypeScript, di fatto quindi non lo staremo più usando
// non avremo più nessun controllo e nessun aiuto in anticipo per prevenzione errori
// let myNumber2: any = 5; // TODO: cambia questo any ASAP!
// myNumber2 = "5";
// MEGLIO EVITARE di usare any quando possibile!
var newVar; // in questo caso typescript non poteva sapere che tipo di dato sarebbe stato assegnato in futuro ad una
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
var sayHello = function () {
    return "hello typescript";
};
console.log(sayHello().slice(0, 1));
var addition = function (n1, n2) {
    return n1 + n2;
};
console.log(addition(5, 6));
console.log(addition("5", "6"));
var additionWithChecks = function (n1, n2) {
    if (typeof n1 === "number" && typeof n2 === "number") {
        return n1 + n2;
    }
    else {
        return "Devi passare un numero, " + n1 + " e " + n2 + "non sono dei numeri";
    }
};
// in TypeScript è buona prassi andare a definire il tipo dei parametri e TS riuscirà a ricavare il valore in uscita in automatico il più delle volte
// se però volessimo essere assolutamente certi di avere un particolare tipo in uscita, allora potremmo specificarlo con : dopo la chiusura delle tonde dei parametri
var additionWithTypeScript = function (n1, n2) {
    return (n1 + n2).toString();
};
console.log(additionWithTypeScript(5, 6));
// console.log(additionWithTypeScript("5", "6")); // typescript ci blocca l'esecuzione di questa funzione,
// perché gli argomenti non rispettano il tipo assegnato al parametro
// TYPE UNION
var whatever;
if (4 < 8) {
    whatever = "stefano";
}
else if (5 < 10) {
    whatever = undefined;
}
else {
    whatever = false;
}
// in questo caso lo capisce dal contesto che whatever sarà effettivamente una stringa quando cercheremo di utilizzare .slice()
if (typeof whatever === "string") {
    whatever.slice();
}
// attenzione a quando usiamo dei type union perché TS diventa molto stringente sui controlli e sulle operazioni che avremo disponibili
whatever.slice();
// whatever.slice() // errore, bisogna specificare l'utilizzo che faremo di whatever
// noi sapevamo che whatever sarebbe stata una stringa perché il controllo 4 < 8 dava true, ma TS non è abbastanza intelligente per capirlo a priori
// quindi secondo TS la variabile whatever a riga 104 POTEVA anche essere false e quindi non avere slice disponibile tra i metodi
// abbiamo quindi forzato tramite un "type casting" (conversione del tipo) la variabile whatever,
// rassicurando TS che avremmo avuto sicuramente a che fare con una stringa in quel momento
// unknown Type
// il tipo unknown acquisisce il suo tipo in base al contesto di utilizzo
var maybe;
if (maybe === true) {
    var myBoolean = maybe; // maybe in quanto true può essere assegnato ad una variabile che accetti valori booleani
    // const anotherVar: number = maybe // errore perché se siamo qua maybe non può che avere valore true, quindi booleano
}
if (maybe === "qualsiasi stringa") {
    var myString = maybe;
}
var mixedParams = function (param1, param2) {
    // return (param1 as number) + (param2 as number)
    if (typeof param1 === "number" && typeof param2 === "number") {
        return param1 + param2;
    }
    else if (typeof param1 === "string" && typeof param2 === "string") {
        return parseInt(param1) + parseInt(param2);
    }
};
mixedParams(2, 3);
mixedParams("2", "3");
// ARRAY in TS
var myArray = []; // non è utile creare un array in questo modo perché viene assegnato il tipo :never
// myArray.push(2) // anche perché non potremmo mai riempirlo con nessun tipo di dato
// però abbiamo bisogno spesso di inizializzare un array vuoto, quindi come fare?
// gli assegneremo il tipo in partenza
var myArrayInferred = ["uno", 2, "tre"];
var arrOfStrings = [];
arrOfStrings.push("Stefano", "Emanuele", "Carmen");
console.log(arrOfStrings);
arrOfStrings.forEach(function (s) { return s.toUpperCase(); });
var mixedArray = [];
mixedArray.push("Ciao");
mixedArray.push(true);
// mixedArray.push(5); // valore non ammesso per contenitore di tipo array di string | boolean
var mixedArray2 = [];
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
var mixedArray3 = [];
mixedArray3.push("uno");
mixedArray3.push("due");
mixedArray3.push("tre");
// in questo caso essendo che la e potrebbe essere undefined typescript ci chiede di verificare l'esistenza di e prima di poter leggere la sua length
mixedArray3.forEach(function (e) { return e === null || e === void 0 ? void 0 : e.length; });
// TUPLE
var myTuple = [0, ""];
var myTupleOfThree = [450, true, ""];
// avendo assegnato un tipo per posizione specifica,
// nell'utilizzare il dato contenuto in quella certa posizione mi farà dare come suggerimento i metodi adeguati
myTuple[0].toFixed(1);
myTuple[1].length;
myTupleOfThree[1].valueOf();
// FUNCTION TYPE
// la definizione del tipo funzione assomiglia alla definizione di una funzione freccia,
// ma viene impostato come valore di tipo ad una variabile inizialmente vuota che riceverà un valore in futuro
var newFunc;
// questo valore, quando assegnato, dovrà rispettare esattamente le caratteristiche delineate nella definizione del tipo sulla variabile
newFunc = additionWithTypeScript;
var person = {
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
var person2 = {
    name: "Riccardo",
    surname: "Gulin",
    role: "Teacher",
    active: true,
    yearsOfExp: 5,
    isRemote: true,
    isLiveNow: true,
    country: "Italy"
};
var student1 = {
    name: "Alessio",
    numberOfEyes: 2,
    height: "190cm",
    hairColor: "brown",
    hasWebcam: true,
    batch: "FS0224",
    preferredTopic: "JS"
};
var student2 = {
    name: "Luca",
    numberOfEyes: 2,
    height: "180cm",
    hairColor: "light brown",
    hasWebcam: false,
    batch: "FS0224",
    preferredTopic: "CSS"
};
var student3 = {
    name: "Tiziano",
    numberOfEyes: 2,
    height: "175cm",
    hairColor: "brown-yellow",
    hasWebcam: false,
    batch: "FS0224",
    preferredTopic: "React"
};
// abbiamo specificato il tipo dell'array usando l'interfaccia
var arrOfStudents = [student1, student2, student3];
// sintassi equivalente per assegnare EpicodeStudent come tipo dell'array
// const arrOfStudents: Array<EpicodeStudent> = [student1, student2, student3];
arrOfStudents.forEach(function (student) { return console.log(student.hairColor); });
var arrOfStudName = arrOfStudents.map(function (student) { return student.name; });
var U1 = {
    name: "Unit1",
    assignedTeacher: ["Stefano Casasola", "Stefano Miceli"],
    //   topic: ["HTML", "JS1", "JS2"]
    topic: "HTML"
};
var U2 = {
    name: "Unit2",
    assignedTeacher: "Stefano Miceli",
    topic: ["UX", "Bootstrap", "SASS", "JS3"]
};
var U3 = {
    name: "Unit3",
    assignedTeacher: "Stefano Miceli",
    topic: [
        { weeklyTopics: ["React Intro", "State", "Props"] },
        { weeklyTopics: ["React 2", "Lifecycle Methods", "Router", "React Testing"] },
        { weeklyTopics: ["Redux", "TypeScript"] }
    ]
};
