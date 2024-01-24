const str: string = "HELLO"
const num: number = 5
const empty: null = null
const unkn: undefined = undefined
const bool: boolean = false
const arr: [] = []
const obj: {} = {}
const a: "TS" = "TS"

const strArr: string[] = ["hello", "world"]
const strAndNumArr: (string | number)[] = ["hello", 5]
const strAndNumArrClass: Array<string | number> = ["hello", 5]

const person: {
    name: string;
    age: number;
    language?: "JS" | "TS"
} = {
    name: "Aidar",
    age: 21
}

function declarationFn(a: number, b: number): number {
    return a + b
}

declarationFn(5, 10)

const arrowFn = (a: number, b: number): number => {
    return a + b
}

type TPersonName = string
type TPersonAge = number
type TPersonId = string
enum EPersonLanguages {
    JS = "JS",
    TS = "TS"
}

// type TPerson = {
//     name: TPersonName;
//     age: TPersonAge;
//     id: TPersonId
//     language?: EPersonLanguages;
//     sayHi: (text: string) => void
// }

// const aidar: TPerson = {
//     name: "Aidar",
//     age: 21,
//     language: EPersonLanguages.TS,
//     id: "sgo43t9dsfon",
//     sayHi: function(text) {
//         console.log(`Hi ${this.name}`)
//     }
// }

interface IPerson {
    name: TPersonName;
    age: TPersonAge;
}

interface IDeveloper extends IPerson {
    language: EPersonLanguages
}

type TPerson = {
    name: TPersonName;
    age: TPersonAge;
}

type TDeveloper = {
    language: EPersonLanguages
}

const developer: TPerson & TDeveloper = {
    name: 'Aidar',
    age: 21,
    language: EPersonLanguages.TS
}

//* <> это ЖНЕРИКИ

const obj1 : Record < string, number | string > = {
    name : "LOL",
    age : 1000
}

interface IPersonWithoutAge extends Pick < IPerson, "name" > {}
interface IPersonOnlyAge extends Omit < IPerson, "name" > {}

const obj2 : IPersonWithoutAge = {
    name : "Amir"
}

const obj3 : IPersonOnlyAge = {
    age : 1000
}

const get = < T extends string >( arg : T ): T => {return arg}

const result = get("5")

export {}