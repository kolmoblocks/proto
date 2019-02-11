/*
 * gmem.h
 *
 * Memory routines with out-of-memory checking.
 *
 * Copyright 1996-2003 Glyph & Cog, LLC
 */

#ifndef GMEM_H
#define GMEM_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef __cplusplus
extern "C" {
#endif

/*
 * Same as malloc, but prints error message and exits if malloc()
 * returns NULL.
 */
//extern void *malloc(int size);

/*
 * Same as realloc, but prints error message and exits if realloc()
 * returns NULL.  If <p> is NULL, calls malloc instead of realloc().
 */
//extern void *realloc(void *p, int size);

/*
 * Same as free, but checks for and ignores NULL pointers.
 */
//extern void free(void *p);

#ifdef DEBUG_MEM
/*
 * Report on unfreed memory.
 */
extern void gMemReport(FILE *f);
#else
#define gMemReport(f)
#endif

/*
 * Allocate memory and copy a string into it.
 */
/*char *copyString(char *s) {
  char *s1;

  s1 = (char *)malloc(strlen(s) + 1);
  strcpy(s1, s);
  return s1;
}*/

#ifdef __cplusplus
}
#endif

#endif
