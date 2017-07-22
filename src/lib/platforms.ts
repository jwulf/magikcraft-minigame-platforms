const magik = magikcraft.io;

// This is the shape of our state

interface layer {
    material: string;
    location: BukkitLocation;
}
interface platformState {
    initialised: boolean;
    initial_position: BukkitLocation;
    layers: layer[],
    baselayers: layer[]
}

/**
 * magik.global gets a reference to a namespace in global state.
 * This allows our spell to know about previous times it was run.
 */

const platformState = magik.global('sitapati.platforms') as platformState;

// Short-hand function
const say = magik.dixit;

export function platforms(glassLayers = 5, radius = 15, spacing = 4) {

    // Helper function to run commands as the player
    function run(cmd: string) {
        say(cmd);
        const sender = magik.getSender();
        magik.getPlugin().getServer().dispatchCommand(sender, cmd);
    }

    // Helper function that creates a new location spaced above the one passed in
    function addY(loc: BukkitLocation, y: number): BukkitLocation {
        const newLoc = loc.clone();
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
        const bedrockLayerLocation = platformState.initial_position;
        platformState.baselayers.push({material: 'bedrock', location: bedrockLayerLocation});

        // Now we create a lava layer
        const lavaLayerLocation = addY(bedrockLayerLocation, 1);
        platformState.baselayers.push({material: 'lava', location: lavaLayerLocation});

        platformState.layers.push({material: 'glass', location: addY(lavaLayerLocation, spacing)});

        // Now use a loop to place the glass layers, each one spaced above the previous one
        for (let i = 1; i < glassLayers - 1; i++) {
            platformState.layers.push({material: 'glass', location: addY(platformState.layers[i-1].location, spacing)});
        }
        platformState.baselayers.forEach(layer => makeLayer(layer));
        // OK, we're initialised
        platformState.initialised = true;

    } else {
        // No need to initialise, we already ran previously and have the layers
        magik.dixit("Already Initialised...");
    }

    // Here we (re)lay the glass layers. We use a forEach iterator on the array
    platformState.layers.forEach(layer => makeLayer(layer));

    magik.exsultus(100);
    magik.volare(1500);

    // Make a layer, given a material and a location
    function makeLayer (layer: layer) {
        // teleport the player to the location
        magik.ianuae(layer.location);
        const cmd = `/cyl ${layer.material} ${radius} 1`
        run (cmd);
    }
}
