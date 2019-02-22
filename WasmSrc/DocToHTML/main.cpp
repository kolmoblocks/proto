#include "emscripten.h"

#include <stdlib.h>
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include "wv/wv.h"
#include "wv/getopt.h"

int myelehandler (wvParseStruct * ps, wvTag tag, void *props, int dirty);
int mydochandler (wvParseStruct * ps, wvTag tag);
int myCharProc (wvParseStruct * ps, U16 eachchar, U8 chartype, U16 lid);
int mySpecCharProc (wvParseStruct * ps, U16 eachchar, CHP * achp);

char* pArg1 = NULL;
int Arg1Size = 0;

char* pResult = NULL;
int ResultSize = 0;

extern "C" {
    int* set_arg(uint8_t arg_index, int size);
    int* get_result();
    int get_result_size();
    int exec();
}


int* set_arg(uint8_t arg_index, int size)
{
    if (0 == arg_index)
    {
        if (pArg1)
            delete [] pArg1;

        pArg1 = new char[size];
        Arg1Size = size;
        return (int*)pArg1;
    }

    return NULL;
}


int* get_result()
{
    return (int*)pResult;
}


int get_result_size()
{
    return ResultSize;
}


int exec()
{
    if ( Arg1Size )
    {
        wvParseStruct ps;
        int ret;

        wvInit ();

        ret = wvInitParser (&ps, NULL/*argv[optind]*/);


        wvSetElementHandler (&ps, myelehandler);
        wvSetDocumentHandler (&ps, mydochandler);
        wvSetCharHandler (&ps, myCharProc);
        wvSetSpecialCharHandler (&ps, mySpecCharProc);

        //wvInitStateData (&myhandle);


    }

    return false;
}



int
myelehandler (wvParseStruct * ps, wvTag tag, void *props, int dirty)
{
    static PAP *ppap;
    expand_data *data = (expand_data *) ps->userData;
    data->anSttbfAssoc = &ps->anSttbfAssoc;
    data->lfo = &ps->lfo;
    data->lfolvl = ps->lfolvl;
    data->lvl = ps->lvl;
    data->nolfo = &ps->nolfo;
    data->nooflvl = &ps->nooflvl;
    data->stsh = &ps->stsh;
    data->lst = &ps->lst;
    data->noofLST = &ps->noofLST;
    data->liststartnos = &ps->liststartnos;
    data->listnfcs = &ps->listnfcs;
    data->finallvl = &ps->finallvl;
    data->fib = &ps->fib;
    data->dop = &ps->dop;
    data->intable = &ps->intable;
    data->cellbounds = &ps->cellbounds;
    data->nocellbounds = &ps->nocellbounds;
    data->endcell = &ps->endcell;
    data->vmerges = &ps->vmerges;
    data->norows = &ps->norows;
    data->nextpap = &ps->nextpap;
    if (charset == NULL)
      {
	  data->charset = wvAutoCharset (ps);
	  charset = data->charset;
      }
    else
	data->charset = charset;
    data->props = props;

    switch (tag)
      {
      case PARABEGIN:
	  {
	      S16 tilfo = 0;
	      /* test begin */
	      if (*(data->endcell))
		{
		    tilfo = ((PAP *) (data->props))->ilfo;
		    ((PAP *) (data->props))->ilfo = 0;
		}
	      /* test end */
	      ppap = (PAP *) data->props;
	      wvTrace (
		       ("fore back is %d %d\n",
			((PAP *) (data->props))->shd.icoFore,
			((PAP *) (data->props))->shd.icoBack));
	      wvBeginPara (data);
	      if (tilfo)
		  ((PAP *) (data->props))->ilfo = tilfo;
	  }
	  break;
      case PARAEND:
	  {
	      S16 tilfo = 0;
	      /* test begin */
	      if (*(data->endcell))
		{
		    tilfo = ((PAP *) (data->props))->ilfo;
		    ((PAP *) (data->props))->ilfo = 0;
		}
	      /* test end */
	      wvEndCharProp (data);	/* danger will break in the future */
	      wvEndPara (data);
	      if (tilfo)
		  ((PAP *) (data->props))->ilfo = tilfo;
	      wvCopyPAP (&data->lastpap, (PAP *) (data->props));
	  }
	  break;
      case CHARPROPBEGIN:
	  wvBeginCharProp (data, ppap);
	  break;
      case CHARPROPEND:
	  wvEndCharProp (data);
	  break;
      case SECTIONBEGIN:
	  wvBeginSection (data);
	  break;
      case SECTIONEND:
	  wvEndSection (data);
	  break;
      case COMMENTBEGIN:
	  wvBeginComment (data);
	  break;
      case COMMENTEND:
	  wvEndComment (data);
	  break;
      default:
	  break;
      }
    return (0);
}

