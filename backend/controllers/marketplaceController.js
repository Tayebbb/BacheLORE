import MarketplaceListing from '../models/MarketplaceListing.js';

// Get all listings (optionally filter by status)
export const getListings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const listings = await MarketplaceListing.find(filter).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Post a new listing
export const createListing = async (req, res) => {
  try {
    const { title, description, price, image, contact, sellerEmail } = req.body;
    if (!title || !description || !price || !contact || !sellerEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const listing = new MarketplaceListing({ title, description, price, image, contact, sellerEmail });
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark as sold (buy)
export const buyListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { buyerEmail } = req.body;
    if (!buyerEmail) return res.status(400).json({ error: 'buyerEmail required' });
    const listing = await MarketplaceListing.findById(id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    if (listing.status === 'sold') return res.status(400).json({ error: 'Already sold' });
    listing.status = 'sold';
    listing.buyerEmail = buyerEmail;
    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
