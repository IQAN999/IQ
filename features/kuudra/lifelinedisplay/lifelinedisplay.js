import Settings from "../../../config"
import Skyblock from "../../../../BloomCore/Skyblock"
import { registerWhen } from "../../../utils/reg"
import data from "../../../utils/data"
import ScalableGui from "../../../../BloomCore/utils/ScalableGui";

let lifelineInfo = new Text("", 200, 100).setShadow(true).setAlign("left")

registerWhen(register("renderOverlay", () => {

    const maxHp = Player.asPlayerMP().getMaxHP();
    const currentHp = Player.asPlayerMP().getHP();

    if (currentHp / maxHp < 0.2) {
        lifelineInfo.setString(`&6&lLifeline &a&lON`);
    } else {
        lifelineInfo.setString(`&6&lLifeline &c&lOFF`);
    }

    lifelineInfo.setScale(data.lifelinedisplay.scale)
    lifelineInfo.draw(data.lifelinedisplay.x, data.lifelinedisplay.y)

}), () => Settings.LifelineDisplay && Skyblock.subArea === "Kuudra's Hollow")


const editGui = new ScalableGui(data, data.lifelinedisplay).setCommand("movelifelinedisplay")
guiString = new Text(`&6&lLifeline &a&lON`, 200, 100).setShadow(true).setAlign("left")

editGui.onRender(() => {
    if(Skyblock.subArea != "Kuudra's Hollow"){
        guiString.setScale(editGui.getScale())
        guiString.draw(editGui.getX(), editGui.getY())
    }
})

