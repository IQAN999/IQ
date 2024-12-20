import Settings from "../../../config"
import Skyblock from "../../../../BloomCore/Skyblock"
import { registerWhen } from "../../../utils/reg"

buildFinished = false
buildStarted = false
build = 0

registerWhen(register("worldLoad", () => {
    buildFinished = false
    buildStarted = false
    build = false
}), () => Settings.AutoBM && Skyblock.subArea === "Kuudra's Hollow")

registerWhen(register("chat", () => {
    buildStarted = true
}).setCriteria("[NPC] Elle: OMG! Great work collecting my supplies!"), () => Settings.AutoBM && Skyblock.subArea === "Kuudra's Hollow")

registerWhen(register("tick", () => {
    const stands = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand").class).filter(e =>
        e.getName()?.match(/progress/gi)
    )

    const buildingProgess = stands.find(e =>
        e.getName().includes("Building Progress")
    )
    if (buildingProgess) {
        // Entity{name=Building Progress 2% (0 Players Helping), x=-101.5, y=84.125, z=-105.5} (10)
        const name = buildingProgess.getName().removeFormatting()
        build = name.substring(0, name.indexOf("%")).replace(/\D/g, "")
    }
}), () => buildStarted && Settings.AutoBM && Skyblock.subArea === "Kuudra's Hollow")

registerWhen(register("chat", () => {
    buildFinished = true
    buildStarted = false
}).setCriteria("&e[NPC] &cElle&f: &rPhew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!&r"), () => Settings.AutoBM && Skyblock.subArea === "Kuudra's Hollow")

registerWhen(register("guiOpened", () => {
    setTimeout(() => {
        if (buildFinished) return
        if (build > 80) return
        if (Player?.getContainer()?.getName() != "Perk Menu") return
        if (!Player?.getContainer()?.getStackInSlot(13)?.getName()?.includes("Ballista Mechanic")) return
        Player.getContainer().click(13)
        setTimeout(() => {
            Player.getContainer().click(13)
            setTimeout(() => {
                Client.currentGui.close()
            }, 25);
        }, 25);
    }, 50);
}), () => Settings.AutoBM && Skyblock.subArea === "Kuudra's Hollow")