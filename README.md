## Overview

The Comfy Trader Backend API provides the functionality to execute and manage trades, retrieve user exchange data, manage user settings, and handle authorization. It is built using **Express.js** and **PostgreSQL**, with a focus on scalability and reliability. Currently supporting the Kraken cryptocurrency exchange

## Features

- **Trade Management**: Execute, cancel, and monitor trades.
- **User Settings**: Manage user-specific preferences.
- **API Key Management**: Securely store and validate API keys for third-party integrations.
- **Analytics**: Provide trade performance insights.
- **Authentication**: Secure user authentication and authorization.

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: AWS Cognito
- **Deployment**: Docker, AWS ECS
- **Testing**: Jest, SuperTest

## Setup and Installation

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- Docker (optional, for containerized deployment)

### Installation Steps

1. Clone the repository:
    
    ```bash
    git clone https://github.com/Burnlees/comfy-trading-bot
    cd comfy-trading-bot
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Set up environment variables:
    
    - Create a `.env` file in the root directory.
    - Add the required environment variables:
        
        ```env
        DATABASE_URL=your_database_url
        AWS_REGION=your_aws_region
        COGNITO_USER_POOL_ID=your_user_pool_id
        COGNITO_CLIENT_ID=your_client_id
        ```
        
4. Start the development server:
    
    ```bash
    npm run dev
    ```
    

## Testing

Run the test suite with:

```bash
npm test
```

## Deployment

### Docker

1. Build the Docker image:
    
    ```bash
    docker build -t comfy-trading-bot .
    ```
    
2. Run the container:
    
    ```bash
    docker run -p 3000:3000 --env-file .env trading-bot-backend
    ```
    

### AWS ECS

- Push the Docker image to Amazon ECR.
- Configure ECS tasks and services for deployment.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License

This project is licensed under the [MIT License](https://chatgpt.com/c/LICENSE).
