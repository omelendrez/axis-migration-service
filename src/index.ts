import { NodeSSH } from 'node-ssh'
import * as dotenv from 'dotenv'
import logger from './utils/logger'
import * as cron from 'node-cron'

dotenv.config()

interface SSHConfig {
  host: string
  port: number
  username: string
  password?: string
}

const ssh = new NodeSSH()

const config: SSHConfig = {
  host: process.env.VPS_HOST || '',
  username: process.env.VPS_USERNAME || '',
  port: Number(process.env.VPS_PORT) || 22,
  password: process.env.VPS_PASSWORD
}

const local = process.env.LOCAL_DOCUMENTS_FOLDER_PATH
const remote = process.env.VPS_BACKUPS_FOLDER_PATH

async function transferFiles() {
  try {
    await ssh.connect(config)
    logger.info('SSH connection established')

    // @ts-ignore
    const result = await ssh.getDirectory(local, remote)
    logger.info(result)
    logger.info("The file's contents were successfully downloaded")
  } catch (error) {
    logger.error('An error occurred during file transfer')
    logger.error(error instanceof Error ? error.message : error)
  } finally {
    ssh.dispose()
    logger.info('SSH connection closed')
  }
}

// Schedule the function to run once every day at midnight
cron.schedule('0 0 * * *', () => {
  logger.info('Starting daily file transfer')
  transferFiles()
})
