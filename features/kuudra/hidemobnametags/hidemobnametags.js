import Settings from "../../../config";
import { registerWhen } from "../../../utils/reg";
import Skyblock from "../../../../BloomCore/Skyblock";

registerWhen(register("renderEntity", (entity, position, partialTicks, event) => {
    let entityName = entity.getName().removeFormatting();
  
    if (entityName.includes("[Lv") && entity.getClassName() === "EntityArmorStand") {
      cancel(event);
    }
  }), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.HideMobNametags)