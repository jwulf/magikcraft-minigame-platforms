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
        platformState.layers = [];
        platformState.baselayers = [];
        // First we specify a bedrock layer
        var bedrockLayerLocation = platformState.initial_position;
        platformState.baselayers.push({ material: 'bedrock', location: bedrockLayerLocation });
        // Now we create a lava layer
        var lavaLayerLocation = addY(bedrockLayerLocation, 1);
        platformState.baselayers.push({ material: 'lava', location: lavaLayerLocation });
        platformState.layers.push({ material: 'glass', location: addY(lavaLayerLocation, spacing) });
        // Now use a loop to place the glass layers, each one spaced above the previous one
        for (var i = 1; i < glassLayers - 1; i++) {
            platformState.layers.push({ material: 'glass', location: addY(layers[i - 1], spacing) });
        }
        platformState.baselayers.forEach(function (layer) { return makeLayer(layer); });
        // OK, we're initialised
        platformState.initialised = true;
    }
    else {
        // No need to initialise, we already ran previously and have the layers
        magik.dixit("Already Initialised...");
    }
    // Here we (re)lay the glass layers. We use a forEach iterator on the array
    platformState.layers.forEach(function (layer) { return makeLayer(layer); });
    magik.exsultus(100);
    magik.volare(1500);
    // Make a layer, given a material and a location
    function makeLayer(layer) {
        // teleport the player to the location
        magik.ianuae(layer.location);
        var cmd = "/cyl " + layer.material + " " + radius + " 1";
        run(cmd);
    }
}
exports.platforms = platforms;
