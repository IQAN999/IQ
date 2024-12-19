import Settings from "../../../config"
import Kuudra from "../../../utils/Kuudra"
import Skyblock from "../../../../BloomCore/Skyblock"
import { registerWhen } from "../../../utils/reg"
import renderBeaconBeam from "../../../../BeaconBeam"

let SupplyPlacePos = [];

// r, g, b, a
pilleNormalCollor = [200/255, 200/255, 200/255, 0.7] 
pilleNoPreCollor = [0, 255/255, 0, 0.7]

registerWhen(register("worldLoad", () => {
    SupplyPlacePos = [
        {
            "pos" : [-98, 78.125, -112.9375], // shop
            "noPreValue" : 7
        },
        {
            "pos" : [-110, 78.125, -106], // xc
            "noPreValue" : 2
        },
        {
            "pos" : [-106, 78.125, -99.0625], // slash
            "noPreValue" : 4
        },
        {
            "pos" : [-94, 78.125, -106], // tri
            "noPreValue" : 6
        },
        {
            "pos" : [-98, 78.125, -99.0625], // equals
            "noPreValue" : 5
        },
        {
            "pos" : [-106, 78.125, -112.9375], // x
            "noPreValue" : 1
        }
    ];
}), () => Settings.PilleWaypoints);

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

registerWhen(register("tick", () => {
    const stands = World.getAllEntitiesOfType(ArmorStand.class);

    const placedPiles = stands.filter(stand => stand.getName().includes("✓ SUPPLIES RECEIVED ✓"));

    placedPiles.forEach(stand => {
        SupplyPlacePos.forEach((pille, keyInArray) => {
            if(pille.pos[0] == stand.x && pille.pos[1] == stand.y && pille.pos[2] == stand.z){
                SupplyPlacePos.splice(keyInArray, 1)
            }
        })
    });
}), () => Settings.PilleWaypoints && Skyblock.subArea == "Kuudra's Hollow" && Kuudra.getPhase() == 1)

registerWhen(register("renderWorld", () => {
    SupplyPlacePos.forEach(pille => {

        pilleCollor = Kuudra.getMissingPre() == pille.noPreValue ? pilleNoPreCollor : pilleNormalCollor

        renderBeaconBeam(
            ...pille.pos,
            ...pilleCollor,
            true,
            100
        )
    });
}), () => Settings.PilleWaypoints && Skyblock.subArea === "Kuudra's Hollow" && Kuudra.getPhase() == 1);