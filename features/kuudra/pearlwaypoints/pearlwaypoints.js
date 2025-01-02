import { registerWhen } from "../../../utils/reg"
import Skyblock from "../../../../BloomCore/Skyblock"
import Settings from "../../../config"
import RenderLib from "../../../../RenderLib"
import RenderLibV2 from "../../../../RenderLibV2"
import Kuudra from "../../../utils/Kuudra"

const areas = [
    {
        "pos1" : [-142, -88],
        "pos2" : [-135, -82],
        "waypoints" : [
            { 
                "coords" : [-93, 127.5, -105], // tri 
                "rgb" : [0, 255, 255],
                "block" : [-142, 77, -87],
                "pre" : 6
            },
            { 
                "coords" : [-105, 99, -112], // x
                "rgb" : [0, 255, 255],
                "block" : [-142, 77, -87],
                "size" : 0.3,
                "pre" : 1
            },
            { 
                "coords" : [-97, 126, -111], // shop
                "rgb" : [0, 255, 255],
                "block" : [-142, 77, -87],
                "pre" : 7
            },
            { 
                "coords" : [-97, 102, -98], // =
                "rgb" : [0, 255, 255],
                "block" : [-142, 77, -87],
                "size" : 0.3,
                "pre" : 5
            },
            { 
                "coords" : [-105, 149, -98], // slash
                "rgb" : [0, 255, 255],
                "block" : [-142, 77, -87],
                "pre" : 4
            },
            { 
                "coords" : [-109, 151, -105], // xc
                "rgb" : [0, 255, 255],
                "block" : [-142, 77, -87],
                "pre" : 2
            }
        ],
        "areaName" : "square safe"
    },
    {
        "pos1" : [-143, -93],
        "pos2" : [-135, -88],
        "waypoints" : [
            { 
                "coords" : [-93, 107, -105], // tri 
                "rgb" : [0, 255, 255],
                "block" : [-141, 78, -91],
                "size" : 0.35,
                "pre" : 6
            },
            { 
                "coords" : [-105, 150, -111], // x
                "rgb" : [0, 255, 255],
                "block" : [-141, 78, -91],
                "size" : 0.5,
                "pre" : 1
            },
            { 
                "coords" : [-97, 105, -111], // shop
                "rgb" : [0, 255, 255],
                "block" : [-141, 78, -91],
                "size" : 0.35,
                "pre" : 7
            },
            { 
                "coords" : [-97, 97, -98], // =
                "rgb" : [0, 255, 255],
                "block" : [-141, 78, -91],
                "size" : 0.3,
                "pre" : 5
            },
            { 
                "coords" : [-105, 155, -98.5], // slash
                "rgb" : [0, 255, 255],
                "block" : [-141, 78, -91],
                "size" : 0.5,
                "pre" : 4
            },
            { 
                "coords" : [-109, 155, -105], // xc
                "rgb" : [0, 255, 255],
                "block" : [-141, 78, -91],
                "size" : 0.5,
                "pre" : 2
            }
        ],
        "areaName" : "square top"
    },
    {
        "pos1" : [-126, -104],
        "pos2" : [-140, -120],
        "waypoints" : [
            { 
                "coords" : [-109, 163, -105], // xc
                "rgb" : [255, 135, 0],
                "block" : [-131, 78, -115],
                "size" : 0.6
            },
            { 
                "coords" : [-109, 82.7, -105], // xc baixo
                "rgb" : [255, 135, 0],
                "size" : 0.2
            }
        ],
        "areaName" : "x cannon"
    },
    {
        "pos1" : [-150, -170],
        "pos2" : [-123, -134],
        "waypoints" : [
            { 
                "coords" : [-105, 151, -111], // x
                "rgb" : [255, 222, 89],
                "block" : [-135, 77, -139],
                "size" : 0.6
            },
            { 
                "coords" : [-129, 162, -113], // xc
                "rgb" : [255, 135, 0],
                "size" : 0.6
            },
            { 
                "coords" : [-134, 172, -125], // stair
                "rgb" : [255, 255, 255],
                "size" : 0.6
            },
            { 
                "coords" : [-142, 152, -79], // square
                "rgb" : [0, 255, 255],
                "size" : 0.6
            },
            { 
                "coords" : [-49, 121.5, -60], // x 70%
                "rgb" : [255, 222, 89],
                "size" : 0.8
            }
        ],
        "areaName" : "x"
    },
    {
        "pos1" : [-126, -120],
        "pos2" : [-138, -124],
        "waypoints" : [
            { 
                "coords" : [-109, 155, -105],// xc 38%
                "rgb" : [255, 255, 255],
                "block" : [-135, 76, -124],
                "size" : 0.6
            },
            { 
                "coords" : [-109, 87.15, -105], //xc 70
                "rgb" : [255, 255, 255],
                "size" : 0.25
            }
        ],
        "areaName" : "stair"
    },
    {
        "pos1" : [-127, -124],
        "pos2" : [-140, -133],
        "waypoints" : [
            { 
                "coords" : [-109, 157, -105], // xc 38%
                "rgb" : [255, 255, 255],
                "block" : [-135, 78, -129],
                "size" : 0.6
            },
            { 
                "coords" : [-109, 88.5, -105], // xc 70%
                "rgb" : [255, 255, 255],
                "size" : 0.3
            }
        ],
        "areaName" : "coal"
    },
    {
        "pos1" : [-94, -126],
        "pos2" : [-51, -161],
        "waypoints" : [
            { 
                "coords" : [-96, 157, -112], // xc 38%
                "rgb" : [255, 0, 0],
                "block" : [-86, 78, -129],
                "size" : 0.6
            },
            { 
                "coords" : [-96, 157, -112], // xc 38%
                "rgb" : [255, 0, 0],
                "block" : [-71, 79, -135],
                "size" : 0.6
            },
            { 
                "coords" : [-144, 107, -59], // shop 70%
                "rgb" : [255, 0, 0],
                "block" : [-76, 77.5, -137],
                "size" : 0.8
            }
        ],
        "areaName" : "shop"
    },
    {
        "pos1" : [-80, -126],
        "pos2" : [-50, -109],
        "waypoints" : [
            { 
                "coords" : [-93, 155, -105], // tri
                "rgb" : [255, 0, 255],
                "block" : [-68, 77, -123],
                "size" : 0.6
            },
            { 
                "coords" : [-121, 121, -120], // xc
                "rgb" : [255, 135, 0],
                "block" : [-69, 77, -123],
                "size" : 0.6
            },
            { 
                "coords" : [-74, 152, -134], // xc
                "rgb" : [255, 0, 0],
                "size" : 0.6
            }
        ],
        "areaName" : "tri"
    },
    {
        "pos1" : [-80, -108],
        "pos2" : [-45, -65],
        "waypoints" : [
            { 
                "coords" : [-97, 155, -98], // equals
                "rgb" : [0, 255, 0],
                "block" : [-66, 76, -87],
                "size" : 0.6
            },
            { 
                "coords" : [-76, 126, -134], // shop
                "rgb" : [255, 0, 0],
                "size" : 0.5
            },
            { 
                "coords" : [-97, 86, -98], // quals 70
                "rgb" : [0, 255, 0],
                "block" : [-66, 76, -89],
                "size" : 0.3
            }
        ],
        "areaName" : "equals"
    },
    {
        "pos1" : [-103, -85],
        "pos2" : [-125, -45],
        "waypoints" : [
            { 
                "coords" : [-105.5, 155, -98], // slash
                "rgb" : [0, 80, 255],
                "block" : [-113, 76.5, -69],
                "size" : 0.6
            },
            { 
                "coords" : [-139, 155, -88], // square
                "rgb" : [0, 255, 255],
                "size" : 0.5,
                "dontShowMissingPre" : 3
            },
            { 
                "coords" : [-133, 157, -131], // xc
                "rgb" : [255, 135, 0],
                "size" : 0.7,
                "dontShowMissingPre" : 2
            },
        ],
        "areaName" : "slash"
    },
]

