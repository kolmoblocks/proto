/* vim: set sw=8: -*- Mode: C; tab-width: 8; indent-tabs-mode: t; c-basic-offset: 8 -*- */
/*
 * gsf-outfile.c :
 *
 * Copyright (C) 2002-2004 Jody Goldberg (jody@gnome.org)
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

#include <gsf-config.h>
#include <gsf/gsf-outfile-impl.h>
#include <gsf/gsf-impl-utils.h>

#define GET_CLASS(instance) G_TYPE_INSTANCE_GET_CLASS (instance, GSF_OUTFILE_TYPE, GsfOutfileClass)

/**
 * gsf_outfile_new_child :
 * @outfile : A #GsfOutfile
 * @name : The name of the new child to create
 * @is_dir : TRUE to create a directory, FALSE to create a plain file
 *
 * Returns a newly created child
 **/
GsfOutput *
gsf_outfile_new_child (GsfOutfile *outfile,
		       char const *name, gboolean is_dir)
{
	g_return_val_if_fail (outfile != NULL, NULL);

	return GET_CLASS (outfile)->new_child (outfile, name, is_dir);
}

GSF_CLASS_ABSTRACT (GsfOutfile, gsf_outfile, NULL, NULL, GSF_OUTPUT_TYPE)
