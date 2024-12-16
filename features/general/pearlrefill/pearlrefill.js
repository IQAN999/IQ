import Settings from "../../../config";
import { registerWhen } from "../../../utils/reg";

allowPearlRefill = true

register("chat", () => {
    allowPearlRefill = true
}).setCriteria("&r&aMoved &r&e${*} Ender Pearl&r&a from your Sacks to your inventory.&r")

registerWhen(register("tick", () => {
    if (!allowPearlRefill) return
    const pearlStack = Player.getInventory()?.getItems()?.find(a => a?.getName() == "§fEnder Pearl")

        if (pearlStack) {
            let stackSize = pearlStack.getStackSize()
            if (stackSize < 2) {
                allowPearlRefill = false
                const toGive = 16 - stackSize
                ChatLib.chat(`&d[IQ] &aGetting Ender Pearls!`)
                ChatLib.command(`gfs ender_pearl ${toGive}`, false)
            }
        }
}), () => Settings.PearlRefill)