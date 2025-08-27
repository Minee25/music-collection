const mongoose = require("mongoose");
const musicDB = require("../models/music.model");
const likeDB = require("../models/like.model");

exports.addLike = async (req, res) => {
  try {
    const { musicId } = req.params;

    if (!musicId || !mongoose.Types.ObjectId.isValid(musicId)) {
      return res.status(400).json({ error: "ไม่พบ ID เพลง" });
    }

    const music = await musicDB.findById(musicId);
    if (!music) {
      return res.status(404).json({ error: "ไม่พบเพลงที่ต้องการไลก์" });
    }

    await likeDB.findOneAndUpdate(
      { musicId: musicId },
      { $inc: { likeCount: 1 } },
      { new: true, upsert: true }
    );

    return res.json({ success: true, message: "เพิ่มไลก์เรียบร้อยแล้ว" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.unlike = async (req, res) => {
  try {
    const { musicId } = req.params;

    if (!musicId || !mongoose.Types.ObjectId.isValid(musicId)) {
      return res.status(400).json({ error: "ไม่พบ ID เพลง" });
    }

    const music = await musicDB.findById(musicId);
    if (!music) {
      return res.status(404).json({ error: "ไม่พบเพลงที่ต้องการยกเลิกไลก์" });
    }

    await likeDB.findOneAndUpdate(
      { musicId: musicId },
      { $inc: { likeCount: -1 } },
      { new: true, upsert: true }
    );

    return res.json({ success: true, message: "เพิ่มไลก์เรียบร้อยแล้ว" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}