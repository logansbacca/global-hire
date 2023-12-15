const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
var bcrypt = require ("bcrypt")


const UserSchema = new Schema ({
    userName: {
        type: String,
        required:[true, 'The username is required!'],
    },
    password:{
        type: String,
        required:[true ,'The password is required'],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "The email is required"],
    },
    admin: {
        type: Boolean,
        required: false,
        default: false,
    },
});


UserSchema.methods.generatePassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.pre("save", async function () {
    this.password = await this.generatePassword(this.password);
});

let User = mongoose.model("User", UserSchema);
module.exports = User;