int
mydochandler (wvParseStruct * ps, wvTag tag)
{
    static int i;
    expand_data *data = (expand_data *) ps->userData;
    data->anSttbfAssoc = &ps->anSttbfAssoc;
    data->lfo = &ps->lfo;
    data->lfolvl = ps->lfolvl;
    data->lvl = ps->lvl;
    data->nolfo = &ps->nolfo;
    data->nooflvl = &ps->nooflvl;
    data->stsh = &ps->stsh;
    data->lst = &ps->lst;
    data->noofLST = &ps->noofLST;
    data->liststartnos = &ps->liststartnos;
    data->listnfcs = &ps->listnfcs;
    data->finallvl = &ps->finallvl;
    data->fib = &ps->fib;
    data->dop = &ps->dop;
    data->intable = &ps->intable;
    data->cellbounds = &ps->cellbounds;
    data->nocellbounds = &ps->nocellbounds;
    data->endcell = &ps->endcell;
    data->vmerges = &ps->vmerges;
    data->norows = &ps->norows;
    if (i == 0)
      {
	  wvSetEntityConverter (data);
	  data->filename = ps->filename;
	  data->whichcell = 0;
	  data->whichrow = 0;
	  data->asep = NULL;
	  i++;
	  wvInitPAP (&data->lastpap);
	  data->nextpap = NULL;
	  data->ps = ps;
      }

    if (charset == NULL)
      {
	  data->charset = wvAutoCharset (ps);
	  charset = data->charset;
      }
    else
	data->charset = charset;

    switch (tag)
      {
      case DOCBEGIN:
	  wvBeginDocument (data);
	  break;
      case DOCEND:
	  wvEndDocument (data);
	  break;
      default:
	  break;
      }
    return (0);
}

int
myCharProc (wvParseStruct * ps, U16 eachchar, U8 chartype, U16 lid)
{
    switch (eachchar)
      {
      case 19:
	  wvTrace (("field began\n"));
	  ps->fieldstate++;
	  ps->fieldmiddle = 0;
	  fieldCharProc (ps, eachchar, chartype, lid);	/* temp */
	  return (0);
	  break;
      case 20:
	  wvTrace (("field middle\n"));
	  fieldCharProc (ps, eachchar, chartype, lid);
	  ps->fieldmiddle = 1;
	  return (0);
	  break;
      case 21:
	  wvTrace (("field began\n"));
	  ps->fieldmiddle = 0;
	  ps->fieldstate--;
	  fieldCharProc (ps, eachchar, chartype, lid);	/* temp */
	  return (0);
	  break;
      case 0x08:
	  wvError (
		   ("hmm did we loose the fSpec flag ?, this is possibly a bug\n"));
	  break;
      }

    if (ps->fieldstate)
      {
	  if (fieldCharProc (ps, eachchar, chartype, lid))
	      return (0);
      }

    wvTrace (
	     ("charset is %s, lid is %x, type is %d, char is %x\n", charset,
	      lid, chartype, eachchar));

    if ((chartype) && (wvQuerySupported (&ps->fib, NULL) == WORD8))
	wvTrace (("lid is %x\n", lid));

    if (charset != NULL)
	wvOutputHtmlChar (eachchar, chartype, charset, lid);
    else
	wvOutputHtmlChar (eachchar, chartype, wvAutoCharset (ps), lid);
    return (0);
}

