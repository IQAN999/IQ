const BOBBER_CLASS = Java.type("net.minecraft.entity.projectile.EntityFishHook").class;
const GIANT_CLASS = Java.type("net.minecraft.entity.monster.EntityGiantZombie").class;
import renderBeaconBeam from "../../../../BeaconBeam"
import { sleep } from "../../../utils/cooldown";

// Função para calcular a distância entre duas coordenadas no Minecraft
function calcularDistancia(x1, z1, x2, z2, y1, y2) {
    // Se y1 ou y2 não forem fornecidos, assume que y1 e y2 são iguais e ignora Y
    if (y1 === undefined || y2 === undefined) {
        // Calcula a distância apenas considerando X e Z
        const deltaX = x2 - x1;
        const deltaZ = z2 - z1;
        return Math.sqrt(deltaX * deltaX + deltaZ * deltaZ); // Distância no plano XZ
    } else {
        // Calcula a distância considerando X, Y e Z
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const deltaZ = z2 - z1;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ); // Distância 3D
    }
}

function isWithinDistance(x1, y1, z1, x2, y2, z2, maxDistance) {

    // Calculando a distância Euclidiana 3D
    const distance = Math.sqrt(
        Math.pow(x2 - x1, 2) +
        Math.pow(y2 - y1, 2) +
        Math.pow(z2 - z1, 2)
    );

    // Retorna true se a distância for menor ou igual ao valor máximo
    return distance <= maxDistance;
}

let bestSupply = {}
let bobber = {}
let holding = false
let key = false
let pulling = false

function addBestSupply(supplyPos, distance) {
    bestSupply[distance] = {
        "pos": supplyPos
    }
}

register("step", () => {
    holding = Player.getHeldItem();

    if(holding != "1xitem.fishingRod@0"){
        Client.getKeyBindFromDescription("key.use").setState(false)
    }
})


// register("renderTitle", (title, _, event) => {
//     if (!title.startsWith("§8[") || !title.endsWith("%§r")) return;

//     crateOverlay.setMessage(title);
//     cancel(event);
// });

register("step", () => {

    bestSupply = {}

    const entities = World.getAllEntitiesOfType(BOBBER_CLASS);
    const supplies = World.getAllEntitiesOfType(GIANT_CLASS)

    entities.forEach(entity => {
        bobber = {
            "pos": [entity.getX()-0.5, entity.getY(), entity.getZ()-0.5]
        }
    });

    supplies.forEach(supply => {
        playerPos = [Player.getX(), Player.getZ()]

        supplyPos = [
            supply.getRenderX() + (3.7 * Math.cos((supply.getYaw() + 130) * (Math.PI / 180))),
            supply.getRenderZ() + (3.7 * Math.sin((supply.getYaw() + 130) * (Math.PI / 180)))
        ]
        calcDistance = calcularDistancia(...playerPos, ...supplyPos)

        addBestSupply(supplyPos, calcDistance)
    });

    if (Object.keys(bobber).length > 0 && Object.keys(bestSupply).length > 0 && holding == "1xitem.fishingRod@0") {
        key = Math.min(...Object.keys(bestSupply));

        if (isWithinDistance(bobber.pos[0], bobber.pos[1], bobber.pos[2], bestSupply[key].pos[0], 74, bestSupply[key].pos[1], 2)) {

            if(holding == "1xitem.fishingRod@0" && !pulling){

                pulling = true

                Client.getKeyBindFromDescription("key.use").setState(true)

                setTimeout(() => {
                    if (holding == "1xitem.fishingRod@0") {
                        Client.getKeyBindFromDescription("key.use").setState(true)
                    }
                    
                    pulling = false
                }, 10);
            }
        }
    }
})
