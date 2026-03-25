class Type {
    constructor(name, effectiveness) {
        this.name = name;
        this.effectiveness = effectiveness;
    }

    prepa_dico() {
        let dico = {};

        let tablo_def = type_effectiveness[this.name];

        for (let type in tablo_def) {

            let coeff = tablo_def[type];

            if (!(coeff in dico)) {
                dico[coeff] = [];
            }
            dico[coeff].push(type);
        }

        return dico;
    }

    toString() {
        return `${this.name} : ${JSON.stringify(this.prepa_dico())}`;
    }
}

Type.all_types = {};

function fill_types() {
    Type.all_types = {};
    for (let [name, effectiveness] of Object.entries(type_effectiveness)) {
        Type.all_types[name] = new Type(name, effectiveness);
    }
}

fill_types();
