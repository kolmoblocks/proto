function stringFromUTF8Array(data)
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

module.exports = {

    CheckReturnedData: function(data, expected_string_data)
    {
        if ( null == data )
            console.error("Test failed - empty data returned!");
        else
        {
            let result = stringFromUTF8Array(data).trim();

            console.log("Returned data '" + result + "'");

            if ( result == expected_string_data )
            {
                console.log("Test pass OK!");
            }
            else
            {
                console.error("Different data!");
                console.error("Exprected data '" + expected_string_data + "'");
            }
            
        }

        console.log("- - - - - - - - - - - - -");
    }

}