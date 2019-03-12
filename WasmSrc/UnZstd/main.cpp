#include "emscripten.h"
#include <stdint.h>
#include <string.h>
#include <map>

#define ZSTD_STATIC_LINKING_ONLY

#include "lib/zstd.h"


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


char* pLastError = NULL;
int LastErrorSize = 0;


std::map<uint8_t, char*> pArgsNames;


#define CompressedData_ArgName "CompressedData"
#define CompressedData_ArgIndex 1
char* pCompressedData = NULL;
int CompressedDataSize = 0;


#define Dictionary_ArgName "Dictionary"
#define Dictionary_ArgIndex 2
char* pDictionary = NULL;
int DictionarySize = 0;


char* pResult = NULL;
int ResultSize = 0;


void freeResult()
{
    if ( NULL != pResult )
        delete [] pResult;

    pResult = NULL;
    ResultSize = 0; 
}

void set_last_error(const char* text)
{
    if ( pLastError )
    {
        delete [] pLastError;
        pLastError = NULL;
    }

    LastErrorSize = strlen(text);

    pLastError = new char[LastErrorSize + 1];

    memcpy( (void*)pLastError, (void*)text, LastErrorSize + 1 );
}


int* set_arg_name(uint8_t arg_handle, int size)
{
    auto i = pArgsNames.find(arg_handle);

    if ( i != pArgsNames.end() )
    {
        set_last_error("_set_arg_name, arg_handle value already used");

        return NULL;
    }

    auto pRes = new char [size];

    pArgsNames[arg_handle] = pRes;

    return (int*)pRes;
}


uint8_t get_arg_index(uint8_t arg_handle)
{
    auto i = pArgsNames.find(arg_handle);

    if ( i == pArgsNames.end() )
    {
        set_last_error("_get_arg_index, unknown value of arg_handle");

        return NULL;
    }

    if ( 0 == strcmp( i->second, CompressedData_ArgName ) )
        return CompressedData_ArgIndex;

    if ( 0 == strcmp( i->second, Dictionary_ArgName ) )
        return Dictionary_ArgIndex;

    set_last_error("_get_arg_index, unknown argument name");

    return NULL;
}


int* get_last_error() {
    return (int*)pLastError;
}


int get_last_error_size() {
    return LastErrorSize;
}


int* set_arg(uint8_t arg_index, int size)
{
    if ( 0 == arg_index )
    {
        set_last_error("_set_arg, bad arg_index");

        return NULL;
    }

    if (( CompressedData_ArgIndex != arg_index ) && ( Dictionary_ArgIndex != arg_index ))
    {
        set_last_error("_set_arg, unknown arg_index");

        return NULL;
    }

    if ( CompressedData_ArgIndex == arg_index )
    {
        CompressedDataSize = size;

        pCompressedData = new char [CompressedDataSize];

        return (int*)pCompressedData;
    }

    if ( Dictionary_ArgIndex == arg_index )
    {
        DictionarySize = size;

        pDictionary = new char [DictionarySize];

        return (int*)pDictionary;
    }

    set_last_error("_set_arg, unknown arg_index");

    return NULL;
}


int* get_result() {
    return (int*)pResult;
}


int get_result_size() {
    return ResultSize;
}


int exec()
{
    bool bDecompressedSizeFinded = true;

    freeResult();

    if (( NULL == pCompressedData ) || ( 0 == CompressedDataSize ))
    {
        set_last_error("_exec, compressed data not defined");

        return false;
    }

    auto rSize = ZSTD_findDecompressedSize((void*)pCompressedData, CompressedDataSize);
    
    if ( ZSTD_CONTENTSIZE_ERROR == rSize )
    {
        set_last_error("_exec, it was not compressed by zstd");

        return false;
    } 
    else if ( ZSTD_CONTENTSIZE_UNKNOWN == rSize ) 
    {
        rSize = ZSTD_decompressBound((void*)pCompressedData, CompressedDataSize);

        if ( ZSTD_CONTENTSIZE_ERROR == rSize )
        {
            set_last_error("_exec, original size unknown");

            return false;
        }

        bDecompressedSizeFinded = false;
    }

    if ( 0 == rSize )
    {
        set_last_error("_exec, original size is zero");

        return false;
    }

    ResultSize = rSize;

    pResult = new char [ResultSize];

    size_t dSize = 0;
    
    if (( NULL != pDictionary ) && ( 0 != DictionarySize ))
    {
        ZSTD_DDict* const pZSTDDictionary = ZSTD_createDDict((void*)pDictionary, DictionarySize);

        if ( NULL == pZSTDDictionary )
        { 
            set_last_error("_exec, create dictionary error");

            freeResult();

            return false;
        }

        ZSTD_DCtx* const pZSTDDictCtx = ZSTD_createDCtx();

        if ( NULL == pZSTDDictCtx )
        { 
            set_last_error("_exec, create dictionary context");

            ZSTD_freeDDict(pZSTDDictionary);

            freeResult();

            return false;
        }

        dSize = ZSTD_decompress_usingDDict(pZSTDDictCtx, (void*)pResult, ResultSize, (void*)pCompressedData, CompressedDataSize, pZSTDDictionary);

        ZSTD_freeDCtx(pZSTDDictCtx);

        ZSTD_freeDDict(pZSTDDictionary);
    }
    else
    {
        dSize = ZSTD_decompress((void*)pResult, ResultSize, (void*)pCompressedData, CompressedDataSize);
    }

    if ( dSize != ResultSize ) 
    {
        if (( false == bDecompressedSizeFinded ) && dSize )
        {
            if ( dSize < ResultSize ) 
            {
                ResultSize = dSize;

                return true;
            }
        }

        set_last_error("_exec, error decoding");

        freeResult();
        
        return false;
    }
    
    return true;
}
