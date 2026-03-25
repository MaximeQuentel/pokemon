class Attack {
    static all_attacks = {};

    constructor (id, nom, type, puissance, duree) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.puissance = puissance;
        this.duree = duree;
    }
    toString() { return `${this.nom} : ${this.id}), ${this.type}, ${this.puissance}, ${this.duree}ms` }

    static fill_attacks() {
        this.all_attacks = {};

        charged_moves.forEach(move => {
            const attack = new Attack(move.move_id, move.name, move.type, move.power, move.duration);
            this.all_attacks[move.move_id] = attack;
        });
        fast_moves.forEach(move => {
            const attack = new Attack(move.move_id, move.name, move.type, move.power, move.duration); 
            this.all_attacks[move.move_id] = attack;
        });
    }
}