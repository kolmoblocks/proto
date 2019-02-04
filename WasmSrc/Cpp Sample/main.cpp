#include "emscripten.h"
#include "stdint.h"
#include "string.h"

char* pArg1 = NULL;
int Arg1Size = 0;

char* pArg2 = NULL;
int Arg2Size = 0;

char* pResult = NULL;

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
        pArg1 = new char[size];
        Arg1Size = size;
        return (int*)pArg1;
    }

    if (1 == arg_index)
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


int exec()
{
    if ( Arg1Size && Arg2Size )
    {
        pResult = new char[Arg1Size + Arg2Size];
        
        memcpy( (void*)pResult, (void*)pArg1, Arg1Size );

        memcpy( (void*)&pResult[Arg1Size], (void*)pArg2, Arg2Size );

        return true;
    }

    return false;
}
