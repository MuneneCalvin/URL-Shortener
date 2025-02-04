# URL-Shortener using Node.js and MongoDB

A simple URL shortener built using Node.js, Express, and MongoDB.

## Features

- Shorten URLs
- Redirect to the original URL using the shortened URL
- View the number of times a shortened URL has been accessed

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- ShortID

## Installation

1. Clone the repository
2. Install the required packages using `npm install`
3. Create a `.env` file in the root directory and add the following environment variables:
   - `MONGO_URI`: The URI of your MongoDB database
   - `BASE_URL`: The base URL of your website
4. Run the server using `npm start` or `npm run dev` (for development)


## Usage

To shorten a URL, send a POST request to `/api/url/shorten` with the original URL in the request body. The shortened URL will be returned in the response.
To access the original URL, send a GET request to the shortened URL.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Author

- [Shawn Calvin](https://www.linkedin.com/in/calvin-munene/ "Shawn Calvin")

