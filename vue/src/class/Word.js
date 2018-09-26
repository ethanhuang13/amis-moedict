function ArrayParseFactory (classDef, data) {
    const output = [];
    for (let i = 0; i < data.length; i++) {
        let def = data[i];
        output.push(new classDef(def))
    }
    return output;
}

class Definition {
    constructor(data) {
        this.exampleStatements = ArrayParseFactory(SampleStatement, data.e ? data.e:[])
        this.meaning = data.f
    }
}

class SampleStatement {
    constructor(data) {
        const originalAmitWordArray = data.match(/`[\w|']*~/g)
        const afterExtractAmitWords = data.replace(/`[\w|']*~/g, '$')
        const amitString = afterExtractAmitWords.replace(/[^($1| .!?,)]/g, '')
        let amitWordsArray = amitString.match(/[$1| \w!?,]/g)
        amitWordsArray.forEach((word, index)=>{
            if(word === '$') 
            {
                amitWordsArray.splice(
                    index, 
                    1, 
                    originalAmitWordArray.shift().replace(/[`~]/g, '')
                )
            }
        })

        this.amitWordsArray = amitWordsArray;
        this.chinese = afterExtractAmitWords.replace(/[$1| .!?,]/g, '')
        
    }
}

export default class Word {
    constructor(data) {
        this.definitions = ArrayParseFactory(Definition, data.h[0].d)
        this.stem = data.stem;
        this.tag = data.tag || '';
        this.word = data.t;
    }
}