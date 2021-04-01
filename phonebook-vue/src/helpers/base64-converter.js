export default { getBase64StringFromFile }

function getBase64StringFromFile(file){
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = function(e) {
            let binaryString = e.target.result;
            let base64String = "data:image/png;base64," + btoa(binaryString)
            return resolve(base64String)
        };
        reader.onerror = function(e) {
            return reject(e.type);
        };
    })
}