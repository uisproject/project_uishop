import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "Steve Jobs",
    email: "steve@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Mark Zuckerberg",
    email: "mark@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default users;
