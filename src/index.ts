import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`The app started on ${PORT} port`);
});
