import express from "express";
import { supabase } from "../config/db.js";
import { protect } from "../middlewares/protect.js";

const postRouter = express.Router();

postRouter.get("/complaint", async (req, res) => {
  try {
    const { keyword, status } = req.query;
    if (status != "all") {
      const { data, error } = await supabase
        .from("complaint")
        .select("*")
        .filter("status", "ilike", `%${status}%`)
        .filter("title", "ilike", `%${keyword}%`)
        .order("id", { ascending: false });
      if (error) {
        return res.json({
          message: error,
        });
      }
      return res.json({
        data,
      });
    } else {
      const { data, error } = await supabase
        .from("complaint")
        .select("*")
        .filter("title", "ilike", `%${keyword}%`)
        .order("id", { ascending: false });
      if (error) {
        return res.json({
          message: error,
        });
      }
      return res.json({
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: `ERROR: There's something wrong, ${error}`,
    });
  }
});

postRouter.post("/complaint", async (req, res) => {
  console.log(req.body);
  try {
    const { title, description, date } = req.body;
    console.log(req.user);
    const { data, error } = await supabase
      .from("complaint")
      .insert([
        { title, description, date, user_id: req.user.id, status: "new" },
      ])
      .select();
    if (error) {
      return res.json({
        message: `Something went wrong: ${error}`,
      });
    }
    return res.json({
      message: "Created complaint successfully",
    });
  } catch (err) {
    console.log("ERROR: from path /post/complaint", err);
  }
});

postRouter.put("/complaint/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date_resolved } = req.body;
    const { data, error } = await supabase
      .from("complaint")
      .update({ status, date_resolved, admin_id: req.user.id })
      .eq("id", id)
      .select();
    const user = await supabase
      .from("users")
      .select("username")
      .eq("id", data[0].user_id);
    if (error) {
      return res.json({
        message: error,
      });
    }
    data[0].username = user.data[0].username;
    return res.json({
      data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error,
    });
  }
});

postRouter.get("/complaint/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("complaint")
      .select("*")
      .eq("id", id);
    const user = await supabase
      .from("users")
      .select("username")
      .eq("id", data[0].user_id);

    if (data[0].admin_id) {
      const admin = await supabase
        .from("admin")
        .select("username")
        .eq("id", data[0].admin_id);
      data[0].admin_username = admin.data[0].username;
      if (admin.error) {
        return res.json({
          message: admin.error,
        });
      }
    }
    if (error) {
      return res.json({
        message: error,
      });
    }
    data[0].username = user.data[0].username;
    return res.json({
      data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error,
    });
  }
});

export default postRouter;
