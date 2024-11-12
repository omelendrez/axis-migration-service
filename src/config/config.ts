import * as dotenv from 'dotenv'
dotenv.config()

export const SSH_CONFIG = {
  host: process.env.VPS_HOST || '',
  username: process.env.VPS_USERNAME || '',
  port: Number(process.env.VPS_PORT) || 22,
  password: process.env.VPS_PASSWORD
}

export const LOCAL_BACKUP_FOLDER_PATH =
  process.env.LOCAL_BACKUP_FOLDER_PATH || ''

export const LOCAL_DOCUMENTS_ROOT_FOLDER =
  process.env.LOCAL_DOCUMENTS_ROOT_FOLDER || ''

export const REMOTE_BACKUPS_FOLDER_PATH =
  process.env.VPS_BACKUPS_FOLDER_PATH || ''

export const REMOTE_DOCUMENTS_ROOT_FOLDER =
  process.env.VPS_DOCUMENTS_ROOT_FOLDER || ''

export const CRON_TAB_BACKUPS = process.env.CRON_TAB_BACKUPS || ''

export const CRON_TAB_DOCUMENTS = process.env.CRON_TAB_DOCUMENTS || ''

export const EXTERNAL_API_ENDPOINT = process.env.EXTERNAL_API_ENDPOINT || ''
