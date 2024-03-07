class User {
    #name = 2;
    constructor(name, email, password) {
        this.img = 0;
        this.name = name;
        this.email = email;
        this.password = password;
        this.favourites = [];
    }

    save() {
        console.log(JSON.stringify(this));
        return JSON.stringify(this);
    }
}