export interface SSHConfig {
  host: string
  port: number
  username: string
  password?: string
}

export interface TableRow {
  id: number
  file: string
  created: string
  updated: string
}
