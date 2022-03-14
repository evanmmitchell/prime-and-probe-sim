from math import log2
from random import randrange
from time import sleep

from secret import FLAG


MEMORY_SIZE = 256
VICTIM_MEMORY_START = 0
VICTIM_MEMORY_END = 64
ATTACKER_MEMORY_START = 64
ATTACKER_MEMORY_END = 128

CACHE_SIZE = 32


class _cache_entry:
    def __init__(self, tag=None, value=None):
        self.tag = tag
        self.value = value


# Byte-addressable memory
_memory = [randrange(2**8) for _ in range(MEMORY_SIZE)]
def _memory_access(address):
    sleep(3)
    return _memory[address]

# Direct-mapped cache with byte-sized blocks
_cache = [_cache_entry() for _ in range(CACHE_SIZE)]
def _cache_access(address):
    index = address % CACHE_SIZE
    tag = address >> int(log2(CACHE_SIZE))
    if _cache[index].tag != tag:
        _cache[index] = _cache_entry(tag, _memory_access(address))
    return _cache[index].value

def _victim_access(address):
    if address < VICTIM_MEMORY_START or address >= VICTIM_MEMORY_END:
        print("SEGMENTATION FAULT")
        return
    return _cache_access(address)


def attacker_access(address):
    if address < ATTACKER_MEMORY_START or address >= ATTACKER_MEMORY_END:
        print("SEGMENTATION FAULT")
        return
    return _cache_access(address)

def victim_program():
    for char in FLAG:
        address = ord(char) - 65
        value = _victim_access(address)
    print("VICTIM PROGRAM COMPLETE")
