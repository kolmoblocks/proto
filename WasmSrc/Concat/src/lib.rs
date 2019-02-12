use std::os::raw::c_void;
use std::collections::HashMap;
use std::sync::Mutex;
use std::mem;
use std::ptr;

#[macro_use]
extern crate lazy_static;

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

fn set_last_error(error_text : &'static str) {

    let mut _last_error = last_error.lock().unwrap();

    _last_error.clear();

    let _bytes = error_text.as_bytes();

    for _b in _bytes.iter() {
        _last_error.push(*_b);
    }
}

#[no_mangle]
pub extern "C" fn set_arg_name(arg_handle: u8, size: usize) -> *mut c_void {

    let mut _args_names = args_names.lock().unwrap();

    if _args_names.contains_key(&arg_handle) {
        
        set_last_error("set_arg_name, given argument handle is already used");
        
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
pub extern "C" fn get_arg_index(arg_handle: u8) -> u8 {

    let mut _args_names = args_names.lock().unwrap();

    if !_args_names.contains_key(&arg_handle) {
        
        set_last_error("get_arg_index, unknown argument handle");
        
        return 0;
    }

    let _buffer = _args_names.get(&arg_handle).unwrap();

    let _arg_name = String::from_utf8(_buffer.to_vec()).unwrap().to_uppercase();

    let _arg_index_str = _arg_name.replace("ARG", "");

    let _parsed = _arg_index_str.parse::<u8>();

    if _parsed.is_err() {

        set_last_error("get_arg_index, argument name must be like 'ArgN', where N from: 1..255");

        return 0;
    }

    return _parsed.unwrap();
}

#[no_mangle]
pub extern "C" fn set_arg(arg_index: u8, size: usize) -> *mut c_void {

    if 0 == arg_index {

        set_last_error("set_arg, invalid argument index");

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
pub extern "C" fn get_result() -> *mut c_void {
    
    let mut buf = Vec::<u8>::new();

    let _result = result.lock().unwrap();

    for (_pos, _val) in _result.iter().enumerate() {
        buf.push(*_val);
    }

    let ptr = buf.as_mut_ptr();

    mem::forget(buf);

    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn get_result_size() -> usize {
    return result.lock().unwrap().len();
}

#[no_mangle]
pub extern "C" fn get_last_error() -> *mut c_void {
    
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
pub extern "C" fn get_last_error_size() -> usize {
    return last_error.lock().unwrap().len();
}

#[no_mangle]
pub extern "C" fn exec() -> bool {
    
    let _args = args.lock().unwrap();

    // get all arg indexes
    let mut indexes = Vec::<u8>::new();
    for (_index, _) in _args.iter() {
        indexes.push(*_index);
    }

    // sort indexes to asc.
    indexes.sort();
    
    // iterate througth args by sorted indexes
    let mut _result = result.lock().unwrap();

    for _arg in indexes.iter() {
    
        let _alldata = _args.get(_arg);
        
        for _data in _alldata.iter() {
            
            for _x in _data.iter() {
                _result.push(*_x);
            }
        }
    }

    return true;
}