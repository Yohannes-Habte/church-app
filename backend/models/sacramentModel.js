import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const sacramentSchema = new Schema({
   baptism: { type: String, required: true },
   firstCommunion: { type: String, required: true },
    confirmation: { type: String, required: true },
    covenant: { type: String, required: true },
    other: { type: String, required: true },
    sacramentDate: { type: Date, required: true, unique: true },
}, { timestamps: true });

const Sacrament = mongoose.model("Sacrament", sacramentSchema);

export default Sacrament;