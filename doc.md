# Simulated Prime+Probe Cache Side-Channel Attack

## Summary

A capture-the-flag challenge necessitating a Prime+Probe attack was developed to teach about caches and cache side-channel attacks. The challenge was initially written in Python but was translated to JavaScript for inclusion on the CTF website. The JavaScript version also uses enforced private fields and methods for memory and cache implementations.

## Challenge

The challenge makes use of a simulated system with main memory and a cache. The 256-byte memory is byte-addressable and is initialized with random 1-byte values. The 32-byte direct-mapped virtually addressed cache uses a block size of 1 byte. The system supports accessing byte-sized values from memory while enforcing memory protection. Two processes are defined to run on this system, an attacker program and a victim program, each of which are allocated a portion of memory.

The victim program leaks a secret flag via a cache side-channel. The victim program accesses memory addresses corresponding to the ASCII code of the characters in the flag. In this example, the cache size is chosen to be 32 bytes in order to accommodate all 26 letters of the alphabet without aliasing. Conveniently, capital and lowercase letters map to the same set of cache blocks such that "a" aliases to "A" and case does not matter. The flag "Bruin" was chosen because it has no repeated letters and it has few anagrams, making it easy to unscramble.

The attacker (the participant) is challenged to recover the flag using only the `sys.attackerAccess()` function, which loads a byte from the specified address in memory. By trying out this function, the participant is able to observe that accessing an address outside the memory allocation for the attacker program results in a segmentation fault, a cache miss takes 3 seconds, and a cache hit is immediate. The attacker is also able to run the victim program on demand.

## Solution

The solution involves a Prime+Probe attack. Acting as the attacker, the participant first "primes" the cache, filling the cache with known memory blocks using `sys.attackerAccess()` calls. The participant then calls `sys.victimProgram()` to run the victim program, which replaces certain cache blocks corresponding to the characters in the flag. The participant then "probes" the cache by calling `sys.attackerAccess()` with the same addresses used during priming and observing how long each access takes. If an access takes 3 seconds, there was a cache miss and the corresponding cache block must have been replaced by the victim program. With knowledge of which cache blocks were replaced and knowledge of the workings of the victim program, the participant can deduce which characters are in the secret flag and unscramble them to discover the flag's value.
