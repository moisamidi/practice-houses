# practice-houses

## Prerequisites
- .NET 6 SDK
- Node.js and npm
- MySQL

## Setup and Installation

### Backend

1. Update the `appsettings.json` file to configure your MySQL connection string, for example:
    ```
    {
      "ConnectionStrings": {
        "DefaultConnection": "Server=localhost;Database=housingdb;User=root;Password=root;"
      }
    }
    ```

2. Run the migrations to create the database schema:
    ```
    dotnet ef database update
    ```

### Frontend

1. Navigate to the `src` directory.

2. Install the required npm packages:
    ```
    npm install
    ```

## Running the Application

### Backend
To run the backend, navigate to the `HousingApi` directory and execute:
```
dotnet run
```
### Frontend
To run the frontend, navigate to the src directory and execute:
```
ng serve
```
