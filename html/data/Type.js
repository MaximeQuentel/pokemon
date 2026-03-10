class Type {
    constructor(name, effectiveness) {
        this.name = name;
        this.effectiveness = effectiveness;
    }

    toString() {
        const grouped = {};
        for (const [type, value] of Object.entries(this.effectiveness)) {
            if (!grouped[value]) grouped[value] = [];
            grouped[value].push(type);
        }
        const parts = Object.keys(grouped)
            .sort((a, b) => b - a)
            .map(value => `${value} = [${grouped[value].join(', ')}]`);
        return `${this.name} : ${parts.join(', ')}`;
    }
}

Type.all_types = {};
for (const [name, effectiveness] of Object.entries(type_effectiveness)) {
    Type.all_types[name] = new Type(name, effectiveness);
}
