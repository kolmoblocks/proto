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

  GetData(data_guid)
  {
    if ( !this.initialized ) {
      console.error("You can't use storage without initialization");
      return null;
    }

    return this.ProcessManifest(this.GetManifest(data_guid));
  }

  GetManifest(data_guid)
  {
    // prepare data for getting manifest from cache
    let data_manifest = data_guid;
    if ( !isBrowser ) {
      data_manifest = "Manifests\\" + data_guid;
    }

    // get manifest data from cache and validate it
    let manifest = new KBmanifest(data_guid);
    if ( !manifest.Init( this.cache.Get(data_manifest + ".json") ) ) {
      console.error("Bad Manifest " + data_manifest);
      return null;
    }

    return manifest;
  }

  ProcessManifest(manifest)
  {
    if ( null == manifest )
    {
      console.error("Error processing empty manifest");
      return null;
    }
    
    // check manifest for "end chain"
    if ( !manifest.HasRecipies() )
    {
      let data_guid = manifest.GetGuid();
      let raw_data = this.cache.Get(data_guid);
      if ( null == raw_data ) {
        console.error("Error getting KB data for " + data_guid);
        return null;
      }
      return raw_data;
    }

    // lets evaluate all recipies for choosing one
    let recipies = manifest.GetRecipies();
    recipies.forEach(element => {
      element["_evaluation_result_"] = this.EvaluateRecipie(element);
    });

    // choose recipie with min evaluation result
    
    
    
    // prepare recipie

    return null;
  }

  EvaluateRecipie(recipie)
  {
    return 10;
  }

}