export class UsersDTO {
    constructor(user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
    }
}