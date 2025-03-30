export interface LrcLine {
  time: number // in seconds
  text: string
}

export const parseLRC = (lrc: string): LrcLine[] => {
  return lrc
    .split('\n')
    .map(line => {
      const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/)
      if (!match) return null
      const min = parseInt(match[1])
      const sec = parseInt(match[2])
      const ms = match[3] ? parseInt(match[3].padEnd(3, '0')) : 0
      return {
        time: min * 60 + sec + ms / 1000,
        text: match[4].trim()
      }
    })
    .filter(Boolean) as LrcLine[]
}
