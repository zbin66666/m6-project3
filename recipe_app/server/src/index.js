import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://sarthak:sarthakmern123@recipes.rtx8gsh.mongodb.net/recipes?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log("DB connected"))
    .catch(err => console.log(err));

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

app.listen(5000, () => {
    console.log(`Sever Started`)
});