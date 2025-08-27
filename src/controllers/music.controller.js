const musicDB = require("../models/music.model");
const commentDB = require("../models/comment.model");
const likeDB = require("../models/like.model");
const mongoose = require("mongoose");

exports.home = async (req, res) => {
  const locals = {
    title: "Music Collection"
  }

  try {
    const musicList = await musicDB.find({}).sort({ createdAt: -1 });

    // แยก YouTube ID จาก URL
    const processedMusicList = musicList.map(music => {
      let youtubeId = music.youtube_link;
      if (youtubeId) {
        if (youtubeId.includes('youtu.be/')) {
          // https://youtu.be/xxxXXXxxx
          youtubeId = youtubeId.split('youtu.be/')[1];
        } else if (youtubeId.includes('youtube.com/watch?v=')) {
          // https://www.youtube.com/watch?v=xxxXXXxxx
          youtubeId = youtubeId.split('v=')[1];
        } else if (youtubeId.includes('youtube.com/embed/')) {
          // https://www.youtube.com/embed/xxxXXXxxx
          youtubeId = youtubeId.split('embed/')[1];
        }

        // ลบ query parameters และ extra characters
        if (youtubeId) {
          youtubeId = youtubeId.split("?")[0].split("&")[0];
        }

        // เพิ่ม youtube_id เข้าไปใน music object
        music.youtube_id = youtubeId;
      }

      return music;
    });

    locals.musicList = processedMusicList;
    res.render("home", locals);
  } catch (err) {
    console.error(err.message);
    locals.musicList = [];
    res.status(500).send("Internal Server Error");
  }
}

exports.musicPlayer = async (req, res) => {
  const locals = {
    title: "Music"
  }

  try {
    const id = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "รูปแบบ ID ไม่ถูกต้อง");
      return res.redirect("/");
    }

    const music = await musicDB.findById(id).lean();
    if (!music) {
      locals.music = null;
      return res.render("musicPlayer", locals);
    }

    // แยก YouTube ID จาก URL
    let youtubeId = music.youtube_link || "";
    if (youtubeId.includes("youtu.be/")) {
      youtubeId = youtubeId.split("youtu.be/")[1];
    } else if (youtubeId.includes("watch?v=")) {
      youtubeId = youtubeId.split("v=")[1];
    } else if (youtubeId.includes("embed/")) {
      youtubeId = youtubeId.split("embed/")[1];
    }

    // ตัด query string ส่วนเกินออก
    youtubeId = youtubeId.split("?")[0].split("&")[0];

    const comments = await commentDB.find({ musicId: music._id }).sort({ createdAt: -1 }).lean();
    const likeCount = await likeDB.findOne({ musicId: music._id });

    locals.youtube_id = youtubeId;
    locals.music = music;
    locals.title = music.title || "Music";
    locals.comments = comments;
    locals.likeCount = likeCount;

    res.render("musicPlayer", locals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
}
