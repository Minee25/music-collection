const musicDB = require("../models/music.model");

exports.musicList = async (req, res) => {
  const locals = {
    title: "Music list",
  }

  try {
    // Fetch all music from database
    const musicList = await musicDB.find({}).sort({ createdAt: -1 });

    res.render("./admin/musicList", {
      ...locals,
      musicList: musicList || []
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
}

exports.addMusic = async (req, res) => {
  const locals = {
    title: "Add Music"
  }

  try {
    res.render("./admin/addMusic", locals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
}

exports.addMusicPost = async (req, res) => {
  try {
    const { title, artist, youtube_link, description } = req.body;

    if (!title) {
      return res.status(400).send("Missing required title fields.");
    }
    if (!artist) {
      return res.status(400).send("Missing required artist fields.");
    }
    if (!youtube_link) {
      return res.status(400).send("Missing required youtube link fields.");
    }

    await musicDB.create({ title, artist, youtube_link, description });

    res.redirect("/admin/music-list");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
}

exports.deleteMusic = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      req.flash("error", "ไม่พบ ID เพลง");
      return res.redirect("/admin/music-list");
    }

    // Delete music from database
    await musicDB.findByIdAndDelete(id);

    req.flash("success", "ลบเพลงสำเร็จ");
    res.redirect("/admin/music-list");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "เกิดข้อผิดพลาดในการลบเพลง");
    res.redirect("/admin/music-list");
  }
}

exports.editMusic = async (req, res) => {
  const locals = {
    title: "Edit Music"
  }

  try {
    const { id } = req.params;

    if (!id) {
      req.flash("error", "ไม่พบ ID เพลง");
      return res.redirect("/admin/music-list");
    }

    // Fetch music by ID
    const music = await musicDB.findById(id);

    if (!music) {
      req.flash("error", "ไม่พบเพลงที่ต้องการแก้ไข");
      return res.redirect("/admin/music-list");
    }

    res.render("./admin/editMusic", {
      ...locals,
      music: music
    });
  } catch (err) {
    console.error(err.message);
    req.flash("error", "เกิดข้อผิดพลาดในการโหลดข้อมูลเพลง");
    res.redirect("/admin/music-list");
  }
}

exports.editMusicPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, youtube_link, description } = req.body;

    if (!id) {
      req.flash("error", "ไม่พบ ID เพลง");
      return res.redirect("/admin/music-list");
    }

    if (!title || !artist || !youtube_link) {
      req.flash("error", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return res.redirect(`/admin/edit-music/${id}`);
    }

    // Update music in database
    await musicDB.findByIdAndUpdate(id, {
      title,
      artist,
      youtube_link,
      description
    });

    req.flash("success", "แก้ไขเพลงสำเร็จ");
    res.redirect("/admin/music-list");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "เกิดข้อผิดพลาดในการแก้ไขเพลง");
    res.redirect(`/admin/edit-music/${id}`);
  }
}
