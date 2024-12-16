import RenderLib from "../../../../RenderLib"
import Skyblock from "../../../../BloomCore/Skyblock"
import Settings from "../../../config";
import { registerWhen } from "../../../utils/reg"

function realPlayer(playerMP) {
  return (playerMP.getPing() === 1)
}

function extractIGN(player) {
  return player?.removeFormatting()?.split("] ")?.slice(-1)?.toString()?.replace(/[^A-Za-z0-9_]/g, "")
}

freshers = new Set()
buildPhase = false 

// register build phase
registerWhen(register("chat", () => {
  buildPhase = true;
}).setCriteria("[NPC] Elle: OMG! Great work collecting my supplies!"), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.TeamHighlight)

// reset build phase
registerWhen(register("worldLoad", () => {
  buildPhase = false
}), () => buildPhase)

// register freshers
registerWhen(register("chat", (player) => {
  const disectedName = extractIGN(player)

  if (!disectedName || !freshers) return;

  freshers.add(disectedName)

  setTimeout(() => freshers.delete(disectedName), 10000);
}).setCriteria("Party > ${player}: FRESH").setStart(), () => Skyblock.subArea === "Kuudra's Hollow" && buildPhase && Settings.TeamHighlight)

// render freshbox and normalbox
registerWhen(register("renderWorld", () => {
    // * lf admins to add players to "team" for kuudra so this can be true esp
  
    const team = World.getAllPlayers().filter(playerMP =>
      realPlayer(playerMP) && Player.asPlayerMP().canSeeEntity(playerMP)
    )
  
    let i = team.length
    while (i--) {
      const teammate = team[i]
  
      const [name, x, y, z] = [teammate.getName(), teammate.getRenderX(), teammate.getRenderY(), teammate.getRenderZ()]
  
      const [r, g, b, hex] = freshers.has(name) ? [0, 29, 245, 0x00E5F5] : [240, 0, 228, 0xf000e4]
  
      if (!freshers.has(name) && name === Player.getName()) return
      
      RenderLib.drawEspBox(
        x, y, z,
        0.8, 2,
        r, g, b, 1,
        false
      );
      Tessellator.drawString(name, x, y + 2.5, z, hex, true, 1.50)
    }
}), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.TeamHighlight)