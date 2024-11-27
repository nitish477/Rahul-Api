import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
import validator from 'validator';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  phone: {
    type: String,
    required: [true, 'Please enter a phone number'],
    unique: true,
    validate: [validator.isMobilePhone, 'Please enter a valid phone number'],
  },
  height: {
    type: Number,
    required: [true, 'Please enter your height'],
  },
  weight: {
    type: Number,
    required: [true, 'Please enter your weight'],
  },
  goal: {
    type: String,
    required: [true, 'Please enter a fitness goal'],
  },
  password: {
    type: String,
    select: false, 
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.statics.createAdmin = async function() {
  const admin = await this.findOne({ isAdmin: true });

  if (admin) {
    throw new Error('Admin user already exists');
  }

  const newAdmin = await this.create({
    name: '',
    phone: '', 
    height: 0,                    
    weight: 0,
    goal: '',
    isAdmin: true,
  });

  return newAdmin;
};


const User = mongoose.model('User', userSchema);

export default User;
