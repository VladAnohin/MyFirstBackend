const express = require("express");

const PORT = 3000;

const app = express();

const users = [
  { id: 1, name: "Vlad", age: 24 },
  { id: 2, name: "Andrey", age: 24 },
  { id: 3, name: "Vika", age: 21 },
  { id: 4, name: "Artur", age: 22 },
];

app.get("/", (req, res) => {
  res.json({
    message: "hui",
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
app.listen(PORT, () => {
  console.log(`server launched on http://localhost:${PORT}`);
});
