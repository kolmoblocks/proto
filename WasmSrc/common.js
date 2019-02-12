module.exports = {

    CheckReturnedData: function(data, expected_string_data)
    {
        if ( null == data )
        {
            console.error("Test failed - empty data returned!");

            return false;
        }
        else
        {
            // check for utf8 BOM, if it present - delete it from data
            if ( data.length > 3 )
            {
                if ((data[0] == 0xEF) && (data[1] == 0xBB) && (data[2] == 0xBF)) 
                {
                    data.splice(0, 3);
                }
            }

            let result = this.stringFromUTF8Array(data);

            console.log("Returned data '" + result + "'");

            if ( result.length != expected_string_data.length )
            {
                console.log("Diff length (expected-" + expected_string_data.length + ", result-" + result.length + ")");

                return false;
            }
            else
            {
                if ( result == expected_string_data )
                {
                    console.log("Test pass OK!");

                    return true;
                }
                else
                {
                    console.error("Different data!");

                    console.error("Expected data '" + expected_string_data + "'");

                    return false;
                }
            }
            
        }
    },

    stringFromUTF8Array: function(data)
    {
        const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
        var count = data.length;
        var str = "";

        for (var index = 0;index < count;)
        {
            var ch = data[index++];
            if (ch & 0x80)
            {
            var extra = extraByteMap[(ch >> 3) & 0x07];
            if (!(ch & 0x40) || !extra || ((index + extra) > count))
                return null;
            
            ch = ch & (0x3F >> extra);
            for (;extra > 0;extra -= 1)
            {
                var chx = data[index++];
                if ((chx & 0xC0) != 0x80)
                return null;
                
                ch = (ch << 6) | (chx & 0x3F);
            }
            }
            
            str += String.fromCharCode(ch);
        }

        return str;
    }
}