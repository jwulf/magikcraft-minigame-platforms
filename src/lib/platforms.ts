const magik = magikcraft.io;

// This is the shape of our state
interface platformState {
    initialised: boolean;
    initial_position: BukkitLocation;
    layers: BukkitLocation[]
}

/**
 * magik.global gets a reference to a namespace in global state.
 * This allows our spell to know about previous times it was run.
 */

const platformState = magik.global('sitapati.platforms') as platformState;

const layers: any[] = [];

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
    function addY(loc: BukkitLocation, y: number) {
        const newLoc = loc.clone();
        newLoc.setY(newLoc.getY() + y);
        return newLoc;
    }

    // If we haven't run ever, then initialise the layers
    if (!platformState.initialised) {
        say("Initialising...");

        // The base level will be created where we are standing, so clone the current player location
        platformState.initial_position = magik.hic().clone();

        // First we create a bedrock layer
        const bedrockLayerLocation = platformState.initial_position;
        makeLayer('bedrock', bedrockLayerLocation);

        // Now we create a lava layer
        const lavaLayerLocation = addY(bedrockLayerLocation, 1);
        makeLayer('lava', lavaLayerLocation);

        // Now we put the glass layers into an array of layers

        // Make the first glass layer
        platformState.layers = [addY(lavaLayerLocation, spacing)];

        // Now use a loop to place the other glass layers, each one spaced above the previous one
        for (let i = 1; i < glassLayers; i++) {
            platformState.layers.push(addY(layers[i-1], spacing));
        }

        // OK, we're initialised
        platformState.initialised = true;

    } else {
        // No need to initialise, we already ran previously and have the layers
        magik.dixit("Already Initialised...");
    }

    // Here we (re)lay the glass layers. We use a forEach iterator on the array
    platformState.layers.forEach(layer => makeLayer('glass', layer));


    // Make a layer, given a material and a location
    function makeLayer (material: string, location: BukkitLocation) {
        // teleport the player to the location
        magik.ianuae(location);
        const cmd = `/cyl ${material} ${radius} 1`
        run (cmd);
    }
}
