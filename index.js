import settings from "./config";

// Guis
import splits from "./features/kuudra/splits/splitsgui";

const modules = [
  // General
    // General
  { path: "./features/general/manadrainnotify/manadrainnotify" },
    // Cheat
  { path: "./features/general/pearlcancel/pearlcancel" },
  { path: "./features/general/pearlrefill/pearlrefill" },

  // Kuudra
  { path: "./features/kuudra/lifelinedisplay/lifelinedisplay" },
  { path: "./features/kuudra/supplytimes/supplytimes" },
  { path: "./features/kuudra/supplywaypoints/supplywaypoints" },
  { path: "./features/kuudra/pillewaypoints/pillewaypoints" },
  { path: "./features/kuudra/pearlwaypoints/pearlwaypoints" },
  { path: "./features/kuudra/buildoverlay/buildoverlay" },
  { path: "./features/kuudra/teamhighlight/teamhighlight" },
  { path: "./features/kuudra/hidemobnametags/hidemobnametags" },
  { path: "./features/kuudra/kuudrahp/kuudrahp" },
  { path: "./features/kuudra/alreadypicking/alreadypicking" },
  { path: "./features/kuudra/splits/splits" },
  { path: "./features/kuudra/direction/direction" },
  { path: "./features/kuudra/lagtracker/lagtracker" },
  { path: "./features/kuudra/renddamage/renddamage" },
  { path: "./features/kuudra/chestopen/chestopen" },
    // Cheat
  { path: "./features/kuudra/autobm/autobm" },
  { path: "./features/kuudra/cannonclose/cannonclose" },
  { path: "./features/kuudra/vclip/vclip" },
];

const loadModules = () => {
  let total = 0;

  for (const module of modules) {
    const { path, name } = module;
    const start = Date.now();
    try {
      require(path);
      const end = Date.now();
      const elapsed = end - start;
      total += elapsed;
      //ChatLib.chat(`&a${path} &floaded, took &c${elapsed}ms`);
    } catch (e) {
      ChatLib.chat(`&cError loading ${name} module: ${e}`);
    }
  }

  //ChatLib.chat(`&lAll features loaded, total loading time: ${total}ms`);
  
  ChatLib.chat("");
  ChatLib.chat("&d&lIQ LOADED &f&lTYPE &b&l/IQ &f&lTO OPEN GUI");
  ChatLib.chat("&f&lVISIT &c&lXVIDEOS.COM &f&lFOR NEW UPDATES!");
  ChatLib.chat("");
};

// Load All Modules
loadModules()

// Commands
register("command", () => { settings.openGUI(); return; }).setCommandName(`iq`, true)
register("command", () => splits.openGUI()).setName("iqsplits");