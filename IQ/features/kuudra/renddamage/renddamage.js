import Skyblock from '../../../../BloomCore/Skyblock';
import Settings from '../../../config';
import { registerWhen } from "../../../utils/reg";

let kuudra = undefined;
let kuudraLastHP = 24999;
let p4Start = false

function formatHealth(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + 'b';  
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'm';  
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + 'k';  
    } else {
        return number.toFixed(2);
    }
}

function formatDamage(i) {
    if ( i >= 1666 && i <= 4166) return `&c`; // 20M-40M
    if ( i >= 4166 && i <= 7291) return `&e`; // 40M-70M
    if ( i > 7291 ) return `&a`; //70M+
    return `&f`;
}

registerWhen(register('worldLoad', () => {
    kuudra = undefined;
    kuudraLastHP = 24999;
    p4Start = false
}), () => Skyblock.subArea == "Kuudra's Hollow" && Settings.RendDamage)

registerWhen(register('packetReceived', () => {
    if(Math.round(Player.getY()) < 10 && !p4Start){
        p4Start = new Date().getTime()
    }

    kuudra = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find((cube) => cube?.getWidth()?.toFixed(1) == 15.3 && cube?.getEntity()?.func_110143_aJ() <= 100_000);

    if (!kuudra) return;

    kuudraHP = kuudra.getEntity().func_110143_aJ().toFixed(0)

    if (kuudraHP > 25_000 || Player.getY() > 30) return;

    let diff = kuudraLastHP - kuudraHP;
    
    if (diff > 1666) {
        ChatLib.chat(`&d[IQ] &fSomeone pulled for §a${formatDamage(diff)}${formatHealth(diff * 9600)} §rdamage at §a${((new Date().getTime() - p4Start) / 1000).toFixed(2)}s§r.`)
        kuudraLastHP = kuudra.getEntity().func_110143_aJ().toFixed(0);
        return;
    }
    
    kuudraLastHP = kuudra.getEntity()?.func_110143_aJ();
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")), () => Skyblock.subArea == "Kuudra's Hollow" && Settings.RendDamage)





