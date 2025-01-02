export const version = (JSON.parse(FileLib.read("IQ", "metadata.json"))).version
export const PREFIX = "§r§d§l[IQ]§r"

export const BLACK = "§0";
export const DARK_BLUE = "§1";
export const DARK_GREEN = "§2";
export const DARK_AQUA = "§3";
export const DARK_RED = "§4";
export const DARK_PURPLE = "§5";
export const GOLD = "§6";
export const GRAY = "§7";
export const DARK_GRAY = "§8";
export const BLUE = "§9";
export const GREEN = "§a";
export const AQUA = "§b";
export const RED = "§c";
export const LIGHT_PURPLE = "§d";
export const YELLOW = "§e";
export const WHITE = "§f";

/**
 * Formatting codes.
 */
export const OBFUSCATED = "§k";
export const BOLD = "§l";
export const STRIKETHROUGH = "§m";
export const UNDERLINE = "§n";
export const ITALIC = "§o";
export const RESET = "§r";

export const HEADER = `${GRAY}[${GOLD}IQ${GRAY}] ${YELLOW}v${
    JSON.parse(FileLib.read("IQ", "metadata.json")).version
  }
  ${WHITE}Made By IQAN
  `;
export const LOGO = `${GRAY}[${GOLD}IQ${GRAY}] `;


/**
 * Minecraft Class Constants
 */
export const GIANT_CLASS = Java.type("net.minecraft.entity.monster.EntityGiantZombie").class
export const ENTITY_ARMOR_STAND = Java.type("net.minecraft.entity.item.EntityArmorStand").class
export const ENTITY_PLAYER = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP").class