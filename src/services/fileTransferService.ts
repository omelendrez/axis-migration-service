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

const ssh = new NodeSSH()

export async function transferFiles(): Promise<void> {
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

export async function transferFile(file: string): Promise<void> {
  try {
    await ssh.connect(SSH_CONFIG)

    const localFile = `${LOCAL_DOCUMENTS_ROOT_FOLDER}/${file}`
    const remoteFile = `${REMOTE_DOCUMENTS_ROOT_FOLDER}/${file}`

    if (!fs.existsSync(localFile)) {
      await ssh.getFile(localFile, remoteFile)
      logger.info('Files successfully transferred')
    } else {
      logger.warn('Warn! File already exists')
    }
  } catch (error) {
    logger.error('File transfer error:', error)
    throw error
  } finally {
    ssh.dispose()
    logger.info('SSH connection closed')
  }
}
