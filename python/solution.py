from time import time

from challenge import ATTACKER_MEMORY_START, CACHE_SIZE, attacker_access, victim_program


# Prime
for address in range(ATTACKER_MEMORY_START, ATTACKER_MEMORY_START + CACHE_SIZE):
    attacker_access(address)
print("PRIME COMPLETE")
print()

# Victim
victim_program()
print()

# Probe
for address in range(ATTACKER_MEMORY_START, ATTACKER_MEMORY_START + CACHE_SIZE):
    print(f"Cache Block: {address % CACHE_SIZE}")
    print(f"Corresponding Letter: {chr(address % CACHE_SIZE + 65)}")
    before = time()
    attacker_access(address)
    print(f"Time: {int(time() - before)} seconds")
    print()
print("PROBE COMPLETE")
