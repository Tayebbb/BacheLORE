import mongoose from 'mongoose';

const MarketplaceListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  contact: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  buyerEmail: { type: String },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
});

const MarketplaceListing = mongoose.models.MarketplaceListing || mongoose.model('MarketplaceListing', MarketplaceListingSchema);

export default MarketplaceListing;
