#include "emscripten.h"
#include "xpdf/PDFDoc.h"
#include "src/HtmlOutputDev.h"
#include "xpdf/GlobalParams.h"
#include <string>
#include <iostream>


GBool xml = gFalse;
GBool complexMode = gTrue;
GBool ignore = gFalse;
GBool printCommands = gTrue;
GBool printHtml = gFalse;
GBool noframes = gTrue;
GBool stout = gTrue;
GBool showHidden = gFalse;
GBool noMerge = gFalse;
extern GlobalParams *globalParams;

double scale = 1.0;

char* pArg1 = NULL;
int Arg1Size = 0;

char* pResult = NULL;
int ResultSize = 0;

char* pArgName = NULL;
int pArgNameSize = 0;

extern "C" {
    int* set_arg_name(uint8_t arg_handle, int size);
    uint8_t get_arg_index(uint8_t arg_handle);
    int* set_arg(uint8_t arg_index, int size);
    int* get_result();
    int get_result_size();
    int exec();
    int* get_last_error();
    int get_last_error_size();    
}


int* set_arg_name(uint8_t arg_handle, int size)
{
    if ( pArgName )
        delete [] pArgName;
        
    pArgName = new char[size];
    
    pArgNameSize = size;
    
    return (int*)pArgName;
}


uint8_t get_arg_index(uint8_t arg_handle)
{
    return 1; // just one argument
}


int* get_last_error()
{
    return NULL;
}


int get_last_error_size()
{
    return 0;
}

int* set_arg(uint8_t arg_index, int size)
{
    if (1 == arg_index)
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
        globalParams = new GlobalParams( "" );
        globalParams->setErrQuiet( gTrue );
        
        Object obj;
        obj.initNull();
        
        MemStream ms(pArg1, 0, Arg1Size, &obj);

        PDFDoc doc( &ms, NULL, NULL );       

        HtmlOutputDev htmlOut( "document.pdf", "document.pdf", NULL, NULL, NULL, NULL, "", gTrue, 1, doc.getCatalog( )->getOutline( )->isDict( ) );

        if ( htmlOut.isOk( ) && doc.okToCopy( ) )
        {
            doc.displayPages( &htmlOut, 1, doc.getNumPages( ), static_cast< int >( 72 * scale ), static_cast< int >( 72 * scale ), 0, gTrue, gTrue );

            std::string html = htmlOut.GetHTML();
            
            ResultSize = html.size( );

            if ( pResult )
                delete [] pResult;

            pResult = new char[ResultSize];
            
            memcpy( (void*)pResult, (void*)html.c_str(), ResultSize );

            delete globalParams;

            return true;
        }

        delete globalParams;
    }

    return false;
}
