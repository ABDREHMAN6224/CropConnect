import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
    status: {
        type: String,
        required: true,
        default: "active",
        enum: ["active", "inactive"],
    }
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})



const User = mongoose.model("User", userSchema);

export default User;