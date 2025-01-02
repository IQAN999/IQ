import Settings from "../../../config";
import Skyblock from "../../../../BloomCore/Skyblock";
import { data } from "../../../utils/data"
import ScalableGui from "../../../../BloomCore/utils/ScalableGui";
import Kuudra from "../../../utils/Kuudra";
import { registerWhen } from "../../../utils/reg";

let supplyInfo = new Text("", 200, 100).setShadow(true).setAlign("left")
let places = []

registerWhen(register("chat", (player, supply, event) => {

    time = Date.now() - Kuudra.getTime("supplies")
    color = "§f§l"
    
    if(time >= 24000 && time < 26000) {
        color = "§9§l"
    }else if(time >= 26000 && time < 28000){
        color = "§a§l"
    }else if(time >= 28000 && time < 30000){
        color = "§2§l"
    }else if(time >= 30000 && time < 32000){
        color = "§e§l"
    }else if(time > 32000){
        color = "§c§l"
    }

    time = (time/1000).toFixed(2)

    splitArray = player.split(" ")
    if(splitArray.length==3){
        if(String(splitArray[0]).includes("VIP")) {
            player = "§a" + splitArray[1]
        }else if(String(splitArray[0]).includes("b[MVP")){
            player = "§b" + splitArray[1]
        }else if(String(splitArray[0]).includes("6[MVP")){
            player = "§6" + splitArray[1]
        }else if(String(splitArray[0]).includes("YOUTUBE")){
            player = "§c" + splitArray[1]
        }
    } else if(splitArray.length==2){
        player = "§7" + String(splitArray[0])
    } else {
        ChatLib.chat(`§d[IQ] §fSupplyTimes - Cannot find player: [${splitArray}]`)
    }
        
    places.push(
        {
            "player" : `${player}`,
            "supply" : supply,
            "time" : `${color}${time}s`
        }
    )
}).setCriteria("${player}&a&lrecovered one of Elle's supplies! ${supply}"), () => Settings.SupplyTimes && Skyblock.subArea === "Kuudra's Hollow" && Kuudra.getPhase() != 0)

registerWhen(register("renderOverlay", () => {
        drawString = ""

        places.forEach((place) => {
            drawString = drawString + `${place.player} ${place.supply} ${place.time}\n`;
        })

        supplyInfo.setString(drawString)
        supplyInfo.setScale(data.supplytimes.scale)
        supplyInfo.draw(data.supplytimes.x, data.supplytimes.y)

}), () => Settings.SupplyTimes && Skyblock.subArea === "Kuudra's Hollow" && Kuudra.getPhase() != 0)

registerWhen(register("WorldLoad", () => {
    places = []
}), () => Skyblock.subArea === "Kuudra's Hollow")

const editGui = new ScalableGui(data, data.supplytimes).setCommand("movesupplytimes")
guiString = new Text(`&aPlayerName &8(0/6) &l&90.00s`, 200, 100).setShadow(true).setAlign("left")

editGui.onRender(() => {
    if(places.length == 0){
        guiString.setScale(editGui.getScale())
        guiString.draw(editGui.getX(), editGui.getY())
    }
})