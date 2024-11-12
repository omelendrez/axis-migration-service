# Daily File Sync and Update Service

This project is a Node.js application designed to transfer files daily from a VPS server, retrieve additional file paths from an external API, download the specified files, and update the status of each downloaded file.

## Features

- **Daily File Sync**: Transfers files from a VPS to a local folder every day at 2 AM.
- **Fetch Additional Files**: After the main file sync, the app retrieves a list of additional files to download from an external API.
- **Status Update**: After each file is downloaded, the app updates its status by making a `PUT` request to the external API.

## Project Structure

```plaintext
src/
├── config/
│   └── config.ts              # Configuration for environment variables
├── services/
│   ├── fileTransferService.ts  # Handles SSH file transfers
│   ├── apiService.ts           # Manages API interactions
├── utils/
│   └── logger.ts               # Custom logger configuration
├── index.ts                    # Main execution script with cron scheduling
└── types/
    └── index.d.ts              # Type definitions
```

## Requirements

- **Node.js** (version 14 or higher)
- **TypeScript**
- A VPS server with SSH access
- An external API endpoint that provides file paths and allows status updates

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/omelendrez/axis-migration-service.git
cd axis-migration-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and provide the following environment variables:

```plaintext
VPS_HOST=your_vps_host
VPS_USERNAME=your_vps_username
VPS_PORT=your_vps_port
VPS_PASSWORD=your_vps_password
LOCAL_DOCUMENTS_FOLDER_PATH=your_local_folder_path
VPS_BACKUPS_FOLDER_PATH=your_remote_folder_path
EXTERNAL_API_ENDPOINT=https://api.example.com/endpoint
CRON_TAB=crontab_configuration_string
```

### 4. Build the Project

```bash
npm run build
```

### 5. Run the Application

You can run the app in development mode to execute the file sync process immediately:

```bash
npm run dev
```

In production, the application will automatically sync files daily at 2 AM using the cron scheduler.

## Usage

The application performs the following tasks:

1. **Transfers Files**: The main set of files is transferred from the VPS server to a local folder.
2. **Fetches Additional Files**: The app retrieves additional file paths from an external API.
3. **Downloads and Updates Status**: Each additional file is downloaded, and after each download, the app sends a `PUT` request to update the file's status.

## Clean Code Principles

The code is organized with clean code practices, including:

- **Single Responsibility Principle**: Each service module has a distinct purpose, handling either file transfers or API interactions.
- **Separation of Concerns**: Configuration, logging, and services are separated for easier maintenance.
- **Modularity**: Functions are organized into reusable services.

## Project Scripts

- **`npm run build`**: Compiles TypeScript files to JavaScript.
- **`npm run start`**: Runs the compiled JavaScript files.
- **`npm run dev`**: Runs the project with `nodemon` for automatic reloading.

## Logging

The project uses Winston for structured logging, with logs output to the console. Errors and information logs are captured to assist with debugging and monitoring.

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.
