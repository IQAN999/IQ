import { registerWhen } from "./reg";
import Skyblock from "../../BloomCore/Skyblock";

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
                        ChatLib.chat("Kuudra phase detected: 0 Start")
                        this.phase = 0 
                        break
                    // phase 1 (supply)
                    case msg.includes("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!"):
                        ChatLib.chat("Kuudra phase detected: 1 Supply")
                        this.phase = 1
                        break
                    // phase 2 (build)
                    case msg.includes("[NPC] Elle: OMG! Great work collecting my supplies!"):
                        ChatLib.chat("Kuudra phase detected: 2 Build")
                        this.phase = 2
                        break
                    // phase 3 (eaten)
                    case msg.includes("[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!"):
                        ChatLib.chat("Kuudra phase detected: Eaten")
                        this.phase = 2
                        break
                    // phase 4 (stun)
                    case msg.includes("has been eaten by Kuudra!"):
                        if(this.phase == 3 && !msg.includes("Elle")) { 
                            ChatLib.chat("Kuudra phase detected: Stun")
                            this.phase = 4 
                        }
                        
                        break
                    // phase 5 (hit phase)
                    case msg.includes("destroyed one of Kuudra's pods!"):
                        ChatLib.chat("Kuudra phase detected: Hit Phase")
                        if(this.phase == 4) this.phase = 5
                        break
                    // phase 6 (skip)
                    case msg.includes("[NPC] Elle: POW! SURELY THAT'S IT! I don't think he has any more in him!"):
                        ChatLib.chat("Kuudra phase detected: Skip")
                        this.phase = 6;
                        break
                    // phase 8 (run ends)
                    case msg.includes("KUUDRA DOWN!") || msg.includes("DEFEAT"):
                        ChatLib.chat("Kuudra phase detected: 8 Run ends")
                        this.phase = 8;
                        break
                }
            }).setCriteria("${msg}"), () => Skyblock.subArea === "Kuudra's Hollow")

            // phase 7 (dps)
            registerWhen(register("tick", () => {
                if(Math.round(Player.getY()) < 10 && this.phase == 6){
                    this.phase = 7
                    ChatLib.chat("Kuudra phase detected: 7 dps")
                } 
            }), () => Skyblock.subArea === "Kuudra's Hollow")
        
    }

    // reset all variables
    reset() {
        this.phase = false
    }

    // get kuudra phase
    getPhase() { return this.phase }

}

export default new Kuudra;