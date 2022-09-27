const LETTER_MAP = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
    // Logic goes here

    const tranID = transactionId - 1;
    const letter = Math.trunc(storeId / 8);
    const trail = storeId % 8;

    const letterT = Math.trunc(tranID / 400)
    const trailT = tranID % 400;

    const sId = LETTER_MAP[letter] + trail;
    const tId = LETTER_MAP[letterT] + trailT;

    const today = new Date(Date.now());
    const date = LETTER_MAP[today.getMonth()] + today.getDate();
    return sId + tId + date;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
    // Logic goes here

    const splitCode = shortCode.split(/(?=[A-Z])/)
    const splitStoreId = splitCode[0];
    const storeId = LETTER_MAP.indexOf(splitStoreId[0]) * 8 + +splitStoreId.slice(1, splitStoreId.length);

    const splitTranId = splitCode[1];
    const transactionId = LETTER_MAP.indexOf(splitTranId[0]) * 400 + +splitTranId.slice(1, splitTranId.length) + 1;

    const splitDate = splitCode[2];
    const shopDate = new Date(2022, LETTER_MAP.indexOf(splitDate[0]), +splitDate.slice(1, splitDate.length))
    return {
        storeId, // store id goes here,
        shopDate, // the date the customer shopped,
        transactionId, // transaction id goes here
    };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}