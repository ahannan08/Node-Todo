const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data for todo items
let todos = [];

// Index route
app.get('/', (req, res) => {
  let html = '<h1>Todo List</h1>';
  html += '<form action="/add" method="POST">';
  html += '<input type="text" name="todo" placeholder="Add todo item" required>';
  html += '<button type="submit">Add</button>';
  html += '</form>';
  html += '<ul>';
  todos.forEach((todo, index) => {
    html += `<li>${todo} <a href="/delete/${index}">Delete</a></li>`;
  });
  html += '</ul>';
  res.send(html);
});

// Add todo item
app.post('/add', (req, res) => {
  const newTodo = req.body.todo;
  todos.push(newTodo);
  res.redirect('/');
});

// Delete todo item
app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
