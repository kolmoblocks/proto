use std::os::raw::c_void;
use std::collections::HashMap;
use std::sync::Mutex;
use std::mem;


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

}

#[no_mangle]
pub extern "C" fn set_arg(arg_index: u8, size: usize) -> *mut c_void {

    // create vector
    let mut buf = Vec::<u8>::new();
    
    // fill vector with 0 value
    for _ in 1..=size {
        buf.push(0);
    }
    
    let ptr = buf.as_mut_ptr();

    let mut argsmap = args.lock().unwrap();

    argsmap.insert( arg_index, buf );

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
    
    let argsmap = args.lock().unwrap();

    // get all arg indexes
    let mut indexes = Vec::<u8>::new();
    for (_index, _) in argsmap.iter() {
        indexes.push(*_index);
    }

    // sort indexes to asc.
    indexes.sort();
    
    // iterate througth args by sorted indexes
    let mut res = result.lock().unwrap();

    for _arg in indexes.iter() {
    
        let _alldata = argsmap.get(_arg);
        
        for _data in _alldata.iter() {
            
            for _x in _data.iter() {
                res.push(*_x);
            }
        }
    }

    return true;
}