let drawAreaPearlWaypoints = []

lastAreaChecked = {}

function verifyInArea(xPlayer, zPlayer, x1, z1, x2, z2) {
    // Calcular os limites da área (mínimo e máximo de X e Z)
    let minX = Math.min(x1, x2);
    let maxX = Math.max(x1, x2);
    let minZ = Math.min(z1, z2);
    let maxZ = Math.max(z1, z2);

    // Verificar se as coordenadas do jogador estão dentro da área
    if (xPlayer >= minX && xPlayer <= maxX && zPlayer >= minZ && zPlayer <= maxZ) {
        return true; // O jogador está dentro da área
    } else {
        return false; // O jogador está fora da área
    }
}

function resetLastAreaChecked(){
    lastAreaChecked = {
        "pos1" : [0, 0],
        "pos2" : [0, 0],
        "waypoints" : [
            { 
                "coords" : [0, 0, 0],
                "rgb" : [0, 0, 0]
            }
        ],
        "areaName" : ""
    }
    drawAreaPearlWaypoints = lastAreaChecked.waypoints
}

registerWhen(register("worldLoad", () => {
    let drawAreaPearlWaypoints = []
    resetLastAreaChecked()
}), () => Settings.PearlWaypoints)

registerWhen(register("tick", () => {

    if(Object.keys(lastAreaChecked).length === 0) return

    playerInArea = false
    let xPlayer = Player.getX()
    let zPlayer = Player.getZ()

    areas.forEach((area, positionInArray) => {
        check = verifyInArea(xPlayer, zPlayer, area.pos1[0], area.pos1[1], area.pos2[0], area.pos2[1])

        if(!verifyInArea(xPlayer, zPlayer, lastAreaChecked.pos1[0], lastAreaChecked.pos1[1], lastAreaChecked.pos2[0], lastAreaChecked.pos2[1])){
            if(check){
                drawAreaPearlWaypoints = area.waypoints
                lastAreaChecked = area
            }else{
                drawAreaPearlWaypoints = []
                resetLastAreaChecked()
            }
        }
    }) 
}), () => Settings.PearlWaypoints && Skyblock.subArea === "Kuudra's Hollow"  && Kuudra.getPhase() == 1)

