import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  // Basic Info
  fullName: { type: String },
  email: { type: String},
  phone: { type: String},
  role: { type: String, enum: ["vendor", "supplier"]},

  // Business Details
  businessName: { type: String  },
  businessType: { type: String,   },
  businessAddress: { type: String,   },
  city: { type: String,   },
  state: { type: String,   },
  zipCode: { type: String,   },
  businessLicense: { type: String },
  taxId: { type: String },
  businessDescription: { type: String },

  // Account Setup
  username: { type: String, unique: true },
  accountType: { type: String,   },
  password: { type: String,   },

  // Preferences
  marketingEmails: { type: Boolean, default: false },
  termsAccepted: { type: Boolean,   }
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
