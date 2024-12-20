import Settings from "../../../config";
import Skyblock from "../../../../BloomCore/Skyblock";
import { registerWhen } from "../../../utils/reg";

/**
 * Variables used to track and display Kuudra HP and entity.
 */
let cubes = undefined;
let percentHP = new Text(
  `§lWaiting`,
  Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(`§lWaiting`) / 2,
  10
);
let currentHP = 0;

export function getKuudraHP() {
  return currentHP;
}

/**
 * Tracks Kuudra's HP and spawn location if entering phase 4.
 */
registerWhen(
  register("tick", () => {
    cubes = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityMagmaCube").class);

    // Find Kuudra based off size and HP
    const kuudra = cubes.find(
      (cube) => cube.getWidth().toFixed(1) == 15.3 && cube.getEntity().func_110143_aJ() <= 100_000
    );
    if (kuudra !== undefined) {
      currentHP = kuudra.getEntity().func_110143_aJ().toFixed(0);

      // Boss Health Bar Percentage
      const percent = `${((currentHP / 100_000) * 100).toFixed(2)}%`;
      percentHP = new Text("§l" + percent, Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(percent) / 1.8, 11);
    }
  }), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.KuudraHP);

/**
 * Renders Kuudra's percent HP.
 */
registerWhen(
  register("renderOverlay", () => {
    percentHP.draw();
  }), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.KuudraHP);

/**
 * Reset Kuudra's UUID on world exit.
 */
registerWhen(register("worldUnload", () => {
  percentHP = new Text(
    `§lWaiting`,
    Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(`§lWaiting`) / 2,
    10
  );
}), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.KuudraHP)