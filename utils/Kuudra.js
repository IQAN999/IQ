import { registerWhen } from "./reg";
import Skyblock from "../../BloomCore/Skyblock";
import { extractIGN } from "./functions";

class Kuudra {

    constructor() {
        this.reset();

        // reset all variables on worldload
        registerWhen(register("worldLoad", () =>{
            this.reset();
        }), () => Skyblock.subArea === "Kuudra's Hollow")

        // CAPTURE ALL KUUDRA PHASES
            registerWhen(register("chat", (msg) => {

                switch(true) {
                    // phase 0 (before kuudra starts)
                    case msg.includes("[NPC] Elle: Talk with me to begin!"):
                        // ChatLib.chat("Kuudra phase detected: 0 Start")
                        this.phase = 0 
                        break
                    // phase 1 (supply)
                    case msg.includes("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!"):
                        // ChatLib.chat("Kuudra phase detected: 1 Supply")
                        this.phase = 1
                        this.times.supplies = Date.now()
                        break
                    // phase 2 (build)
                    case msg.includes("[NPC] Elle: OMG! Great work collecting my supplies!"):
                        // ChatLib.chat("Kuudra phase detected: 2 Build")
                        this.phase = 2
                        this.times.build = Date.now()
                        break
                    // phase 3 (eaten)
                    case msg.includes("[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!"):
                        // ChatLib.chat("Kuudra phase detected: Eaten")
                        this.phase = 3
                        this.times.eaten = Date.now()
                        break
                    // phase 4 (stun)
                    case msg.includes("has been eaten by Kuudra!"):
                        if(this.phase == 3 && !msg.includes("Elle")) { 
                            // ChatLib.chat("Kuudra phase detected: Stun")
                            this.phase = 4 
                            this.times.stun = Date.now()
                        }
                        
                        break
                    // phase 5 (hit phase)
                    case msg.includes("destroyed one of Kuudra's pods!"):
                        // ChatLib.chat("Kuudra phase detected: Hit Phase")
                        if(this.phase == 4) this.phase = 5
                        this.times.dps = Date.now()
                        break
                    // phase 6 (skip)
                    case msg.includes("[NPC] Elle: POW! SURELY THAT'S IT! I don't think he has any more in him!"):
                        // ChatLib.chat("Kuudra phase detected: Skip")
                        this.phase = 6;
                        this.times.skip = Date.now()
                        break
                    // phase 8 (run ends)
                    case (msg.includes("KUUDRA DOWN!") || msg.includes("DEFEAT")):
                        // ChatLib.chat("Kuudra phase detected: 8 Run ends")
                        this.phase = 8;
                        break
                }
            }).setCriteria("${msg}"), () => Skyblock.subArea == "Kuudra's Hollow")

            // phase 7 (dps)
            registerWhen(register("tick", () => {
                if(Math.round(Player.getY()) < 10 && this.phase == 6){
                    this.phase = 7
                    this.times.kill = Date.now()
                    // ChatLib.chat("Kuudra phase detected: 7 dps")
                } 
            }), () => Skyblock.subArea == "Kuudra's Hollow")
        
        // CAPTURING NO PRE MESSAGE
        registerWhen(register("chat", (supply) => {
            const pres = [
                {"name" : "x", "value" : 1 },
                {"name" : "xcannon", "value" : 2 },
                {"name" : "x cannon", "value" : 2 },
                {"name" : "square", "value" : 3 },
                {"name" : "slash", "value" : 4 },
                {"name" : "equals", "value" : 5 },
                {"name" : "triangle", "value" : 6 },
                {"name" : "shop", "value" : 7 },
            ]

            pres.forEach((pre) => {
                chatNoPre = supply.toLowerCase()
                if (pre.name == chatNoPre) this.setMissingPre(pre.value)
            })
        }).setCriteria("Party > ${*}: No ${supply}!"), () => Skyblock.subArea == "Kuudra's Hollow" && this.getPhase() == 1)

        // CAPTURING FRESHED PLAYERS DURING BUILD
        registerWhen(register("chat", (player) => {
          const disectedName = extractIGN(player)
        
          if (!disectedName) return;
        
          this.addFresh(disectedName, Date.now() + 10000)
        
          setTimeout(() => this.deleteFresh(disectedName), 10000);
        }).setCriteria("Party > ${player}: FRESH").setStart(), () => Skyblock.subArea == "Kuudra's Hollow")
    }

    // reset all variables
    reset() {
        this.phase = false
        this.missingPre = false
        this.fresh = {}
        this.times = {
            "supplies" : 0,
            "build" : 0,
            "eaten" : 0,
            "stun" : 0,
            "dps" : 0,
            "skip" : 0,
            "kill" :0,
            "overall" :0
        }
    }

    // get kuudra phase
    getPhase() { return this.phase }

    // set missing pre 
    setMissingPre(pre){
        if(this.missingPre == false) {
            this.missingPre = pre
        } 
    }

    // get missing pre
    getMissingPre() { return this.missingPre }

    // add a new player as fresh
    addFresh(name, timeToFinish){
        this.fresh[name] = timeToFinish
    }

    // add a new player as fresh
    deleteFresh(name){
        if(this.fresh.hasOwnProperty(name)) { delete this.fresh[name]}
    }

    // get fresh
    getFresh() { return this.fresh }

    // get time
    getTime(name) {return this.times[name]}

}

export default new Kuudra;