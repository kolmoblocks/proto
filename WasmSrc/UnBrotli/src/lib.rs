use std::os::raw::c_void;
use std::collections::HashMap;
use std::sync::Mutex;
use std::mem;
use std::io::Read;
use std::io;
use std::ptr;

#[macro_use]
extern crate lazy_static;
extern crate brotli;

lazy_static! {

    static ref arg: Mutex<Vec<(u8)>> = {
        return Mutex::new(Vec::<u8>::new());
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

    if !_args_names.is_empty() {

        set_last_error("_set_arg_name, this wasm support only one argument");
        
        return ptr::null_mut();
    }

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

    return 1; // always one argument with arg_index = 1
}

#[no_mangle]
pub extern "C" fn _set_arg(arg_index: u8, size: usize) -> *mut c_void {

    if 0 == arg_index || 1 != arg_index {

        set_last_error("_set_arg, invalid argument index, expected 1");

        return ptr::null_mut();
    }

    let mut _arg = arg.lock().unwrap();

    if 0 == _arg.len() {

        // fill vector with 0 value
        for _ in 1..=size {
            _arg.push(0);
        }

    }else{
        
        // make size bigger
        if size > _arg.len() {

            let _diff = size - _arg.len();

            // fill diff with 0 value
            for _ in 1..=_diff {
                _arg.push(0);
            }

        }
    }

    let ptr = _arg.as_mut_ptr();

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

    // check arg length
    let mut _arg = arg.lock().unwrap();
    if 0 == _arg.len() {

        set_last_error("_exec, empty argument is invalid");

        return false;
    }

    // copy arg to buf
    let mut buf = Vec::<u8>::new();
    for i in 0.._arg.len() {
        buf.push(_arg[i]);
    }

    // unwrap result
    let mut _result = result.lock().unwrap();

    // create reader
    let mut _reader = brotli::Decompressor::new( std::io::Cursor::new(buf), 4096 );

    // read and decompress
    let mut buf = [0u8; 4096];
    loop {
        match _reader.read(&mut buf[..]) {
            Err(e) => {
                if let io::ErrorKind::Interrupted = e.kind() {
                    continue;
                }

                set_last_error("_exec, decompression error");
                return false;
            }
            Ok(size) => {
                if size == 0 {
                    break;
                }

                for i in 0..size {
                    _result.push(buf[i]);
                }
            }
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