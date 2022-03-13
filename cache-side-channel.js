const FLAG = "Bruin";



// CHALLENGE

const MEMORY_SIZE = 256;
const VICTIM_MEMORY_START = 0;
const VICTIM_MEMORY_END = 64;
const ATTACKER_MEMORY_START = 64;
const ATTACKER_MEMORY_END = 128;

const CACHE_SIZE = 32;


class CacheEntry {
  constructor(tag = null, value = null) {
    this.tag = tag;
    this.value = value;
  }
}


class System {
  #memory;
  #cache;

  constructor() {
    // Initialize memory with random 1-byte values
    this.#memory = new Array(MEMORY_SIZE);
    for (let i = 0; i < MEMORY_SIZE; i++) {
      this.#memory[i] = Math.floor(Math.random() * Math.pow(2, 8));
    }

    // Initialize direct-mapped cache with 1-byte blocks
    this.#cache = new Array(CACHE_SIZE);
    for (let i = 0; i < CACHE_SIZE; i++) {
      this.#cache[i] = new CacheEntry();
    }
  }

  #memoryAccess(address) {
    let start = Date.now();
    while (Date.now() < start + 3000);
    return this.#memory[address];
  }

  #access(address) {
    let index = address % CACHE_SIZE;
    let tag = address >> Math.floor(Math.log2(CACHE_SIZE));
    if (this.#cache[index].tag != tag) {
      this.#cache[index] = new CacheEntry(tag, this.#memoryAccess(address));
    }
    return this.#cache[index].value;
  }

  #victimAccess(address) {
    if (address < VICTIM_MEMORY_START || address >= VICTIM_MEMORY_END) {
      console.log("SEGMENTATION FAULT");
      return;
    }
    return this.#access(address);
  }

  attackerAccess(address) {
    if (address < ATTACKER_MEMORY_START || address >= ATTACKER_MEMORY_END) {
      console.log("SEGMENTATION FAULT");
      return;
    }
    return this.#access(address);
  }

  victimProgram() {
    for (let i = 0; i < FLAG.length; i++) {
      this.#victimAccess(FLAG[i].charCodeAt() - 65);
    }
    console.log("VICTIM PROGRAM COMPLETE");
  }
}

sys = new System();



// SOLUTION

// Prime
for (let address = ATTACKER_MEMORY_START; address < ATTACKER_MEMORY_START + CACHE_SIZE; address++) {
  sys.attackerAccess(address);
}
console.log("PRIME COMPLETE");
console.log("\n");

// Victim
sys.victimProgram();
console.log("\n");

// Probe
for (let address = ATTACKER_MEMORY_START; address < ATTACKER_MEMORY_START + CACHE_SIZE; address++) {
  console.log("Cache Block: " + address % CACHE_SIZE);
  console.log("Corresponding Letter: " + String.fromCharCode(address % CACHE_SIZE + 65));
  let before = Date.now();
  sys.attackerAccess(address);
  console.log("Time: " + Math.floor((Date.now() - before) / 1000) + " seconds");
  console.log("\n");
}
console.log("PROBE COMPLETE");
console.log("\n");
