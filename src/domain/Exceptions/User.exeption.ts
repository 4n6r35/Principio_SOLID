export class UserDuplicateValues extends Error {
    constructor(msg = 'Algunos de los valores ya se encuentrn registros el la base de datos') {
        super(msg);
        this.name = UserDuplicateValues.name;
    }
}