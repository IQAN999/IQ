import Settings from "../../../config";
import { registerWhen } from "../../../utils/reg";

allowPearlRefill = true
lastRefillTime = 0
lastInteractTime = 0

registerWhen(register("playerInteract", () => {
    const pearlStack = Player.getInventory()?.getItems()?.find(a => a?.getName() == "§fEnder Pearl")
    
    if(pearlStack){
        let stackSize = pearlStack.getStackSize()
        if(stackSize >= 16){
            lastInteractTime = Date.now()
        }
    }
}), () => Settings.PearlRefill)

register("chat", () => {
    allowPearlRefill = true
}).setCriteria("&r&aMoved &r&e${*} Ender Pearl&r&a from your Sacks to your inventory.&r")

registerWhen(register("tick", () => {
    if (!allowPearlRefill) return
    const pearlStack = Player.getInventory()?.getItems()?.find(a => a?.getName() == "§fEnder Pearl")

        if (pearlStack) {
            let stackSize = pearlStack.getStackSize()
            if (stackSize < 2|| (stackSize < 16 && (Date.now() - lastRefillTime > 3000) && (Date.now() - lastInteractTime > 3000) )) {
                allowPearlRefill = false
                const toGive = 16 - stackSize
                if(toGive < 15){
                    lastInteractTime = Date.now()
                }
                lastRefillTime = Date.now()
                ChatLib.chat(`&d[IQ] &aGetting Ender Pearls!`)
                ChatLib.command(`gfs ender_pearl ${toGive}`, false)
            }
        }
}), () => Settings.PearlRefill)