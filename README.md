# magikcraft-minigame-platforms

It's the original Magikcraft minigame - platforms!

This creates five glass levels above a lava floor. Battle with your friends and see who falls into the lava first!

## Magikcraft

Magikcraft is the world's most advanced platform for coding JavaScript in Minecraft. Check it out at [www.magikcraft.io](https://www.magikcraft.io).

## To use this package in Magikcraft

Log in to your spellbook at [play.magikcraft.io](https://play.magikcraft.io) using your GitHub account.

Create a new spell like this:

```
function game(module, spell = '_default') {
    const _module = `magikcraft-minigame-${module}`;
    require(_module).spells[spell]();
}
```

Now click on your avatar in the top-right corner, then select "Manage Plugins". Edit the `package.json` file and add this line to `dependencies`:

```
"magikcraft-minecraft-platforms": "magikcraft-minigame-platforms"
```

Save the file, then connect to a Magikcraft server with your Minecraft client.

Once connected, type: `/cast game platforms`.

## Running your own fork

You can fork the code for this package on GitHub at [ https://github.com/jwulf/magikcraft-minigame-platforms]( https://github.com/jwulf/magikcraft-minigame-platforms).

Update your `package.json` in your spellbook to point to the GitHub URL of your fork, and you will be running your own version, which you can modify at will.