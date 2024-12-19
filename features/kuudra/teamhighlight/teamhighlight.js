import RenderLib from "../../../../RenderLib"
import Skyblock from "../../../../BloomCore/Skyblock"
import Settings from "../../../config"
import { registerWhen } from "../../../utils/reg"
import Kuudra from "../../../utils/Kuudra"
import { realPlayer } from "../../../utils/functions"

// render freshbox and normalbox
registerWhen(register("renderWorld", () => {

  freshedPlayers = Kuudra.getFresh()

  // * lf admins to add players to "team" for kuudra so this can be true esp

  const team = World.getAllPlayers().filter(playerMP =>
    realPlayer(playerMP) && Player.asPlayerMP().canSeeEntity(playerMP)
  )

  let i = team.length
  while (i--) {
    const teammate = team[i]

    const [name, x, y, z] = [teammate.getName(), teammate.getRenderX(), teammate.getRenderY(), teammate.getRenderZ()]

    const [r, g, b, hex] = freshedPlayers.hasOwnProperty(name) && name != Player.getName() && Kuudra.getPhase() == 2 ? [0, 29, 245, 0x00E5F5] : [240, 0, 228, 0xf000e4]

    if (name != Player.getName()){
      RenderLib.drawEspBox(
        x, y, z,
        0.8, 2,
        r, g, b, 1,
        false
      );

      Tessellator.drawString(name, x, y + 2.5, z, hex, true, 1.50)
    }

    if (freshedPlayers.hasOwnProperty(name) && Kuudra.getPhase() == 2) {
      freshTime = ((freshedPlayers[name] - Date.now()) / 1000).toFixed(2)

      freshTimeMs = (freshedPlayers[name] - Date.now())

      freshTimeColor = "§f"

      if (freshTimeMs <= 2000) {
        freshTimeColor = "§4"
      } else if (freshTimeMs > 2000 && freshTimeMs <= 4000) {
        freshTimeColor = "§c"
      } else if (freshTimeMs > 4000 && freshTimeMs <= 6000) {
        freshTimeColor = "§6"
      } else if (freshTimeMs > 6000 && freshTimeMs <= 8000) {
        freshTimeColor = "§2"
      } else if (freshTimeMs > 8000 && freshTimeMs <= 10000) {
        freshTimeColor = "§a"
      }

      Tessellator.drawString(`${freshTimeColor}${freshTime}`, x, y + 4, z, 0xF0DC02, false, 0.1, false)
    }
  }
}), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.TeamHighlight)