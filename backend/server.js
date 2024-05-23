const app = require("./app");

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
//mongodb+srv://ghadaBN:<password>@cluster0.td4li6d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
