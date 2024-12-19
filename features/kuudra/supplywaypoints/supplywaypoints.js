import Settings from "../../../config"
import renderBeaconBeam from "../../../../BeaconBeam"
import Skyblock from "../../../../BloomCore/Skyblock"
import Kuudra from "../../../utils/Kuudra"
import { GIANT_CLASS } from "../../../utils/constants"
import { registerWhen } from "../../../utils/reg"
import RenderLibV2 from "../../../../RenderLibV2"
import { getRGB1 } from "../../../utils/functions"

/**
 * Tracks crates near player and colors them depending on how close they are.
 */

let supplies = []

registerWhen(register("step", () => {
    // Get all giant zombies and filter out the ones that are not on the ground
    supplies = World.getAllEntitiesOfType(GIANT_CLASS).filter(e =>
        e.getEntity().func_70694_bm()?.toString() == "1xitem.skull@3"
    ).map(supply => {
        const yaw = supply.getYaw()
        const x = supply.getRenderX() + (3.7 * Math.cos((yaw + 130) * (Math.PI / 180)));
        const z = supply.getRenderZ() + (3.7 * Math.sin((yaw + 130) * (Math.PI / 180)));

        return ([x, 75, z])
    })
}), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.SupplyWaypoints && Kuudra.getPhase() == 1);

registerWhen(register("renderWorld", () => {
    let i = supplies.length
    while (i--) {
        let supply = supplies[i]

        renderBeaconBeam(
            ...supply,
            ...getRGB1(Settings.SupplyWaypointColor, true),
            true,
            100
        );

        x = supply[0] + 0.5
        y = supply[1] - 1
        z = supply[2] + 0.5
        wx = 1
        h = 1
        wz = 1
        d = true
        lw = 3

        RenderLibV2.drawEspBoxV2(x, y, z, wx, h, wz, ...getRGB1(Settings.SupplyWaypointColor), 1, d, lw);
    }
}), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.SupplyWaypoints && Kuudra.getPhase() == 1);