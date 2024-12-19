export function getRGB1(setting, alpha = false) {
    r = setting.getRed() / 255
    g = setting.getGreen() / 255
    b = setting.getBlue() / 255
    a = setting.getAlpha() / 255

    return alpha ? [r, g, b, a] : [r, g, b]
}

export function extractIGN(player) {
    return player?.removeFormatting()?.split("] ")?.slice(-1)?.toString()?.replace(/[^A-Za-z0-9_]/g, "")
}

export function realPlayer(playerMP) {
  return (playerMP.getPing() === 1)
}
