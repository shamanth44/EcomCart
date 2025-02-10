const { mongoose, Schema } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: "https://res.cloudinary.com/shamanth-ganiger/image/upload/c_crop,w_1600,h_1600,ar_1:1/v1727552409/blank-profile-picture-973460_1920_kl51gc.png"
    },
},
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({
        _id: this.id,
        email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }

)
}

const User = mongoose.model('User', userSchema)



module.exports = { User }