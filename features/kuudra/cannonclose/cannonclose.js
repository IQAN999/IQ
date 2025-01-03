import Settings from "../../../config"
import Skyblock from "../../../../BloomCore/Skyblock"
import { registerWhen } from "../../../utils/reg";

registerWhen(register("chat", () => {
    setTimeout(() => {
        if (!Client.isInGui()) return
        Client.currentGui.close()
    }, 100);
}).setCriteria('You purchased Human Cannonball!'), () => Settings.CannonClose && Skyblock.subArea === "Kuudra's Hollow")