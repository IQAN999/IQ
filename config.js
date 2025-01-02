import { @Vigilant, @SwitchProperty, @TextProperty, @CheckboxProperty, @ButtonProperty, @SelectorProperty, @SliderProperty, @ColorProperty, @PercentSliderProperty, @DecimalSliderProperty, @ParagraphProperty, Color} from  "../Vigilance/index"
import { version } from "./utils/constants"

@Vigilant("IQ", `§d§l[IQ-v${version}]§r by IQAN`, {
  getCategoryComparator: () => (a, b) => {
    const categories = ["General", "Kuudra"]
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
  getSubcategoryComparator: () => (a, b) => {
    // These function examples will sort the subcategories by the order in the array
    const subcategories = ["General", "P1", "P2", "P3", "P4", "Cheats"];

    return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
        subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
  },
  getPropertyComparator: () => (a, b) => {
    // And this will put the properties in the order we want them to appear.
    const names = [
      "Supply Times", "Move Supply Times",
      "Lifeline Display", "Move Lifeline Display"
    ];

    return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
  }
})
class Settings {

  // General
    // General
    @SwitchProperty({
      name: "Mana Drain Notify",
      description: "Say how much mana you drained in party chat",
      category: "General",
      subcategory: "General"
    })
    ManaDrainNotify = false
    
    //Cheats
    @SwitchProperty({
      name: "Pearl Cancel",
      description: "Pearl cancel interact",
      category: "General",
      subcategory: "Cheats"
    })
    PearlCancel = false

    @SwitchProperty({
      name: "Pearl Refill",
      description: "Auto refill pearls from your sacks",
      category: "General",
      subcategory: "Cheats"
    })
    PearlRefill = false

  // Kuudra

    // General
    @ButtonProperty({
      name: "Custom Splits",
      description: "Open custom splits menu",
      placeholder: "Open!",
      category: "Kuudra",
      subcategory: "General",
    })
    splitsGui() {
      ChatLib.command("iqsplits", true)
    };

    @SwitchProperty({
      name: "Hide Kuudra Mob Nametags",
      category: "Kuudra",
      subcategory: "General",
    })
    HideMobNametags = false

    @SwitchProperty({
      name: "Team Highlight",
      category: "Kuudra",
      subcategory: "General",
    })
    TeamHighlight = false

    @SwitchProperty({
      name: "BossBar Kuudra HP",
      category: "Kuudra",
      subcategory: "General",
    })
    KuudraHP = false

    @SwitchProperty({
      name: "Kuudra Server Lag Tracker",
      category: "Kuudra",
      subcategory: "General",
    })
    LagTracker = false

    @SwitchProperty({
      name: "Lifeline Display",
      description: "Displays lifeline status",
      category: "Kuudra",
      subcategory: "General"
    })
    LifelineDisplay = false
  
    @ButtonProperty({
      name: "Move Lifeline Display",
      category: "Kuudra",
      subcategory: "General",
      placeholder: "MOVE"
    })
    lifelineDisplayGui() {
      ChatLib.command("movelifelinedisplay", true);
    };

    // P1
    @SwitchProperty({
      name: "Supply Times",
      category: "Kuudra",
      subcategory: "P1"
    })
    SupplyTimes = false  

    @ButtonProperty({
      name: "Move Supply Times",
      category: "Kuudra",
      subcategory: "P1",
      placeholder: "MOVE"
    })
    moveSupplyTimesGui() {
      ChatLib.command("movesupplytimes", true);
    };

    @SwitchProperty({
      name: "Supply Waypoints",
      category: "Kuudra",
      subcategory: "P1"
    })
    SupplyWaypoints = false

    @ColorProperty({
      name: 'Supply Waypoint Color',
      description: `Sets the color for supplies`,
      category: 'Kuudra',
      subcategory: "P1"
    })
    SupplyWaypointColor = Color.GREEN

    @SwitchProperty({
      name: "Pearl Waypoints",
      category: "Kuudra",
      subcategory: "P1"
    })
    PearlWaypoints = false

    @SwitchProperty({
      name: "Pille Waypoints",
      category: "Kuudra",
      subcategory: "P1"
    })
    PilleWaypoints = false

    @SwitchProperty({
      name: "Supply Already Picking Alert",
      description: "Alert when other players is aready picking your supply",
      category: "Kuudra",
      subcategory: "P1"
    })
    AlreadyPicking = false

    // P2
    @SwitchProperty({
      name: "Build Overlay",
      category: "Kuudra",
      subcategory: "P2"
    })
    BuildOverlay = false

    // P4
    @SwitchProperty({
      name: "Kuudra Spawn Alert",
      description: "Alerts you kuudra spawn side",
      category: "Kuudra",
      subcategory: "P4"
    })
    Direction = false

    @SwitchProperty({
      name: "Rend Damage",
      description: "Track party rend damage",
      category: "Kuudra",
      subcategory: "P4"
    })
    RendDamage = false

    @SwitchProperty({
      name: "Key Reminder",
      description: "Alert when you have one key remaining",
      category: "Kuudra",
      subcategory: "P4"
    })
    KeyReminder = false

    @SwitchProperty({
      name: "Chest Open",
      description: "Opened chest party chat message [Required for auto requeue]",
      category: "Kuudra",
      subcategory: "P4"
    })
    ChestOpen = false

    @SwitchProperty({
      name: "Auto Requeue",
      description: "Automatic requeue kuudra run after detect all players chest open messages",
      category: "Kuudra",
      subcategory: "P4"
    })
    AutoRequeue = false

  // cheats
    @SwitchProperty({
      name: "Auto BM",
      description: "Auto buy ballista mechanic perk",
      category: "Kuudra",
      subcategory: "Cheats"
    })
    AutoBM = false

    @SwitchProperty({
      name: "Auto Cannon Close",
      description: "Auto close shop menu after buy human cannonball perk",
      category: "Kuudra",
      subcategory: "Cheats"
    })
    CannonClose = false

  constructor() {
    this.initialize(this);

    this.setCategoryDescription("Geral", `&d&lGeneral Options`);
    this.setCategoryDescription("Kuudra", "&d&lKuudra Options")

    this.addDependency("Auto Requeue", "Chest Open");
    this.addDependency("Supply Waypoint Color", "Supply Waypoints");

    this.addDependency("Move Supply Times", "Supply Times")
    this.addDependency("Move Lifeline Display", "Lifeline Display")
  }
}
export default new Settings();