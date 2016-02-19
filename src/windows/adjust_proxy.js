module.exports = {
    blah: function (success, fail, args) {
        var value = args.shift();
        
        var result = AdjustWinRT.WRTAdjust.addHello(value);

        navigator.notification.alert(result);
    },
    
    create: function (success, fail, args) {
        var config = args.shift();
        var adjustConfig = new AdjustWinRT.WRTAdjustConfig(config.appToken, config.environment);
        
        AdjustWinRT.WRTAdjust.applicationLaunching(adjustConfig);
    }
};

require("cordova/exec/proxy").add("Adjust", module.exports);