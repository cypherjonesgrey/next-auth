import { Module } from 'module';
import {Schema,model,models} from 'mongoose';

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,

})

const Users = models.user || model('User', userSchema);

module.exports = Users;