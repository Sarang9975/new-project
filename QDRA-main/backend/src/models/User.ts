import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string;
  points: number;
}

const UserSchema: Schema = new Schema({
  auth0Id: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
});

// Define the index with unique constraint
UserSchema.index({ auth0Id: 1 }, { unique: true, name: "auth0Id_1" });

const User = mongoose.model<IUser>('User', UserSchema);

// Drop existing index if exists and create new one
User.collection.dropIndex('auth0Id_1').then(() => {
  User.createIndexes()
    .then(() => {
      console.log('Indexes created successfully');
    })
    .catch(err => {
      console.error('Error creating indexes:', err);
    });
}).catch(err => {
  console.error('Error dropping index:', err);
});

export default User;