registerWhen(register('renderWorld', () => {

    drawAreaPearlWaypoints.forEach((waypoint, positionInArray) => {
        size = "size" in waypoint ? waypoint.size : 0.4
        canDraw = true

        missingPre = Kuudra.getMissingPre();
        
        if(waypoint.hasOwnProperty("pre") &&  missingPre != false){
            if(waypoint.pre != missingPre){
                canDraw = false
            }
        }

        if(waypoint.hasOwnProperty("dontShowMissingPre") && missingPre == waypoint.dontShowMissingPre){
            canDraw = false
        }
        
        if(canDraw){
            RenderLib.drawSphere(
                waypoint.coords[0]-0.5, waypoint.coords[1], waypoint.coords[2]-0.5, 
                size, //radius
                20, //slices 
                20, // stacks
                0, // rotate
                0, // rotate
                0, // rotate
                waypoint.rgb[0]/255, waypoint.rgb[1]/255, waypoint.rgb[2]/255, 
                1, //alpha
                true, 
                true
            );

            if("block" in waypoint){
                wx = 1
                h = 1
                wz = 1
                d = false
                lw = 3
                rbgBlock = [waypoint.rgb[0]/255, waypoint.rgb[1]/255, waypoint.rgb[2]/255]
                RenderLibV2.drawEspBoxV2(waypoint.block[0]+ 0.5, waypoint.block[1], waypoint.block[2]+ 0.5, wx, h, wz, ...rbgBlock, 1, d, lw);
            }
        }        
    })

    // I know the arguments seem confusing at first, but everything is written down in the JSDoc
}), () => Settings.PearlWaypoints && Skyblock.subArea === "Kuudra's Hollow" && Kuudra.getPhase() == 1)