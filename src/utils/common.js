import crypto from 'crypto'

export function md5(value) {
  const md5=crypto.createHash('md5')
  md5.update(value)
  return md5.digest('hex')
}
