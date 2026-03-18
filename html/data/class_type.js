class Type {
    constructor(name, effectiveness) {
        this.name = name;
        this.effectiveness = effectiveness;
    }

    toString() {
        const groupe = {};

        for (const [defenderType, rate] of Object.entries(this.effectiveness)) {
            if (!groupe[rate]) groupe[rate] = [];
            groupe[rate].push(defenderType);
        }

        const text = Object.entries(groupe)
            .map(([rate, defenderTypes]) => `${rate} = [${defenderTypes.join(', ')}]`)
            .join(', ');

        return `${this.name} : ${text}`;
    }
}

Type.all_types = {};

function fill_types() {
    Type.all_types = {};
    for (const [name, effectiveness] of Object.entries(type_effectiveness)) {
        Type.all_types[name] = new Type(name, effectiveness);
    }
}

fill_types();
