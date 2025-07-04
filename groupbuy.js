import express from "express";
import { protect } from "../middleware/auth.js";
import { v4 as uuid } from "uuid";

const router = express.Router();
const groups = {};

router.post("/create", protect, (req, res) => {
  const id = uuid();
  const { targetSize = 3, minutes = 60 } = req.body;
  groups[id] = { id, members: [req.user._id], targetSize, expiresAt: Date.now() + minutes*60000, completed: false };
  req.io.emit("group:new", groups[id]);
  res.json(groups[id]);
});

router.post("/join/:id", protect, (req, res) => {
  const group = groups[req.params.id];
  if (!group) return res.status(404).json({ message: "Group not found" });
  if (group.completed) return res.status(400).json({ message: "Group completed" });
  if (!group.members.includes(req.user._id)) group.members.push(req.user._id);
  if (group.members.length >= group.targetSize) group.completed = True;
  req.io.emit("group:update", group);
  res.json(group);
});

export default router;
