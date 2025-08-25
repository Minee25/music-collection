const musicDB = require("../models/music.model");
const commentDB = require("../models/comment.model");

exports.createComment = async (req, res) => {
  try {
    const { musicId } = req.params;
    const { content } = req.body;

    if (!musicId) {
      return res.status(400).json({ error: "ไม่พบ ID เพลง" });
    }

    const music = await musicDB.findById(musicId).lean();
    if (!music) {
      return res.status(404).json({ error: "ไม่พบเพลงที่ต้องการคอมเมนต์" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "กรุณากรอกความคิดเห็น" });
    }

    await commentDB.create({
      content: content.trim(),
      musicId: music._id
    });

    return res.json({ success: true, message: "เพิ่มความคิดเห็นเรียบร้อยแล้ว" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}