import * as cron from 'node-cron'
import { transferFiles, transferFile } from './services/fileTransferService'
import { fetchFilePaths, markFileAsDownloaded } from './services/apiService'
import logger from './utils/logger'
import { CRON_TAB } from './config/config'

async function dailyFileSync() {
  try {
    logger.info('Starting daily file sync')

    // Step 1: Transfer main set of files
    await transferFiles()

    // Step 2: Fetch additional file paths
    const fileRecords = await fetchFilePaths()

    // Step 3: Download each file and update its status
    for (const file of fileRecords) {
      logger.info(`Downloading additional file: ${file}`)

      await transferFile(file)

      // After downloading, mark the file as downloaded
      await markFileAsDownloaded(file)
    }

    logger.info('Daily file sync completed')
  } catch (error) {
    logger.error('An error occurred during the daily file sync process:', error)
  }
}

// Schedule the task to run as per CRON_TAB env var
cron.schedule(CRON_TAB, dailyFileSync)
