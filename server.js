const express = require("express");

const PORT = 3000;

const app = express();
app.use(express.json());
let users = [
  { id: 1, name: "Tyler", age: 31 },
  { id: 2, name: "James", age: 26 },
  { id: 3, name: "Jay", age: 23 },
  { id: 4, name: "Monica", age: 35 },
];

app.get("/", (req, res) => {
  res.json({
    message: "Hi",
  });
});

app.get("/users/:id", (req, res) => {
  const userId = +req.params.id;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({
      message: "unknown user",
    });
  }
  res.json({
    message: `вы зашли на страницу пользователя ${user.name}`,
    method: typeof userId,
  });
});
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  const lastUser = users[users.length - 1];
  newUser.id = lastUser.id + 1;
  users.push(newUser);
  res.json({
    message: "Добавил!",
  });
});
app.delete("/users/:id", (req, res) => {
  const userId = +req.params.id;
  users = users.filter((u) => u.id !== userId);
  res.json({
    message: "Deleted",
  });
});
app.patch("/users/:id", (req, res) => {
  const userId = +req.params.id;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({
      message: `user doesn't exist`,
    });
  }
  const data = req.body;
  user.name = data.name;
  user.age = data.age;
  res.json({
    name: `${data.name}`,
    age: `${data.age}`,
  });
});
app.listen(PORT, () => {
  console.log(`server launched on http://localhost:${PORT}`);
});
