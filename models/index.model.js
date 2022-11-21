import mongoose from 'mongoose';

const indexSchema = mongoose.Schema({

}, { timestamps: true });

const Index = mongoose.model('Index', indexSchema);

export default Index;
