import Skyblock from '../../../../BloomCore/Skyblock';
import Settings from '../../../config';
import { registerWhen } from "../../../utils/reg";

let kuudra = undefined;
let kuudraLastHP = 100_000;
let p4Start = undefined
let threshold = 20_000_000;

function formatNumber(num) {
    if (isNaN(num) || num === 0) return "0";
    
    const sign = Math.sign(num);
    const absNum = Math.abs(num);

    if (absNum < 1) return (sign === -1 ? '-' : '') + absNum.toFixed(2);

    const abbrev = ["", "k", "m", "b", "t", "q", "Q"];
    const index = Math.floor(Math.log10(absNum) / 3);
  
    const formattedNumber = ((sign === -1 ? -1 : 1) * absNum / Math.pow(10, index * 3)).toFixed(2) + abbrev[index];

    if (Number.isInteger(absNum) && absNum < 1_000) return String(parseInt(formattedNumber));
    return formattedNumber;
};

registerWhen(register('worldLoad', () => {
    kuudra = undefined;
    kuudraLastHP = 100_000;
    p4Start = undefined
}), () => Skyblock.subArea == "Kuudra's Hollow" && Settings.RendDamage)

registerWhen(register('step', () => {
    if(Math.round(Player.getY()) < 10 && p4Start == undefined){
        p4Start = new Date().getTime()
    }

    kuudra = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class).find((cube) => cube?.getWidth()?.toFixed(1) == 15.3 && cube?.getEntity()?.func_110143_aJ() <= 100_000);

    if (!kuudra) return;

    if (kuudra.getEntity()?.func_110143_aJ() > 25_000 || Player.getY() > 30) return;
    
    if (kuudraLastHP > kuudra.getEntity()?.func_110143_aJ() && kuudraLastHP - kuudra.getEntity()?.func_110143_aJ() > threshold / 12_000 && kuudraLastHP - kuudra.getEntity()?.func_110143_aJ() < 26_000) ChatLib.chat(`Someone pulled for §a${formatNumber(((kuudraLastHP - kuudra.getEntity()?.func_110143_aJ()) * 12000).toFixed(0))} §rdamage at §a${((new Date().getTime() - p4Start) / 1000).toFixed(2)}s§r.`)

    kuudraLastHP = kuudra.getEntity()?.func_110143_aJ();
}).setFps(100), () => Skyblock.subArea == "Kuudra's Hollow" && Settings.RendDamage)





