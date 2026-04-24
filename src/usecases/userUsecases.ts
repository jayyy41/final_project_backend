import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../domain/user";

const users: User[] = [];
const SECRET = "group10secret";

export async function registerUser(
  username: string,
  password: string,
  role: "user" | "admin" | "superuser" = "user",
) {
  const existing = users.find((u) => u.username === username);
  if (existing) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: crypto.randomUUID(),
    username,
    password: hashedPassword,
    role,
  };
  users.push(newUser);
  return { id: newUser.id, username: newUser.username, role: newUser.role };
}

export async function loginUser(username: string, password: string) {
  const user = users.find((u) => u.username === username);
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET,
    {
      expiresIn: "1h",
    },
  );
  return { token };
}

export function getUsers() {
  return users.map((u) => ({ id: u.id, username: u.username, role: u.role }));
}
