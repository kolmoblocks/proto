#define WASM_EXPORT __attribute__((visibility("default")))
#define TOKEN_SIZE 2

#include <stdint.h>

int rightmost = 0;

char encoded_data[100000];
int encoded_data_size = 0;

char decoded_data[100000];
int decoded_data_size = 0;

char huffman_tree_serialized[100000];

typedef struct huffman_node_t
{
    char value[TOKEN_SIZE];          /* character(s) represented by this entry */
    struct huffman_node_t *left, *right;
} huffman_node_t;

huffman_node_t h_malloc[200000];
int h_malloc_pos=0;


huffman_node_t *allocateNode(int level) {
  huffman_node_t *hn;

  hn = &h_malloc[h_malloc_pos];
  h_malloc_pos++;
  
  if (huffman_tree_serialized[rightmost] != '\0') {
    for (int j=0; j< TOKEN_SIZE; j++) {
        hn->value[j] = huffman_tree_serialized[rightmost];
        rightmost++;
    }

    return hn;
  }
  rightmost+= TOKEN_SIZE;

  hn->left = allocateNode(level+1);
  hn->right = allocateNode(level+1);
  return hn;
}


char check_encoded_data_bit(int pos) {
  unsigned int bit_number = pos / 8;
  char bit_pos = pos % 8;
  char mask = 1<<(7-bit_pos);
  if (encoded_data[bit_number] & mask) {
    return 1;
  } else {
    return 0;
  }
}


WASM_EXPORT
int* set_arg(uint8_t arg_index, int size)
{
  // encoded data
  if ( 0 == arg_index )
  {
      encoded_data_size = size;
      return (int*)&encoded_data[0];
  }

  // huffman tree
  if ( 1 == arg_index )
  {
      return (int*)&huffman_tree_serialized[0];
  }

  return 0;
}

WASM_EXPORT
int* get_result()
{
  return (int*)&decoded_data[0];
}

WASM_EXPORT
int get_result_size()
{
  return decoded_data_size;
}

WASM_EXPORT
int exec()
{
   huffman_node_t *tree, *c;  
   tree = allocateNode(0);
   int out_cur = 0; // cursor for output array 
   c = tree; // cursor for position within huffman tree


   for (unsigned int i = 0; i < encoded_data_size*8; i++) {
      // read the next bit within the encoded data
      if (check_encoded_data_bit(i)) {
       c = c->right;
      } else {
        c = c->left;
      }

      if (c->left) {
       continue;
      }

      // its a huffman tree leaf:
      // 1. write the symbol
      // 2. reset the huffman tree cursor
      if (c->value[0]=='\a') {
        i+= 1;
        for (int j=0; j< TOKEN_SIZE; j++) {
          int next_bit_pos = 0;
          char scope_value = 0;
          while (next_bit_pos < 8) {
            if (check_encoded_data_bit(i+ next_bit_pos)) {
              char mask = 1<<(7-next_bit_pos);
              scope_value = scope_value | mask;
            }
            next_bit_pos++;
          }
          i += 8;
          decoded_data[out_cur] = scope_value;
          out_cur++;
          decoded_data_size = out_cur;
        }
        i--;
        c = tree;
        continue;
      }

      for (int j=0; j< TOKEN_SIZE; j++) {
          decoded_data[out_cur] = c->value[j];
          out_cur++;
          decoded_data_size = out_cur;
      }
      c = tree;
   }

   return 1;
}

