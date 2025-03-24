const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true, //Bat buoc phai co, khong duoc de trong
      unique: true, //Duy nhat, khong duoc phep trung nhau
    },
    password: {
      type: String,
      require: true, //Bat buoc phai co, khong duoc de trong
    },
    full_name: {
      type: String,
      require: true, //Bat buoc phai co, khong duoc de trong
    },
  },
  {
    versionKey: false,
    timestamps: true, //Thoi gian tao, update truong du lieu
  }
);

module.exports = mongoose.model("account", accountSchema);
