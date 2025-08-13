const musicDb = require("../database/dbConfig");

exports.home = async (req, res) => {
  const locals = {
    title: "Music Collection"
  }

  try {
    const musicList = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM music ORDER BY music_id DESC`;
      musicDb.all(sql, [], (err, rows) => {
        if (err) {
          console.error("Error fetching music list: ", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

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

    const rows = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM music WHERE music_id = ? ORDER BY music_id ASC`;
      musicDb.all(sql, [id], (err, rows) => {
        if (err) {
          console.error("Error fetching music:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    if (!rows || rows.length === 0) {
      locals.music = null;
      return res.render("musicPlayer", locals);
    }

    // แยก YouTube ID จาก URL
    const music = rows[0];
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
        youtubeId = youtubeId.split('?')[0].split('&')[0];
      }


      music.youtube_id = youtubeId;
      locals.music = music;
    } else {
      locals.music = null;
    }
    locals.title = music.title || "Music";
    res.render("musicPlayer", locals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
}
