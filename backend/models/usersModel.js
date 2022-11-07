import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    telephone: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zipCode: { type: Number, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    sacramentAdmin: { type: Boolean, required: true},
    financeAdmin: { type: Boolean, required: true},
    topAdmin: { type: Boolean, required: true},
    sacraments: [{ type: Schema.Types.ObjectId, ref: "Sacrament" }],
    finances: [{ type: Schema.Types.ObjectId, ref: "Finance" }],

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model("User", userSchema);

export default User;