/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-outfile-stdio.h: write a directory tree
 *
 * Copyright (C) 2004 Novell, Inc.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of version 2.1 of the GNU Lesser General Public
 * License as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 */

#ifndef GSF_OUTFILE_STDIO_H
#define GSF_OUTFILE_STDIO_H

#include <gsf/gsf.h>

G_BEGIN_DECLS

typedef struct _GsfOutfileStdio GsfOutfileStdio;

#define GSF_OUTFILE_STDIO_TYPE	(gsf_outfile_stdio_get_type ())
#define GSF_OUTFILE_STDIO(o)	(G_TYPE_CHECK_INSTANCE_CAST ((o), GSF_OUTFILE_STDIO_TYPE, GsfOutfileStdio))
#define GSF_IS_OUTFILE_STDIO(o)	(G_TYPE_CHECK_INSTANCE_TYPE ((o), GSF_OUTFILE_STDIO_TYPE))

GType	    gsf_outfile_stdio_get_type	(void);
GsfOutfile *gsf_outfile_stdio_new	(char const *root, GError **err);

G_END_DECLS

#endif /* GSF_OUTFILE_H */