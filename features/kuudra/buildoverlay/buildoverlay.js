import Settings from "../../../config"
import Kuudra from "../../../utils/Kuudra"
import renderBeaconBeam from "../../../../BeaconBeam"
import { registerWhen } from "../../../utils/reg"
import Skyblock from "../../../../BloomCore/Skyblock"
import { ENTITY_ARMOR_STAND } from "../../../utils/constants"

let buildPiles = []

registerWhen(register("tick", () => {

    const stands = World.getAllEntitiesOfType(ENTITY_ARMOR_STAND).filter(e =>
        e.getName()?.match(/progress/gi)
    )

    // const buildingProgess = stands.find(e =>
    //     e.getName().includes("Building Progress")
    // )

    buildPiles = stands.filter(e =>
        e.getName().includes("PROGRESS: ") && e.getName().includes("%")
    )


    // buildPiles.forEach(element => {
    //     ChatLib.chat(element)
    // });

}), () => Settings.BuildOverlay && Skyblock.subArea == "Kuudra's Hollow" && Kuudra.getPhase() == 2)

registerWhen(register("renderWorld", () => {
    buildPiles.forEach(pille => {

        progress = pille.name.removeFormatting().replace(/[^\d]/g, '').trim()

        pilleCollor = [1, 1, 1, 1]

        if (progress <= 20) {
            pilleCollor = [168 / 255, 0, 0, 1]
        } else if (progress > 20 && progress <= 40) {
            pilleCollor = [1, 0, 0, 1]
        } else if (progress > 40 && progress <= 60) {
            pilleCollor = [255 / 255, 135 / 255, 0, 1]
        } else if (progress > 60 && progress <= 80) {
            pilleCollor = [46 / 255, 130 / 255, 0, 1]
        } else if (progress > 80 && progress <= 100) {
            pilleCollor = [125 / 255, 218 / 255, 88 / 255, 1]
        }

        renderBeaconBeam(
            pille.x-0.5, pille.y, pille.z-0.5,
            ...pilleCollor,
            true,
            100
        )

        Tessellator.drawString(pille.name, pille.x, pille.y+2, pille.z, 0xF0DC02, true, 0.05, false)
    });
}), () => Settings.BuildOverlay && Skyblock.subArea === "Kuudra's Hollow" && Kuudra.getPhase() == 2);