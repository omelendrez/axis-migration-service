import axios from 'axios'
import { EXTERNAL_API_ENDPOINT } from '../config/config'
import logger from '../utils/logger'
import { TableRow } from '../types'

// Fetch file paths from the external API
export async function fetchFilePaths(): Promise<string[]> {
  try {
    const response = await axios.get(`${EXTERNAL_API_ENDPOINT}?status=0`)

    const data = response.data.map((row: TableRow) => row.file)

    const fileRecords = data || []

    logger.info('File paths retrieved from external API:', fileRecords)
    return fileRecords
  } catch (error) {
    logger.error('Failed to fetch file paths from API:', error)
    throw error
  }
}

// Update the file status to "downloaded"
export async function markFileAsDownloaded(file: string): Promise<void> {
  try {
    await axios.put(EXTERNAL_API_ENDPOINT, { file, status: 1 })
    // logger.info(`File ${file} marked as downloaded`)
  } catch (error) {
    logger.error(`Failed to update file status for ${file}:`, error)
    throw error
  }
}
