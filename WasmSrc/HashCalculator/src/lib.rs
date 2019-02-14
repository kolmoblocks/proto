use std::os::raw::c_void;
use std::collections::HashMap;
use std::sync::Mutex;
use std::mem;
use std::ptr;
use sha2::{Sha256, Sha512, Digest};

#[macro_use]
extern crate lazy_static;
extern crate sha2;

lazy_static! {

    static ref args: Mutex<HashMap<u8, Vec<(u8)>>> = {
        let m = HashMap::new();
        return Mutex::new(m);
    };

    static ref result: Mutex<Vec<(u8)>> = {
        return Mutex::new(Vec::<u8>::new());
    };

    static ref args_names: Mutex<HashMap<u8, Vec<(u8)>>> = {
        let m = HashMap::new();
        return Mutex::new(m);
    };

    static ref last_error: Mutex<Vec<(u8)>> = {
        return Mutex::new(Vec::<u8>::new());
    };

}

const INPUT_ARG_INDEX:      u8 = 1;
const INPUT_ARG_NAME:       &str = "INPUT";

const ALG_NAME_ARG_INDEX:   u8 = 2;
const ALG_NAME_ARG_NAME:    &str = "ALGNAME";

//const ALG_NAME_SHA224:      &str = "SHA224";
const ALG_NAME_SHA256:      &str = "SHA256"; // default (if not set param AlgName)
//const ALG_NAME_SHA384:      &str = "SHA384";
const ALG_NAME_SHA512:      &str = "SHA512";
//const ALG_NAME_SHA512_224:  &str = "SHA512t224";
//const ALG_NAME_SHA512_256:  &str = "SHA512t256";

fn set_last_error(error_text : &'static str) {

    let mut _last_error = last_error.lock().unwrap();

    _last_error.clear();

    let _bytes = error_text.as_bytes();

    for _b in _bytes.iter() {
        _last_error.push(*_b);
    }
}

#[no_mangle]
pub extern "C" fn _set_arg_name(arg_handle: u8, size: usize) -> *mut c_void {

    let mut _args_names = args_names.lock().unwrap();

    if _args_names.contains_key(&arg_handle) {
        
        set_last_error("_set_arg_name, given argument handle is already used");
        
        return ptr::null_mut();
    }

    // create vector
    let mut buf = Vec::<u8>::new();
    
    // fill vector with 0 value
    for _ in 1..=size {
        buf.push(0);
    }
    
    let ptr = buf.as_mut_ptr();

    _args_names.insert(arg_handle, buf);

    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn _get_arg_index(arg_handle: u8) -> u8 {

    let mut _args_names = args_names.lock().unwrap();

    if !_args_names.contains_key(&arg_handle) {
        
        set_last_error("_get_arg_index, unknown argument handle");
        
        return 0;
    }

    let _buffer = _args_names.get(&arg_handle).unwrap();

    let _arg_name = String::from_utf8(_buffer.to_vec()).unwrap().to_uppercase();

    if INPUT_ARG_NAME == _arg_name {
        return INPUT_ARG_INDEX;
    }

    if ALG_NAME_ARG_NAME == _arg_name {
        return ALG_NAME_ARG_INDEX;
    }

    set_last_error("_get_arg_index, unknown argument name");

    return 0;
}

#[no_mangle]
pub extern "C" fn _set_arg(arg_index: u8, size: usize) -> *mut c_void {

    if 0 == arg_index || (INPUT_ARG_INDEX != arg_index && ALG_NAME_ARG_INDEX != arg_index) {

        set_last_error("_set_arg, invalid argument index, expected 1,2 ");

        return ptr::null_mut();
    }

    // create vector
    let mut buf = Vec::<u8>::new();
    
    // fill vector with 0 value
    for _ in 1..=size {
        buf.push(0);
    }
    
    let ptr = buf.as_mut_ptr();

    let mut _args = args.lock().unwrap();

    _args.insert( arg_index, buf );

    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn _get_result() -> *mut c_void {
    
    let mut buf = Vec::<u8>::new();

    let res = result.lock().unwrap();

    for (_pos, _val) in res.iter().enumerate() {
        buf.push(*_val);
    }

    let ptr = buf.as_mut_ptr();

    mem::forget(buf);

    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn _get_result_size() -> usize {
    return result.lock().unwrap().len();
}

#[no_mangle]
pub extern "C" fn _get_last_error() -> *mut c_void {
    
    let mut buf = Vec::<u8>::new();

    let _last_error = last_error.lock().unwrap();

    for (_pos, _val) in _last_error.iter().enumerate() {
        buf.push(*_val);
    }

    let ptr = buf.as_mut_ptr();

    mem::forget(buf);

    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn _get_last_error_size() -> usize {
    return last_error.lock().unwrap().len();
}

#[no_mangle]
pub extern "C" fn _exec() -> bool {
    
    // check args
    let mut _args = args.lock().unwrap();

    if !_args.contains_key(&INPUT_ARG_INDEX) {

        set_last_error("_exec, has no input data");

        return false;
    }

    let mut _arg_name = String::from(ALG_NAME_SHA256); // default
    
    if _args.contains_key(&ALG_NAME_ARG_INDEX) {

        let _buffer = _args.get(&ALG_NAME_ARG_INDEX).unwrap();

        _arg_name = String::from_utf8(_buffer.to_vec()).unwrap().to_uppercase();

        if ALG_NAME_SHA256 != _arg_name && ALG_NAME_SHA512 != _arg_name {

            set_last_error("_exec, invalid algorithm name");

            return false;
        }
    }

    let _input = _args.get(&INPUT_ARG_INDEX).unwrap();
    
    let mut _result = result.lock().unwrap();

    if String::from(ALG_NAME_SHA256) == _arg_name {

        let mut _hasher = Sha256::new();

        _hasher.input(_input);
        
        let mut _hash = _hasher.result();

        for index in 1..=_hash.len() {
            _result.push(_hash[index-1]);
        }
    }

    if String::from(ALG_NAME_SHA512) == _arg_name {

        let mut _hasher = Sha512::new();

        _hasher.input(_input);

        let mut _hash = _hasher.result();

        for index in 1..=_hash.len() {
            _result.push(_hash[index-1]);
        }
    }

    // check result
    if 0 != _result.len() {

        return true;

    } else {

        set_last_error("_exec, empty result for not empty argument");

        return false;
    }
}
