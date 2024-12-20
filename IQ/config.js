import { @Vigilant, @SwitchProperty, @TextProperty, @CheckboxProperty, @ButtonProperty, @SelectorProperty, @SliderProperty, @ColorProperty, @PercentSliderProperty, @DecimalSliderProperty, @ParagraphProperty, Color} from  "../Vigilance/index"
import { version } from "./utils/constants"

@Vigilant("IQ", `§d§l[IQ-v${version}]§r by IQAN`, {
  getCategoryComparator: () => (a, b) => {
    const categories = ["Geral", "Kuudra"]
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  }
})
class Settings {
  // @SliderProperty({
  //   name: "Draw Chat Waypoints",
  //   description: "Creates waypoints taken from chat messages in patcher sendcoords format and how long they should stay (in seconds)\n&cTurned off at 0",
  //   min: 0,
  //   max: 160,
  //   category: "General"
  // })
  // waypoint = 0;

  // @ColorProperty({
  //   name: 'Waypoint Color',
  //   description: `Sets the color for waypoints`,
  //   category: 'General'
  // })
  // waypointColor = Color.MAGENTA

  // @SelectorProperty({
  //   name: "Chat Type Waypoint Rendering",
  //   description: "Select where to look for chat waypoints",
  //   category: "General",
  //   options: ["All", "Party Only"]
  // })
  // waypointFrom = 0;

  // @SwitchProperty({
  //   name: "Party Commands",
  //   description: "Enables party commands, universally triggers on [.!?] commands",
  //   category: "General"
  // })
  // party = false

  // @ParagraphProperty({
  //   name: "Mob Highlight",
  //   description: "Draws hitboxes around inputted mob entity\n&3@see &cnet.minecraft.entity.(monster|passive|boss)&r\n&bExamples: `Zombie` or `Zombie-100|120|2k|45k` or `Zombie, Skeleton` or `Zombie-100, Cow`",
  //   category: "Bestiary"
  // })
  // rawMobList = "" 

  // General
  @SwitchProperty({
    name: "Pearl Cancel",
    description: "Pearl cancel interact",
    category: "Geral",
    subcategory: "Cheats"
  })
  PearlCancel = false

  @SwitchProperty({
    name: "Pearl Refill",
    description: "Auto refill pearls from your sacks",
    category: "Geral",
    subcategory: "Cheats"
  })
  PearlRefill = false

  // @SwitchProperty({
  //   name: "Auto Close Wardrobe",
  //   description: "Fecha sozinho o wardrobe após equipar uma armadura",
  //   category: "Geral",
  //   subcategory: "Cheats"
  // })
  // AutoCloseWardrobe = false

  // Kuudra

  //Kuudra/Custom Splits
  @ButtonProperty({
    name: "Custom Splits",
    description: "Open custom splits menu",
    category: "Kuudra",
    placeholder: "Open!"
  })
  MovePowderGui() {
    ChatLib.command("iqsplits", true)
  };

  @SwitchProperty({
    name: "Supply Waypoints",
    category: "Kuudra"
  })
  SupplyWaypoints = false

  @ColorProperty({
    name: 'Supply Waypoint Color',
    description: `Sets the color for supplies`,
    category: 'Kuudra'
  })
  SupplyWaypointColor = Color.GREEN

  @SwitchProperty({
    name: "Pearl Waypoints",
    category: "Kuudra"
  })
  PearlWaypoints = false

  @SwitchProperty({
    name: "Pille Waypoints",
    category: "Kuudra"
  })
  PilleWaypoints = false

  @SwitchProperty({
    name: "Build Overlay",
    category: "Kuudra"
  })
  BuildOverlay = false

  @SwitchProperty({
    name: "Hide Kuudra Mob Nametags",
    category: "Kuudra"
  })
  HideMobNametags = false

  @SwitchProperty({
    name: "Team Highlight",
    category: "Kuudra"
  })
  TeamHighlight = false

  @SwitchProperty({
    name: "BossBar Kuudra HP",
    category: "Kuudra"
  })
  KuudraHP = false

  @SwitchProperty({
    name: "Supply Already Picking Alert",
    description: "Alert when other players is aready picking your supply",
    category: "Kuudra"
  })
  AlreadyPicking = false

  @SwitchProperty({
    name: "Kuudra Server Lag Tracker",
    category: "Kuudra"
  })
  LagTracker = false

  @SwitchProperty({
    name: "Kuudra Spawn Alert",
    description: "Alerts you kuudra spawn side",
    category: "Kuudra",
    subcategory: "Phase 4"
  })
  Direction = false

  @SwitchProperty({
    name: "Rend Damage",
    description: "Track party rend damage",
    category: "Kuudra",
    subcategory: "Phase 4"
  })
  RendDamage = false

  @SwitchProperty({
    name: "Key Reminder",
    description: "Alert when you have one key remaining",
    category: "Kuudra",
    subcategory: "Phase 4"
  })
  KeyReminder = false

  @SwitchProperty({
    name: "Chest Open",
    description: "Opened chest party chat message [Required for auto requeue]",
    category: "Kuudra",
    subcategory: "Phase 4"
  })
  ChestOpen = false

  @SwitchProperty({
    name: "Auto Requeue",
    description: "Automatic requeue kuudra run after detect all players chest open messages",
    category: "Kuudra",
    subcategory: "Phase 4"
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
  }
}
export default new Settings();