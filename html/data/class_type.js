class Type {

    static all_types = {};

    constructor(name, effectiveness){
        this.name = name;
        this.effectiveness = effectiveness;
    }

    getEffectivenessAgainst(defenderTypeName) {
        return this.effectiveness[defenderTypeName] ?? 1.0;
    }

    
    groupByCoeff() {
        const dico = {};
        for (const [typeName, coeff] of Object.entries(this.effectiveness)) {
            if (!(coeff in dico)) dico[coeff] = [];
            dico[coeff].push(typeName);
        }
        return dico;
    }

    
    toString() {
        const dico = this.groupByCoeff();

        const parts = Object.entries(dico).sort(([a], [b]) => b - a).map(([coeff, types]) => `${coeff} = [${types.join(', ')}]`); //jsp si c ok
        return `${this.name} : ${parts.join(', ')}`;
    }
}



function fill_types() {
    Type.all_types = {};
    for (const [name, effectiveness] of Object.entries(type_effectiveness)) {
        Type.all_types[name] = new Type(name, effectiveness);
    }
}
fill_types();