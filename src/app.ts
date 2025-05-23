import express from 'express';
import apiRoutes from './routes';
import bodyParser from 'body-parser';
import errorHandler from './middleware/errorHandler';

const app = express();

//  Parse JSON request bodies
app.use(bodyParser.json());

//routes
app.use("/api/v1", apiRoutes);

// error handler
app.use(errorHandler);

// Health check route
app.get('/', (req, res) => {
  res.json({"msg":"API is running"});
});

export default app;