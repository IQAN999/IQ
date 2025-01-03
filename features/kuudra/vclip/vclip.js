import Settings from "../../../config"
import {registerWhen} from "../../../utils/reg"
import Skyblock from "../../../../BloomCore/Skyblock"
import Kuudra from "../../../utils/Kuudra"

const S12PacketEntityVelocity = Java.type("net.minecraft.network.play.server.S12PacketEntityVelocity")

registerWhen(register("tick", () => {
    if (!Player.getPlayer().func_180799_ab()) return
    Player.getPlayer().func_70107_b(Player.getX(), Player.getY() - 30, Player.getZ())
    const veloPacket = register("packetReceived", (packet, event) => {
        if (Player.getPlayer().func_145782_y() !== packet.func_149412_c()) return;
        if (packet.func_149410_e() !== 16000) return;
        cancel(event)
    }).setFilteredClass(S12PacketEntityVelocity);
}), () => Settings.Vclip && Skyblock.subArea === "Kuudra's Hollow" && (Kuudra.getPhase() == 2 || Kuudra.getPhase() == 3 || Kuudra.getPhase() == 4));

registerWhen(register("renderOverlay", () => {
    let text = "§r§dVCLIP ON"
    let scale = 1.5
    Renderer.scale(scale)
    Renderer.drawStringWithShadow(text, (Renderer.screen.getWidth() / scale - Renderer.getStringWidth(text)) / 2, Renderer.screen.getHeight() / scale / 2 + 16)
}), () => Settings.Vclip && Skyblock.subArea === "Kuudra's Hollow" && (Kuudra.getPhase() == 2 || Kuudra.getPhase() == 3 || Kuudra.getPhase() == 4) )