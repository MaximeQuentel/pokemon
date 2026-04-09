class Attack {
    static all_attacks = {};

    constructor (id, nom, type, puissance, duree){
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.puissance = puissance;
        this.duree = duree;
    }
    toString() { 
        return `${this.nom} : #${this.id}, ${this.type}, ${this.puissance}, ${this.duree}ms`;
    }
}
function fill_attacks(){
    Attack.all_attacks = {};
    const allMoves = [...fast_moves, ...charged_moves];
    for (const move of allMoves) {
        const atk = new Attack(move.move_id, move.name, move.type, move.power, move.duration);
        Attack.all_attacks[move.move_id] = atk;
    }
}


fill_attacks();