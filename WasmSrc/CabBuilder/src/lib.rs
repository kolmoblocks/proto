use std::os::raw::c_void;
use std::collections::HashMap;
use std::sync::Mutex;
use std::mem;


#[macro_use]
extern crate lazy_static;
extern crate json;
extern crate cab;

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
    
    let mut _res = result.lock().unwrap();

    // args signature:
    //      - 0 - JSON with cab struct
    //      - 1..N - raw files data
    // 
    // JSON cab struct is:
    //      { { "arg_index_1" : "full_name_in_cab_1" }, ..., { "arg_index_N" : "full_name_in_cab_N" } }
    //          - arg_index_N - index of argument, positive integer value from 1 to N (examples: 1, 2)
    //          - full_name_in_cab_N - full name in cab (examples: Documents/Part1/part1.doc, document.doc )
    //      example:
    //          { { "1" : "Docs/document1.doc" }, { "2" : "Docs/document2.doc" }, { "3" : "index.doc" } }
    //
    // how it works:
    //      - parsing arg0 to JSON
    //      - check args presense in according of JSON (all args must be present for all parsed arg_index_N)
    //      - build cab
    //      - profit!

    let argsmap = args.lock().unwrap();

    if !argsmap.contains_key(&0) {
        return false;
    }

    let _cab_structure_raw = argsmap.get(&0).unwrap();

    let _cab_structure_str = std::str::from_utf8(_cab_structure_raw).unwrap();

    let _cab_structure = json::parse(_cab_structure_str);

    if _cab_structure.is_err() {
        return false;
    }

    let _cab_structure_json = _cab_structure.unwrap();
    
    for _val in _cab_structure_json.entries() {
        
        // check parsing to u8
        let _arg_index_parse = _val.0.parse::<u8>();
        if _arg_index_parse.is_err() {
            return false;
        }

        // check for 0 (0 - reserved for cab struct!)
        let _arg_index = _arg_index_parse.unwrap();
        if 0 == _arg_index {
            return false;
        }

        // check for presense value of this arg
        if !argsmap.contains_key(&_arg_index) {
            return false;
        }

        // check for string value
        if !_val.1.is_string() {
            return false;
        }

        let _full_name_in_cab = _val.1.as_str().unwrap();

    }

    let mut _cab_builder = cab::CabinetBuilder::new();
    let mut _folder_builder = _cab_builder.add_folder(cab::CompressionType::None);

    _folder_builder.add_file("Cargo.toml"); // !!! here coming pizdec, why? !!!
    

    return true;
}