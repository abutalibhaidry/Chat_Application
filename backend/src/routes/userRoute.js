import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controllers/userController.js";

const router = express.Router()

// APPLY AUTH MIDDLEWARE TO ALL ROUTES
router.use(protectRoute)

router.get("/", getRecommendedUsers)
router.get("/friends", getMyFriends)

// WE CAN SEND A FRIEND REQUEST
router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)

router.get("/friend-requests", getFriendRequests)
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)

export default router;