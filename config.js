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
    description: "Cancelamento de perolas atiradas contra o chão, muito pog!",
    category: "Geral",
    subcategory: "Cheats"
  })
  PearlCancel = false

  @SwitchProperty({
    name: "Pearl Refill",
    description: "Refilla as ender pearls do inventario automaticamente!",
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
  @SwitchProperty({
    name: "Remover Nametags dos Mobs da Kuudra",
    description: "É isso ai que vc entendeu mano, tem muito oq explicar não",
    category: "Kuudra"
  })
  HideMobNametags = false

  @SwitchProperty({
    name: "Highlight nos Parça + Fresh diferentinho",
    description: "O nome já ta explicando pora",
    category: "Kuudra"
  })
  TeamHighlight = false

  @SwitchProperty({
    name: "HP da Kuudra na Bossbar",
    description: "Ajudando os pobres coitados que stunnan",
    category: "Kuudra"
  })
  KuudraHP = false

  @SwitchProperty({
    name: "Aviso de roubo de supply",
    description: "Avisa quando um salafrário está pegando o mesmo supply que você",
    category: "Kuudra"
  })
  AlreadyPicking = false

  @SwitchProperty({
    name: "Dano do Rend",
    description: "Mostra pra sua party o quão foda ou fraco vc é solando a kuudra",
    category: "Kuudra"
  })
  RendDamage = false

  @SwitchProperty({
    name: "Onde a Kuudra Spawna",
    description: "Avisa o lado que a kuudra vai spawnar na P4",
    category: "Kuudra"
  })
  Direction = false

  @SwitchProperty({
    name: "Lag Tracker",
    description: "Utilize isso caso vc ache q esvaziar o menu de pets e o storage faz lagar menos kkkkkkkkkkkkk",
    category: "Kuudra"
  })
  LagTracker = false

  //Kuudra/Custom Splits
  @ButtonProperty({
    name: "Custom Splits",
    description: "Abrir o menu de configuração dos splits da kuudra",
    category: "Kuudra",
    subcategory: "Custom Splits",
    placeholder: "Abrir GUI!"
  })
  MovePowderGui() {
    ChatLib.command("iqsplits", true)
  };

  // cheats
  @SwitchProperty({
    name: "Auto BM",
    description: "Compra os balistos mecanicos automaticamente",
    category: "Kuudra",
    subcategory: "Cheats"
  })
  AutoBM = false

  @SwitchProperty({
    name: "Auto Cannon Close",
    description: "Fecha a GUI automaticamente após comprar o human cannonball",
    category: "Kuudra",
    subcategory: "Cheats"
  })
  CannonClose = false

  constructor() {
    this.initialize(this);
    this.setCategoryDescription("Geral", `&d&lFunções Gerais`);
    this.setCategoryDescription("Kuudra", "&d&lFunções da Kuudra")
  }
}
export default new Settings();