# Node.js Dummy Data API

This project is a Node.js API that serves dummy JSON data with filtering and sorting capabilities.

## Setup and Running

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nodejs-dummy-data-api.git
   cd nodejs-dummy-data-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   node src/server.js
   ```

The server will start on http://localhost:3000.

## Jest Test Cases Running
1. Run this command in root directory after installing dependencies:
   ```
   npm start
   ```
   It will test the following :-
a. Return all data when no query params.
b. Filter data by language.
c. Sort data by version in descending order.
d. Sort data by name in ascending order.
e. Filter and sort data.
f. Handle case-insensitive filtering.
g. Handle missing filter value gracefully.
h. Handle missing sort order gracefully.
i. Handle non-existent sort field gracefully.

## API Usage

### Get Data

Endpoint: `GET /api/data`

Query Parameters:
- `sortBy`: Sort by 'name' or 'version'
- `filterBy`: Filter by 'name' or 'language'
- `filterValue`: Value to filter by

Example:
```
GET /api/data?sortBy=version&filterBy=language&filterValue=Sindhi
```

This will return data filtered for the Sindhi language and sorted by version.

## Error Handling

The API includes basic error handling. If an internal server error occurs, it will return a 500 status code with an error message.
