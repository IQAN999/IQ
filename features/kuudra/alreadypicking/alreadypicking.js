import Settings from "../../../config"
import { registerWhen } from "../../../utils/reg";
import Skyblock from "../../../../BloomCore/Skyblock";

registerWhen(register("chat", () => {
    Client.showTitle("&cLadrão Detectado!", "", 0, 25, 0)
}).setCriteria("Someone else is currently trying to pick up these supplies!"), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.AlreadyPicking);