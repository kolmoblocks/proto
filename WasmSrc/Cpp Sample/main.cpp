#include "emscripten.h"
#include "stdint.h"
#include "string.h"

char* pArg1 = NULL;
int Arg1Size = 0;

char* pArg2 = NULL;
int Arg2Size = 0;

char* pResult = NULL;

char* pLastError = NULL;
int LastErrorSize = 0;

extern "C" {
    int* set_arg_name(uint8_t arg_handle, int size);
    uint8_t get_arg_index(uint8_t arg_handle);
    int* set_arg(uint8_t arg_index, int size);
    int* get_result();
    int get_result_size();
    int* get_last_error();
    int get_last_error_size();
    int exec();
}

void set_last_error(const char* text)
{
    LastErrorSize = strlen(text);
    pLastError = new char[LastErrorSize + 1];
    memcpy( (void*)pLastError, (void*)text, LastErrorSize + 1 );
}

int* set_arg_name(uint8_t arg_handle, int size)
{
    set_last_error("_set_arg_name, not implemented (use arg_index=1 or 2)");

    return NULL;
}

uint8_t get_arg_index(uint8_t arg_handle)
{
    set_last_error("_get_arg_index, not implemented (use arg_index=1 or 2)");

    return 0;
}

int* set_arg(uint8_t arg_index, int size)
{
    if (1 == arg_index)
    {
        pArg1 = new char[size];
        Arg1Size = size;
        return (int*)pArg1;
    }

    if (2 == arg_index)
    {
        pArg2 = new char[size];
        Arg2Size = size;
        return (int*)pArg2;
    }

    return NULL;
}


int* get_result()
{
    return (int*)pResult;
}


int get_result_size()
{
    return Arg1Size + Arg2Size;
}


int* get_last_error()
{
    return (int*)pLastError;
}


int get_last_error_size()
{
    return LastErrorSize;
}


int exec()
{
    if ( Arg1Size && Arg2Size )
    {
        pResult = new char[Arg1Size + Arg2Size];
        
        memcpy( (void*)pResult, (void*)pArg1, Arg1Size );

        memcpy( (void*)&pResult[Arg1Size], (void*)pArg2, Arg2Size );

        return true;
    }

    set_last_error("_exec, one of arguments is not initialized");

    return false;
}
