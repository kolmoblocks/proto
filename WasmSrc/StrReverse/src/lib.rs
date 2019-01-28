use std::os::raw::c_void;
use std::sync::Mutex;
use std::mem;

#[macro_use]
extern crate lazy_static;

lazy_static! {

    static ref arg: Mutex<Vec<(u8)>> = {
        return Mutex::new(Vec::<u8>::new());
    };

    static ref result: Mutex<Vec<(u8)>> = {
        return Mutex::new(Vec::<u8>::new());
    };

}

#[no_mangle]
pub extern "C" fn set_arg(_: u8, size: usize) -> *mut c_void {

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
pub extern "C" fn get_result() -> *mut c_void {
    
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
pub extern "C" fn get_result_size() -> usize {
    return result.lock().unwrap().len();
}

#[no_mangle]
pub extern "C" fn exec() -> bool {
    
    let mut _result = result.lock().unwrap();

    // check arg length
    let mut _arg = arg.lock().unwrap();
    if 0 == _arg.len() {
        return false;
    }

    // copy arg to buf
    let mut buf = Vec::<u8>::new();
    for i in 0.._arg.len() {
        buf.push(_arg[i]);
    }

    // create utf8 string from buffer data
    let utf8_string = String::from_utf8(buf);
    if utf8_string.is_err() {
        return false;
    }

    // reverse string
    let mut result_string = String::from("");
    for c in utf8_string.unwrap().chars().rev() {
        result_string.push(c);
    }

    // convert string to bytes
    let bytes = result_string.into_bytes();
    
    // magic to remove past BOM (ï»¿)
    let mut end_pos = bytes.len();
    if bytes.len() > 3 {
        end_pos = bytes.len() - 3;
    }
    
    // copy bytes to result
    for i in 0..end_pos {
        _result.push(bytes[i]);
    }

    // check result
    if 0 != _result.len() {
        return true;
    } else {
        return false;
    }
}