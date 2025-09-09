

import BookedMaid from '../models/BookedMaid.js';
import BookedTuition from '../models/BookedTuition.js';
import AppliedMaid from '../models/AppliedMaid.js';
import AppliedTuition from '../models/AppliedTuition.js';
import RoommateListing from '../models/RoommateListing.js';
import HouseRentListing from '../models/HouseRentListing.js';
import Tuition from '../models/Tuition.js';
import Maid from '../models/Maid.js';


// GET /api/activity/:userEmail
export const getUserActivity = async (req, res) => {
	const { userEmail } = req.params;
	if (!userEmail) return res.status(400).json({ error: 'userEmail required' });
	try {
		// Booked Maids
		const bookedMaids = await BookedMaid.find({ applicantEmail: userEmail }).sort({ bookedAt: -1 }).limit(5);
		// Booked Tuitions
		const bookedTuitions = await BookedTuition.find({ applicantEmail: userEmail }).sort({ bookedAt: -1 }).limit(5);

		// Applied Maids (populate maid details)
		const appliedMaidsRaw = await AppliedMaid.find({ email: userEmail }).sort({ createdAt: -1 }).limit(5);
		const appliedMaids = await Promise.all(appliedMaidsRaw.map(async (app) => {
			let maid = null;
			try { maid = await Maid.findById(app.maidId); } catch {}
			return {
				...app.toObject(),
				listingName: maid ? maid.name : app.name,
				hourlyRate: maid ? maid.hourlyRate : undefined,
				location: maid ? maid.location : undefined,
				description: maid ? maid.description : undefined,
				status: 'applied',
			};
		}));

		// Applied Tuitions (populate tuition details)
		const appliedTuitionsRaw = await AppliedTuition.find({ email: userEmail }).sort({ createdAt: -1 }).limit(5);
		const appliedTuitions = await Promise.all(appliedTuitionsRaw.map(async (app) => {
			let tuition = null;
			try { tuition = await Tuition.findById(app.tuitionId); } catch {}
			return {
				...app.toObject(),
				listingTitle: tuition ? tuition.title : app.name,
				subject: tuition ? tuition.subject : undefined,
				days: tuition ? tuition.days : undefined,
				salary: tuition ? tuition.salary : undefined,
				location: tuition ? tuition.location : undefined,
				description: tuition ? tuition.description : undefined,
				contact: tuition ? tuition.contact : undefined,
				status: 'applied',
			};
		}));

		// Roommate Listings
		const roommateListings = await RoommateListing.find({ email: userEmail }).sort({ createdAt: -1 }).limit(5);
		// House Rent Listings
		const houseRentListings = await HouseRentListing.find({ contact: userEmail }).sort({ createdAt: -1 }).limit(5);

		// Add status to booked items
		const bookedMaidsWithStatus = bookedMaids.map(b => ({ ...b.toObject(), status: 'booked' }));
		const bookedTuitionsWithStatus = bookedTuitions.map(b => ({ ...b.toObject(), status: 'booked' }));

		res.json({
			bookedMaids: bookedMaidsWithStatus,
			bookedTuitions: bookedTuitionsWithStatus,
			appliedMaids,
			appliedTuitions,
			roommateListings,
			houseRentListings,
		});
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch activity', details: err.message });
	}
};