int
mySpecCharProc (wvParseStruct * ps, U16 eachchar, CHP * achp)
{
    static int message;
    PICF picf;
    FSPA *fspa;
    expand_data *data = (expand_data *) ps->userData;

    switch (eachchar)
      {
      case 19:
	  wvError (("field began\n"));
	  ps->fieldstate++;
	  ps->fieldmiddle = 0;
	  fieldCharProc (ps, eachchar, 0, 0x400);	/* temp */
	  return (0);
	  break;
      case 20:
	  wvTrace (("field middle\n"));
	  if (achp->fOle2)
	    {
		wvError (
			 ("this field has an associated embedded object of id %x\n",
			  achp->fcPic_fcObj_lTagObj));
		/*test = wvFindObject(achp->fcPic_fcObj_lTagObj);
		   if (test)
		   wvError(("data can be found in object entry named %s\n",test->name));
		 */ }
	  fieldCharProc (ps, eachchar, 0, 0x400);	/* temp */
	  ps->fieldmiddle = 1;
	  return (0);
	  break;
      case 21:
	  wvTrace (("field end\n"));
	  ps->fieldstate--;
	  ps->fieldmiddle = 0;
	  fieldCharProc (ps, eachchar, 0, 0x400);	/* temp */
	  return (0);
	  break;
      }

    if (ps->fieldstate)
      {
	  if (fieldCharProc (ps, eachchar, 0, 0x400))
	      return (0);
      }

    switch (eachchar)
      {
      case 0x05:
	  /* this should be handled by the COMMENTBEGIN and COMMENTEND events */
	  return (0);
	  break;
      case 0x01:
	  {
	      wvStream *f;
	      Blip blip;
	      char *name;
	      long p = wvStream_tell (ps->data);
	      wvError (
		       ("picture 0x01 here, at offset %x in Data Stream, obj is %d, ole is %d\n",
			achp->fcPic_fcObj_lTagObj, achp->fObj, achp->fOle2));

	      if (achp->fOle2)
		  exit (139);
	      if(!no_graphics) 
	      {
	      wvStream_goto (ps->data, achp->fcPic_fcObj_lTagObj);
	      wvGetPICF (wvQuerySupported (&ps->fib, NULL), &picf, ps->data);
	      f = picf.rgb;
	      if (wv0x01 (&blip, f, picf.lcb - picf.cbHeader))
		{
		    wvTrace (("Here\n"));
		    name = wvHtmlGraphic (ps, &blip);
		    if (ps->dir) chdir (ps->dir);
		    wvPrintGraphics (config, 0x01,
				     (int) wvTwipsToHPixels (picf.dxaGoal),
				     (int) wvTwipsToVPixels (picf.dyaGoal),
				     name);
		    if (ps->dir) chdir (wv_cwd);
		    wvFree (name);
		}
	      else
		  wvStrangeNoGraphicData (config, 0x01);
	      }

	      wvStream_goto (ps->data, p);
	      return (0);
	  }
      case 0x08:
	  {
	      Blip blip;
	      char *name;
	      if (wvQuerySupported (&ps->fib, NULL) == WORD8)
		{
		    if(!no_graphics) 
		    {
		    if (ps->nooffspa > 0)
		      {
			  fspa =
			      wvGetFSPAFromCP (ps->currentcp, ps->fspa,
					       ps->fspapos, ps->nooffspa);

			  if (!fspa)
			    {
				wvError (("No fspa! Insanity abounds!\n"));
				return 0;
			    }

			  data->props = fspa;
			  if (wv0x08 (&blip, fspa->spid, ps))
			    {
				wvTrace (("Here\n"));
				name = wvHtmlGraphic (ps, &blip);
				if (ps->dir) chdir (ps->dir);
				wvPrintGraphics (config, 0x08,
						 (int)
						 wvTwipsToHPixels (fspa->xaRight
								   -
								   fspa->
								   xaLeft),
						 (int) wvTwipsToVPixels (fspa->
									 yaBottom
									 -
									 fspa->
									 yaTop),
						 name);
				if (ps->dir) chdir (wv_cwd);
				wvFree (name);
			    }
			  else
			      wvStrangeNoGraphicData (config, 0x08);
		      }
		    else
		      {
			  wvError (("nooffspa was <=0!  Ignoring.\n"));
		      }
		    }
		}
	      else
		{
		    FDOA *fdoa;
		    wvError (
			     ("pre word8 0x08 graphic, unsupported at the moment\n"));
		    fdoa =
			wvGetFDOAFromCP (ps->currentcp, ps->fdoa, ps->fdoapos,
					 ps->nooffdoa);
		    data->props = fdoa;
		}
	    
        return (0);
	  }
      case 0x28:
	  {
	      U16 symbol[6] = { 'S', 'y', 'm', 'b', 'o', 'l' };
	      U16 wingdings[9] =
		  { 'W', 'i', 'n', 'g', 'd', 'i', 'n', 'g', 's' };
	      U16 mtextra[8] = 
		  { 'M', 'T', ' ', 'E', 'x', 't', 'r', 'a' };

	      wvTrace (
		       ("no of strings %d %d\n", ps->fonts.nostrings,
			achp->ftcSym));
	      if (0 == memcmp (symbol, ps->fonts.ffn[achp->ftcSym].xszFfn, 12))
		{
		    if ((!message) && (strcasecmp ("UTF-8", charset)))
		      {
			  wvWarning
			      ("Symbol font detected (too late sorry!), rerun wvHtml with option --charset utf-8 option to support correct symbol font conversion to a viewable format.\n");
			  message++;
		      }
		    wvTrace (
			     ("symbol char %d %x %c, using font %d %s\n",
			      achp->xchSym, achp->xchSym, achp->xchSym,
			      achp->ftcSym,
			      wvWideStrToMB (ps->fonts.ffn[achp->ftcSym].
					     xszFfn)));
		    wvTrace (
			     ("symbol char ends up as a unicode %x\n",
			      wvConvertSymbolToUnicode (achp->xchSym - 61440)));
		    wvOutputFromUnicode (wvConvertSymbolToUnicode
					 (achp->xchSym - 61440), charset);
		    return (0);
		}
	      else if (0 == 
		       memcmp (mtextra, ps->fonts.ffn[achp->ftcSym].xszFfn, 
				16))
		{
		    if ((!message) && (strcasecmp ("UTF-8", charset)))
		      {
			  wvWarning
			      ("MT Extra font detected (too late sorry!), rerun wvHtml with option --charset utf-8 option to support correct symbol font conversion to a viewable format.\n");
			  message++;
		      }
		    wvTrace (
			     ("Symbol char %d %x %c, using font %d %s\n",
			      achp->xchSym, achp->xchSym, achp->xchSym,
			      achp->ftcSym,
			      wvWideStrToMB (ps->fonts.ffn[achp->ftcSym].
					     xszFfn)));
		    wvTrace (
			     ("symbol char ends up as a unicode %x\n",
			      wvConvertMTExtraToUnicode (achp->xchSym - 61440)));
		    wvOutputFromUnicode (wvConvertMTExtraToUnicode
					 (achp->xchSym - 61440), charset);
		    return (0);
		}	
	      else if (0 ==
		       memcmp (wingdings, ps->fonts.ffn[achp->ftcSym].xszFfn,
			       18))
		{
		    if (!message)
		      {
			  wvError (
				   ("I have yet to do a wingdings to unicode mapping table, if you know of one tell me\n"));
			  message++;
		      }
		}
	      else
		{
		    if (!message)
		      {
			  char *fontname =
			      wvWideStrToMB (ps->fonts.ffn[achp->ftcSym].
					     xszFfn);
			  wvError (
				   ("Special font %s, i need a mapping table to unicode for this\n",
				    fontname));
			  wvFree (fontname);
			  printf ("*");
		      }
		    return (0);
		}
	  }
      default:
	  return (0);
      }



    return (0);
}
