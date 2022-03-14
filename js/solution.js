// Prime
for (let address = ATTACKER_MEMORY_START; address < ATTACKER_MEMORY_START + CACHE_SIZE; address++) {
  await sys.attackerAccess(address);
}
console.log("PRIME COMPLETE");
console.log("\n");

// Victim
await sys.victimProgram();
console.log("\n");

// Probe
for (let address = ATTACKER_MEMORY_START; address < ATTACKER_MEMORY_START + CACHE_SIZE; address++) {
  console.log("Cache Block: " + address % CACHE_SIZE);
  console.log("Corresponding Letter: " + String.fromCharCode(address % CACHE_SIZE + 65));
  let before = Date.now();
  await sys.attackerAccess(address);
  console.log("Time: " + Math.floor((Date.now() - before) / 1000) + " seconds");
  console.log("\n");
}
console.log("PROBE COMPLETE");
console.log("\n");
