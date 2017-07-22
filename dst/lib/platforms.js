"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
/**
 * magik.global gets a reference to a namespace in global state.
 * This allows our spell to know about previous times it was run.
 */
var platformState = magik.global('sitapati.platforms');
var layers = [];
// Short-hand function
var say = magik.dixit;
function platforms(glassLayers, radius, spacing) {
    if (glassLayers === void 0) { glassLayers = 5; }
    if (radius === void 0) { radius = 15; }
    if (spacing === void 0) { spacing = 4; }
    // Helper function to run commands as the player
    function run(cmd) {
        say(cmd);
        var sender = magik.getSender();
        magik.getPlugin().getServer().dispatchCommand(sender, cmd);
    }
    // Helper function that creates a new location spaced above the one passed in
    function addY(loc, y) {
        var newLoc = loc.clone();
        newLoc.setY(newLoc.getY() + y);
        return newLoc;
    }
    // If we haven't run ever, then initialise the layers
    if (!platformState.initialised) {
        say("Initialising...");
        // The base level will be created where we are standing, so clone the current player location
        platformState.initial_position = magik.hic().clone();
        // First we create a bedrock layer
        var bedrockLayerLocation = platformState.initial_position;
        makeLayer('bedrock', bedrockLayerLocation);
        // Now we create a lava layer
        var lavaLayerLocation = addY(bedrockLayerLocation, 1);
        makeLayer('lava', lavaLayerLocation);
        // Now we put the glass layers into an array of layers
        // Make the first glass layer
        platformState.layers = [addY(lavaLayerLocation, spacing)];
        // Now use a loop to place the other glass layers, each one spaced above the previous one
        for (var i = 1; i < glassLayers; i++) {
            platformState.layers.push(addY(layers[i - 1], spacing));
        }
        // OK, we're initialised
        platformState.initialised = true;
    }
    else {
        // No need to initialise, we already ran previously and have the layers
        magik.dixit("Already Initialised...");
    }
    // Here we (re)lay the glass layers. We use a forEach iterator on the array
    platformState.layers.forEach(function (layer) { return makeLayer('glass', layer); });
    // Make a layer, given a material and a location
    function makeLayer(material, location) {
        // teleport the player to the location
        magik.ianuae(location);
        var cmd = "/cyl " + material + " " + radius + " 1";
        run(cmd);
    }
}
exports.platforms = platforms;
