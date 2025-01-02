import Settings from "../../../config"
import { ENTITY_PLAYER } from "../../../utils/constants"
import { registerWhen } from "../../../utils/reg"

registerWhen(register("chat", (mana) => {
    let players = 0
    World.getAllEntitiesOfType(ENTITY_PLAYER).forEach(player => {
      if (Player.asPlayerMP().distanceTo(player) > 5) return
      let ping = World.getPlayerByName(player.getName())?.getPing()
      if (ping != 1) return
      players++
    }) 
    ChatLib.say(`/pc Used ${mana} mana on ${players} players!`)
}).setCriteria("Used Extreme Focus! (${mana} Mana)"), () => Settings.ManaDrainNotify)