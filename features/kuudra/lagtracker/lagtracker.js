import Settings from "../../../config";
import { registerWhen } from "../../../utils/reg";
import Skyblock from "../../../../BloomCore/Skyblock";

let timeServer = 0
let timeClient = 0

const server = register("packetReceived", (packet) => {
    if (packet.func_148890_d() > 0) return
    timeServer++
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)

const client = register("Tick", () => {
    if (timeServer !== 0) {
        timeClient += 1
    }
})

register("worldLoad", () => {
    if (Skyblock.subArea != "Kuudra's Hollow") {
        server.unregister()
        client.unregister()
    }
})

registerWhen(register("worldLoad", () => {
    server.unregister()
    client.unregister()
    timeServer = 0
    timeClient = 0
}), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.LagTracker)

registerWhen(register("Chat", () => {
    ChatLib.chat((timeClient - timeServer) / 20 + " seconds lost to server lag!")
    client.unregister()
    server.unregister()
    timeServer = 0
    timeClient = 0
    //ChatLib.say((timeClient - timeServer) / 20 + " seconds lost to server lag total!")
}).setCriteria("                               KUUDRA DOWN!"), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.LagTracker)

registerWhen(register("Chat", () => {
    client.register()
    server.register()
    timeServer = 0
    timeClient = 0
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!"), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.LagTracker)

registerWhen(register("renderOverlay", () => {
    if (timeClient == 0) return

    let lagColor = ""
    let whoIsLagging = ""
    let lagPercent = 0

    if (timeClient > timeServer) {
        whoIsLagging = "Server"
        lagPercent = (Math.abs(timeClient - timeServer) / timeClient) * 100
    } else {
        whoIsLagging = "Client"
        lagPercent = (Math.abs(timeServer - timeClient) / timeServer) * 100
    }

    if (lagPercent < 5) {
        lagColor = "§a"
    } else if (lagPercent > 5 && lagPercent < 10) {
        lagColor = "§6"
    } else if (lagPercent > 10 && lagPercent < 15) {
        lagColor = "§c"
    } else {
        lagColor = "§4"
    }

    lagPercent = parseInt(lagPercent)

    let text = new Text(`Client: ${timeClient} | Server: ${timeServer}\n${lagColor}${whoIsLagging} is Lagging ${lagPercent}%`).setShadow(true)
    text.draw(0 + 5, 0 + 5)
}), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.LagTracker)





