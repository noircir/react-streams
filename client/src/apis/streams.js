import axios from 'axios';

// Get the content of the database: the array of objects (streams)
// because the db is running on port 3001.
// The endpoint of 'localhost:3001' gives us what we are asking of this API:
// the data (streams).

export default axios.create({
    baseURL: 'http://localhost:3001'
});