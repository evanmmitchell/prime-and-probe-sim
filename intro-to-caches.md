# Information on Caches

When a computer runs a program, the instructions for that program and the data on which it operates are loaded into main memory. Memory is also used to hold program variables, which need to be written to and read from frequently. Because accessing memory takes significantly more time than performing an operation like addition or subtraction, frequent memory operations can slow a program down. Thus, the idea was developed that in addition to the larger, slower main memory using less expensive DRAM technology, a smaller, faster, more expensive SRAM cache could be used to hold just the most frequently used data.

Caches make use of temporal and spatial locality to approximate the most frequently used data. Temporal locality says that when one piece of data is accessed, the same piece of data is often accessed again soon after. Thus, the most recently accessed data is kept in the cache. Spatial locality says that when one piece of data is accessed, data at nearby memory addresses are often accessed soon after. Thus, when one piece of data is accessed, a larger block of memory which includes that piece of data is brought into the cache.

The cache sits in between the CPU and main memory, and whenever the running program attempts to access memory, the request first goes to the cache. If the piece of data that the program wants to access is in the cache, that is called a cache hit, and the piece of data is simply read from or written to the cache. If the piece of data is not in the cache, that is called a cache miss, and the memory block must be fetched from main memory and brought into the cache before the requested piece of data can be passed to the program. While a cache hit is fast, a cache miss is measurably slower.

|   Program  |                      Notes                     | Value of Cache Block 0 | Memory at Address 32 | Memory at Address 64 |
|:----------:|:----------------------------------------------:|:----------------------:|:--------------------:|:--------------------:|
|    begin   |          Cache entry begins undefined          |     tag=-, value=-     |          76          |          109         |
| access(32) |  Tag is undefined; cache miss takes 3 seconds  |     tag=1, value=76    |          76          |          109         |
| access(32) |     Tag matches; cache hit takes 0 seconds     |     tag=1, value=76    |          76          |          109         |
| access(64) | Tag does not match; cache miss takes 3 seconds |    tag=2, value=109    |          76          |          109         |
| access(64) |     Tag matches; cache hit takes 0 seconds     |    tag=2, value=109    |          76          |          109         |
| access(32) | Tag does not match; cache miss takes 3 seconds |     tag=1, value=76    |          76          |          109         |

Table 1. Sample memory accesses using a 32-byte direct-mapped cache with 1-byte blocks.

How is data organized in a cache? The simplest organization is that of a direct-mapped cache. In this organization, each address in main memory maps to a single cache block, with the least significant (rightmost) bits of the address being the index of the corresponding cache block. Thus, for a direct-mapped cache with 1-byte blocks, `cache index = memory address % cache size`. Since multiple memory addresses can map to the same cache block, the remaining bits of the address are saved along with the memory contents as a tag to identify the memory block. Thus, for a direct-mapped cache with 1-byte blocks, `tag = memory address >> log2(cache size)`. When a memory block is brought into the cache that has the same index as an existing cache block, the existing block is replaced, as shown in Table 1. More complex organizations and replacement policies are used to further improve cache performance.
