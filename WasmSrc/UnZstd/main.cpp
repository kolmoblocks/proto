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

    auto pResult = new char [size];

    pArgsNames[arg_handle] = pResult;

    return (int*)pResult;
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
        set_last_error("_exec, original size unknown");

        return false;
    }

    pResult = new char [rSize];

    ResultSize = rSize;

    size_t const dSize = ZSTD_decompress((void*)pResult, rSize, (void*)pCompressedData, CompressedDataSize);

    if ( dSize != rSize ) 
    {
        delete [] pResult;
        
        pResult = NULL;

        ResultSize = 0;

        set_last_error("_exec, error decoding");
        
        return false;
    }

    return true;
}
