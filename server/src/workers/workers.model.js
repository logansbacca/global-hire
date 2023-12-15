const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const WorkerSchema = new Schema ({
    firstName:{
        type: String,
        required: [true, 'your name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'your surname is required'],
    },
    email:{
        type: String,
        required: [true, 'the email is required'],
    },
    profession: {
        type: String,
        required:[true, 'profession required'],
    },
    user: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
        required:false,
    },

    linkedin: {
        type: String,
        required:false,
    },
    icon: {
        type: String,
        required:[true, 'icon required']
    }
});

let Worker = mongoose.model("Worker", WorkerSchema, 'workers')

module.exports = Worker;
 
