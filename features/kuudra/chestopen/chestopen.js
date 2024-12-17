import Settings from "../../../config"
import { registerWhen } from "../../../utils/reg"
import Skyblock from "../../../../BloomCore/Skyblock"

let RunComplete = false
let ChestOpened = false
let Ticks = 0
let PlayersFound = 0

function getKeys() {
    Keys = 0
    Items = Player.getInventory().getItems();
    Items.forEach(item => {
        let Name = item?.getName()
        if (!Name) return
        if (Name.includes("Kuudra Key")) {
            Keys++
        }
    });
    KeysLeft = Keys

    if (Keys == 1 && Settings.KeysReminder) {
        ChatLib.chat("§61x Key §cRemaining")
        Client.showTitle("", "§6One Key §cRemaining", 1, 2, 0)
        Client.showTitle("", "§6One Key §cRemaining", 1, 2, 0)
        playSound()

        setTimeout(() => {
            Client.showTitle("", "§6One Key §cRemaining", 10, 70, 8)
            Client.showTitle("", "§6One Key §cRemaining", 10, 70, 8)
            playSound()
        }, 150);
    }
}

function playSound() {
    setTimeout(() => {
        World.playSound("note.pling", 50, 1.29)

    }, 20);
    setTimeout(() => {
        World.playSound("note.pling", 50, 1.39)

    }, 60);
    setTimeout(() => {
        World.playSound("note.pling", 50, 1.19)

    }, 100);
    setTimeout(() => {
        World.playSound("note.pling", 50, 1.49)

    }, 150);
}

registerWhen(register("tick", () => {
    if (Ticks >= 1) {
        Ticks++
    }
}), () => Settings.ChestOpen && Skyblock.subArea === "Kuudra's Hollow")

registerWhen(register("worldUnload", () => {
    RunComplete = false
    ChestOpened = false
    PlayersFound = 0
    Ticks = 0
}), () => Settings.ChestOpen && Skyblock.subArea === "Kuudra's Hollow")

// Have to do different detections bc whether or not if you middle click or left click the packet will not contain the item as if you middle click it 
// the item will not be on your cursor so in that situation you have to check what slot you clicked then look for the correct item :thumbs_up:
// Also overly complicated this bc I can just check what slot the player clicked but idk

registerWhen(register("packetSent", (packet) => {
    if (!packet) return
    let ClickedType = packet.func_149542_h()
    //chat(ClickedType)
    if (!RunComplete) return
    if (ClickedType == 0 || ClickedType == 1 || ClickedType == 2) {
        let ItemName = packet.func_149546_g()?.func_82833_r()?.removeFormatting()
        let Slot = packet.func_149544_d()
        let ContainerName = Player.getContainer().getName()
        if (ItemName == "Open Reward Chest" && Slot == 31) {
            ChestOpened = ContainerName
        }
    } else if (ClickedType == 3) {
        let Slot = packet.func_149544_d()
        let Container = Player?.getContainer()
        let ContainerName = Container?.getName()
        let ItemName = Container.getStackInSlot(Slot).getName().removeFormatting()

        if (ItemName == "Open Reward Chest" && Slot == 31) {
            ChestOpened = ContainerName
        }
    } else {
        return
        //Console.log("Unable to detect click type, report this error." + ` Click: ${ClickedType}`)
    }
}).setFilteredClass(net.minecraft.network.play.client.C0EPacketClickWindow), () => Settings.ChestOpen && Skyblock.subArea === "Kuudra's Hollow")

// chest type detect + opened chest chat message
registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if (ChestOpened) {
        if (name == "fireworks.blast") {
            getKeys()
            if (vol == "20") {
                if (ChestOpened == "Free Chest") {
                    if (Settings.ChestOpen) ChatLib.command(`pc ☣ Opened: ${ChestOpened} | Keys: ${KeysLeft}`, false)
                } else if (ChestOpened == "Paid Chest") {
                    if (Settings.ChestOpen) ChatLib.command(`pc ✯ Opened: ${ChestOpened} | Keys: ${KeysLeft}`, false)
                }
            }
        }
    }
}), () => Settings.ChestOpen && Skyblock.subArea === "Kuudra's Hollow")

// run complete dectet + start tick counter
registerWhen(register("Chat", () => {
    RunComplete = true
    Ticks = 1
}).setCriteria("                               KUUDRA DOWN!"), () => Settings.ChestOpen && Skyblock.subArea === "Kuudra's Hollow")

// detect other players chest opened messages and auto requeue
// run complete dectet + start tick counter
registerWhen(register("chat", (rank, User, symbol, ChestOpened, KeysLeft) => {
    PlayersFound++

    if (PlayersFound < 4) {
        ChatLib.chat(`§5${User} §8(§7${PlayersFound}§8/§74§8)§f | §7Time: §e${(Ticks / 20).toFixed(1)}s`)
    } else if (PlayersFound == 4) {
        ChatLib.chat(`§5${User} §8(§a${PlayersFound}§8/§a4§8)§f | §7Time: §e${(Ticks / 20).toFixed(1)}s`)
        if (Settings.AutoRequeue) ChatLib.command("instancerequeue", false)
    }
}).setCriteria("Party > ${rank} ${User}: ${symbol} Opened: ${ChestOpened} | Keys: ${KeysLeft}"), () => Settings.ChestOpen && Skyblock.subArea === "Kuudra's Hollow")
// I have to make this regex so it doesn't break if people copy and paste the msg but i really cba
// Also it will prob break if someone is a non but I've genuinely never seen a non in my infernal kuudra parties :shrug:




