var fs = require('fs');
var path = require('path');

var lineToAdd1 = '    <ItemGroup>';
var lineToAdd2 = '        <Reference Include="AdjustWinRT">';
var lineToAdd3 = '            <HintPath>..\\..\\plugins\\com.adjust.sdk\\src\\windows\\AdjustUAP10WinRT\\AdjustUAP10WinRT\\bin\\Release\\AdjustWinRT.winmd</HintPath>';
var lineToAdd4 = '            <IsWinMDFile>true</IsWinMDFile>';
var lineToAdd5 = '        </Reference>';
var lineToAdd6 = '    </ItemGroup>';

var adjustReference = 'plugins\\com.adjust.sdk\\src\\windows\\AdjustUAP10WinRT\\AdjustUAP10WinRT\\bin\\Release\\AdjustWinRT.winmd';
var projFilePath = path.join(__dirname,'../../../platforms/windows/CordovaApp.Windows10.jsproj');

var newJsprojContent = [];

// Open jsproj file to check for AdjustWinRT reference presence.
var data = fs.readFileSync(projFilePath).toString();

// If AdjustWinRT reference is not present in jsproj file, create array of lines for new jsproj file.
// All old lines will be contained + lines to be added in order to include the AdjustWinRT reference.
if (data.indexOf(adjustReference) < 0) {
    // The AdjustWinRT reference is not added to jsproj file.
    var oldJsprojContent = data.toString().split("\n");
    var wroteMissingLines = false;
    
    oldJsprojContent.forEach(function(item) {
        newJsprojContent.push(item);
        
        // Look for first occurrence of </ItemGroup> and add reference to AdjustWinRT afterwards.
        if (item.indexOf('</ItemGroup>') > -1) {
            if (wroteMissingLines == false) {
                newJsprojContent.push(lineToAdd1);
                newJsprojContent.push(lineToAdd2);
                newJsprojContent.push(lineToAdd3);
                newJsprojContent.push(lineToAdd4);
                newJsprojContent.push(lineToAdd5);
                newJsprojContent.push(lineToAdd6);
                
                wroteMissingLines = true;
            }
        }
    });
}

// Check if new jsproj content array was written at all.
// If yes, rewrite it. If not, AdjustWinRT reference was already added.
if (newJsprojContent.length > 0) {
    // Write new content to jsproj file.
    var content = newJsprojContent.join('\n');
    fs.writeFileSync(projFilePath, content, 'utf8')
    
    console.log("Adjust SDK references successfully added to Windows 10 universal project.");
} else {
    console.log("Adjust SDK references already added to Windows 10 universal project.");
}
