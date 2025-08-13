const musicDb = require("../database/dbConfig");

exports.musicList = async (req, res) => {
  const locals = {
    title: "Music list",
  }

  try {
    // Fetch all music from database
    const musicList = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM music ORDER BY music_id DESC`;
      musicDb.all(sql, [], (err, rows) => {
        if (err) {
          console.error("Error fetching music:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

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

    await new Promise((resolve, reject) => {
      const sql = `INSERT INTO music (title, artist, youtube_link, description) VALUES (?, ?, ?, ?)`;
      musicDb.run(sql, [title, artist, youtube_link, description], (err, rows) => {
        if (err) {
          console.error("Error fetching users:", err.message);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });

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
    await new Promise((resolve, reject) => {
      const sql = `DELETE FROM music WHERE music_id = ?`;
      musicDb.run(sql, [id], function(err) {
        if (err) {
          console.error("Error deleting music:", err.message);
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });

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
    const music = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM music WHERE music_id = ?`;
      musicDb.get(sql, [id], (err, row) => {
        if (err) {
          console.error("Error fetching music:", err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

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
    await new Promise((resolve, reject) => {
      const sql = `UPDATE music SET title = ?, artist = ?, youtube_link = ?, description = ? WHERE music_id = ?`;
      musicDb.run(sql, [title, artist, youtube_link, description, id], function(err) {
        if (err) {
          console.error("Error updating music:", err.message);
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });

    req.flash("success", "แก้ไขเพลงสำเร็จ");
    res.redirect("/admin/music-list");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "เกิดข้อผิดพลาดในการแก้ไขเพลง");
    res.redirect(`/admin/edit-music/${id}`);
  }
}
