var user32 = Module.findBaseAddress('user32.dll');
if (user32) {
    console.log("user32 found");

    var SetWindowTextWPtr = user32.add(0x1C6F0);
    var SetWindowTextW = new NativeFunction(SetWindowTextWPtr, 'bool', ['pointer', 'pointer']);

    var hWnd = ptr('0x180b7e'); // use window handle obtained from getWindowsHandle.js
    var lpString = Memory.allocUtf16String("Bladewise 1337 test text");

    var result = SetWindowTextW(hWnd, lpString);
    if (result) {
        console.log("Window text changed!");
    } else {
        console.log("Failed to change window text.");
    }

    console.log('SetWindowTextW returned:', result);

} else {    
    console.log('user32.dll not found');
}