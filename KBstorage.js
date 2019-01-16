const KBcache = require('./KBcache.js')
const KBmanifest = require('./KBmanifest.js')

const isBrowser = this.window === this;

module.exports = class storage 
{

  constructor(path)
  {
    this.path = path;
    this.initialized = false;
    this.cache = new KBcache();
  }

  Init()
  {
    this.initialized = true;
    return true;
  }

  GetData(cid)
  {
    if ( !this.initialized ) {
      console.log("You can't use storage without initialization");
      return null;
    }

    let formulas = this.cache.GetFormulas(cid);
    if ( null == formulas ) {
      console.log("Empty formulas for cid - ", cid);
      return null;
    }

    return this.ProcessFormulas(formulas);
  }

  ProcessFormulas(formulas)
  {
    // raw
    for ( var index in formulas )
    {
      let formula = formulas[index];
      
      if ( formula.hasOwnProperty("raw") ) 
      {
        let result = this.ProcessFormula_Raw( formula );
        
        if ( null != result )
          return result;
      }
    }

    // ref
    for ( var index in formulas )
    {
      let formula = formulas[index];
      
      if ( formula.hasOwnProperty("ref") ) 
      {
        let result = this.ProcessFormula_Ref( formula );
        
        if ( null != result )
          return result;
      }
    }

    // match_cid
    for ( var index in formulas )
    {
      let formula = formulas[index];
      
      if ( formula.hasOwnProperty("match_cid") ) 
      {
        let result = this.ProcessFormula_MatchCid( formula );
        
        if ( null != result )
          return result;
      }
    }

    // exec
    for ( var index in formulas )
    {
      let formula = formulas[index];
      
      if ( formula.hasOwnProperty("exec") ) 
      {
        let result = this.ProcessFormula_Exec( formula );
        
        if ( null != result )
          return result;
      }
    }

    return null;
  }

  ProcessFormula_Raw(formula)
  {
    let utf8str = String(formula["raw"]); // <-- utf8 string
    
    var result = new Array();

    for ( var i=0; i < utf8str.length; i++ ) {

        var charcode = utf8str.charCodeAt(i);
        
        result.push( charcode ); // ????
    }

    return result;
  }

  ProcessFormula_Exec(formula)
  {
    let exec = formula["exec"];

    if ( !exec.hasOwnProperty("wasm") )
    {
      console.log("Formula does't contain 'wasm' propertie");
      return null;
    }

    let wasm_formulas = this.cache.GetFormulas(exec["wasm"]);

    if ( null == wasm_formulas )
    {
      console.log("Empty formulas for cid - ", exec["wasm"]);
      return null;
    }

    let raw_wasm = this.ProcessFormulas(wasm_formulas);
    if ( null == raw_wasm )
    {
      console.log("Empty processed value for - ", exec["wasm"]);
      return null;
    }

    // get args
    let args = new Array();
    for ( var index in exec )
    {
      if ( "wasm" == index )
        continue;

      let arg_formula = this.cache.GetFormulas(exec[index]);
      if ( null == arg_formula )
      {
        console.log("Empty formulas for cid - ", exec[index]);
        return null;
      }

      let raw_arg = this.ProcessFormulas(arg_formula);
      if ( null == raw_wasm )
      {
        console.log("Empty processed value for - ", exec[index]);
        return null;
      }

      let arg = new Object();
        arg["name"] = index;
        arg["value"] = raw_arg;

      args.push( arg );
    }

    return this.ExecWasm(raw_wasm, args);
  }

  ProcessFormula_Ref(formula) 
  {
    return this.cache.GetDataByRef(formula["ref"]);
  }

  ProcessFormula_MatchCid(formula)
  {
    let cid = formula["match_cid"];

    let formulas = this.cache.GetFormulas(cid);

    if ( null == formulas )
    {
      console.log("Empty formulas for cid - ", cid);
      return null;
    }
    else
    {
      return this.ProcessFormulas(formulas);
    }
  }

  ExecWasm(wasm,args)
  {
    // todo: !!!
    return new Array();
  }
}