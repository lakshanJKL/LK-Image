import app from './app';
import  'dotenv/config';

// server port 
const PORT = process.env.SERVER_PORT || 8080;

// Start the Express server
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
  
});