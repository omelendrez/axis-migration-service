import * as cron from 'node-cron'
import {
  transferDatabaseBackupFiles,
  transferDocuments
} from './services/fileTransferService'
import { fetchFilePaths } from './services/apiService'
import logger from './utils/logger'
import { CRON_TAB_BACKUPS, CRON_TAB_DOCUMENTS } from './config/config'

async function databaseBackupSync() {
  try {
    logger.info('Starting daily file sync')

    await transferDatabaseBackupFiles()

    logger.info('Daily database backup sync completed')
  } catch (error) {
    logger.error(
      'An error occurred during the daily database backup sync process:',
      error
    )
  }
}

async function documentsSync() {
  try {
    logger.info('Starting documents files sync')

    const files: string[] = await fetchFilePaths()

    logger.info(`${files.length} records received`)

    await transferDocuments(files)

    logger.info('Documents files sync completed')
  } catch (error) {
    logger.error(
      'An error occurred during the documents files sync process:',
      error
    )
  }
}

cron.schedule(CRON_TAB_BACKUPS, databaseBackupSync)

cron.schedule(CRON_TAB_DOCUMENTS, documentsSync)
