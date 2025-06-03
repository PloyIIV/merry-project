import express from "express";
import { supabase } from "../config/db.js";
import jwt from "jsonwebtoken";
import { protect } from "../middlewares/protect.js";
import multer from "multer";

const userRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const avatarUpload = upload.fields([{ name: "avatar", maxCount: 5 }]);
const testUpload = upload.single("photo");

userRouter.get("/log", protect, async (req, res) => {
  try {
    console.log(req.user)
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .neq("id", req.user.id);
      console.log(data)
    if (error) {
      console.log(error);
      return res.json({
        message: error,
      });
    }
    return res.json({
      data,
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.get("/:id", protect, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.params.id);
    if (error) {
      return res.json({
        message: error,
      });
    }
    return res.json({
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: `ERROR: There's something wrong, Can't login right now. ${error}`,
    });
  }
});

userRouter.put("/profile", protect, avatarUpload, async (req, res) => {
  try {
    const {
      name,
      date_of_birth,
      location,
      city,
      email,
      sexual_preferences,
      sexual_identities,
      racial_preferences,
      meeting_interests,
      about_me,
      tags,
    } = req.body;
    const hobbies = tags.split(",");
    let files;
    const image = req.body.avatar;
    if (req.files.avatar) {
      files = req.files.avatar;
      for (let i = 0; i < files.length; i++) {
        const result = await supabase.storage
          .from("avatarImg")
          .upload(`${name}/${Date.now()}`, files[i].buffer, {
            cacheControl: "3600",
            upsert: false,
            contentType: files[i].mimetype,
          });
        if (result.error) {
          return res.json({
            message: error,
          });
        }
        const imgUrl = supabase.storage
          .from("avatarImg")
          .getPublicUrl(result.data.path);
        image.push(imgUrl.data.publicUrl);
      }
    }
    const { data, error } = await supabase
      .from("users")
      .update({
        name,
        date_of_birth,
        location,
        city,
        email,
        sexual_identities,
        sexual_preferences,
        racial_preferences,
        meeting_interests,
        about_me,
        hobbies,
        image,
      })
      .eq("id", req.user.id)
      .select();
    if (error) {
      console.log(error);
      return res.json({
        message: `ERROR: ${error}`,
      });
    }
    return res.json({
      message: "Updated successfully.",
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { password, username } = req.body;
  console.log(req.body);
  let lowerCaseEmail;
  if (req.body.username.includes("@")) {
    lowerCaseEmail = req.body.username.toLowerCase();
    console.log(lowerCaseEmail);
  }
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${lowerCaseEmail}, username.eq.${username.toLowerCase()}`);
    const admin = await supabase
      .from("admin")
      .select("*")
      .or(`email.eq.${lowerCaseEmail}, username.eq.${username.toLowerCase()}`);
    if (!admin.data[0] && !data[0]) {
      return res.json({
        message: `This email is not exists, Please sign up first.`,
      });
    } else if (admin.data[0] && password !== admin.data[0].password) {
      return res.json({
        status: 404,
        message: `Incorrect password. If you can't remember, Please reset your password.`,
      });
    } else if (data[0] && password !== data[0].password) {
      return res.json({
        status: 404,
        message: `Incorrect password. If you can't remember, Please reset your password.`,
      });
    } else if (admin.error) {
      return res.json({
        message: error,
      });
    } else if (error) {
      return res.json({
        message: error,
      });
    } else if (admin.data[0]) {
      const token = jwt.sign(
        { id: admin.data[0].id, role: "admin" },
        process.env.SUPABASE_JWT,
        {
          expiresIn: "900000",
        }
      );
      return res.json({
        data: admin.data[0],
        token,
      });
    }
    const token = jwt.sign(
      { id: data[0].id, role: "user" },
      process.env.SUPABASE_JWT,
      {
        expiresIn: "900000",
      }
    );
    return res.json({
      data: data[0],
      token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: `ERROR: There's something wrong, Can't login right now. ${error}`,
    });
  }
});

userRouter.post("/register", avatarUpload, async (req, res) => {
  const { username, password, email, tags } = req.body;
  const files = req.files.avatar;
  const lowerCaseEmail = email.toLowerCase();
  const tagsArr = tags.split(",");
  let fileUrl = [];
  try {
    const age =
      new Date().getFullYear() - new Date(req.body.date_of_birth).getFullYear();
    if (age < 18) {
      return res.json({
        message: "You must be at least 18 years old to register",
      });
    }
    const checkUser = await supabase
      .from("users")
      .select("*")
      .eq("email", lowerCaseEmail);
    if (checkUser.data[0]) {
      return res.json({
        message: "This email or username is already in used",
      });
    }
    const checkAdmin = await supabase
      .from("admin")
      .select("*")
      .or(`email.eq.${lowerCaseEmail}, username.eq.${username.toLowerCase()}`);
    if (checkAdmin.data[0]) {
      return res.json({
        message: "This email or username is already in used",
      });
    }
    for (let i = 0; i < files.length; i++) {
      const result = await supabase.storage
        .from("avatarImg")
        .upload(`${username}/${Date.now()}`, files[i].buffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: files[i].mimetype,
        });
      if (result.error) {
        return res.json({
          message: error,
        });
      }
      const ImgUrl = supabase.storage
        .from("avatarImg")
        .getPublicUrl(result.data.path);
      fileUrl.push(ImgUrl.data.publicUrl);
    }
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email: lowerCaseEmail,
          password,
          username: username.toLowerCase(),
          image: fileUrl,
          hobbies: tagsArr,
          date_of_birth: req.body.date_of_birth,
          location: req.body.location,
          city: req.body.city,
          age,
        },
      ])
      .select();
    if (error) {
      return res.json({
        message: error,
      });
    }
    return res.json({
      message: "Created new account successfully",
      data: data[0],
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: `ERROR: There's something wrong, Can't register right now. ${error}`,
    });
  }
});

export default userRouter;
