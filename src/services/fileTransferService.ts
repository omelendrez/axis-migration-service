import { NodeSSH } from 'node-ssh'
import fs from 'node:fs'
import {
  SSH_CONFIG,
  LOCAL_BACKUP_FOLDER_PATH,
  REMOTE_BACKUPS_FOLDER_PATH,
  LOCAL_DOCUMENTS_ROOT_FOLDER,
  REMOTE_DOCUMENTS_ROOT_FOLDER
} from '../config/config'

import logger from '../utils/logger'
import { markFileAsDownloaded } from './apiService'

const ssh = new NodeSSH()

export async function transferDatabaseBackupFiles(): Promise<void> {
  try {
    await ssh.connect(SSH_CONFIG)
    logger.info('SSH connection established')

    const result = await ssh.getDirectory(
      LOCAL_BACKUP_FOLDER_PATH,
      REMOTE_BACKUPS_FOLDER_PATH
    )
    logger.info('Files successfully transferred:', result)
  } catch (error) {
    logger.error('File transfer error:', error)
    throw error
  } finally {
    ssh.dispose()
    logger.info('SSH connection closed')
  }
}

export async function transferDocuments(files: string[]): Promise<void> {
  let downloaded: number = 0
  try {
    await ssh.connect(SSH_CONFIG)

    for (const file of files) {
      const localFile = `${LOCAL_DOCUMENTS_ROOT_FOLDER}/${file}`
      const remoteFile = `${REMOTE_DOCUMENTS_ROOT_FOLDER}/${file}`

      const fileName = file.split('/').pop()

      // logger.info(`Transferring file: ${remoteFile} to ${localFile}`)

      if (!fs.existsSync(localFile)) {
        // Download each file and update its status
        await ssh.getFile(localFile, remoteFile)

        downloaded++

        logger.info(`File ${fileName} successfully downloaded`)
      } else {
        logger.warn(`File ${fileName} already exists`)
      }
      // After downloading (or already existing), mark the file as downloaded
      await markFileAsDownloaded(file)
    }
  } catch (error) {
    logger.error('File transfer error:', error)
    throw error
  } finally {
    ssh.dispose()
    logger.info(`${downloaded} files downloaded`)
    logger.info('SSH connection closed')
  }
}
