var user32 = Module.findBaseAddress('user32.dll');
if (user32) {
    console.log("user32 found");

    var GetWindowTextWPtr = user32.add(0x1C230);
    var GetWindowTextW = new NativeFunction(GetWindowTextWPtr, 'int', ['pointer', 'pointer', 'int']);

    var EnumWindowsPtr = user32.add(0x1D150);
    var EnumWindows = new NativeFunction(EnumWindowsPtr, 'bool', ['pointer', 'int']);

    var lpEnumFunc = new NativeCallback(function(hWnd, lParam) {
        var lpString = Memory.alloc(256);
        var nMaxCount = 256;

        var result = GetWindowTextW(hWnd, lpString, nMaxCount);
        if (result > 0) {
            console.log('Window handle:', hWnd, 'Window text:', lpString.readUtf16String());
        }
        return 1; 
    }, 'int', ['pointer', 'int']);

    var lParam = 0;

    var result = EnumWindows(lpEnumFunc, lParam);
    console.log('EnumWindows returned:', result);

} else {    
    console.log('user32.dll not found');
}
